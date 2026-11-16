import React, { useState } from 'react';
import { PillButton } from './PillButton';
import { getInternalOwnerConfig } from '../config';

type SignupStatus = 'idle' | 'sending' | 'done' | 'error' | 'not-connected';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Newsletter signup — one compact section on Home, after the guides.
 * Email only. Posts { email, timestamp, source } as JSON to the Apps
 * Script web app URL in the owner config (config.sheetsUrl).
 * When no URL is set yet, the form says so plainly and never pretends
 * the signup was saved. No email is ever stored in localStorage.
 */
export const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<SignupStatus>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed)) {
      setStatus('error');
      return;
    }
    const sheetsUrl = getInternalOwnerConfig().sheetsUrl.trim();
    if (!sheetsUrl) {
      setStatus('not-connected');
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch(sheetsUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          email: trimmed,
          timestamp: new Date().toISOString(),
          source: 'website'
        })
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data && data.ok) {
        setStatus('done');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <section className="newsletter-section" aria-labelledby="newsletter-title">
      <h2 id="newsletter-title" className="section-headline">
        <span className="section-emoji" aria-hidden="true">📰</span> Newsletter
      </h2>
      <div className="newsletter-card">
        <p className="newsletter-line">
          Campaign updates: new videos and results.
        </p>
        {status === 'done' ? (
          <p className="newsletter-status" role="status">
            ✓ You&apos;re in. Issue 1 lands 1 December.
          </p>
        ) : (
          <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
            <input
              id="newsletter-email"
              className="newsletter-input"
              type="email"
              autoComplete="email"
              placeholder="Your email"
              aria-label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'sending'}
              required
            />
            <PillButton
              label={status === 'sending' ? 'Subscribing…' : 'Subscribe'}
              variant="primary"
              size="lg"
              type="submit"
              disabled={status === 'sending'}
            />
          </form>
        )}
        {status === 'error' && (
          <p className="newsletter-status" role="status">
            ✕ That didn&apos;t work — check your email and try again.
          </p>
        )}
        {status === 'not-connected' && (
          <p className="newsletter-status" role="status">
            Signups open soon — Issue 1 lands 1 December.
          </p>
        )}
        <p className="newsletter-note">
          Your email is only used for campaign updates.
        </p>
      </div>
    </section>
  );
};
