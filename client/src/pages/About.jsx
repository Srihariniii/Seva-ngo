import React from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  Target,
  Eye,
  Users,
  Sparkles,
  ShieldCheck,
  Compass,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const About = () => {
  const { t, isTamil } = useLanguage();

  const values = [
    {
      titleKey: 'about.val1Title',
      defaultTitle: 'Dignity Over Charity',
      descKey: 'about.val1Desc',
      defaultDesc: 'We treat every individual with deep respect, empowering families rather than creating dependency.',
      icon: Heart
    },
    {
      titleKey: 'about.val2Title',
      defaultTitle: 'Complete Transparency',
      descKey: 'about.val2Desc',
      defaultDesc: 'Every rupee collected and spent is documented. We believe donors and communities deserve full openness.',
      icon: ShieldCheck
    },
    {
      titleKey: 'about.val3Title',
      defaultTitle: 'Grassroots Engagement',
      descKey: 'about.val3Desc',
      defaultDesc: 'Our projects are designed in consultation with village elders, local teachers, and neighborhood families.',
      icon: Users
    },
    {
      titleKey: 'about.val4Title',
      defaultTitle: 'Sustainable Action',
      descKey: 'about.val4Desc',
      defaultDesc: 'We focus on foundational interventions—literacy, vocational skills, and preventive health—that yield lifelong benefits.',
      icon: Compass
    }
  ];

  const timeline = [
    {
      yearKey: 'about.step1',
      defaultYear: 'Phase 1: Foundation',
      titleKey: 'about.step1Title',
      defaultTitle: 'Grassroots Food & Relief Circle',
      descKey: 'about.step1Desc',
      defaultDesc: 'Started as a weekend voluntary collective distributing hot home-cooked meals to daily wage earners.'
    },
    {
      yearKey: 'about.step2',
      defaultYear: 'Phase 2: Learning Hubs',
      titleKey: 'about.step2Title',
      defaultTitle: 'Primary Education Centers',
      descKey: 'about.step2Desc',
      defaultDesc: 'Opened community coaching centers providing remedial literacy and homework support for first-generation school learners.'
    },
    {
      yearKey: 'about.step3',
      defaultYear: 'Phase 3: Healthcare Camps',
      titleKey: 'about.step3Title',
      defaultTitle: 'Mobile Diagnostic Units',
      descKey: 'about.step3Desc',
      defaultDesc: 'Partnered with volunteer physicians to deliver free preventive checkups, vision tests, and vital medications.'
    },
    {
      yearKey: 'about.step4',
      defaultYear: 'Phase 4: Present & Future',
      titleKey: 'about.step4Title',
      defaultTitle: 'Holistic Community Empowerment',
      descKey: 'about.step4Desc',
      defaultDesc: 'Integrating women skill training, clean drinking water installations, and structured disaster relief preparedness.'
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-20 pb-20 pt-16">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#F5EFEB] to-[#FAF7F2] border-b border-sandstone-200/90 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="inline-flex items-center space-x-2 text-[#25402B] text-xs font-bold uppercase tracking-wider bg-[#E9F1EB] px-3 py-1 rounded-md border border-[#D3E3D7]">
              <Sparkles className="w-3.5 h-3.5 text-[#3D6B48]" />
              <span>{t('about.headerPre', 'About Seva NGO')}</span>
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight">
              {t('about.headerTitle', 'Driven by Compassion, Guided by Community')}
            </h1>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
              {t(
                'about.headerDesc',
                'We are a dedicated non-governmental collective working on the ground across Tamil Nadu to provide equal access to education, nutritious food, healthcare, and human dignity.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Story, Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Story */}
          <div className="lg:col-span-6 space-y-4">
            <span className="text-[#2F5237] font-bold text-xs uppercase tracking-wider block">
              {t('about.journeyPre', 'Our Journey')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
              {t('about.storyTitle', 'The Story of Seva NGO')}
            </h2>
            <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
              {t(
                'about.storyP1',
                'Seva NGO started when a small group of volunteers and village teachers in Tamil Nadu witnessed children dropping out of primary school due to a lack of basic notebooks and midday meals. Rather than waiting for distant systems, they pooled personal funds on weekends to prepare meals and teach beneath village trees.'
              )}
            </p>
            <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
              {t(
                'about.storyP2',
                'Over time, that modest weekend effort evolved into a registered network of educators, physicians, college students, and generous citizens united by a single conviction: every human being deserves a chance to live with respect and self-reliance.'
              )}
            </p>

            {/* Official Registration Notice */}
            <div className="p-3.5 rounded-lg bg-[#F3EFE7] border border-stone-300 text-xs text-stone-700 leading-relaxed">
              <strong>{isTamil ? 'அதிகாரப்பூர்வ பதிவு எண்:' : 'Statutory Registration:'}</strong>{' '}
              <span className="font-mono font-semibold text-stone-900">
                TN/2021/NGO-08942
              </span>{' '}
              ({isTamil ? 'தமிழ்நாடு அரசு சட்டம் 27/1975' : 'Registered Non-Profit Trust, Tamil Nadu'})
            </div>
          </div>

          {/* Right Column: Mission & Vision Cards */}
          <div className="lg:col-span-6 space-y-4">
            {/* Mission Card */}
            <div className="bg-[#E9F1EB] border border-[#D3E3D7] rounded-xl p-6 sm:p-7 space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#2F5237] text-white flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-stone-900">
                {t('about.missionTitle', 'Our Mission')}
              </h3>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                {t(
                  'about.missionDesc',
                  'To stand alongside marginalized children, women, and seniors by delivering dependable access to quality foundational education, balanced daily nutrition, and community-level preventive healthcare.'
                )}
              </p>
            </div>

            {/* Vision Card */}
            <div className="bg-[#F3EFE7] border border-stone-300 rounded-xl p-6 sm:p-7 space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#837146] text-white flex items-center justify-center">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-stone-900">
                {t('about.visionTitle', 'Our Vision')}
              </h3>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                {t(
                  'about.visionDesc',
                  'A society where no child drops out of school due to lack of books, no elder suffers alone in hunger or illness, and every family has the tools to achieve self-sufficiency.'
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-[#FAF9F5] py-14 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-1.5">
            <span className="text-[#2F5237] font-bold text-xs uppercase tracking-wider block">
              {t('about.valuesPre', 'Guiding Principles')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
              {t('about.valuesTitle', 'The Values That Shape Us')}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              {t(
                'about.valuesDesc',
                'Our decisions in the field, from volunteer onboarding to fund utilization, are guided by four standards.'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.titleKey}
                  className="bg-white p-5 rounded-xl border border-stone-300 shadow-xs space-y-2.5"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#E9F1EB] text-[#2F5237] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-stone-900 text-sm">
                    {t(v.titleKey, v.defaultTitle)}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {t(v.descKey, v.defaultDesc)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Field Medical Director (Dr. Ratchagan) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-1">
          <span className="text-[#2F5237] font-bold text-xs uppercase tracking-wider block">
            {t('about.leadershipPre', 'Leadership & Guidance')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
            {t('about.leadershipTitle', 'Guided by Experience in the Field')}
          </h2>
        </div>

        <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-2xl border border-stone-300 shadow-xs">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-stone-100 shrink-0 border-2 border-[#2F5237]">
              <img
                src="/images/contributor/dr-ratchagan.jpg"
                alt="Dr. Ratchagan, Medical Director"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/images/dr_ratchagan_portrait_1790558853312.jpg';
                }}
              />
            </div>
            <div className="space-y-2">
              <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed">
                {t('about.doctorBio', '"Driven by a commitment to serving communities and contributing to meaningful social change through compassion, healthcare, and service."')}
              </p>
              <div>
                <h3 className="text-base font-bold text-stone-900">Dr. Ratchagan</h3>
                <p className="text-xs text-[#2F5237] font-semibold">
                  {t('about.doctorRole', 'Doctor & Field Medical Director')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-1">
          <span className="text-[#2F5237] font-bold text-xs uppercase tracking-wider block">
            {t('about.growthPre', 'Evolution')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
            {t('about.growthTitle', 'Our Growth & Milestones')}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            {t(
              'about.growthDesc',
              'Tracing how collective goodwill transformed into organized community action.'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {timeline.map((step, idx) => (
            <div
              key={step.yearKey}
              className="bg-white rounded-xl p-5 border border-stone-300 shadow-xs flex flex-col justify-between space-y-3"
            >
              <div>
                <span className="text-xs font-bold text-[#2F5237] block mb-1">
                  {t(step.yearKey, step.defaultYear)}
                </span>
                <h3 className="text-sm font-bold text-stone-900 mb-1.5">
                  {t(step.titleKey, step.defaultTitle)}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {t(step.descKey, step.defaultDesc)}
                </p>
              </div>
              <div className="pt-2 text-[11px] text-stone-400 font-medium">
                Milestone 0{idx + 1}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1F3A26] text-white rounded-2xl p-8 sm:p-12 text-center space-y-4 max-w-3xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold">
            {t('about.readyTitle', 'Ready to Stand With Us?')}
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 max-w-lg mx-auto">
            {t(
              'about.readyDesc',
              'Whether through voluntary time or financial sponsorship, your support translates directly into tangible food, books, and medicine.'
            )}
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link to="/volunteer" className="btn-secondary py-2 px-5 text-xs font-semibold">
              {t('home.ctaVolunteerBtn', 'Become a Volunteer')}
            </Link>
            <Link to="/donate" className="btn-primary py-2 px-5 text-xs font-semibold">
              {t('nav.donateNow', 'Donate Now')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
