import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Heart, MapPin, Phone, Mail, ShieldCheck, ArrowRight, Sparkles, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Footer = () => {
  const { language, setLanguage, t, isTamil } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const handleImpactClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      const el = document.getElementById('impact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/#impact');
      setTimeout(() => {
        const el = document.getElementById('impact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  };

  const handleCausesClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      const el = document.getElementById('causes');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/#causes');
      setTimeout(() => {
        const el = document.getElementById('causes');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  };

  return (
    <footer className="bg-forest-950 text-sandstone-300 pt-16 pb-10 border-t border-forest-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Feature Ribbon: Trust & Quick Action */}
        <div className="bg-forest-900/80 rounded-2xl p-6 sm:p-8 mb-12 border border-forest-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-soft">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-terracotta-400 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isTamil ? 'உடனடி ஆதரவு' : 'Join Our Field Movement'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-serif-heading">
              {isTamil
                ? 'உங்கள் சிறு உதவியும் ஒரு கிராமத்தின் எதிர்காலத்தை மாற்றும்'
                : 'Every Contribution Empowers a Rural Family with Dignity'}
            </h3>
            <p className="text-sm text-sandstone-300 max-w-xl">
              {isTamil
                ? '100% நேரடி களப்பணி • இடைத்தரகர்கள் இல்லை • முழு வெளிப்படைத்தன்மை'
                : '100% Direct Field Aid • No Intermediaries • Complete Financial Transparency'}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/donate"
              className="btn-terracotta px-6 py-3 text-sm font-bold shadow-terracotta"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>{t('nav.donateNow', 'Donate Now')}</span>
            </Link>
            <Link
              to="/volunteer"
              className="px-5 py-3 rounded-xl border border-sandstone-400/40 hover:bg-forest-800 text-sandstone-200 text-sm font-semibold transition-colors"
            >
              {t('nav.volunteer', 'Volunteer')}
            </Link>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-forest-900/80">
          {/* Column 1: Brand & Identity (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <Link to="/" className="inline-flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-xl bg-forest-800 border border-forest-700/60 flex items-center justify-center text-white shadow-2xs group-hover:bg-forest-700 transition-colors">
                <Heart className="w-5 h-5 fill-terracotta-400 text-terracotta-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold text-white tracking-tight leading-none font-serif-heading">
                  Seva <span className="text-terracotta-400">NGO</span>
                </span>
                <span className="text-[11px] text-sandstone-400 font-medium mt-0.5">
                  {isTamil ? 'தமிழ்நாடு களப்பணி இயக்கம்' : 'Tamil Nadu Grassroots Trust'}
                </span>
              </div>
            </Link>

            <p className="text-sm text-sandstone-300 leading-relaxed max-w-md">
              {t(
                'footer.tagline',
                'An authentic grassroots non-governmental initiative serving underprivileged communities across Tamil Nadu with education, nutrition, and healthcare.'
              )}
            </p>

            {/* Certifications & Registration Badges */}
            <div className="pt-2 flex flex-wrap gap-2 text-xs text-sandstone-300">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-forest-900 border border-forest-800 text-[11px] font-medium text-sandstone-200">
                <ShieldCheck className="w-3.5 h-3.5 text-terracotta-400" />
                <span>TN/2021/NGO-08942</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-forest-900 border border-forest-800 text-[11px] font-medium text-sandstone-200">
                <ShieldCheck className="w-3.5 h-3.5 text-forest-400" />
                <span>80G Tax Exempt</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-forest-900 border border-forest-800 text-[11px] font-medium text-sandstone-200">
                <span>12A Certified</span>
              </span>
            </div>

            {/* Language Switcher in Footer */}
            <div className="pt-3">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-sandstone-400 mb-2">
                {isTamil ? 'மொழி தேர்வு / Language' : 'Language / மொழி'}
              </span>
              <div
                className="inline-flex items-center rounded-xl bg-forest-900 p-0.5 border border-forest-800 text-xs select-none"
                role="group"
                aria-label="Footer Language Switcher"
              >
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1.5 rounded-lg font-semibold text-xs transition-colors duration-150 ${
                    language === 'en'
                      ? 'bg-sandstone-100 text-forest-950 font-bold shadow-2xs'
                      : 'text-sandstone-400 hover:text-white'
                  }`}
                  aria-pressed={language === 'en'}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('ta')}
                  className={`px-3 py-1.5 rounded-lg font-semibold text-xs transition-colors duration-150 ${
                    language === 'ta'
                      ? 'bg-terracotta-600 text-white font-bold shadow-2xs'
                      : 'text-sandstone-400 hover:text-white'
                  }`}
                  aria-pressed={language === 'ta'}
                >
                  தமிழ்
                </button>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-terracotta-400 mb-4">
              {t('footer.quickLinks', 'Quick Navigation')}
            </h4>
            <ul className="space-y-2.5 text-sm text-sandstone-300">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  {t('nav.home', 'Home')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  {t('nav.about', 'About Us')}
                </Link>
              </li>
              <li>
                <Link to="/causes" className="hover:text-white transition-colors">
                  {t('nav.ourCauses', 'Our Causes')}
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleImpactClick}
                  className="hover:text-white transition-colors text-left"
                >
                  {t('nav.impact', 'Our Impact')}
                </button>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-white transition-colors">
                  {isTamil ? 'புகைப்படங்கள்' : 'Field Gallery'}
                </Link>
              </li>
              <li>
                <Link to="/volunteer" className="hover:text-white transition-colors">
                  {t('nav.volunteer', 'Volunteer With Us')}
                </Link>
              </li>
              <li>
                <Link to="/donate" className="hover:text-white transition-colors font-semibold text-terracotta-300">
                  {t('nav.donate', 'Make a Donation')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Field Office (4 cols) */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-terracotta-400 mb-4">
              {t('footer.contact', 'Field Office & Contact')}
            </h4>
            <ul className="space-y-3.5 text-sm text-sandstone-300">
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-terracotta-400 shrink-0 mt-0.5" />
                <span>{t('contact.addressVal', 'Seva NGO Field Operations Center, Tamil Nadu, India')}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-terracotta-400 shrink-0" />
                <a href="tel:+919443210987" className="hover:text-white font-mono">
                  +91 94432 10987
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-terracotta-400 shrink-0" />
                <a href="mailto:contact@sevango.org" className="hover:text-white">
                  contact@sevango.org
                </a>
              </li>
            </ul>

            <div className="pt-5 border-t border-forest-900 flex items-center space-x-4 text-xs">
              <Link
                to="/volunteer"
                className="inline-flex items-center text-sandstone-300 hover:text-white font-semibold transition-colors"
              >
                <span>{t('nav.volunteer', 'Volunteer')}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 text-terracotta-400" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center text-sandstone-300 hover:text-white font-semibold transition-colors"
              >
                <span>{t('nav.contact', 'Contact')}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 text-terracotta-400" />
              </Link>
              <Link
                to="/admin/login"
                className="inline-flex items-center text-sandstone-400 hover:text-white transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 mr-1 text-forest-400" />
                <span>{t('nav.adminPortal', 'Admin')}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-sandstone-400 gap-4">
          <p className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} {t('footer.copyright', 'Seva NGO. Dedicated to grassroots service and human dignity in Tamil Nadu.')}
          </p>

          <div className="flex items-center space-x-4">
            <span className="text-[11px] text-sandstone-400">
              {isTamil ? 'வெளிப்படையான மக்கள் தணிக்கை' : 'Audited Community Non-Profit'}
            </span>
            <span className="text-forest-800">•</span>
            <Link
              to="/admin/login"
              className="text-sandstone-400 hover:text-sandstone-200 transition-colors flex items-center"
            >
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-terracotta-400" />
              <span>{t('footer.adminPortal', 'Admin Portal')}</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;