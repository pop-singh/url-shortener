import { Link } from "react-router-dom";
import "./Pricing.css";

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    desc: "Perfect for personal projects and quick links.",
    features: [
      "50 links per month",
      "Basic click analytics",
      "HTTPS by default",
      "Standard support",
    ],
    cta: "Get Started",
    ctaLink: "/shorten",
    featured: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "/month",
    desc: "For power users and growing teams.",
    features: [
      "Unlimited links",
      "Advanced analytics",
      "Custom aliases",
      "API access",
      "Bulk shortening",
      "Priority support",
    ],
    cta: "Start Pro",
    ctaLink: "/contact",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For organizations that need scale and control.",
    features: [
      "Unlimited everything",
      "Custom domain",
      "SSO / SAML login",
      "SLA guarantee",
      "White-label option",
      "Dedicated support",
    ],
    cta: "Contact Sales",
    ctaLink: "/contact",
    featured: false,
  },
];

const FAQS = [
  {
    q: "Can I upgrade later?",
    a: "Yes — you can upgrade or downgrade your plan at any time from your account settings.",
  },
  {
    q: "Is there a free trial for Pro?",
    a: "Absolutely. Every new account gets a 14-day Pro trial, no credit card required.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards, PayPal, and bank transfer for Enterprise.",
  },
  {
    q: "Do links expire?",
    a: "Free links are active for 1 year. Pro and Enterprise links never expire.",
  },
];

export default function Pricing() {
  return (
    <div className="pricing-page">
      {/* Header */}
      <section className="pricing-hero">
        <p className="section-eyebrow">Pricing</p>
        <h1 className="pricing-title">Simple, transparent pricing</h1>
        <p className="pricing-subtitle">
          Pick the plan that fits your needs. No hidden fees, ever.
        </p>
      </section>

      {/* Plans */}
      <section className="plans-section">
        <div className="plans-container">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`plan-card ${plan.featured ? "plan-card--featured" : ""}`}
            >
              {plan.featured && <span className="plan-badge">Most Popular</span>}
              <h2 className="plan-name">{plan.name}</h2>
              <div className="plan-price-row">
                <span className="plan-price">{plan.price}</span>
                {plan.period && <span className="plan-period">{plan.period}</span>}
              </div>
              <p className="plan-desc">{plan.desc}</p>
              <ul className="plan-features">
                {plan.features.map((f) => (
                  <li key={f}>
                    <span className="check-icon">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link
                to={plan.ctaLink}
                className={`plan-cta ${plan.featured ? "plan-cta--featured" : ""}`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="faq-container">
          <p className="section-eyebrow">FAQ</p>
          <h2 className="faq-title">Frequently asked questions</h2>
          <div className="faq-grid">
            {FAQS.map((item) => (
              <div key={item.q} className="faq-item">
                <h3 className="faq-q">{item.q}</h3>
                <p className="faq-a">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pricing-cta">
        <h2>Still have questions?</h2>
        <p>Our team is happy to help you pick the right plan.</p>
        <Link to="/contact" className="pricing-cta-btn">Contact Us →</Link>
      </section>
    </div>
  );
}
