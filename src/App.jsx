import { useState } from "react";

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className="flex items-center gap-3 border-b border-slate-700 py-3 last:border-b-0">
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
        className="h-4 w-4 accent-green-700"
        aria-label={task.done ? "Mark task not done" : "Mark task done"}
      />
      <span className={`flex-1 break-words text-sm ${task.done ? "text-slate-500 line-through" : "text-slate-100"}`}>
        {task.text}
      </span>
      <span className={`text-xs ${task.done ? "text-green-400" : "text-slate-400"}`}>
        {task.done ? "Done" : "Not Done"}
      </span>
      <button
        onClick={() => onDelete(task.id)}
        className="rounded px-2 py-1 text-sm text-red-400 hover:bg-slate-700"
        aria-label={`Delete ${task.text}`}
      >
        Delete
      </button>
    </div>
  );
}

function UserGuide() {
  return (
    <div className="mt-5 rounded-lg bg-slate-700 p-4 text-sm text-slate-300">
      <h2 className="mb-2 font-semibold text-slate-100">User Guide</h2>
      <p>1. Type a task and click Add Task.</p>
      <p>2. Check the box to mark it Done or Not Done.</p>
      <p>3. Click Delete to remove a task.</p>
      <p>4. Click Clear All to remove every task.</p>
    </div>
  );
}

function App() {
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState([]);

  function addTask(event) {
    event.preventDefault();
    const text = taskText.trim();

    if (text === "") return;

    const newTask = {
      id: Date.now(),
      text: text,
      done: false,
    };

    setTasks([...tasks, newTask]);
    setTaskText("");
  }

  function toggleTask(id) {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    ));
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function clearTasks() {
    setTasks([]);
  }

  const doneCount = tasks.filter((task) => task.done).length;

  return (
    <main className="min-h-screen px-4 py-8 sm:py-12">
      <section className="mx-auto max-w-xl overflow-hidden rounded-lg border border-slate-700 bg-slate-800 shadow-sm">
        <header className="bg-green-800 px-5 py-5 text-white sm:px-6">
          <p className="text-sm text-green-100">DCIT 26 - Laboratory 2</p>
          <h1 className="mt-1 text-2xl font-bold">My To-Do List</h1>
        </header>

        <div className="p-5 sm:p-6">
          <form onSubmit={addTask} className="flex flex-col gap-2 sm:flex-row">
            <input
              type="text"
              value={taskText}
              onChange={(event) => setTaskText(event.target.value)}
              placeholder="Write a task..."
              className="min-w-0 flex-1 rounded-md border border-slate-600 bg-slate-700 px-3 py-3 text-sm text-white placeholder-slate-400 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            />
            <button
              type="submit"
              className="rounded-md bg-green-700 px-5 py-3 text-sm font-semibold text-white hover:bg-green-800"
            >
              Add Task
            </button>
          </form>

          <div className="mt-5 flex items-center justify-between gap-3">
            <p className="text-sm text-slate-300">
              {tasks.length} task{tasks.length === 1 ? "" : "s"} · {doneCount} done
            </p>
            {tasks.length > 0 && (
              <button onClick={clearTasks} className="text-sm text-red-400 hover:underline">
                Clear All
              </button>
            )}
          </div>

          <div className="mt-2">
            {tasks.length === 0 ? (
              <p className="rounded-md bg-slate-700 px-3 py-6 text-center text-sm text-slate-400">
                No tasks yet. Add your first task above.
              </p>
            ) : (
              tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                />
              ))
            )}
          </div>

          <UserGuide />
        </div>
      </section>
    </main>
  );
}

export default App;
