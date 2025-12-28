import { Mail, Phone, MapPin, Facebook, Instagram, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Address */}
          <div className="flex items-start space-x-3">
            <MapPin className="text-green-500 flex-shrink-0 mt-1" size={20} />
            <div>
              <p>Model Town, Lahore, Pakistan</p>
            </div>
          </div>

          {/* Phone Numbers */}
          <div className="flex items-start space-x-3">
            <Phone className="text-green-500 flex-shrink-0 mt-1" size={20} />
            <div>
              <p>+92 305 1112255</p>
              <p>+971 55 488 4268</p>
              <p>+44 7863 226865</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start space-x-3">
            <Mail className="text-green-500 flex-shrink-0 mt-1" size={20} />
            <div>
              <p>info@totallytravels.com</p>
            </div>
          </div>
        </div>
{/* Social Media */}
<div className="flex items-start space-x-6 mb-6">
  
  {/* Column label */}
  <div>
    <p className="text-gray-300 mb-3 font-medium">Connect with us</p>

    <div className="space-y-2 text-gray-400">

      {/* Facebook */}
      <a
        href="https://www.facebook.com/share/1BajL4Achs/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-2 hover:text-green-300"
      >
        <Facebook size={18} className="text-green-400" />
        <span>Facebook</span>
      </a>

      {/* Instagram */}
      <a
        href="https://www.instagram.com/travelstotally?utm_source=qr&amp;igsh=MW50bzk3eXF2em45eA=="
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-2 hover:text-green-300"
      >
        <Instagram size={18} className="text-green-400" />
        <span>Instagram</span>
      </a>

      {/* WhatsApp */}
      <a
        href="https://wa.me/923051112255"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-2 hover:text-green-300"
      >
        <MessageCircle size={18} className="text-green-400" />
        <span>WhatsApp: +92 305 1112255</span>
      </a>

    </div>
  </div>

</div>


        {/* Copyright */}
        <div className="border-t border-gray-700 pt-6 text-center text-gray-400">
          <p>© 2025 Totally Travels</p>
        </div>
      </div>
    </footer>
  );
}
