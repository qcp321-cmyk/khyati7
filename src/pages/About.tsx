import { motion } from 'framer-motion';
import { Target, Users, Zap, Heart, Globe, Award } from 'lucide-react';
import ScrollEffect from '../components/ScrollEffect';

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
  {
    name: 'Aman Kumar Singh',
    role: 'a curiousminds dev',
    link: 'https://curiousminds.online',
    image: 'AKS'
  },
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
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-gradient-to-b from-purple-100/50 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-6">
              <Globe className="w-4 h-4" />
              About Us
            </span>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-gray-800">
              Building the Future of
              <span className="block bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
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

      <section className="py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <ScrollEffect key={stat.label} direction={i % 2 === 0 ? 'diagonal-left' : 'diagonal-right'} delay={i * 0.1}>
                <motion.div
                  className={`text-center p-6 bg-white rounded-2xl shadow-lg border ${i % 2 === 0
                    ? 'shadow-purple-100/30 border-purple-50 hover:shadow-purple-200/50'
                    : 'shadow-orange-100/30 border-orange-50 hover:shadow-orange-200/50'
                    } transition-all duration-300`}
                  whileHover={{ scale: 1.05, y: -4 }}
                >
                  <div className={`text-3xl lg:text-4xl font-bold bg-clip-text text-transparent mb-1 ${i % 2 === 0
                    ? 'bg-gradient-to-r from-purple-600 to-purple-500'
                    : 'bg-gradient-to-r from-orange-600 to-amber-500'
                    }`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </motion.div>
              </ScrollEffect>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-purple-50/30 to-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollEffect direction="perspective">
            <div className="text-center">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-800">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                We believe that understanding user behavior is the key to building better products.
                Our mission is to provide developers and businesses with the tools they need to
                capture, analyze, and act on user activity data—while always respecting user privacy
                and maintaining the highest standards of data security.
              </p>
            </div>
          </ScrollEffect>
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
              <ScrollEffect
                key={value.title}
                direction={i % 2 === 0 ? 'horizontal' : 'diagonal-right'}
                delay={i * 0.1}
              >
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`bg-white rounded-2xl p-6 shadow-lg border text-center group cursor-pointer transition-all duration-300 ${i % 2 === 0
                    ? 'shadow-purple-100/30 border-purple-50 hover:shadow-purple-200/50'
                    : 'shadow-orange-100/30 border-orange-50 hover:shadow-orange-200/50'
                    }`}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform ${i % 2 === 0
                    ? 'bg-purple-100 text-purple-600 group-hover:bg-orange-100 group-hover:text-orange-600'
                    : 'bg-orange-100 text-orange-600 group-hover:bg-purple-100 group-hover:text-purple-600'
                    }`}>
                    {value.icon}
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-500">{value.description}</p>
                </motion.div>
              </ScrollEffect>
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

          <div className="flex justify-center">
            {team.map((member, i) => (
              <ScrollEffect
                key={member.name}
                direction="perspective"
                delay={0}
              >
                <motion.a
                  href={member.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-2xl p-8 shadow-lg border text-center group cursor-pointer transition-all duration-300 shadow-purple-100/30 border-purple-50 hover:shadow-purple-200/50 max-w-sm"
                >
                  <div className="w-24 h-24 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform bg-gradient-to-br from-purple-600 to-purple-500 group-hover:from-orange-500 group-hover:to-amber-500">
                    {member.image}
                  </div>
                  <h3 className="font-bold text-gray-800 text-xl mb-1">{member.name}</h3>
                  <p className="text-sm text-purple-600 group-hover:text-orange-600 transition-colors font-medium">{member.role}</p>
                </motion.a>
              </ScrollEffect>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollEffect direction="perspective">
            <Award className="w-16 h-16 text-purple-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Recognized Excellence</h2>
            <p className="text-gray-600 mb-8">
              Proud to be recognized by industry leaders for our innovation and commitment to quality.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {['Forbes 30 Under 30', 'TechCrunch Disrupt', 'Product Hunt #1', 'G2 Leader'].map(
                (award, i) => (
                  <span
                    key={i}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${i % 2 === 0
                      ? 'bg-purple-50 text-purple-700 hover:bg-orange-50 hover:text-orange-700'
                      : 'bg-orange-50 text-orange-700 hover:bg-purple-50 hover:text-purple-700'
                      }`}
                  >
                    {award}
                  </span>
                )
              )}
            </div>
          </ScrollEffect>
        </div>
      </section>
    </div>
  );
}
