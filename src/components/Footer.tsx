import React from 'react';

interface FooterProps {
  onNavigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="site-footer site-footer-bar" role="contentinfo">
      <div className="footer-inner-wrapper footer-inner-content">
        <nav className="footer-nav-links footer-nav-row" aria-label="Footer Navigation">
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
        <p className="footer-slogan-text footer-brand-slogan">Know your screen. Own your time.</p>
        <p className="footer-credits-text footer-credits-line footer-credits">
          Made by Abdul Basit (Leader), SJB, Ebad Ilyas
        </p>
      </div>
    </footer>
  );
};
