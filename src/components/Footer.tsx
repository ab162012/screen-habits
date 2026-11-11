import React from 'react';
import { APP_SLOGAN, DISCLAIMER_TEXT } from '../questions';
import { PillButton } from './PillButton';

interface FooterProps {
  onNavigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="site-footer" role="contentinfo">
      {/* Faint hand-drawn loop scribbles, drawn fresh — decorative only. */}
      <svg className="footer-scribbles" aria-hidden="true" viewBox="0 0 1200 300" preserveAspectRatio="none">
        <path d="M60 220 C 180 120, 320 260, 430 180 S 640 120, 720 200" fill="none" stroke="#7DD3FC" strokeWidth="3" strokeLinecap="round" opacity="0.35" />
        <path d="M780 90 C 880 180, 1020 100, 1140 190" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.25" />
        <circle cx="150" cy="80" r="26" fill="none" stroke="#FFFFFF" strokeWidth="3" opacity="0.2" />
      </svg>
      <div className="footer-inner">
        <h2 className="footer-cta-heading">{APP_SLOGAN}</h2>
        <PillButton
          label="Start the Quest →"
          variant="blue"
          size="lg"
          arrow
          className="footer-cta-btn"
          onClick={() => onNavigate('quest')}
        />
        <div className="footer-columns">
          <div className="footer-column">
            <span className="footer-column-label">Menu</span>
            <nav className="footer-nav-links" aria-label="Footer Navigation">
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('home');
                }}
              >
                Home
              </a>
              <a
                href="#quest"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('quest');
                }}
              >
                Quest
              </a>
              <a
                href="#articles"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('articles');
                }}
              >
                Articles
              </a>
            </nav>
          </div>
          <div className="footer-column">
            <span className="footer-column-label">Team</span>
            <p className="footer-credits-text">
              Made by Abdul Basit (Leader), SJB, Ebad Ilyas
            </p>
          </div>
        </div>
        <p className="footer-disclaimer">{DISCLAIMER_TEXT}</p>
        <div className="footer-wordmark" aria-hidden="true">
          <span className="footer-wordmark-screen">SCREEN</span>{' '}
          <span className="footer-wordmark-habits">HABITS</span>
        </div>
      </div>
    </footer>
  );
};
