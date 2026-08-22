// src/components/checkout/FormInput.jsx
export default function FormInput({
  label,
  name,
  type = 'text',
  register,
  error,
  placeholder,
  maxLength,
  onChange,
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
        {...register(name)}
        onChange={onChange}
        className={`
          w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none
          ${error 
            ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
            : 'border-gray-300'}
        `}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error.message}
        </p>
      )}
    </div>
  );
}