import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const links = [
    { name: "Contracts", path: "/" },
    { name: "Insights", path: "/insights" },
    { name: "Reports", path: "/reports" },
    { name: "Settings", path: "/settings" }
  ];

  return (
    <aside className="w-60 bg-white h-screen shadow-md fixed md:relative">
      <div className="p-6 text-xl font-bold border-b">SaaS Dashboard</div>
      <nav className="mt-6">
        {links.map(link => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `block px-6 py-3 rounded hover:bg-indigo-100 ${isActive ? "bg-indigo-200 font-semibold" : ""}`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
