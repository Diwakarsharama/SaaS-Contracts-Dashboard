import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
// import jsPDF from "jspdf";

export default function ContractDetail() {
  const { id } = useParams();
  // Option A: fetch `/contracts.json` and find
  const { data: all, loading, error } = useFetch("/contract.json", [id]);
  // const contract = all ? all.find(c => c.id === id) : null;
  const contract = all ? all.find(c => String(c.id) === String(id)) : null;
  // For richer detail (clauses, insights, evidence) create a file public/contracts/c1.json and fetch it:
  // const { data: detail } = useFetch(`/contracts/${id}.json`, [id]);
  

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-600">Error loading contract</div>;
  if (!contract) return <div className="p-8">Contract not found</div>;

  // Mock detail = extend contract
  const detail = {
    ...contract,
    start: "2023-01-01",
    clauses: [
      { title: "Termination", summary: "90 days notice period.", confidence: 0.82 },
      { title: "Liability Cap", summary: "12 months’ fees limit.", confidence: 0.87 }
    ],
    insights: [
      { risk: "High", message: "Liability cap excludes data breach costs." },
      { risk: "Medium", message: "Auto-renewal unless cancelled 60 days before expiry." }
    ],
    evidence: [{ source: "Section 12.2", snippet: "Total liability limited to 12 months’ fees.", relevance: 0.91 }]
  };

  return (
    <div className="min-h-screen p-6 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded shadow mb-4">
          <h1 className="text-2xl font-semibold">{detail.name}</h1>
          <div className="text-sm text-slate-600">{detail.parties}</div>
          <div className="mt-2 flex gap-4 text-sm">
            <div>Start: {detail.start}</div>
            <div>Expiry: {detail.expiry}</div>
            <div>Status: {detail.status}</div>
            <div>Risk: {detail.risk}</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <section className="bg-white p-4 rounded shadow">
              <h3 className="font-medium mb-2">Clauses</h3>
              <div className="space-y-2">
                {detail.clauses.map((c,i)=>(
                  <div key={i} className="p-3 border rounded">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold">{c.title}</div>
                        <div className="text-sm text-slate-600">{c.summary}</div>
                      </div>
                      <div className="text-sm">{Math.round(c.confidence*100)}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white p-4 rounded shadow">
              <h3 className="font-medium mb-2">AI Insights</h3>
              <ul className="space-y-2">
                {detail.insights.map((ins,i)=>(
                  <li key={i} className="p-3 border rounded flex justify-between">
                    <div>{ins.message}</div>
                    <div className={`px-2 py-1 rounded text-sm ${ins.risk === "High"? "bg-red-100 text-red-700":"bg-yellow-100 text-yellow-700"}`}>{ins.risk}</div>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="space-y-4">
            <div className="bg-white p-4 rounded shadow">
              <h4 className="font-medium mb-2">Evidence</h4>
              {detail.evidence.map((e,i)=>(
                <div key={i} className="border rounded p-3 mb-2">
                  <div className="text-sm font-semibold">{e.source}</div>
                  <div className="text-sm text-slate-600">{e.snippet}</div>
                  <div className="text-xs mt-1 text-slate-500">Relevance: {Math.round(e.relevance*100)}%</div>
                </div>
              ))}
            </div>
            <div className="bg-white p-4 rounded shadow text-sm text-slate-600">
              <div>Actions</div>
              {/* <a
              href={`/contracts/${id}.pdf`}
              download
              className="mt-2 px-3 py-1 rounded border inline-block"
            >
              Download PDF
            </a> */}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
