import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, Eye, Search } from 'lucide-react';
import { causesApi } from '../../services/api';
import Badge from '../../components/common/Badge';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ConfirmModal from '../../components/common/ConfirmModal';
import Modal from '../../components/common/Modal';
import ProgressBar from '../../components/common/ProgressBar';

const CATEGORIES = ['Education','Food Distribution','Healthcare','Women Empowerment','Rural Development','Elderly Care','Environment','Disaster Relief','Other'];

export const AdminCauses = () => {
  const [causes, setCauses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title:'', description:'', shortDescription:'', category:'Education', image:'', targetAmount:'', amountRaised:'0', featured:false, status:'active' });
  const [imageFile, setImageFile] = useState(null);

  const fetchCauses = async () => { setLoading(true); try { const r = await causesApi.getAll(); if(r.data.success) setCauses(r.data.data); } catch(e){} finally { setLoading(false); } };
  useEffect(() => { fetchCauses(); }, []);

  const resetForm = () => { setForm({ title:'', description:'', shortDescription:'', category:'Education', image:'', targetAmount:'', amountRaised:'0', featured:false, status:'active' }); setImageFile(null); setEditing(null); };
  const openCreate = () => { resetForm(); setShowForm(true); };
  const openEdit = (c) => { setForm({ title:c.title, description:c.description, shortDescription:c.shortDescription||'', category:c.category, image:c.image, targetAmount:String(c.targetAmount), amountRaised:String(c.amountRaised||0), featured:c.featured, status:c.status }); setEditing(c); setShowForm(true); };

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k,v]) => fd.append(k, v));
      if(imageFile) fd.append('imageFile', imageFile);
      if(editing) { await causesApi.update(editing._id, fd); } else { await causesApi.create(fd); }
      setShowForm(false); resetForm(); fetchCauses();
    } catch(e) { alert(e.response?.data?.message || 'Save failed'); } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if(!deleteTarget) return;
    try { await causesApi.delete(deleteTarget._id); setDeleteTarget(null); fetchCauses(); } catch(e) { alert('Delete failed'); }
  };

  if(loading) return <LoadingSpinner message="Loading causes..." />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-extrabold text-slate-900">Manage Causes</h1>
        <button onClick={openCreate} className="btn-primary py-2 px-4 text-xs flex items-center space-x-1"><Plus className="w-4 h-4"/><span>Add Cause</span></button>
      </div>

      {causes.length === 0 ? <p className="text-center text-slate-500 py-12">No causes yet. Click "Add Cause" to create one.</p> : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-soft overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead><tr className="border-b border-slate-100 text-slate-400"><th className="p-4 font-semibold">Title</th><th className="p-4 font-semibold">Category</th><th className="p-4 font-semibold">Progress</th><th className="p-4 font-semibold">Status</th><th className="p-4 font-semibold text-right">Actions</th></tr></thead>
            <tbody className="divide-y divide-slate-50">
              {causes.map(c => (
                <tr key={c._id} className="hover:bg-slate-50">
                  <td className="p-4 font-semibold text-slate-800 max-w-[200px]"><div className="flex items-center space-x-3"><img src={c.image} alt="" className="w-10 h-10 rounded-lg object-cover bg-slate-100 shrink-0"/><span className="truncate">{c.title}</span></div></td>
                  <td className="p-4"><Badge variant={c.category} size="xs">{c.category}</Badge></td>
                  <td className="p-4 min-w-[150px]"><ProgressBar current={c.amountRaised||0} target={c.targetAmount||1} height="h-1.5" showText={false}/><span className="text-[10px] text-slate-500">₹{(c.amountRaised||0).toLocaleString()} / ₹{(c.targetAmount||0).toLocaleString()}</span></td>
                  <td className="p-4"><Badge variant={c.status} size="xs">{c.status}</Badge></td>
                  <td className="p-4 text-right space-x-1">
                    <button onClick={() => openEdit(c)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800"><Pencil className="w-3.5 h-3.5"/></button>
                    <button onClick={() => setDeleteTarget(c)} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-500 hover:text-red-600"><Trash2 className="w-3.5 h-3.5"/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create/Edit Modal */}
      <Modal isOpen={showForm} onClose={() => {setShowForm(false);resetForm();}} title={editing ? 'Edit Cause' : 'Create New Cause'} maxWidth="max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label className="block text-xs font-bold text-slate-700 mb-1">Title *</label><input required value={form.title} onChange={e=>setForm({...form,title:e.target.value})} className="input-field text-sm"/></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-xs font-bold text-slate-700 mb-1">Category</label><select value={form.category} onChange={e=>setForm({...form,category:e.target.value})} className="input-field text-sm">{CATEGORIES.map(c=><option key={c}>{c}</option>)}</select></div>
            <div><label className="block text-xs font-bold text-slate-700 mb-1">Status</label><select value={form.status} onChange={e=>setForm({...form,status:e.target.value})} className="input-field text-sm"><option value="active">Active</option><option value="paused">Paused</option><option value="completed">Completed</option></select></div>
          </div>
          <div><label className="block text-xs font-bold text-slate-700 mb-1">Short Description</label><input value={form.shortDescription} onChange={e=>setForm({...form,shortDescription:e.target.value})} className="input-field text-sm"/></div>
          <div><label className="block text-xs font-bold text-slate-700 mb-1">Full Description *</label><textarea required rows="4" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} className="input-field text-sm resize-none"/></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-xs font-bold text-slate-700 mb-1">Target Amount (₹) *</label><input required type="number" min="0" value={form.targetAmount} onChange={e=>setForm({...form,targetAmount:e.target.value})} className="input-field text-sm"/></div>
            <div><label className="block text-xs font-bold text-slate-700 mb-1">Amount Raised (₹)</label><input type="number" min="0" value={form.amountRaised} onChange={e=>setForm({...form,amountRaised:e.target.value})} className="input-field text-sm"/></div>
          </div>
          <div><label className="block text-xs font-bold text-slate-700 mb-1">Image URL</label><input value={form.image} onChange={e=>setForm({...form,image:e.target.value})} placeholder="https://images.unsplash.com/..." className="input-field text-sm"/></div>
          <div><label className="block text-xs font-bold text-slate-700 mb-1">Or Upload Image File</label><input type="file" accept="image/*" onChange={e=>setImageFile(e.target.files[0])} className="text-xs"/></div>
          <label className="flex items-center space-x-2 text-xs font-semibold text-slate-700"><input type="checkbox" checked={form.featured} onChange={e=>setForm({...form,featured:e.target.checked})} className="rounded"/><span>Mark as Featured</span></label>
          <div className="flex justify-end space-x-3 pt-2">
            <button type="button" onClick={()=>{setShowForm(false);resetForm();}} className="btn-secondary py-2 px-4 text-xs">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary py-2 px-5 text-xs">{saving ? 'Saving...' : editing ? 'Update Cause' : 'Create Cause'}</button>
          </div>
        </form>
      </Modal>

      <ConfirmModal isOpen={!!deleteTarget} onClose={()=>setDeleteTarget(null)} onConfirm={handleDelete} title="Delete Cause" message={`Are you sure you want to permanently delete "${deleteTarget?.title}"?`}/>
    </div>
  );
};
export default AdminCauses;
