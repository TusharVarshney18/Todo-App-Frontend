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

  const addNotify = () => toast.success("Todo has been added!");
  const deleteNotify = () => toast.success("Todo has been deleted!");

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
      });
  }, []);

  const handleAdd = async () => {
    if (todo.trim().length <= 2) return;

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
      toast.error("Failed to add todo");
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
      toast.error("Failed to delete todo");
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
      toast.error("Failed to update todo");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && todo.trim().length > 2) {
      handleAdd();
    }
  };

  return (
    <div className="w-full animate-fadeIn">
      <ToastContainer position="bottom-right" theme="colored" />

      <div className="space-y-6">
        {/* Add Todo Section */}
        <div className="relative">
          <input
            type="text"
            onChange={(e) => setTodo(e.target.value)}
            onKeyPress={handleKeyPress}
            value={todo}
            placeholder="What needs to be done?"
            className="w-full px-4 py-3 pr-24 rounded-xl border border-violet-100 focus:border-violet-300 focus:ring-2 focus:ring-violet-200 outline-none transition-all duration-300 placeholder:text-gray-400"
          />
          <button
            onClick={handleAdd}
            disabled={todo.trim().length <= 2}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-violet-600 text-white rounded-lg font-medium transition-all duration-300 hover:bg-violet-700 disabled:opacity-50 disabled:hover:bg-violet-600 transform hover:scale-105 active:scale-95"
          >
            Add Task
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
