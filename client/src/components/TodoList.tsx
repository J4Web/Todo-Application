import React, { useState, useEffect } from "react";
import {
  Plus,
  Tag,
  User2,
  Trash2,
  Edit2,
  MessageCircle,
  Calendar,
  CheckCircle,
  Circle,
} from "lucide-react";
import { Todo, Priority, User } from "../types";
import TodoModal from "./TodoModal";
import NotesModal from "./NotesModal";
import {
  SnackBarProvider,
  useSnackBar,
  useSnackBarHelpers,
} from "./Snackbarmanager";

type Filter = {
  priority: string;
  tag: string;
  user: string;
  completed: string;
};

type Props = {
  initialTodos?: Todo[];
  onTodosChange?: (todos: Todo[]) => void;
  currentUser: User;
  users: User[];
  onNewTodo?: (todo: Todo) => void;
};

const TodoList: React.FC<Props> = ({
  initialTodos: todos = [],
  onTodosChange,
  currentUser,
  users,
  onNewTodo,
}) => {
  const [showTodoModal, setShowTodoModal] = useState<boolean>(false);
  const [showNotesModal, setShowNotesModal] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState<Filter>({
    priority: "",
    tag: "",
    user: "",
    completed: "all",
  });
  const [sortBy, setSortBy] = useState<string>("date");

  useEffect(() => {
    if (onTodosChange) {
      onTodosChange(todos);
    }
  }, [todos, onTodosChange]);

  const { showSnackBar } = useSnackBar();
  const handleAddTodo = (todo: Todo) => {
    const newTodo: Todo = {
      ...todo,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      userId: currentUser.id as string,
      notes: [],
      completed: false, // New todos start as not completed
    };
    onNewTodo?.(newTodo);
    setShowTodoModal(false);
  };

  const handleEditTodo = (todo: Todo) => {
    debugger;
    setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
    setShowTodoModal(false);
    setSelectedTodo(null);
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggleComplete = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    showSnackBar("Todo updated successfully", "success", {
      title: "Custom Title",
      autoHideDuration: 10000,
      position: "top-right",
    });
  };

  const handleAddNote = (todoId: string, note: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === todoId
          ? { ...todo, notes: [...(todo.notes || []), note] }
          : todo
      )
    );
    setShowNotesModal(false);
    setSelectedTodo(null);
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border-red-300";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "Low":
        return "bg-green-100 text-green-800 border-green-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getUserById = (userId: string) => {
    return (
      users.find((user) => user.id === userId) || {
        id: userId,
        name: "Unknown User",
      }
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const filteredTodos = todos
    .filter((todo) => todo.userId === currentUser.id)
    .filter((todo) => {
      if (filter.priority && todo.priority !== filter.priority) return false;
      if (filter.tag && !todo.tags.includes(filter.tag)) return false;
      if (filter.user && !todo.mentions.includes(filter.user)) return false;
      if (filter.completed === "completed" && !todo.completed) return false;
      if (filter.completed === "active" && todo.completed) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      const priorityOrder: Record<Priority, number> = {
        High: 3,
        Medium: 2,
        Low: 1,
      };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });

  const allTags = Array.from(new Set(todos.flatMap((todo) => todo.tags)));

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Todo List</h1>
        <button
          onClick={() => setShowTodoModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} /> Add Todo
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg mb-6 shadow-sm border">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              value={filter.priority}
              onChange={(e) =>
                setFilter({ ...filter, priority: e.target.value })
              }
              className="border rounded-md px-3 py-1 text-sm w-32"
            >
              <option value="">All</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tag
            </label>
            <select
              value={filter.tag}
              onChange={(e) => setFilter({ ...filter, tag: e.target.value })}
              className="border rounded-md px-3 py-1 text-sm w-32"
            >
              <option value="">All</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={filter.completed}
              onChange={(e) =>
                setFilter({ ...filter, completed: e.target.value })
              }
              className="border rounded-md px-3 py-1 text-sm w-32"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sort by
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded-md px-3 py-1 text-sm w-32"
            >
              <option value="date">Date</option>
              <option value="priority">Priority</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredTodos.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No todos yet. Create one to get started!
          </div>
        ) : (
          filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className={`bg-white p-4 rounded-lg shadow-sm border ${
                todo.completed
                  ? "border-gray-200 bg-gray-50"
                  : "border-gray-200 hover:shadow-md"
              } transition-shadow`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <button
                      onClick={() => handleToggleComplete(todo.id)}
                      className={`p-1 rounded-full ${
                        todo.completed
                          ? "text-green-600 hover:bg-green-50"
                          : "text-gray-400 hover:bg-gray-50"
                      }`}
                      title={
                        todo.completed
                          ? "Mark as incomplete"
                          : "Mark as complete"
                      }
                    >
                      {todo.completed ? (
                        <CheckCircle size={20} />
                      ) : (
                        <Circle size={20} />
                      )}
                    </button>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                        todo.priority
                      )}`}
                    >
                      {todo.priority}
                    </span>
                    <span className="text-gray-500 text-xs flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {formatDate(todo.createdAt)}
                    </span>
                  </div>

                  <h3
                    className={`font-semibold text-lg ${
                      todo.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {todo.title}
                  </h3>
                  <p
                    className={`mt-1 mb-3 ${
                      todo.completed ? "text-gray-500" : "text-gray-600"
                    }`}
                  >
                    {todo.description}
                  </p>

                  {/* Tags */}
                  {todo.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {todo.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                            todo.completed
                              ? "bg-blue-50 text-blue-400"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          <Tag size={12} className="mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Mentions */}
                  {todo.mentions && todo.mentions.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {todo.mentions.map((userId) => (
                        <span
                          key={userId}
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                            todo.completed
                              ? "bg-purple-50 text-purple-400"
                              : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          <User2 size={12} className="mr-1" />
                          {getUserById(userId).name}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Notes count */}
                  {todo.notes && todo.notes.length > 0 && (
                    <div className="mt-3 text-gray-500 text-sm flex items-center">
                      <MessageCircle size={16} className="mr-1" />
                      {todo.notes.length} note
                      {todo.notes.length !== 1 ? "s" : ""}
                    </div>
                  )}
                </div>

                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => {
                      setSelectedTodo(todo);
                      setShowNotesModal(true);
                    }}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full"
                    title="Add notes"
                  >
                    <MessageCircle size={20} />
                  </button>
                  <button
                    onClick={() => {
                      console.log("Edit todo", todo);
                      setSelectedTodo(todo);
                      setShowTodoModal(true);
                    }}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full"
                    title="Edit todo"
                  >
                    <Edit2 size={20} />
                  </button>
                  <button
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full"
                    title="Delete todo"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {showTodoModal && (
        <TodoModal
          todo={selectedTodo}
          onSave={selectedTodo ? handleEditTodo : handleAddTodo}
          onClose={() => {
            setShowTodoModal(false);
            setSelectedTodo(null);
          }}
          users={users}
        />
      )}

      {showNotesModal && selectedTodo && (
        <NotesModal
          todo={selectedTodo}
          onAddNote={(note) => handleAddNote(selectedTodo.id, note)}
          onClose={() => {
            setShowNotesModal(false);
            setSelectedTodo(null);
          }}
        />
      )}
    </div>
  );
};

export default TodoList;
