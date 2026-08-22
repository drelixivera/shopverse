// src/components/orders/OrderTimeline.jsx
import { getStatusSteps, getCurrentStepIndex } from '../../services/orderStatus';
import { Check } from 'lucide-react';

export default function OrderTimeline({ currentStatus, orderId }) {
  const steps = getStatusSteps();
  const currentIndex = getCurrentStepIndex(currentStatus);

  return (
    <div className="py-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Order Status</h3>
      
      {/* Progress Bar */}
      <div className="relative">
        {/* Background line */}
        <div className="absolute left-0 top-5 w-full h-1 bg-gray-200 rounded-full"></div>
        
        {/* Progress line */}
        <div 
          className="absolute left-0 top-5 h-1 bg-indigo-600 rounded-full transition-all duration-500"
          style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
        ></div>

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const isCompleted = index <= currentIndex;
            const isCurrent = index === currentIndex;
            
            return (
              <div key={step.key} className="flex flex-col items-center">
                {/* Circle */}
                <div 
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300
                    ${isCompleted 
                      ? 'bg-indigo-600 border-indigo-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-400'}
                    ${isCurrent ? 'ring-4 ring-indigo-200' : ''}
                  `}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>

                {/* Label */}
                <div className="mt-2 text-center">
                  <p className={`text-sm font-medium ${isCompleted ? 'text-indigo-600' : 'text-gray-400'}`}>
                    {step.label}
                  </p>
                  {isCurrent && (
                    <p className="text-xs text-indigo-500 mt-0.5">Current</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Status History */}
      <div className="mt-8 border-t border-gray-200 pt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Status History</h4>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {currentStatus && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Current Status</span>
              <span className="font-medium text-indigo-600">{currentStatus}</span>
            </div>
          )}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Order ID</span>
            <span className="font-mono text-xs">{orderId}</span>
          </div>
        </div>
      </div>
    </div>
  );
}