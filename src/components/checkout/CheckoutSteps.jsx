// src/components/checkout/CheckoutSteps.jsx
import { Check } from 'lucide-react';

export default function CheckoutSteps({ currentStep }) {
  const steps = [
    { id: 1, label: 'Cart' },
    { id: 2, label: 'Checkout' },
    { id: 3, label: 'Confirmation' },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-center">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div 
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm
                  ${currentStep >= step.id 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-200 text-gray-500'}
                  transition-colors duration-300
                `}
              >
                {currentStep > step.id ? (
                  <Check className="w-5 h-5" />
                ) : (
                  step.id
                )}
              </div>
              <span className={`text-xs mt-1 ${currentStep >= step.id ? 'text-indigo-600 font-medium' : 'text-gray-400'}`}>
                {step.label}
              </span>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="w-16 h-0.5 mx-2 bg-gray-200 relative">
                <div 
                  className={`
                    h-full bg-indigo-600 transition-all duration-500
                    ${currentStep > step.id ? 'w-full' : 'w-0'}
                  `}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}