import React, { useState, useEffect } from 'react';
import { Trash2, Eye, EyeOff } from 'lucide-react';
import { contactApi } from '../../services/api';
import Badge from '../../components/common/Badge';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ConfirmModal from '../../components/common/ConfirmModal';
import Modal from '../../components/common/Modal';

export const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [viewMsg, setViewMsg] = useState(null);

  const fetch_ = async () => { setLoading(true); try { const r = await contactApi.getAll(); if(r.data.success) setMessages(r.data.data); } catch(e){} finally { setLoading(false); } };
  useEffect(() => { fetch_(); }, []);

  const toggleRead = async (id, isRead) => { try { await contactApi.toggleRead(id, { isRead }); setMessages(prev=>prev.map(m=>m._id===id?{...m,isRead}:m)); } catch(e){} };
  const handleDelete = async () => { if(!deleteTarget) return; try { await contactApi.delete(deleteTarget._id); setDeleteTarget(null); fetch_(); } catch(e) { alert('Delete failed'); } };

  if(loading) return <LoadingSpinner message="Loading messages..." />;

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4"><h1 className="text-2xl font-extrabold text-slate-900">Contact Messages</h1><p className="text-xs text-slate-500 mt-1">{messages.filter(m=>!m.isRead).length} unread of {messages.length} total</p></div>

      {messages.length === 0 ? <p className="text-center text-slate-500 py-12">No messages yet.</p> : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-soft overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead><tr className="border-b border-slate-100 text-slate-400"><th className="p-4">From</th><th className="p-4">Subject</th><th className="p-4">Message</th><th className="p-4">Status</th><th className="p-4">Date</th><th className="p-4 text-right">Actions</th></tr></thead>
            <tbody className="divide-y divide-slate-50">
              {messages.map(m=>(
                <tr key={m._id} className={`hover:bg-slate-50 ${!m.isRead?'bg-rose-50/30':''}`}>
                  <td className="p-4"><div className="font-semibold text-slate-800">{m.name}</div><div className="text-[11px] text-slate-400">{m.email}</div></td>
                  <td className="p-4 font-medium text-slate-700">{m.subject}</td>
                  <td className="p-4 text-slate-500 max-w-[200px] truncate">{m.message}</td>
                  <td className="p-4"><span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${m.isRead?'bg-slate-100 text-slate-600':'bg-rose-50 text-rose-700'}`}>{m.isRead?'Read':'New'}</span></td>
                  <td className="p-4 text-slate-400">{new Date(m.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 text-right space-x-1">
                    <button onClick={()=>{setViewMsg(m);if(!m.isRead)toggleRead(m._id,true);}} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500"><Eye className="w-3.5 h-3.5"/></button>
                    <button onClick={()=>toggleRead(m._id,!m.isRead)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500">{m.isRead?<EyeOff className="w-3.5 h-3.5"/>:<Eye className="w-3.5 h-3.5"/>}</button>
                    <button onClick={()=>setDeleteTarget(m)} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-500 hover:text-red-600"><Trash2 className="w-3.5 h-3.5"/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* View Message Modal */}
      <Modal isOpen={!!viewMsg} onClose={()=>setViewMsg(null)} title={viewMsg?.subject||'Message'} maxWidth="max-w-lg">
        {viewMsg && (
          <div className="space-y-4 text-sm">
            <div className="flex justify-between text-xs text-slate-500"><span><strong>From:</strong> {viewMsg.name} ({viewMsg.email})</span><span>{new Date(viewMsg.createdAt).toLocaleString()}</span></div>
            {viewMsg.phone && <p className="text-xs text-slate-500"><strong>Phone:</strong> {viewMsg.phone}</p>}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-slate-700 whitespace-pre-wrap leading-relaxed">{viewMsg.message}</div>
          </div>
        )}
      </Modal>

      <ConfirmModal isOpen={!!deleteTarget} onClose={()=>setDeleteTarget(null)} onConfirm={handleDelete} title="Delete Message" message="Delete this message permanently?"/>
    </div>
  );
};
export default AdminMessages;
