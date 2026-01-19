import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';
import { artistInfo, bookingPackages, bookingPackages2 } from '../data/mock';
import { useToast } from '../hooks/use-toast';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('kavee'); // Tab state for packages

  // EmailJS Configuration
  const EMAILJS_SERVICE_ID = process.env.VITE_EMAILJS_SERVICE_ID || 'service_rqvyl3s' ;
  const EMAILJS_TEMPLATE_ID = process.env.VITE_EMAILJS_TEMPLATE_ID || 'template_znctipu';
  const EMAILJS_PUBLIC_KEY = process.env.VITE_EMAILJS_PUBLIC_KEY || 's-M-UdtOjy8GrCgUh';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target. name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare template parameters for EmailJS
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone || 'Not provided',
      event_date:  formData.eventDate,
      service: formData.service,
      message: formData. message,
      to_email: artistInfo.email, // Your email address
    };

    try {
      // Send email using EmailJS
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      console.log('Email sent successfully:', response.status, response.text);

      // Show success toast
      toast({
        title: "Booking Request Sent! ",
        description: "Thank you for your interest.  I'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        eventDate: '',
        service: '',
        message: '',
      });
    } catch (error) {
      console.error('Failed to send email:', error);
      
      // Show error toast
      toast({
        title: "Error Sending Request",
        description: "Something went wrong. Please try again or contact us directly.",
        variant: "destructive",
      });
    } 
    finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a]">
      <div className="container mx-auto px-4 sm:px-6 lg: px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
            style={{ fontFamily: 'Bebas Neue, sans-serif', color: '#d4af37' }}
          >
            Book Now
          </h2>
          <p
            className="text-lg text-gray-400 max-w-2xl mx-auto"
            style={{ fontFamily:  'Poppins, sans-serif' }}
          >
            Let's create an unforgettable musical experience for your event
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x:  0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl p-8"
            style={{
              background: 'linear-gradient(135deg, #2b1810 0%, #1a1a1a 100%)',
              border: '2px solid #d4af37',
            }}
          >
            <h3
              className="text-2xl font-bold mb-6"
              style={{ fontFamily:  'Poppins, sans-serif', color: '#f5c842' }}
            >
              Booking Request
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2 text-gray-300"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-black/50 border border-[#d4af37]/30 text-white focus:border-[#d4af37] focus:outline-none transition-colors duration-200"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2 text-gray-300"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData. email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-black/50 border border-[#d4af37]/30 text-white focus: border-[#d4af37] focus:outline-none transition-colors duration-200"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium mb-2 text-gray-300"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-black/50 border border-[#d4af37]/30 text-white focus:border-[#d4af37] focus:outline-none transition-colors duration-200"
                    style={{ fontFamily:  'Poppins, sans-serif' }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="eventDate"
                    className="block text-sm font-medium mb-2 text-gray-300"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    Event Date *
                  </label>
                  <input
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-black/50 border border-[#d4af37]/30 text-white focus:border-[#d4af37] focus:outline-none transition-colors duration-200"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="service"
                    className="block text-sm font-medium mb-2 text-gray-300"
                    style={{ fontFamily:  'Poppins, sans-serif' }}
                  >
                    Service Type *
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-black/50 border border-[#d4af37]/30 text-white focus:border-[#d4af37] focus:outline-none transition-colors duration-200"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    <option value="">Select a service</option>
                    <option value="Live Jazz Performance">Live Jazz Performance</option>
                    <option value="DJ sAx Progressive House">DJ sAx Progressive House</option>
                    <option value="Premium Entertainment Package">Premium Entertainment Package</option>
                    <option value="Custom Package">Custom Package</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2 text-gray-300"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData. message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-black/50 border border-[#d4af37]/30 text-white focus:border-[#d4af37] focus:outline-none transition-colors duration-200 resize-none"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                  placeholder="Tell me about your event..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center px-6 py-4 rounded-full font-bold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: '#d4af37',
                  color: '#0a0a0a',
                  fontFamily: 'Poppins, sans-serif',
                }}
                onMouseEnter={(e) => {
                  if (! isSubmitting) {
                    e.target.style.backgroundColor = '#f5c842';
                    e.target.style.boxShadow = '0 8px 24px rgba(212, 175, 55, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#d4af37';
                  e.target.style.boxShadow = 'none';
                }}
              >
                {isSubmitting ?  (
                  <>
                    <div className="animate-spin mr-2 h-5 w-5 border-2 border-black border-t-transparent rounded-full" />
                    Sending... 
                  </>
                ) : (
                  <>
                    Send Request
                    <Send size={20} className="ml-2" />
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Contact Info & Packages */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Contact Information */}
            <div
              className="rounded-2xl p-8"
              style={{
                background:  'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
                border: '2px solid #d4af37',
              }}
            >
              <h3
                className="text-2xl font-bold mb-6"
                style={{ fontFamily: 'Poppins, sans-serif', color: '#f5c842' }}
              >
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail size={24} className="mr-4 mt-1" style={{ color: '#d4af37' }} />
                  <div>
                    <p
                      className="text-gray-400 text-sm mb-1"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      Email
                    </p>
                    <a
                      href={`mailto:${artistInfo.email}`}
                      className="text-white hover:text-[#d4af37] transition-colors duration-200"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {artistInfo. email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone size={24} className="mr-4 mt-1" style={{ color: '#d4af37' }} />
                  <div>
                    <p
                      className="text-gray-400 text-sm mb-1"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      Phone
                    </p>
                    <a
                      href={`tel:${artistInfo.phone}`}
                      className="text-white hover:text-[#d4af37] transition-colors duration-200"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {artistInfo.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin size={24} className="mr-4 mt-1" style={{ color: '#d4af37' }} />
                  <div>
                    <p
                      className="text-gray-400 text-sm mb-1"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      Location
                    </p>
                    <p
                      className="text-white"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      Colombo, Sri Lanka
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Packages */}
            <div
              className="rounded-2xl p-8"
              style={{
                background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
                border: '2px solid #d4af37',
              }}
            >
              <h3
                className="text-2xl font-bold mb-6"
                style={{ fontFamily: 'Poppins, sans-serif', color: '#f5c842' }}
              >
                Package Pricing
              </h3>
              
              {/* Tabs */}
              <div className="flex space-x-2 mb-6">
                <button
                  onClick={() => setActiveTab('kavee')}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                    activeTab === 'kavee'
                      ? 'bg-[#d4af37] text-black'
                      : 'bg-black/30 text-gray-400 hover:bg-black/50'
                  }`}
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Kavee Sax
                </button>
                <button
                  onClick={() => setActiveTab('breeze')}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                    activeTab === 'breeze'
                      ? 'bg-[#d4af37] text-black'
                      : 'bg-black/30 text-gray-400 hover:bg-black/50'
                  }`}
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Breeze Band
                </button>
              </div>

              {/* Package Content */}
              <div className="space-y-6">
                {(activeTab === 'kavee' ? bookingPackages : bookingPackages2).map((pkg) => (
                  <div key={pkg.id} className="border-b border-[#d4af37]/20 pb-6 last:border-0 last:pb-0">
                    <h4
                      className="text-lg font-bold mb-2"
                      style={{ fontFamily: 'Poppins, sans-serif', color: '#f5f5f5' }}
                    >
                      {pkg.name}
                    </h4>
                    <p
                      className="text-[#d4af37] font-bold mb-3"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {pkg.price}
                    </p>
                    <ul className="space-y-2">
                      {pkg.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-start text-sm text-gray-400"
                          style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                          <Check size={16} className="mr-2 mt-1 flex-shrink-0" style={{ color: '#d4af37' }} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    {pkg.specialOffer && (
                      <p
                        className="mt-3 text-sm font-medium"
                        style={{ fontFamily:  'Poppins, sans-serif', color: '#ff6b35' }}
                      >
                        {pkg.specialOffer}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';
// import { artistInfo, bookingPackages } from '../data/mock';
// import { useToast } from '../hooks/use-toast';

// const Contact = () => {
//   const { toast } = useToast();
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     eventDate: '',
//     service: '',
//     message: '',
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     // Simulate form submission
//     await new Promise((resolve) => setTimeout(resolve, 1500));

//     toast({
//       title: "Booking Request Sent!",
//       description: "Thank you for your interest. I'll get back to you within 24 hours.",
//     });

//     setFormData({
//       name: '',
//       email: '',
//       phone: '',
//       eventDate: '',
//       service: '',
//       message: '',
//     });
//     setIsSubmitting(false);
//   };

//   return (
//     <section id="contact" className="py-20 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a]">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Section Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-16"
//         >
//           <h2
//             className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
//             style={{ fontFamily: 'Bebas Neue, sans-serif', color: '#d4af37' }}
//           >
//             Book Now
//           </h2>
//           <p
//             className="text-lg text-gray-400 max-w-2xl mx-auto"
//             style={{ fontFamily: 'Poppins, sans-serif' }}
//           >
//             Let's create an unforgettable musical experience for your event
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//           {/* Booking Form */}
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="rounded-2xl p-8"
//             style={{
//               background: 'linear-gradient(135deg, #2b1810 0%, #1a1a1a 100%)',
//               border: '2px solid #d4af37',
//             }}
//           >
//             <h3
//               className="text-2xl font-bold mb-6"
//               style={{ fontFamily: 'Poppins, sans-serif', color: '#f5c842' }}
//             >
//               Booking Request
//             </h3>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label
//                   htmlFor="name"
//                   className="block text-sm font-medium mb-2 text-gray-300"
//                   style={{ fontFamily: 'Poppins, sans-serif' }}
//                 >
//                   Full Name *
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-3 rounded-lg bg-black/50 border border-[#d4af37]/30 text-white focus:border-[#d4af37] focus:outline-none transition-colors duration-200"
//                   style={{ fontFamily: 'Poppins, sans-serif' }}
//                 />
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div>
//                   <label
//                     htmlFor="email"
//                     className="block text-sm font-medium mb-2 text-gray-300"
//                     style={{ fontFamily: 'Poppins, sans-serif' }}
//                   >
//                     Email *
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-3 rounded-lg bg-black/50 border border-[#d4af37]/30 text-white focus:border-[#d4af37] focus:outline-none transition-colors duration-200"
//                     style={{ fontFamily: 'Poppins, sans-serif' }}
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="phone"
//                     className="block text-sm font-medium mb-2 text-gray-300"
//                     style={{ fontFamily: 'Poppins, sans-serif' }}
//                   >
//                     Phone
//                   </label>
//                   <input
//                     type="tel"
//                     id="phone"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 rounded-lg bg-black/50 border border-[#d4af37]/30 text-white focus:border-[#d4af37] focus:outline-none transition-colors duration-200"
//                     style={{ fontFamily: 'Poppins, sans-serif' }}
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div>
//                   <label
//                     htmlFor="eventDate"
//                     className="block text-sm font-medium mb-2 text-gray-300"
//                     style={{ fontFamily: 'Poppins, sans-serif' }}
//                   >
//                     Event Date *
//                   </label>
//                   <input
//                     type="date"
//                     id="eventDate"
//                     name="eventDate"
//                     value={formData.eventDate}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-3 rounded-lg bg-black/50 border border-[#d4af37]/30 text-white focus:border-[#d4af37] focus:outline-none transition-colors duration-200"
//                     style={{ fontFamily: 'Poppins, sans-serif' }}
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="service"
//                     className="block text-sm font-medium mb-2 text-gray-300"
//                     style={{ fontFamily: 'Poppins, sans-serif' }}
//                   >
//                     Service Type *
//                   </label>
//                   <select
//                     id="service"
//                     name="service"
//                     value={formData.service}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-3 rounded-lg bg-black/50 border border-[#d4af37]/30 text-white focus:border-[#d4af37] focus:outline-none transition-colors duration-200"
//                     style={{ fontFamily: 'Poppins, sans-serif' }}
//                   >
//                     <option value="">Select a service</option>
//                     <option value="jazz">Live Jazz Performance</option>
//                     <option value="dj-sax">DJ sAx Progressive House</option>
//                     <option value="premium">Premium Entertainment Package</option>
//                     <option value="custom">Custom Package</option>
//                   </select>
//                 </div>
//               </div>

//               <div>
//                 <label
//                   htmlFor="message"
//                   className="block text-sm font-medium mb-2 text-gray-300"
//                   style={{ fontFamily: 'Poppins, sans-serif' }}
//                 >
//                   Message *
//                 </label>
//                 <textarea
//                   id="message"
//                   name="message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   required
//                   rows={4}
//                   className="w-full px-4 py-3 rounded-lg bg-black/50 border border-[#d4af37]/30 text-white focus:border-[#d4af37] focus:outline-none transition-colors duration-200 resize-none"
//                   style={{ fontFamily: 'Poppins, sans-serif' }}
//                   placeholder="Tell me about your event..."
//                 />
//               </div>

//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-full flex items-center justify-center px-6 py-4 rounded-full font-bold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//                 style={{
//                   backgroundColor: '#d4af37',
//                   color: '#0a0a0a',
//                   fontFamily: 'Poppins, sans-serif',
//                 }}
//                 onMouseEnter={(e) => {
//                   if (!isSubmitting) {
//                     e.target.style.backgroundColor = '#f5c842';
//                     e.target.style.boxShadow = '0 8px 24px rgba(212, 175, 55, 0.4)';
//                   }
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.backgroundColor = '#d4af37';
//                   e.target.style.boxShadow = 'none';
//                 }}
//               >
//                 {isSubmitting ? (
//                   <>
//                     <div className="animate-spin mr-2 h-5 w-5 border-2 border-black border-t-transparent rounded-full" />
//                     Sending...
//                   </>
//                 ) : (
//                   <>
//                     Send Request
//                     <Send size={20} className="ml-2" />
//                   </>
//                 )}
//               </button>
//             </form>
//           </motion.div>

//           {/* Contact Info & Packages */}
//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="space-y-8"
//           >
//             {/* Contact Information */}
//             <div
//               className="rounded-2xl p-8"
//               style={{
//                 background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
//                 border: '2px solid #d4af37',
//               }}
//             >
//               <h3
//                 className="text-2xl font-bold mb-6"
//                 style={{ fontFamily: 'Poppins, sans-serif', color: '#f5c842' }}
//               >
//                 Contact Information
//               </h3>
//               <div className="space-y-4">
//                 <div className="flex items-start">
//                   <Mail size={24} className="mr-4 mt-1" style={{ color: '#d4af37' }} />
//                   <div>
//                     <p
//                       className="text-gray-400 text-sm mb-1"
//                       style={{ fontFamily: 'Poppins, sans-serif' }}
//                     >
//                       Email
//                     </p>
//                     <a
//                       href={`mailto:${artistInfo.email}`}
//                       className="text-white hover:text-[#d4af37] transition-colors duration-200"
//                       style={{ fontFamily: 'Poppins, sans-serif' }}
//                     >
//                       {artistInfo.email}
//                     </a>
//                   </div>
//                 </div>
//                 <div className="flex items-start">
//                   <Phone size={24} className="mr-4 mt-1" style={{ color: '#d4af37' }} />
//                   <div>
//                     <p
//                       className="text-gray-400 text-sm mb-1"
//                       style={{ fontFamily: 'Poppins, sans-serif' }}
//                     >
//                       Phone
//                     </p>
//                     <a
//                       href={`tel:${artistInfo.phone}`}
//                       className="text-white hover:text-[#d4af37] transition-colors duration-200"
//                       style={{ fontFamily: 'Poppins, sans-serif' }}
//                     >
//                       {artistInfo.phone}
//                     </a>
//                   </div>
//                 </div>
//                 <div className="flex items-start">
//                   <MapPin size={24} className="mr-4 mt-1" style={{ color: '#d4af37' }} />
//                   <div>
//                     <p
//                       className="text-gray-400 text-sm mb-1"
//                       style={{ fontFamily: 'Poppins, sans-serif' }}
//                     >
//                       Location
//                     </p>
//                     <p
//                       className="text-white"
//                       style={{ fontFamily: 'Poppins, sans-serif' }}
//                     >
//                       Colombo, Sri Lanka
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Booking Packages */}
//             <div
//               className="rounded-2xl p-8"
//               style={{
//                 background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
//                 border: '2px solid #d4af37',
//               }}
//             >
//               <h3
//                 className="text-2xl font-bold mb-6"
//                 style={{ fontFamily: 'Poppins, sans-serif', color: '#f5c842' }}
//               >
//                 Package Pricing
//               </h3>
//               <div className="space-y-6">
//                 {bookingPackages.map((pkg) => (
//                   <div key={pkg.id} className="border-b border-[#d4af37]/20 pb-6 last:border-0 last:pb-0">
//                     <h4
//                       className="text-lg font-bold mb-2"
//                       style={{ fontFamily: 'Poppins, sans-serif', color: '#f5f5f5' }}
//                     >
//                       {pkg.name}
//                     </h4>
//                     <p
//                       className="text-[#d4af37] font-bold mb-3"
//                       style={{ fontFamily: 'Poppins, sans-serif' }}
//                     >
//                       {pkg.price}
//                     </p>
//                     <ul className="space-y-2">
//                       {pkg.features.map((feature, index) => (
//                         <li
//                           key={index}
//                           className="flex items-start text-sm text-gray-400"
//                           style={{ fontFamily: 'Poppins, sans-serif' }}
//                         >
//                           <Check size={16} className="mr-2 mt-1 flex-shrink-0" style={{ color: '#d4af37' }} />
//                           {feature}
//                         </li>
//                       ))}
//                     </ul>
//                     {pkg.specialOffer && (
//                       <p
//                         className="mt-3 text-sm font-medium"
//                         style={{ fontFamily: 'Poppins, sans-serif', color: '#ff6b35' }}
//                       >
//                         {pkg.specialOffer}
//                       </p>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Contact;
