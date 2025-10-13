'use client';

import { useState } from 'react';
import Container from './container';

const pricingPlans = [
  {
    name: 'Basic',
    monthly: '$10',
    yearly: '$100',
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
  },
  {
    name: 'Pro',
    monthly: '$20',
    yearly: '$200',
    features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
    popular: true, // Mark this plan as popular
  },
  {
    name: 'Enterprise',
    monthly: '$40',
    yearly: '$400',
    features: ['All Features Included'],
  },
];

export default function Pricing() {
  const [billing, setBilling] = useState('monthly');

  return (
    <Container>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Billing Toggle */}
          <div className="mt-8 flex justify-center items-center space-x-4">
            <span
              className={`cursor-pointer ${billing === 'monthly' ? 'font-bold text-indigo-600' : 'text-gray-500 dark:text-gray-400'}`}
              onClick={() => setBilling('monthly')}
            >
              Monthly
            </span>
            <div
              className="relative w-16 h-8 flex items-center bg-gray-300 rounded-full p-1 dark:bg-gray-700 cursor-pointer"
              onClick={() => setBilling(billing === 'monthly' ? 'yearly' : 'monthly')}
            >
              <div
                className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
                  billing === 'yearly' ? 'translate-x-8' : ''
                }`}
              />
            </div>
            <span
              className={`cursor-pointer ${billing === 'yearly' ? 'font-bold text-indigo-600' : 'text-gray-500 dark:text-gray-400'}`}
              onClick={() => setBilling('yearly')}
            >
              Yearly
            </span>
          </div>

          {/* Pricing Cards */}
          <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-3">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative border dark:border-gray-700 rounded-2xl shadow-sm bg-white dark:bg-trueGray-800 p-8 flex flex-col justify-between transform transition hover:scale-105 hover:shadow-lg`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-indigo-600 text-white px-3 py-1 rounded-bl-lg text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{plan.name}</h3>
                  <p className="mt-4 text-3xl font-extrabold text-gray-900 dark:text-gray-100">
                    {billing === 'monthly' ? plan.monthly : plan.yearly}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="text-gray-600 dark:text-gray-300 flex items-center">
                        <svg
                          className="w-5 h-5 text-green-500 mr-2"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <button className="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition">
                  Start {plan.name}
                </button>
              </div>
            ))}
          </div>
        </div>
    </Container>
  );
}
