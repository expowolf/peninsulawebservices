import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', business: '', email: '', phone: '', message: '' });
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Website inquiry — ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nBusiness: ${form.business}\nEmail: ${form.email}\nPhone: ${form.phone}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:dcpeninsulaweb@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="page">
      <div className="max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Let's Talk</h1>
        <p className="text-xl text-slate-600 mb-12">
          Share a bit about your business and what you're looking for. I'll get back to you within 24 hours.
        </p>

        <form onSubmit={onSubmit} className="bg-white p-8 rounded border border-slate-200 space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold text-slate-900 mb-2">Your Name *</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={onChange}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded focus:border-blue-700 focus:ring-1 focus:ring-blue-700 outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-900 mb-2">Business Name</label>
              <input
                type="text"
                name="business"
                value={form.business}
                onChange={onChange}
                className="w-full px-4 py-2 border border-slate-300 rounded focus:border-blue-700 focus:ring-1 focus:ring-blue-700 outline-none"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold text-slate-900 mb-2">Email *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded focus:border-blue-700 focus:ring-1 focus:ring-blue-700 outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-900 mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={onChange}
                className="w-full px-4 py-2 border border-slate-300 rounded focus:border-blue-700 focus:ring-1 focus:ring-blue-700 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-900 mb-2">Tell me about your project *</label>
            <textarea
              name="message"
              value={form.message}
              onChange={onChange}
              required
              rows={6}
              className="w-full px-4 py-2 border border-slate-300 rounded focus:border-blue-700 focus:ring-1 focus:ring-blue-700 outline-none resize-none"
              placeholder="What's your business and what do you need?"
            />
          </div>

          <button type="submit" className="btn-primary w-full">
            Send Message
          </button>
        </form>

        <div className="mt-12 pt-8 border-t">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Direct Contact</h2>
          <div className="space-y-3">
            <p>
              <a href="tel:+19203709543" className="text-blue-700 font-semibold hover:underline">
                (920) 370-9543
              </a>
            </p>
            <p>
              <a href="mailto:dcpeninsulaweb@gmail.com" className="text-blue-700 font-semibold hover:underline">
                dcpeninsulaweb@gmail.com
              </a>
            </p>
            <p className="text-slate-700">Sturgeon Bay, Wisconsin</p>
          </div>
        </div>
      </div>
    </div>
  );
}
