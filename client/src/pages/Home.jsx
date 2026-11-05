import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  ArrowRight,
  BookOpen,
  Utensils,
  Stethoscope,
  Users,
  CheckCircle2,
  MapPin,
  ShieldCheck,
  Building2,
  Award,
  Sparkles,
  Calendar,
  HandHeart,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Home = () => {
  const { t, language, isTamil } = useLanguage();
  const navigate = useNavigate();
  const [quickAmount, setQuickAmount] = useState(1000);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Quick donation impact descriptions
  const getImpactDescription = (amt) => {
    switch (amt) {
      case 500:
        return isTamil
          ? '₹500: ஒரு எளிய பள்ளி மாணவருக்கு 1 மாத புத்தகங்கள் மற்றும் எழுதுபொருட்கள்'
          : '₹500 provides 1 month of stationery & textbooks for a rural child';
      case 1000:
        return isTamil
          ? '₹1,000: ஒரு முதியவருக்கு 1 மாதத்திற்கான சத்தான மதிய உணவு'
          : '₹1,000 provides wholesome daily nutrition for a destitute senior for 1 month';
      case 2500:
        return isTamil
          ? '₹2,500: 10 கிராமப்புற பெரியவர்களுக்கு இலவச மருத்துவ முகாம் பரிசோதனை மற்றும் மருந்துகள்'
          : '₹2,500 funds medical screening & prescription care for 10 village elders';
      case 5000:
        return isTamil
          ? '₹5,000: மகளிர் தையல் மையத்திற்கு 1 தையல் இயந்திரம் மற்றும் பயிற்சி பொருட்கள்'
          : '₹5,000 sponsors sewing materials & vocational tailoring training for 2 rural women';
      default:
        return isTamil
          ? 'ஒவ்வொரு ரூபாயும் 100% நேரடியாக களப்பணிக்கே செல்கிறது'
          : '100% of every contribution reaches verified village beneficiaries';
    }
  };

  // 4 Core Verified Causes
  const causes = [
    {
      id: 'education-support',
      title: isTamil ? 'கல்வி ஆதரவு' : 'Child Education & Learning Kits',
      tag: isTamil ? 'கல்வி' : 'Education',
      desc: isTamil
        ? 'பின்தங்கிய மற்றும் கிராமப்புற குழந்தைகள் இடைநிற்றலின்றி கல்வி கற்க நோட்டுப் புத்தகங்கள், சீருடை மற்றும் மாலைநேர கற்றல் மையங்களை வழங்குகிறோம்.'
        : 'Helping underprivileged children access schooling, essential study kits, and community evening tutoring centers.',
      image: '/images/educational_support_1790558840228.jpg',
      icon: BookOpen,
      raised: 185000,
      goal: 250000,
      donors: 84,
      causeId: 'cause-edu-1'
    },
    {
      id: 'healthcare-service',
      title: isTamil ? 'கிராமப்புற சுகாதார சேவை' : 'Mobile Rural Health Camps',
      tag: isTamil ? 'சுகாதாரம்' : 'Healthcare',
      desc: isTamil
        ? 'மருத்துவ வசதி குறைந்த கிராமங்களுக்குச் சென்று மருத்துவர் பரிசோதனை, ரத்த அழுத்த கண்காணிப்பு மற்றும் இலவச மருந்துகளை வழங்குகிறோம்.'
        : 'Delivering free mobile medical checkups, doctor consultations, and essential prescription medicines in rural pockets.',
      image: '/images/health_awareness_program_1790558815099.jpg',
      icon: Stethoscope,
      raised: 210000,
      goal: 300000,
      donors: 112,
      causeId: 'cause-health-3'
    },
    {
      id: 'food-security',
      title: isTamil ? 'முதியோர் உணவு பாதுகாப்பு' : 'Daily Nutrition & Elder Meals',
      tag: isTamil ? 'உணவு' : 'Food Security',
      desc: isTamil
        ? 'ஆதரவற்ற முதியவர்கள் மற்றும் தினக்கூலி தொழிலாளர்களுக்கு சத்தான சூடான உணவுகளையும் அவசர உலர் ரேஷன் பொருட்களையும் வழங்குகிறோம்.'
        : 'Providing wholesome hot meals and emergency dry ration kits to destitute elders and struggling daily wage families.',
      image: '/images/food_distribution_1790558827854.jpg',
      icon: Utensils,
      raised: 340000,
      goal: 400000,
      donors: 165,
      causeId: 'cause-food-2'
    },
    {
      id: 'community-welfare',
      title: isTamil ? 'மகளிர் தையல் வாழ்வாதாரம்' : 'Women Livelihood & Tailoring Hub',
      tag: isTamil ? 'சமூக நலன்' : 'Community Welfare',
      desc: isTamil
        ? 'மகளிர் வாழ்வாதார தையல் பயிற்சி, முதியோர் பராமரிப்பு மற்றும் கிராமப்புற அடிப்படை தேவைகளை மேம்படுத்தி குடும்பங்களை தற்சார்புடன் வாழச் செய்கிறோம்.'
        : 'Supporting local communities with women vocational tailoring skills, elder care, and sustainable grassroots welfare.',
      image: '/images/gallery/women-empowerment.jpg',
      icon: Users,
      raised: 125000,
      goal: 200000,
      donors: 62,
      causeId: 'cause-women-4'
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 pt-16">
      {/* =========================================================
          1. HERO SECTION
          ========================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F5EFEB] via-[#FAF7F2] to-[#FAF7F2] border-b border-sandstone-200/90 pt-8 pb-14 sm:pt-16 sm:pb-24">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-forest-100/60 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-terracotta-100/40 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Regional Grassroots Badge */}
              <div className="inline-flex items-center space-x-2 bg-forest-100 text-forest-900 px-4 py-1.5 rounded-full text-xs font-bold border border-forest-200/90 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-terracotta-500 animate-pulse"></span>
                <MapPin className="w-3.5 h-3.5 text-forest-700" />
                <span>{t('home.heroBadge', 'Grassroots Humanitarian Initiative • Tamil Nadu')}</span>
              </div>

              {/* Exact Suggested Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-bark-900 tracking-tight leading-[1.2] font-serif-heading">
                {t(
                  'home.heroTitle',
                  'ஒவ்வொருவரின் வாழ்க்கையிலும் நல்ல மாற்றத்தை உருவாக்குவோம்'
                )}
              </h1>

              {/* Exact Suggested Description */}
              <p className="text-base sm:text-lg text-bark-600 leading-relaxed font-normal max-w-2xl">
                {t(
                  'home.heroDesc',
                  'கல்வி, சுகாதாரம், உணவு மற்றும் சமூக நலன் ஆகிய துறைகளில் ஆதரவு வழங்கி, அனைவருக்கும் சிறந்த எதிர்காலத்தை உருவாக்கப் பாடுபடுகிறோம்.'
                )}
              </p>

              {/* CTA Buttons */}
              <div className="pt-2 flex flex-wrap gap-3.5 items-center">
                <Link
                  to="/donate"
                  className="btn-terracotta py-3.5 px-7 text-sm font-bold shadow-terracotta flex items-center space-x-2"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>{t('home.heroDonateBtn', 'தானம் செய்')}</span>
                </Link>

                <a
                  href="#causes"
                  onClick={(e) => scrollToSection(e, 'causes')}
                  className="btn-secondary py-3.5 px-6 text-sm font-semibold inline-flex items-center space-x-2 shadow-2xs cursor-pointer"
                >
                  <span>{t('home.heroCausesBtn', 'எங்கள் நோக்கங்கள்')}</span>
                  <ArrowRight className="w-4 h-4 text-forest-700" />
                </a>
              </div>

              {/* Trust Indicators Strip */}
              <div className="pt-6 border-t border-sandstone-300/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-semibold text-bark-700">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-forest-700 shrink-0" />
                  <span>{t('home.trustDirect', '100% Direct Field Aid')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-forest-700 shrink-0" />
                  <span>{t('home.trustAudits', 'Community Accountability')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-terracotta-600 shrink-0" />
                  <span>{t('home.trustLocal', 'Rooted in Tamil Nadu')}</span>
                </div>
              </div>
            </div>

            {/* Right Imagery Column with Handcrafted Organic Frame */}
            <div className="lg:col-span-5 relative">
              <div className="relative bg-white p-3.5 sm:p-4 rounded-3xl border border-sandstone-300 shadow-soft">
                {/* Main Hero Photograph */}
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-sandstone-100 relative">
                  <img
                    src="/images/community_health_camp_1790558802134.jpg"
                    alt={
                      isTamil
                        ? 'தமிழ்நாடு கிராமப்புற மருத்துவ முகாம் மற்றும் முதியோர் பராமரிப்பு'
                        : 'Doctor caring for community elder at rural medical camp in Tamil Nadu'
                    }
                    className="w-full h-full object-cover transform hover:scale-102 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/images/gallery/community-service.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bark-950/40 via-transparent to-transparent"></div>
                </div>

                {/* Floating Badge 1: Hot Meals */}
                <div className="absolute -bottom-4 -left-3 sm:-left-6 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-sandstone-200 shadow-soft flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-terracotta-100 text-terracotta-700 flex items-center justify-center shrink-0">
                    <Utensils className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-extrabold text-bark-900 leading-none">15,200+</div>
                    <div className="text-[11px] text-bark-500 font-medium mt-0.5">
                      {isTamil ? 'சத்தான உணவுகள்' : 'Wholesome Meals'}
                    </div>
                  </div>
                </div>

                {/* Floating Badge 2: Students */}
                <div className="absolute -top-3 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl border border-sandstone-200 shadow-soft flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-xl bg-forest-100 text-forest-800 flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-forest-950">3,450+ {isTamil ? 'மாணவர்கள்' : 'Students'}</div>
                    <div className="text-[10px] text-bark-500">{isTamil ? 'கல்வி உதவி' : 'Supported'}</div>
                  </div>
                </div>

                {/* Bottom Photo Caption */}
                <div className="pt-6 sm:pt-4 px-1 space-y-1">
                  <p className="text-xs font-medium italic text-bark-700 leading-snug">
                    {t(
                      'home.photoQuote',
                      '"Every hand extended in service brings dignity to a family."'
                    )}
                  </p>
                  <p className="text-[11px] text-bark-500 font-semibold flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-forest-700" />
                    <span>{t('home.photoLocation', 'Community Healthcare & Elder Service, Tamil Nadu')}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          2. IMPACT STATS BAR
          ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-3xl border border-sandstone-200/90 p-6 sm:p-8 shadow-soft grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="space-y-1 text-center sm:text-left border-r border-sandstone-100 last:border-r-0">
            <div className="w-10 h-10 rounded-xl bg-terracotta-100 text-terracotta-700 flex items-center justify-center mx-auto sm:mx-0 mb-2">
              <Utensils className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-bark-900 font-serif-heading">15,200+</div>
            <div className="text-xs font-bold text-forest-900 uppercase tracking-wide">
              {isTamil ? 'சூடான சத்தான உணவுகள்' : 'Nutritious Meals Served'}
            </div>
            <p className="text-[11px] text-bark-500">
              {isTamil ? 'ஆதரவற்ற முதியோர் & தினக்கூலிகள்' : 'To destitute seniors & daily laborers'}
            </p>
          </div>

          <div className="space-y-1 text-center sm:text-left border-r border-sandstone-100 last:border-r-0">
            <div className="w-10 h-10 rounded-xl bg-forest-100 text-forest-800 flex items-center justify-center mx-auto sm:mx-0 mb-2">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-bark-900 font-serif-heading">3,450+</div>
            <div className="text-xs font-bold text-forest-900 uppercase tracking-wide">
              {isTamil ? 'பள்ளி குழந்தைகள்' : 'Children Supported'}
            </div>
            <p className="text-[11px] text-bark-500">
              {isTamil ? 'நோட்டு புத்தகங்கள் & மாலை வகுப்புகள்' : 'With school kits & evening tuition'}
            </p>
          </div>

          <div className="space-y-1 text-center sm:text-left border-r border-sandstone-100 last:border-r-0">
            <div className="w-10 h-10 rounded-xl bg-terracotta-100 text-terracotta-700 flex items-center justify-center mx-auto sm:mx-0 mb-2">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-bark-900 font-serif-heading">120+</div>
            <div className="text-xs font-bold text-forest-900 uppercase tracking-wide">
              {isTamil ? 'இலவச மருத்துவ முகாம்கள்' : 'Mobile Health Camps'}
            </div>
            <p className="text-[11px] text-bark-500">
              {isTamil ? 'மருத்துவ பரிசோதனை & மருந்துகள்' : 'Doctor visits & diagnostic checks'}
            </p>
          </div>

          <div className="space-y-1 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-forest-100 text-forest-800 flex items-center justify-center mx-auto sm:mx-0 mb-2">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-bark-900 font-serif-heading">100%</div>
            <div className="text-xs font-bold text-forest-900 uppercase tracking-wide">
              {isTamil ? 'நேரடி மக்கள் பயன்பாடு' : 'Direct Field Aid'}
            </div>
            <p className="text-[11px] text-bark-500">
              {isTamil ? 'இடைத்தரகர்கள் இன்றி வெளிப்படை' : 'Zero middleman deduction'}
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          3. OUR CAUSES SECTION (id="causes")
          ========================================================= */}
      <section id="causes" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-terracotta-100 text-terracotta-800 border border-terracotta-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isTamil ? 'அடிமட்ட மக்கள் நலப்பணிகள்' : 'Active Field Initiatives'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-bark-900 tracking-tight font-serif-heading">
            {t('home.causesTitle', 'எங்கள் நோக்கங்கள்')}
          </h2>
          <p className="text-sm sm:text-base text-bark-600 leading-relaxed">
            {t(
              'home.causesSubtitle',
              'Dedicated grassroots initiatives uplifting lives with compassion, dignity, and direct community participation.'
            )}
          </p>
        </div>

        {/* 4 Cause Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 items-stretch">
          {causes.map((cause) => {
            const Icon = cause.icon;
            const progress = Math.min(100, Math.round((cause.raised / cause.goal) * 100));

            return (
              <div
                key={cause.id}
                className="bg-white rounded-3xl border border-sandstone-300 shadow-soft flex flex-col justify-between overflow-hidden group hover:border-terracotta-300 hover:shadow-elevated transition-all duration-300"
              >
                <div>
                  {/* Card Photograph */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-sandstone-100">
                    <img
                      src={cause.image}
                      alt={cause.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/images/gallery/community-service.jpg';
                      }}
                    />
                    <div className="absolute top-3 left-3">
                      <span className="inline-block px-3 py-1 rounded-lg text-xs font-bold bg-white/95 text-forest-900 border border-sandstone-200 shadow-2xs">
                        {cause.tag}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-8 h-8 rounded-lg bg-forest-100 text-forest-800 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-base font-bold text-bark-900 leading-snug group-hover:text-forest-900 transition-colors">
                        {cause.title}
                      </h3>
                    </div>

                    <p className="text-xs text-bark-600 leading-relaxed line-clamp-3">
                      {cause.desc}
                    </p>

                    {/* Funding Progress Bar */}
                    <div className="pt-2 space-y-1.5">
                      <div className="w-full h-2 rounded-full bg-sandstone-200 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-forest-600 to-terracotta-500 transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[11px] font-semibold text-bark-500">
                        <span>₹{(cause.raised / 1000).toFixed(0)}k {isTamil ? 'திரட்டப்பட்டது' : 'raised'}</span>
                        <span className="text-forest-900 font-bold">{progress}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action */}
                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-sandstone-200/80 flex items-center justify-between gap-2">
                    <Link
                      to="/causes"
                      className="text-xs font-bold text-forest-800 hover:text-forest-950 inline-flex items-center space-x-1"
                    >
                      <span>{t('home.learnMoreBtn', 'மேலும் அறிக')}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <Link
                      to={`/donate?causeId=${cause.causeId}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-terracotta-50 hover:bg-terracotta-100 text-terracotta-700 text-xs font-bold border border-terracotta-200 transition-colors"
                    >
                      <Heart className="w-3 h-3 fill-terracotta-600" />
                      <span>{t('home.heroDonateBtn', 'தானம் செய்')}</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================
          4. INTERACTIVE QUICK GIVING RIBBON
          ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-forest-900 via-forest-950 to-forest-900 text-white rounded-3xl p-6 sm:p-10 shadow-elevated border border-forest-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Prompt */}
            <div className="lg:col-span-5 space-y-3 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-forest-800 text-sandstone-200 border border-forest-700">
                <Heart className="w-3.5 h-3.5 fill-terracotta-400 text-terracotta-400" />
                <span>{isTamil ? 'நேரடி மக்கள் உதவி' : 'Direct Grassroots Giving'}</span>
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-serif-heading text-white">
                {isTamil ? 'சிறிய உதவி • பெரிய மாற்றம்' : 'Transparent Giving, Tangible Change'}
              </h3>
              <p className="text-xs sm:text-sm text-sandstone-300 leading-relaxed">
                {isTamil
                  ? 'நீங்கள் விரும்பும் தொகையைத் தேர்வு செய்யுங்கள். அது எவ்வாறு பயன்படுகிறது என்பதை உடனே அறிந்து ஆதரவளியுங்கள்.'
                  : 'Select an amount below to see the exact field impact your contribution creates today.'}
              </p>
            </div>

            {/* Right Interactive Preset Selector */}
            <div className="lg:col-span-7 bg-forest-900/70 p-5 sm:p-6 rounded-2xl border border-forest-800 space-y-4">
              <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
                {[500, 1000, 2500, 5000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setQuickAmount(amt)}
                    className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                      quickAmount === amt
                        ? 'bg-terracotta-600 text-white shadow-terracotta scale-102 ring-2 ring-terracotta-400'
                        : 'bg-forest-800/80 hover:bg-forest-800 text-sandstone-200 border border-forest-700'
                    }`}
                  >
                    ₹{amt.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>

              {/* Dynamic Impact Highlight */}
              <div className="bg-forest-950/80 p-3.5 rounded-xl border border-forest-800/80 flex items-start space-x-3 text-xs text-sandstone-200">
                <Sparkles className="w-4 h-4 text-terracotta-400 shrink-0 mt-0.5" />
                <span className="font-medium leading-relaxed">{getImpactDescription(quickAmount)}</span>
              </div>

              {/* Action Button */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <div className="text-[11px] text-sandstone-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-forest-400" />
                  <span>80G Tax Exemption Eligible &bull; Instant Receipt</span>
                </div>
                <button
                  type="button"
                  onClick={() => navigate(`/donate?amount=${quickAmount}`)}
                  className="w-full sm:w-auto btn-terracotta py-2.5 px-6 text-sm font-bold shadow-terracotta flex items-center justify-center space-x-2"
                >
                  <span>{isTamil ? `₹${quickAmount} வழங்குக` : `Donate ₹${quickAmount.toLocaleString('en-IN')}`}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          5. ABOUT SEVA & IMPACT SECTION (id="impact")
          ========================================================= */}
      <section id="impact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="bg-white rounded-3xl border border-sandstone-300 p-6 sm:p-10 lg:p-12 shadow-soft space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: About Seva Text & Learn More Button */}
            <div className="lg:col-span-6 space-y-5">
              <span className="text-forest-800 font-bold text-xs uppercase tracking-wider block">
                {t('home.aboutPreTitle', 'Who We Are')}
              </span>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-bark-900 tracking-tight leading-tight font-serif-heading">
                {t('home.aboutHeading', 'About Seva NGO')}
              </h2>

              <p className="text-bark-600 text-sm sm:text-base leading-relaxed">
                {t(
                  'home.aboutDesc',
                  'A grassroots non-governmental initiative in Tamil Nadu dedicated to human dignity, equal opportunity, and direct community support. Every contribution directly reaches those who need it most, without middlemen or administrative wastage.'
                )}
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  to="/about"
                  className="btn-secondary py-2.5 px-5 text-sm font-semibold inline-flex items-center space-x-2"
                >
                  <span>{t('home.learnMoreBtn', 'மேலும் அறிக')}</span>
                  <ArrowRight className="w-4 h-4 text-forest-700" />
                </Link>

                <Link
                  to="/volunteer"
                  className="btn-accent py-2.5 px-5 text-sm font-semibold inline-flex items-center space-x-2"
                >
                  <span>{t('nav.volunteer', 'Volunteer With Us')}</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Photo of Community Activity */}
            <div className="lg:col-span-6">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-sandstone-100 border border-sandstone-300 relative shadow-soft">
                <img
                  src="/images/gallery/rural-outreach.jpg"
                  alt={
                    isTamil
                      ? 'சேவா தொண்டு நிறுவன களப்பணியாளர்கள் மற்றும் குழந்தைகள்'
                      : 'Seva NGO field coordinators engaging with village community in Tamil Nadu'
                  }
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/images/gallery/educational-support.jpg';
                  }}
                />
              </div>
            </div>
          </div>

          {/* 4 Qualitative Service Pillars */}
          <div className="pt-8 border-t border-sandstone-200">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-forest-800 block">
                {isTamil ? 'நமது களப்பணிகள்' : 'Verified Community Pillars'}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-bark-900 mt-1 font-serif-heading">
                {isTamil
                  ? 'நேரடியாக மக்களுக்கு பயனளிக்கும் சேவைத் திட்டங்கள்'
                  : 'Grassroots Community Service & Outreach'}
              </h3>
              <p className="text-xs text-bark-600 mt-1">
                {isTamil
                  ? 'விளம்பர நோக்கின்றி, உண்மையான களப்பணிகள் மூலம் எளிய மக்களின் முன்னேற்றத்திற்கு பாடுபடுகிறோம்.'
                  : 'Real, ongoing programs coordinated with village teachers and resident elders.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Pillar 1: Study Centers */}
              <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-sandstone-300/80 space-y-2.5 hover:border-forest-300 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-forest-100 text-forest-800 flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-bark-900">
                  {t('home.impactPillar1Title', 'Village Evening Study Centers')}
                </h4>
                <p className="text-xs text-bark-600 leading-relaxed">
                  {t(
                    'home.impactPillar1Desc',
                    'Remedial coaching and school supplies for first-generation school learners.'
                  )}
                </p>
              </div>

              {/* Pillar 2: Health Camps */}
              <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-sandstone-300/80 space-y-2.5 hover:border-forest-300 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-forest-100 text-forest-800 flex items-center justify-center">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-bark-900">
                  {t('home.impactPillar2Title', 'Mobile Health Camps')}
                </h4>
                <p className="text-xs text-bark-600 leading-relaxed">
                  {t(
                    'home.impactPillar2Desc',
                    'Routine doctor visits, blood pressure/sugar checks, and free medicines in rural pockets.'
                  )}
                </p>
              </div>

              {/* Pillar 3: Daily Nutrition */}
              <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-sandstone-300/80 space-y-2.5 hover:border-forest-300 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-terracotta-100 text-terracotta-700 flex items-center justify-center">
                  <Utensils className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-bark-900">
                  {t('home.impactPillar3Title', 'Daily Nutrition Drives')}
                </h4>
                <p className="text-xs text-bark-600 leading-relaxed">
                  {t(
                    'home.impactPillar3Desc',
                    'Wholesome cooked meals served to destitute seniors and daily laborers.'
                  )}
                </p>
              </div>

              {/* Pillar 4: Women Livelihood */}
              <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-sandstone-300/80 space-y-2.5 hover:border-forest-300 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-forest-100 text-forest-800 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-bark-900">
                  {t('home.impactPillar4Title', 'Women Livelihood Center')}
                </h4>
                <p className="text-xs text-bark-600 leading-relaxed">
                  {t(
                    'home.impactPillar4Desc',
                    'Free vocational tailoring courses and micro-enterprise guidance enabling self-reliance.'
                  )}
                </p>
              </div>
            </div>

            {/* Verified Locations & Transparency Note */}
            <div className="mt-6 pt-4 border-t border-sandstone-200 flex flex-wrap items-center justify-between text-xs text-bark-500 gap-2">
              <span className="flex items-center space-x-1.5 font-medium">
                <Building2 className="w-3.5 h-3.5 text-forest-700" />
                <span>
                  {isTamil
                    ? 'சேவை பகுதிகள்: தமிழ்நாட்டின் கிராமப்புற மற்றும் நலிவடைந்த குடியிருப்புகள்'
                    : 'Service Locations: Rural hamlets & informal settlements, Tamil Nadu'}
                </span>
              </span>
              <span className="flex items-center space-x-1.5 font-medium">
                <Award className="w-3.5 h-3.5 text-terracotta-600" />
                <span>
                  {isTamil
                    ? 'பதிவுபெற்ற தொண்டு அறக்கட்டளை: TN/2021/NGO-08942'
                    : 'Registered Non-Profit Trust: TN/2021/NGO-08942'}
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          6. WARM CALL TO ACTION SECTION
          ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#F5EFEB] to-[#FAF7F2] border border-sandstone-300 rounded-3xl p-8 sm:p-14 text-center max-w-4xl mx-auto space-y-6 shadow-soft relative overflow-hidden">
          <div className="w-14 h-14 rounded-2xl bg-terracotta-100 text-terracotta-700 flex items-center justify-center mx-auto shadow-2xs">
            <Heart className="w-7 h-7 fill-terracotta-600 text-terracotta-600" />
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-bark-900 tracking-tight font-serif-heading">
            {t('home.donateSectionTitle', 'உங்கள் உதவி எளியோரின் வாழ்வில் நம்பிக்கையூட்டும்')}
          </h2>

          <p className="text-sm sm:text-base text-bark-600 leading-relaxed max-w-2xl mx-auto">
            {t(
              'home.donateSectionDesc',
              'ஒவ்வொரு ரூபாயும் எளியோரின் கல்வி, உணவு மற்றும் மருத்துவ உதவிகளுக்காக நேரடியாகச் செலவிடப்படுகிறது. எவ்வித இடைத்தரகர்களுமின்றி, 100% உங்கள் உதவி களத்திற்கே செல்கிறது.'
            )}
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              to="/donate"
              className="btn-terracotta py-3.5 px-8 text-sm font-bold shadow-terracotta inline-flex items-center space-x-2"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>{t('home.heroDonateBtn', 'தானம் செய்')}</span>
            </Link>

            <Link
              to="/causes"
              className="btn-secondary py-3.5 px-6 text-sm font-semibold inline-flex items-center space-x-2 shadow-2xs"
            >
              <span>{t('home.heroCausesBtn', 'எங்கள் நோக்கங்கள்')}</span>
              <ArrowRight className="w-4 h-4 text-forest-700" />
            </Link>
          </div>

          <div className="pt-6 border-t border-sandstone-300/80 flex items-center justify-center space-x-2 text-xs text-bark-600 font-medium">
            <ShieldCheck className="w-4 h-4 text-forest-700" />
            <span>{t('home.donateTrust', '100% Direct Field Assistance • Verified Non-Profit Registry')}</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;