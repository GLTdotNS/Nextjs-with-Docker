"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [text, setText] = useState("");

  const loadTasks = async () => {
    const res = await fetch("/api/tasks");
    const data = await res.json();
    setTasks(data);
  };

  const addTask = async () => {
    await fetch("/api/add", {
      method: "POST",
      body: JSON.stringify({ text })
    });

    setText("");
    loadTasks();
  };

  const updateTask = async (id: number) => {
    const newText = prompt("New teaxt?");
    if (!newText) return;

    await fetch("/api/update", {
      method: "PUT",
      body: JSON.stringify({ id, text: newText })
    });

    loadTasks();
  };

  const deleteTask = async (id: number) => {
    await fetch(`/api/delete?id=${id}`, {
      method: "DELETE"
    });

    loadTasks();
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <main style={{ padding: 20 }}>
      <h1>CRUD App 🚀</h1>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="New task"
      />

      <button onClick={addTask}>Add</button>

      <ul >
        {tasks.map((t) => (
          <li className="flex mt-2 flex-row items-center gap-4" key={t.id}>
              <span className=" bg-red-300 w-full">
                {t.text}
              </span>

            <button className="p-2 bg-green-300 " onClick={() => updateTask(t.id)}>Edit</button>
            <button onClick={() => deleteTask(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </main>
  );
}