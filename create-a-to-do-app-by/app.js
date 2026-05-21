const { useMemo, useState } = React;

const starterTasks = [
  {
    id: crypto.randomUUID(),
    title: "Finish HTML project file",
    category: "Study",
    priority: "High",
    done: false
  },
  {
    id: crypto.randomUUID(),
    title: "Revise JavaScript events",
    category: "Study",
    priority: "Medium",
    done: true
  },
  {
    id: crypto.randomUUID(),
    title: "Submit project screenshot",
    category: "Personal",
    priority: "Low",
    done: false
  }
];

function App() {
  const [tasks, setTasks] = useState(starterTasks);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Study");
  const [priority, setPriority] = useState("Medium");
  const [filter, setFilter] = useState("All");

  const currentDate = new Date();
  const day = currentDate.toLocaleDateString("en-IN", { day: "2-digit" });
  const monthYear = currentDate.toLocaleDateString("en-IN", {
    month: "short",
    year: "numeric"
  });

  const stats = useMemo(() => {
    const completed = tasks.filter((task) => task.done).length;
    return {
      total: tasks.length,
      completed,
      pending: tasks.length - completed
    };
  }, [tasks]);

  const visibleTasks = tasks.filter((task) => {
    if (filter === "Done") return task.done;
    if (filter === "Pending") return !task.done;
    return true;
  });

  function handleSubmit(event) {
    event.preventDefault();
    const cleanTitle = title.trim();

    if (!cleanTitle) return;

    setTasks([
      {
        id: crypto.randomUUID(),
        title: cleanTitle,
        category,
        priority,
        done: false
      },
      ...tasks
    ]);
    setTitle("");
    setCategory("Study");
    setPriority("Medium");
  }

  function toggleTask(id) {
    setTasks(tasks.map((task) => (
      task.id === id ? { ...task, done: !task.done } : task
    )));
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function clearCompleted() {
    setTasks(tasks.filter((task) => !task.done));
  }

  return (
    <section className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">React project</p>
          <h1>TaskFlow</h1>
          <p className="subtitle">
            A simple to-do app for adding tasks, setting priorities, tracking
            progress, filtering work, and clearing completed items.
          </p>
        </div>
        <div className="date-tile" aria-label="Today">
          <strong>{day}</strong>
          <span>{monthYear}</span>
        </div>
      </header>

      <div className="workspace">
        <aside className="panel">
          <h2>Add New Task</h2>
          <form className="task-form" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="taskTitle">Task name</label>
              <input
                id="taskTitle"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Example: Complete assignment"
              />
            </div>

            <div className="field">
              <label htmlFor="taskCategory">Category</label>
              <select
                id="taskCategory"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                <option>Study</option>
                <option>Personal</option>
                <option>Home</option>
                <option>Project</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="taskPriority">Priority</label>
              <select
                id="taskPriority"
                value={priority}
                onChange={(event) => setPriority(event.target.value)}
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>

            <button className="primary-btn" type="submit">Add Task</button>
          </form>

          <div className="summary" aria-label="Task summary">
            <div className="metric">
              <strong>{stats.total}</strong>
              <span>Total</span>
            </div>
            <div className="metric">
              <strong>{stats.pending}</strong>
              <span>Pending</span>
            </div>
            <div className="metric">
              <strong>{stats.completed}</strong>
              <span>Done</span>
            </div>
          </div>
        </aside>

        <section className="tasks-panel">
          <div className="tasks-topbar">
            <h2>My Tasks</h2>
            <div className="filters" aria-label="Task filters">
              {["All", "Pending", "Done"].map((item) => (
                <button
                  className={`filter-btn ${filter === item ? "active" : ""}`}
                  key={item}
                  type="button"
                  onClick={() => setFilter(item)}
                >
                  {item}
                </button>
              ))}
              <button className="clear-btn" type="button" onClick={clearCompleted}>
                Clear Done
              </button>
            </div>
          </div>

          {visibleTasks.length > 0 ? (
            <ul className="task-list">
              {visibleTasks.map((task) => (
                <li className={`task-item ${task.done ? "done" : ""}`} key={task.id}>
                  <button
                    className="checkbox"
                    type="button"
                    onClick={() => toggleTask(task.id)}
                    aria-label={task.done ? "Mark task pending" : "Mark task done"}
                  >
                    {task.done ? "✓" : ""}
                  </button>
                  <div>
                    <p className="task-name">{task.title}</p>
                    <div className="task-meta">
                      <span className="pill">{task.category}</span>
                      <span className={`pill ${task.priority.toLowerCase()}`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                  <div className="actions">
                    <button
                      className="icon-btn delete"
                      type="button"
                      onClick={() => deleteTask(task.id)}
                      aria-label={`Delete ${task.title}`}
                      title="Delete task"
                    >
                      ×
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-state">
              <div>
                <h3>No tasks here</h3>
                <p>Add a new task or change the selected filter to see your list.</p>
              </div>
            </div>
          )}
        </section>
      </div>
    </section>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
