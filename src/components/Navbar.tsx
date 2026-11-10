import React from 'react';
import { PillButton } from './PillButton';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate }) => {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'quest', label: 'Quest' },
    { id: 'result', label: 'Result' },
    { id: 'articles', label: 'Articles' }
  ];

  return (
    <header className="top-navbar" role="banner">
      <div className="nav-pill">
        <nav className="nav-main" aria-label="Main Navigation">
          <ul className="nav-links">
            {navItems.map((item) => {
              const isActive =
                currentRoute === item.id ||
                (item.id === 'articles' && currentRoute.startsWith('article'));
              return (
                <li key={item.id} className="nav-item">
                  <a
                    href={`#${item.id}`}
                    className={isActive ? 'active' : ''}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(item.id);
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <a
          href="#home"
          className="nav-brand"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('home');
          }}
        >
          <span className="brand-emoji" aria-hidden="true">📱</span>
          <span>Screen Habits</span>
        </a>
        <span className="nav-cta">
          <PillButton
            label="Start Quest →"
            variant="primary"
            size="lg"
            arrow
            onClick={() => onNavigate('quest')}
          />
        </span>
      </div>
    </header>
  );
};
