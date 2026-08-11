import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from "@capacitor-community/sqlite";

let _db: SQLiteDBConnection | null = null;
let sqlite: SQLiteConnection | null = null;

export async function initCapacitorDB(): Promise<void> {
	sqlite = new SQLiteConnection(CapacitorSQLite);

	const ret = await sqlite.checkConnectionsConsistency();
	const isConn = (await sqlite.isConnection("bcrm", false)).result;

	if (ret.result && isConn) {
		_db = await sqlite.retrieveConnection("bcrm", false);
	} else {
		_db = await sqlite.createConnection("bcrm", false, "no-encryption", 1, false);
	}

	await _db.open();
	await createTables();
}

async function createTables(): Promise<void> {
	if (!_db) throw new Error("Database not initialized");

	await _db.execute(`
		CREATE TABLE IF NOT EXISTS users (
			id TEXT PRIMARY KEY,
			supabase_id TEXT UNIQUE,
			name TEXT NOT NULL,
			email TEXT UNIQUE NOT NULL,
			password_hash TEXT,
			role TEXT DEFAULT 'user',
			avatar TEXT,
			stripe_customer_id TEXT UNIQUE,
			plan TEXT DEFAULT 'free',
			plan_interval TEXT DEFAULT 'monthly',
			subscription_status TEXT DEFAULT 'free',
			subscription_id TEXT,
			cancel_at_period_end INTEGER DEFAULT 0,
			is_business INTEGER DEFAULT 0,
			company_name TEXT,
			cnpj TEXT,
			sync_version INTEGER DEFAULT 0,
			last_synced_at TEXT,
			is_dirty INTEGER DEFAULT 0,
			created_at TEXT DEFAULT (datetime('now')),
			updated_at TEXT DEFAULT (datetime('now'))
		);

		CREATE TABLE IF NOT EXISTS customers (
			id TEXT PRIMARY KEY,
			user_id TEXT NOT NULL,
			supabase_id TEXT UNIQUE,
			name TEXT NOT NULL,
			email TEXT,
			phone TEXT,
			company TEXT,
			status TEXT DEFAULT 'active',
			notes TEXT,
			sync_version INTEGER DEFAULT 0,
			last_synced_at TEXT,
			is_dirty INTEGER DEFAULT 0,
			deleted_at TEXT,
			created_at TEXT DEFAULT (datetime('now')),
			updated_at TEXT DEFAULT (datetime('now')),
			FOREIGN KEY (user_id) REFERENCES users(id)
		);

		CREATE TABLE IF NOT EXISTS deals (
			id TEXT PRIMARY KEY,
			user_id TEXT NOT NULL,
			supabase_id TEXT UNIQUE,
			account TEXT NOT NULL,
			stage TEXT DEFAULT 'lead',
			priority TEXT DEFAULT 'medium',
			health TEXT DEFAULT 'good',
			value REAL,
			owner TEXT,
			sync_version INTEGER DEFAULT 0,
			last_synced_at TEXT,
			is_dirty INTEGER DEFAULT 0,
			deleted_at TEXT,
			created_at TEXT DEFAULT (datetime('now')),
			updated_at TEXT DEFAULT (datetime('now')),
			FOREIGN KEY (user_id) REFERENCES users(id)
		);

		CREATE TABLE IF NOT EXISTS tasks (
			id TEXT PRIMARY KEY,
			user_id TEXT NOT NULL,
			supabase_id TEXT UNIQUE,
			title TEXT NOT NULL,
			status TEXT DEFAULT 'todo',
			label TEXT,
			priority TEXT,
			sync_version INTEGER DEFAULT 0,
			last_synced_at TEXT,
			is_dirty INTEGER DEFAULT 0,
			deleted_at TEXT,
			created_at TEXT DEFAULT (datetime('now')),
			updated_at TEXT DEFAULT (datetime('now')),
			FOREIGN KEY (user_id) REFERENCES users(id)
		);

		CREATE TABLE IF NOT EXISTS payments (
			id TEXT PRIMARY KEY,
			user_id TEXT NOT NULL,
			supabase_id TEXT UNIQUE,
			stripe_payment_id TEXT UNIQUE,
			stripe_invoice_id TEXT,
			amount INTEGER NOT NULL,
			currency TEXT DEFAULT 'brl',
			status TEXT NOT NULL,
			description TEXT,
			sync_version INTEGER DEFAULT 0,
			last_synced_at TEXT,
			is_dirty INTEGER DEFAULT 0,
			created_at TEXT DEFAULT (datetime('now')),
			FOREIGN KEY (user_id) REFERENCES users(id)
		);
	`);
}

