import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Book, Code, Terminal, FileText, ChevronRight, Copy, Check } from 'lucide-react';

const docs = [
  {
    category: 'Getting Started',
    items: [
      { title: 'Quick Start', description: 'Get up and running in 5 minutes' },
      { title: 'Installation', description: 'Install kHyAtI-7 in your project' },
      { title: 'Configuration', description: 'Configure tracking options' },
      { title: 'First Events', description: 'Capture your first vectors' },
    ],
  },
  {
    category: 'Core Concepts',
    items: [
      { title: 'Vectors', description: 'Understanding event vectors' },
      { title: 'Contexts', description: 'Working with context metadata' },
      { title: 'Clusters', description: 'Automatic event clustering' },
      { title: 'Predictions', description: 'AI-powered behavior prediction' },
    ],
  },
  {
    category: 'API Reference',
    items: [
      { title: 'REST API', description: 'Complete REST API documentation' },
      { title: 'WebSocket', description: 'Real-time event streaming' },
      { title: 'SDKs', description: 'Official client libraries' },
      { title: 'Webhooks', description: 'Event notifications' },
    ],
  },
  {
    category: 'Advanced',
    items: [
      { title: 'Custom Events', description: 'Define your own event types' },
      { title: 'Filtering', description: 'Filter and query events' },
      { title: 'Export', description: 'Export data for analysis' },
      { title: 'Security', description: 'Security best practices' },
    ],
  },
];

const codeExample = `import { kHyAtI7 } from '@khyati7/sdk';

// Initialize the tracker
const tracker = kHyAtI7.init({
  apiKey: 'your-api-key',
  projectId: 'your-project-id',
});

// Track custom events
tracker.track('user_action', {
  action: 'button_click',
  buttonId: 'cta-primary',
  metadata: {
    page: 'homepage',
    referrer: document.referrer,
  },
});

// Start automatic tracking
tracker.startAutoTracking();`;

export default function Documentation() {
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeDoc, setActiveDoc] = useState<string | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredDocs = docs.map((category) => ({
    ...category,
    items: category.items.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((category) => category.items.length > 0);

  return (
    <div className="pt-20 lg:pt-24">
      {/* Hero */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-b from-orange-50/50 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-medium mb-6">
              <Book className="w-4 h-4" />
              Documentation
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-800">
              Learn How to Use
              <span className="block bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                kHyAtI-7
              </span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Everything you need to integrate and make the most of our platform.
            </p>

            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-orange-100 shadow-lg shadow-orange-100/30 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Start Code */}
      <section className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gray-900 rounded-3xl p-6 lg:p-8 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Terminal className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300 font-mono text-sm">quickstart.js</span>
              </div>
              <motion.button
                onClick={handleCopy}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 text-gray-300 hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
              </motion.button>
            </div>
            <pre className="overflow-x-auto">
              <code className="text-sm font-mono text-gray-300">
                {codeExample.split('\n').map((line, i) => (
                  <div key={i} className="flex">
                    <span className="w-8 text-gray-600 select-none">{i + 1}</span>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: line
                          .replace(/(\/\/.*)/, '<span class="text-gray-500">$1</span>')
                          .replace(/('.*?')|(".*?")/g, '<span class="text-orange-400">$&</span>')
                          .replace(/\b(import|from|const|new)\b/g, '<span class="text-amber-400">$&</span>')
                          .replace(/\b(kHyAtI7|tracker)\b/g, '<span class="text-orange-500">$&</span>')
                          .replace(/\b(init|track|startAutoTracking)\b/g, '<span class="text-amber-600">$&</span>'),
                      }}
                    />
                  </div>
                ))}
              </code>
            </pre>
          </motion.div>
        </div>
      </section>

      {/* Documentation Grid */}
      <section className="py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {filteredDocs.map((category, i) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg shadow-orange-100/30 border border-orange-50"
              >
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-orange-500" />
                  {category.category}
                </h3>
                <div className="space-y-2">
                  {category.items.map((item) => (
                    <motion.button
                      key={item.title}
                      onClick={() => setActiveDoc(activeDoc === item.title ? null : item.title)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all ${activeDoc === item.title
                          ? 'bg-orange-50 text-orange-700'
                          : 'hover:bg-gray-50 text-gray-700'
                        }`}
                      whileHover={{ x: 5 }}
                    >
                      <div>
                        <div className="font-medium">{item.title}</div>
                        <div className="text-sm text-gray-500">{item.description}</div>
                      </div>
                      <ChevronRight
                        className={`w-5 h-5 transition-transform ${activeDoc === item.title ? 'rotate-90' : ''
                          }`}
                      />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* API Cards */}
      <section className="py-12 lg:py-20 bg-gradient-to-b from-orange-50/30 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-800">API & SDKs</h2>
            <p className="text-gray-600">Choose your preferred integration method</p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: <Code className="w-8 h-8" />, title: 'REST API', desc: 'HTTP-based API for all platforms' },
              { icon: <Terminal className="w-8 h-8" />, title: 'WebSocket', desc: 'Real-time bidirectional streaming' },
              { icon: <Book className="w-8 h-8" />, title: 'SDKs', desc: 'Native libraries for popular languages' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-2xl p-6 text-center shadow-lg shadow-orange-100/30 border border-orange-50 cursor-pointer group"
              >
                <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 mx-auto mb-4 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
