/* eslint-disable @typescript-eslint/no-explicit-any */
// app/components/HowItWorks.tsx
'use client';
import { useInView } from 'react-intersection-observer';
import { Leaf, Salad, CalendarCheck, Truck } from 'lucide-react';
import styles from './HowItWorks.module.css';

const steps = [
  {
    icon: <Salad className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />,
    title: 'Set Your Preferences',
    text: 'Tell us your diet (vegan, keto, etc.), allergies, and goals.',
  },
  {
    icon: <CalendarCheck className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />,
    title: 'Pick Your Schedule',
    text: 'Choose delivery days and portion sizes.',
  },
  {
    icon: <Truck className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />,
    title: 'Enjoy Chef-Crafted Meals',
    text: 'Fresh meals arrive at your door, ready to heat & eat.',
  }
];

export default function HowItWorks() {
  return (
    <section className={`${styles.container} relative overflow-hidden mb-12 lg:mb-20`}>
      {/* Decorative Leaves */}
      <div className="absolute top-20 left-10 opacity-10 rotate-12">
        <Leaf className={`${styles.floatAnimation} w-36 h-36 text-emerald-300`} />
      </div>
      <div className="absolute bottom-10 right-10 opacity-10 -rotate-45">
        <Leaf className={`${styles.delayedFloat} w-36 h-36 text-emerald-300`} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-green-900  text-center mb-12 bg-clip-text  ">
          Fresh Journey Starts Here
        </h2>

        <div className="grid md:grid-cols-3 gap-8 relative mx-4 md:mx-12 lg:mx-20">
          {/* Animated Vine Connector */}
          <div className="hidden md:block absolute top-1/4 left-1/2 w-4/5 h-1 bg-gradient-to-r from-emerald-200 via-teal-200 to-emerald-200 dark:from-gray-700 dark:to-gray-700 transform -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden">
            <div className={`${styles.shimmer} absolute inset-0`} />
          </div>

          {steps.map((step, index) => (
            <StepCard 
              key={index}
              index={index}
              icon={step.icon}
              title={step.title}
              text={step.text}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({ index, icon, title, text }: { index: number, icon: any, title: string, text: string }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.25,
  });

  return (
    <div 
      ref={ref}
      className={`relative group ${styles.card}`}
      style={{
        viewTransitionName: `step-${index}`,
        animationDelay: `${index * 200}ms`,
      }}
    >
      <div className="h-full bg-white/90 dark:bg-gray-800 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-emerald-50 dark:border-emerald-900/50 hover:border-emerald-100 dark:hover:border-emerald-800">
        {/* Step Number */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className={`${inView ? styles.stepBounce : ''} w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg bg-emerald-600 ring-4 ring-emerald-100/50 dark:ring-emerald-900/30`}>
            {index + 1}
          </div>
        </div>

        {/* Icon Container */}
        <div className="mb-6 relative">
          <div className="relative w-24 h-24 mx-auto">
            <div className="absolute inset-0 bg-emerald-100/50 dark:bg-emerald-900/20 rounded-2xl transform rotate-45 scale-75 group-hover:scale-100 transition-all duration-300" />
            <div className="relative z-10 flex items-center justify-center h-full">
              <div className="p-4 rounded-full bg-white/90 dark:bg-gray-700 shadow-sm">
                {icon}
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-center mb-4 text-emerald-800 dark:text-emerald-100 font-serif">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-emerald-100/80 text-center leading-relaxed">
          {text}
        </p>

        {/* Progress Bar */}
        <div className="mt-6 flex justify-center">
          <div className={`w-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-1000 
            ${inView ? 'w-24' : ''} rounded-full`} />
        </div>
      </div>
    </div>
  );
}