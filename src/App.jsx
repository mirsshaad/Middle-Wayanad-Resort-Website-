import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
const motionComponent = motion;
const AnimatePresenceComponent = AnimatePresence;
import { 
  MapPin, Phone, Calendar, Wifi, Tv, Waves, Car, Sparkles, 
  Clock, Shield, Heart, ChevronLeft, ChevronRight, Star, 
  Users, Home, Menu, X, Coffee, Gamepad2, ArrowRight, Check, Send,
  Lock, CreditCard, QrCode, Printer, ArrowLeft, Mail, FileText, CheckCircle2
} from 'lucide-react';
import './App.css';

// Replace with your live Razorpay Key ID when launching
const RAZORPAY_KEY_ID = "rzp_test_Syig4esALQCrTJ";

// Nearby Attractions Data
const ATTRACTIONS = [
  { num: "Nº 01", name: "Banasura Sagar Dam", distance: "18 km", desc: "The largest earth dam in India, offering speed boating and panoramic views.", image: "/attractions/banasura_dam.jpg" },
  { num: "Nº 02", name: "Pookode Lake", distance: "22 km", desc: "A natural freshwater lake nestling amid evergreen forests and wooded hills.", image: "/attractions/pookode_lake.jpg" },
  { num: "Nº 03", name: "Edakkal Caves", distance: "35 km", desc: "Prehistoric rock shelters featuring Neolithic carvings dating back to 6,000 BCE.", image: "/attractions/edakkal_caves.jpg" },
  { num: "Nº 04", name: "Lakkidi View Point", distance: "28 km", desc: "Known as the gateway to Wayanad, offering breathtaking misty valley views.", image: "/attractions/lakkidi_viewpoint.jpg" },
  { num: "Nº 05", name: "Chembra Peak", distance: "32 km", desc: "The highest peak in Wayanad, famous for its heart-shaped mountain lake.", image: "/attractions/chembra_peak.jpg" }
];


// Amenities Data
const AMENITIES = [
  { icon: Waves, title: "Shared Swimming Pool", desc: "Prisine shared pool waters overlooking the green Wayanad hills." },
  { icon: Wifi, title: "Free High-Speed Wi-Fi", desc: "Stay connected with high-speed internet throughout your villa." },
  { icon: Car, title: "Private Parking Area", desc: "Secure parking facilities for multiple guest vehicles." },
  { icon: Shield, title: "Power Backup", desc: "Uninterrupted power supply to keep your stay perfectly comfortable." },
  { icon: Tv, title: "Entertainment Lounge", desc: "Cozy living room setup with Flat Screen TV and luxury sofas." },
  { icon: Sparkles, title: "Housekeeping", desc: "Daily cleaning services keeping the serviced apartments spotless." },
  { icon: Gamepad2, title: "Indoor Games Area", desc: "Table tennis, carrom, and board games for group recreation." },
  { icon: Coffee, title: "Dining Space", desc: "A spacious dining and family gathering hall inside each unit." }
];

// Guest Testimonials Data (adapted from testimonials-columns-1 component)
const resortTestimonials = [
  {
    text: "This resort revolutionized our family holidays! The 2BHK serviced apartment is incredibly spacious and clean. The views are amazing, and waking up to the valley view mist was magical.",
    image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=150&h=150&q=80",
    name: "Anjali Sharma",
    role: "Family Vacationer",
  },
  {
    text: "Implementing a peaceful weekend escape was smooth and quick here. The staff are friendly, and the indoor games lounge kept the kids happy during rainy afternoons.",
    image: "https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?auto=format&fit=crop&w=150&h=150&q=80",
    name: "Karthik Menon",
    role: "Weekend Traveler",
  },
  {
    text: "The reception and hospitality are exceptional. They guided us through local Wayanad sightseeings, arranged a pickup from the bank road, and ensured absolute satisfaction.",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=150&h=150&q=80",
    name: "Deepak Kumar",
    role: "Group Planner",
  },
  {
    text: "Its seamless location in Kambalakkad enhanced our sightseeing. We easily covered Banasura Dam and Chembra Peak. Highly recommend for families booking multiple apartments.",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&h=150&q=80",
    name: "Amit Patel",
    role: "CEO & Guest",
  },
  {
    text: "Its robust amenities and continuous power backup made remote work from the valley seamless. The Wi-Fi is surprisingly fast and reliable for a mountain stay.",
    image: "https://images.unsplash.com/photo-1601412436009-d964bd02edbc?auto=format&fit=crop&w=150&h=150&q=80",
    name: "Divya Iyer",
    role: "Remote Professional",
  },
  {
    text: "The smooth booking via WhatsApp exceeded expectations. The pricing structure is extremely transparent, and direct booking benefits saved us extra booking portal fees.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80",
    name: "Vikram Rao",
    role: "Marketing Specialist",
  },
  {
    text: "Clean, comfortable bedsheets, spacious kitchen options, and a quiet, peaceful vibe. Unmarried couple friendly with hassle-free check-in.",
    image: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?auto=format&fit=crop&w=150&h=150&q=80",
    name: "Sneha Reddy",
    role: "Couple Stay",
  },
  {
    text: "They delivered a holiday stay that exceeded all expectations. We booked all 6 of their 2BHK apartments for our extended family reunion, and it was perfect.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
    name: "Roshan Mathew",
    role: "Reunion Coordinator",
  },
  {
    text: "Using the outdoor playground while looking at the mountain range is an experience I won't forget. Excellent parking space for travelers driving from Bangalore.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
    name: "Meera Nair",
    role: "Solo Adventurer",
  }
];

