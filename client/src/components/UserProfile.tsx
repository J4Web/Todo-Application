import React, { use } from "react";
import { User as UserAvator, Download, LogOut } from "lucide-react";
import { Todo, User } from "../types";

interface UserProfileProps {
  user: User;
  todos: Todo[];
  onLogout: () => void;
  onClose: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({
  user,
  todos,
  onLogout,
  onClose,
}) => {
  const handleExport = () => {
    const todosData = JSON.stringify(todos, null, 2);

    const blob = new Blob([todosData], { type: "application/json" });

    // Create a URL for the blob
    const url = URL.createObjectURL(blob);

    // Create a temporary anchor element
    const a = document.createElement("a");
    a.href = url;
    a.download = `${user.username}-todos.json`;

    // Trigger the download
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <UserAvator className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {user.username}
              </h2>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-gray-600 hover:text-red-600"
          >
            <LogOut size={18} /> Logout
          </button>

          <button
            onClick={onClose}
            className="flex items-center gap-2 text-gray-600 hover:text-red-600"
          >
            Close
          </button>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold mb-4">Your Todos</h3>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">
              You have {todos.length} todo{todos.length !== 1 ? "s" : ""}
            </p>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              <Download size={18} /> Export Todos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
