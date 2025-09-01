'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, User, ShoppingCart } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-primary-900/95 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0" onClick={closeMenu}>
            <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">盆</span>
            </div>
            <span className="text-lg sm:text-xl font-serif font-semibold text-white whitespace-nowrap">
              盆栽コレクターズ
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/collection" className="text-white/80 hover:text-gold-400 transition-colors">
              コレクション
            </Link>
            <Link href="/auction" className="text-white/80 hover:text-gold-400 transition-colors">
              オークション
            </Link>
            <Link href="/events" className="text-white/80 hover:text-gold-400 transition-colors">
              イベント
            </Link>
            <Link href="/about" className="text-white/80 hover:text-gold-400 transition-colors">
              会社概要
            </Link>
            <Link href="/contact" className="text-white/80 hover:text-gold-400 transition-colors">
              お問い合わせ
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4 flex-shrink-0">
            <button className="text-white/80 hover:text-gold-400 transition-colors" aria-label="アカウント">
              <User size={20} />
            </button>
            <button className="text-white/80 hover:text-gold-400 transition-colors" aria-label="カート">
              <ShoppingCart size={20} />
            </button>
            <Link href="/dashboard" className="btn-secondary whitespace-nowrap">
              ログイン
            </Link>
            <Link href="/register" className="btn-primary whitespace-nowrap">
              コレクションを始める
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white flex-shrink-0"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label="メニュー"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Backdrop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div id="mobile-menu" className="fixed top-20 inset-x-0 bottom-0 z-50 lg:hidden bg-primary-900/95 backdrop-blur-md border-t border-white/10 overflow-y-auto">
          <nav className="py-6 space-y-2">
            <Link href="/collection" onClick={closeMenu} className="block px-6 py-3 text-lg text-white/90 hover:text-gold-400 transition-colors">
              コレクション
            </Link>
            <Link href="/auction" onClick={closeMenu} className="block px-6 py-3 text-lg text-white/90 hover:text-gold-400 transition-colors">
              オークション
            </Link>
            <Link href="/events" onClick={closeMenu} className="block px-6 py-3 text-lg text-white/90 hover:text-gold-400 transition-colors">
              イベント
            </Link>
            <Link href="/about" onClick={closeMenu} className="block px-6 py-3 text-lg text-white/90 hover:text-gold-400 transition-colors">
              会社概要
            </Link>
            <Link href="/contact" onClick={closeMenu} className="block px-6 py-3 text-lg text-white/90 hover:text-gold-400 transition-colors">
              お問い合わせ
            </Link>
            <div className="pt-4 space-y-3 px-6">
              <Link href="/dashboard" onClick={closeMenu} className="block btn-secondary text-center">
                ログイン
              </Link>
              <Link href="/register" onClick={closeMenu} className="block btn-primary text-center">
                コレクションを始める
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