const TestimonialsColumn = ({ className, testimonials, duration = 10 }) => {
  return (
    <div className={className}>
      <motionComponent.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="testimonial-scroll-wrapper"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {testimonials.map(({ text, image, name, role }, i) => (
                <div className="testimonial-editorial-card" key={i}>
                  <div className="testimonial-card-text">"{text}"</div>
                  <div className="testimonial-card-user">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="testimonial-card-avatar"
                    />
                    <div className="testimonial-card-info">
                      <div className="testimonial-card-name">{name}</div>
                      <div className="testimonial-card-role">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motionComponent.div>
    </div>
  );
};

// Signature Experiences Data
const signatureExperiences = [
  { num: "Nº 01", title: "Playground & Gardens", image: "/playground.jpg", caption: "Outdoor playground area for families.", desc: "Enjoy our secure outdoor playground surrounded by nature, featuring swings and slides for a perfect family vacation experience." },
  { num: "Nº 02", title: "Villa Comforts", image: "/bedroom_real_1.jpg", caption: "Premium master bedroom layout.", desc: "Each 2BHK is equipped with spacious bedrooms, attached bathrooms, flat-screen TVs, cozy sofas, and dining areas to make you feel right at home." },
  { num: "Nº 03", title: "Indoor Recreation", image: "/lounge_real.jpg", caption: "Common recreation and dining lounge.", desc: "Gather with family or friends in our social lounge featuring table tennis, board games, carrom, and a spacious communal dining area." }
];

// Standard Conveniences Data
const conveniences = [
  { icon: Wifi, title: "Free High-Speed Wi-Fi", desc: "High-speed internet access throughout the property." },
  { icon: Car, title: "Free Private Parking", desc: "Spacious secure parking for multiple guest vehicles." },
  { icon: Sparkles, title: "Regular Housekeeping", desc: "Professional daily cleaning services keeping things fresh." },
  { icon: Shield, title: "100% Power Backup", desc: "Uninterrupted power supply to guarantee comfortable stay." }
];

function App() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [activeAmenity, setActiveAmenity] = useState(0);
  const [activeAttraction, setActiveAttraction] = useState(0);
  const [policyView, setPolicyView] = useState(null); // null, 'accessibility', 'cookie', 'privacy', 'policies'
  const [activeSlide, setActiveSlide] = useState(1); // Default to pool slide
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const gallerySlides = [
    { id: 0, category: "ROOMS", title: "VILLA SUITES", image: "/bedroom_real_1.jpg" },
    { id: 1, category: "OUTDOOR", title: "PLAYGROUND AREA", image: "/playground.jpg" },
    { id: 2, category: "SOCIAL", title: "THE SOCIAL LOUNGE", image: "/lounge_real.jpg" },
    { id: 3, category: "WELCOME", title: "RECEPTION GATEWAY", image: "/reception.jpg" }
  ];

  const getCardProps = (index) => {
    const total = gallerySlides.length;
    let diff = index - activeSlide;
    
    if (diff < -1) {
      if (activeSlide === total - 1 && index === 0) diff = 1;
    }
    if (diff > 1) {
      if (activeSlide === 0 && index === total - 1) diff = -1;
    }
    
    const isMobile = windowWidth < 768;
    const step = isMobile ? 230 : 380;
    
    let x = diff * step;
    let scale = 1;
    let opacity = 1;
    let zIndex = 5;
    let pointerEvents = 'auto';

    if (diff === 0) {
      scale = 1.05;
      opacity = 1;
      zIndex = 5;
    } else if (diff === -1) {
      scale = isMobile ? 0.78 : 0.85;
      opacity = isMobile ? 0.35 : 0.55;
      zIndex = 3;
    } else if (diff === 1) {
      scale = isMobile ? 0.78 : 0.85;
      opacity = isMobile ? 0.35 : 0.55;
      zIndex = 3;
    } else {
      scale = 0.7;
      opacity = 0;
      zIndex = 1;
      pointerEvents = 'none';
      x = diff > 0 ? step * 1.8 : -step * 1.8;
    }
    
    return { x, scale, opacity, zIndex, pointerEvents };
  };

  // Scroll animations for video hero section
  const { scrollY } = useScroll();
  const videoScale = useTransform(scrollY, [0, 600], [1, 0.92]);
  const videoBorderRadius = useTransform(scrollY, [0, 600], ["0px", "24px"]);
  const videoOpacity = useTransform(scrollY, [0, 600], [1, 0.45]);
  const videoTranslateY = useTransform(scrollY, [0, 600], [0, 120]);

  const textOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const textTranslateY = useTransform(scrollY, [0, 400], [0, -60]);

  // Booking Form State
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [apartmentsCount, setApartmentsCount] = useState(1);
  const [guestsCount, setGuestsCount] = useState(2); // Guests per apartment
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  
  // Full-page multi-step booking states
  const [bookingView, setBookingView] = useState(false);
  const [bookingStep, setBookingStep] = useState(1); // 1 to 6
  const [apartmentType, setApartmentType] = useState('valley');
  const [guestEmail, setGuestEmail] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [bookingReference, setBookingReference] = useState('');
  const [razorpayPaymentId, setRazorpayPaymentId] = useState('');

  const getApartmentPricePerNight = (guests, type) => {
    let basePrice = 3500;
    if (type === 'poolside') basePrice = 4000;
    if (type === 'forest') basePrice = 4500;
    
    // Add extra guests charge if guests > 2 (e.g. +₹500 per guest)
    const extraGuests = Math.max(0, guests - 2);
    return basePrice + (extraGuests * 500);
  };

  // Set default check-in/out dates
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const formatDate = (date) => {
      const d = new Date(date);
      let month = '' + (d.getMonth() + 1);
      let day = '' + d.getDate();
      const year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [year, month, day].join('-');
    };

    setCheckIn(formatDate(today));
    setCheckOut(formatDate(tomorrow));
  }, []);

  // Scroll handler for navigation opacity and dark text modes
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavScrolled(true);
      } else {
        setNavScrolled(false);
      }

      // Determine active section for sidebar dots
      const sections = ['hero', 'about', 'gallery', 'amenities', 'location', 'attractions'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate pricing
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 1;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const getPricePerNightPerApartment = (guests) => {
    switch (guests) {
      case 1: return 3000;
      case 2: return 3500;
      case 3: return 4000;
      case 4: return 4500;
      case 5: return 5000;
      case 6: return 5500;
      default: return 4500;
    }
  };

  const nights = calculateNights();
  const pricePerNightPerApartment = getPricePerNightPerApartment(guestsCount);
  const totalSubtotal = pricePerNightPerApartment * apartmentsCount * nights;
  const grandTotal = totalSubtotal;

  const handleWhatsAppBooking = (e) => {
    if (e) e.preventDefault();
    if (!guestName || !guestPhone) {
      alert("Please fill in your Name and Phone Number.");
      return;
    }

    const message = `Hi Middle Wayanad Holyday Inn! I'd like to book a stay:
----------------------------
👤 Name: ${guestName}
📞 Phone: ${guestPhone}
📅 Check-in: ${checkIn}
📅 Check-out: ${checkOut}
🌙 Nights: ${nights}
🏢 Apartments: ${apartmentsCount} (2BHK)
👥 Guests/Apt: ${guestsCount} Guests
💰 Total Est. Rent: ₹${grandTotal}
----------------------------
Please confirm availability for my booking.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/918157916319?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleDirectReservation = (e) => {
    e.preventDefault();
    if (!guestName || !guestPhone) {
      alert("Please fill in your Name and Phone Number.");
      return;
    }
    
    setBookingSuccess(true);

    import('canvas-confetti').then((confetti) => {
      confetti.default({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
    }).catch(() => {});
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(id);
  };

  // Check if header needs light text (when on hero section which has a dark background overlay)
  const isDarkHeaderBg = activeSection === 'hero';

  return (
    <>

      {!policyView && !bookingView && (
        <div className="right-indicator">
          {['hero', 'about', 'gallery', 'amenities', 'location', 'attractions'].map((sec) => (
            <button 
              key={sec}
              onClick={() => scrollToSection(sec)}
              className={`indicator-dot ${activeSection === sec ? 'active' : ''}`}
              aria-label={`Scroll to ${sec}`}
              style={{ border: 'none', padding: 0, cursor: 'pointer' }}
            />
          ))}
        </div>
      )}

      {/* 1. Luxury Navbar */}
      <header className={`editorial-header ${navScrolled || policyView || bookingView ? 'scrolled' : ''} ${(isDarkHeaderBg && !policyView && !bookingView) ? 'dark-mode-header' : ''}`}>
        <button className="header-nav-link menu-btn" onClick={() => { setPolicyView(null); setBookingView(false); if (!bookingView) { setTimeout(() => scrollToSection('about'), 100); } else { window.scrollTo(0,0); } }}>
          {bookingView || policyView ? '← Back' : 'Menu'}
        </button>
 
        <a href="#" className="header-title-center" onClick={(e) => { e.preventDefault(); setPolicyView(null); setBookingView(false); window.scrollTo(0,0); }}>
          middle wayanad holyday inn
        </a>
 
        <div className="header-right-links">
          <a href="https://wa.me/918157916319" target="_blank" rel="noopener noreferrer" className="header-nav-link">
            Request
          </a>
          {!bookingView && (
            <button className="header-nav-link book-btn" onClick={() => { setBookingView(true); setPolicyView(null); setBookingStep(1); window.scrollTo(0,0); }}>
              Book
            </button>
          )}
        </div>
      </header>

      {policyView ? (
        <PolicyPage type={policyView} setPolicyView={setPolicyView} />
      ) : bookingView ? (
        <BookingApplication 
          setBookingView={setBookingView}
          checkIn={checkIn} setCheckIn={setCheckIn}
          checkOut={checkOut} setCheckOut={setCheckOut}
          apartmentsCount={apartmentsCount} setApartmentsCount={setApartmentsCount}
          guestsCount={guestsCount} setGuestsCount={setGuestsCount}
          guestName={guestName} setGuestName={setGuestName}
          guestPhone={guestPhone} setGuestPhone={setGuestPhone}
          apartmentType={apartmentType} setApartmentType={setApartmentType}
          bookingStep={bookingStep} setBookingStep={setBookingStep}
          guestEmail={guestEmail} setGuestEmail={setGuestEmail}
          specialRequests={specialRequests} setSpecialRequests={setSpecialRequests}
          paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod}
          upiId={upiId} setUpiId={setUpiId}
          cardName={cardName} setCardName={setCardName}
          cardNumber={cardNumber} setCardNumber={setCardNumber}
          cardExpiry={cardExpiry} setCardExpiry={setCardExpiry}
          cardCvv={cardCvv} setCardCvv={setCardCvv}
          bookingReference={bookingReference} setBookingReference={setBookingReference}
          razorpayPaymentId={razorpayPaymentId} setRazorpayPaymentId={setRazorpayPaymentId}
          calculateNights={calculateNights}
          getApartmentPricePerNight={getApartmentPricePerNight}
        />
      ) : (
        <>
          {/* 2. Sky Hero Section with Image Background and Scroll Animation */}
          <section className="hero-sky-section" id="hero">
        <motionComponent.div 
          style={{ 
            scale: videoScale,
            borderRadius: videoBorderRadius,
            opacity: videoOpacity,
            y: videoTranslateY
          }}
          className="hero-video-bg-container"
        >
          <img 
            src="/wayanad_bg.png" 
            alt="Wayanad Mountains" 
            className="hero-bg-image"
          />
          <div className="hero-video-overlay" />
        </motionComponent.div>

        <motionComponent.div 
          style={{ 
            opacity: textOpacity,
            y: textTranslateY
          }}
          className="hero-content-wrapper"
        >
          <h1 className="hero-slogan-title">
            Experience Serenity in the Heart of Wayanad
          </h1>
        </motionComponent.div>

        <a 
          href="#about" 
          className="hero-scroll-indicator"
          onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
        >
          <span className="scroll-text">Scroll</span>
          <span className="scroll-arrow">∨</span>
        </a>
      </section>

      {/* 3. Stats Section (Matching AYANA second screenshot - dark backdrop) */}
      <section className="stats-dark-section" id="about">
        <div className="editorial-container">
          <div className="stats-grid-row">
            <div className="stats-column">
              <span className="stats-number">Nº 01</span>
              <span className="stats-label">Six Distinctive</span>
              <h3 className="stats-title">2BHK Villas</h3>
            </div>
            
            <div className="stats-column">
              <span className="stats-number">Nº 02</span>
              <span className="stats-label">Relaxation Begins Instantly</span>
              <h3 className="stats-title">Swimming Pool</h3>
            </div>

            <div className="stats-column">
              <span className="stats-number">Nº 03</span>
              <span className="stats-label">Nature at your doorstep</span>
              <h3 className="stats-title">Valley Balconies</h3>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Panoramic Banner Images */}
      <div className="panoramic-media-row">
        <div className="panoramic-image-container">
          <img src="/playground.jpg" alt="Outdoor Playground Area" className="panoramic-img" />
        </div>
        <div className="panoramic-image-container">
          <img src="/reception.jpg" alt="Resort Reception Entrance" className="panoramic-img" />
        </div>
      </div>

      {/* 5. Asymmetrical Content Grids (Matching AYANA third & fourth screenshots) */}
      <section className="editorial-grid-section">
        <div className="editorial-container">
          
          {/* Block 1 */}
          <div className="asymmetric-row">
            <motionComponent.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="editorial-img-block"
            >
              <div className="editorial-img-wrapper">
                <img src="/bedroom_real_1.jpg" alt="2BHK Master Bedroom" className="editorial-photo" />
              </div>
              <div className="editorial-img-caption">
                <span className="caption-italic-serif">Enjoy the morning breeze while looking at the valley.</span>
                <span className="caption-sub-tag">2BHK Master Bedroom</span>
              </div>
            </motionComponent.div>

            <motionComponent.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="editorial-text-block"
            >
              <span className="caption-sub-tag" style={{ marginBottom: '1rem' }}>Accommodations</span>
              <h3>Premium Family Suites</h3>
              <p>
                Each spacious serviced apartment features two large bedrooms, two attached bathrooms, a bright living room lounge, and a dedicated dining area. Perfectly furnished to offer the comforts of home inside a forest resort setting. Suitable for up to 6 guests per unit.
              </p>
              <button className="btn-reserve-header" onClick={() => { setBookingView(true); setBookingStep(1); window.scrollTo(0,0); }}>Explore Layouts</button>
            </motionComponent.div>
          </div>

          {/* Block 2 (Reversed) */}
          <div className="asymmetric-row reversed">
            <motionComponent.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="editorial-text-block"
            >
              <span className="caption-sub-tag" style={{ marginBottom: '1rem' }}>Recreation</span>
              <h3>Recreation & Gathering Lounge</h3>
              <p>
                Our common lounge serves as a cozy social hub. Unwind with family or friends in the indoor games zone featuring table tennis, carrom, and board games, or dine together in the spacious shared dining area.
              </p>
              <button className="btn-reserve-header" onClick={() => { setBookingView(true); setBookingStep(1); window.scrollTo(0,0); }}>Book Villa</button>
            </motionComponent.div>

            <motionComponent.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="editorial-img-block"
            >
              <div className="editorial-img-wrapper">
                <img src="/lounge_real.jpg" alt="Common Dining & Games Lounge" className="editorial-photo" />
              </div>
              <div className="editorial-img-caption">
                <span className="caption-italic-serif">A soothing vintage recreation atmosphere.</span>
                <span className="caption-sub-tag">Common Dining & Games Area</span>
              </div>
            </motionComponent.div>
          </div>

          {/* Block 3 */}
          <div className="asymmetric-row">
            <motionComponent.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="editorial-img-block"
            >
              <div className="editorial-img-wrapper" style={{ aspectRatio: '16/10' }}>
                <img src="/playground.jpg" alt="Outdoor Playground Area" className="editorial-photo" />
              </div>
              <div className="editorial-img-caption">
                <span className="caption-italic-serif">Relax and play amidst fresh mountain air and greenery.</span>
                <span className="caption-sub-tag">Outdoor Playground & Gardens</span>
              </div>
            </motionComponent.div>

            <motionComponent.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="editorial-text-block"
            >
              <span className="caption-sub-tag" style={{ marginBottom: '1rem' }}>Outdoors</span>
              <h3>Playground & Gardens</h3>
              <p>
                Enjoy our scenic outdoor playground and garden space. Nestled in absolute greenery, it offers a perfect environment for children to play on the swings and slides, and for families to relax in the fresh, misty mountain air of the Wayanad hills.
              </p>
            </motionComponent.div>
          </div>

        </div>
      </section>

      {/* 6. Apartments Gallery Slider Section (Horizontal) */}
      <section className="apt-editorial-section" id="gallery">
        <div className="editorial-container">
          <span className="caption-sub-tag" style={{ marginBottom: '1.5rem' }}>Brochure Gallery</span>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>Explore the Spaces</h2>
          
          <div className="luxury-carousel-container">
            <motionComponent.div 
              className="luxury-carousel-track"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, info) => {
                const threshold = 50;
                if (info.offset.x < -threshold) {
                  setActiveSlide(prev => (prev + 1) % gallerySlides.length);
                } else if (info.offset.x > threshold) {
                  setActiveSlide(prev => (prev - 1 + gallerySlides.length) % gallerySlides.length);
                }
              }}
              style={{ cursor: 'grab' }}
              whileTap={{ cursor: 'grabbing' }}
            >
              {gallerySlides.map((slide, i) => {
                const { x, scale, opacity, zIndex, pointerEvents } = getCardProps(i);
                
                return (
                  <motionComponent.div
                    key={slide.id}
                    className="carousel-card-wrapper"
                    style={{
                      position: 'absolute',
                      zIndex: zIndex,
                      pointerEvents: pointerEvents,
                      width: '380px',
                      maxWidth: '85vw'
                    }}
                    animate={{
                      x: x,
                      scale: scale,
                      opacity: opacity
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 26
                    }}
                    onClick={() => setActiveSlide(i)}
                  >
                    <div className="editorial-gallery-card-new">
                      <img src={slide.image} className="editorial-gallery-card-img-new" alt={slide.title} draggable="false" />
                      <div className="editorial-gallery-details-new">
                        <span className="editorial-gallery-num-new">0{i+1} / {slide.category}</span>
                        <h4 className="editorial-gallery-title-new">{slide.title}</h4>
                      </div>
                    </div>
                  </motionComponent.div>
                );
              })}
            </motionComponent.div>
          </div>
        </div>
      </section>

      {/* 7. Redesigned Premium Amenities Showcase */}
      <section id="amenities" style={{ padding: '8rem 0', background: 'var(--bg-linen)', borderTop: '1px solid rgba(191,163,126,0.15)' }}>
        <div className="editorial-container">
          <div className="section-header" style={{ textAlign: 'left', maxWidth: '100%', marginBottom: '4rem', margin: 0 }}>
            <span className="caption-sub-tag">VILLA FEATURES</span>
            <h2 style={{ fontSize: '2.75rem' }}>Designed for Tranquil Comfort</h2>
            <div className="divider" style={{ margin: '1.5rem 0 0 0' }}></div>
          </div>

          {/* Interactive Split View */}
          <div className="amenities-split-container">
            {/* Left Image Viewport */}
            <div className="amenity-image-viewport">
              <AnimatePresenceComponent mode="wait">
                <motionComponent.img 
                  key={activeAmenity}
                  src={signatureExperiences[activeAmenity].image}
                  alt={signatureExperiences[activeAmenity].title}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  className="amenity-viewport-img"
                />
              </AnimatePresenceComponent>
              <div className="amenity-image-caption-box">
                <span className="caption-italic-serif" style={{ color: '#FFFFFF' }}>
                  {signatureExperiences[activeAmenity].caption}
                </span>
                <span className="caption-sub-tag" style={{ color: 'var(--accent-gold)' }}>
                  Signature Experience
                </span>
              </div>
            </div>

            {/* Right Interactive List */}
            <div className="amenity-list-column">
              {signatureExperiences.map((exp, i) => (
                <div 
                  key={i}
                  className={`amenity-interactive-item ${activeAmenity === i ? 'active' : ''}`}
                  onClick={() => setActiveAmenity(i)}
                >
                  <span className="amenity-item-number">{exp.num}</span>
                  <div className="amenity-item-content">
                    <h3 className="amenity-item-title">
                      {exp.title}
                    </h3>
                    <p className="amenity-item-desc">
                      {exp.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Secondary Convenience Conveniences Grid */}
          <div style={{ marginTop: '6rem' }}>
            <h4 className="secondary-amenities-title">Standard Conveniences</h4>
            <div className="secondary-amenities-grid">
              {conveniences.map((item, i) => {
                const IconComponent = item.icon;
                return (
                  <div key={i} className="secondary-amenity-col">
                    <div className="secondary-amenity-header">
                      <IconComponent className="secondary-amenity-icon" size={20} />
                      <h4>{item.title}</h4>
                    </div>
                    <p>{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* Location Map Section */}
      <section id="location" className="location-map-section">
        <div className="editorial-container">
          <div className="location-grid">
            <div className="location-info-column">
              <span className="caption-sub-tag">THE INN LOCATION</span>
              <h2 className="location-section-title">Nestled in the Heart of Muttil North</h2>
              <div className="divider" style={{ margin: '1.5rem 0 2rem 0' }}></div>
              
              <div className="location-details-box">
                <div className="location-detail-item">
                  <h4 className="location-detail-label">Address</h4>
                  <p className="location-detail-value">
                    Kerala Bank Road, Muttil North,<br />
                    Wayanad, Kerala - 673121
                  </p>
                </div>

                <div className="location-detail-item">
                  <h4 className="location-detail-label">Accessibility</h4>
                  <p className="location-detail-value">
                    Conveniently located near Muttil town, our property offers quick connectivity to major transit hubs and scenic points.
                  </p>
                  <ul className="transit-list">
                    <li><strong>Kozhikode Railway Station (CLT):</strong> <span>~78 km (2 hrs drive)</span></li>
                    <li><strong>Calicut International Airport (CCJ):</strong> <span>~85 km (2.5 hrs drive)</span></li>
                    <li><strong>Kannur International Airport (CNN):</strong> <span>~90 km (2.5 hrs drive)</span></li>
                  </ul>
                </div>

                <div className="location-detail-item">
                  <h4 className="location-detail-label">Strategic Base</h4>
                  <p className="location-detail-value">
                    Perfect central launchpad to explore both North and South Wayanad's top attractions, like Chembra Peak, Banasura Sagar Dam, and Pookode Lake.
                  </p>
                </div>
              </div>

              <a 
                href="https://maps.app.goo.gl/xhHM5uCospmNkPti6" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-reserve-header location-maps-btn"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '2.5rem', width: 'fit-content', textDecoration: 'none' }}
              >
                <MapPin size={16} /> Open in Google Maps
              </a>
            </div>

            <div className="location-map-column">
              <div className="map-iframe-container">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3907.268064389987!2d76.0709064!3d11.6754047!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba675cfb7d27a7f%3A0x2a9fd9d2be38e3b0!2sMiddle%20Wayanad%20Holyday%20Inn!5e0!3m2!1sen!2sin!4v1717770000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Middle Wayanad Holyday Inn Map Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Attractions List ( AYANA Style interactive hover reveal ) */}
      <section id="attractions" className="attractions-section">
        <div className="editorial-container">
          <div className="section-header-left">
            <span className="caption-sub-tag">LOCATION SIGHTSEEING</span>
            <h2>Nearby Attractions</h2>
            <div className="divider"></div>
          </div>

          <div className="attractions-split-container">
            {/* Left Interactive List */}
            <div className="attractions-list-column">
              {ATTRACTIONS.map((attraction, i) => (
                <div 
                  key={i} 
                  className={`attraction-interactive-row ${activeAttraction === i ? 'active' : ''}`}
                  onMouseEnter={() => setActiveAttraction(i)}
                  onClick={() => setActiveAttraction(i)}
                >
                  <div className="attraction-row-header">
                    <span className="attraction-num">{attraction.num}</span>
                    <h3 className="attraction-name">{attraction.name}</h3>
                    <span className="attraction-distance">{attraction.distance}</span>
                  </div>
                  <div className="attraction-row-body">
                    <p>{attraction.desc}</p>
                    {/* Mobile-only inline image wrapper */}
                    <div className="attraction-mobile-image-wrapper">
                      <img 
                        src={attraction.image} 
                        alt={attraction.name} 
                        className="attraction-mobile-img"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Photo Frame Viewport */}
            <div className="attraction-image-viewport">
              <AnimatePresenceComponent mode="wait">
                <motionComponent.div 
                  key={activeAttraction}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  className="attraction-viewport-inner"
                >
                  <img 
                    src={ATTRACTIONS[activeAttraction].image} 
                    alt={ATTRACTIONS[activeAttraction].name}
                    className="attraction-viewport-img"
                  />
                  <div className="attraction-image-overlay">
                    <span className="attraction-overlay-name">{ATTRACTIONS[activeAttraction].name}</span>
                    <span className="attraction-overlay-dist">{ATTRACTIONS[activeAttraction].distance} away</span>
                  </div>
                </motionComponent.div>
              </AnimatePresenceComponent>
            </div>
          </div>
        </div>
      </section>

      {/* Guest Reviews (adapted from testimonials-columns-1 component) */}
      <section className="testimonials-carousel-section" id="testimonials">
        <div className="editorial-container">
          <div className="section-header" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 3rem', marginLeft: 'auto', marginRight: 'auto' }}>
            <span className="caption-sub-tag">GUEST EXPERIENCES</span>
            <h2 style={{ fontSize: '2.75rem', marginTop: '0.5rem' }}>What Our Users Say</h2>
            <p style={{ color: 'var(--text-muted)' }}>See what our customers have to say about us.</p>
            <div className="divider" style={{ margin: '1.5rem auto 0' }}></div>
          </div>

          <div className="testimonials-carousel-container">
            <TestimonialsColumn testimonials={resortTestimonials.slice(0, 3)} className="testimonial-scroll-col" duration={15} />
            <TestimonialsColumn testimonials={resortTestimonials.slice(3, 6)} className="testimonial-scroll-col col-md-only" duration={19} />
            <TestimonialsColumn testimonials={resortTestimonials.slice(6, 9)} className="testimonial-scroll-col col-lg-only" duration={17} />
          </div>
        </div>
      </section>
        </>
      )}

      {/* 10. Redesigned Luxury 4-Column Footer (Rosewood Aesthetic) */}
      <section className="animated-footer-section" id="contact">
        <footer className="animated-footer">
          <div className="animated-footer-container">
            <div className="footer-columns-grid">
              
              {/* Column 1: Contact Us */}
              <div className="footer-column">
                <h4 className="footer-column-title">Contact Us</h4>
                <div className="footer-column-content">
                  <p className="footer-contact-item serif-item">
                    Room Reservations: <a href="tel:+918157916319">+91 81579 16319</a>
                  </p>
                  <p className="footer-contact-item serif-item">
                    General Enquiries: <a href="tel:+918157916319">+91 81579 16319</a>
                  </p>
                  <a href="https://wa.me/918157916319" target="_blank" rel="noopener noreferrer" className="footer-link-serif">
                    WhatsApp Front Desk ↗
                  </a>
                  <a href="mailto:middlewayanad@gmail.com" className="footer-link-serif">
                    middlewayanad@gmail.com
                  </a>
                </div>
              </div>

              {/* Column 2: World of Middle Wayanad */}
              <div className="footer-column">
                <h4 className="footer-column-title">World of Middle Wayanad</h4>
                <div className="footer-column-content">
                  <a href="#about" className="footer-link-serif" onClick={(e) => { e.preventDefault(); setPolicyView(null); setTimeout(() => scrollToSection('about'), 100); }}>About Us</a>
                  <a href="#amenities" className="footer-link-serif" onClick={(e) => { e.preventDefault(); setPolicyView(null); setTimeout(() => scrollToSection('amenities'), 100); }}>Resort Experiences</a>
                  <a href="#gallery" className="footer-link-serif" onClick={(e) => { e.preventDefault(); setPolicyView(null); setTimeout(() => scrollToSection('gallery'), 100); }}>Villas & Suites</a>
                  <a href="https://wa.me/918157916319" target="_blank" rel="noopener noreferrer" className="footer-link-serif">Careers ↗</a>
                  <a href="#gallery" className="footer-link-serif" onClick={(e) => { e.preventDefault(); setPolicyView(null); setTimeout(() => scrollToSection('gallery'), 100); }}>Media</a>
                </div>
              </div>

              {/* Column 3: Follow Us */}
              <div className="footer-column">
                <h4 className="footer-column-title">Follow Us</h4>
                <div className="footer-column-content">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-link-serif">Facebook ↗</a>
                  <a href="https://www.instagram.com/innmiddlewayand?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="footer-link-serif">Instagram ↗</a>
                  <a href="https://wa.me/918157916319" target="_blank" rel="noopener noreferrer" className="footer-link-serif">WhatsApp ↗</a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="footer-link-serif">YouTube</a>
                </div>
              </div>

              {/* Column 4: Terms */}
              <div className="footer-column">
                <h4 className="footer-column-title">Terms</h4>
                <div className="footer-column-content">
                  <a href="#accessibility" className="footer-link-serif" onClick={(e) => { e.preventDefault(); setPolicyView('accessibility'); window.scrollTo(0,0); }}>Accessibility Statement</a>
                  <a href="#cookie" className="footer-link-serif" onClick={(e) => { e.preventDefault(); setPolicyView('cookie'); window.scrollTo(0,0); }}>Cookie Policy</a>
                  <a href="#privacy" className="footer-link-serif" onClick={(e) => { e.preventDefault(); setPolicyView('privacy'); window.scrollTo(0,0); }}>Privacy Policy</a>
                  <a href="#policies" className="footer-link-serif" onClick={(e) => { e.preventDefault(); setPolicyView('policies'); window.scrollTo(0,0); }}>Guest Terms & Conditions</a>
                </div>
              </div>

            </div>

            {/* Bottom Row */}
            <div className="footer-bottom-row-new">
              {/* Left licenses */}
              <div className="footer-licenses">
                <div className="footer-license-text">ICP LICENSE 17035714</div>
                <div className="footer-license-text">GONGAN BEIAN: 31010102004896</div>
              </div>

              {/* Center Monogram (Calligraphic cursive "MW" shape) */}
              <div className="footer-monogram-container">
                <svg viewBox="0 0 100 100" className="footer-monogram-svg" fill="none" stroke="currentColor">
                  <path d="M 28,70 C 26,60 28,35 32,20 C 36,5 42,10 45,23 C 48,33 50,60 52,70" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M 52,70 C 54,58 57,30 62,20 C 66,10 72,13 74,23 L 78,70" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M 40,78 C 38,68 44,45 52,45 C 60,45 63,65 66,78" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M 66,78 C 68,66 73,40 80,40 C 87,40 90,58 92,78" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M 18,50 C 22,50 26,60 26,70" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M 78,70 C 82,73 88,75 92,67 C 95,60 88,53 82,55" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Right copyright */}
              <div className="footer-copyright-text">
                MIDDLE WAYANAD HOLYDAY INN &copy; {new Date().getFullYear()}
              </div>
            </div>
          </div>
        </footer>
      </section>

      {/* Booking Drawer and Modal replaced with full-page multi-step BookingApplication component */}
    </>
  );
}

function PolicyPage({ type, setPolicyView }) {
  const getPolicyContent = () => {
    switch (type) {
      case 'accessibility':
        return {
          title: "Accessibility Statement",
          subtitle: "Our commitment to welcoming all guests",
          content: (
            <>
              <p>Middle Wayanad Holyday Inn is committed to facilitating accessibility and usability of its website and physical property for all people, including those with disabilities. We aim to ensure that our hospitality services, facilities, and digital platforms are inclusive, welcoming, and easy to use.</p>
              <h3>Physical Property Accessibility</h3>
              <p>Our guest villas and shared areas are designed with physical accessibility in mind to welcome all travelers:</p>
              <ul>
                <li>Spacious 2BHK room configurations with wide door openings and clear pathways.</li>
                <li>Ground-level access to the central dining space, indoor games room, and gathering lounge.</li>
                <li>Ramp access to the shared swimming pool area and outdoor sun decks.</li>
                <li>Dedicated guest parking area with flat concrete surfaces and close proximity to villa entrances.</li>
              </ul>
              <h3>Website & Digital Accessibility</h3>
              <p>We work to maintain compliance with web accessibility standards to ensure that our online booking engine and website content are navigable for assistive technologies. If you encounter any barriers or have difficulty accessing any feature on this website, please contact our front desk, and we will work to provide you with the information, item, or transaction you seek through alternative communication methods.</p>
            </>
          )
        };
      case 'cookie':
        return {
          title: "Cookie Policy",
          subtitle: "Clear disclosure regarding cookies and storage",
          content: (
            <>
              <p>This Cookie Policy explains how Middle Wayanad Holyday Inn uses cookies and similar technologies on our website. We believe in keeping your browsing experience transparent, secure, and private.</p>
              <h3>What are Cookies?</h3>
              <p>Cookies are small text files placed on your browser or device when you visit websites. They help remember selections, keep sessions active, and ensure technical performance.</p>
              <h3>How We Use Cookies</h3>
              <p>We only use essential technical cookies to ensure the website functions correctly:</p>
              <ul>
                <li><strong>Booking Session Cookies:</strong> To remember your selected check-in and check-out dates, guest numbers, and apartment counts while navigating our booking drawer.</li>
                <li><strong>Preference Storage:</strong> To save basic preferences like dismissing popups or modals.</li>
              </ul>
              <p>We do not use any third-party tracking, profiling, or advertising cookies. Your browsing privacy is fully respected.</p>
            </>
          )
        };
      case 'privacy':
        return {
          title: "Privacy Policy",
          subtitle: "Middle Wayanad Holyday Inn Privacy Commitment",
          content: (
            <>
              <p>Middle Wayanad Holyday Inn ("Middle Wayanad", "we", "our", or "us") is committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, process, store, disclose, and safeguard your personal information when you visit our website, communicate with us, make a reservation, stay at our resort, or otherwise use any of our services.</p>
              <p>This Privacy Policy applies to all personal information collected through our website, booking systems, email communications, WhatsApp communications, social media channels, telephone reservations, and any offline interactions that occur at our property. By accessing our website or using our services, you acknowledge that you have read and understood this Privacy Policy and consent to the collection and processing of your personal information as described herein.</p>
              <p>Middle Wayanad Holyday Inn recognizes the importance of maintaining the confidentiality, integrity, and security of personal information entrusted to us by our guests, visitors, partners, and business associates. We are committed to complying with applicable privacy and data protection laws and implementing appropriate safeguards to protect your information.</p>
              
              <h3>1. Information We Collect</h3>
              <p>When you make a reservation, contact us, subscribe to our newsletters, use our website, visit our property, or otherwise interact with us, we may collect personal information that identifies or relates to you. Such information may include your full name, residential address, email address, telephone number, nationality, identification document details, payment information, reservation details, guest preferences, emergency contact information, and any other information that you voluntarily provide to us.</p>
              <p>In the course of providing our hospitality services, we may also collect information regarding your stay, including room preferences, special accommodation requests, dietary requirements, transportation arrangements, recreational activity bookings, and other preferences that help us personalize your experience at Middle Wayanad Holyday Inn.</p>
              <p>Additionally, when you visit our website, certain technical information may be collected automatically through cookies and similar technologies. Such information may include your IP address, browser type, operating system, device information, pages visited, referring websites, and browsing patterns. This information assists us in improving our website functionality, enhancing user experience, and maintaining website security.</p>
              
              <h3>2. How We Collect Your Information</h3>
              <p>We collect personal information directly from you whenever you make a reservation, submit an inquiry, complete a contact form, subscribe to our marketing communications, communicate with us via email or telephone, engage with us through social media platforms, or provide information during check-in and check-out procedures at our resort.</p>
              <p>Information may also be collected through third-party booking platforms, travel agencies, payment service providers, marketing partners, and other authorized sources that assist us in delivering our hospitality services. In certain circumstances, we may receive information about you from individuals traveling with you or making reservations on your behalf, provided that such individuals have the authority to share your information with us.</p>
              
              <h3>3. How We Use Your Information</h3>
              <p>We process your personal information for the purpose of fulfilling reservation requests, providing accommodation and hospitality services, processing payments, communicating with you regarding your stay, responding to inquiries, handling customer support requests, and ensuring the safety and security of our guests and property.</p>
              <p>We may also use your information to personalize your guest experience, improve our services, conduct internal business analysis, administer promotions and special offers, comply with legal obligations, prevent fraudulent activities, and protect our legitimate business interests.</p>
              <p>Where permitted by applicable law and subject to your preferences, we may use your contact information to provide updates regarding resort offers, seasonal promotions, special events, travel packages, and other marketing communications that we believe may be of interest to you. You may opt out of receiving such communications at any time by following the unsubscribe instructions contained in our messages or by contacting us directly.</p>
            </>
          )
        };
      case 'policies':
      default:
        return {
          title: "Guest Terms & Conditions",
          subtitle: "Resort rules and guest guidelines for a comfortable stay",
          content: (
            <>
              <p>To ensure a peaceful and premium experience for all guests, Middle Wayanad Holyday Inn maintains the following resort policies and guidelines. Please review these terms prior to confirming your reservation.</p>
              
              <h3>Standard Check-in and Check-out Hours</h3>
              <ul>
                <li><strong>Check-in Time:</strong> 02:00 PM</li>
                <li><strong>Check-out Time:</strong> 11:00 AM</li>
                <li>Early check-in and late check-out requests are subject to vacancy. Please contact our reception in advance to coordinate your travel timings.</li>
              </ul>

              <h3>Guest Requirements & ID Verifications</h3>
              <ul>
                <li><strong>Couples Allowed:</strong> Unmarried couples are fully welcome. Local government-issued IDs are accepted for check-in.</li>
                <li><strong>Minimum Age:</strong> The primary guest registering and booking the apartments must be at least 18 years of age.</li>
                <li><strong>Identification:</strong> Every guest must present a valid government-issued ID card (Aadhaar, Passport, or Driving License) during check-in.</li>
              </ul>

              <h3>Resort Rules & Guidelines</h3>
              <ul>
                <li><strong>Pets Policy:</strong> Pets are strictly not allowed inside the serviced apartments to maintain cleanliness and general comfort.</li>
                <li><strong>Occupancy Limits:</strong> The standard occupancy per 2BHK unit is up to 6 guests. Extra guest requests must be coordinated and approved during booking.</li>
                <li><strong>Smoking & Noise:</strong> Smoking is prohibited inside the bedrooms. Guests are requested to maintain a peaceful environment and keep noise levels low in the common areas, especially after 10:00 PM.</li>
              </ul>
            </>
          )
        };
    }
  };

  const policy = getPolicyContent();

  return (
    <div className="policy-page-layout">
      <div className="policy-page-container">
        <div className="policy-page-header">
          <span className="caption-sub-tag">LEGAL & POLICIES</span>
          <h1>{policy.title}</h1>
          <p className="policy-subtitle">{policy.subtitle}</p>
          <div className="divider"></div>
        </div>
        
        <div className="policy-page-body">
          {policy.content}
        </div>

        <div className="policy-page-actions">
          <button className="btn-reserve-header" onClick={() => { setPolicyView(null); window.scrollTo(0,0); }}>
            Back to Home Page
          </button>
        </div>
      </div>
    </div>
  );
}

// Booking Application Component
function BookingApplication({ 
  setBookingView,
  checkIn, setCheckIn,
  checkOut, setCheckOut,
  apartmentsCount, setApartmentsCount,
  guestsCount, setGuestsCount,
  guestName, setGuestName,
  guestPhone, setGuestPhone,
  apartmentType, setApartmentType,
  bookingStep, setBookingStep,
  guestEmail, setGuestEmail,
  specialRequests, setSpecialRequests,
  paymentMethod, setPaymentMethod,
  upiId, setUpiId,
  cardName, setCardName,
  cardNumber, setCardNumber,
  cardExpiry, setCardExpiry,
  cardCvv, setCardCvv,
  bookingReference, setBookingReference,
  razorpayPaymentId, setRazorpayPaymentId,
  calculateNights,
  getApartmentPricePerNight
}) {
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [dateError, setDateError] = useState("");

  const nights = calculateNights();
  const pricePerNight = getApartmentPricePerNight(guestsCount, apartmentType);
  const subtotal = pricePerNight * apartmentsCount * nights;
  const tax = subtotal * 0.05; // 5% GST
  const serviceFee = 150 * apartmentsCount * nights;
  const grandTotal = subtotal + tax + serviceFee;

  const handleCheckAvailability = (e) => {
    e.preventDefault();
    if (!checkIn || !checkOut) return;
    
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    if (end <= start) {
      setDateError("Checkout date must be after check-in date.");
      return;
    }
    setDateError("");
    setCheckingAvailability(true);
    setTimeout(() => {
      setCheckingAvailability(false);
      setBookingStep(2);
    }, 1200);
  };

  const handleGuestInfoSubmit = (e) => {
    e.preventDefault();
    if (!guestName || !guestPhone || !guestEmail) {
      alert("Please fill in Name, Phone/WhatsApp, and Email.");
      return;
    }
    setBookingStep(4);
  };

  const sendWhatsAppConfirmation = (refCode, paymentId) => {
    const roomName = apartmentType === 'valley' 
      ? '2BHK Premium Valley View Suite' 
      : apartmentType === 'poolside' 
        ? '2BHK Poolside Serviced Apartment' 
        : '2BHK Royal Forest Retreat Villa';

    const message = `✅ *BOOKING CONFIRMED - MIDDLE WAYANAD*
----------------------------
📌 *Reference Code:* ${refCode}
💳 *Payment ID:* ${paymentId || 'N/A'}
👤 *Guest Name:* ${guestName}
📞 *Contact:* ${guestPhone}
📧 *Email:* ${guestEmail}
📅 *Check-in:* ${checkIn} (02:00 PM)
📅 *Check-out:* ${checkOut} (11:00 AM)
🌙 *Nights:* ${nights}
🏢 *Apartments:* ${apartmentsCount} × 2BHK Unit(s)
🏘️ *Villa Style:* ${roomName}
👥 *Guests/Unit:* ${guestsCount} Guests
💰 *Grand Total Paid:* ₹${grandTotal.toLocaleString()}
----------------------------
This is my confirmed payment receipt. Please prepare my reservation.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/918157916319?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleRazorpayPayment = () => {
    setProcessingPayment(true);
    
    const options = {
      key: RAZORPAY_KEY_ID,
      amount: Math.round(grandTotal * 100), // Amount in paise
      currency: "INR",
      name: "Middle Wayanad Holyday Inn",
      description: `${apartmentsCount}x 2BHK - ${nights} Nights Stay`,
      image: "/logo_transparent_1780827990357.png",
      prefill: {
        name: guestName,
        email: guestEmail,
        contact: guestPhone,
        method: paymentMethod // 'upi' or 'card'
      },
      notes: {
        check_in: checkIn,
        check_out: checkOut,
        guests: guestsCount,
        apartment_type: apartmentType
      },
      theme: {
        color: "#222222"
      },
      handler: function (response) {
        const paymentId = response.razorpay_payment_id;
        const ref = "MW-" + new Date().getFullYear() + "-" + Math.floor(1000 + Math.random() * 9000);
        setBookingReference(ref);
        setRazorpayPaymentId(paymentId);
        setProcessingPayment(false);
        setBookingStep(6);
        
        // Trigger confetti
        import('canvas-confetti').then((confetti) => {
          confetti.default({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 }
          });
        }).catch(() => {});

        // Automatically forward to WhatsApp
        sendWhatsAppConfirmation(ref, paymentId);
      },
      modal: {
        ondismiss: function () {
          setProcessingPayment(false);
        }
      }
    };

    if (window.Razorpay) {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      alert("Razorpay payment gateway failed to load. Please check your internet connection.");
      setProcessingPayment(false);
    }
  };

  const handlePaymentSubmit = (e) => {
    if (e) e.preventDefault();
    handleRazorpayPayment();
  };

  const handleWhatsAppBooking = () => {
    const message = `Hi Middle Wayanad Holyday Inn! I'd like to book a stay:
----------------------------
👤 Name: ${guestName}
📞 Phone: ${guestPhone}
📧 Email: ${guestEmail}
📅 Check-in: ${checkIn}
📅 Check-out: ${checkOut}
🌙 Nights: ${nights}
🏢 Apartments: ${apartmentsCount} (2BHK)
🏘️ Room Style: ${apartmentType === 'valley' ? '2BHK Premium Valley View Suite' : apartmentType === 'poolside' ? '2BHK Poolside Serviced Apartment' : '2BHK Royal Forest Retreat Villa'}
👥 Guests/Apt: ${guestsCount} Guests
💰 Est. Total (incl. GST): ₹${grandTotal.toLocaleString()}
----------------------------
Please confirm availability for my booking.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/918157916319?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  const steps = [
    { num: 1, label: "Dates" },
    { num: 2, label: "Villas" },
    { num: 3, label: "Info" },
    { num: 4, label: "Invoice" },
    { num: 5, label: "Payment" },
    { num: 6, label: "Success" }
  ];

  // Helper formatting for card inputs
  const handleCardNumberChange = (e) => {
    let v = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const parts = [];
    for (let i = 0, len = v.length; i < len; i += 4) {
      parts.push(v.substring(i, i + 4));
    }
    setCardNumber(parts.join(' ').substring(0, 19));
  };

  const handleCardExpiryChange = (e) => {
    let v = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      v = v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    setCardExpiry(v.substring(0, 5));
  };

  const handleCardCvvChange = (e) => {
    const v = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    setCardCvv(v.substring(0, 4));
  };

  return (
    <div className="booking-page-layout">
      {/* 1. Multi-Step Header Indicator */}
      <div className="booking-stepper-container no-print">
        <div className="booking-stepper">
          {steps.map((s) => (
            <div key={s.num} className={`booking-step-item ${bookingStep === s.num ? 'active' : ''} ${bookingStep > s.num ? 'completed' : ''}`}>
              <div className="booking-step-num">
                {bookingStep > s.num ? <Check size={14} /> : s.num}
              </div>
              <span className="booking-step-label">{s.label}</span>
              {s.num < 6 && <div className="booking-step-line" />}
            </div>
          ))}
        </div>
      </div>

      {/* 2. Step Specific Panels */}
      <div className="booking-step-content-container">
        {bookingStep === 1 && (
          <div className="booking-step-panel fade-in">
            <span className="caption-sub-tag">Step 1 of 6</span>
            <h2>Select Dates & Guests</h2>
            <div className="divider"></div>
            
            <form onSubmit={handleCheckAvailability} className="booking-step-form">
              <div className="booking-input-row">
                <div className="booking-form-group">
                  <label htmlFor="step-checkin">Check-in Date</label>
                  <input 
                    type="date" 
                    id="step-checkin" 
                    className="booking-page-input"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    required
                  />
                </div>
                <div className="booking-form-group">
                  <label htmlFor="step-checkout">Check-out Date</label>
                  <input 
                    type="date" 
                    id="step-checkout" 
                    className="booking-page-input"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    required
                  />
                </div>
              </div>

              {dateError && <div className="booking-form-error">{dateError}</div>}

              <div className="booking-input-row">
                <div className="booking-form-group">
                  <label>Apartments (2BHK)</label>
                  <div className="booking-counter-container">
                    <button 
                      type="button" 
                      className="booking-counter-btn"
                      onClick={() => setApartmentsCount(prev => Math.max(1, prev - 1))}
                      disabled={apartmentsCount <= 1}
                    >
                      -
                    </button>
                    <span className="booking-counter-val">{apartmentsCount}</span>
                    <button 
                      type="button" 
                      className="booking-counter-btn"
                      onClick={() => setApartmentsCount(prev => Math.min(6, prev + 1))}
                      disabled={apartmentsCount >= 6}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="booking-form-group">
                  <label>Guests per Apartment</label>
                  <div className="booking-counter-container">
                    <button 
                      type="button" 
                      className="booking-counter-btn"
                      onClick={() => setGuestsCount(prev => Math.max(1, prev - 1))}
                      disabled={guestsCount <= 1}
                    >
                      -
                    </button>
                    <span className="booking-counter-val">{guestsCount}</span>
                    <button 
                      type="button" 
                      className="booking-counter-btn"
                      onClick={() => setGuestsCount(prev => Math.min(6, prev + 1))}
                      disabled={guestsCount >= 6}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="booking-summary-infobar">
                <span>Total Stay Duration: <strong>{nights} {nights === 1 ? 'Night' : 'Nights'}</strong></span>
                <span>Total Apartments: <strong>{apartmentsCount} Unit(s)</strong></span>
              </div>

              <div className="booking-form-actions">
                <button type="button" className="btn-booking-secondary" onClick={() => setBookingView(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-booking-primary" disabled={checkingAvailability}>
                  {checkingAvailability ? (
                    <div className="booking-spinner-wrapper">
                      <div className="booking-spinner"></div>
                      <span>Verifying...</span>
                    </div>
                  ) : "Check Availability"}
                </button>
              </div>
            </form>
          </div>
        )}

        {bookingStep === 2 && (
          <div className="booking-step-panel fade-in">
            <span className="caption-sub-tag">Step 2 of 6</span>
            <h2>Select Apartment Type</h2>
            <p className="booking-step-subtitle">Villas available! Choose the style that best fits your family escape.</p>
            <div className="divider"></div>

            <div className="apartment-selection-grid">
              <div 
                className={`apartment-selection-card ${apartmentType === 'valley' ? 'active' : ''}`}
                onClick={() => setApartmentType('valley')}
              >
                <img src="/bedroom_real_1.jpg" alt="Valley View Suite" className="apt-card-img" />
                <div className="apt-card-details">
                  <div className="apt-card-header">
                    <h3>2BHK Premium Valley View Suite</h3>
                    <span className="apt-card-price">₹3,500/night</span>
                  </div>
                  <p>Premium family suite facing the misty Wayanad valleys. Private balcony and classic furnishings.</p>
                  <ul className="apt-card-features">
                    <li><Check size={12} /> Panoramic Valley Balcony</li>
                    <li><Check size={12} /> 2 Attached Baths</li>
                    <li><Check size={12} /> High-Speed Wi-Fi</li>
                  </ul>
                </div>
              </div>

              <div 
                className={`apartment-selection-card ${apartmentType === 'poolside' ? 'active' : ''}`}
                onClick={() => setApartmentType('poolside')}
              >
                <img src="/bedroom_real_2.jpg" alt="Poolside Serviced Apartment" className="apt-card-img" />
                <div className="apt-card-details">
                  <div className="apt-card-header">
                    <h3>2BHK Poolside Serviced Apartment</h3>
                    <span className="apt-card-price">₹4,000/night</span>
                  </div>
                  <p>Spacious ground-level apartment with direct access to the shared swimming pool and garden patio.</p>
                  <ul className="apt-card-features">
                    <li><Check size={12} /> Direct Pool Access</li>
                    <li><Check size={12} /> Private Garden Deck</li>
                    <li><Check size={12} /> Social Dining Lounge</li>
                  </ul>
                </div>
              </div>

              <div 
                className={`apartment-selection-card ${apartmentType === 'forest' ? 'active' : ''}`}
                onClick={() => setApartmentType('forest')}
              >
                <img src="/reception.jpg" alt="Royal Forest Retreat Villa" className="apt-card-img" />
                <div className="apt-card-details">
                  <div className="apt-card-header">
                    <h3>2BHK Royal Forest Retreat Villa</h3>
                    <span className="apt-card-price">₹4,500/night</span>
                  </div>
                  <p>Ultra-private detached villa surrounded by natural rain forest trees and relaxing wilderness.</p>
                  <ul className="apt-card-features">
                    <li><Check size={12} /> Absolute Forest Privacy</li>
                    <li><Check size={12} /> Premium Bath Amenities</li>
                    <li><Check size={12} /> 24/7 Priority Support</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="booking-summary-infobar selection-bar">
              <div>
                <span>Selected: <strong>2BHK {apartmentType === 'valley' ? 'Premium Valley View Suite' : apartmentType === 'poolside' ? 'Poolside Serviced Apartment' : 'Royal Forest Retreat Villa'}</strong></span>
                <span style={{ marginLeft: '1.5rem' }}>Rate per night: <strong>₹{pricePerNight.toLocaleString()}</strong></span>
              </div>
              <span className="live-grand-total">Total Estimate: <strong>₹{grandTotal.toLocaleString()}</strong></span>
            </div>

            <div className="booking-form-actions">
              <button type="button" className="btn-booking-secondary" onClick={() => setBookingStep(1)}>
                Back
              </button>
              <button type="button" className="btn-booking-primary" onClick={() => setBookingStep(3)}>
                Next: Guest Info
              </button>
            </div>
          </div>
        )}

        {bookingStep === 3 && (
          <div className="booking-step-panel fade-in">
            <span className="caption-sub-tag">Step 3 of 6</span>
            <h2>Guest Information</h2>
            <div className="divider"></div>

            <form onSubmit={handleGuestInfoSubmit} className="booking-step-form">
              <div className="booking-form-group">
                <label htmlFor="guest-fullname">Full Name</label>
                <input 
                  type="text" 
                  id="guest-fullname" 
                  placeholder="Enter your first and last name"
                  className="booking-page-input"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  required
                />
              </div>

              <div className="booking-input-row">
                <div className="booking-form-group">
                  <label htmlFor="guest-phone">WhatsApp / Contact Number</label>
                  <input 
                    type="tel" 
                    id="guest-phone" 
                    placeholder="e.g. +91 81579 16319"
                    className="booking-page-input"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    required
                  />
                </div>

                <div className="booking-form-group">
                  <label htmlFor="guest-email">Email Address</label>
                  <input 
                    type="email" 
                    id="guest-email" 
                    placeholder="name@example.com"
                    className="booking-page-input"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="booking-form-group">
                <label htmlFor="guest-requests">Special Requests / Requirements (Optional)</label>
                <textarea 
                  id="guest-requests" 
                  rows="4"
                  placeholder="Any dietary needs, early check-in requests, cot requirements, etc."
                  className="booking-page-textarea"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                />
              </div>

              <div className="booking-form-actions">
                <button type="button" className="btn-booking-secondary" onClick={() => setBookingStep(2)}>
                  Back
                </button>
                <button type="submit" className="btn-booking-primary">
                  Next: Review Quote
                </button>
              </div>
            </form>
          </div>
        )}

        {bookingStep === 4 && (
          <div className="booking-step-panel fade-in">
            <span className="caption-sub-tag">Step 4 of 6</span>
            <h2>Review Invoice Receipt</h2>
            <div className="divider"></div>

            <div className="invoice-review-split">
              {/* Left Column: Digital Receipt */}
              <div className="invoice-receipt-wrapper">
                <div className="invoice-receipt-card">
                  <div className="receipt-header-brand">
                    <h3>MIDDLE WAYANAD</h3>
                    <span>Serviced Villa Apartments</span>
                  </div>
                  
                  <div className="receipt-meta-grid">
                    <div>
                      <span className="meta-label">GUEST</span>
                      <span className="meta-value">{guestName}</span>
                    </div>
                    <div>
                      <span className="meta-label">DATE GENERATED</span>
                      <span className="meta-value">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    </div>
                    <div>
                      <span className="meta-label">CHECK-IN</span>
                      <span className="meta-value">{checkIn}</span>
                    </div>
                    <div>
                      <span className="meta-label">CHECK-OUT</span>
                      <span className="meta-value">{checkOut}</span>
                    </div>
                  </div>

                  <div className="receipt-line-items">
                    <div className="receipt-item-row header">
                      <span>DESCRIPTION</span>
                      <span>QTY</span>
                      <span>AMOUNT</span>
                    </div>

                    <div className="receipt-item-row">
                      <div>
                        <strong>2BHK {apartmentType === 'valley' ? 'Premium Valley View Suite' : apartmentType === 'poolside' ? 'Poolside Serviced Apartment' : 'Royal Forest Retreat Villa'}</strong>
                        <p>{guestsCount} Guests per Unit × {nights} {nights === 1 ? 'Night' : 'Nights'}</p>
                      </div>
                      <span>{apartmentsCount}</span>
                      <span>₹{subtotal.toLocaleString()}</span>
                    </div>

                    <div className="receipt-item-row sub-summary">
                      <span>Taxes & GST (5%)</span>
                      <span>-</span>
                      <span>₹{tax.toLocaleString()}</span>
                    </div>

                    <div className="receipt-item-row sub-summary">
                      <span>Resort Service Charge</span>
                      <span>-</span>
                      <span>₹{serviceFee.toLocaleString()}</span>
                    </div>

                    <div className="receipt-item-row receipt-grand-total">
                      <span>Total Estimated Rent</span>
                      <span></span>
                      <span>₹{grandTotal.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="receipt-footer-security">
                    <Shield size={14} />
                    <span>Secure Booking reservation system. Identification verified on arrival.</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Payment Method Selection */}
              <div className="invoice-payment-method-card">
                <h3>Select Payment Method</h3>
                <p>Choose your preferred payment method to secure your booking instantly.</p>
                
                <div className="payment-options-list">
                  <div 
                    className={`payment-option-item ${paymentMethod === 'upi' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('upi')}
                  >
                    <div className="option-radio-circle"></div>
                    <div className="option-details">
                      <strong>UPI Instant Checkout</strong>
                      <span>Pay instantly via GPay, PhonePe, Paytm, or any UPI App.</span>
                    </div>
                  </div>

                  <div 
                    className={`payment-option-item ${paymentMethod === 'card' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <div className="option-radio-circle"></div>
                    <div className="option-details">
                      <strong>Credit / Debit Card</strong>
                      <span>Securely pay with Visa, MasterCard, RuPay, or Maestro.</span>
                    </div>
                  </div>

                  <div 
                    className={`payment-option-item ${paymentMethod === 'whatsapp' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('whatsapp')}
                  >
                    <div className="option-radio-circle"></div>
                    <div className="option-details">
                      <strong>Book via WhatsApp</strong>
                      <span>Directly book and confirm reservation offline via WhatsApp.</span>
                    </div>
                  </div>
                </div>

                <div className="booking-form-actions-stacked">
                  <button 
                    type="button" 
                    className="btn-booking-primary full-width"
                    onClick={() => {
                      if (paymentMethod === 'whatsapp') {
                        handleWhatsAppBooking();
                        setBookingReference("MW-WA-" + Math.floor(1000 + Math.random() * 9000));
                        setBookingStep(6);
                      } else {
                        setBookingStep(5);
                      }
                    }}
                  >
                    {paymentMethod === 'whatsapp' ? "Connect via WhatsApp" : "Proceed to Payment"}
                  </button>
                  <button type="button" className="btn-booking-secondary full-width" onClick={() => setBookingStep(3)}>
                    Back to Guest Info
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {bookingStep === 5 && (
          <div className="booking-step-panel fade-in">
            <span className="caption-sub-tag">Step 5 of 6</span>
            <h2>Secure Checkout Gateway</h2>
            <div className="divider"></div>

            {processingPayment ? (
              <div className="payment-processing-loader">
                <div className="secure-shield-icon">
                  <Lock size={40} className="lock-pulse" />
                </div>
                <h3>Secure Payment Active</h3>
                <p>Please complete your payment inside the Razorpay popup window. If you chose UPI, a request notification has been sent to your selected UPI app.</p>
                <div className="booking-spinner large" style={{ margin: '2rem auto' }}></div>
                <button type="button" className="btn-booking-primary" onClick={handleRazorpayPayment}>
                  Re-open Payment Window
                </button>
              </div>
            ) : (
              <div className="razorpay-checkout-overview">
                <div className="secure-checkout-card">
                  <div className="secure-checkout-header">
                    <Shield size={22} className="icon-gold" style={{ marginRight: '10px' }} />
                    <h3>Encrypted Payment Gateway</h3>
                  </div>
                  
                  <div className="checkout-summary-grid">
                    <div className="checkout-summary-item">
                      <span>Stay Package</span>
                      <strong>2BHK {apartmentType === 'valley' ? 'Premium Valley View Suite' : apartmentType === 'poolside' ? 'Poolside Serviced Apartment' : 'Royal Forest Retreat Villa'}</strong>
                    </div>
                    <div className="checkout-summary-item">
                      <span>Units & Duration</span>
                      <strong>{apartmentsCount} Unit(s) × {nights} Night(s)</strong>
                    </div>
                    <div className="checkout-summary-item">
                      <span>Guest Name</span>
                      <strong>{guestName}</strong>
                    </div>
                    <div className="checkout-summary-item">
                      <span>Contact Info</span>
                      <strong>{guestPhone} | {guestEmail}</strong>
                    </div>
                  </div>

                  <div className="checkout-payment-hint">
                    <p>
                      <strong>Unified Checkout:</strong> Clicking the button below opens the secure Razorpay Checkout sheet. 
                      {paymentMethod === 'upi' ? (
                        " Type in your UPI ID (e.g. username@upi) to verify it, then accept the collect notification request on your GPay, PhonePe, or Paytm app."
                      ) : (
                        " Fill in your credit card details or scan a secure UPI QR code directly within the checkout window."
                      )}
                      {" "}Once payment is successfully completed, your reservation is automatically confirmed and a copy of the receipt will open on WhatsApp.
                    </p>
                  </div>

                  <div className="checkout-amount-payable">
                    <span>Grand Total Payable</span>
                    <h2>₹{grandTotal.toLocaleString()}</h2>
                  </div>
                </div>

                <div className="booking-form-actions">
                  <button type="button" className="btn-booking-secondary" onClick={() => setBookingStep(4)}>
                    Back to Invoice
                  </button>
                  <button type="button" className="btn-booking-primary" onClick={handleRazorpayPayment}>
                    <Lock size={14} style={{ marginRight: '8px' }} /> Pay Securely ₹{grandTotal.toLocaleString()}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {bookingStep === 6 && (
          <div className="booking-step-panel success-panel fade-in">
            <div className="success-receipt-container">
              
              <div className="success-icon-badge no-print">
                <Check size={48} />
              </div>
              
              <h2 className="no-print">Reservation Confirmed</h2>
              <p className="no-print success-intro-desc">Thank you for choosing Middle Wayanad. Your serviced apartment booking is confirmed.</p>
              
              <div className="printable-receipt-card">
                <div className="receipt-print-header">
                  <div>
                    <h1>MIDDLE WAYANAD</h1>
                    <p>Kambalakkad, Wayanad, Kerala - 670121</p>
                    <p>Phone: +91 81579 16319 | Email: middlewayanad@gmail.com</p>
                  </div>
                  <div className="receipt-status-badge">
                    <span>RESERVATION PAID</span>
                    <strong className="reference-code">{bookingReference}</strong>
                    {razorpayPaymentId && <span className="payment-txn-id" style={{ display: 'block', fontSize: '0.65rem', marginTop: '4px', opacity: 0.8 }}>TXN: {razorpayPaymentId}</span>}
                  </div>
                </div>

                <div className="receipt-split-columns">
                  <div>
                    <h4>GUEST DETAILS</h4>
                    <p><strong>Name:</strong> {guestName}</p>
                    <p><strong>Phone:</strong> {guestPhone}</p>
                    <p><strong>Email:</strong> {guestEmail}</p>
                  </div>
                  <div>
                    <h4>BOOKING DETAILS</h4>
                    <p><strong>Check-In:</strong> {checkIn} (02:00 PM)</p>
                    <p><strong>Check-Out:</strong> {checkOut} (11:00 AM)</p>
                    <p><strong>Apartments:</strong> {apartmentsCount} × 2BHK Units</p>
                  </div>
                </div>

                <div className="receipt-table-section">
                  <table className="receipt-table">
                    <thead>
                      <tr>
                        <th>Item Description</th>
                        <th className="align-center">Quantity</th>
                        <th className="align-right">Unit Price</th>
                        <th className="align-right">Total Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <strong>2BHK {apartmentType === 'valley' ? 'Premium Valley View Suite' : apartmentType === 'poolside' ? 'Poolside Serviced Apartment' : 'Royal Forest Retreat Villa'}</strong>
                          <p>Stay duration: {nights} {nights === 1 ? 'night' : 'nights'} (capacity up to {guestsCount} guests/unit)</p>
                        </td>
                        <td className="align-center">{apartmentsCount}</td>
                        <td className="align-right">₹{pricePerNight.toLocaleString()}</td>
                        <td className="align-right">₹{subtotal.toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td colSpan="3" className="align-right label-row">Room Subtotal</td>
                        <td className="align-right">₹{subtotal.toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td colSpan="3" className="align-right label-row">Taxes & GST (5%)</td>
                        <td className="align-right">₹{tax.toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td colSpan="3" className="align-right label-row">Resort Service Fee</td>
                        <td className="align-right">₹{serviceFee.toLocaleString()}</td>
                      </tr>
                      <tr className="grand-total-row">
                        <td colSpan="3" className="align-right label-row">Grand Total Paid</td>
                        <td className="align-right">₹{grandTotal.toLocaleString()}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {specialRequests && (
                  <div className="receipt-remarks-section">
                    <h4>SPECIAL REMARKS</h4>
                    <p>{specialRequests}</p>
                  </div>
                )}

                <div className="receipt-footer-terms">
                  <p><strong>Important Note:</strong> Please present a valid government-issued ID card (Aadhaar, Passport, or DL) for all guests upon check-in. Standard check-in is at 2:00 PM and check-out is at 11:00 AM. Thank you for your reservation!</p>
                </div>
              </div>

              <div className="booking-form-actions success-actions no-print">
                <button type="button" className="btn-booking-secondary" onClick={handlePrint}>
                  <Printer size={16} /> Print Receipt
                </button>
                <button type="button" className="btn-booking-whatsapp-share" onClick={() => sendWhatsAppConfirmation(bookingReference, razorpayPaymentId)}>
                  <Phone size={16} /> Share via WhatsApp
                </button>
                <button type="button" className="btn-booking-primary" onClick={() => { setBookingView(false); window.scrollTo(0,0); }}>
                  Back to Home Page
                </button>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
