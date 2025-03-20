import React, { useState } from "react";
import { X } from "lucide-react";
import { Todo, Priority, User } from "../types";
import { createTodo } from "../api/todo";

interface TodoModalProps {
  todo?: Todo | null;
  onSave: (todo: Todo) => void;
  onClose: () => void;
  users: User[];
}

export default function TodoModal({
  todo,
  onSave,
  onClose,
  users,
}: TodoModalProps) {
  const [title, setTitle] = useState(todo?.title || "");
  const [description, setDescription] = useState(todo?.description || "");
  const [priority, setPriority] = useState<Priority>(
    todo?.priority || "Medium"
  );
  const [tags, setTags] = useState(todo?.tags.join(", ") || "");
  const [mentions, setMentions] = useState(todo?.mentions.join(", ") || "");

  console.log(mentions);
  const [loading, setLoading] = useState(false);

  const handleCreateTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newTodo = await createTodo({
        title,
        description,
        priority,
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        mentions: mentions
          .split(",")
          .map((mention) => mention.trim().replace("@", ""))
          .filter(Boolean),
        notes: todo?.notes || [],
        createdAt: todo?.createdAt || new Date(),
      });

      onSave(newTodo);
      onClose();
    } catch (error) {
      console.error("Failed to create todo:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">
            {todo ? "Edit Todo" : "Add Todo"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleCreateTodo} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="work, personal, urgent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mention Users (comma-separated)
            </label>
            <input
              type="text"
              value={mentions}
              onChange={(e) => setMentions(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="@sarah, @mike"
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 text-white rounded-lg ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={loading}
            >
              {loading ? "Saving..." : todo ? "Save Changes" : "Add Todo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
