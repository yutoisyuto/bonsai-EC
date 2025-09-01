'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

const footerLinks = {
  company: [
    { label: '会社概要', href: '/about' },
    { label: 'プレス', href: '/press' },
    { label: 'パートナー', href: '/partners' }
  ],
  legal: [
    { label: 'プライバシー', href: '/privacy' },
    { label: '利用規約', href: '/terms' }
  ],
  social: [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ]
};

export default function Footer() {
  return (
    <footer className="bg-primary-900 border-t border-white/10">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">盆</span>
              </div>
              <span className="text-xl font-serif font-semibold text-white">盆栽コレクターズ</span>
            </div>
            <p className="text-white/70 mb-6 max-w-md">
              盆栽をすべての人に。世界最高の庭園から、お客様専用にお手入れされた盆栽でご自身の遺産を築きましょう。
            </p>
            <div className="flex space-x-4">
              {footerLinks.social.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-gold-500 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={20} className="text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">会社</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-white/70 hover:text-gold-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">法的情報</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-white/70 hover:text-gold-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm">
              © 2025 Bonsai Collectors Co., Ltd. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-white/60 hover:text-gold-400 text-sm transition-colors">
                プライバシーポリシー
              </Link>
              <Link href="/terms" className="text-white/60 hover:text-gold-400 text-sm transition-colors">
                利用規約
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
