import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', business: '', email: '', phone: '', message: '' });
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project inquiry — ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nBusiness: ${form.business}\nEmail: ${form.email}\nPhone: ${form.phone}\n\n${form.message}`
    );
    window.location.href = `mailto:dcpeninsulaweb@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="page">
      <header className="pb-16 border-b rule">
        <p className="eyebrow mb-6">Contact</p>
        <h1 className="display font-display text-5xl md:text-7xl max-w-4xl">
          Start a project.
        </h1>
        <p className="text-stone-400 text-lg mt-6 max-w-2xl leading-relaxed">
          Share a few details about your business and I'll respond within 24 hours.
        </p>
      </header>

      <div className="grid lg:grid-cols-12 gap-16 py-16">
        <aside className="lg:col-span-4 space-y-10">
          <Info eyebrow="Phone" value="(920) 370-9543" href="tel:+19203709543" />
          <Info eyebrow="Email" value="dcpeninsulaweb@gmail.com" href="mailto:dcpeninsulaweb@gmail.com" />
          <Info eyebrow="Studio" value="Sturgeon Bay, Wisconsin" />
          <Info eyebrow="Hours" value="Mon – Fri · 9:00 – 17:00 CST" />
        </aside>

        <form onSubmit={onSubmit} className="lg:col-span-8 border rule p-8 md:p-12 space-y-8">
          <div className="grid sm:grid-cols-2 gap-8">
            <Field label="Name" name="name" value={form.name} onChange={onChange} required />
            <Field label="Business" name="business" value={form.business} onChange={onChange} />
            <Field label="Email" name="email" type="email" value={form.email} onChange={onChange} required />
            <Field label="Phone" name="phone" type="tel" value={form.phone} onChange={onChange} />
          </div>
          <div>
            <label className="eyebrow block mb-3">Project details</label>
            <textarea
              name="message" value={form.message} onChange={onChange} required rows={6}
              className="w-full bg-transparent border-b rule py-3 text-stone-100 placeholder-stone-600
                         focus:border-stone-100 outline-none resize-none transition-colors"
              placeholder="A few sentences about your business and what you're looking for…"
            />
          </div>
          <div className="flex justify-end pt-2">
            <button type="submit" className="btn-light">Send inquiry</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Info({ eyebrow, value, href }) {
  const content = <p className="text-stone-100 text-lg">{value}</p>;
  return (
    <div>
      <p className="eyebrow mb-3">{eyebrow}</p>
      {href ? <a href={href} className="hover:text-stone-400 transition-colors">{content}</a> : content}
    </div>
  );
}

function Field({ label, name, type = 'text', value, onChange, required }) {
  return (
    <div>
      <label className="eyebrow block mb-3">{label}{required && ' *'}</label>
      <input
        type={type} name={name} value={value} onChange={onChange} required={required}
        className="w-full bg-transparent border-b rule py-2 text-stone-100
                   focus:border-stone-100 outline-none transition-colors"
      />
    </div>
  );
}
