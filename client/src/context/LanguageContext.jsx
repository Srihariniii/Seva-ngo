import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  // Navigation & Header
  'nav.home': { en: 'Home', ta: 'முகப்பு' },
  'nav.about': { en: 'About Us', ta: 'எங்களைப் பற்றி' },
  'nav.causes': { en: 'Our Causes', ta: 'எங்கள் நோக்கங்கள்' },
  'nav.ourCauses': { en: 'Our Causes', ta: 'எங்கள் நோக்கங்கள்' },
  'nav.impact': { en: 'Our Impact', ta: 'நமது தாக்கம்' },
  'nav.donate': { en: 'Donate', ta: 'தானம் செய்' },
  'nav.donateNow': { en: 'Donate Now', ta: 'நன்கொடை வழங்குக' },
  'nav.contact': { en: 'Contact Us', ta: 'தொடர்பு கொள்க' },
  'nav.contactUs': { en: 'Contact Us', ta: 'தொடர்பு கொள்க' },
  'nav.menu': { en: 'Menu', ta: 'மெனு' },
  'nav.close': { en: 'Close', ta: 'மூடு' },
  'nav.navigation': { en: 'Navigation', ta: 'பட்டியல்' },
  'nav.tagline': { en: 'Grassroots Service in Tamil Nadu', ta: 'தமிழ்நாட்டில் மக்கள் சேவை' },
  'nav.initiative': { en: 'Registered Non-Profit Grassroots Initiative', ta: 'பதிவுபெற்ற மக்கள் நல சேவை இயக்கம்' },
  'nav.helpline': { en: 'Helpline', ta: 'உதவி எண்' },
  'nav.volunteer': { en: 'Volunteer', ta: 'தன்னார்வலர்' },
  'nav.adminPortal': { en: 'Admin Access', ta: 'நிர்வாக தளம்' },
  'nav.quickContact': { en: 'Need Help or Want to Visit?', ta: 'தொடர்பு கொள்ள வேண்டுமா?' },

  // Common UI labels
  'common.learnMore': { en: 'Learn More', ta: 'மேலும் அறிக' },
  'common.readMore': { en: 'Read More', ta: 'மேலும் வாசிக்க' },
  'common.viewAll': { en: 'View All', ta: 'அனைத்தையும் காண்க' },
  'common.close': { en: 'Close', ta: 'மூடு' },
  'common.submit': { en: 'Submit', ta: 'சமர்ப்பிக்க' },
  'common.loading': { en: 'Loading...', ta: 'ஏற்றுகிறது...' },
  'common.back': { en: 'Back', ta: 'பின்னே' },
  'common.retry': { en: 'Retry', ta: 'மீண்டும் முயற்சிக்க' },
  'common.required': { en: 'Required', ta: 'தேவையானவை' },
  'common.optional': { en: 'Optional', ta: 'விருப்பப்பட்டால்' },
  'common.share': { en: 'Share', ta: 'பகிர்க' },

  // Home Page - Hero
  'home.heroBadge': { en: 'Grassroots Humanitarian Initiative • Tamil Nadu', ta: 'அடிமட்ட மக்கள் சேவை இயக்கம் • தமிழ்நாடு' },
  'home.heroTitle': { en: 'Creating positive change in every life we touch', ta: 'ஒவ்வொருவரின் வாழ்க்கையிலும் நல்ல மாற்றத்தை உருவாக்குவோம்' },
  'home.heroDesc': { en: 'Supporting education, healthcare, food security, and community welfare to build a brighter future for all.', ta: 'கல்வி, சுகாதாரம், உணவு மற்றும் சமூக நலன் ஆகிய துறைகளில் ஆதரவு வழங்கி, அனைவருக்கும் சிறந்த எதிர்காலத்தை உருவாக்கப் பாடுபடுகிறோம்.' },
  'home.heroCausesBtn': { en: 'Our Causes', ta: 'எங்கள் நோக்கங்கள்' },
  'home.heroDonateBtn': { en: 'Donate', ta: 'தானம் செய்' },
  'home.trustDirect': { en: '100% Direct Field Aid', ta: '100% நேரடி கள உதவி' },
  'home.trustAudits': { en: 'Community Accountability', ta: 'வெளிப்படையான மக்கள் தணிக்கை' },
  'home.trustLocal': { en: 'Rooted in Tamil Nadu', ta: 'தமிழ்நாடு நேரடி களப்பணி' },
  'home.photoQuote': { en: '"Every hand extended in service brings dignity to a family."', ta: '"சேவையில் நீட்டப்படும் ஒவ்வொரு கரமும் ஒரு குடும்பத்திற்கு கண்ணியத்தைத் தருகிறது."' },
  'home.photoLocation': { en: 'Community Healthcare & Elder Service, Tamil Nadu', ta: 'முதியோர் நலம் மற்றும் மருத்துவ களப்பணி, தமிழ்நாடு' },

  // Home Page - Our Causes Section
  'home.causesTitle': { en: 'Our Causes', ta: 'எங்கள் நோக்கங்கள்' },
  'home.causesSubtitle': { en: 'Dedicated grassroots initiatives uplifting lives with compassion, dignity, and direct community participation.', ta: 'எளிய மக்களின் வாழ்வில் ஒளியேற்ற நாம் முன்னெடுக்கும் நான்கு முக்கிய நற்பணிகள்.' },
  'home.cause1Title': { en: 'Education Support', ta: 'கல்வி ஆதரவு' },
  'home.cause1Desc': { en: 'Helping underprivileged and rural children access education, learning materials, and evening tutoring centers.', ta: 'பின்தங்கிய மற்றும் கிராமப்புற குழந்தைகள் இடைநிற்றலின்றி பள்ளிப் படிப்பைத் தொடர கல்வி உதவி, புத்தகங்கள் மற்றும் மாலைநேர கற்றல் மையங்களை வழங்குகிறோம்.' },
  'home.cause2Title': { en: 'Healthcare Service', ta: 'சுகாதார சேவை' },
  'home.cause2Desc': { en: 'Supporting healthcare access through free mobile medical camps, doctor consultations, and essential medicines.', ta: 'மருத்துவ வசதி குறைந்த கிராமங்களுக்குச் சென்று இலவச பரிசோதனை, ரத்த அழுத்த கண்காணிப்பு மற்றும் அத்தியாவசிய மருந்துகளை வழங்குகிறோம்.' },
  'home.cause3Title': { en: 'Food Security', ta: 'உணவு பாதுகாப்பு' },
  'home.cause3Desc': { en: 'Providing wholesome hot meals and emergency dry ration kits to destitute elders and daily wage workers.', ta: 'ஆதரவற்ற முதியவர்கள் மற்றும் தினக்கூலி தொழிலாளர்களுக்கு சத்தான சூடான உணவுகளையும் உலர் ரேஷன் பொருட்களையும் பசியின்றி வாழ வழங்குகிறோம்.' },
  'home.cause4Title': { en: 'Community Welfare', ta: 'சமூக நலன்' },
  'home.cause4Desc': { en: 'Supporting local communities through women livelihood tailoring skills, elder care, and sustainable local aid.', ta: 'மகளிர் வாழ்வாதார தையல் பயிற்சி, முதியோர் பராமரிப்பு மற்றும் கிராமப்புற அடிப்படை வசதிகளை மேம்படுத்தி குடும்பங்களை தற்சார்புடன் வாழச் செய்கிறோம்.' },
  'home.learnMoreBtn': { en: 'Learn More', ta: 'மேலும் அறிக' },

  // Home Page - About Seva & Impact Section
  'home.aboutHeading': { en: 'About Seva NGO', ta: 'சேவா தொண்டு நிறுவனம் பற்றி' },
  'home.aboutDesc': { en: 'A grassroots non-governmental initiative in Tamil Nadu dedicated to human dignity, equal opportunity, and direct community support. Every contribution directly reaches those who need it most, without middlemen or administrative wastage.', ta: 'தமிழ்நாட்டின் அடிமட்ட கிராமங்களில் உண்மையான அன்போடும், சுயமரியாதையோடும் எளிய மக்களின் வாழ்வாதாரத்தை உயர்த்தும் தொண்டு இயக்கம். இடைத்தரகர்கள் இன்றி, உங்கள் உதவி நேரடியாக உரியவர்களைச் சென்றடைவதை உறுதி செய்கிறோம்.' },
  'home.impactPillar1Title': { en: 'Village Evening Study Centers', ta: 'கிராமப்புற மாலைநேர கற்றல் மையங்கள்' },
  'home.impactPillar1Desc': { en: 'Remedial coaching and school supplies for first-generation school learners.', ta: 'முதல் தலைமுறை பள்ளி மாணவர்களுக்கான இலவச கல்வி வழிகாட்டல் மற்றும் நோட்டுப் புத்தகங்கள்.' },
  'home.impactPillar2Title': { en: 'Mobile Health Camps', ta: 'நடமாடும் இலவச மருத்துவ முகாம்கள்' },
  'home.impactPillar2Desc': { en: 'Routine doctor visits, blood pressure/sugar checks, and free medicines in rural pockets.', ta: 'கிராமங்கள்தோறும் மருத்துவர் பரிசோதனை, ரத்த அழுத்த கண்காணிப்பு மற்றும் இலவச மருந்துகள்.' },
  'home.impactPillar3Title': { en: 'Daily Nutrition Drives', ta: 'பசி போக்கும் உணவு வழங்கல்' },
  'home.impactPillar3Desc': { en: 'Wholesome cooked meals served to destitute seniors and daily laborers.', ta: 'ஆதரவற்ற முதியோர் மற்றும் நோயாளிகளுக்கான சத்தான சூடான உணவு.' },
  'home.impactPillar4Title': { en: 'Women Livelihood Center', ta: 'மகளிர் சுயதொழில் பயிற்சி' },
  'home.impactPillar4Desc': { en: 'Free vocational tailoring courses and micro-enterprise guidance enabling self-reliance.', ta: 'தையல் மற்றும் கைவினைப் பயிற்சிகள் மூலம் பெண்களின் வாழ்வாதார தன்னிறைவு.' },

  // Home Page - Donation Section
  'home.donateSectionTitle': { en: 'Your Support Brings Hope to Those in Need', ta: 'உங்கள் உதவியால் ஒரு புதிய விடியல் மலரட்டும்' },
  'home.donateSectionDesc': { en: 'Every rupee directly funds school kits for children, hot meals for destitute seniors, and life-saving medicines for rural health camps. Transparent, audited, and volunteer-driven.', ta: 'நீங்கள் வழங்கும் சிறிய உதவியும் ஒரு குழந்தையின் படிப்பை காக்கும், ஒரு முதியவரின் பசியைப் போக்கும். அனைத்து நன்கொடைகளும் 100% நேரடி மக்கள் நலப்பணிகளுக்கு மட்டுமே பயன்படுத்தப்படுகின்றன.' },
  'home.donateSectionBtn': { en: 'Donate to Seva NGO', ta: 'தானம் செய்ய' },
  'home.donateTrust': { en: '100% Direct Field Assistance • Verified Non-Profit Registry', ta: '100% நேரடி மக்கள் பயன்பாடு • வெளிப்படையான பதிவேடு' },

  // About Preview Section
  'home.aboutPreTitle': { en: 'Who We Are', ta: 'நாம் யார்?' },
  'home.aboutHeading': { en: 'Rooted in Community Dignity, Serving Without Compromise', ta: 'மக்களின் சுயமரியாதையில் ஊன்றிய தன்னலமற்ற சேவை' },
  'home.aboutDesc1': { en: 'Seva NGO was founded to address critical daily needs—basic nutrition, child schooling, and preventive medicine—for families living in rural hamlets and informal settlements in Tamil Nadu.', ta: 'சேவா தொண்டு நிறுவனம், தமிழ்நாட்டில் நலிவடைந்த குடும்பங்களின் அடிப்படைத் தேவைகளான கல்வி, உணவு மற்றும் மருத்துவத்தை நேர்மையுடன் நிறைவேற்ற உருவாக்கப்பட்டது.' },
  'home.aboutDesc2': { en: 'Rather than distant charity, we work hand-in-hand with local teachers, village panchayats, and youth collectives to build long-term pathways out of poverty.', ta: 'விளம்பர நோக்கின்றி, ஊர் பெரியவர்கள் மற்றும் ஆசிரியர்களுடன் கைகோர்த்து, எளியோரின் நிலையான முன்னேற்றத்திற்காக உழைக்கிறோம்.' },
  'home.aboutP1Title': { en: 'Education First', ta: 'கல்விக்கு முன்னுரிமை' },
  'home.aboutP1Desc': { en: 'After-school study centers, school kits, and learning supplies for village children.', ta: 'கிராமப்புறங்களில் மாலைநேர கல்வி மையங்கள் மற்றும் நோட்டு புத்தகங்கள் வழங்கல்.' },
  'home.aboutP2Title': { en: 'Zero Hunger Commitment', ta: 'பசி போக்கும் திட்டம்' },
  'home.aboutP2Desc': { en: 'Daily cooked meals for destitute seniors and dry rations for daily-wage families.', ta: 'முதியோர் மற்றும் தினக்கூலி தொழிலாளர்களுக்கு சத்தான சூடான உணவு.' },
  'home.aboutP3Title': { en: 'Preventive Health', ta: 'இலவச நல்வாழ்வு' },
  'home.aboutP3Desc': { en: 'Regular medical checkups, diabetes screenings, and free prescription medicines.', ta: 'இலவச மருத்துவ முகாம்கள், இரத்த அழுத்த பரிசோதனை மற்றும் மருந்துகள்.' },
  'home.aboutFullStory': { en: 'Read Our Story & Values', ta: 'எங்கள் வரலாறு மற்றும் கொள்கைகள்' },

  // Featured Causes Section
  'home.causesPreTitle': { en: 'Priority Needs', ta: 'அவசரத் தேவைகள்' },
  'home.causesHeading': { en: 'Featured Causes Needing Your Support', ta: 'உங்கள் உதவி தேவைப்படும் முக்கிய திட்டங்கள்' },
  'home.causesSubtitle': { en: 'Every cause addresses a verified need in Tamil Nadu. 100% of your contribution reaches the field.', ta: 'ஒவ்வொரு திட்டமும் தமிழ்நாட்டில் நேரடி களப்பணியை உறுதி செய்கிறது. உங்கள் நன்கொடை 100% களத்திற்கே செல்கிறது.' },
  'home.viewAllCauses': { en: 'View All Causes', ta: 'அனைத்து திட்டங்களையும் காண்க' },
  'home.goal': { en: 'Goal', ta: 'இலக்கு' },
  'home.raised': { en: 'Raised', ta: 'திரட்டப்பட்டது' },
  'home.donors': { en: 'donors', ta: 'நன்கொடையாளர்கள்' },
  'home.learnDetails': { en: 'Learn Details', ta: 'விபரங்கள் அறிய' },
  'home.supportCause': { en: 'Support Cause', ta: 'நிதி உதவி செய்க' },

  // Call to Action
  'home.ctaHeading': { en: 'Real Change Happens When Good People Come Together', ta: 'நல்ல மனிதர்கள் ஒன்றிணையும் போது நன்மைகள் மலர்கின்றன' },
  'home.ctaDesc': { en: 'Whether you donate ₹500 or volunteer a few hours on a weekend, your contribution directly touches a life in need in Tamil Nadu.', ta: 'நீங்கள் வழங்கும் சிறு தொகையோ அல்லது வார இறுதியில் செலவிடும் சில மணிநேரங்களோ, ஒரு எளிய குடும்பத்தின் வாழ்வில் மறுமலர்ச்சியை ஏற்படுத்தும்.' },
  'home.ctaVolunteerBtn': { en: 'Become a Volunteer', ta: 'தன்னார்வலராக இணைய' },
  'home.ctaDonateBtn': { en: 'Donate to Seva NGO', ta: 'நன்கொடை அளியுங்கள்' },

  // Causes Page
  'causes.headerPre': { en: 'Ground Impact Programs', ta: 'நேரடி மக்கள் நலப்பணிகள்' },
  'causes.headerTitle': { en: 'Our Active Causes in Tamil Nadu', ta: 'தமிழ்நாட்டில் எங்களது சமூக திட்டங்கள்' },
  'causes.headerDesc': { en: 'Every initiative addresses an acute human need with transparent reporting and community stewardship.', ta: 'ஒவ்வொரு திட்டமும் எளிய மக்களின் வாழ்வை உயர்த்துகிறது. உங்கள் நிதிப்பங்களிப்பு எவ்வாறு பயன்படுகிறது என்பதை அறியுங்கள்.' },
  'causes.searchPlaceholder': { en: 'Search causes by title, keyword, or village initiative...', ta: 'திட்டங்களை தேடுங்கள்...' },
  'causes.sortBy': { en: 'Sort By:', ta: 'வரிசைப்படுத்துக:' },
  'causes.newest': { en: 'Newest First', ta: 'புதியவை முதலில்' },
  'causes.oldest': { en: 'Oldest First', ta: 'பழையவை முதலில்' },
  'causes.goalHigh': { en: 'Goal: High to Low', ta: 'இலக்கு: அதிகம் முதல் குறைவு' },
  'causes.goalLow': { en: 'Goal: Low to High', ta: 'இலக்கு: குறைவு முதல் அதிகம்' },
  'causes.raisedHigh': { en: 'Most Raised', ta: 'அதிக நிதி திரட்டப்பட்டது' },
  'causes.noCauses': { en: 'No causes match your filter criteria.', ta: 'உங்கள் தேடலுக்குரிய திட்டங்கள் எதுவும் இல்லை.' },
  'causes.resetFilters': { en: 'Reset Filters', ta: 'வடிகட்டலை மீட்டமைக்க' },
  'causes.categoryAll': { en: 'All', ta: 'அனைத்தும்' },
  'causes.categoryEdu': { en: 'Education', ta: 'கல்வி' },
  'causes.categoryFood': { en: 'Food Distribution', ta: 'உணவு வழங்கல்' },
  'causes.categoryHealth': { en: 'Healthcare', ta: 'மருத்துவ உதவி' },
  'causes.categoryWomen': { en: 'Women Empowerment', ta: 'மகளிர் மேம்பாடு' },
  'causes.categoryRural': { en: 'Rural Development', ta: 'கிராமப்புற வளர்ச்சி' },
  'causes.categoryElderly': { en: 'Elderly Care', ta: 'முதியோர் நலம்' },

  // Cause Details Page
  'causeDetails.back': { en: 'Back to Causes', ta: 'திட்டங்கள் பக்கத்திற்கு திரும்புக' },
  'causeDetails.target': { en: 'Target Goal', ta: 'நிதி இலக்கு' },
  'causeDetails.collected': { en: 'Amount Raised', ta: 'திரட்டப்பட்ட தொகை' },
  'causeDetails.supporters': { en: 'Supporters', ta: 'ஆதரவாளர்கள்' },
  'causeDetails.about': { en: 'About This Initiative', ta: 'இத்திட்டத்தைப் பற்றி' },
  'causeDetails.fundUse': { en: 'How Funds Are Utilized', ta: 'நிதி எவ்வாறு செலவிடப்படுகிறது?' },
  'causeDetails.donateBtn': { en: 'Donate to this Cause', ta: 'இத்திட்டத்திற்கு நன்கொடை வழங்குக' },
  'causeDetails.shareBtn': { en: 'Share Cause', ta: 'பகிர்க' },

  // Donate Page
  'donate.headerPre': { en: 'Transparent Giving', ta: 'வெளிப்படையான உதவி' },
  'donate.headerTitle': { en: 'Support Grassroots Action in Tamil Nadu', ta: 'எளிய மக்களின் வாழ்விற்கு துணை நில்லுங்கள்' },
  'donate.headerDesc': { en: 'Every rupee contributed translates directly into meals, textbooks, and preventive health screenings.', ta: 'நீங்கள் வழங்கும் ஒவ்வொரு ரூபாயும் எளியோரின் உணவு, கல்வி மற்றும் மருத்துவத்திற்கு நேரடியாக செல்கிறது.' },
  'donate.modeNoticeTitle': { en: 'Pre-Gateway Registration Mode', ta: 'நேரடி வங்கி பரிசீலனை முறை' },
  'donate.modeNoticeText': { en: 'Live online gateway processing will be connected once statutory bank documentation is formalized. Submitting records your donation in the Seva database.', ta: 'வங்கி ஆவணப் பரிசீலனை நிறைவடையும் வரை பரிவர்த்தனைகள் நேரடியாக பதிவு செய்யப்படுகின்றன.' },
  'donate.step1': { en: '1. Choose Contribution Amount (INR)', ta: '1. நன்கொடை தொகையை தேர்வு செய்க (ரூபாய்)' },
  'donate.customPlaceholder': { en: 'Enter custom amount...', ta: 'குறிப்பிட்ட தொகையை உள்ளிடவும்...' },
  'donate.step2': { en: '2. Allocate to a Specific Cause', ta: '2. நீங்கள் விரும்பும் திட்டத்தை தேர்வு செய்க' },
  'donate.generalOption': { en: 'General NGO Welfare Fund (Deploy Where Most Needed)', ta: 'பொது நல நிதி (அவசரத் தேவைக்கு பயன்படுத்த)' },
  'donate.step3': { en: '3. Donor Information', ta: '3. நன்கொடையாளர் விபரங்கள்' },
  'donate.nameLabel': { en: 'Full Name *', ta: 'முழுப் பெயர் *' },
  'donate.namePlaceholder': { en: 'e.g. Ramesh Kumar', ta: 'எ.கா. ரமேஷ் குமார்' },
  'donate.emailLabel': { en: 'Email Address (for Receipt) *', ta: 'மின்னஞ்சல் முகவரி (ரசீதுக்காக) *' },
  'donate.emailPlaceholder': { en: 'e.g. ramesh@example.com', ta: 'எ.கா. ramesh@example.com' },
  'donate.phoneLabel': { en: 'Phone Number (Optional)', ta: 'தொலைபேசி எண் (விருப்பப்பட்டால்)' },
  'donate.phonePlaceholder': { en: 'e.g. +91 94432 10987', ta: 'எ.கா. +91 94432 10987' },
  'donate.anonymousLabel': { en: 'Make this an Anonymous Contribution', ta: 'எனது பெயரை வெளியிடாமல் நன்கொடை வழங்குக' },
  'donate.messageLabel': { en: 'Blessing / Note for Field Team (Optional)', ta: 'களப்பணியாளர்களுக்கான வாழ்த்துச் செய்தி (விருப்பப்பட்டால்)' },
  'donate.messagePlaceholder': { en: 'Leave a word of encouragement for the children, teachers, or field team...', ta: 'உங்கள் வாழ்த்துக்களை பதிவிடவும்...' },
  'donate.submitBtn': { en: 'Proceed to Donate', ta: 'நன்கொடை வழங்க தொடரவும்' },
  'donate.submitting': { en: 'Recording Donation...', ta: 'நன்கொடை பதிவு செய்யப்படுகிறது...' },
  'donate.summaryTitle': { en: 'Donation Summary', ta: 'நன்கொடை சுருக்கம்' },
  'donate.selectedCause': { en: 'Selected Cause:', ta: 'தேர்ந்தெடுக்கப்பட்ட திட்டம்:' },
  'donate.donor': { en: 'Donor:', ta: 'நன்கொடையாளர்:' },
  'donate.currency': { en: 'Currency:', ta: 'நாணயம்:' },
  'donate.total': { en: 'Total Contribution:', ta: 'மொத்த தொகை:' },
  'donate.transparencyTitle': { en: 'Transparency Commitment', ta: 'வெளிப்படைத்தன்மை உறுதிப்பாடு' },
  'donate.transparencyText': { en: 'Every donation record is logged in the Seva registry and reconciled with field program disbursements.', ta: 'அனைத்து நன்கொடைகளும் முறையாக பதிவு செய்யப்பட்டு, திட்டச் செலவுகளுடன் ஒப்பிடப்பட்டு தணிக்கை செய்யப்படுகின்றன.' },
  'donate.taxNote': { en: 'Official 80G tax receipts are issued upon statutory update.', ta: 'சட்டரீதியான 80G ரசீதுகள் பதிவு முறையில் வழங்கப்படுகின்றன.' },
  'donate.grantsNote': { en: 'For institutional partnerships, contact us directly.', ta: 'நிறுவன உதவிகளுக்கு எங்களை நேரடியாக தொடர்பு கொள்ளவும்.' },
  'donate.receiptTitle': { en: 'Donation Receipt Summary', ta: 'நன்கொடை ரசீது சுருக்கம்' },
  'donate.thankYou': { en: 'Thank You For Your Support!', ta: 'சேவா தொண்டு நிறுவனத்திற்கு ஆதரவளித்தமைக்கு நன்றி!' },
  'donate.savedNote': { en: 'Your donation record has been saved in the Seva NGO database.', ta: 'உங்கள் நன்கொடை பதிவு செய்யப்பட்டது.' },
  'donate.txnId': { en: 'Transaction ID:', ta: 'பரிவர்த்தனை எண்:' },
  'donate.allocated': { en: 'Allocated Cause:', ta: 'ஒதுக்கப்பட்ட திட்டம்:' },
  'donate.status': { en: 'Status:', ta: 'நிலை:' },
  'donate.amount': { en: 'Amount:', ta: 'தொகை:' },
  'donate.print': { en: 'Print / Save Receipt', ta: 'ரசீதை அச்சிடுக / சேமிக்க' },
  'donate.done': { en: 'Done', ta: 'முடிந்தது' },
  'donate.errAmount': { en: 'Please select or enter a valid donation amount (at least ₹1).', ta: 'தயவுசெய்து குறைந்தபட்சம் ₹1 நன்கொடை தொகையை உள்ளிடவும்.' },
  'donate.errName': { en: 'Please provide your name or check "Make this an Anonymous Contribution".', ta: 'தயவுசெய்து உங்கள் பெயரை உள்ளிடவும் அல்லது பெயர் மறைக்க தேர்வு செய்யவும்.' },
  'donate.errEmail': { en: 'Please provide a valid email address for receipt generation.', ta: 'சரியான மின்னஞ்சல் முகவரியை உள்ளிடவும்.' },
  'donate.errGeneral': { en: 'Failed to process donation order. Please try again.', ta: 'நன்கொடை பதிவில் பிழை ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்.' },

  // About Page
  'about.headerPre': { en: 'About Seva NGO', ta: 'சேவா தொண்டு நிறுவனம்' },
  'about.headerTitle': { en: 'Driven by Compassion, Guided by Community', ta: 'கருணையால் வழிநடத்தப்பட்டு, மக்களுக்காக உழைக்கிறோம்' },
  'about.headerDesc': { en: 'We are a dedicated non-governmental collective working on the ground across Tamil Nadu to provide equal access to education, nutritious food, healthcare, and human dignity.', ta: 'தமிழ்நாட்டில் எளிய மக்களின் கல்வி, உணவு மற்றும் மருத்துவத் தேவைகளுக்காக அர்ப்பணிப்புடன் உழைக்கும் தன்னார்வலர்களின் கூட்டமைப்பு.' },
  'about.journeyPre': { en: 'Our Journey', ta: 'எங்கள் பயணம்' },
  'about.storyTitle': { en: 'The Story of Seva NGO', ta: 'சேவா தொண்டு நிறுவனத்தின் வரலாறு' },
  'about.storyP1': { en: 'Seva NGO started when a small group of volunteers and village teachers in Tamil Nadu witnessed children dropping out of primary school due to a lack of basic notebooks and midday meals. Rather than waiting for distant systems, they pooled personal funds on weekends to prepare meals and teach beneath village trees.', ta: 'தமிழ்நாட்டில் அடிப்படைப் பொருட்கள் மற்றும் உணவின்றி குழந்தைகள் பள்ளியை விட்டு விலகுவதைக் கண்ட ஆசிரியர்களும் நண்பர்களும் ஒன்றிணைந்து இச்சேவையைத் தொடங்கினர். மரத்தடியில் இலவச மாலைநேர வகுப்புகள் மற்றும் உணவு வழங்கல் மூலம் இப்பயணம் தொடங்கியது.' },
  'about.storyP2': { en: 'Over time, that modest weekend effort evolved into a registered network of educators, physicians, college students, and generous citizens united by a single conviction: every human being deserves a chance to live with respect and self-reliance.', ta: 'இன்று பல கிராமப்புற பகுதிகள் மற்றும் எளிய குடியிருப்புகளில் வாழும் மக்களுக்கு வாழ்வாதார நம்பிக்கையாக இது வளர்ந்துள்ளது.' },
  'about.regNotice': { en: 'Official non-profit society registration & filings: TN/2021/NGO-08942.', ta: 'பதிவுபெற்ற அறக்கட்டளை எண்: TN/2021/NGO-08942.' },
  'about.missionTitle': { en: 'Our Mission', ta: 'நமது நோக்கம்' },
  'about.missionDesc': { en: 'To stand alongside marginalized children, women, and seniors by delivering dependable access to quality foundational education, balanced daily nutrition, and community-level preventive healthcare.', ta: 'பின்தங்கிய குழந்தைகள், ஆதரவற்ற முதியோர்கள் மற்றும் ஏழை எளிய குடும்பங்களுக்கு முறையான கல்வி, சத்தான உணவு மற்றும் மருத்துவ வசதிகளை உறுதி செய்வது.' },
  'about.visionTitle': { en: 'Our Vision', ta: 'நமது தொலைநோக்கு' },
  'about.visionDesc': { en: 'A society where no child drops out of school due to lack of books, no elder suffers alone in hunger or illness, and every family has the tools to achieve self-sufficiency.', ta: 'எந்தவொரு குழந்தையும் கல்வியை இழக்காமலும், எந்தவொரு முதியவரும் பசியால் வாடாமலும், அனைவரும் சுயமரியாதையுடன் வாழும் சமுதாயத்தை உருவாக்குவது.' },
  'about.valuesPre': { en: 'Guiding Principles', ta: 'எங்கள் கொள்கைகள்' },
  'about.valuesTitle': { en: 'The Values That Shape Us', ta: 'எங்களை வழிநடத்தும் கொள்கைகள்' },
  'about.valuesDesc': { en: 'Our decisions in the field, from volunteer onboarding to fund utilization, are guided by four standards.', ta: 'களப்பணியில் எங்களை வழிநடத்தும் தூய கொள்கைகள்.' },
  'about.val1Title': { en: 'Dignity Over Charity', ta: 'தானத்தை விட சுயமரியாதை' },
  'about.val1Desc': { en: 'We treat every individual with deep respect, empowering families rather than creating dependency.', ta: 'எளியோரை யாசகர்களாகப் பார்க்காமல், முன்னேற்றத்திற்கான தோழர்களாக அரவணைக்கிறோம்.' },
  'about.val2Title': { en: 'Complete Transparency', ta: 'முழு வெளிப்படைத்தன்மை' },
  'about.val2Desc': { en: 'Every rupee collected and spent is documented. We believe donors and communities deserve full openness.', ta: 'பெறப்படும் நிதி மற்றும் திட்ட செலவுகள் வெளிப்படையாக பராமரிக்கப்படுகின்றன.' },
  'about.val3Title': { en: 'Grassroots Engagement', ta: 'மக்கள் பங்களிப்பு' },
  'about.val3Desc': { en: 'Our projects are designed in consultation with village elders, local teachers, and neighborhood families.', ta: 'கிராமப் பெரியவர்கள் மற்றும் தலைமை ஆசிரியர்களின் ஆலோசனையோடு திட்டங்கள் வகுக்கப்படுகின்றன.' },
  'about.val4Title': { en: 'Sustainable Action', ta: 'நிலையான வளர்ச்சி' },
  'about.val4Desc': { en: 'We focus on foundational interventions—literacy, vocational skills, and preventive health—that yield lifelong benefits.', ta: 'கல்வி, ஆரோக்கியம் மற்றும் தொழில் திறன் மூலம் குடும்பங்களின் நிலையான முன்னேற்றம்.' },
  'about.leadershipPre': { en: 'Leadership & Guidance', ta: 'வழிகாட்டுதல்' },
  'about.leadershipTitle': { en: 'Guided by Experience in the Field', ta: 'அனுபவமிக்க கள வழிகாட்டிகள்' },
  'about.doctorRole': { en: 'Doctor & Field Medical Director', ta: 'மருத்துவ இயக்குனர் மற்றும் கள தன்னார்வலர்' },
  'about.doctorBio': { en: '"Driven by a commitment to serving communities and contributing to meaningful social change through compassion, healthcare, and service."', ta: '"உண்மையான மருத்துவம் கிராமப்புற வீதிகளில் தொடங்கி, எளிய மக்களுக்கு அன்போடு இலவச சிகிச்சையை கொண்டு சேர்ப்பதில் தான் நிறைவடைகிறது."' },
  'about.growthPre': { en: 'Evolution', ta: 'மைல்கற்கள்' },
  'about.growthTitle': { en: 'Our Growth & Milestones', ta: 'எங்கள் வளர்ச்சி மற்றும் மைல்கற்கள்' },
  'about.growthDesc': { en: 'Tracing how collective goodwill transformed into organized community action.', ta: 'கூட்டு முயற்சியால் வளர்ந்த எமது மக்கள் சேவை பயணம்.' },
  'about.step1': { en: 'Phase 1: Foundation', ta: 'முதல் கட்டம்: தொடக்கம்' },
  'about.step1Title': { en: 'Grassroots Food & Relief Circle', ta: 'உணவு மற்றும் நிவாரண உதவி' },
  'about.step1Desc': { en: 'Started as a weekend voluntary collective distributing hot home-cooked meals to daily wage earners.', ta: 'ஆதரவற்ற முதியோர்கள் மற்றும் தினக்கூலி தொழிலாளர்களுக்கு சத்தான உணவு வழங்கி தொடங்கப்பட்டது.' },
  'about.step2': { en: 'Phase 2: Learning Hubs', ta: 'இரண்டாம் கட்டம்: கல்வி' },
  'about.step2Title': { en: 'Primary Education Centers', ta: 'மாலைநேர கல்வி மையங்கள்' },
  'about.step2Desc': { en: 'Opened community coaching centers providing remedial literacy and homework support for first-generation school learners.', ta: 'எளிய குழந்தைகளுக்கு பள்ளிப் பாடம் மற்றும் நோட்டு புத்தகங்கள் வழங்கும் மையங்கள்.' },
  'about.step3': { en: 'Phase 3: Healthcare Camps', ta: 'மூன்றாம் கட்டம்: நல்வாழ்வு' },
  'about.step3Title': { en: 'Mobile Diagnostic Units', ta: 'நடமாடும் இலவச மருத்துவ முகாம்கள்' },
  'about.step3Desc': { en: 'Partnered with volunteer physicians to deliver free preventive checkups, vision tests, and vital medications.', ta: 'மருத்துவர்களுடன் இணைந்து கிராமங்களில் இரத்த அழுத்தம், சர்க்கரை மற்றும் கண் பரிசோதனை முகாம்கள்.' },
  'about.step4': { en: 'Phase 4: Present & Future', ta: 'நான்காம் கட்டம்: சுயசார்பு' },
  'about.step4Title': { en: 'Holistic Community Empowerment', ta: 'சுயசார்பு சமுதாயம்' },
  'about.step4Desc': { en: 'Integrating women skill training, clean drinking water installations, and structured disaster relief preparedness.', ta: 'மகளிர் தையல் பயிற்சி மற்றும் கிராமங்களில் தூய குடிநீர் வடிகட்டும் அமைப்புகள்.' },
  'about.readyTitle': { en: 'Ready to Stand With Us?', ta: 'எங்களுடன் கைகோர்க்க தயாரா?' },
  'about.readyDesc': { en: 'Whether through voluntary time or financial sponsorship, your support translates directly into tangible food, books, and medicine.', ta: 'உங்கள் நேரடி பங்களிப்பும் நிதி உதவியும் பசித்த வயிறுகளுக்கும், பாதியில் நிற்கும் சிறார் கல்விக்கும் ஒளியூட்டும்.' },

  // Volunteer Page
  'volunteer.headerPre': { en: 'Join The Movement', ta: 'எங்களுடன் இணையுங்கள்' },
  'volunteer.headerTitle': { en: 'Become a Seva Volunteer', ta: 'சேவா தன்னார்வலராக இணையுங்கள்' },
  'volunteer.headerDesc': { en: 'Your dedication, time, and heart create immediate, life-changing ripples. Complete the registration below.', ta: 'உங்கள் நேரம் மற்றும் அர்ப்பணிப்பு எளிய மக்களின் வாழ்வில் ஒளியூட்டும். கீழே உள்ள படிவத்தை பூர்த்தி செய்து இணையுங்கள்.' },
  'volunteer.formTitle': { en: 'Volunteer Registration Form', ta: 'தன்னார்வலர் பதிவு படிவம்' },
  'volunteer.name': { en: 'Full Name *', ta: 'முழுப் பெயர் *' },
  'volunteer.email': { en: 'Email Address *', ta: 'மின்னஞ்சல் முகவரி *' },
  'volunteer.phone': { en: 'Phone Number *', ta: 'தொலைபேசி எண் *' },
  'volunteer.age': { en: 'Age *', ta: 'வயது *' },
  'volunteer.city': { en: 'City / District in Tamil Nadu *', ta: 'மாவட்டம் / ஊர் *' },
  'volunteer.interest': { en: 'Area of Interest', ta: 'ஆர்வமுள்ள துறை' },
  'volunteer.availability': { en: 'Availability', ta: 'பங்கேற்க இயலும் நேரம்' },
  'volunteer.notes': { en: 'Brief Experience / Why You Want to Join (Optional)', ta: 'தன்னார்வலராக இணைய விரும்புவதற்கான காரணம்' },
  'volunteer.submit': { en: 'Submit Volunteer Application', ta: 'விண்ணப்பத்தை சமர்ப்பிக்க' },
  'volunteer.submitting': { en: 'Submitting...', ta: 'சமர்ப்பிக்கப்படுகிறது...' },
  'volunteer.successTitle': { en: 'Thank You for Registering!', ta: 'பதிவு செய்தமைக்கு நெஞ்சார்ந்த நன்றிகள்!' },
  'volunteer.successText': { en: 'Our field coordinator will contact you shortly regarding orientation.', ta: 'எங்கள் கள ஒருங்கிணைப்பாளர் விரைவில் உங்களை தொடர்பு கொண்டு வழிகாட்டுவார்.' },

  // Contact Page
  'contact.headerPre': { en: 'We Are Here For You', ta: 'எங்களைத் தொடர்பு கொள்ள' },
  'contact.headerTitle': { en: 'Contact Seva NGO', ta: 'சேவா தொண்டு நிறுவனம் தொடர்பு' },
  'contact.headerDesc': { en: 'Have questions about our field initiatives or want to visit our centers in Tamil Nadu? Reach out anytime.', ta: 'எங்கள் களப்பணிகள் பற்றிய விபரங்கள் அறிய அல்லது மையங்களை பார்வையிட எப்போது வேண்டுமானாலும் தொடர்பு கொள்ளலாம்.' },
  'contact.formTitle': { en: 'Send a Message', ta: 'செய்தி அனுப்புக' },
  'contact.name': { en: 'Your Name *', ta: 'உங்கள் பெயர் *' },
  'contact.email': { en: 'Your Email *', ta: 'உங்கள் மின்னஞ்சல் *' },
  'contact.phone': { en: 'Phone Number', ta: 'தொலைபேசி எண்' },
  'contact.subject': { en: 'Subject *', ta: 'பொருள் *' },
  'contact.message': { en: 'Message *', ta: 'செய்தி *' },
  'contact.send': { en: 'Send Message', ta: 'செய்தியை அனுப்புக' },
  'contact.sending': { en: 'Sending...', ta: 'அனுப்பப்படுகிறது...' },
  'contact.sentSuccess': { en: 'Thank you! Your message has been received.', ta: 'நன்றி! உங்கள் செய்தி பெறப்பட்டது.' },
  'contact.office': { en: 'Field Office', ta: 'கள அலுவலகம்' },
  'contact.addressVal': { en: 'Seva NGO Field Office, Tamil Nadu, India', ta: 'சேவா தொண்டு நிறுவனம் கள அலுவலகம், தமிழ்நாடு, இந்தியா' },
  'contact.phoneVal': { en: '+91 94432 10987', ta: '+91 94432 10987' },
  'contact.emailVal': { en: 'contact@sevango.org', ta: 'contact@sevango.org' },
  'contact.hours': { en: 'Working Hours', ta: 'பணி நேரம்' },
  'contact.hoursVal': { en: 'Mon - Sat: 9:00 AM - 6:00 PM', ta: 'திங்கள் - சனி: காலை 9:00 - மாலை 6:00' },

  // Footer
  'footer.tagline': { en: 'An authentic grassroots non-governmental initiative serving underprivileged communities across Tamil Nadu with education, nutrition, and healthcare.', ta: 'தமிழ்நாட்டில் எளிய மக்களின் கல்வி, ஊட்டச்சத்து மற்றும் நல்வாழ்விற்காக செயல்படும் உண்மையான மக்கள் தொண்டு இயக்கம்.' },
  'footer.quickLinks': { en: 'Quick Navigation', ta: 'முக்கிய இணைப்புகள்' },
  'footer.involve': { en: 'Get Involved', ta: 'இணையுங்கள்' },
  'footer.contact': { en: 'Contact Info', ta: 'தொடர்பு விபரங்கள்' },
  'footer.adminPortal': { en: 'Admin Portal', ta: 'நிர்வாக தளம்' },
  'footer.registration': { en: 'Registered Non-Profit Trust: TN/2021/NGO-08942', ta: 'பதிவுபெற்ற அறக்கட்டளை எண்: TN/2021/NGO-08942' },
  'footer.copyright': { en: 'Seva NGO. Dedicated to grassroots service and human dignity in Tamil Nadu.', ta: 'சேவா தொண்டு நிறுவனம். மனித நேயத்திற்கும் மக்கள் சேவைக்கும் அர்ப்பணிக்கப்பட்டது.' },
  'footer.rights': { en: 'All rights reserved.', ta: 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.' }
};

