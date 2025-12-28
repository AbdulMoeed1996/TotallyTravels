import { useMemo, useRef, useState, useEffect } from 'react';
import { Hero } from '../components/Hero';
import {
  Calendar,
  Users,
  MapPin,
  User,
  Mail,
  Phone,
  ShieldCheck,
  Clock3,
  MessageCircle,
  ChevronDown,
} from 'lucide-react';
import '../styles/forms.css';

type FieldKey =
  | 'name'
  | 'email'
  | 'phone'
  | 'destinations'
  | 'customDestinationName'
  | 'startDate'
  | 'endDate'
  | 'numberOfPeople'
  | 'message';

type Errors = Partial<Record<FieldKey, string>>;

export function BookYourTour() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destinations: [] as string[],
    customDestinationName: '',
    startDate: '',
    endDate: '',
    numberOfPeople: '1',
    message: '',
  });

  const [errors, setErrors] = useState<Errors>({});
  const [submitError, setSubmitError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [destinationsOpen, setDestinationsOpen] = useState(false);
  const destinationsRef = useRef<HTMLDivElement | null>(null);

  // Refs to support browser autofill (autofill may not trigger onChange)
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const startDateRef = useRef<HTMLInputElement | null>(null);
  const endDateRef = useRef<HTMLInputElement | null>(null);
  const peopleRef = useRef<HTMLInputElement | null>(null);
  const customDestRef = useRef<HTMLInputElement | null>(null);
  const messageRef = useRef<HTMLTextAreaElement | null>(null);

  const destinations = useMemo(
    () => [
      'Fairy Meadows',
      'Hunza Valley',
      'Skardu Valley',
      'Swat Valley',
      'Neelum Valley',
      'Lahore Heritage',
      'Custom Destination',
    ],
    []
  );

  const clearError = (key: FieldKey) => {
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (
      name === 'name' ||
      name === 'email' ||
      name === 'phone' ||
      name === 'customDestinationName' ||
      name === 'startDate' ||
      name === 'endDate' ||
      name === 'numberOfPeople' ||
      name === 'message'
    ) {
      clearError(name as FieldKey);
    }

    if (submitError) setSubmitError('');
  };

  const toggleDestination = (dest: string) => {
    setFormData((prev) => {
      const exists = prev.destinations.includes(dest);
      const next = exists ? prev.destinations.filter((d) => d !== dest) : [...prev.destinations, dest];

      const customRemoved = dest === 'Custom Destination' && exists;

      return {
        ...prev,
        destinations: next,
        customDestinationName: customRemoved ? '' : prev.customDestinationName,
      };
    });

    clearError('destinations');
    if (dest === 'Custom Destination') clearError('customDestinationName');
    if (submitError) setSubmitError('');
  };

  // close dropdown on outside click
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!destinationsRef.current) return;
      if (!destinationsRef.current.contains(e.target as Node)) {
        setDestinationsOpen(false);
      }
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  const apiBase = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:3001';

  const buildDestinationStringFrom = (data: typeof formData) => {
    const hasCustom = data.destinations.includes('Custom Destination');
    const cleaned = data.destinations.filter((d) => d !== 'Custom Destination');

    if (hasCustom) {
      const custom = (data.customDestinationName || '').trim();
      if (custom) cleaned.push(custom);
    }

    return cleaned.join(', ');
  };

  const parseMissingFields = (msg?: string): string[] => {
    if (!msg) return [];
    const m = msg.match(/Missing required fields:\s*(.*)$/i);
    if (!m || !m[1]) return [];
    return m[1]
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
  };

  const hydrateFromDom = (): typeof formData => {
    const domName = nameRef.current?.value ?? '';
    const domEmail = emailRef.current?.value ?? '';
    const domPhone = phoneRef.current?.value ?? '';
    const domStart = startDateRef.current?.value ?? '';
    const domEnd = endDateRef.current?.value ?? '';
    const domPeople = peopleRef.current?.value ?? formData.numberOfPeople;
    const domCustom = customDestRef.current?.value ?? '';
    const domMsg = messageRef.current?.value ?? '';

    const merged = {
      ...formData,
      name: domName || formData.name,
      email: domEmail || formData.email,
      phone: domPhone || formData.phone,
      startDate: domStart || formData.startDate,
      endDate: domEnd || formData.endDate,
      numberOfPeople: domPeople || formData.numberOfPeople,
      customDestinationName: domCustom || formData.customDestinationName,
      message: domMsg || formData.message,
    };

    setFormData(merged);
    return merged;
  };

  // Try to capture autofill shortly after mount too (some browsers autofill after paint)
  useEffect(() => {
    const t1 = window.setTimeout(() => hydrateFromDom(), 200);
    const t2 = window.setTimeout(() => hydrateFromDom(), 900);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validate = (data: typeof formData): Errors => {
    const nextErrors: Errors = {};

    if (!data.name.trim()) nextErrors.name = 'Full Name is required.';
    if (!data.email.trim()) nextErrors.email = 'Email Address is required.';
    if (!data.phone.trim()) nextErrors.phone = 'Phone Number is required.';

    if (!data.startDate) nextErrors.startDate = 'Start Date is required.';
    if (!data.endDate) nextErrors.endDate = 'End Date is required.';

    if (data.startDate && data.endDate && data.endDate < data.startDate) {
      nextErrors.endDate = 'End Date cannot be earlier than Start Date.';
    }

    const peopleNum = Number(data.numberOfPeople);
    if (!data.numberOfPeople || Number.isNaN(peopleNum) || peopleNum < 1) {
      nextErrors.numberOfPeople = 'Number of People must be at least 1.';
    }

    if (!data.destinations || data.destinations.length === 0) {
      nextErrors.destinations = 'Please select at least one destination.';
    }

    if (data.destinations.includes('Custom Destination') && !data.customDestinationName.trim()) {
      nextErrors.customDestinationName = 'Please enter your custom destination name.';
    }

    return nextErrors;
  };

  const applyBackendMissingErrors = (missing: string[]) => {
    const mapped: Errors = {};

    for (const f of missing) {
      const key = f.toLowerCase();

      if (key === 'name') mapped.name = 'Full Name is required.';
      else if (key === 'email') mapped.email = 'Email Address is required.';
      else if (key === 'phone') mapped.phone = 'Phone Number is required.';
      else if (key === 'destinations' || key === 'destination') {
        mapped.destinations = 'Please select at least one destination.';
      } else if (key === 'dates') {
        mapped.startDate = mapped.startDate || 'Start Date is required.';
        mapped.endDate = mapped.endDate || 'End Date is required.';
      } else if (key === 'startdate' || key === 'start_date') mapped.startDate = 'Start Date is required.';
      else if (key === 'enddate' || key === 'end_date') mapped.endDate = 'End Date is required.';
      else if (key === 'traveler' || key === 'travelers') {
        mapped.numberOfPeople = 'Number of People is required.';
      }
    }

    if (Object.keys(mapped).length > 0) {
      setErrors((prev) => ({ ...prev, ...mapped }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    const hydrated = hydrateFromDom();

    const nextErrors = validate(hydrated);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitError('Please fix the highlighted fields below.');
      return;
    }

    const destinationsText = buildDestinationStringFrom(hydrated);
    const travelers = Number(hydrated.numberOfPeople);

    // Send a backend-friendly payload (covers different backend expectations)
    const payload: any = {
      name: hydrated.name.trim(),
      email: hydrated.email.trim(),
      phone: hydrated.phone.trim(),

      destinations: destinationsText,
      destination: destinationsText,

      dates: {
        startDate: hydrated.startDate,
        endDate: hydrated.endDate,
      },

      travelers,
      traveler: travelers,

      startDate: hydrated.startDate,
      endDate: hydrated.endDate,
      numberOfPeople: travelers,
      message: hydrated.message || '',

      destinationsRaw: hydrated.destinations,
      customDestinationName: hydrated.customDestinationName || '',
    };

    try {
      setIsSubmitting(true);

      const response = await fetch(`${apiBase}/api/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      let data: any = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok || (data && data.success === false)) {
        const msg =
          (data && (data.error || data.message)) ||
          `Request failed with status ${response.status}.`;

        const missing = parseMissingFields(msg);
        if (missing.length > 0) {
          applyBackendMissingErrors(missing);
          setSubmitError('Please complete the highlighted fields and submit again.');
        } else {
          setSubmitError(msg);
        }

        return;
      }

      setIsSubmitted(true);
      setErrors({});
      setSubmitError('');
      setDestinationsOpen(false);

      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          destinations: [],
          customDestinationName: '',
          startDate: '',
          endDate: '',
          numberOfPeople: '1',
          message: '',
        });
      }, 2200);
    } catch (error: any) {
      setSubmitError(error?.message || 'Could not submit the request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedLabelFull = (() => {
    if (formData.destinations.length === 0) return '';

    const hasCustom = formData.destinations.includes('Custom Destination');
    const items = formData.destinations.filter((d) => d !== 'Custom Destination');

    if (hasCustom) {
      const custom = formData.customDestinationName.trim();
      items.push(custom ? custom : 'Custom Destination');
    }

    return items.join(', ');
  })();

  const selectedLabelCompact = (() => {
    if (formData.destinations.length === 0) return '';

    const hasCustom = formData.destinations.includes('Custom Destination');
    const items = formData.destinations.filter((d) => d !== 'Custom Destination');

    if (hasCustom) {
      const custom = formData.customDestinationName.trim();
      items.push(custom ? custom : 'Custom Destination');
    }

    if (items.length === 1) return items[0];
    if (items.length === 2) return `${items[0]}, ${items[1]}`;
    return `${items[0]}, ${items[1]} + ${items.length - 2} more`;
  })();

  const errorTextStyle: React.CSSProperties = {
    color: '#dc2626',
    fontSize: 12,
    marginTop: 6,
    lineHeight: 1.3,
  };

  const errorBorderStyle: React.CSSProperties = {
    borderColor: '#dc2626',
    boxShadow: '0 0 0 3px rgba(220, 38, 38, 0.14)',
  };

  return (
    <div>
      <Hero
        backgroundImage="https://images.unsplash.com/photo-1692685820422-61b43dff3fca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2VuaWMlMjB0cmF2ZWwlMjBhZHZlbnR1cmV8ZW58MXx8fHwxNzYzNTUyNjM3fDA&ixlib=rb-4.1.0&q=80&w=1080"
        title="Book Your Tour"
        subtitle="Tell us what you want, we’ll plan the rest."
        height="medium"
      />

      <section className="tt-pageSection tt-pageSection--soft">
        <div className="tt-container">
          <div className="tt-grid2">
            <div className="tt-card">
              <div className="tt-cardPad">
                <p className="tt-kicker">How it works</p>
                <h2 className="tt-title">A smooth booking, start to finish.</h2>
                <p className="tt-subtitle">
                  Share your preferred dates and destination, we’ll confirm availability and fine-tune a plan that
                  fits your budget, pace, and style.
                </p>

                <div className="tt-divider" />

                <div className="tt-infoList">
                  <div className="tt-infoRow">
                    <div className="tt-iconPill">
                      <ShieldCheck className="tt-icon" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="tt-infoLabel">Clear confirmation</p>
                      <p className="tt-infoText">We call or email to confirm details before anything is finalized.</p>
                    </div>
                  </div>

                  <div className="tt-infoRow">
                    <div className="tt-iconPill">
                      <Clock3 className="tt-icon" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="tt-infoLabel">Fast response</p>
                      <p className="tt-infoText">Expect a response within 24–48 hours (usually sooner).</p>
                    </div>
                  </div>

                  <div className="tt-infoRow">
                    <div className="tt-iconPill">
                      <MessageCircle className="tt-icon" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="tt-infoLabel">Need quick help?</p>
                      <p className="tt-infoText">
                        WhatsApp us:{' '}
                        <a className="tt-link" href="https://wa.me/923051112255" target="_blank" rel="noreferrer">
                          +92 305 1112255
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                <p className="tt-hint">
                  Tip: If you choose <b>Custom Destination</b>, mention any must-see areas in “Additional Requirements”
                  too.
                </p>
              </div>
            </div>

            <div className="tt-card">
              <div className="tt-cardPad">
                {isSubmitted ? (
                  <div className="tt-success">
                    <div className="tt-successIcon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="tt-successTitle">Request received!</p>
                    <p className="tt-successText">
                      Thanks for reaching out — we’ll contact you shortly to confirm your tour details.
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="tt-kicker">Reserve your adventure</p>
                    <h2 className="tt-title">Booking request</h2>
                    <p className="tt-subtitle">
                      Fill this out and our team will get back to you to finalize everything.
                    </p>

                    {submitError ? (
                      <div
                        style={{
                          marginTop: 14,
                          marginBottom: 14,
                          padding: '10px 12px',
                          borderRadius: 12,
                          background: 'rgba(220, 38, 38, 0.08)',
                          border: '1px solid rgba(220, 38, 38, 0.25)',
                          color: '#b91c1c',
                          fontSize: 13,
                        }}
                      >
                        {submitError}
                      </div>
                    ) : null}

                    <form onSubmit={handleSubmit} className="tt-form" noValidate>
                      <div className="tt-field">
                        <label htmlFor="name">Full Name *</label>
                        <div className="tt-inputWrap">
                          <User className="tt-inputIcon" aria-hidden="true" />
                          <input
                            ref={nameRef}
                            className="tt-input hasIcon"
                            style={errors.name ? errorBorderStyle : undefined}
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            autoComplete="name"
                            aria-invalid={Boolean(errors.name)}
                          />
                        </div>
                        {errors.name ? <div style={errorTextStyle}>{errors.name}</div> : null}
                      </div>

                      <div className="tt-field">
                        <label htmlFor="email">Email Address *</label>
                        <div className="tt-inputWrap">
                          <Mail className="tt-inputIcon" aria-hidden="true" />
                          <input
                            ref={emailRef}
                            className="tt-input hasIcon"
                            style={errors.email ? errorBorderStyle : undefined}
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            autoComplete="email"
                            aria-invalid={Boolean(errors.email)}
                          />
                        </div>
                        {errors.email ? <div style={errorTextStyle}>{errors.email}</div> : null}
                      </div>

                      <div className="tt-field">
                        <label htmlFor="phone">Phone Number *</label>
                        <div className="tt-inputWrap">
                          <Phone className="tt-inputIcon" aria-hidden="true" />
                          <input
                            ref={phoneRef}
                            className="tt-input hasIcon"
                            style={errors.phone ? errorBorderStyle : undefined}
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+92 300 1234567"
                            autoComplete="tel"
                            aria-invalid={Boolean(errors.phone)}
                          />
                        </div>
                        {errors.phone ? <div style={errorTextStyle}>{errors.phone}</div> : null}
                      </div>

                      <div className="tt-field" ref={destinationsRef}>
                        <label>Preferred Destinations *</label>

                        <div className="tt-msWrap">
                          <div className="tt-inputWrap">
                            <MapPin className="tt-inputIcon" aria-hidden="true" />

                            <button
                              type="button"
                              className="tt-msButton hasIcon"
                              style={errors.destinations ? errorBorderStyle : undefined}
                              onClick={() => setDestinationsOpen((v) => !v)}
                              aria-expanded={destinationsOpen}
                              title={selectedLabelFull || 'Select one or more destinations'}
                            >
                              {selectedLabelCompact ? (
                                <span
                                  className="tt-msValue"
                                  style={{
                                    minWidth: 0,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    display: 'block',
                                    flex: 1,
                                  }}
                                >
                                  {selectedLabelCompact}
                                </span>
                              ) : (
                                <span
                                  className="tt-msPlaceholder"
                                  style={{
                                    minWidth: 0,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    display: 'block',
                                    flex: 1,
                                  }}
                                >
                                  Select one or more destinations
                                </span>
                              )}
                              <ChevronDown className="tt-msChevron" aria-hidden="true" />
                            </button>
                          </div>

                          {errors.destinations ? <div style={errorTextStyle}>{errors.destinations}</div> : null}

                          {destinationsOpen && (
                            <div className="tt-msPanel">
                              {destinations.map((dest) => {
                                const checked = formData.destinations.includes(dest);
                                return (
                                  <label key={dest} className={`tt-msOption ${checked ? 'isChecked' : ''}`}>
                                    <input
                                      type="checkbox"
                                      className="tt-msCheckbox"
                                      checked={checked}
                                      onChange={() => toggleDestination(dest)}
                                    />
                                    <span className="tt-msOptionText">{dest}</span>
                                  </label>
                                );
                              })}

                              {formData.destinations.includes('Custom Destination') && (
                                <div className="tt-msCustomBox">
                                  <div className="tt-field" style={{ margin: 0 }}>
                                    <label htmlFor="customDestinationName" style={{ marginBottom: 6 }}>
                                      Enter custom destination name *
                                    </label>
                                    <input
                                      ref={customDestRef}
                                      className="tt-input"
                                      style={errors.customDestinationName ? errorBorderStyle : undefined}
                                      id="customDestinationName"
                                      name="customDestinationName"
                                      value={formData.customDestinationName}
                                      onChange={handleChange}
                                      placeholder="e.g., Murree, Kashmir, Chitral..."
                                      aria-invalid={Boolean(errors.customDestinationName)}
                                    />
                                    {errors.customDestinationName ? (
                                      <div style={errorTextStyle}>{errors.customDestinationName}</div>
                                    ) : null}
                                  </div>
                                </div>
                              )}

                              <p className="tt-msHelper">
                                Tip: You can select multiple destinations. Click outside to close.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="tt-row2">
                        <div className="tt-field">
                          <label htmlFor="startDate">Start Date *</label>
                          <div className="tt-inputWrap">
                            <Calendar className="tt-inputIcon" aria-hidden="true" />
                            <input
                              ref={startDateRef}
                              className="tt-input hasIcon"
                              style={errors.startDate ? errorBorderStyle : undefined}
                              type="date"
                              id="startDate"
                              name="startDate"
                              required
                              value={formData.startDate}
                              onChange={handleChange}
                              aria-invalid={Boolean(errors.startDate)}
                            />
                          </div>
                          {errors.startDate ? <div style={errorTextStyle}>{errors.startDate}</div> : null}
                        </div>

                        <div className="tt-field">
                          <label htmlFor="endDate">End Date *</label>
                          <div className="tt-inputWrap">
                            <Calendar className="tt-inputIcon" aria-hidden="true" />
                            <input
                              ref={endDateRef}
                              className="tt-input hasIcon"
                              style={errors.endDate ? errorBorderStyle : undefined}
                              type="date"
                              id="endDate"
                              name="endDate"
                              required
                              value={formData.endDate}
                              onChange={handleChange}
                              aria-invalid={Boolean(errors.endDate)}
                            />
                          </div>
                          {errors.endDate ? <div style={errorTextStyle}>{errors.endDate}</div> : null}
                        </div>
                      </div>

                      <div className="tt-field">
                        <label htmlFor="numberOfPeople">Number of People *</label>
                        <div className="tt-inputWrap">
                          <Users className="tt-inputIcon" aria-hidden="true" />
                          <input
                            ref={peopleRef}
                            className="tt-input hasIcon"
                            style={errors.numberOfPeople ? errorBorderStyle : undefined}
                            type="number"
                            id="numberOfPeople"
                            name="numberOfPeople"
                            required
                            min="1"
                            value={formData.numberOfPeople}
                            onChange={handleChange}
                            aria-invalid={Boolean(errors.numberOfPeople)}
                          />
                        </div>
                        {errors.numberOfPeople ? <div style={errorTextStyle}>{errors.numberOfPeople}</div> : null}
                      </div>

                      <div className="tt-field">
                        <label htmlFor="message">Additional Requirements (Optional)</label>
                        <textarea
                          ref={messageRef}
                          className="tt-textarea"
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Any special preferences, hotel type, transport needs, places you must see, etc."
                        />
                      </div>

                      <div className="tt-actions">
                        <button className="tt-btnPrimary" type="submit" disabled={isSubmitting}>
                          {isSubmitting ? 'Submitting…' : 'Submit Booking Request'}
                        </button>
                        <p className="tt-hint">
                          By submitting, you’re requesting a callback/confirmation — no payment is taken here.
                        </p>
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

export default BookYourTour;
