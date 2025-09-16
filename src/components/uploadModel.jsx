import React, { useState } from "react";

export default function UploadModal({ onClose }) {
  const [files, setFiles] = useState([]);

  function handleFiles(e) {
    const selected = Array.from(e.target.files).map(f => ({
      name: f.name,
      status: "Uploading",
    }));
    setFiles(selected);

    // simulate upload
    setTimeout(() => {
      setFiles(prev => prev.map(f => ({ ...f, status: "Success" })));
    }, 1500);
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Upload Contracts</h2>
        <input type="file" multiple onChange={handleFiles} className="mb-4" />
        <ul className="space-y-2 mb-4">
          {files.map((f, i) => (
            <li key={i} className="flex justify-between text-sm">
              <span>{f.name}</span>
              <span className={f.status === "Success" ? "text-green-600" : "text-yellow-600"}>
                {f.status}
              </span>
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-indigo-600 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}
