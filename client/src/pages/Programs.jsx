import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Utensils,
  Stethoscope,
  Users,
  Droplet,
  Heart,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const Programs = () => {
  const programsList = [
    {
      id: 'education',
      title: 'Vidya Jyoti: Remedial Education & Academic Kits',
      category: 'Education',
      tagline: 'Ensuring first-generation school learners build basic reading and numeracy.',
      description: 'Many children in informal settlements face severe learning gaps because their parents cannot read or afford private tutoring. Our Vidya Jyoti program operates community coaching hubs where college student volunteers provide daily remedial lessons, conduct science experiments, and distribute complete school kits (bags, notebooks, geometry kits, and uniforms).',
      image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
      highlights: [
        'Community after-school tuition centers',
        'Annual distribution of school stationery kits',
        'Digital learning tablet sessions',
        'Parent counselling on girl-child education'
      ],
      icon: BookOpen
    },
    {
      id: 'food',
      title: 'Annapurna: Nutritious Meal & Ration Drives',
      category: 'Food Distribution',
      tagline: 'Combating urban and rural hunger through daily hot meals and dry ration bundles.',
      description: 'Nutrition is fundamental to human health and student focus. Our Annapurna initiative coordinates community volunteer kitchens to serve fresh, hot meals to daily wage laborers, migrant workers, and destitute seniors. We also distribute monthly dry ration kits (rice, lentils, flour, cooking oil, and salt) to families facing acute crisis.',
      image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80',
      highlights: [
        'Hygienic community kitchen preparations',
        'Weekend hot meal relief distribution',
        'Monthly emergency grocery ration hampers',
        'Nutritional monitoring for underweight toddlers'
      ],
      icon: Utensils
    },
    {
      id: 'health',
      title: 'Arogya Seva: Preventive Healthcare & Medical Camps',
      category: 'Healthcare',
      tagline: 'Bringing qualified doctors, diagnostics, and essential medicines directly to settlements.',
      description: 'Routine medical consultations are often too expensive or physically out of reach for daily earners. Arogya Seva arranges mobile clinical camps where volunteer physicians and optometrists provide free blood pressure checks, diabetes screenings, pediatric examinations, and free prescription glasses.',
      image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
      highlights: [
        'Free physician and specialist consultations',
        'Free generic medications for chronic ailments',
        'Eye checkup camps with prescription spectacles',
        'Hygiene and clean water education sessions'
      ],
      icon: Stethoscope
    },
    {
      id: 'women',
      title: 'Swavalamban: Vocational Skills & Women Livelihoods',
      category: 'Women Empowerment',
      tagline: 'Empowering homemakers and young women with sustainable vocational earning capabilities.',
      description: 'Financial independence transforms lives. Swavalamban offers free 6-month intensive certificate courses in tailoring, machine sewing, embroidery, and home handicraft production. Graduates receive machine sponsorship and micro-enterprise guidance to take on independent orders.',
      image: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=800&q=80',
      highlights: [
        'Professional tailoring and apparel courses',
        'Sewing machine micro-grants for graduates',
        'Basic digital accounting and banking literacy',
        'Exhibition stalls for handmade products'
      ],
      icon: Users
    },
    {
      id: 'water',
      title: 'Jal Seva: Clean Water & Community Sanitation',
      category: 'Rural Development',
      tagline: 'Building durable community filtration units and clean village school toilets.',
      description: 'Contaminated ground water causes recurring gastrointestinal illnesses among rural children. Our Jal Seva program installs community bio-sand and gravity water purification units in village squares and renovates school toilets to ensure dignity and hygiene, particularly for young girls.',
      image: 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?auto=format&fit=crop&w=800&q=80',
      highlights: [
        'Low-maintenance bio-filtration installations',
        'Restoration of rural primary school sanitation blocks',
        'Community water maintenance committees',
        'School health and handwashing workshops'
      ],
      icon: Droplet
    }
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* Header */}
      <section className="bg-slate-900 text-white py-16 sm:py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Core Initiatives</span>
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              Our Programs & Field Initiatives
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Every initiative at Seva NGO is designed for high tangible impact, close community oversight, and enduring human dignity.
            </p>
          </div>
        </div>
      </section>

      {/* Programs List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {programsList.map((prog, index) => {
          const Icon = prog.icon;
          const isEven = index % 2 === 1;

          return (
            <div
              key={prog.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${
                isEven ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Media Card */}
              <div className={`lg:col-span-6 ${isEven ? 'lg:order-2' : ''}`}>
                <div className="rounded-3xl overflow-hidden shadow-md bg-slate-100 aspect-video relative group">
                  <img
                    src={prog.image}
                    alt={prog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-800 shadow-sm flex items-center space-x-1.5">
                    <Icon className="w-4 h-4 text-seva-600" />
                    <span>{prog.category}</span>
                  </div>
                </div>
              </div>

              {/* Text Information */}
              <div className={`lg:col-span-6 space-y-5 ${isEven ? 'lg:order-1' : ''}`}>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
                    {prog.title}
                  </h3>
                  <p className="text-sm font-semibold text-seva-700 mt-1">
                    {prog.tagline}
                  </p>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">
                  {prog.description}
                </p>

                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Key Highlights:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                    {prog.highlights.map((h, i) => (
                      <div key={i} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-seva-600 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 flex items-center space-x-3">
                  <Link
                    to={`/causes?category=${encodeURIComponent(prog.category)}`}
                    className="btn-primary py-2.5 px-5 text-xs flex items-center space-x-1.5"
                  >
                    <span>View Related Causes</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    to="/volunteer"
                    className="btn-secondary py-2.5 px-4 text-xs font-semibold"
                  >
                    Volunteer for this Program
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6">
          <h3 className="text-2xl sm:text-3xl font-extrabold">
            Want to Launch an Initiative in Your Area?
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            We actively coordinate with neighborhood associations, youth groups, and volunteer professionals to open new tutoring centers and meal relief points.
          </p>
          <Link to="/contact" className="btn-primary py-3 px-6 text-sm inline-flex items-center space-x-2">
            <span>Connect with our Program Lead</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Programs;
