import React, { useState, useEffect } from 'react';
import { volunteersApi } from '../../services/api';
import Badge from '../../components/common/Badge';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export const AdminVolunteers = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { (async()=>{ try { const r = await volunteersApi.getAll(); if(r.data.success) setVolunteers(r.data.data); } catch(e){} finally { setLoading(false); } })(); }, []);

  const updateStatus = async (id, status) => { try { await volunteersApi.updateStatus(id, { status }); setVolunteers(prev=>prev.map(v=>v._id===id?{...v,status}:v)); } catch(e) { alert('Update failed'); } };

  if(loading) return <LoadingSpinner message="Loading volunteers..." />;

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4"><h1 className="text-2xl font-extrabold text-slate-900">Volunteer Applications</h1><p className="text-xs text-slate-500 mt-1">{volunteers.length} total applications</p></div>

      {volunteers.length === 0 ? <p className="text-center text-slate-500 py-12">No volunteer applications yet.</p> : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-soft overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead><tr className="border-b border-slate-100 text-slate-400"><th className="p-4">Name</th><th className="p-4">Email</th><th className="p-4">Phone</th><th className="p-4">City</th><th className="p-4">Interest</th><th className="p-4">Status</th><th className="p-4">Actions</th></tr></thead>
            <tbody className="divide-y divide-slate-50">
              {volunteers.map(v=>(
                <tr key={v._id} className="hover:bg-slate-50">
                  <td className="p-4 font-semibold text-slate-800">{v.name}</td>
                  <td className="p-4 text-slate-600">{v.email}</td>
                  <td className="p-4 text-slate-500">{v.phone}</td>
                  <td className="p-4 text-slate-500">{v.city}</td>
                  <td className="p-4 text-slate-600 max-w-[120px] truncate">{v.areaOfInterest}</td>
                  <td className="p-4"><Badge variant={v.status} size="xs">{v.status}</Badge></td>
                  <td className="p-4"><select value={v.status} onChange={e=>updateStatus(v._id,e.target.value)} className="text-[11px] border border-slate-200 rounded-lg px-2 py-1"><option value="pending">Pending</option><option value="approved">Approved</option><option value="contacted">Contacted</option><option value="rejected">Rejected</option></select></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default AdminVolunteers;
