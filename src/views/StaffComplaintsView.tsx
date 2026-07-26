import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const StaffComplaintsView: React.FC = () => {
  const { complaints, resolveComplaint, staffUser } = useApp();
  const [resolutionNotes, setResolutionNotes] = useState<Record<string, string>>({});

  const shopArea = staffUser?.shopArea || 'Velachery 04';
  const shopComplaints = complaints.filter(c => c.shopArea === shopArea);

  const handleResolve = (complaintId: string) => {
    const note = resolutionNotes[complaintId] || 'Issue inspected and resolved by store manager.';
    resolveComplaint(complaintId, note);
    alert('Complaint ticket marked as RESOLVED!');
  };

  return (
    <div className="bg-[#fbf9f8] min-h-screen flex flex-col pt-16 pb-28 font-sans">
      <main className="pt-6 px-5 max-w-2xl mx-auto w-full flex-grow">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#610000]">Local Grievances</h2>
          <p className="text-xs text-gray-600 mt-1">Shop Area: {shopArea}</p>
        </div>

        <div className="space-y-4">
          {shopComplaints.map((c) => (
            <div
              key={c.id}
              className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-3"
            >
              <div className="flex justify-between items-start gap-2">
                <div>
                  <span className="text-xs font-mono font-bold text-gray-500">
                    {c.trackingId}
                  </span>
                  <h3 className="font-bold text-base text-gray-900 mt-0.5">
                    {c.categoryLabel}
                  </h3>
                  <p className="text-xs text-[#8b0000] font-semibold">
                    Submitted by: {c.citizenName}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                    c.status === 'RESOLVED'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-[#8b0000]'
                  }`}
                >
                  {c.status}
                </span>
              </div>

              <div className="bg-[#fff0f0] p-3.5 rounded-xl border border-red-100 text-xs text-gray-700 leading-relaxed">
                {c.description}
              </div>

              {c.resolutionNote && (
                <div className="bg-green-50 p-3 rounded-xl border border-green-200 text-xs text-green-900">
                  <span className="font-bold block text-[10px] uppercase text-green-800 mb-0.5">
                    Resolution Note
                  </span>
                  {c.resolutionNote}
                </div>
              )}

              {c.status === 'PENDING' && (
                <div className="pt-2 border-t border-gray-100 space-y-2">
                  <input
                    type="text"
                    placeholder="Enter resolution details..."
                    value={resolutionNotes[c.id] || ''}
                    onChange={(e) =>
                      setResolutionNotes({ ...resolutionNotes, [c.id]: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs outline-none focus:border-[#8b0000]"
                  />
                  <button
                    onClick={() => handleResolve(c.id)}
                    className="w-full py-2.5 bg-[#8b0000] text-white font-bold text-xs rounded-xl hover:bg-red-900 transition-colors cursor-pointer"
                  >
                    Mark as Resolved
                  </button>
                </div>
              )}
            </div>
          ))}

          {shopComplaints.length === 0 && (
            <div className="bg-white p-8 rounded-2xl text-center text-gray-500 text-sm">
              No complaint tickets logged for {shopArea}.
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
