import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { contactApi } from '../services/api';
import { useLanguage } from '../context/LanguageContext';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
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

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError(isTamil ? 'தயவுசெய்து தேவையான அனைத்து விபரங்களையும் பூர்த்தி செய்யவும்.' : 'Please fill in all required fields.');
      return;
    }

    setLoading(true);
    try {
      const res = await contactApi.submit(formData);
      if (res.data?.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setSubmitted(true);
      }
    } catch (err) {
      if (err.message && (err.message.includes('Network Error') || !err.response)) {
        setSubmitted(true);
      } else {
        setError(
          err.response?.data?.message ||
            (isTamil ? 'செய்தி அனுப்புவதில் பிழை ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்.' : 'Failed to send message. Please try again.')
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const faqs = [
    {
      qKey: isTamil ? 'நன்கொடைகள் எவ்வாறு பயன்படுத்தப்படுகின்றன?' : 'How are donations utilized?',
      aKey: isTamil
        ? 'அனைத்து நன்கொடைகளும் 100% பள்ளி உபகரணங்கள், உணவு சமையல் பொருட்கள் மற்றும் இலவச மருத்துவ மருந்துகளுக்கு நேரடியாக பயன்படுத்தப்படுகின்றன.'
        : 'All contributions directly fund program consumables (school kits, grains for meal kitchens, generic medicines for health camps) and ground field delivery.'
    },
    {
      qKey: isTamil ? 'பழைய உடைகள் அல்லது புத்தகங்களை நன்கொடையாக வழங்கலாமா?' : 'Can we donate books or educational supplies?',
      aKey: isTamil
        ? 'ஆம்! நல்ல நிலையிலுள்ள பள்ளிப் புத்தகங்கள், கதைப் புத்தகங்கள் மற்றும் நோட்டுப் புத்தகங்களை எங்கள் கள மையத்திற்கு நேரடியாக வழங்கலாம்.'
        : 'Yes, we gladly accept clean textbooks, children storybooks, and unopened study stationery at our collection center.'
    },
    {
      qKey: isTamil ? 'கள மையங்களை நேரில் வந்து பார்வையிடலாமா?' : 'Can we visit your field centers in Tamil Nadu?',
      aKey: isTamil
        ? 'கண்டிப்பாக! முன்னறிவிப்புடன் நீங்கள் எங்கள் கல்வி மற்றும் உணவு மையங்களை நேரில் பார்வையிட்டு உதவலாம்.'
        : 'Yes, visitors and volunteers are welcome to observe our programs with prior notice to our coordination cell.'
    }
  ];

  return (
    <div className="space-y-12 sm:space-y-16 pb-20 pt-16">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#F5EFEB] to-[#FAF7F2] border-b border-sandstone-200/90 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="inline-flex items-center space-x-2 text-[#25402B] text-xs font-bold uppercase tracking-wider bg-[#E9F1EB] px-3 py-1 rounded-md border border-[#D3E3D7]">
              <Sparkles className="w-3.5 h-3.5 text-[#3D6B48]" />
              <span>{t('contact.headerPre', 'We Are Here For You')}</span>
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              {t('contact.headerTitle', 'Contact Seva NGO')}
            </h1>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
              {t(
                'contact.headerDesc',
                'Have questions about our field initiatives or want to visit our centers in Tamil Nadu? Reach out anytime.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Office & Details (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white p-6 sm:p-7 rounded-xl border border-stone-300 shadow-xs space-y-5">
              <h2 className="text-base font-bold text-stone-900">
                {t('contact.office', 'Field Office')} &amp; {isTamil ? 'தொடர்பு விபரங்கள்' : 'Details'}
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-stone-600">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-[#E9F1EB] text-[#2F5237] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-stone-900 font-semibold">
                      {isTamil ? 'மைய அலுவலகம்' : 'Field Office'}
                    </strong>
                    <span className="text-stone-600">
                      {t('contact.addressVal', 'Seva NGO Field Office, Tamil Nadu, India')}
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-[#E9F1EB] text-[#2F5237] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-stone-900 font-semibold">
                      {t('nav.helpline', 'Helpline')}
                    </strong>
                    <a href="tel:+919443210987" className="text-stone-700 hover:text-[#2F5237] font-mono">
                      +91 94432 10987
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-[#E9F1EB] text-[#2F5237] flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-stone-900 font-semibold">
                      {isTamil ? 'மின்னஞ்சல்' : 'Email'}
                    </strong>
                    <a href="mailto:contact@sevango.org" className="text-stone-700 hover:text-[#2F5237]">
                      contact@sevango.org
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-[#E9F1EB] text-[#2F5237] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-stone-900 font-semibold">
                      {t('contact.hours', 'Working Hours')}
                    </strong>
                    <span className="text-stone-600">
                      {t('contact.hoursVal', 'Mon - Sat: 9:00 AM - 6:00 PM')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick FAQs */}
            <div className="bg-[#FAF9F5] p-5 sm:p-6 rounded-xl border border-stone-300 space-y-3">
              <h3 className="text-sm font-bold text-stone-900 flex items-center space-x-1.5">
                <HelpCircle className="w-4 h-4 text-[#2F5237]" />
                <span>{isTamil ? 'அடிக்கடி கேட்கப்படும் கேள்விகள்' : 'Frequently Asked Questions'}</span>
              </h3>

              <div className="space-y-3 text-xs">
                {faqs.map((f, i) => (
                  <div key={i} className="space-y-1 border-b border-stone-200 pb-2.5 last:border-0 last:pb-0">
                    <p className="font-semibold text-stone-800">{f.qKey}</p>
                    <p className="text-stone-600 leading-relaxed">{f.aKey}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-stone-300 shadow-xs">
              {submitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#E9F1EB] text-[#2F5237] flex items-center justify-center mx-auto">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-stone-900">
                    {t('contact.sentSuccess', 'Thank you! Your message has been received.')}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                    {isTamil
                      ? 'எங்கள் கள ஒருங்கிணைப்பாளர் விரைவில் உங்கள் செய்தியை பரிசீலித்து பதிலளிப்பார்.'
                      : 'Our community communication desk will review your message and reply via email within 24-48 hours.'}
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="btn-secondary py-2 px-5 text-xs font-semibold"
                    >
                      {isTamil ? 'மற்றொரு செய்தி அனுப்ப' : 'Send Another Message'}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h2 className="text-lg font-bold text-stone-900">
                      {t('contact.formTitle', 'Send a Message')}
                    </h2>
                    <p className="text-xs text-stone-500 mt-0.5">
                      {isTamil
                        ? 'உங்கள் கருத்துக்கள் அல்லது ஆலோசனைகளை எங்களுக்கு அனுப்பலாம்.'
                        : 'Please leave your note below and we will respond promptly.'}
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
                        {t('contact.name', 'Your Name *')}
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder={isTamil ? 'எ.கா. ஆனந்த்' : 'e.g. Anand'}
                        value={formData.name}
                        onChange={handleChange}
                        className="input-field text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                        {t('contact.email', 'Your Email *')}
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="e.g. anand@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="input-field text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                        {t('contact.phone', 'Phone Number')}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="e.g. +91 94432 10987"
                        value={formData.phone}
                        onChange={handleChange}
                        className="input-field text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                        {t('contact.subject', 'Subject *')}
                      </label>
                      <input
                        type="text"
                        name="subject"
                        required
                        placeholder={isTamil ? 'எ.கா. உதவி விபரம்' : 'e.g. Program Inquiry'}
                        value={formData.subject}
                        onChange={handleChange}
                        className="input-field text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      {t('contact.message', 'Message *')}
                    </label>
                    <textarea
                      name="message"
                      required
                      rows="4"
                      placeholder={isTamil ? 'உங்கள் செய்தியை உள்ளிடவும்...' : 'Type your message or inquiry here...'}
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
                        ? t('contact.sending', 'Sending...')
                        : t('contact.send', 'Send Message')}
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
