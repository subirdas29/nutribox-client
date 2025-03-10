import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tighter">Nutri Bite</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your premier destination for smart shopping. Discover quality products with unbeatable convenience.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-semibold uppercase text-sm tracking-wider">Shop</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/products" className="hover:text-white transition">All Products</Link></li>
                <li><Link href="/categories" className="hover:text-white transition">Categories</Link></li>
                <li><Link href="/deals" className="hover:text-white transition">Special Deals</Link></li>
                <li><Link href="/cart" className="hover:text-white transition">My Cart</Link></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold uppercase text-sm tracking-wider">Support</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/contact" className="hover:text-white transition">Contact Us</Link></li>
                <li><Link href="/faq" className="hover:text-white transition">FAQ</Link></li>
                <li><Link href="/shipping" className="hover:text-white transition">Shipping</Link></li>
                <li><Link href="/returns" className="hover:text-white transition">Returns</Link></li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold uppercase text-sm tracking-wider">Contact</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 flex-shrink-0" />
                <span>123 Shopping Street, Retail City, RC 4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>1-800-Nutri-Bite</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span>hello@nutribite.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-white/10 pt-8">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-lg font-semibold mb-4">Join Our Newsletter</h3>
            <div className="flex gap-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="px-6 py-2 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-gray-300 mt-3">
              Get 15% off your first order! Unsubscribe at any time.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>
            © {new Date().getFullYear()} Nutri Bite. All rights reserved. 
            <span className="mx-2">|</span>
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <span className="mx-2">•</span>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;