import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Todos = () => {
  const [todo, setTodo] = useState(""); // Input text
  const [todos, setTodos] = useState([]); // Hold all todos
  const [showFinished, setShowFinished] = useState(true);

  const addNotify = () => toast.success("Todo has been added!");
  const deleteNotify = () => toast.success("Todo has been deleted!");

  // Fetch todos from backend on component mount
  useEffect(() => {
    axios
      .get("https://todo-app-backend-sand.vercel.app/")
      .then((response) => {
        setTodos(response.data); // Set todos from the server response
      })
      .catch((err) => {
        console.log("Error fetching todos:", err);
      });
  }, []);

  // Add new todo
  const handleAdd = async () => {
    try {
      const response = await axios.post("https://todo-app-backend-sand.vercel.app/api/todos", {
        todo: todo,
        isCompleted: false,
      });
      const newTodo = response.data;
      setTodos((prevTodos) => [...prevTodos, newTodo]); // Add the new todo to the list
      setTodo(""); // Clear the input field
      addNotify(); // Notify on successful add
    } catch (err) {
      console.log("Error adding todo:", err);
    }
  };

  // Edit a todo
  const handleEdit = (e, id) => {
    let t = todos.find((i) => i._id === id);
    setTodo(t.todo);
    let newTodos = todos.filter((item) => item._id !== id);
    setTodos(newTodos);
  };

  // Delete a todo
  const handleDelete = async (e, id) => {
    try {
      await axios.delete(`https://todo-app-backend-sand.vercel.app/api/todos/${id}`);
      const newTodos = todos.filter((item) => item._id !== id);
      setTodos(newTodos); // Update state after deletion
      deleteNotify(); // Notify on successful delete
    } catch (err) {
      console.log("Error deleting todo:", err);
    }
  };

  // Toggle completed state of a todo
  const handleCheckBox = async (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => item._id === id);
    let updatedTodo = {
      ...todos[index],
      isCompleted: !todos[index].isCompleted,
    };

    try {
      const response = await axios.put(
        `https://todo-app-backend-sand.vercel.app/api/todos/${id}`,
        updatedTodo
      );
      let newTodos = [...todos];
      newTodos[index] = response.data; // Update the todo in the state with the server response
      setTodos(newTodos);
    } catch (err) {
      console.log("Error updating todo:", err);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  // Toggle show/hide completed todos
  const handleToggleFinished = () => {
    setShowFinished(!showFinished);
  };

  return (
    <>
      <ToastContainer />

      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-1/2">
        <h1 className="font-bold text-center text-3xl">
          Manage Your Todos at one place{" "}
        </h1>
        <div className="addtodo flex flex-col gap-4">
          <h2 className="text-2xl font-bold"> Add Todo</h2>
          <div className="flex">
            <input
              type="text"
              onChange={handleChange}
              value={todo || ""}
              className="w-full my-1 rounded-lg px-5 py-1"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length <= 2}
              className="bg-violet-500 hover:bg-violet-800 disabled:bg-violet-800 p-4 py-2 font-bold text-sm mx-2 text-white rounded-md"
            >
              Save
            </button>
          </div>
        </div>
        <input
          id="showfinished"
          className="my-4"
          onChange={handleToggleFinished}
          type="checkbox"
          checked={showFinished}
        />
        <label className="mx-2" htmlFor="showfinished">
          Show Finished
        </label>
        <div className="h-[1px] bg-black opacity-20 w-[90%] my-3 mx-auto"></div>
        <h2 className="text-2xl font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-5">No Todos</div>}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div key={item._id} className="todo flex my-3 justify-between">
                  <div className="flex gap-5">
                    <input
                      name={item._id}
                      onChange={handleCheckBox}
                      type="checkbox"
                      checked={item.isCompleted}
                    />
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                  </div>

                  <div className="buttons flex h-full">
                    <button
                      onClick={(e) => handleEdit(e, item._id)}
                      className="bg-violet-500 hover:bg-violet-800 p-2 py-1 font-bold text-sm text-white rounded-md mx-1"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, item._id)}
                      className="bg-violet-500 hover:bg-violet-800 p-2 py-1 font-bold text-sm text-white rounded-md mx-1"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Todos;
