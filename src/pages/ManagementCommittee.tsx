import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LuChevronDown, LuMenu, LuX, LuArrowLeft,
  LuMapPin, LuPhone, LuMail, LuAward,
} from 'react-icons/lu';
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp, FaYoutube, FaTiktok } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

/* ─────────────────────────────
   Brand
   ───────────────────────────── */
const PRIMARY   = '#FFD700';
const SECONDARY = '#800E13';

/* ─────────────────────────────
   Nav
   ───────────────────────────── */
const navItems = [
  {
    label: 'About Us',
    items: [
      { label: 'School Profile',                     href: '/school-profile' },
      { label: 'Mission and Vision',                 href: '/school-profile' },
      { label: 'Core Values',                        href: '/school-profile' },
      { label: 'School Management Committee',        href: '/management-committee' },
      { label: "Principal's Message",                href: '/principals-message' },
      { label: 'Administration and Management Team', href: '/#administration' },
    ],
  },
  {
    label: 'Academics',
    items: [
      { label: 'Academic Program',        href: '/#programs' },
      { label: 'Curriculum Subjects',     href: '/#programs' },
      { label: 'Departments',             href: '/#programs' },
      { label: 'UNEB Results - Archives', href: '/uneb-results' },
    ],
  },
  {
    label: 'Admissions',
    items: [
      { label: 'Apply Now',        href: '/#apply-now' },
      { label: 'Resources - Fees', href: '/#fees' },
      { label: 'FAQs',             href: '/#faqs' },
      { label: 'Documents',        href: '/#documents' },
      { label: 'Overview',         href: '/#admissions' },
    ],
  },
  {
    label: 'Student Life',
    items: [
      { label: 'Updates',                     href: '/#articles' },
      { label: 'Images',                      href: '/gallery' },
      { label: 'Student Clubs and Societies', href: '/#clubs-societies' },
    ],
  },
];

/* ─────────────────────────────
   Header
   ───────────────────────────── */
