import { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle } from 'lucide-react';

const contactInfo = [
  {
    icon: Phone,
    label: 'Call or Text',
    value: '(920) 370-9543',
    href: 'tel:+19203709543',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'dcpeninsulaweb@gmail.com',
    href: 'mailto:dcpeninsulaweb@gmail.com',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Sturgeon Bay, WI',
    href: null,
  },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    business: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Demo handler — replace with real backend / form service (Formspree, Resend, etc.)
    const subject = encodeURIComponent(`New Quote Request from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nBusiness: ${form.business}\nEmail: ${form.email}\nPhone: ${form.phone}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:dcpeninsulaweb@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container-max">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-accent font-semibold uppercase tracking-wider text-sm">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-navy-900 mt-3 mb-4">
            Let's Build Your Next Website
          </h2>
          <p className="text-slate-600 text-lg">
            Free, no-pressure quote. Tell me about your business and I'll get back
            to you within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-4">
            {contactInfo.map(({ icon: Icon, label, value, href }) => {
              const content = (
                <>
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent group-hover:scale-110 transition-all">
                    <Icon className="w-6 h-6 text-accent group-hover:text-navy-900 transition-colors" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">{label}</p>
                    <p className="text-navy-900 font-bold text-lg">{value}</p>
                  </div>
                </>
              );
              const className =
                'group flex items-center gap-4 p-5 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-lg border border-transparent hover:border-accent/30 transition-all duration-300';
              return href ? (
                <a key={label} href={href} className={className}>
                  {content}
                </a>
              ) : (
                <div key={label} className={className}>
                  {content}
                </div>
              );
            })}

            <div className="p-6 rounded-2xl bg-gradient-to-br from-navy-900 to-navy-700 text-white mt-6">
              <h4 className="font-bold mb-2">Why Local Matters</h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                Working with a local partner means faster turnaround, in-person
                meetings, and someone who truly understands the Door County market.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-10 rounded-2xl bg-gradient-to-br from-accent/10 to-cyan-100 border border-accent/30">
                <CheckCircle className="w-16 h-16 text-accent mb-4" />
                <h3 className="text-2xl font-bold text-navy-900 mb-2">Thanks!</h3>
                <p className="text-slate-700">
                  Your email client should have opened. I'll get back to you within
                  24 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-8 rounded-2xl bg-slate-50 border border-slate-200 space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Your Name *" name="name" value={form.name} onChange={handleChange} required />
                  <Field label="Business Name" name="business" value={form.business} onChange={handleChange} />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Email *" name="email" type="email" value={form.email} onChange={handleChange} required />
                  <Field label="Phone" name="phone" type="tel" value={form.phone} onChange={handleChange} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy-900 mb-2">
                    How can I help? *
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell me a bit about your business and what you're looking for…"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white
                               focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none
                               transition-all resize-none"
                  />
                </div>
                <button type="submit" className="btn-primary w-full group">
                  Send Message
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-xs text-slate-500 text-center">
                  Your info stays private — used only to reply to your inquiry.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = 'text', value, onChange, required }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-navy-900 mb-2">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white
                   focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none
                   transition-all"
      />
    </div>
  );
}
