// src/components/checkout/CheckoutForm.jsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkoutSchema, defaultCheckoutValues } from '../../utils/validationSchemas';
import FormInput from './FormInput';
import FormSelect from './FormSelect';

export default function CheckoutForm({ onSubmit, isLoading }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: defaultCheckoutValues,
    mode: 'onBlur',
  });

  const cardNumber = watch('cardNumber');

  // Format card number as user types
  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 16);
    const formatted = cleaned.replace(/(.{4})/g, '$1 ').trim();
    return formatted;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Personal Information Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Full Name"
            name="fullName"
            register={register}
            error={errors.fullName}
            placeholder="John Doe"
          />
          <FormInput
            label="Email"
            name="email"
            type="email"
            register={register}
            error={errors.email}
            placeholder="john@example.com"
          />
          <FormInput
            label="Phone"
            name="phone"
            type="tel"
            register={register}
            error={errors.phone}
            placeholder="1234567890"
          />
        </div>
      </div>

      {/* Address Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Shipping Address
        </h3>
        <div className="space-y-4">
          <FormInput
            label="Address Line 1"
            name="addressLine1"
            register={register}
            error={errors.addressLine1}
            placeholder="123 Main Street"
          />
          <FormInput
            label="Address Line 2 (Optional)"
            name="addressLine2"
            register={register}
            error={errors.addressLine2}
            placeholder="Apartment, Suite, etc."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormInput
              label="City"
              name="city"
              register={register}
              error={errors.city}
              placeholder="New York"
            />
            <FormInput
              label="State/Province"
              name="state"
              register={register}
              error={errors.state}
              placeholder="NY"
            />
            <FormInput
              label="ZIP Code"
              name="zipCode"
              register={register}
              error={errors.zipCode}
              placeholder="10001"
            />
          </div>
          <FormSelect
            label="Country"
            name="country"
            register={register}
            error={errors.country}
            options={[
              { value: 'US', label: 'United States' },
              { value: 'CA', label: 'Canada' },
              { value: 'UK', label: 'United Kingdom' },
              { value: 'AU', label: 'Australia' },
              { value: 'DE', label: 'Germany' },
              { value: 'FR', label: 'France' },
              { value: 'JP', label: 'Japan' },
            ]}
          />
        </div>
      </div>

      {/* Payment Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Payment Information
        </h3>
        <div className="space-y-4">
          <div className="relative">
            <FormInput
              label="Card Number"
              name="cardNumber"
              register={register}
              error={errors.cardNumber}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              onChange={(e) => {
                const formatted = formatCardNumber(e.target.value);
                e.target.value = formatted;
              }}
            />
            {cardNumber && cardNumber.replace(/\s/g, '').length > 0 && (
              <div className="mt-1 text-xs text-gray-500">
                {cardNumber.replace(/\s/g, '').length < 16 
                  ? `Entered ${cardNumber.replace(/\s/g, '').length}/16 digits` 
                  : '✓ Valid card format'}
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Expiry Date"
              name="expiryDate"
              register={register}
              error={errors.expiryDate}
              placeholder="MM/YY"
              maxLength={5}
            />
            <FormInput
              label="CVV"
              name="cvv"
              type="password"
              register={register}
              error={errors.cvv}
              placeholder="123"
              maxLength={3}
            />
          </div>
        </div>
      </div>

      {/* Terms & Conditions */}
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            {...register('agreeToTerms')}
            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="agreeToTerms" className="text-gray-700">
            I agree to the{' '}
            <a href="#" className="text-indigo-600 hover:underline">
              Terms & Conditions
            </a>
            {' '}and{' '}
            <a href="#" className="text-indigo-600 hover:underline">
              Privacy Policy
            </a>
          </label>
          {errors.agreeToTerms && (
            <p className="mt-1 text-sm text-red-600">
              {errors.agreeToTerms.message}
            </p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className={`
          w-full py-3 px-4 rounded-lg font-semibold text-white
          transition-colors duration-200
          ${isLoading 
            ? 'bg-indigo-400 cursor-not-allowed' 
            : 'bg-indigo-600 hover:bg-indigo-700'}
        `}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          'Place Order'
        )}
      </button>
    </form>
  );
}