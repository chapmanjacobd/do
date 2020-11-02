import { config } from "./config";
import { Task } from "./types";
import { init } from "./storage";

if (require.main === module)
  (async () => {
    console.log(addTask());
  })();

export function addTask(): Task[] {
  const db = init();

  console.log("Adding task:", config.addTaskCmd);

  if (config.addTaskCmd && config.addTaskCmd !== "")
    db.prepare(
      `INSERT INTO ${config.taskTableName} (task_cmd, status) VALUES (@task_cmd, @status)`
    ).run({
      task_cmd: config.addTaskCmd,
      status: "QUEUED",
    });

  return db
    .prepare(`SELECT rowid, * FROM ${config.taskTableName} WHERE status != 'FINISHED'`)
    .all();
}
