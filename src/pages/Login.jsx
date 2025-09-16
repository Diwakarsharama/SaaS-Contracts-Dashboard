import React, { useContext, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = login({ username, password });
    if (!res.ok) {
      setErr(res.message);
      return;
    }
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-semibold mb-4">Sign in</h1>
        {err && <div className="text-red-600 mb-3">{err}</div>}
        <label className="block mb-2">
          <span className="text-sm">Username</span>
          <input className="mt-1 block w-full rounded-md border p-2" value={username} onChange={e=>setUsername(e.target.value)} required />
        </label>
        <label className="block mb-4">
          <span className="text-sm">Password</span>
          <input type="password" className="mt-1 block w-full rounded-md border p-2" value={password} onChange={e=>setPassword(e.target.value)} required />
        </label>
        <button className="w-full py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">Login</button>
        <p className="mt-3 text-xs text-slate-500">Use any username and password <b>test123</b></p>
      </form>
    </div>
  );
}
