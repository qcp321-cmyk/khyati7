import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Book, Code, Terminal, ChevronRight, Copy, Check, Hash, Zap } from 'lucide-react';

const docs = [
  {
    category: 'Getting Started',
    items: [
      { title: 'Quick Start', description: 'Get up and running in 5 minutes with our secure SDK.' },
      { title: 'Installation', description: 'Install kHyAtI-7 via npm, yarn, or pnpm.' },
      { title: 'Configuration', description: 'Configure API keys and tracking options.' },
      { title: 'First Events', description: 'Capture your first user vectors.' },
    ],
  },
  {
    category: 'Core Concepts',
    items: [
      { title: 'Vectors', description: 'Understanding event vectors & dimensions.' },
      { title: 'Contexts', description: 'Working with rich context metadata.' },
      { title: 'Clusters', description: 'Automatic event clustering & tagging.' },
      { title: 'Predictions', description: 'AI-powered behavior prediction engine.' },
    ],
  },
  {
    category: 'API Reference',
    items: [
      { title: 'REST API', description: 'Complete REST API documentation & endpoints.' },
      { title: 'WebSocket', description: 'Real-time bidirectional event streaming.' },
      { title: 'SDKs', description: 'Official client libraries for JS, Python, Go.' },
      { title: 'Webhooks', description: 'Secure event notification webhooks.' },
    ],
  },
  {
    category: 'Advanced Topics',
    items: [
      { title: 'Custom Events', description: 'Define your own event schemas.' },
      { title: 'Filtering', description: 'Advanced query filtering & aggregations.' },
      { title: 'Privacy & Security', description: 'GDPR, CCPA compliance & encryption.' },
      { title: 'Data Export', description: 'Export raw vector data for analysis.' },
    ],
  },
];

const codeExample = `import { kHyAtI7 } from '@khyati7/sdk';

// Initialize the secure tracker
const tracker = kHyAtI7.init({
  apiKey: 'pk_live_...',
  projectId: 'proj_8x9...',
  options: {
    anonymizeIp: true,
    consent: 'granted'
  }
});

// Track custom interactions
tracker.track('interaction', {
  type: 'click',
  target: 'cta_primary',
  sentiment: 'positive',
  metadata: {
     source: 'landing_page',
     campaign: 'summer_2026'
  }
});

// Start AI prediction engine
tracker.startprediction();`;

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
    <div className="pt-20 lg:pt-24 min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-b from-purple-50/50 to-transparent overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-orange-50/30 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-6">
              <Book className="w-4 h-4" />
              Developer Docs
            </span>
            <h1 className="text-4xl lg:text-5xl font-black mb-6 text-gray-900 tracking-tight">
              Build with
              <span className="block bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
                Intelligence
              </span>
            </h1>
            <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Complete documentation for kHyAtI-7. Integrate powerful user tracking and AI predictions in minutes.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-orange-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
              <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Search guides, API references, and examples..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-4 py-5 bg-white rounded-xl border border-gray-100 shadow-xl shadow-purple-500/5 focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-gray-600 placeholder-gray-400"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <span className="px-2 py-1 rounded-md bg-gray-100 text-xs text-gray-500 border border-gray-200 font-mono">/</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">

            {/* Sidebar / Categories (Desktop) */}
            <div className="hidden lg:block lg:col-span-3 space-y-8">
              <div className="sticky top-32">
                <h4 className="font-bold text-gray-900 mb-4 px-2">On this page</h4>
                <ul className="space-y-1">
                  {docs.map(doc => (
                    <li key={doc.category}>
                      <a href={`#${doc.category.toLowerCase().replace(' ', '-')}`} className="block px-3 py-2 text-sm text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                        {doc.category}
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 p-4 bg-orange-50 rounded-xl border border-orange-100">
                  <h5 className="font-bold text-orange-800 mb-2 text-sm flex items-center gap-2">
                    <Zap className="w-4 h-4" /> Pro Tip
                  </h5>
                  <p className="text-xs text-orange-700/80 leading-relaxed">
                    Use the CLI tool to auto-generate types for your events.
                  </p>
                </div>
              </div>
            </div>

            {/* Documentation Content */}
            <div className="lg:col-span-9 space-y-16">

              {/* Quick Start Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="prose prose-lg max-w-none"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 m-0">Quick Integration</h2>
                </div>

                <div className="relative bg-[#1e1e2e] rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/10">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#27273a]">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                      </div>
                      <span className="ml-4 text-xs font-mono text-gray-400">sdk-usage.ts</span>
                    </div>
                    <button
                      onClick={handleCopy}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <pre className="p-6 m-0 overflow-x-auto text-sm font-mono leading-relaxed">
                    <code className="text-gray-300">
                      {codeExample.split('\n').map((line, i) => (
                        <div key={i} className="table-row">
                          <span className="table-cell pr-6 text-gray-600 select-none text-right w-8">{i + 1}</span>
                          <span
                            className="table-cell"
                            dangerouslySetInnerHTML={{
                              __html: line
                                .replace(/(\/\/.*)/, '<span class="text-gray-500 italic">$1</span>')
                                .replace(/('.*?')|(".*?")/g, '<span class="text-green-400">$1</span>')
                                .replace(/\b(import|from|const|new|export|default)\b/g, '<span class="text-purple-400 font-medium">$1</span>')
                                .replace(/\b(kHyAtI7|tracker)\b/g, '<span class="text-orange-400">$1</span>')
                                .replace(/\b(init|track|startprediction)\b/g, '<span class="text-blue-400">$1</span>'),
                            }}
                          />
                        </div>
                      ))}
                    </code>
                  </pre>
                </div>
              </motion.div>

              {/* Documentation Cards */}
              <div className="grid md:grid-cols-2 gap-6">
                {filteredDocs.map((category, i) => (
                  <motion.div
                    key={category.category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-50 to-orange-50 rounded-bl-[100px] -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />

                    <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <Hash className="w-5 h-5 text-purple-500" />
                      {category.category}
                    </h3>

                    <ul className="space-y-3">
                      {category.items.map((item) => (
                        <li key={item.title}>
                          <button
                            onClick={() => setActiveDoc(activeDoc === item.title ? null : item.title)}
                            className="w-full text-left group/item"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-semibold text-gray-700 group-hover/item:text-purple-600 transition-colors">
                                {item.title}
                              </span>
                              <ChevronRight className="w-4 h-4 text-gray-300 group-hover/item:text-orange-400 group-hover/item:translate-x-1 transition-all" />
                            </div>
                            <p className="text-sm text-gray-500 line-clamp-1">{item.description}</p>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Resources & SDKs</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'JavaScript SDK', icon: <Code className="w-5 h-5" />, color: 'purple' },
              { label: 'React Provider', icon: <Zap className="w-5 h-5" />, color: 'blue' },
              { label: 'Python Library', icon: <Terminal className="w-5 h-5" />, color: 'green' },
              { label: 'Go Package', icon: <Book className="w-5 h-5" />, color: 'cyan' },
            ].map((sdk) => (
              <div key={sdk.label} className="bg-white p-4 rounded-xl border border-gray-200 flex items-center gap-4 hover:border-purple-300 hover:ring-2 hover:ring-purple-100 transition-all cursor-pointer">
                <div className={`w-10 h-10 rounded-lg bg-${sdk.color}-100 flex items-center justify-center text-${sdk.color}-600`}>
                  {sdk.icon}
                </div>
                <span className="font-semibold text-gray-700">{sdk.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
