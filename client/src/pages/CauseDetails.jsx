import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Heart,
  Share2,
  Users,
  ArrowLeft,
  CheckCircle,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { causesApi } from '../services/api';
import ProgressBar from '../components/common/ProgressBar';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useLanguage, getLocalizedCause } from '../context/LanguageContext';

const DEFAULT_CAUSES_MAP = {
  'cause-edu-1': {
    _id: 'cause-edu-1',
    title: 'Quality Primary Education for Slum & Rural Children',
    category: 'Education',
    shortDescription: 'Providing school kits, tuition support, and foundational literacy to underprivileged children in Tamil Nadu.',
    description: 'Access to early education breaks generational cycles of poverty. This initiative supports learning centers with textbooks, uniforms, after-school tutoring, and digital learning tablets so children can stay in school and thrive.',
    image: '/images/educational_support_1790558840228.jpg',
    targetAmount: 500000,
    amountRaised: 320000,
    donorCount: 48
  },
  'cause-food-2': {
    _id: 'cause-food-2',
    title: 'Daily Nutrition & Community Meal Drives',
    category: 'Food Distribution',
    shortDescription: 'Serving fresh, wholesome hot meals to daily wage laborers, homeless individuals, and destitute elders.',
    description: 'No one in our community should sleep hungry. Our volunteer kitchens prepare balanced, nutritious meals daily and distribute dry ration emergency kits with rice, lentils, and cooking oil to families facing distress.',
    image: '/images/food_distribution_1790558827854.jpg',
    targetAmount: 350000,
    amountRaised: 285000,
    donorCount: 72
  },
  'cause-health-3': {
    _id: 'cause-health-3',
    title: 'Free Mobile Health Camps & Diagnostic Care',
    category: 'Healthcare',
    shortDescription: 'Delivering basic medical consultations, free medicines, and eye checkups in underserved rural areas.',
    description: 'Routine healthcare is often inaccessible or prohibitively expensive for rural and informal workers. Our volunteer doctors provide general consultations, diabetes screening, vision tests, and free prescription medications.',
    image: '/images/community_health_camp_1790558802134.jpg',
    targetAmount: 450000,
    amountRaised: 210000,
    donorCount: 39
  },
  'cause-women-4': {
    _id: 'cause-women-4',
    title: 'Livelihood & Tailoring Skills for Women',
    category: 'Women Empowerment',
    shortDescription: 'Empowering women from low-income families with sewing, artisanal crafts, and financial literacy.',
    description: 'When a woman earns an independent livelihood, her entire family benefits. This center offers a six-month intensive tailoring course, machine allocation, and micro-business guidance to enable home-based earnings.',
    image: '/images/gallery/women-empowerment.jpg',
    targetAmount: 300000,
    amountRaised: 185000,
    donorCount: 31
  },
  'cause-rural-5': {
    _id: 'cause-rural-5',
    title: 'Clean Drinking Water & Community Sanitation',
    category: 'Rural Development',
    shortDescription: 'Installing community bio-sand water filters and clean sanitation facilities in remote hamlets.',
    description: 'Waterborne diseases severely impact children in remote villages. We work alongside local residents to construct reliable water purification units and educate schools on hygiene and water conservation.',
    image: '/images/gallery/rural-outreach.jpg',
    targetAmount: 400000,
    amountRaised: 195000,
    donorCount: 27
  },
  'cause-elder-6': {
    _id: 'cause-elder-6',
    title: 'Comfort, Medicine & Shelter for Elderly In Need',
    category: 'Elderly Care',
    shortDescription: 'Providing medical care, nutritious food, and emotional companionship to destitute seniors.',
    description: 'Many elderly citizens live without family support or pension. This initiative provides monthly medicine bundles, mobility aids, regular home check-ins, and assisted living shelter admissions.',
    image: '/images/gallery/community-service.jpg',
    targetAmount: 350000,
    amountRaised: 240000,
    donorCount: 42
  }
};

