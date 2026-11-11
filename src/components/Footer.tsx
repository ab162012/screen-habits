import React from 'react';
import { DISCLAIMER_TEXT } from '../questions';

interface FooterProps {
  onNavigate: (route: string) => void;
}

/** Slim footer: no CTA block, no slogan — Menu, Team and Watch in one
    compact row, disclaimer, then a small wordmark. The YouTube link is
    a real play-badge SVG (red #FF0000 + white triangle + thin white
    ring, so the badge edge reads against the ocean footer) next to
    white "YouTube" text. The link goes to the campaign channel
    @yourscreenhabits (claimed 11 Nov 2026 — the link now resolves). */
export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-inner">
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
          <div className="footer-column">
            <span className="footer-column-label">Watch</span>
            <nav className="footer-nav-links" aria-label="Footer Social Links">
              <a
                href="https://www.youtube.com/@yourscreenhabits"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="footer-youtube-icon"
                  viewBox="0 0 30 21"
                  aria-hidden="true"
                >
                  <rect
                    x="0.75"
                    y="0.75"
                    width="28.5"
                    height="19.5"
                    rx="5"
                    fill="#FF0000"
                    stroke="#FFFFFF"
                    strokeOpacity="0.95"
                    strokeWidth="1.5"
                  />
                  <path d="M12 6.5 L20 10.5 L12 14.5 Z" fill="#FFFFFF" />
                </svg>
                YouTube
              </a>
            </nav>
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
