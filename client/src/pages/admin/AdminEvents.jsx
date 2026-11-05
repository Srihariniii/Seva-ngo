import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { eventsApi } from '../../services/api';
import Badge from '../../components/common/Badge';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ConfirmModal from '../../components/common/ConfirmModal';
import Modal from '../../components/common/Modal';

export const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title:'', description:'', shortDescription:'', date:'', time:'10:00 AM - 02:00 PM', location:'', category:'Community Drive', image:'', capacity:'100', status:'upcoming' });
  const [imageFile, setImageFile] = useState(null);

  const fetchEvents = async () => { setLoading(true); try { const r = await eventsApi.getAll(); if(r.data.success) setEvents(r.data.data); } catch(e){} finally { setLoading(false); } };
  useEffect(() => { fetchEvents(); }, []);

  const resetForm = () => { setForm({ title:'', description:'', shortDescription:'', date:'', time:'10:00 AM - 02:00 PM', location:'', category:'Community Drive', image:'', capacity:'100', status:'upcoming' }); setImageFile(null); setEditing(null); };
  const openEdit = (ev) => { setForm({ title:ev.title, description:ev.description, shortDescription:ev.shortDescription||'', date:ev.date?.substring(0,10)||'', time:ev.time, location:ev.location, category:ev.category, image:ev.image, capacity:String(ev.capacity||100), status:ev.status }); setEditing(ev); setShowForm(true); };

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      const fd = new FormData(); Object.entries(form).forEach(([k,v])=>fd.append(k,v));
      if(imageFile) fd.append('imageFile', imageFile);
      if(editing) { await eventsApi.update(editing._id, fd); } else { await eventsApi.create(fd); }
      setShowForm(false); resetForm(); fetchEvents();
    } catch(e) { alert(e.response?.data?.message || 'Save failed'); } finally { setSaving(false); }
  };

  const handleDelete = async () => { if(!deleteTarget) return; try { await eventsApi.delete(deleteTarget._id); setDeleteTarget(null); fetchEvents(); } catch(e) { alert('Delete failed'); } };

  if(loading) return <LoadingSpinner message="Loading events..." />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-extrabold text-slate-900">Manage Events</h1>
        <button onClick={()=>{resetForm();setShowForm(true);}} className="btn-primary py-2 px-4 text-xs flex items-center space-x-1"><Plus className="w-4 h-4"/><span>Add Event</span></button>
      </div>

      {events.length === 0 ? <p className="text-center text-slate-500 py-12">No events yet.</p> : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-soft overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead><tr className="border-b border-slate-100 text-slate-400"><th className="p-4">Title</th><th className="p-4">Date</th><th className="p-4">Location</th><th className="p-4">Status</th><th className="p-4">RSVP</th><th className="p-4 text-right">Actions</th></tr></thead>
            <tbody className="divide-y divide-slate-50">
              {events.map(ev=>(
                <tr key={ev._id} className="hover:bg-slate-50">
                  <td className="p-4 font-semibold text-slate-800 max-w-[200px] truncate">{ev.title}</td>
                  <td className="p-4 text-slate-600">{new Date(ev.date).toLocaleDateString()}</td>
                  <td className="p-4 text-slate-500 max-w-[150px] truncate">{ev.location}</td>
                  <td className="p-4"><Badge variant={ev.status} size="xs">{ev.status}</Badge></td>
                  <td className="p-4 text-slate-600">{ev.registeredCount||0}/{ev.capacity||100}</td>
                  <td className="p-4 text-right space-x-1">
                    <button onClick={()=>openEdit(ev)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800"><Pencil className="w-3.5 h-3.5"/></button>
                    <button onClick={()=>setDeleteTarget(ev)} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-500 hover:text-red-600"><Trash2 className="w-3.5 h-3.5"/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal isOpen={showForm} onClose={()=>{setShowForm(false);resetForm();}} title={editing?'Edit Event':'Create Event'} maxWidth="max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label className="block text-xs font-bold text-slate-700 mb-1">Title *</label><input required value={form.title} onChange={e=>setForm({...form,title:e.target.value})} className="input-field text-sm"/></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-xs font-bold text-slate-700 mb-1">Date *</label><input required type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} className="input-field text-sm"/></div>
            <div><label className="block text-xs font-bold text-slate-700 mb-1">Time</label><input value={form.time} onChange={e=>setForm({...form,time:e.target.value})} className="input-field text-sm"/></div>
          </div>
          <div><label className="block text-xs font-bold text-slate-700 mb-1">Location *</label><input required value={form.location} onChange={e=>setForm({...form,location:e.target.value})} className="input-field text-sm"/></div>
          <div><label className="block text-xs font-bold text-slate-700 mb-1">Description *</label><textarea required rows="3" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} className="input-field text-sm resize-none"/></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-xs font-bold text-slate-700 mb-1">Capacity</label><input type="number" value={form.capacity} onChange={e=>setForm({...form,capacity:e.target.value})} className="input-field text-sm"/></div>
            <div><label className="block text-xs font-bold text-slate-700 mb-1">Status</label><select value={form.status} onChange={e=>setForm({...form,status:e.target.value})} className="input-field text-sm"><option value="upcoming">Upcoming</option><option value="ongoing">Ongoing</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option></select></div>
          </div>
          <div><label className="block text-xs font-bold text-slate-700 mb-1">Image URL</label><input value={form.image} onChange={e=>setForm({...form,image:e.target.value})} className="input-field text-sm" placeholder="https://..."/></div>
          <div><label className="block text-xs font-bold text-slate-700 mb-1">Or Upload Image</label><input type="file" accept="image/*" onChange={e=>setImageFile(e.target.files[0])} className="text-xs"/></div>
          <div className="flex justify-end space-x-3 pt-2">
            <button type="button" onClick={()=>{setShowForm(false);resetForm();}} className="btn-secondary py-2 px-4 text-xs">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary py-2 px-5 text-xs">{saving?'Saving...':editing?'Update':'Create'}</button>
          </div>
        </form>
      </Modal>
      <ConfirmModal isOpen={!!deleteTarget} onClose={()=>setDeleteTarget(null)} onConfirm={handleDelete} title="Delete Event" message={`Delete "${deleteTarget?.title}"? This cannot be undone.`}/>
    </div>
  );
};
export default AdminEvents;
