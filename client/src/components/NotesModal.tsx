import React, { useState } from "react";
import { X } from "lucide-react";
import { Todo } from "../types";

interface NotesModalProps {
  todo: Todo;
  onAddNote: (note: string) => void;
  onClose: () => void;
  onUpdateTodo?: (todo: Todo) => void;
}

export default function NotesModal({
  todo,
  onAddNote,
  onClose,
  onUpdateTodo,
}: NotesModalProps) {
  const [note, setNote] = useState("");

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (note.trim()) {
      onAddNote(note.trim());

      onUpdateTodo?.({ ...todo, notes: [...(todo?.notes ?? []), note.trim()] });
      setNote("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Notes for "{todo.title}"</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-4">
          <form onSubmit={handleAddNote} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Add a note
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                rows={3}
                placeholder="Type your note here..."
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 border rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              <button
                type="submit"
                disabled={!note.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Note
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
