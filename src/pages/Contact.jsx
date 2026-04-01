import { useState } from "react";
import "./Contact.css";

const CONTACT_INFO = [
  { icon: "📧", label: "Email", value: "hello@linksnap.io" },
  { icon: "📞", label: "Phone", value: "+1 (555) 123-4567" },
  { icon: "📍", label: "Address", value: "San Francisco, CA 94107" },
  { icon: "🕐", label: "Hours", value: "Mon–Fri, 9 AM – 6 PM PST" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email.";
    if (!form.subject.trim()) e.subject = "Subject is required.";
    if (!form.message.trim()) e.message = "Message is required.";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((er) => ({ ...er, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setSent(true);
  };

  const handleReset = () => {
    setForm({ name: "", email: "", subject: "", message: "" });
    setErrors({});
    setSent(false);
  };

  return (
    <div className="contact-page">
      {/* Header */}
      <section className="contact-hero">
        <p className="contact-eyebrow">Contact</p>
        <h1 className="contact-title">Get in touch</h1>
        <p className="contact-subtitle">
          Have a question or feedback? We'd love to hear from you.
        </p>
      </section>

      <section className="contact-body">
        <div className="contact-container">
          {/* Info column */}
          <div className="contact-info">
            <h2 className="info-heading">We're here to help</h2>
            <p className="info-text">
              Whether you're curious about features, pricing, or need a demo —
              our team is ready to answer all your questions.
            </p>
            <div className="info-cards">
              {CONTACT_INFO.map((item) => (
                <div key={item.label} className="info-card">
                  <span className="info-icon">{item.icon}</span>
                  <div>
                    <p className="info-label">{item.label}</p>
                    <p className="info-value">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form column */}
          <div className="contact-form-wrap">
            {sent ? (
              <div className="success-state">
                <span className="success-icon">✅</span>
                <h3>Message sent!</h3>
                <p>Thanks for reaching out. We'll get back to you within 24 hours.</p>
                <button className="send-again-btn" onClick={handleReset}>
                  Send another message
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <h2 className="form-heading">Send us a message</h2>

                <div className="form-row">
                  <div className="field-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Jane Smith"
                      value={form.name}
                      onChange={handleChange}
                      className={errors.name ? "field-error" : ""}
                    />
                    {errors.name && <span className="field-error-msg">{errors.name}</span>}
                  </div>
                  <div className="field-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="jane@example.com"
                      value={form.email}
                      onChange={handleChange}
                      className={errors.email ? "field-error" : ""}
                    />
                    {errors.email && <span className="field-error-msg">{errors.email}</span>}
                  </div>
                </div>

                <div className="field-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="How can we help?"
                    value={form.subject}
                    onChange={handleChange}
                    className={errors.subject ? "field-error" : ""}
                  />
                  {errors.subject && <span className="field-error-msg">{errors.subject}</span>}
                </div>

                <div className="field-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell us more…"
                    value={form.message}
                    onChange={handleChange}
                    className={errors.message ? "field-error" : ""}
                  />
                  {errors.message && <span className="field-error-msg">{errors.message}</span>}
                </div>

                <div className="form-actions">
                  <button type="submit" className="submit-btn">Send Message →</button>
                  <button type="button" className="clear-form-btn" onClick={handleReset}>
                    Clear
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
