import React from "react"
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 ml-0 md:ml-0 flex flex-col">
        <Topbar />
        <main className="p-6 flex-1">{children}</main>
      </div>
    </div>
  );
}
