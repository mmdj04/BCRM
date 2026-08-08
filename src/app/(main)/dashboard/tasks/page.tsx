import { tasks } from "./_components/data";
import { Tasks } from "./_components/tasks";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-3xl tracking-tight">Bem-vindo de volta!</h2>
        <p className="text-muted-foreground">Aqui está a lista das suas tarefas deste mês!</p>
      </div>
      <Tasks data={tasks} />
    </div>
  );
}
