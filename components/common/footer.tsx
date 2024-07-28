'use client';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  // useEffect(() => {
  //   const userAgent =
  //     typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
  //   const mobile = /iPhone|iPad|iPod|Android/i.test(userAgent);
  //   setIsMobile(mobile);
  // }, []);

  if (pathname.includes('/admin')) return null;

  // Mobile-specific URL scheme
  const mobileMapUrl = `geo:0,0?q=790+Palomar+St,+Ste+B,+Chula+Vista,+CA+91911`;
  // Fallback URL for other devices
  const defaultMapUrl = `https://www.google.com/maps/search/?api=1&query=790+Palomar+St,+Ste+B,+Chula+Vista,+CA+91911`;

  if (pathname.includes('/admin')) return null;
  return (
    <footer className="bg-primary text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {/* Navigation Links */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:underline">
                  About
                </a>
              </li>
              <li>
                <a href="/services" className="hover:underline">
                  Services
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
            <ul className="flex space-x-4">
              <li>
                <a
                  href="https://www.facebook.com/oakoutletplus/"
                  className="hover:underline"
                  rel="noopener noreferrer"
                >
                  <FaFacebook style={{ color: '#1877F2' }} size={24} />
                </a>
              </li>
              {/* <li>
                <a href="#" className="hover:underline">
                  <FaTwitter
                    style={{
                      color: '#00aced',
                    }}
                    size={24}
                  />
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  <FaInstagram
                    style={{
                      color: '#cd486b',
                    }}
                    size={24}
                  />
                </a>
              </li> */}
              {/* <li>
                <a href="#" className="hover:underline">
                  <FaLinkedin
                    style={{
                      color: '#0a66c2',
                    }}
                    size={24}
                  />
                </a>
              </li> */}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
            <p>
              Email:{' '}
              <a href="mailto:info@example.com" className="hover:underline">
                Nickatz5@yahoo.com
              </a>
            </p>
            <p>
              Phone:{' '}
              <a href="tel:+6192279593" className="hover:underline">
                619-227-9593
              </a>
            </p>
            <a
              href={isMobile ? mobileMapUrl : defaultMapUrl}
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              790 Palomar St, Ste B, Chula Vista, CA 91911
            </a>
          </div>
        </div>

        {/* <div className="mt-8 text-center">
          <p>
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