const getFallbackImageForCause = (category) => {
  const cat = (category || '').toLowerCase();
  if (cat.includes('edu')) return '/images/educational_support_1790558840228.jpg';
  if (cat.includes('food')) return '/images/food_distribution_1790558827854.jpg';
  if (cat.includes('health')) return '/images/community_health_camp_1790558802134.jpg';
  if (cat.includes('women')) return '/images/gallery/women-empowerment.jpg';
  if (cat.includes('rural')) return '/images/gallery/rural-outreach.jpg';
  return '/images/gallery/community-service.jpg';
};

export const CauseDetails = () => {
  const { id } = useParams();
  const [cause, setCause] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const { t, language, isTamil } = useLanguage();

  useEffect(() => {
    const fetchCause = async () => {
      setLoading(true);
      try {
        const res = await causesApi.getById(id);
        if (res.data?.success && res.data.data) {
          let data = res.data.data;
          if (!data.image || data.image.includes('gallery_health_camp')) {
            data = { ...data, image: getFallbackImageForCause(data.category) };
          }
          setCause(data);
        } else if (DEFAULT_CAUSES_MAP[id]) {
          setCause(DEFAULT_CAUSES_MAP[id]);
        } else {
          // Find by id or default to education
          const match = Object.values(DEFAULT_CAUSES_MAP).find((c) => c._id === id);
          setCause(match || DEFAULT_CAUSES_MAP['cause-edu-1']);
        }
      } catch (err) {
        if (DEFAULT_CAUSES_MAP[id]) {
          setCause(DEFAULT_CAUSES_MAP[id]);
        } else {
          const match = Object.values(DEFAULT_CAUSES_MAP).find((c) => c._id === id);
          setCause(match || DEFAULT_CAUSES_MAP['cause-edu-1']);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCause();
    window.scrollTo(0, 0);
  }, [id]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (loading) {
    return (
      <div className="py-24">
        <LoadingSpinner message={t('common.loading', 'Loading cause details...')} />
      </div>
    );
  }

  if (!cause) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-stone-400 mx-auto" />
        <h2 className="text-xl font-bold text-stone-800">Cause Not Found</h2>
        <Link
          to="/causes"
          className="btn-primary py-2.5 px-6 text-sm inline-flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('causeDetails.back', 'Back to Causes')}</span>
        </Link>
      </div>
    );
  }

  const localizedCause = getLocalizedCause(cause, language);
  const percentage =
    localizedCause.targetAmount > 0
      ? Math.min(
          Math.round(
            ((localizedCause.amountRaised || 0) / localizedCause.targetAmount) * 100
          ),
          100
        )
      : 0;

  return (
    <div className="space-y-12 pb-20 pt-16">
      {/* Header */}
      <section className="bg-[#FAF9F5] border-b border-stone-200/90 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <Link
            to="/causes"
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#2F5237] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t('causeDetails.back', 'Back to Causes')}</span>
          </Link>
          <div className="max-w-3xl space-y-2">
            <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#E9F1EB] text-[#25402B] border border-[#D3E3D7]">
              {localizedCause.category}
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight">
              {localizedCause.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Media & Narrative */}
          <div className="lg:col-span-8 space-y-6">
            <div className="rounded-xl overflow-hidden bg-stone-100 aspect-video border border-stone-300 shadow-xs">
              <img
                src={localizedCause.image || getFallbackImageForCause(localizedCause.category)}
                alt={localizedCause.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = getFallbackImageForCause(localizedCause.category);
                }}
              />
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-xl border border-stone-300 shadow-xs space-y-6">
              <h2 className="text-xl font-bold text-stone-900">
                {t('causeDetails.about', 'About This Initiative')}
              </h2>
              <p className="text-sm sm:text-base text-stone-700 leading-relaxed whitespace-pre-line">
                {localizedCause.description}
              </p>

              {/* Fund Allocation Details */}
              <div className="pt-6 border-t border-stone-200 space-y-3">
                <h3 className="text-sm font-bold text-stone-900">
                  {t('causeDetails.fundUse', 'How Funds Are Utilized')}
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-600">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-[#2F5237] shrink-0" />
                    <span>
                      {isTamil
                        ? '100% நேரடி பொருட்கள் மற்றும் உணவு/மருந்து வாங்குதல்'
                        : 'Direct procurement of certified materials, food provisions, or medicine.'}
                    </span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-[#2F5237] shrink-0" />
                    <span>
                      {isTamil
                        ? 'கிராமப்புற கள விநியோகம் மற்றும் ஒருங்கிணைப்பு'
                        : 'Field coordination and direct community distribution.'}
                    </span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-[#2F5237] shrink-0" />
                    <span>
                      {isTamil
                        ? 'வெளிப்படையான மக்கள் தணிக்கை மற்றும் கணக்கு விபரம்'
                        : 'Regular progress verification and open community accounts.'}
                    </span>
                  </li>
                </ul>
              </div>

              {/* Share & Transparency info */}
              <div className="pt-5 border-t border-stone-200 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs text-stone-500 font-medium">
                  <ShieldCheck className="w-4 h-4 text-[#2F5237]" />
                  <span>Verified Seva NGO Community Initiative</span>
                </div>
                <button
                  onClick={handleShare}
                  className="btn-secondary py-1.5 px-3 text-xs flex items-center space-x-1.5"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copied ? 'Link Copied!' : t('causeDetails.shareBtn', 'Share Cause')}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Donation Action Card */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 bg-white p-6 sm:p-7 rounded-xl border border-stone-300 shadow-xs space-y-5">
              <div>
                <span className="text-xs font-bold text-[#2F5237] uppercase tracking-wider block mb-1">
                  {t('causeDetails.collected', 'Amount Raised')}
                </span>
                <div className="text-3xl font-extrabold text-stone-900">
                  ₹{Number(localizedCause.amountRaised || 0).toLocaleString('en-IN')}
                </div>
                <p className="text-xs text-stone-500 mt-1">
                  {t('home.raisedOf', 'raised of')}{' '}
                  <strong className="text-stone-800">
                    ₹{Number(localizedCause.targetAmount || 0).toLocaleString('en-IN')}
                  </strong>{' '}
                  {t('home.goal', 'Goal')}
                </p>
              </div>

              <ProgressBar
                current={localizedCause.amountRaised || 0}
                target={localizedCause.targetAmount || 100}
                height="h-2.5"
                showText={false}
              />

              <div className="grid grid-cols-2 gap-4 text-center py-2 border-y border-stone-200 text-xs">
                <div>
                  <span className="font-bold text-stone-900 text-base block">{percentage}%</span>
                  <span className="text-stone-500">{t('home.raised', 'Funded')}</span>
                </div>
                <div>
                  <span className="font-bold text-stone-900 text-base block">
                    {localizedCause.donorCount || 0}
                  </span>
                  <span className="text-stone-500">{t('home.donors', 'Donors')}</span>
                </div>
              </div>

              <div className="space-y-2.5 pt-1">
                <Link
                  to={`/donate?causeId=${localizedCause._id}`}
                  className="btn-primary w-full py-3 text-sm flex items-center justify-center space-x-2"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>{t('causeDetails.donateBtn', 'Donate to this Cause')}</span>
                </Link>

                <Link
                  to="/volunteer"
                  className="btn-secondary w-full py-2.5 text-xs font-semibold flex items-center justify-center space-x-2"
                >
                  <Users className="w-4 h-4 text-stone-600" />
                  <span>{t('home.ctaVolunteerBtn', 'Become a Volunteer')}</span>
                </Link>
              </div>

              <div className="p-3 rounded-lg bg-[#FAF9F5] border border-stone-200 text-[11px] text-stone-600 space-y-1">
                <p className="font-semibold text-stone-800">100% Transparency</p>
                <p>Donations recorded directly in database with receipt generation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CauseDetails;
