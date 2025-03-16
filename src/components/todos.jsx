import { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Todos = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  const toastConfig = {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "colored",
    style: {
      fontSize: "14px",
      borderRadius: "10px",
      padding: "12px 24px",
    },
  };

  const addNotify = () => toast.success("✓ Task added", toastConfig);
  const deleteNotify = () => toast.success("✓ Task deleted", toastConfig);
  const errorNotify = (message) => toast.error(message, toastConfig);

  useEffect(() => {
    axios
      .get("/api/todos")
      .then((response) => {
        setTodos(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching todos:", err);
        setIsLoading(false);
        errorNotify("Failed to load tasks");
      });
  }, []);

  const handleAdd = async () => {
    if (todo.trim().length <= 2) return;

    setIsAdding(true);
    try {
      const response = await axios.post("/api/todos", {
        todo: todo,
        isCompleted: false,
      });
      const newTodo = response.data;
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setTodo("");
      addNotify();
    } catch (err) {
      console.log("Error adding todo:", err);
      errorNotify("Failed to add task");
    } finally {
      setIsAdding(false);
    }
  };

  const handleEdit = (e, id) => {
    let t = todos.find((i) => i._id === id);
    setTodo(t.todo);
    let newTodos = todos.filter((item) => item._id !== id);
    setTodos(newTodos);
  };

  const handleDelete = async (e, id) => {
    try {
      await axios.delete(`/api/todos/${id}`);
      const newTodos = todos.filter((item) => item._id !== id);
      setTodos(newTodos);
      deleteNotify();
    } catch (err) {
      console.log("Error deleting todo:", err);
      errorNotify("Failed to delete task");
    }
  };

  const handleCheckBox = async (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => item._id === id);
    let updatedTodo = {
      ...todos[index],
      isCompleted: !todos[index].isCompleted,
    };

    try {
      const response = await axios.put(`/api/todos/${id}`, updatedTodo);
      let newTodos = [...todos];
      newTodos[index] = response.data;
      setTodos(newTodos);
    } catch (err) {
      console.log("Error updating todo:", err);
      errorNotify("Failed to update task");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && todo.trim().length > 2) {
      handleAdd();
    }
  };

  return (
    <div className="w-full animate-fadeIn">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="colored"
        style={{ fontSize: "14px" }}
        limit={3}
      />

      <div className="space-y-6">
        {/* Add Todo Section */}
        <div className="relative flex items-center gap-2 bg-white p-2 rounded-xl shadow-sm border border-violet-100 focus-within:border-violet-300 focus-within:ring-2 focus-within:ring-violet-200 hover:border-violet-200 transition-all duration-300">
          <input
            type="text"
            onChange={(e) => setTodo(e.target.value)}
            onKeyPress={handleKeyPress}
            value={todo}
            placeholder="What needs to be done?"
            className="flex-1 px-3 py-2 bg-transparent border-none outline-none text-gray-700 placeholder:text-gray-400"
          />
          <button
            onClick={handleAdd}
            disabled={todo.trim().length <= 2 || isAdding}
            className="shrink-0 px-6 py-2 bg-violet-600 text-white rounded-lg font-medium 
            transition-all duration-300 hover:bg-violet-700 
            disabled:opacity-50 disabled:hover:bg-violet-600 disabled:cursor-not-allowed
            transform hover:scale-[1.02] active:scale-[0.98] hover:shadow-md
            flex items-center gap-2 min-w-[120px] justify-center
            relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            {isAdding ? (
              <>
                <svg
                  className="animate-spin h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    className="opacity-75"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Adding...</span>
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span>Add Task</span>
              </>
            )}
          </button>
        </div>

        {/* Filter Section */}
        <div className="flex items-center space-x-2">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={showFinished}
              onChange={() => setShowFinished(!showFinished)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-600">
              Show Completed
            </span>
          </label>
        </div>

        {/* Todos List */}
        <div className="space-y-3">
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600"></div>
            </div>
          ) : todos.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No tasks yet. Add your first task above!
            </div>
          ) : (
            todos.map((item, index) => {
              if (!showFinished && item.isCompleted) return null;
              return (
                <div
                  key={item._id}
                  className="group bg-white rounded-xl p-4 shadow-sm border border-violet-50 hover:border-violet-100 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md animate-slideUp"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name={item._id}
                          checked={item.isCompleted}
                          onChange={handleCheckBox}
                          className="sr-only peer"
                        />
                        <div className="w-6 h-6 border-2 border-violet-200 peer-checked:border-violet-600 rounded-full flex items-center justify-center peer-checked:bg-violet-600 transition-all duration-300">
                          <svg
                            className="w-4 h-4 text-white scale-0 peer-checked:scale-100 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      </label>
                      <span
                        className={`text-gray-700 truncate ${
                          item.isCompleted ? "line-through text-gray-400" : ""
                        }`}
                      >
                        {item.todo}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={(e) => handleEdit(e, item._id)}
                        className="p-2 text-violet-600 hover:bg-violet-50 rounded-lg transition-colors duration-300"
                        title="Edit"
                      >
                        <FaEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => handleDelete(e, item._id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-300"
                        title="Delete"
                      >
                        <MdDelete className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Todos;
