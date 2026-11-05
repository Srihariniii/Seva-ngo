import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Heart, Menu, X, ArrowRight, Phone, Mail, ShieldCheck, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage, t, isTamil } = useLanguage();

  // Close drawer on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Subtle scroll state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Handle smooth scroll navigation
  const handleScrollTo = (e, sectionId) => {
    e.preventDefault();
    setIsMenuOpen(false);
    if (location.pathname === '/') {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(`/#${sectionId}`);
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  };

  const navItems = [
    { nameKey: 'nav.home', defaultName: 'Home', path: '/', isSpecial: false },
    { nameKey: 'nav.about', defaultName: 'About Us', path: '/about', isSpecial: false },
    { nameKey: 'nav.ourCauses', defaultName: 'Causes', path: '/causes', isSpecial: false },
    { nameKey: 'nav.impact', defaultName: 'Our Impact', path: '/#impact', isSpecial: true, onClick: (e) => handleScrollTo(e, 'impact') },
    { nameKey: 'nav.volunteer', defaultName: 'Volunteer', path: '/volunteer', isSpecial: false },
    { nameKey: 'nav.contactUs', defaultName: 'Contact', path: '/contact', isSpecial: false },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40">
        {/* Top Trust Ribbon */}
        <div className="bg-forest-950 text-sandstone-200 text-xs py-1.5 px-4 border-b border-forest-900/60 hidden sm:block">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3 text-[11px] text-sandstone-300">
              <span className="inline-flex items-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta-400"></span>
                {isTamil ? 'பதிவுபெற்ற மக்கள் அறக்கட்டளை: TN/2021/NGO-08942' : 'Registered Non-Profit Trust: TN/2021/NGO-08942'}
              </span>
              <span className="text-forest-700">•</span>
              <span className="text-sandstone-300">
                {isTamil ? '80G வரிவிலக்கு அங்கீகரிக்கப்பட்டது' : '80G Tax Exemption Certified'}
              </span>
            </div>

            <div className="flex items-center space-x-4 text-[11px]">
              <a
                href="tel:+919443210987"
                className="inline-flex items-center gap-1 text-sandstone-300 hover:text-white transition-colors"
              >
                <Phone className="w-3 h-3 text-terracotta-400" />
                <span>+91 94432 10987</span>
              </a>
              <span className="text-forest-700">•</span>
              <Link
                to="/admin/login"
                className="text-sandstone-400 hover:text-sandstone-200 transition-colors"
              >
                {t('nav.adminPortal', 'Admin Access')}
              </Link>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <nav
          className={`transition-all duration-300 ${
            scrolled
              ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-soft border-b border-sandstone-200/90 py-2.5'
              : 'bg-[#FAF7F2]/90 backdrop-blur-sm border-b border-sandstone-200/60 py-3.5'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              {/* Logo & Brand Identity */}
              <Link
                to="/"
                className="flex items-center space-x-3 group focus:outline-none"
                aria-label="Seva NGO Home"
              >
                <div className="relative w-10 h-10 rounded-xl bg-forest-800 text-white flex items-center justify-center shrink-0 shadow-2xs group-hover:bg-forest-900 transition-colors border border-forest-700/50">
                  <Heart className="w-5 h-5 fill-terracotta-400 text-terracotta-400" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-terracotta-500 rounded-full border-2 border-[#FAF7F2]"></span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-baseline space-x-1.5">
                    <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-forest-950 font-serif-heading leading-none">
                      Seva
                    </span>
                    <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-terracotta-100 text-terracotta-800 border border-terracotta-200">
                      NGO
                    </span>
                  </div>
                  <span className="text-[11px] text-bark-500 font-medium tracking-tight mt-0.5">
                    {isTamil ? 'தமிழ்நாடு களப்பணி இயக்கம்' : 'Tamil Nadu Grassroots Trust'}
                  </span>
                </div>
              </Link>

              {/* Desktop Navigation Links */}
              <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
                {navItems.map((item) => {
                  const isActive =
                    !item.isSpecial &&
                    (item.path === '/'
                      ? location.pathname === '/'
                      : location.pathname.startsWith(item.path));

                  if (item.isSpecial) {
                    return (
                      <button
                        key={item.nameKey}
                        type="button"
                        onClick={item.onClick}
                        className="px-3 py-1.5 rounded-lg text-sm font-semibold text-bark-700 hover:text-forest-900 hover:bg-sandstone-200/50 transition-colors"
                      >
                        {t(item.nameKey, item.defaultName)}
                      </button>
                    );
                  }

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`relative px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                        isActive
                          ? 'text-forest-950 bg-forest-100/70 font-bold'
                          : 'text-bark-700 hover:text-forest-900 hover:bg-sandstone-200/50'
                      }`}
                    >
                      {t(item.nameKey, item.defaultName)}
                      {isActive && (
                        <span className="absolute bottom-0.5 left-3 right-3 h-0.5 bg-terracotta-600 rounded-full"></span>
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Right Side: Language Switcher + Donate CTA + Mobile Menu */}
              <div className="flex items-center space-x-2.5 sm:space-x-3">
                {/* Language Switcher */}
                <div
                  className="inline-flex items-center rounded-xl bg-sandstone-200/80 p-0.5 border border-sandstone-300/80 text-xs select-none"
                  role="group"
                  aria-label="Language Switcher"
                >
                  <button
                    type="button"
                    onClick={() => setLanguage('en')}
                    className={`px-2.5 py-1 sm:px-3 sm:py-1 rounded-lg font-semibold text-xs transition-all ${
                      language === 'en'
                        ? 'bg-white text-forest-900 shadow-2xs font-bold'
                        : 'text-bark-600 hover:text-bark-900'
                    }`}
                    aria-pressed={language === 'en'}
                  >
                    EN
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage('ta')}
                    className={`px-2.5 py-1 sm:px-3 sm:py-1 rounded-lg font-semibold text-xs transition-all ${
                      language === 'ta'
                        ? 'bg-forest-800 text-white shadow-2xs font-bold'
                        : 'text-bark-600 hover:text-bark-900'
                    }`}
                    aria-pressed={language === 'ta'}
                  >
                    தமிழ்
                  </button>
                </div>

                {/* Desktop Donate Button */}
                <Link
                  to="/donate"
                  className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 active:bg-terracotta-800 text-white text-sm font-bold shadow-terracotta transition-all transform hover:-translate-y-0.5"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>{t('nav.donate', 'Donate')}</span>
                </Link>

                {/* Mobile Hamburger Button */}
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(true)}
                  className="lg:hidden inline-flex items-center justify-center p-2 rounded-xl bg-sandstone-100 border border-sandstone-300 text-bark-700 hover:bg-sandstone-200 transition-colors focus:outline-none"
                  aria-label={t('nav.menu', 'Menu')}
                  aria-expanded={isMenuOpen}
                >
                  <Menu className="w-5 h-5 text-forest-900" />
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 lg:hidden ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isMenuOpen}
      >
        {/* Backdrop Overlay */}
        <div
          className="absolute inset-0 bg-bark-900/60 backdrop-blur-xs transition-opacity"
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Drawer Panel */}
        <div
          className={`absolute top-0 right-0 bottom-0 w-full max-w-sm bg-[#FAF7F2] border-l border-sandstone-300 shadow-elevated flex flex-col justify-between transition-transform duration-300 ease-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          role="dialog"
          aria-modal="true"
          aria-label={t('nav.navigation', 'Navigation')}
        >
          {/* Drawer Top Header */}
          <div className="p-5 border-b border-sandstone-200/90 flex items-center justify-between bg-sandstone-100/50">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-forest-800 text-white flex items-center justify-center">
                <Heart className="w-4 h-4 fill-terracotta-400 text-terracotta-400" />
              </div>
              <span className="font-extrabold text-lg text-forest-950 tracking-tight">
                Seva <span className="text-terracotta-600">NGO</span>
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-lg text-bark-500 hover:text-bark-900 hover:bg-sandstone-200 transition-colors"
              aria-label={t('nav.close', 'Close')}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links Body */}
          <div className="p-5 space-y-5 flex-1 overflow-y-auto">
            <div className="space-y-1">
              <p className="text-[11px] font-bold uppercase tracking-wider text-bark-400 px-3 mb-2">
                {t('nav.navigation', 'Navigation')}
              </p>

              {navItems.map((item) => {
                const isActive =
                  !item.isSpecial &&
                  (item.path === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(item.path));

                if (item.isSpecial) {
                  return (
                    <button
                      key={item.nameKey}
                      type="button"
                      onClick={item.onClick}
                      className="w-full text-left px-3.5 py-3 rounded-xl text-base font-semibold text-bark-700 hover:text-forest-900 hover:bg-sandstone-200/60 transition-colors flex items-center justify-between group"
                    >
                      <span>{t(item.nameKey, item.defaultName)}</span>
                      <ArrowRight className="w-4 h-4 text-sandstone-400 group-hover:text-forest-800 group-hover:translate-x-1 transition-all" />
                    </button>
                  );
                }

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-3.5 py-3 rounded-xl text-base font-semibold transition-colors flex items-center justify-between group ${
                      isActive
                        ? 'bg-forest-100 text-forest-950 font-bold'
                        : 'text-bark-700 hover:text-forest-900 hover:bg-sandstone-200/60'
                    }`}
                  >
                    <span>{t(item.nameKey, item.defaultName)}</span>
                    <ArrowRight
                      className={`w-4 h-4 transition-all ${
                        isActive
                          ? 'text-terracotta-600'
                          : 'text-sandstone-400 group-hover:text-forest-800 group-hover:translate-x-1'
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Quick Mobile Action: Donate Button */}
            <div className="pt-3 border-t border-sandstone-200 space-y-3">
              <Link
                to="/donate"
                onClick={() => setIsMenuOpen(false)}
                className="w-full btn-terracotta py-3 flex items-center justify-center space-x-2 text-center text-base"
              >
                <Heart className="w-5 h-5 fill-white" />
                <span>{t('nav.donateNow', 'Donate Now')}</span>
              </Link>

              <div className="bg-sandstone-100/70 p-3 rounded-xl border border-sandstone-200 text-xs space-y-1.5">
                <div className="flex items-center justify-between text-bark-600">
                  <span className="font-medium">{t('nav.helpline', 'Helpline')}:</span>
                  <a href="tel:+919443210987" className="font-bold text-forest-900">
                    +91 94432 10987
                  </a>
                </div>
                <div className="text-[11px] text-bark-500">
                  {isTamil ? 'தமிழ்நாடு களப்பணி மையம் • 80G வரிவிலக்கு' : 'Tamil Nadu Field Ops • 80G Tax Exemption'}
                </div>
              </div>
            </div>
          </div>

          {/* Drawer Footer with Verified NGO Contact */}
          <div className="p-5 bg-sandstone-100 border-t border-sandstone-200 text-xs text-bark-600 space-y-2">
            <p className="font-semibold text-bark-800">
              {t('nav.initiative', 'Registered Non-Profit Grassroots Initiative')}
            </p>
            <p className="text-[11px] text-bark-500">
              Tamil Nadu, India &bull; Reg: TN/2021/NGO-08942
            </p>
            <div className="pt-2 flex items-center justify-between text-[11px] border-t border-sandstone-200 text-bark-600 font-medium">
              <Link to="/volunteer" onClick={() => setIsMenuOpen(false)} className="hover:text-forest-900">
                {t('nav.volunteer', 'Volunteer')}
              </Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="hover:text-forest-900">
                {t('nav.contact', 'Contact')}
              </Link>
              <Link to="/admin/login" onClick={() => setIsMenuOpen(false)} className="flex items-center hover:text-forest-900">
                <ShieldCheck className="w-3.5 h-3.5 mr-1 text-forest-700" />
                <span>{t('nav.adminPortal', 'Admin Access')}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;