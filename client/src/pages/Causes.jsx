import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Heart, ArrowRight, Sparkles } from 'lucide-react';
import { causesApi } from '../services/api';
import ProgressBar from '../components/common/ProgressBar';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useLanguage, getLocalizedCause } from '../context/LanguageContext';

const DEFAULT_CAUSES_LIST = [
  {
    _id: 'cause-edu-1',
    title: 'Quality Primary Education for Slum & Rural Children',
    category: 'Education',
    shortDescription: 'Providing school kits, tuition support, and foundational literacy to underprivileged children in Tamil Nadu.',
    image: '/images/educational_support_1790558840228.jpg',
    targetAmount: 500000,
    amountRaised: 320000,
    donorCount: 48
  },
  {
    _id: 'cause-food-2',
    title: 'Daily Nutrition & Community Meal Drives',
    category: 'Food Distribution',
    shortDescription: 'Serving fresh, wholesome hot meals to daily wage laborers, homeless individuals, and destitute elders.',
    image: '/images/food_distribution_1790558827854.jpg',
    targetAmount: 350000,
    amountRaised: 285000,
    donorCount: 72
  },
  {
    _id: 'cause-health-3',
    title: 'Free Mobile Health Camps & Diagnostic Care',
    category: 'Healthcare',
    shortDescription: 'Delivering basic medical consultations, free medicines, and eye checkups in underserved rural areas.',
    image: '/images/community_health_camp_1790558802134.jpg',
    targetAmount: 450000,
    amountRaised: 210000,
    donorCount: 39
  },
  {
    _id: 'cause-women-4',
    title: 'Livelihood & Tailoring Skills for Women',
    category: 'Women Empowerment',
    shortDescription: 'Empowering women from low-income families with sewing, artisanal crafts, and financial literacy.',
    image: '/images/gallery/women-empowerment.jpg',
    targetAmount: 300000,
    amountRaised: 185000,
    donorCount: 31
  },
  {
    _id: 'cause-rural-5',
    title: 'Clean Drinking Water & Community Sanitation',
    category: 'Rural Development',
    shortDescription: 'Installing community bio-sand water filters and clean sanitation facilities in remote hamlets.',
    image: '/images/gallery/rural-outreach.jpg',
    targetAmount: 400000,
    amountRaised: 195000,
    donorCount: 27
  },
  {
    _id: 'cause-elder-6',
    title: 'Comfort, Medicine & Shelter for Elderly In Need',
    category: 'Elderly Care',
    shortDescription: 'Providing medical care, nutritious food, and emotional companionship to destitute seniors.',
    image: '/images/gallery/community-service.jpg',
    targetAmount: 350000,
    amountRaised: 240000,
    donorCount: 42
  }
];

const getFallbackImageForCause = (category, index) => {
  const cat = (category || '').toLowerCase();
  if (cat.includes('edu')) return '/images/educational_support_1790558840228.jpg';
  if (cat.includes('food')) return '/images/food_distribution_1790558827854.jpg';
  if (cat.includes('health')) return '/images/community_health_camp_1790558802134.jpg';
  if (cat.includes('women')) return '/images/gallery/women-empowerment.jpg';
  if (cat.includes('rural')) return '/images/gallery/rural-outreach.jpg';
  if (cat.includes('elder')) return '/images/gallery/community-service.jpg';
  const list = [
    '/images/educational_support_1790558840228.jpg',
    '/images/food_distribution_1790558827854.jpg',
    '/images/community_health_camp_1790558802134.jpg',
    '/images/gallery/women-empowerment.jpg',
    '/images/gallery/rural-outreach.jpg',
    '/images/gallery/community-service.jpg'
  ];
  return list[index % list.length];
};

