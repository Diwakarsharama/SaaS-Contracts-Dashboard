import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import usePagination from "../hooks/usePagination";
import UploadModal from "../components/uploadModel";
import Layout from "../components/Layout"; //

function statusMatches(item, statusFilter) {
  if (!statusFilter) return true;
  return item.status === statusFilter;
}

function riskMatches(item, riskFilter) {
  if (!riskFilter) return true;
  return item.risk === riskFilter;
}

export default function Dashboard() {
  const { data, loading, error } = useFetch("/contract.json", []);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [riskFilter, setRiskFilter] = useState("");
  const [page, setPage] = useState(1);
  const [showUpload, setShowUpload] = useState(false);

  const filtered = useMemo(() => {
    if (!data) return [];
    const q = search.trim().toLowerCase();
    return data.filter(item => {
      const matchesQ =
        q === "" ||
        item.name.toLowerCase().includes(q) ||
        item.parties.toLowerCase().includes(q);
      return matchesQ && statusMatches(item, statusFilter) && riskMatches(item, riskFilter);
    });
  }, [data, search, statusFilter, riskFilter]);

  const { paged, totalPages, currentPage } = usePagination(filtered, page, 10);

  if (loading) return <div className="p-8">Loading contracts...</div>;
  if (error) return <div className="p-8 text-red-600">Error loading: {String(error)}</div>;
  if (!data || data.length === 0) return <div className="p-8">No contracts yet.</div>;

  return (
    <Layout>
      {/* Dashboard Content */}
      
     
      <div className="mx-auto p-4">
        <header className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold">Contracts</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setShowUpload(true)}
              className="px-3 py-2 bg-indigo-600 text-white rounded"
            >
              Upload
            </button>
            <button className="px-3 py-2 border rounded">New</button>
          </div>
          {showUpload && <UploadModal onClose={() => setShowUpload(false)} />}
        </header>

        <div className="bg-white p-4 rounded shadow">
          {/* Filters */}
          <div className="flex gap-3 mb-4">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search name or parties"
              className="flex-1 border rounded p-2"
            />
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="border rounded p-2"
            >
              <option value="">All status</option>
              <option>Active</option>
              <option>Expired</option>
              <option>Renewal Due</option>
            </select>
            <select
              value={riskFilter}
              onChange={e => setRiskFilter(e.target.value)}
              className="border rounded p-2"
            >
              <option value="">All risk</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          {/* Contracts Table */}
          <table className="w-full text-left">
            <thead>
              <tr className="text-sm text-slate-600 border-b">
                <th className="py-2">Contract Name</th>
                <th className="py-2">Parties</th>
                <th className="py-2">Expiry</th>
                <th className="py-2">Status</th>
                <th className="py-2">Risk</th>
              </tr>
            </thead>
            <tbody>
              {paged.map(c => (
                <tr key={c.id} className="border-b hover:bg-slate-50">
                  <td className="py-3">
                    <Link
                      to={`/contracts/${c.id}`}
                      className="text-indigo-600 hover:underline"
                    >
                      {c.name}
                    </Link>
                  </td>
                  <td className="py-3">{c.parties}</td>
                  <td className="py-3">{c.expiry}</td>
                  <td className="py-3">{c.status}</td>
                  <td className="py-3">{c.risk}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-slate-500">{filtered.length} results</div>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                className="px-3 py-1 border rounded"
              >
                Prev
              </button>
              <div className="px-3 py-1 border rounded">
                {currentPage} / {totalPages}
              </div>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                className="px-3 py-1 border rounded"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      
  </Layout>
  );
}
