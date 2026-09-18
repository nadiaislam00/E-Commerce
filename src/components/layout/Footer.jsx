import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { addToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    addToast('Successfully subscribed to TOOBA updates!', 'success');
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <footer className="bg-[#0A0A0A] text-[#F0EDE6] border-t border-[#C9A84C]/20">

      {/* ── Newsletter ── */}
      <div className="border-b border-[#1E1E1E]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-14 flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#C9A84C] font-semibold mb-2">The TOOBA Journal</p>
            <h3 className="font-editorial text-2xl sm:text-3xl text-[#F0EDE6] font-normal leading-snug mb-1">
              Curated drops, seasonal releases
            </h3>
            <p className="text-sm text-[#737373] font-light">
              Men's tailoring & kids' organic essentials — straight to your inbox.
            </p>
          </div>

          {submitted ? (
            <div className="flex items-center gap-2 text-sm font-medium text-[#C9A84C] border border-[#C9A84C]/30 rounded-lg !px-5 !py-3 bg-[#C9A84C]/8 shrink-0">
              ✓ You're on the list — welcome to TOOBA.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5 w-full lg:w-[440px] shrink-0">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 min-w-0 !px-4 !py-3 rounded-lg bg-[#161616] !border border-[#2A2A2A] text-[#F0EDE6] placeholder-[#5E5A54] text-sm focus:outline-none focus:!border-[#C9A84C]/50 focus:bg-[#1E1E1E] transition-all"
              />
              <button
                type="submit"
                className="shrink-0 flex items-center justify-center gap-1.5 !px-6 !py-3 !bg-[#C9A84C] !text-[#0E0E0E] hover:!bg-[#E0BC6A] rounded-lg text-sm font-bold transition-all"
              >
                Subscribe <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* ── Nav Links ── */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 sm:gap-12">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="font-serif text-2xl font-bold tracking-[0.25em] text-[#C9A84C] block mb-3">
              TOOBA
            </Link>
            <p className="text-sm text-[#737373] leading-relaxed mb-6 font-light max-w-[190px]">
              Thoughtfully crafted apparel for men and kids. Natural fibers, precise cuts, effortless everyday silhouettes.
            </p>
            <div className="flex gap-2.5">
              {[
                { href: 'https://instagram.com', label: 'Instagram', svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg> },
                { href: 'https://twitter.com', label: 'Twitter', svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg> },
                { href: 'https://facebook.com', label: 'Facebook', svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
              ].map(({ href, label, svg }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-full border border-[#2A2A2A] flex items-center justify-center text-[#737373] hover:text-[#C9A84C] hover:border-[#C9A84C]/40 transition-all"
                >
                  {svg}
                </a>
              ))}
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-[9px] uppercase tracking-[0.3em] font-semibold text-[#C9A84C]/70 mb-5">Collections</h4>
            <ul className="space-y-3">
              {[
                { to: '/category/men', label: "Men's Apparel" },
                { to: '/category/kids', label: 'Kids & Baby' },
                { to: '/shop?sort=newest', label: 'New Arrivals' },
                { to: '/shop?sort=popular', label: 'Bestsellers' },
                { to: '/sale', label: 'Seasonal Sale', accent: true },
              ].map(({ to, label, accent }) => (
                <li key={to}>
                  <Link to={to} className={`text-sm transition-colors ${accent ? 'text-[#E05252] hover:text-[#ff7070]' : 'text-[#737373] hover:text-[#C9A84C]'}`}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-[9px] uppercase tracking-[0.3em] font-semibold text-[#C9A84C]/70 mb-5">Customer Care</h4>
            <ul className="space-y-3">
              {[
                { to: '/shipping', label: 'Shipping & Delivery' },
                { to: '/returns', label: 'Returns & Exchanges' },
                { to: '/account/orders', label: 'Track Order' },
                { to: '/contact', label: 'Contact Support' },
                { to: '/faq', label: 'FAQs' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-[#737373] hover:text-[#C9A84C] transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-[9px] uppercase tracking-[0.3em] font-semibold text-[#C9A84C]/70 mb-5">About TOOBA</h4>
            <ul className="space-y-3">
              {[
                { to: '/about', label: 'Our Philosophy' },
                { to: '/materials', label: 'Sustainable Sourcing' },
                { to: '/sustainability', label: 'Organic Fabrics' },
                { to: '/careers', label: 'Careers' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-[#737373] hover:text-[#C9A84C] transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-[#1E1E1E]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-[#737373]">
            &copy; {new Date().getFullYear()} TOOBA Studio. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-5 text-[11px] text-[#737373]">
            {[
              { to: '/privacy', label: 'Privacy Policy' },
              { to: '/terms', label: 'Terms of Use' },
              { to: '/accessibility', label: 'Accessibility' },
            ].map(({ to, label }) => (
              <Link key={to} to={to} className="hover:text-[#C9A84C] transition-colors">{label}</Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {['VISA', 'MC', 'AMEX', 'PAYPAL', 'APPLE'].map(p => (
              <span key={p} className="text-[10px] font-semibold tracking-wider text-[#525252] border border-[#2A2A2A] !px-2 !py-1 rounded bg-[#161616]">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
