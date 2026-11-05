import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, Search, Sparkles, Filter, X, Maximize2, Tag } from 'lucide-react';
import { galleryApi } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Badge from '../components/common/Badge';

export const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [lightboxImage, setLightboxImage] = useState(null);

  const categories = [
    'All',
    'Education',
    'Healthcare',
    'Food Distribution',
    'Environment',
    'Women Empowerment',
    'Community Service'
  ];

  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);
      try {
        const params = {};
        if (selectedCategory !== 'All') {
          params.category = selectedCategory;
        }
        if (searchTerm.trim()) {
          params.search = searchTerm.trim();
        }

        const res = await galleryApi.getAll(params);
        if (res.data?.success) {
          setImages(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load gallery items:', err.message);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchGallery, 250);
    return () => clearTimeout(debounce);
  }, [selectedCategory, searchTerm]);

  return (
    <div className="space-y-12 pb-24">
      {/* Hero Header */}
      <section className="bg-slate-900 text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Moments of Change</span>
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              Impact & Activity Gallery
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Explore snapshots of our grassroots programs, community drives, and the smiling faces of the lives we touch across India.
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Categories */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-seva-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Field */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search gallery..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-seva-500 focus:border-transparent"
            />
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <LoadingSpinner message="Loading gallery photos..." />
        ) : images.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 p-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
              <ImageIcon className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">No photos found</h3>
            <p className="text-slate-500 text-sm mt-1 max-w-sm mx-auto">
              {searchTerm || selectedCategory !== 'All'
                ? 'Try adjusting your search query or selecting a different category filter.'
                : 'No gallery photos have been uploaded yet. Please check back later.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((item) => (
              <div
                key={item._id}
                onClick={() => setLightboxImage(item)}
                className="group relative bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-soft hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
              >
                <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                  <img
                    src={item.imageUrl || item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-xs font-semibold flex items-center space-x-1">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Click to enlarge</span>
                    </span>
                  </div>
                  {item.featured && (
                    <span className="absolute top-3 left-3 bg-amber-500 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded shadow">
                      Featured
                    </span>
                  )}
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="inline-block text-[11px] font-semibold text-emerald-600 mb-1">
                      {item.category || 'Initiative'}
                    </span>
                    <h3 className="font-bold text-slate-800 text-sm line-clamp-1 group-hover:text-seva-600 transition-colors">
                      {item.title}
                    </h3>
                    {item.caption && (
                      <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                        {item.caption}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl animate-in fade-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[65vh] bg-slate-950 flex items-center justify-center overflow-hidden">
              <img
                src={lightboxImage.imageUrl || lightboxImage.image}
                alt={lightboxImage.title}
                className="max-h-[65vh] w-auto max-w-full object-contain"
              />
            </div>

            <div className="p-6 space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                  {lightboxImage.category || 'Community Service'}
                </span>
                <span className="text-xs text-slate-400">
                  {lightboxImage.createdAt ? new Date(lightboxImage.createdAt).toLocaleDateString() : ''}
                </span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">{lightboxImage.title}</h2>
              {lightboxImage.caption && (
                <p className="text-sm text-slate-600 leading-relaxed">{lightboxImage.caption}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
