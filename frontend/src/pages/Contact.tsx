import { useState } from 'react';
import { Hero } from '../components/Hero';
import {
  Mail,
  Phone,
  MapPin,
  User,
  MessageSquare,
  Facebook,
  Instagram,
  MessageCircle,
  Clock3,
} from 'lucide-react';
import '../styles/forms.css';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const apiBase = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:3001';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiBase}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        console.error('Error sending contact form:', data);
        alert('Sorry, something went wrong. Please try again.');
        return;
      }

      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });

      setTimeout(() => {
        setIsSubmitted(false);
      }, 2800);
    } catch (error) {
      console.error('Error sending contact form:', error);
      alert('Sorry, something went wrong. Please try again.');
    }
  };

  return (
    <div>
      <Hero
        backgroundImage="https://images.unsplash.com/photo-1530469525856-cf37954301f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JsZCUyMHRyYXZlbCUyMGV4cGxvcmV8ZW58MXx8fHwxNzYzNTUyNjM3fDA&ixlib=rb-4.1.0&q=80&w=1080"
        title="Contact Us"
        subtitle="We’re here to help plan your perfect journey."
        height="medium"
      />

      <section className="tt-pageSection tt-pageSection--white">
        <div className="tt-container">
          <div className="tt-grid2">
            {/* Left: info */}
            <div className="tt-card">
              <div className="tt-cardPad">
                <p className="tt-kicker">Get in touch</p>
                <h2 className="tt-title">Let’s plan something amazing.</h2>
                <p className="tt-subtitle">
                  Have questions about our tours or need help with your booking? Reach out through any channel below,
                  and we’ll respond as soon as possible.
                </p>

                <div className="tt-divider" />

                <div className="tt-infoList">
                  <div className="tt-infoRow">
                    <div className="tt-iconPill">
                      <MapPin className="tt-icon" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="tt-infoLabel">Office Address</p>
                      <p className="tt-infoText">Model Town, Lahore, Pakistan</p>
                    </div>
                  </div>

                  <div className="tt-infoRow">
                    <div className="tt-iconPill">
                      <Phone className="tt-icon" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="tt-infoLabel">Phone Numbers</p>
                      <p className="tt-infoText">+92 305 1112255</p>
                      <p className="tt-infoText">+971 55 488 4268</p>
                      <p className="tt-infoText">+44 7863 226865</p>

                    </div>
                  </div>

                  <div className="tt-infoRow">
                    <div className="tt-iconPill">
                      <Mail className="tt-icon" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="tt-infoLabel">Email</p>
                      <p className="tt-infoText">info@totallytravels.com</p>
                    </div>
                  </div>

                  <div className="tt-infoRow">
                    <div className="tt-iconPill">
                      <Clock3 className="tt-icon" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="tt-infoLabel">Office Hours</p>
                      <p className="tt-infoText">Mon–Fri: 9:00 AM – 6:00 PM</p>
                      <p className="tt-infoText">Sat: 10:00 AM – 4:00 PM</p>
                      <p className="tt-infoText">Sun: Closed</p>
                    </div>
                  </div>
                </div>

                <div className="tt-divider" />

                <p className="tt-infoLabel">Social Media</p>
                <div className="tt-socials">
                  <div className="tt-socialRow">
                    <Facebook aria-hidden="true" />
                    <a
                      className="tt-link"
                      href="https://www.facebook.com/share/1BajL4Achs/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Facebook
                    </a>
                  </div>

                  <div className="tt-socialRow">
                    <Instagram aria-hidden="true" />
                    <a
                      className="tt-link"
                      href="https://www.instagram.com/travelstotally?utm_source=qr&amp;igsh=MW50bzk3eXF2em45eA=="
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Instagram
                    </a>
                  </div>

                  <div className="tt-socialRow">
                    <MessageCircle aria-hidden="true" />
                    <a
                      className="tt-link"
                      href="https://wa.me/923051112255"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WhatsApp: +92 305 1112255
                    </a>
                  </div>
                </div>

                <p className="tt-hint" style={{ marginTop: '0.9rem' }}>
                  Quickest response is usually on WhatsApp.
                </p>
              </div>
            </div>

            {/* Right: form */}
            <div className="tt-card">
              <div className="tt-cardPad">
                {isSubmitted ? (
                  <div className="tt-success">
                    <div className="tt-successIcon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="tt-successTitle">Message sent!</p>
                    <p className="tt-successText">We’ll get back to you as soon as possible.</p>
                  </div>
                ) : (
                  <>
                    <p className="tt-kicker">Send us a message</p>
                    <h2 className="tt-title">Contact form</h2>
                    <p className="tt-subtitle">Tell us what you need — tours, pricing, dates, or anything else.</p>

                    <form onSubmit={handleSubmit} className="tt-form">
                      <div className="tt-field">
                        <label htmlFor="name">Your Name *</label>
                        <div className="tt-inputWrap">
                          <User className="tt-inputIcon" aria-hidden="true" />
                          <input
                            className="tt-input hasIcon"
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                          />
                        </div>
                      </div>

                      <div className="tt-field">
                        <label htmlFor="email">Email Address *</label>
                        <div className="tt-inputWrap">
                          <Mail className="tt-inputIcon" aria-hidden="true" />
                          <input
                            className="tt-input hasIcon"
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      <div className="tt-field">
                        <label htmlFor="message">Your Message *</label>
                        <div className="tt-inputWrap">
                          <MessageSquare className="tt-inputIcon" aria-hidden="true" style={{ top: '22px' }} />
                          <textarea
                            className="tt-textarea hasIcon"
                            id="message"
                            name="message"
                            required
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="How can we help you?"
                          />
                        </div>
                        <p className="tt-hint">Include destination + dates if you already know them.</p>
                      </div>

                      <div className="tt-actions">
                        <button className="tt-btnPrimary" type="submit">
                          Send Message
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
