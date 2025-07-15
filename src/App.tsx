import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([] as any[]);
  const [inputText, setInputText] = useState("");

  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editedText, setEditedText] = useState("");

  function handleInputChange(event: any) {
    setInputText(event.target.value);
  }

  function addTask() {
    if (inputText.trim() === "") {
      return;
    }

    const newTask = {
      id: Math.random(),
      text: inputText,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setInputText("");
  }

  function deleteTask(taskId: number) {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  }

  function startEditing(task: any) {
    setEditingTaskId(task.id);
    setEditedText(task.text);
  }

  function handleEditChange(e: any) {
    setEditedText(e.target.value);
  }

function saveEditedTask() {
  if (editedText.trim() === "") {
    // If empty, remove the task
    const updatedTasks = tasks.filter((task) => task.id !== editingTaskId);
    setTasks(updatedTasks);
  } else {
    // Otherwise, save the edited text
    const updatedTasks = tasks.map((task) =>
      task.id === editingTaskId ? { ...task, text: editedText.trim() } : task
    );
    setTasks(updatedTasks);
  }

  // In both cases, exit edit mode
  setEditingTaskId(null);
  setEditedText("");
}



  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#2f2e2eff",
      }}
    >
      <div
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "300px",
          borderRadius: "8px",
          color: "white",
        }}
      >
        <h1>TODO LIST</h1>
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <input
            type="text"
            placeholder="Write something..."
            value={inputText}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTask();
              }
            }}
          />
          <button onClick={addTask}>Add</button>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {tasks.map((task) => {
              return (
                <div key={task.id}>
                  <li
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "10px",
                      alignContent: "center",
                    }}
                  >
                    {editingTaskId === task.id ? (
                      <>
                        <input
                          type="text"
                          value={editedText}
                          onChange={handleEditChange}
                        />
                        <button onClick={saveEditedTask}>Save</button>
                      </>
                    ) : (
                      <>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {task.text}
                        </div>
                        <button onClick={() => startEditing(task)}>Edit</button>
                        <button onClick={() => deleteTask(task.id)}>
                          Delete
                        </button>
                      </>
                    )}
                  </li>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
