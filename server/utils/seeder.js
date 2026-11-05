import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';
import Cause from '../models/Cause.js';
import Event from '../models/Event.js';
import Volunteer from '../models/Volunteer.js';
import Donation from '../models/Donation.js';
import GalleryImage from '../models/GalleryImage.js';
import Testimonial from '../models/Testimonial.js';
import ContactMessage from '../models/ContactMessage.js';

dotenv.config();

export const seedDatabase = async () => {
  try {
    console.log('[Seeder] Checking and seeding database records...');

    // 1. Seed Admin
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@sevango.org';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@12345';
    const adminName = 'Seva NGO Administrator';

    let existingAdmin = await Admin.findOne({ email: adminEmail.toLowerCase() });
    if (!existingAdmin) {
      // Let pre-save hook hash the password
      existingAdmin = await Admin.create({
        name: adminName,
        email: adminEmail.toLowerCase(),
        password: adminPassword,
        role: 'superadmin'
      });
      console.log(`[Seeder] Created default admin account: ${adminEmail}`);
    }

    // 2. Seed Causes if empty
    const causesCount = await Cause.countDocuments();
    if (causesCount === 0) {
      const causesData = [
        {
          title: 'Quality Primary Education for Slum & Rural Children',
          category: 'Education',
          shortDescription: 'Providing school kits, tuition support, and foundational literacy to underprivileged children.',
          description: 'Access to early education breaks generational cycles of poverty. This initiative supports learning centers with textbooks, uniforms, after-school tutoring, and digital learning tablets so children can stay in school and thrive.',
          image: '/images/educational_support_1790558840228.jpg',
          targetAmount: 500000,
          amountRaised: 320000,
          donorCount: 48,
          featured: true,
          status: 'active'
        },
        {
          title: 'Daily Nutrition & Community Meal Drives',
          category: 'Food Distribution',
          shortDescription: 'Serving fresh, wholesome hot meals to daily wage laborers, homeless individuals, and children.',
          description: 'No one in our community should sleep hungry. Our volunteer kitchens prepare balanced, nutritious meals daily and distribute dry ration emergency kits with rice, lentils, and cooking oil to families facing distress.',
          image: '/images/food_distribution_1790558827854.jpg',
          targetAmount: 350000,
          amountRaised: 285000,
          donorCount: 72,
          featured: true,
          status: 'active'
        },
        {
          title: 'Free Mobile Health Camps & Diagnostic Care',
          category: 'Healthcare',
          shortDescription: 'Delivering basic medical consultations, free medicines, and eye checkups in underserved pockets.',
          description: 'Routine healthcare is often inaccessible or prohibitively expensive for rural and informal workers. Our volunteer doctors provide general consultations, diabetes screening, vision tests, and free prescription medications.',
          image: '/images/community_health_camp_1790558802134.jpg',
          targetAmount: 450000,
          amountRaised: 210000,
          donorCount: 39,
          featured: true,
          status: 'active'
        },
        {
          title: 'Livelihood & Tailoring Skills for Women',
          category: 'Women Empowerment',
          shortDescription: 'Empowering women from low-income families with sewing, artisanal crafts, and financial literacy.',
          description: 'When a woman earns an independent livelihood, her entire family benefits. This center offers a six-month intensive tailoring course, machine allocation, and micro-business guidance to enable home-based earnings.',
          image: '/images/gallery/women-empowerment.jpg',
          targetAmount: 300000,
          amountRaised: 185000,
          donorCount: 31,
          featured: true,
          status: 'active'
        },
        {
          title: 'Clean Drinking Water & Community Sanitation',
          category: 'Rural Development',
          shortDescription: 'Installing community bio-sand water filters and clean sanitation facilities in remote hamlets.',
          description: 'Waterborne diseases severely impact children in remote villages. We work alongside local residents to construct reliable water purification units and educate schools on hygiene and water conservation.',
          image: '/images/gallery/rural-outreach.jpg',
          targetAmount: 400000,
          amountRaised: 195000,
          donorCount: 27,
          featured: false,
          status: 'active'
        },
        {
          title: 'Comfort, Medicine & Shelter for Elderly In Need',
          category: 'Elderly Care',
          shortDescription: 'Providing medical care, nutritious food, and emotional companionship to destitute seniors.',
          description: 'Many elderly citizens live without family support or pension. This initiative provides monthly medicine bundles, mobility aids, regular home check-ins, and assisted living shelter admissions.',
          image: '/images/gallery/community-service.jpg',
          targetAmount: 350000,
          amountRaised: 240000,
          donorCount: 42,
          featured: false,
          status: 'active'
        }
      ];

      await Cause.insertMany(causesData);
      console.log(`[Seeder] Seeded ${causesData.length} initial causes`);
    }

    // 3. Seed Events if empty
    const eventsCount = await Event.countDocuments();
    if (eventsCount === 0) {
      const futureDate1 = new Date();
      futureDate1.setDate(futureDate1.getDate() + 7);

      const futureDate2 = new Date();
      futureDate2.setDate(futureDate2.getDate() + 15);

      const futureDate3 = new Date();
      futureDate3.setDate(futureDate3.getDate() + 24);

      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 10);

      const eventsData = [
        {
          title: 'Mega Health & Eye Checkup Camp',
          date: futureDate1,
          time: '09:00 AM - 03:00 PM',
          location: 'Community Center, Ward 12 [NGO ADDRESS]',
          category: 'Healthcare Drive',
          organizer: 'Seva Medical Volunteer Cell',
          shortDescription: 'Comprehensive checkups, blood pressure monitoring, and prescription glasses distribution.',
          description: 'Open to all community members. Certified volunteer doctors and optometrists will provide free consultations, diabetes screenings, pediatric checks, and basic medication kits.',
          image: '/images/gallery_health_camp_1790353051447.jpg',
          registrationInfo: 'Walk-ins welcome, or pre-register online to avoid queue waiting.',
          capacity: 250,
          registeredCount: 45,
          status: 'upcoming'
        },
        {
          title: 'Annual Back-to-School Kit Distribution',
          date: futureDate2,
          time: '10:30 AM - 01:30 PM',
          location: 'Seva Learning Hub [NGO ADDRESS]',
          category: 'Education Outreach',
          organizer: 'Youth Volunteer Chapter',
          shortDescription: 'Distributing bags, notebooks, geometry boxes, and stationery to 300 students.',
          description: 'Join hands as our volunteers pack and distribute essential academic kits for young students before the start of the new academic term.',
          image: '/images/gallery_health_camp_1790353051447.jpg',
          registrationInfo: 'Volunteers requested to arrive 1 hour early for kit assembly.',
          capacity: 100,
          registeredCount: 62,
          status: 'upcoming'
        },
        {
          title: 'Weekend Nutrition & Food Relief Drive',
          date: futureDate3,
          time: '11:00 AM - 02:00 PM',
          location: 'East District Settlement Ground [NGO ADDRESS]',
          category: 'Food Relief',
          organizer: 'Seva Kitchen Team',
          shortDescription: 'Preparing and serving 500 freshly cooked warm meals and ration distribution.',
          description: 'Volunteers will assist in packaging food parcels and orderly meal distribution across vulnerable settlements in the district.',
          image: '/images/gallery_health_camp_1790353051447.jpg',
          registrationInfo: 'Sign up to assist with logistics, cooking, or distribution.',
          capacity: 80,
          registeredCount: 38,
          status: 'upcoming'
        },
        {
          title: 'Tree Plantation & Clean Neighborhood Day',
          date: pastDate,
          time: '07:30 AM - 11:30 AM',
          location: 'Green Belt Corridor [NGO ADDRESS]',
          category: 'Environment',
          organizer: 'Green Seva Brigade',
          shortDescription: 'Planting 250 native saplings and community clean-up drive.',
          description: 'Over 60 dedicated local volunteers participated in our neighborhood greening drive planting neem, peepal, and fruit-bearing trees.',
          image: '/images/gallery_health_camp_1790353051447.jpg',
          registrationInfo: 'Event successfully concluded.',
          capacity: 100,
          registeredCount: 84,
          status: 'completed'
        }
      ];

      await Event.insertMany(eventsData);
      console.log(`[Seeder] Seeded ${eventsData.length} events`);
    }

    // 4. Seed Gallery Images if empty
    const galleryCount = await GalleryImage.countDocuments();
    if (galleryCount === 0) {
      const galleryData = [
        {
          title: 'Community Health Camp',
          category: 'Healthcare',
          caption: 'An initiative focused on promoting health awareness and encouraging access to basic healthcare services within the community.',
          imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
          featured: true
        },
        {
          title: 'Health Awareness Program',
          category: 'Healthcare',
          caption: 'Volunteers participating in a community health awareness activity.',
          imageUrl: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80',
          featured: true
        },
        {
          title: 'Community Food Distribution',
          category: 'Food Distribution',
          caption: 'A community support activity focused on sharing essential food resources with people who may need assistance.',
          imageUrl: 'https://images.unsplash.com/photo-1593113512632-0544f8f4a395?auto=format&fit=crop&w=800&q=80',
          featured: true
        },
        {
          title: 'Educational Support Initiative',
          category: 'Education',
          caption: 'A community-focused activity encouraging children through learning support, mentorship and educational guidance.',
          imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
          featured: true
        },
        {
          title: 'Community Clean-Up Drive',
          category: 'Environment',
          caption: 'Local volunteers taking charge of neighborhood cleanliness and environmental hygiene.',
          imageUrl: 'https://images.unsplash.com/photo-1618477461853-cf6ed80fbfc9?auto=format&fit=crop&w=800&q=80',
          featured: true
        },
        {
          title: 'Tree Plantation Activity',
          category: 'Environment',
          caption: 'An environmental initiative encouraging community participation in creating greener and healthier surroundings.',
          imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
          featured: true
        },
        {
          title: 'Women Empowerment Workshop',
          category: 'Women Empowerment',
          caption: 'Skill development and vocational training sessions aimed at financial independence.',
          imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80',
          featured: true
        },
        {
          title: 'Rural Community Outreach',
          category: 'Community Service',
          caption: 'Engaging with rural communities to understand their needs and provide sustained grassroots support.',
          imageUrl: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=800&q=80',
          featured: true
        },
        {
          title: 'Blood Donation Awareness',
          category: 'Healthcare',
          caption: 'Encouraging voluntary blood donation to save lives in critical emergencies.',
          imageUrl: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=800&q=80',
          featured: true
        },
        {
          title: 'Community Service Activity',
          category: 'Community Service',
          caption: 'Youth volunteers collaborating to rebuild and support local infrastructure.',
          imageUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=800&q=80',
          featured: true
        }
      ];

      await GalleryImage.insertMany(galleryData);
      console.log(`[Seeder] Seeded ${galleryData.length} gallery images`);
    }

    // 5. Seed Testimonials if empty
    const testimonialCount = await Testimonial.countDocuments();
    if (testimonialCount === 0) {
      const testimonialData = [
        {
          name: 'Sunita Sharma',
          role: 'Community Volunteer & Teacher',
          location: 'Delhi NCR',
          message: 'Volunteering with Seva NGO has been one of the most fulfilling experiences of my life. Seeing children who struggled with basic letters read whole books with confidence makes every weekend worth it.',
          rating: 5,
          featured: true
        },
        {
          name: 'Dr. Ramesh K.',
          role: 'Volunteer Medical Officer',
          location: 'Pune',
          message: 'The dedication and transparency of the ground team is exemplary. Healthcare camps are run with dignity, precision, and heartfelt compassion for every patient who walks in.',
          rating: 5,
          featured: true
        },
        {
          name: 'Ananya Deshmukh',
          role: 'Monthly Sustaining Donor',
          location: 'Bengaluru',
          message: 'I value knowing where every rupee goes. Seva NGO consistently provides transparent updates and real stories of the individuals they support.',
          rating: 5,
          featured: true
        }
      ];

      await Testimonial.insertMany(testimonialData);
      console.log(`[Seeder] Seeded ${testimonialData.length} testimonials`);
    }

    // 6. Seed a sample donation if none exist
    const donationCount = await Donation.countDocuments();
    if (donationCount === 0) {
      await Donation.create({
        donorName: 'Rahul Verma',
        email: 'rahul.supporter@example.com',
        phone: '+91 9876543210',
        amount: 2500,
        causeTitle: 'Quality Primary Education for Slum & Rural Children',
        paymentMethod: 'Test Simulation (Razorpay/Stripe Integration Ready)',
        paymentStatus: 'successful',
        isAnonymous: false,
        message: 'Wishing the best for the children!'
      });
      console.log('[Seeder] Seeded sample donation record');
    }

    // 7. Seed sample volunteer if none exist
    const volunteerCount = await Volunteer.countDocuments();
    if (volunteerCount === 0) {
      await Volunteer.create({
        name: 'Pooja Nair',
        email: 'pooja.nair@example.com',
        phone: '+91 9123456789',
        age: 24,
        city: 'Mumbai',
        areaOfInterest: 'Education & Tutoring',
        availability: 'Weekends',
        message: 'I am a software engineer looking to teach mathematics and basic coding on weekends.',
        status: 'pending'
      });
      console.log('[Seeder] Seeded sample volunteer applicant');
    }

    console.log('[Seeder] Database seeding verified successfully.');
  } catch (error) {
    console.error('[Seeder] Error during seeding:', error.message);
  }
};
