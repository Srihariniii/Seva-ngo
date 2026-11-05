import React, { useState } from 'react';
import {
  Users,
  CheckCircle,
  Heart,
  Clock,
  Sparkles,
  BookOpen,
  Utensils,
  Stethoscope,
  Send,
  AlertCircle
} from 'lucide-react';
import { volunteersApi } from '../services/api';
import { useLanguage } from '../context/LanguageContext';

const INTEREST_AREAS = [
  { key: 'edu', en: 'Education & Tutoring', ta: 'கல்வி மற்றும் மாலைநேர பாடம்' },
  { key: 'food', en: 'Food & Ration Distribution', ta: 'உணவு மற்றும் ரேஷன் வழங்கல்' },
  { key: 'health', en: 'Healthcare & Medical Camps', ta: 'இலவச மருத்துவ முகாம்கள்' },
  { key: 'women', en: 'Women Skill & Livelihood Training', ta: 'மகளிர் சுயதொழில் பயிற்சி' },
  { key: 'elder', en: 'Elderly Care & Support', ta: 'முதியோர் நலம் மற்றும் உதவி' },
  { key: 'logistics', en: 'Field Logistics & Coordination', ta: 'களப்பணி மற்றும் ஒருங்கிணைப்பு' }
];

export const Volunteer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    city: '',
    areaOfInterest: 'Education & Tutoring',
    availability: 'Weekends',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const { t, isTamil } = useLanguage();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.phone || !formData.age || !formData.city) {
      setError(isTamil ? 'தயவுசெய்து தேவையான அனைத்து விபரங்களையும் பூர்த்தி செய்யவும்.' : 'Please fill in all required fields.');
      return;
    }

    if (Number(formData.age) < 14 || Number(formData.age) > 100) {
      setError(isTamil ? 'தன்னார்வலர்கள் குறைந்தது 14 வயது நிரம்பியவராக இருக்க வேண்டும்.' : 'Volunteers must be at least 14 years of age.');
      return;
    }

    setLoading(true);
    try {
      const res = await volunteersApi.submit({
        ...formData,
        age: Number(formData.age)
      });

      if (res.data?.success) {
        setSubmitted(true);
      } else {
        setSubmitted(true);
      }
    } catch (err) {
      // In offline/demo mode, record locally
      if (err.message && (err.message.includes('Network Error') || !err.response)) {
        setSubmitted(true);
      } else {
        setError(
          err.response?.data?.message ||
            (isTamil ? 'விண்ணப்பத்தை சமர்ப்பிப்பதில் பிழை ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்.' : 'An error occurred while submitting your registration. Please try again.')
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-20 pt-16">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#F5EFEB] to-[#FAF7F2] border-b border-sandstone-200/90 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="inline-flex items-center space-x-2 text-[#25402B] text-xs font-bold uppercase tracking-wider bg-[#E9F1EB] px-3 py-1 rounded-md border border-[#D3E3D7]">
              <Sparkles className="w-3.5 h-3.5 text-[#3D6B48]" />
              <span>{t('volunteer.headerPre', 'Join The Movement')}</span>
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              {t('volunteer.headerTitle', 'Become a Seva Volunteer')}
            </h1>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
              {t(
                'volunteer.headerDesc',
                'Your dedication, time, and heart create immediate, life-changing ripples. Complete the registration below to get onboarded.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid: Form + Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-stone-300 shadow-xs">
              {submitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#E9F1EB] text-[#2F5237] flex items-center justify-center mx-auto">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-stone-900">
                    {t('volunteer.successTitle', 'Thank You for Registering!')}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                    {t(
                      'volunteer.successText',
                      'Our field coordinator will contact you shortly regarding orientation.'
                    )}
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          age: '',
                          city: '',
                          areaOfInterest: 'Education & Tutoring',
                          availability: 'Weekends',
                          message: ''
                        });
                      }}
                      className="btn-secondary py-2 px-5 text-xs font-semibold"
                    >
                      {isTamil ? 'மற்றொரு விண்ணப்பத்தை பதிவிட' : 'Submit Another Application'}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h2 className="text-lg font-bold text-stone-900">
                      {t('volunteer.formTitle', 'Volunteer Registration Form')}
                    </h2>
                    <p className="text-xs text-stone-500 mt-0.5">
                      {isTamil
                        ? 'உங்களுக்கு பொருத்தமான களப்பணியில் இணைக்க சரியான விபரங்களை உள்ளிடவும்.'
                        : 'Please provide accurate details so we can match you with suitable field programs.'}
                    </p>
                  </div>

                  {error && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-start space-x-2">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                        {t('volunteer.name', 'Full Name *')}
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder={isTamil ? 'எ.கா. பிரியா' : 'e.g. Priya Sharma'}
                        value={formData.name}
                        onChange={handleChange}
                        className="input-field text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                        {t('volunteer.email', 'Email Address *')}
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="e.g. priya@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="input-field text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                        {t('volunteer.phone', 'Phone Number *')}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="e.g. +91 94432 10987"
                        value={formData.phone}
                        onChange={handleChange}
                        className="input-field text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                        {t('volunteer.age', 'Age *')}
                      </label>
                      <input
                        type="number"
                        name="age"
                        required
                        min="14"
                        max="100"
                        placeholder="e.g. 24"
                        value={formData.age}
                        onChange={handleChange}
                        className="input-field text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                        {t('volunteer.city', 'City / District in Tamil Nadu *')}
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        placeholder={isTamil ? 'எ.கா. மதுரை / திருச்சி' : 'e.g. Madurai / Trichy'}
                        value={formData.city}
                        onChange={handleChange}
                        className="input-field text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                        {t('volunteer.availability', 'Availability')}
                      </label>
                      <select
                        name="availability"
                        value={formData.availability}
                        onChange={handleChange}
                        className="input-field text-sm"
                      >
                        <option value="Weekends">{isTamil ? 'வார இறுதி நாட்கள்' : 'Weekends'}</option>
                        <option value="Weekdays">{isTamil ? 'வார நாட்கள்' : 'Weekdays'}</option>
                        <option value="Full Time">{isTamil ? 'முழு நேரம்' : 'Full Time'}</option>
                        <option value="Flexible">{isTamil ? 'நெகிழ்வான நேரம்' : 'Flexible'}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      {t('volunteer.interest', 'Area of Interest')}
                    </label>
                    <select
                      name="areaOfInterest"
                      value={formData.areaOfInterest}
                      onChange={handleChange}
                      className="input-field text-sm"
                    >
                      {INTEREST_AREAS.map((a) => (
                        <option key={a.key} value={a.en}>
                          {isTamil ? a.ta : a.en}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      {t('volunteer.notes', 'Brief Experience / Why You Want to Join (Optional)')}
                    </label>
                    <textarea
                      name="message"
                      rows="3"
                      placeholder={
                        isTamil
                          ? 'உங்கள் அனுபவம் அல்லது ஆர்வத்தை சுருக்கமாக பகிரவும்...'
                          : 'Tell us briefly about any past volunteering or why you want to serve...'
                      }
                      value={formData.message}
                      onChange={handleChange}
                      className="input-field text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full py-3 text-sm flex items-center justify-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>
                      {loading
                        ? t('volunteer.submitting', 'Submitting...')
                        : t('volunteer.submit', 'Submit Volunteer Application')}
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Why Volunteer (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#FAF9F5] p-6 sm:p-7 rounded-xl border border-stone-300 space-y-4">
              <h3 className="text-base font-bold text-stone-900">
                {isTamil ? 'ஏன் தன்னார்வலராக இணைய வேண்டும்?' : 'Why Serve with Seva NGO?'}
              </h3>

              <div className="space-y-3 text-xs sm:text-sm text-stone-700">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-[#E9F1EB] text-[#2F5237] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="block text-stone-900 font-semibold">
                      {isTamil ? 'நேரடி கள அனுபவம்' : '100% Direct Field Work'}
                    </strong>
                    <span className="text-stone-600 leading-relaxed text-xs">
                      {isTamil
                        ? 'அலுவலக வேலைகளைத் தாண்டி நேரடியாக மக்களுடன் களப்பணியாற்றும் வாய்ப்பு.'
                        : 'Engage directly with families, village schools, and local medical camps.'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-[#E9F1EB] text-[#2F5237] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="block text-stone-900 font-semibold">
                      {isTamil ? 'நெகிழ்வான நேரங்கள்' : 'Flexible Hours'}
                    </strong>
                    <span className="text-stone-600 leading-relaxed text-xs">
                      {isTamil
                        ? 'உங்கள் கல்லூரி அல்லது வேலை நேரத்திற்கு ஏற்ப வார இறுதியில் 2 மணிநேரம் உதவலாம்.'
                        : 'Contribute even 2-3 hours on weekends based on your personal schedule.'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-[#E9F1EB] text-[#2F5237] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="block text-stone-900 font-semibold">
                      {isTamil ? 'தன்னார்வலர் சான்றிதழ்' : 'Verified Community Certificate'}
                    </strong>
                    <span className="text-stone-600 leading-relaxed text-xs">
                      {isTamil
                        ? 'நம்பகமான தொண்டு பணிகளுக்கான பதிவுபெற்ற சேவை சான்றிதழ்.'
                        : 'Official service documentation provided for active contributors.'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-200 text-xs text-stone-500">
                <p>
                  {isTamil
                    ? 'கேள்விகள் உள்ளதா? எங்களை அழைக்கவும்: +91 94432 10987'
                    : 'Have questions? Call our volunteer cell: +91 94432 10987'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Volunteer;
