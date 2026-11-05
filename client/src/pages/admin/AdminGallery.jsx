import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Image as ImageIcon, Sparkles, Filter, ExternalLink } from 'lucide-react';
import { galleryApi } from '../../services/api';
import Badge from '../../components/common/Badge';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ConfirmModal from '../../components/common/ConfirmModal';
import Modal from '../../components/common/Modal';

export const AdminGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const [form, setForm] = useState({
    title: '',
    category: 'Community Service',
    caption: '',
    imageUrl: '',
    featured: false
  });

  const categories = [
    'Community Service',
    'Education',
    'Healthcare',
    'Food Distribution',
    'Environment',
    'Women Empowerment'
  ];

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const res = await galleryApi.getAll();
      if (res.data?.success) {
        setImages(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load gallery items:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const resetForm = () => {
    setForm({
      title: '',
      category: 'Community Service',
      caption: '',
      imageUrl: '',
      featured: false
    });
    setImageFile(null);
    setPreviewUrl('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile && !form.imageUrl) {
      alert('Please provide an image file or an image URL');
      return;
    }

    setSaving(true);
    try {
      const fd = new FormData();
      fd.append('title', form.title);
      fd.append('category', form.category);
      fd.append('caption', form.caption);
      fd.append('featured', form.featured);

      if (imageFile) {
        fd.append('imageFile', imageFile);
      } else if (form.imageUrl) {
        fd.append('imageUrl', form.imageUrl);
      }

      await galleryApi.upload(fd);
      setShowModal(false);
      resetForm();
      fetchGallery();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to upload gallery image');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await galleryApi.delete(deleteTarget._id);
      setDeleteTarget(null);
      fetchGallery();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete photo');
    }
  };

  if (loading) return <LoadingSpinner message="Loading gallery assets..." />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Manage Gallery</h1>
          <p className="text-xs text-slate-500 mt-1">
            Upload and organize impact photos and volunteer drive moments.
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="btn-primary py-2 px-4 text-xs flex items-center space-x-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Photo</span>
        </button>
      </div>

      {/* Content */}
      {images.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
          <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 text-sm font-semibold">No gallery photos uploaded yet.</p>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="mt-3 btn-secondary py-1.5 px-4 text-xs"
          >
            Add First Photo
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {images.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-soft flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                <img
                  src={item.imageUrl || item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80';
                  }}
                />
                {item.featured && (
                  <span className="absolute top-2 left-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                    Featured
                  </span>
                )}
                <button
                  onClick={() => setDeleteTarget(item)}
                  className="absolute top-2 right-2 w-8 h-8 rounded-lg bg-red-600/90 text-white hover:bg-red-700 flex items-center justify-center shadow transition-colors"
                  title="Delete image"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-3.5 space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-emerald-600">{item.category}</span>
                  <span className="text-slate-400">
                    {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ''}
                  </span>
                </div>
                <h3 className="font-bold text-slate-800 text-sm truncate" title={item.title}>
                  {item.title}
                </h3>
                {item.caption && (
                  <p className="text-xs text-slate-500 line-clamp-2" title={item.caption}>
                    {item.caption}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          resetForm();
        }}
        title="Upload Gallery Photo"
        maxWidth="max-w-xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Title *</label>
            <input
              required
              placeholder="e.g. Free Health Checkup Camp 2026"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="input-field text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Category *</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="input-field text-sm"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Caption / Description</label>
            <textarea
              rows="3"
              placeholder="Describe the occasion, volunteers involved, or community impact..."
              value={form.caption}
              onChange={(e) => setForm({ ...form, caption: e.target.value })}
              className="input-field text-sm resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Image File</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
            />
          </div>

          <div className="relative flex items-center justify-center my-2">
            <span className="bg-white px-2 text-[11px] text-slate-400 uppercase font-semibold">
              or enter URL
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Image URL</label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={form.imageUrl}
              onChange={(e) => {
                setForm({ ...form, imageUrl: e.target.value });
                if (!imageFile) setPreviewUrl(e.target.value);
              }}
              className="input-field text-sm"
            />
          </div>

          {previewUrl && (
            <div className="rounded-lg overflow-hidden border border-slate-200 max-h-48 bg-slate-50 flex items-center justify-center">
              <img src={previewUrl} alt="Preview" className="max-h-48 object-contain" />
            </div>
          )}

          <div className="flex items-center space-x-2 pt-1">
            <input
              type="checkbox"
              id="featured"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              className="rounded text-seva-600 focus:ring-seva-500 w-4 h-4"
            />
            <label htmlFor="featured" className="text-xs font-semibold text-slate-700 cursor-pointer">
              Mark as featured photo on public gallery
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                setShowModal(false);
                resetForm();
              }}
              className="btn-secondary py-2 px-4 text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="btn-primary py-2 px-5 text-xs"
            >
              {saving ? 'Uploading...' : 'Save & Publish'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Gallery Photo"
        message={`Are you sure you want to permanently delete "${deleteTarget?.title}"?`}
      />
    </div>
  );
};

export default AdminGallery;
