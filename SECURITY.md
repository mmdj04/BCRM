# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 2.2.x   | :white_check_mark: |
| < 2.2   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability within BCRM, please send an email to [security@bcrm.dev](mailto:security@bcrm.dev). All security vulnerabilities will be promptly addressed.

**Please do not report security vulnerabilities through public GitHub issues.**

### What to include

- Type of vulnerability (e.g., SQL injection, XSS, authentication bypass)
- Full paths of source file(s) related to the vulnerability
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact assessment

### Response timeline

- **Acknowledgment**: Within 48 hours
- **Initial assessment**: Within 1 week
- **Fix release**: Depends on severity

### Safe harbor

We support safe harbor for security researchers who:

- Make a good faith effort to avoid privacy violations, data destruction, or disruption
- Only interact with accounts you own or with explicit permission
- Do not exploit a vulnerability beyond what is necessary to confirm its existence
- Report vulnerabilities promptly and do not publicly disclose them before a fix is available

## Security Best Practices

### Environment Variables

- Never commit `.env` files to version control
- Use `.env.local` for local development
- Use Vercel environment variables for production
- Rotate Supabase keys periodically

### Authentication

- Supabase Auth handles all authentication
- Row Level Security (RLS) is enabled on all tables
- Service role key is only used server-side
- Session tokens are refreshed via middleware

### Data Protection

- All user data is isolated via RLS policies
- Sensitive data is encrypted at rest in Supabase
- No sensitive data is stored in cookies or localStorage
