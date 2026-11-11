import React, { useEffect, useRef, useState } from 'react';
import { CloseIcon, MenuIcon } from './icons';

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

  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Close the sheet whenever the route changes (covers hash changes from
  // anywhere, not just taps inside the sheet).
  useEffect(() => {
    setMenuOpen(false);
  }, [currentRoute]);

  // Close on Escape (focus back to the hamburger) and keep Tab inside the
  // open sheet; close on a tap/click anywhere outside the header.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        hamburgerRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab' || !headerRef.current) return;
      const focusable = Array.from(
        headerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        )
      ).filter((el) => el.offsetParent !== null);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [menuOpen]);

  // Move focus into the sheet when it opens.
  useEffect(() => {
    if (menuOpen) firstLinkRef.current?.focus();
  }, [menuOpen]);

  const handleNavigate = (route: string) => {
    setMenuOpen(false);
    onNavigate(route);
  };

  const isActive = (itemId: string) =>
    currentRoute === itemId ||
    (itemId === 'articles' && currentRoute.startsWith('article'));

  return (
    <header className="top-navbar" role="banner" ref={headerRef}>
      <div className="nav-bar">
        <div className="nav-bar-inner">
          <a
            href="#home"
            className="nav-brand"
            onClick={(e) => {
              e.preventDefault();
              handleNavigate('home');
            }}
          >
            <span className="brand-emoji" aria-hidden="true">📱</span>
            <span className="nav-brand-screen">Screen</span>{' '}
            <span className="nav-brand-habits">Habits</span>
          </a>
          <nav className="nav-main" aria-label="Main Navigation">
            <ul className="nav-links">
              {navItems.map((item) => {
                const active = isActive(item.id);
                return (
                  <li key={item.id} className="nav-item">
                    <a
                      href={`#${item.id}`}
                      className={active ? 'active' : ''}
                      aria-current={active ? 'page' : undefined}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigate(item.id);
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
          <button
            type="button"
            ref={hamburgerRef}
            className="nav-hamburger"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-menu-sheet" id="mobile-menu">
          <nav aria-label="Mobile Navigation">
            <ul className="mobile-menu-links">
              {navItems.map((item, i) => {
                const active = isActive(item.id);
                return (
                  <li key={item.id}>
                    <a
                      ref={i === 0 ? firstLinkRef : undefined}
                      href={`#${item.id}`}
                      className={active ? 'active' : ''}
                      aria-current={active ? 'page' : undefined}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigate(item.id);
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};
