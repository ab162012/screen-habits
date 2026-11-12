import React from 'react';
import { DISCLAIMER_TEXT } from '../questions';

interface FooterProps {
  onNavigate: (route: string) => void;
}

/** ecomwebs-format footer: a 12-column grid — Brand 5 / Menu 2 / Team 3 /
    Watch 2 — over a divider, then a bottom bar with © left and the
    disclaimer right. That is the structure of ecomwebs.pk's footer
    (white ground, top border, brand column with wordmark + description,
    uppercase section headings, stacked links, divider, bottom bar with
    copyright + secondary text) — kept here in our ocean identity, with
    our own links, team and YouTube channel. The YouTube link is the
    same real play-badge SVG (red #FF0000 + white triangle + thin white
    ring, so the badge edge reads against the ocean footer) next to
    white "YouTube" text, to the campaign channel @yourscreenhabits.
    Team credits now name all four members (Haider was missing and
    "SJB" is written out as Salaar Javed Butt, matching the campaign
    documents). Bottom padding stays 88px: the fixed pill occupies
    76px desktop / 72px phone, so the bottom bar clears it by 12px /
    16px at max scroll. */
export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-wordmark" aria-hidden="true">
              <span className="footer-wordmark-screen">SCREEN</span>{' '}
              <span className="footer-wordmark-habits">HABITS</span>
            </div>
            <p className="footer-brand-desc">
              A student campaign about healthier screen habits.
            </p>
          </div>
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
              Made by Abdul Basit (Leader), Haider, Ebadullah Ilyas, Salaar
              Javed Butt
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
        <div className="footer-bottom">
          <p className="footer-copy">© {year} Screen Habits</p>
          <p className="footer-disclaimer">{DISCLAIMER_TEXT}</p>
        </div>
      </div>
    </footer>
  );
};
