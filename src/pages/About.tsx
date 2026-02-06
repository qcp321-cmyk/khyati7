import { motion } from 'framer-motion';
import { Target, Users, Zap, Heart, Globe, Award } from 'lucide-react';

const values = [
  {
    icon: <Target className="w-6 h-6" />,
    title: 'Precision First',
    description: 'We believe in capturing every detail with absolute accuracy. No event is too small to track.',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'User-Centric',
    description: 'Our technology serves people. Privacy and transparency are at the core of everything we build.',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Performance Matters',
    description: 'Speed and efficiency are non-negotiable. Our systems are optimized for millisecond response times.',
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Built with Care',
    description: 'Every line of code is crafted with attention to detail and a commitment to quality.',
  },
];

const team = [
  { name: 'Alex Chen', role: 'CEO & Co-Founder', image: 'AC' },
  { name: 'Sarah Miller', role: 'CTO & Co-Founder', image: 'SM' },
  { name: 'James Wilson', role: 'Head of Engineering', image: 'JW' },
  { name: 'Emily Zhang', role: 'Head of Product', image: 'EZ' },
];

const stats = [
  { value: '50K+', label: 'Developers' },
  { value: '1B+', label: 'Vectors Tracked' },
  { value: '99.99%', label: 'Uptime' },
  { value: '150+', label: 'Countries' },
];

export default function About() {
  return (
    <div className="pt-20 lg:pt-24">
      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-gradient-to-b from-orange-100/50 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-medium mb-6">
              <Globe className="w-4 h-4" />
              About Us
            </span>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-gray-800">
              Building the Future of
              <span className="block bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                Activity Intelligence
              </span>
            </h1>
            <p className="text-lg text-gray-600">
              We're a team of engineers, data scientists, and designers passionate about
              creating tools that help businesses understand user behavior at scale.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 bg-white rounded-2xl shadow-lg shadow-orange-100/30 border border-orange-50"
              >
                <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-orange-50/30 to-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-800">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              We believe that understanding user behavior is the key to building better products.
              Our mission is to provide developers and businesses with the tools they need to
              capture, analyze, and act on user activity data—while always respecting user privacy
              and maintaining the highest standards of data security.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-800">Our Values</h2>
            <p className="text-gray-600">The principles that guide everything we do</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white rounded-2xl p-6 shadow-lg shadow-orange-100/30 border border-orange-50 text-center group cursor-pointer"
              >
                <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 mx-auto mb-4 group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-sm text-gray-500">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-orange-50/30 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-800">Meet the Team</h2>
            <p className="text-gray-600">The people behind kHyAtI-7</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl p-6 shadow-lg shadow-orange-100/30 border border-orange-50 text-center group cursor-pointer"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white text-xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform">
                  {member.image}
                </div>
                <h3 className="font-bold text-gray-800">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Award className="w-16 h-16 text-orange-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Recognized Excellence</h2>
            <p className="text-gray-600 mb-8">
              Proud to be recognized by industry leaders for our innovation and commitment to quality.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {['Forbes 30 Under 30', 'TechCrunch Disrupt', 'Product Hunt #1', 'G2 Leader'].map(
                (award, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-orange-50 text-orange-700 rounded-full text-sm font-medium"
                  >
                    {award}
                  </span>
                )
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
