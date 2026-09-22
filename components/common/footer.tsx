import {
  Globe,
  BrainCircuit,
  Atom,
  FlaskConical,
  Wifi,
  Mail,
  MapPin,
} from 'lucide-react';

const KinetexFooter = () => {
  const domains = [
    { name: 'Quantum Computing', icon: Atom, color: 'from-green-500 to-emerald-500' },
    { name: 'Game Theory', icon: Globe, color: 'from-blue-500 to-cyan-500' },
    { name: 'AI & Machine Learning', icon: BrainCircuit, color: 'from-purple-500 to-pink-500' },
    { name: 'Research & Development', icon: FlaskConical, color: 'from-yellow-500 to-orange-500' },
    { name: 'IoT Solutions', icon: Wifi, color: 'from-red-500 to-rose-500' }
  ];

  const quickLinks = [
    { name: 'About Kinetex', href: '#about' },
    { name: 'Team', href: '#members' },
    { name: 'Resources', href: '#resources' },
    { name: 'Contact', href: '#contact' }
  ];

  const socialLinks = [
    {
      icon: Globe,
      href: 'https://www.instagram.com/kinetex_lab?igsh=bnR1cjE2NGIzYjky',
      color: 'hover:bg-gradient-to-tr hover:from-pink-500 hover:to-purple-600',
      name: 'Instagram'
    },
    {
      icon: Mail,
      href: 'https://www.linkedin.com/in/kinetex-lab-0a9287381?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
      color: 'hover:bg-gradient-to-tr hover:from-blue-600 hover:to-blue-800',
      name: 'LinkedIn'
    },
  ];

  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/20 to-teal-900/30"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 50%), 
                           radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
                           radial-gradient(circle at 40% 60%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)`
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand section */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-teal-400 bg-clip-text text-transparent">
                  Kinetex Lab
                </h3>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                A hub of innovation, learning, and collaboration where brilliant minds come together to create impactful solutions for tomorrow&apos;s challenges.
              </p>
            </div>
            
            {/* Contact info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-300">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span className="text-sm">Bhubaneswar, Odisha, India</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-300">
                <Mail className="w-4 h-4 text-purple-400" />
                <span className="text-sm">kinetexlab.cse@kiit.ac.in</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}

          <div className="space-y-6 hidden lg:block">
            <h4 className="text-lg font-semibold text-white relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-all duration-300 text-sm flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 mr-0 group-hover:mr-3 transition-all duration-300 rounded-full"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Domains */}
          <div className="space-y-6  hidden lg:block">
            <h4 className="text-lg font-semibold text-white relative inline-block">
              Our Domains
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-green-500 to-teal-500 rounded-full"></span>
            </h4>
            <ul className="space-y-3">
              {domains.map((domain, index) => {
                const IconComponent = domain.icon;
                return (
                  <li key={index} className="group">
                    <div className="flex items-center space-x-3 text-gray-400 hover:text-white transition-all duration-300 cursor-pointer">
                      <div className={`w-8 h-8 bg-gray-800 group-hover:bg-gradient-to-r group-hover:${domain.color} rounded-lg flex items-center justify-center transition-all duration-300 transform group-hover:scale-110`}>
                        <IconComponent size={14} className="group-hover:text-white" />
                      </div>
                      <span className="text-sm">{domain.name}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            {/* Social links */}
            <div className="space-y-4">
              <h5 className="text-sm font-medium text-white">Follow Us</h5>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`
                        w-10 h-10 flex items-center justify-center rounded-lg
                        bg-gray-900/50 hover:bg-gray-800 text-gray-400 hover:text-white
                        transition-all duration-300 transform hover:scale-110 hover:-translate-y-1
                        border border-gray-700 hover:border-transparent
                        ${social.color}
                      `}
                      title={social.name}
                    >
                      <IconComponent size={18} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <div className="text-gray-400 text-sm">
                ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â© 2025 Kinetex Lab. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default KinetexFooter;