const PageHeader: React.FC = () => {
  const [scrolled,       setScrolled]       = useState(false);
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [openDropdown,   setOpenDropdown]   = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const close = () => {
    setMobileOpen(false);
    setOpenDropdown(null);
    setMobileExpanded(null);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg py-3' : 'py-5'
      }`}
      style={!scrolled ? { background: `linear-gradient(to right, ${SECONDARY}, #5C0A0F)` } : undefined}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Brand */}
          <a href="/" className="flex items-center gap-3 group">
            <div className={`h-11 w-11 flex items-center justify-center overflow-hidden rounded-full border-2 transition-colors ${
              scrolled ? 'border-[#800E13]/30 group-hover:border-[#800E13]' : 'border-[#FFD700]/30 group-hover:border-[#FFD700]'
            }`}>
              <img src="/images/Gombe High logo.png" alt="SAKGHS" className="h-full w-full object-contain" loading="eager" />
            </div>
            <div className="leading-tight">
              <div className={`text-sm lg:text-base font-bold transition-colors ${scrolled ? 'text-gray-900' : 'text-white'}`}>
                St. Andrew Kaggwa Gombe HS
              </div>
              <div className={`text-xs font-semibold tracking-wider transition-colors ${scrolled ? 'text-[#800E13]' : 'text-[#FFD700]'}`}
                style={{ color: scrolled ? SECONDARY : PRIMARY }}>
                LIGHT THE LAMP OF WISDOM · SINCE 2022
              </div>
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            <a href="/#home" className={`px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
              scrolled ? 'text-gray-700 hover:text-[#800E13] hover:bg-gray-50' : 'text-white hover:text-[#FFD700]'
            }`}>Home</a>
            {navItems.map((item) => (
              <div key={item.label} className="relative"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className={`flex items-center px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
                  scrolled ? 'text-gray-700 hover:text-[#800E13] hover:bg-gray-50' : 'text-white hover:text-[#FFD700]'
                }`}>
                  {item.label}
                  <LuChevronDown className={`w-3.5 h-3.5 ml-1 transition-transform duration-200 ${openDropdown === item.label ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.14 }}
                      className="absolute top-full left-0 mt-1 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-[150]"
                    >
                      {item.items.map((sub) => (
                        <a key={sub.label} href={sub.href} onClick={() => setOpenDropdown(null)}
                          className={`block px-5 py-2.5 text-sm font-medium transition-colors rounded-xl ${
                            sub.href === '/management-committee'
                              ? 'bg-[#FFF6CC] text-[#800E13]'
                              : 'text-gray-700 hover:bg-[#FFF6CC] hover:text-[#800E13]'
                          }`}>
                          {sub.label}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen((p) => !p)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-gray-900' : 'text-white'}`}>
            {mobileOpen ? <LuX className="w-6 h-6" /> : <LuMenu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.18 }}
              className={`lg:hidden mt-3 overflow-hidden rounded-2xl border ${
                scrolled ? 'bg-white border-gray-100' : 'bg-[#800E13]/95 border-white/10'
              }`}
            >
              <div className="px-4 py-3 space-y-1">
                <a href="/#home" onClick={close}
                  className={`block px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                    scrolled ? 'text-gray-700 hover:bg-gray-50' : 'text-white hover:bg-white/10'
                  }`}>Home</a>
                {navItems.map((item) => (
                  <div key={item.label}>
                    <button
                      onClick={() => setMobileExpanded((p) => (p === item.label ? null : item.label))}
                      className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                        scrolled ? 'text-gray-700 hover:bg-gray-50' : 'text-white hover:bg-white/10'
                      }`}
                    >
                      {item.label}
                      <LuChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === item.label ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {mobileExpanded === item.label && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden pl-3">
                          {item.items.map((sub) => (
                            <a key={sub.label} href={sub.href} onClick={close}
                              className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                scrolled ? 'text-gray-600 hover:bg-[#FFF6CC] hover:text-[#800E13]' : 'text-white/80 hover:bg-white/10'
                              }`}>
                              {sub.label}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

/* ─────────────────────────────
   Main Component
   ───────────────────────────── */
const ManagementCommittee: React.FC = () => {
  useEffect(() => {
    const prev = document.title;
    document.title = 'School Management Committee – St. Andrew Kaggwa Gombe HS';
    window.scrollTo(0, 0);
    return () => { document.title = prev; };
  }, []);

  const members = [
    {
      name: 'Owek. Kyewalabye David Male',
      role: 'Managing Director, Gombe Education Service (GES)',
      image: '/Owek. Kyewalabye David Male.png',
      bio: 'Providing visionary leadership and strategic direction for Gombe Education Service. Dedicated to maintaining high educational standards, infrastructural advancement, and strategic partnerships that elevate student performance across all campuses.',
    },
    {
      name: 'Mrs. Harriet Mulyanti',
      role: 'GES Executive Chairperson',
      image: '/GES Executive Chairperson Mrs Harriet Mulyanti.JPG',
      bio: 'Oversing administrative standards, governance, and institutional integrity. Focused on fostering a disciplined, supportive environment that aligns academic curricula with Gombe\'s values and character-first philosophy.',
    },
    {
      name: 'Daniella Nakayenga',
      role: 'GES Rector',
      image: '/GES Rector - Daniella Nakayenga.jpeg',
      bio: 'Managing academic policy coordination, quality assurance, and student welfare systems. Dedicated to driving modern pedagogy and character cultivation practices that ensure students achieve national academic excellence.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <PageHeader />

      {/* ── Hero banner ── */}
      <div className="relative pt-24 pb-16 bg-gradient-to-r from-[#800E13] to-[#5C0A0F] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#800E13]/90 to-[#5C0A0F]/90" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent" />
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #FFD700 0%, transparent 50%), radial-gradient(circle at 80% 20%, #FFD700 0%, transparent 40%)' }} />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <a href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-[#FFD700] text-sm font-medium mb-6 transition-colors">
              <LuArrowLeft className="w-4 h-4" /> Back to Home
            </a>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-1 w-12 bg-[#FFD700]" />
              <span className="text-[#FFD700] font-bold tracking-wider uppercase text-sm">Governance</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              School <span className="text-[#FFD700]">Management Committee</span>
            </h1>
            <p className="text-white/70 text-lg">Guided by a committed leadership team dedicated to nurturing character and pursuing excellence.</p>
          </motion.div>
        </div>
      </div>

      {/* ── Profiles Grid ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {members.map((m, idx) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col"
              >
                <div className="aspect-[4/5] relative overflow-hidden bg-gray-100">
                  <img
                    src={m.image}
                    alt={m.name}
                    className="w-full h-full object-cover object-top hover:scale-102 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-bold text-white mb-1">{m.name}</h3>
                    <p className="text-[#FFD700] text-sm font-semibold uppercase tracking-wider">{m.role}</p>
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">"{m.bio}"</p>
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
                    <span className="text-xs text-gray-400">Gombe Education Service</span>
                    <LuAward className="w-5 h-5 text-[#800E13]" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-gray-900 text-white pt-12 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
            <div className="max-w-sm">
              <img src="/images/Gombe High logo.png" alt="SAKGHS" className="h-32 w-auto mb-3" loading="lazy" />
              <h3 className="text-base font-bold text-white mb-2">St. Andrew Kaggwa Gombe High School</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Light the Lamp of Wisdom.
              </p>
              <div className="flex items-center gap-3 mt-4">
                {[
                  { icon: FaFacebook, href: "https://www.facebook.com/share/1KtMX5AvjT/", label: "Facebook" },
                  { icon: FaXTwitter, href: "https://x.com/gombehighschool", label: "X" },
                  { icon: FaInstagram, href: "https://www.instagram.com/st.andrewkaggwagombehighschool?igsh=MW56MjRyMGtrdHRncQ==", label: "Instagram" },
                  { icon: FaYoutube, href: "https://www.youtube.com/@watchgombess", label: "YouTube" },
                  { icon: FaTiktok, href: "https://www.tiktok.com/@gombehighschoolkawaala?_r=1&_t=ZS-97XNihHM2hL", label: "TikTok" }
                ].map((social) => (
                  <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FFD700]/20 hover:text-[#FFD700] transition-colors text-gray-300" aria-label={social.label}>
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-base font-bold mb-4 text-white">Quick Links</h3>
              <ul className="space-y-2">
                {[['Home', '/'], ['School Profile', '/#school-profile'], ['Programs', '/#programs'], ['Admissions', '/#admissions'], ["Principal's Message", '/principals-message']].map(([l, h]) => (
                  <li key={l}><a href={h} className="text-gray-400 hover:text-[#FFD700] transition-colors text-sm">{l}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pt-4 text-center">
            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} St. Andrew Kaggwa Gombe High School. All rights reserved. A member of <a href="https://ges.ac.ug" target="_blank" rel="noopener" className="hover:underline">Gombe Education Service</a>.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ManagementCommittee;