export const Causes = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [causes, setCauses] = useState(DEFAULT_CAUSES_LIST);
  const [category, setCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [loading, setLoading] = useState(true);

  const { t, language } = useLanguage();

  const categories = [
    { key: 'All', labelKey: 'causes.categoryAll', defaultLabel: 'All' },
    { key: 'Education', labelKey: 'causes.categoryEdu', defaultLabel: 'Education' },
    { key: 'Food Distribution', labelKey: 'causes.categoryFood', defaultLabel: 'Food Distribution' },
    { key: 'Healthcare', labelKey: 'causes.categoryHealth', defaultLabel: 'Healthcare' },
    { key: 'Women Empowerment', labelKey: 'causes.categoryWomen', defaultLabel: 'Women Empowerment' },
    { key: 'Rural Development', labelKey: 'causes.categoryRural', defaultLabel: 'Rural Development' },
    { key: 'Elderly Care', labelKey: 'causes.categoryElderly', defaultLabel: 'Elderly Care' }
  ];

  useEffect(() => {
    const fetchCauses = async () => {
      setLoading(true);
      try {
        const params = {};
        if (category && category !== 'All') params.category = category;
        if (searchTerm.trim()) params.search = searchTerm.trim();
        if (sortBy) params.sort = sortBy;

        const res = await causesApi.getAll(params);
        if (res.data?.success && Array.isArray(res.data.data) && res.data.data.length > 0) {
          // Normalize images so no causes share duplicate image URLs
          const normalized = res.data.data.map((c, i) => {
            let img = c.image;
            if (!img || img === '/images/gallery_health_camp_1790353051447.jpg') {
              img = getFallbackImageForCause(c.category, i);
            }
            return { ...c, image: img };
          });
          setCauses(normalized);
        } else if (!searchTerm && category === 'All') {
          setCauses(DEFAULT_CAUSES_LIST);
        } else {
          // In-memory filter on DEFAULT_CAUSES_LIST if server returns 0
          let filtered = [...DEFAULT_CAUSES_LIST];
          if (category && category !== 'All') {
            filtered = filtered.filter((c) => c.category === category);
          }
          if (searchTerm.trim()) {
            const q = searchTerm.toLowerCase();
            filtered = filtered.filter(
              (c) =>
                c.title.toLowerCase().includes(q) ||
                (c.shortDescription || '').toLowerCase().includes(q)
            );
          }
          setCauses(filtered);
        }
      } catch (err) {
        // Fallback filter
        let filtered = [...DEFAULT_CAUSES_LIST];
        if (category && category !== 'All') {
          filtered = filtered.filter((c) => c.category === category);
        }
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase();
          filtered = filtered.filter(
            (c) =>
              c.title.toLowerCase().includes(q) ||
              (c.shortDescription || '').toLowerCase().includes(q)
          );
        }
        setCauses(filtered);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchCauses, 150);
    return () => clearTimeout(timer);
  }, [category, searchTerm, sortBy]);

  const handleCategorySelect = (cat) => {
    setCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: cat });
    }
  };

  return (
    <div className="space-y-10 sm:space-y-14 pb-20 pt-16">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#F5EFEB] to-[#FAF7F2] border-b border-sandstone-200/90 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="inline-flex items-center space-x-2 text-[#25402B] text-xs font-bold uppercase tracking-wider bg-[#E9F1EB] px-3 py-1 rounded-md border border-[#D3E3D7]">
              <Sparkles className="w-3.5 h-3.5 text-[#3D6B48]" />
              <span>{t('causes.headerPre', 'Ground Impact Programs')}</span>
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              {t('causes.headerTitle', 'Our Active Causes in Tamil Nadu')}
            </h1>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
              {t('causes.headerDesc', 'Every initiative addresses an acute human need with transparent reporting and community stewardship.')}
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Search Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-300 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={t('causes.searchPlaceholder', 'Search causes by title, keyword, or village initiative...')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10 text-sm py-2"
              />
            </div>

            {/* Sort Select */}
            <div className="flex items-center space-x-2 shrink-0 text-xs sm:text-sm">
              <span className="text-stone-600 font-semibold">{t('causes.sortBy', 'Sort By:')}</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field py-2 px-3 text-xs sm:text-sm rounded-lg"
              >
                <option value="newest">{t('causes.newest', 'Newest First')}</option>
                <option value="oldest">{t('causes.oldest', 'Oldest First')}</option>
                <option value="target-high">{t('causes.goalHigh', 'Goal: High to Low')}</option>
                <option value="target-low">{t('causes.goalLow', 'Goal: Low to High')}</option>
                <option value="raised-high">{t('causes.raisedHigh', 'Most Raised')}</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => handleCategorySelect(cat.key)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  category === cat.key
                    ? 'bg-[#2F5237] text-white'
                    : 'bg-[#F3EFE7] text-stone-700 hover:bg-stone-200'
                }`}
              >
                {t(cat.labelKey, cat.defaultLabel)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Causes Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <LoadingSpinner message={t('common.loading', 'Loading causes...')} />
        ) : causes.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-stone-200 p-8 space-y-4">
            <Heart className="w-10 h-10 text-stone-300 mx-auto" />
            <h3 className="text-base font-bold text-stone-800">
              {t('causes.noCauses', 'No causes match your filter criteria.')}
            </h3>
            <button
              onClick={() => {
                setCategory('All');
                setSearchTerm('');
              }}
              className="btn-secondary py-2 px-4 text-xs font-semibold"
            >
              {t('causes.resetFilters', 'Reset Filters')}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {causes.map((rawCause, index) => {
              const cause = getLocalizedCause(rawCause, language);
              const displayImage =
                cause.image && !cause.image.includes('gallery_health_camp')
                  ? cause.image
                  : getFallbackImageForCause(cause.category, index);

              return (
                <div
                  key={cause._id || index}
                  className="card-ngo flex flex-col justify-between group hover:border-stone-400/80 transition-colors"
                >
                  <div>
                    {/* Consistent image dimensions & natural cropping */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                      <img
                        src={displayImage}
                        alt={cause.title}
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = getFallbackImageForCause(cause.category, index);
                        }}
                      />
                      <div className="absolute top-2.5 left-2.5">
                        <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#FAF9F5]/90 text-stone-800 border border-stone-200 shadow-2xs">
                          {cause.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <h3 className="text-base font-bold text-stone-900 line-clamp-2 leading-snug group-hover:text-[#2F5237] transition-colors">
                        <Link to={`/causes/${cause._id}`}>{cause.title}</Link>
                      </h3>

                      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                        {cause.shortDescription || cause.description}
                      </p>

                      <div className="pt-2">
                        <ProgressBar
                          current={cause.amountRaised || 0}
                          target={cause.targetAmount || 100}
                        />
                        <div className="flex justify-between items-center text-[11px] text-stone-500 mt-1.5 font-medium">
                          <span>
                            {t('home.raised', 'Raised')}: ₹{(cause.amountRaised || 0).toLocaleString('en-IN')}
                          </span>
                          <span>
                            {t('home.goal', 'Goal')}: ₹{(cause.targetAmount || 100).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-stone-100 flex items-center justify-between gap-3">
                    <Link
                      to={`/causes/${cause._id}`}
                      className="text-xs font-semibold text-stone-600 hover:text-stone-900"
                    >
                      {t('home.learnDetails', 'Learn Details')}
                    </Link>
                    <Link
                      to={`/donate?causeId=${cause._id}`}
                      className="btn-terracotta py-2 px-3.5 text-xs flex items-center space-x-1.5 shadow-terracotta"
                    >
                      <Heart className="w-3.5 h-3.5 fill-white" />
                      <span>{t('home.supportCause', 'Support Cause')}</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default Causes;
