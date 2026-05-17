import { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
  Award,
  CircleCheck,
  Zap,
  Lock,
  Star,
  Inbox,
  LayoutDashboard,
  FileText,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Clinic Follow-up Queue — Streamline Client Follow-ups',
  description: 'The Clinic Follow-up Queue app provides wellness clinic operators with a streamlined system to transform raw client information into prioritized follow-up tasks, manage them from a central dashboard, and generate client-ready reports to increase repeat visits.',
};

export default function LandingPage() {
  const PRODUCT_NAME = 'Clinic Follow-up Queue';

  const featureCards = [
    {
      icon: Inbox,
      name: 'Client Intake & Task Creation',
      description: 'Quickly turn messy notes and client requests into actionable, structured follow-up tasks with smart suggestions.',
    },
    {
      icon: LayoutDashboard,
      name: 'Follow-up Prioritization Dashboard',
      description: 'See what needs action now. A single dashboard to prioritize high-value work and manage all outstanding follow-ups.',
    },
    {
      icon: FileText,
      name: 'Client-Ready Reports',
      description: 'Generate professional, exportable reports to prove ROI and demonstrate consistent client engagement without manual effort.',
    },
  ];

  const roadmapFeatures = [
    {
      name: 'Automated Intake Processing',
      value: 'Automatically process client emails and form uploads into tasks.',
      tier: 'Pro/Enterprise',
    },
    {
      name: 'Smart Queue Automation',
      value: 'AI agents intelligently sort and assign tasks based on clinic rules and client history.',
      tier: 'Pro/Enterprise',
    },
    {
      name: 'Advanced Reporting & Analytics',
      value: 'Deep dive into follow-up effectiveness, client churn prediction, and benchmark reports.',
      tier: 'Enterprise',
    },
    {
      name: 'Team Roles & Permissions',
      value: 'Granular control over who can create, manage, and complete follow-up tasks within your clinic.',
      tier: 'Pro/Enterprise',
    },
    {
      name: 'Real-time Database Persistence',
      value: 'Your data stored securely with robust multi-clinic and multi-user support.',
      tier: 'Enterprise',
    },
    {
      name: 'Integrated Billing & Entitlements',
      value: 'Seamlessly manage subscriptions and unlock features based on your plan.',
      tier: 'Pro/Enterprise',
    },
    {
      name: 'Wellness Provider Automation',
      value: 'Automate reminders and follow-up sequences specific to different wellness treatments.',
      tier: 'Enterprise',
    },
  ];

  const howItWorksSteps = [
    {
      number: 1,
      title: 'Capture Client Information',
      description: 'Input raw client details, visit history, and free-form intake notes into our streamlined, intelligent form.',
    },
    {
      number: 2,
      title: 'Prioritize Follow-up Tasks',
      description: 'The system automatically converts notes into actionable follow-up tasks, appearing on your dashboard sorted by urgency.',
    },
    {
      number: 3,
      title: 'Generate Client-Ready Reports',
      description: 'Export professional reports showing follow-up activity and client engagement, proving your value effortlessly.',
    },
  ];

  const pricingTiers = [
    {
      name: 'Basic',
      price: '₹0',
      frequency: '/mo',
      description: 'For solo practitioners just starting out.',
      features: [
        '1 clinic location',
        '5 active clients',
        '10 active tasks',
        'Basic intake form',
      ],
      cta: 'Get Started',
      ctaHref: '/dashboard',
      highlight: false,
    },
    {
      name: 'Pro',
      price: '₹5,999',
      frequency: '/mo',
      description: 'The most popular choice for growing clinics.',
      features: [
        '1 clinic location',
        'Unlimited clients',
        'Unlimited active tasks',
        'Client-ready reports',
        'One-click roadmap unlock',
      ],
      cta: 'Start Free for 14 Days',
      ctaHref: '/dashboard',
      highlight: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      frequency: '',
      description: 'Tailored solutions for multi-location practices.',
      features: [
        'Multiple clinic locations',
        'Dedicated account manager',
        'Advanced security & SSO',
        'One-click roadmap unlock',
      ],
      cta: 'Contact Us',
      ctaHref: '#contact',
      highlight: false,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur border-b border-zinc-100 py-4">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl text-zinc-900 tracking-tight">
              {PRODUCT_NAME}
            </span>
          </Link>
          <div className="flex items-center space-x-6">
            <Link href="#features" className="text-zinc-600 hover:text-zinc-900 transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-zinc-600 hover:text-zinc-900 transition-colors">
              Pricing
            </Link>
            <Link
              href="/dashboard"
              className="bg-zinc-900 text-white rounded-lg px-4 py-2 hover:bg-zinc-700 transition-colors flex items-center gap-2"
            >
              Open Dashboard <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16">
          <div className="relative z-10">
            <span className="inline-flex items-center rounded-full bg-indigo-500/20 px-3 py-1 text-sm font-medium text-indigo-300 ring-1 ring-inset ring-indigo-500/20 mb-4">
              <Sparkles className="h-4 w-4 mr-1" /> AI-Powered Workflow
            </span>
            <h1 className="font-black text-5xl md:text-7xl tracking-tight leading-none text-white max-w-4xl mx-auto">
              Stop Losing Repeat Visits.
              <br />
              Automate Client Follow-ups.
            </h1>
            <p className="text-zinc-400 text-xl mt-4 max-w-2xl mx-auto">
              {PRODUCT_NAME} empowers wellness clinics to transform messy intake into prioritized tasks, ensuring no client falls through the cracks and boosting retention.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/dashboard"
                className="bg-white text-zinc-900 font-bold rounded-xl px-8 py-4 shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
              >
                Start Free Today <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/dashboard"
                className="border border-zinc-600 text-zinc-300 rounded-xl px-8 py-4 hover:bg-zinc-800 transition-colors flex items-center gap-2"
              >
                See It Live <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            {/* Hero Visual - CSS-only UI Mockup */}
            <div className="relative bg-zinc-800/50 border border-zinc-700 p-6 rounded-2xl max-w-5xl mx-auto mt-20 shadow-2xl">
              <div className="absolute top-4 left-4 flex space-x-2">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                <span className="w-3 h-3 bg-amber-500 rounded-full"></span>
                <span className="w-3 h-3 bg-emerald-500 rounded-full"></span>
              </div>
              <div className="h-6 bg-zinc-700/60 rounded-md mb-6 w-full max-w-xs ml-auto mr-auto"></div>
              <div className="flex space-x-4 h-[300px]">
                <div className="w-1/4 bg-zinc-700/30 rounded-lg p-4 flex flex-col space-y-3">
                  <div className="h-4 w-3/4 bg-zinc-600 rounded"></div>
                  <div className="h-4 w-2/3 bg-zinc-600 rounded"></div>
                  <div className="h-4 w-full bg-zinc-600 rounded"></div>
                  <div className="h-4 w-1/2 bg-zinc-600 rounded"></div>
                  <div className="h-4 w-5/6 bg-zinc-600 rounded"></div>
                </div>
                <div className="flex-1 bg-zinc-700/30 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="h-5 w-1/4 bg-zinc-600 rounded"></div>
                    <div className="h-5 w-1/6 bg-indigo-500 animate-pulse rounded"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="h-4 w-1/5 bg-emerald-500 rounded"></div>
                      <div className="h-4 w-3/5 bg-zinc-600 rounded"></div>
                      <div className="h-4 w-1/12 bg-zinc-600 rounded"></div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-4 w-1/5 bg-indigo-500 rounded"></div>
                      <div className="h-4 w-3/5 bg-zinc-600 rounded"></div>
                      <div className="h-4 w-1/12 bg-zinc-600 rounded"></div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-4 w-1/5 bg-zinc-600 rounded"></div>
                      <div className="h-4 w-3/5 bg-zinc-600 rounded"></div>
                      <div className="h-4 w-1/12 bg-zinc-600 rounded"></div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-4 w-1/5 bg-amber-500 rounded"></div>
                      <div className="h-4 w-3/5 bg-zinc-600 rounded"></div>
                      <div className="h-4 w-1/12 bg-zinc-600 rounded"></div>
                    </div>
                    <div className="h-4 w-full bg-zinc-700 rounded-md"></div>
                    <div className="h-4 w-5/6 bg-zinc-700 rounded-md"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Bar */}
        <section className="bg-zinc-800/30 border-y border-zinc-700/50 py-8">
          <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="font-black text-4xl text-white">1,000+</p>
              <p className="text-zinc-400 text-sm mt-1">Wellness Clinics</p>
            </div>
            <div>
              <p className="font-black text-4xl text-white">99.9%</p>
              <p className="text-zinc-400 text-sm mt-1">Uptime</p>
            </div>
            <div>
              <p className="font-black text-4xl text-white">25,000+</p>
              <p className="text-zinc-400 text-sm mt-1">Follow-ups Managed</p>
            </div>
            <div>
              <p className="font-black text-4xl text-white">4.8<Star className="inline-block h-5 w-5 fill-amber-400 text-amber-400 -mt-1 ml-1" /></p>
              <p className="text-zinc-400 text-sm mt-1">Customer Rating</p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-white py-24 px-6">
          <div className="container mx-auto">
            <h2 className="text-zinc-900 font-black text-4xl text-center tracking-tight">
              The 3 workflows that solve lost repeat visits
            </h2>
            <p className="text-zinc-500 mt-3 text-center max-w-2xl mx-auto text-lg">
              {PRODUCT_NAME} simplifies your most critical tasks, ensuring every client feels valued and returns for their next appointment.
            </p>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              {featureCards.map((feature, index) => (
                <div
                  key={index}
                  className="bg-zinc-50 rounded-2xl border border-zinc-100 p-6 hover:shadow-md transition-shadow flex flex-col items-start"
                >
                  <div className="p-3 bg-indigo-100 rounded-xl mb-4">
                    <feature.icon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="font-bold text-xl text-zinc-900 mb-2 tracking-tight">{feature.name}</h3>
                  <p className="text-zinc-600 text-base">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Locked Roadmap / Selling Points Section */}
        <section className="bg-zinc-950 text-white py-20 px-6">
          <div className="container mx-auto text-center">
            <h2 className="font-black text-4xl tracking-tight mb-8">
              Unlock the full roadmap in one click
            </h2>
            <p className="text-zinc-400 text-lg mb-12 max-w-2xl mx-auto">
              Ready to take your clinic operations to the next level? Upgrade to unlock powerful automation, advanced reporting, and team collaboration features.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {roadmapFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-zinc-800 border border-zinc-700 rounded-xl p-5 text-left flex items-start space-x-4"
                >
                  <Lock className="h-5 w-5 text-zinc-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg text-white tracking-tight">{feature.name}</h3>
                    <p className="text-zinc-400 text-sm mt-1">{feature.value}</p>
                    <p className="text-zinc-500 text-xs mt-2">Available after upgrade</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16">
              <Link
                href="#pricing"
                className="inline-flex items-center bg-indigo-600 text-white font-bold rounded-lg px-8 py-4 hover:bg-indigo-700 transition-colors shadow-lg"
              >
                Unlock Full Roadmap <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-zinc-50 py-24 px-6">
          <div className="container mx-auto">
            <h2 className="text-zinc-900 font-black text-4xl text-center tracking-tight mb-16">
              How {PRODUCT_NAME} works
            </h2>

            <div className="flex flex-col md:flex-row justify-center items-center md:items-start space-y-12 md:space-y-0 md:space-x-12">
              {howItWorksSteps.map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center max-w-sm">
                  <div className="relative flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full text-white font-bold text-2xl mb-6">
                    {step.number}
                  </div>
                  <h3 className="font-bold text-xl text-zinc-900 mb-3 tracking-tight">{step.title}</h3>
                  <p className="text-zinc-600 text-base">{step.description}</p>
                  {index < howItWorksSteps.length - 1 && (
                    <ArrowRight className="h-8 w-8 text-zinc-400 mt-8 md:mt-12 transform md:rotate-0 rotate-90" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="bg-white py-24 px-6">
          <div className="container mx-auto">
            <h2 className="text-zinc-900 font-black text-4xl text-center tracking-tight mb-16">
              Simple, transparent pricing
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {pricingTiers.map((tier, index) => (
                <div
                  key={index}
                  className={`relative bg-white border border-zinc-200 rounded-xl shadow-sm p-8 flex flex-col ${
                    tier.highlight ? 'ring-2 ring-indigo-500 scale-105' : ''
                  }`}
                >
                  {tier.highlight && (
                    <div className="absolute top-0 right-0 -mt-3 -mr-3 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
                      Most Popular
                    </div>
                  )}
                  <h3 className="font-bold text-2xl text-zinc-900 tracking-tight">{tier.name}</h3>
                  <p className="text-zinc-600 mt-2">{tier.description}</p>
                  <p className="mt-4 flex items-baseline">
                    <span className="font-black text-4xl text-zinc-900">{tier.price}</span>
                    {tier.frequency && <span className="text-zinc-600 text-lg ml-1">{tier.frequency}</span>}
                  </p>
                  <ul className="mt-8 space-y-4 flex-1">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-zinc-600">
                        <CircleCheck className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={tier.ctaHref}
                    className={`mt-10 block text-center rounded-lg px-6 py-3 font-semibold transition-colors ${
                      tier.highlight
                        ? 'bg-zinc-900 text-white hover:bg-zinc-700'
                        : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 border border-zinc-200'
                    }`}
                  >
                    {tier.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-zinc-50 py-24 px-6">
          <div className="container mx-auto">
            <h2 className="text-zinc-900 font-black text-4xl text-center tracking-tight mb-16">
              What our users say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white border border-zinc-200 rounded-xl shadow-sm p-6">
                <div className="flex text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-amber-400" />)}
                </div>
                <p className="text-zinc-600 italic leading-relaxed">
                  &ldquo;{PRODUCT_NAME} has revolutionized how we manage client retention. We used to lose so many potential repeat visits, but now nothing falls through the cracks. It&apos;s incredibly intuitive and has boosted our bookings.&rdquo;
                </p>
                <div className="mt-6">
                  <p className="font-semibold text-zinc-900">Sarah Chen</p>
                  <p className="text-zinc-400 text-sm">Clinic Owner, Wellness Path Clinic</p>
                </div>
              </div>
              <div className="bg-white border border-zinc-200 rounded-xl shadow-sm p-6">
                <div className="flex text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-amber-400" />)}
                </div>
                <p className="text-zinc-600 italic leading-relaxed">
                  &ldquo;Before this tool, our follow-up process was a chaotic mess of sticky notes and spreadsheets. Now, I have a clear, prioritized dashboard. My team is more efficient, and clients appreciate the consistent communication.&rdquo;
                </p>
                <div className="mt-6">
                  <p className="font-semibold text-zinc-900">Mark Johnson</p>
                  <p className="text-zinc-400 text-sm">Practice Manager, Holistic Health Hub</p>
                </div>
              </div>
              <div className="bg-white border border-zinc-200 rounded-xl shadow-sm p-6">
                <div className="flex text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-amber-400" />)}
                </div>
                <p className="text-zinc-600 italic leading-relaxed">
                  &ldquo;The client intake form is a game-changer. What used to take us ages to organize into actionable steps now happens almost instantly. And the reports? They make proving our value to clients effortless.&rdquo;
                </p>
                <div className="mt-6">
                  <p className="font-semibold text-zinc-900">Dr. Emily White</p>
                  <p className="text-zinc-400 text-sm">Lead Practitioner, Revive Wellness Center</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white py-24 px-6 text-center">
          <div className="container mx-auto">
            <h2 className="font-black text-4xl tracking-tight mb-4">
              Ready to stop losing repeat clients?
            </h2>
            <p className="text-indigo-100 text-xl max-w-2xl mx-auto mb-12">
              Join hundreds of wellness clinics who are transforming their client follow-up process and boosting retention.
            </p>
            <Link
              href="/dashboard"
              className="bg-white text-indigo-700 font-bold rounded-xl px-8 py-4 shadow-lg hover:shadow-