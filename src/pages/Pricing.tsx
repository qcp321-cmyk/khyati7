import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Sparkles, Zap, Building2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDemo } from '../contexts/DemoContext';

const plans = [
  {
    name: 'Starter',
    description: 'Perfect for small projects and individual developers',
    price: { monthly: 0, yearly: 0 },
    icon: <Zap className="w-6 h-6" />,
    features: [
      { text: '1,000 vectors/day', included: true },
      { text: '7-day data retention', included: true },
      { text: 'Basic analytics', included: true },
      { text: 'Community support', included: true },
      { text: 'API access', included: false },
      { text: 'Custom clustering', included: false },
      { text: 'Priority support', included: false },
      { text: 'SSO integration', included: false },
    ],
    cta: 'Get Started Free',
    ctaLink: '/demo',
    popular: false,
    color: 'gray',
  },
  {
    name: 'Pro',
    description: 'For growing teams that need more power and flexibility',
    price: { monthly: 49, yearly: 39 },
    icon: <Sparkles className="w-6 h-6" />,
    features: [
      { text: '100,000 vectors/day', included: true },
      { text: '90-day data retention', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'Priority email support', included: true },
      { text: 'Full API access', included: true },
      { text: 'Custom clustering', included: true },
      { text: 'Priority support', included: false },
      { text: 'SSO integration', included: false },
    ],
    cta: 'Start Pro Trial',
    ctaLink: '/demo',
    popular: true,
    color: 'orange',
  },
  {
    name: 'Enterprise',
    description: 'For organizations with advanced security and scale needs',
    price: { monthly: null, yearly: null },
    icon: <Building2 className="w-6 h-6" />,
    features: [
      { text: 'Unlimited vectors', included: true },
      { text: 'Unlimited retention', included: true },
      { text: 'Custom analytics', included: true },
      { text: '24/7 phone support', included: true },
      { text: 'Full API access', included: true },
      { text: 'Custom clustering', included: true },
      { text: 'Dedicated support', included: true },
      { text: 'SSO & SAML', included: true },
    ],
    cta: 'Contact Sales',
    ctaLink: '/contact',
    popular: false,
    color: 'amber',
  },
];

const faqs = [
  {
    question: 'What counts as a vector?',
    answer: 'A vector represents a single tracked event with all its contextual metadata. This includes mouse movements, clicks, scrolls, keypresses, and any custom events you define.',
  },
  {
    question: 'Can I upgrade or downgrade anytime?',
    answer: 'Yes, you can change your plan at any time. When upgrading, you\'ll get immediate access to new features. When downgrading, changes take effect at the end of your billing cycle.',
  },
  {
    question: 'Is there a free trial for paid plans?',
    answer: 'Yes, all paid plans come with a 14-day free trial. No credit card required to start.',
  },
  {
    question: 'What happens if I exceed my daily vector limit?',
    answer: 'We\'ll notify you when you approach your limit. Excess vectors are buffered for 24 hours, giving you time to upgrade. After that, new vectors are dropped.',
  },
];

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { startTracking } = useDemo();

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
              <Sparkles className="w-4 h-4" />
              Simple Pricing
            </span>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-gray-800">
              Choose Your
              <span className="block bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                Perfect Plan
              </span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Start free, scale as you grow. No hidden fees, cancel anytime.
            </p>

            {/* Toggle */}
            <div className="flex items-center justify-center gap-4">
              <span className={`text-sm font-medium ${!isYearly ? 'text-gray-800' : 'text-gray-400'}`}>
                Monthly
              </span>
              <motion.button
                className="relative w-14 h-8 rounded-full bg-orange-100 p-1"
                onClick={() => setIsYearly(!isYearly)}
              >
                <motion.div
                  className="w-6 h-6 rounded-full bg-orange-500 shadow-md"
                  animate={{ x: isYearly ? 24 : 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </motion.button>
              <span className={`text-sm font-medium ${isYearly ? 'text-gray-800' : 'text-gray-400'}`}>
                Yearly
                <span className="ml-2 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs">
                  Save 20%
                </span>
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className={`relative bg-white rounded-3xl p-6 lg:p-8 shadow-lg border-2 ${plan.popular
                    ? 'border-orange-500 shadow-orange-200/50 scale-105 z-10'
                    : 'border-orange-50 shadow-orange-100/30'
                  }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-medium rounded-full">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <div
                    className={`w-12 h-12 rounded-xl bg-${plan.color}-100 flex items-center justify-center text-${plan.color}-600 mb-4`}
                  >
                    {plan.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                  <p className="text-sm text-gray-500">{plan.description}</p>
                </div>

                <div className="mb-6">
                  {plan.price.monthly !== null ? (
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-gray-800">
                        ${isYearly ? plan.price.yearly : plan.price.monthly}
                      </span>
                      <span className="text-gray-500">/month</span>
                    </div>
                  ) : (
                    <div className="text-2xl font-bold text-gray-800">Custom</div>
                  )}
                  {isYearly && plan.price.yearly !== null && (
                    <p className="text-sm text-amber-600 mt-1">
                      Save ${(plan.price.monthly! - plan.price.yearly!) * 12}/year
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-amber-500 flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-gray-300 flex-shrink-0" />
                      )}
                      <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link to={plan.ctaLink} onClick={() => plan.ctaLink === '/demo' && startTracking()}>
                  <motion.button
                    className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${plan.popular
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-orange-50/30 to-transparent">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Frequently Asked Questions</h2>
            <p className="text-gray-600">Everything you need to know about our pricing</p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl shadow-md shadow-orange-100/20 border border-orange-50 overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 flex items-center justify-between text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-medium text-gray-800">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="w-5 h-5 text-gray-400 rotate-90" />
                  </motion.div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openFaq === i ? 'auto' : 0 }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-4 text-gray-600">{faq.answer}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