// Helper function to localize a cause object into natural Tamil if language is 'ta'
export const getLocalizedCause = (cause, language) => {
  if (!cause) return cause;
  if (language !== 'ta') return cause;

  const titleLower = (cause.title || '').toLowerCase();
  const catLower = (cause.category || '').toLowerCase();

  let taTitle = cause.title;
  let taCat = cause.category;
  let taShort = cause.shortDescription;
  let taDesc = cause.description;

  if (titleLower.includes('education') || catLower.includes('education')) {
    taTitle = 'கிராமப்புற மற்றும் எளிய குழந்தைகளுக்கான ஆரம்பக் கல்வி';
    taCat = 'கல்வி';
    taShort = 'பின்தங்கிய குழந்தைகளுக்கு நோட்டு புத்தகங்கள், சீருடை மற்றும் இலவச மாலைநேர கல்வி உதவி.';
    taDesc = 'வறுமைச் சுழற்சியை உடைக்கக் கல்வியே அடிப்படை. கிராமப்புற மற்றும் எளிய குழந்தைகளுக்கு நோட்டுப் புத்தகங்கள், சீருடைகள் மற்றும் மாலைநேர இலவசப் பயிற்சி மையங்களை அமைத்துத் தருகிறோம்.';
  } else if (titleLower.includes('nutrition') || titleLower.includes('meal') || catLower.includes('food')) {
    taTitle = 'தினசரி உணவு மற்றும் பசி போக்கும் திட்டம்';
    taCat = 'உணவு வழங்கல்';
    taShort = 'தினக்கூலி தொழிலாளர்கள், ஆதரவற்றோர் மற்றும் ஏழை முதியவர்களுக்கு சத்தான சூடான உணவு வழங்கல்.';
    taDesc = 'நம் சமுதாயத்தில் எவரும் பசியோடு உறங்கக்கூடாது. தினக்கூலிகள் மற்றும் ஆதரவற்றோருக்கு எமது தன்னார்வலர்கள் அன்றாடம் சத்தான சமைத்த உணவையும், அவசர உலர் ரேஷன் பொருட்களையும் வழங்குகின்றனர்.';
  } else if (titleLower.includes('health') || titleLower.includes('camp') || catLower.includes('health')) {
    taTitle = 'இலவச கிராமப்புற மருத்துவ முகாம் மற்றும் பரிசோதனை';
    taCat = 'மருத்துவ உதவி';
    taShort = 'கிராமங்களில் பொது மருத்துவ பரிசோதனை, இலவச மருந்துகள் மற்றும் கண் சிகிச்சை முகாம்கள் நடத்துதல்.';
    taDesc = 'மருத்துவமனைக்குச் செல்ல முடியாத கிராமப்புற மக்களுக்கு இலவச பொது மருத்துவப் பரிசோதனை, சர்க்கரை மற்றும் இரத்த அழுத்த பரிசோதனை, கண் சிகிச்சை மற்றும் தேவையான மருந்துகளை இலவசமாக வழங்குகிறோம்.';
  } else if (titleLower.includes('tailoring') || titleLower.includes('women') || catLower.includes('women')) {
    taTitle = 'மகளிர் தையல் மற்றும் சுயதொழில் வாழ்வாதார பயிற்சி';
    taCat = 'மகளிர் மேம்பாடு';
    taShort = 'ஏழைப் பெண்களுக்கு இலவச தையல் பயிற்சி மற்றும் சுயதொழில் தொடங்குவதற்கான வழிகாட்டல்.';
    taDesc = 'ஒரு பெண் பொருளாதார சுதந்திரம் பெறும்போது அவளது முழுக் குடும்பமும் மேன்மையடைகிறது. ஆறு மாத கால தையல் பயிற்சி, தையல் இயந்திரம் மற்றும் சிறுதொழில் தொடங்குவதற்கான வழிகாட்டுதலை வழங்குகிறோம்.';
  } else if (titleLower.includes('water') || titleLower.includes('sanitation') || catLower.includes('rural')) {
    taTitle = 'தூய குடிநீர் மற்றும் கிராமப்புற சுகாதார வசதிகள்';
    taCat = 'கிராமப்புற வளர்ச்சி';
    taShort = 'குடிநீர் பற்றாக்குறை உள்ள கிராமங்களில் சுத்திகரிக்கப்பட்ட குடிநீர் அமைத்தல் மற்றும் சுகாதாரம்.';
    taDesc = 'தூய்மையற்ற நீரால் குழந்தைகள் நோய்களால் பாதிக்கப்படுவதைத் தடுக்க, கிராமப்புறங்களில் பாதுகாப்பான குடிநீர் சுத்திகரிப்பு அமைப்புகளை நிறுவி, சுகாதாரம் பற்றிய விழிப்புணர்வை ஏற்படுத்துகிறோம்.';
  } else if (titleLower.includes('elderly') || titleLower.includes('shelter') || catLower.includes('elder')) {
    taTitle = 'ஆதரவற்ற முதியோருக்கான பராமரிப்பு மற்றும் மருத்துவ உதவி';
    taCat = 'முதியோர் நலம்';
    taShort = 'உறவுகள் அற்ற முதியவர்களுக்கு மாதாந்திர மருத்துவ உதவி, உணவு மற்றும் அன்பான ஆதரவு.';
    taDesc = 'குடும்ப ஆதரவோ முதியோர் ஓய்வூதியமோ இல்லாத ஏழை முதியோருக்கு மாதாந்திர மருந்து மாத்திரைகள், உணவு, நடை உதவிகள் மற்றும் அன்பான அரவணைப்பைத் தருகிறோம்.';
  }

  return {
    ...cause,
    title: taTitle,
    category: taCat,
    shortDescription: taShort || cause.shortDescription,
    description: taDesc || cause.description
  };
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    try {
      return localStorage.getItem('seva_lang') || 'en';
    } catch {
      return 'en';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('seva_lang', language);
    } catch {
      // ignore in incognito or restricted settings
    }
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang) => {
    if (lang === 'en' || lang === 'ta') {
      setLanguageState(lang);
    }
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'en' ? 'ta' : 'en'));
  };

  const t = (key, fallback) => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    return fallback || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        isTamil: language === 'ta',
        isEnglish: language === 'en'
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
