import React, { useContext, useState } from "react";
import AuthContext from "../contexts/AuthContext";

export default function Topbar() {
  const [open, setOpen] = useState(false);
  const { logout } = useContext(AuthContext);

  return (
    <header className="flex justify-end items-center p-4 bg-white shadow-md sticky top-0 z-10">
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 border rounded px-3 py-1 hover:bg-slate-100"
        >
          <span>John Doe</span>
          <svg
            className={`w-4 h-4 transform ${open ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {open && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md">
            {/* <button  className="block w-full text-left px-4 py-2 hover:bg-slate-100">Profile</button> */}
             <button
              onClick={logout} // ✅ call logout here
              className="block w-full text-left px-4 py-2 hover:bg-slate-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
