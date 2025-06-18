import { useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Send,
} from "lucide-react";
import { toast } from "sonner";

export const Footer = () => {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast("Please enter a valid email address", {
        description: "Email cannot be empty",
        duration: 3000,
        icon: "⚠️",
      });
      return;
    }

    // Simulate newsletter signup
    toast("Successfully subscribed to our newsletter!", {
      description: `You will receive updates at ${email}`,
      duration: 3000,
      icon: "📧",
    });
    setEmail("");
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              {/* <MapPin className="h-8 w-8 text-blue-400" /> */}
              <h3 className="text-2xl font-bold">
                Stay<span className="text-blue-400">Finder</span>
                <sub className="text-xs">BETA</sub>
              </h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Discover unique stays and experiences around the world. From cozy
              cabins to luxury penthouses, find your perfect accommodation with
              StayFinder. Your next adventure is just a click away.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="/lodgings"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Browse Lodgings
                </a>
              </li>
              <li>
                <a
                  href="/lodgings"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Mountain Cabins
                </a>
              </li>
              <li>
                <a
                  href="/lodgings"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Beach Houses
                </a>
              </li>
              <li>
                <a
                  href="/lodgings"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  City Apartments
                </a>
              </li>
              <li>
                <a
                  href="/lodgings"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Luxury Stays
                </a>
              </li>
            </ul>
          </div>

          {/* Account Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Account</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="/auth/login"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Sign In
                </a>
              </li>
              <li>
                <a
                  href="/auth/register"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Create Account
                </a>
              </li>
              <li>
                <a
                  href="/dashboard"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  My Bookings
                </a>
              </li>
              <li>
                <a
                  href="/host"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Become a Host
                </a>
              </li>
              <li>
                <a
                  href="/help"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Help Center
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
            <p className="text-gray-300 text-sm mb-4">
              Subscribe to our newsletter for exclusive deals and travel
              inspiration.
            </p>
            <div className="space-y-3">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleNewsletterSubmit}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-r-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center space-x-2 text-gray-300 text-sm">
                <Mail className="h-4 w-4" />
                <span>support@stayfinder.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300 text-sm">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} StayFinder. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a
                href="/privacy"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="/cookies"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
