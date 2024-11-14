import React, { useState } from 'react';
import { 
  MessageCircle, 
  Mail, 
  Phone, 
  FileQuestion, 
  ChevronRight, 
  Search,
  Clock,
  ArrowRight,
  Plus,
  Minus
} from 'lucide-react';

const SupportBody = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const supportCategories = [
    { id: 'general', name: 'General Support', icon: <MessageCircle className="w-5 h-5" /> },
    { id: 'technical', name: 'Technical Help', icon: <FileQuestion className="w-5 h-5" /> },
    { id: 'billing', name: 'Billing', icon: <Mail className="w-5 h-5" /> },
    { id: 'feature', name: 'Feature Requests', icon: <Phone className="w-5 h-5" /> },
  ];

  const faqs = [
    {
      id: 1,
      question: "How do I integrate Google Calendar?",
      answer: "FoxDash makes calendar integration simple. Go to Settings > Integrations > Google Calendar and follow the authentication process. Once connected, you can import your Excel schedules directly.",
      category: 'technical'
    },
    {
      id: 2,
      question: "What makes FoxDash's resume builder ATS-friendly?",
      answer: "Our AI-powered resume builder uses semantic HTML structure, clean formatting, and keyword optimization to ensure maximum ATS compatibility while maintaining visual appeal.",
      category: 'general'
    },
    {
      id: 3,
      question: "How secure is the document archiving system?",
      answer: "We use enterprise-grade encryption and secure cloud storage with regular backups. All documents are encrypted at rest and in transit.",
      category: 'technical'
    },
  ];

  return (
    <div className="min-[90vh]  bg-gradient-to-b from-zinc-900 to-black text-white py-16 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-pink-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 mt-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm mb-4">
            <Clock className="w-4 h-4 text-purple-400" />
            <span className="text-sm">24/7 Support Available</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
            How can we help you?
          </h1>
          
          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-50 blur group-hover:opacity-75 transition-opacity" />
            <div className="relative bg-white/10 backdrop-blur-xl rounded-full flex items-center p-2">
              <Search className="w-5 h-5 ml-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search for help..."
                className="w-full bg-transparent border-none focus:outline-none px-4 py-2 text-white placeholder-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Support Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {supportCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`relative group p-6 rounded-2xl transition-all duration-300 ${
                activeCategory === category.id 
                  ? 'bg-white/15 scale-105' 
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-xl">
                  {category.icon}
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">{category.name}</h3>
                  <div className="flex items-center text-sm text-gray-400 group-hover:text-white transition-colors">
                    View details
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* FAQs Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300 hover:bg-white/10"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left"
                >
                  <span className="font-medium">{faq.question}</span>
                  {expandedFaq === faq.id ? (
                    <Minus className="w-5 h-5 text-purple-400" />
                  ) : (
                    <Plus className="w-5 h-5 text-purple-400" />
                  )}
                </button>
                {expandedFaq === faq.id && (
                  <div className="px-6 pb-4 text-gray-300">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-6">Still need help?</h2>
          <div className="inline-flex gap-4">
            <button className="flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-full transition-all duration-300 hover:scale-105">
              <MessageCircle className="w-5 h-5" />
              Live Chat
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-105">
              <Mail className="w-5 h-5" />
              Email Support
            </button>
          </div>
        </div>

        {/* Response Time Indicator */}
        <div className="mt-8 flex justify-center">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Average response time: <span className="text-white">under 5 minutes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportBody;