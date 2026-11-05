import React, { useState, useEffect } from 'react';
import { donationsApi } from '../../services/api';
import Badge from '../../components/common/Badge';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export const AdminDonations = () => {
  const [donations, setDonations] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => { (async()=>{ try { const r = await donationsApi.getAll(); if(r.data.success) { setDonations(r.data.data); setTotalAmount(r.data.totalAmount||0); } } catch(e){} finally { setLoading(false); } })(); }, []);

  if(loading) return <LoadingSpinner message="Loading donations..." />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div><h1 className="text-2xl font-extrabold text-slate-900">Donation Records</h1><p className="text-xs text-slate-500 mt-1">{donations.length} records &bull; Total raised (successful): <strong className="text-seva-700">₹{totalAmount.toLocaleString('en-IN')}</strong></p></div>
      </div>

      {donations.length === 0 ? <p className="text-center text-slate-500 py-12">No donation orders yet.</p> : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-soft overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead><tr className="border-b border-slate-100 text-slate-400"><th className="p-4">Transaction ID</th><th className="p-4">Donor</th><th className="p-4">Amount</th><th className="p-4">Cause</th><th className="p-4">Status</th><th className="p-4">Date</th></tr></thead>
            <tbody className="divide-y divide-slate-50">
              {donations.map(d=>(
                <tr key={d._id} className="hover:bg-slate-50">
                  <td className="p-4 font-mono text-[11px] text-slate-600">{d.transactionId}</td>
                  <td className="p-4 font-semibold text-slate-800">{d.donorName}</td>
                  <td className="p-4 font-bold text-seva-700">₹{d.amount?.toLocaleString('en-IN')}</td>
                  <td className="p-4 text-slate-500 max-w-[140px] truncate">{d.causeTitle}</td>
                  <td className="p-4"><Badge variant={d.paymentStatus} size="xs">{d.paymentStatus}</Badge></td>
                  <td className="p-4 text-slate-500">{new Date(d.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default AdminDonations;