export function getCapacitorDB(): SQLiteDBConnection {
	if (!_db) throw new Error("Database not initialized. Call initCapacitorDB() first.");
	return _db;
}

export class CapacitorDatabaseAdapter {
	async getUser(id: string) {
		const database = getCapacitorDB();
		const result = await database.query("SELECT * FROM users WHERE id = ?", [id]);
		return result.values?.[0] ?? null;
	}

	async getUserByEmail(email: string) {
		const database = getCapacitorDB();
		const result = await database.query("SELECT * FROM users WHERE email = ?", [email]);
		return result.values?.[0] ?? null;
	}

	async createUser(data: any) {
		const database = getCapacitorDB();
		const id = crypto.randomUUID();
		await database.run(
			`INSERT INTO users (id, name, email, password_hash, role) VALUES (?, ?, ?, ?, ?)`,
			[id, data.name, data.email, data.passwordHash, data.role || "user"],
		);
		return this.getUser(id);
	}

	async updateUser(id: string, data: any) {
		const database = getCapacitorDB();
		const fields = Object.keys(data)
			.map((k) => `${k} = ?`)
			.join(", ");
		const values = Object.values(data);
		await database.run(`UPDATE users SET ${fields}, is_dirty = 1 WHERE id = ?`, [...values, id]);
		return this.getUser(id);
	}

	async getCustomers() {
		const database = getCapacitorDB();
		const result = await database.query(
			"SELECT * FROM customers WHERE deleted_at IS NULL ORDER BY created_at DESC",
		);
		return result.values ?? [];
	}

	async getCustomer(id: string) {
		const database = getCapacitorDB();
		const result = await database.query("SELECT * FROM customers WHERE id = ?", [id]);
		return result.values?.[0] ?? null;
	}

	async createCustomer(data: any) {
		const database = getCapacitorDB();
		const id = crypto.randomUUID();
		await database.run(
			`INSERT INTO customers (id, user_id, name, email, phone, company, status) VALUES (?, ?, ?, ?, ?, ?, ?)`,
			[id, data.userId, data.name, data.email, data.phone, data.company, data.status || "active"],
		);
		return this.getCustomer(id);
	}

	async updateCustomer(id: string, data: any) {
		const database = getCapacitorDB();
		const fields = Object.keys(data)
			.map((k) => `${k} = ?`)
			.join(", ");
		const values = Object.values(data);
		await database.run(`UPDATE customers SET ${fields}, is_dirty = 1 WHERE id = ?`, [...values, id]);
		return this.getCustomer(id);
	}

	async deleteCustomer(id: string) {
		const database = getCapacitorDB();
		await database.run(
			"UPDATE customers SET deleted_at = datetime('now'), is_dirty = 1 WHERE id = ?",
			[id],
		);
	}

	async getDirtyRecords(table: string, userId: string) {
		const database = getCapacitorDB();
		const result = await database.query(`SELECT * FROM ${table} WHERE user_id = ? AND is_dirty = 1`, [
			userId,
		]);
		return result.values ?? [];
	}

	async markSynced(table: string, id: string, supabaseId: string) {
		const database = getCapacitorDB();
		await database.run(
			`UPDATE ${table} SET supabase_id = ?, is_dirty = 0, sync_version = sync_version + 1, last_synced_at = datetime('now') WHERE id = ?`,
			[supabaseId, id],
		);
	}
}
