// src/components/profile/PasswordTab.jsx
import { useState } from 'react';
import { Key, Eye, EyeOff, Check, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function PasswordTab({ userId, onChangePassword }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const [loading, setLoading] = useState(false);

  // Password validation checks
  const checks = {
    length: newPassword.length >= 6,
    hasNumber: /\d/.test(newPassword),
    hasLetter: /[a-zA-Z]/.test(newPassword),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
  };

  const allChecksPassed = Object.values(checks).every(Boolean);
  const passwordsMatch = newPassword === confirmPassword;
  const isFormValid = allChecksPassed && passwordsMatch && currentPassword.length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) return;

    setLoading(true);
    try {
      await onChangePassword(userId, currentPassword, newPassword);
      toast.success('Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      toast.error(error.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Security</h2>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Current Password
          </label>
          <div className="relative">
            <input
              id="currentPassword"
              type={showPasswords ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none pr-10"
              placeholder="••••••••"
            />
          </div>
        </div>

        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
            New Password
          </label>
          <div className="relative">
            <input
              id="newPassword"
              type={showPasswords ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none pr-10"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPasswords(!showPasswords)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPasswords ? (
                <EyeOff className="w-5 h-5 text-gray-400" />
              ) : (
                <Eye className="w-5 h-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {newPassword && (
          <div className="space-y-1 text-sm bg-gray-50 p-3 rounded-lg">
            <p className="text-gray-600 font-medium">Password must:</p>
            <div className="space-y-1">
              <PasswordCheck passed={checks.length} text="Be at least 6 characters" />
              <PasswordCheck passed={checks.hasNumber} text="Contain at least one number" />
              <PasswordCheck passed={checks.hasLetter} text="Contain at least one letter" />
              <PasswordCheck passed={checks.hasSpecial} text="Contain at least one special character" />
            </div>
          </div>
        )}

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirm New Password
          </label>
          <input
            id="confirmPassword"
            type={showPasswords ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`
              w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none
              ${confirmPassword && !passwordsMatch ? 'border-red-500' : 'border-gray-300'}
            `}
            placeholder="••••••••"
          />
          {confirmPassword && !passwordsMatch && (
            <p className="mt-1 text-sm text-red-600">Passwords do not match</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading || !isFormValid}
          className={`
            w-full flex justify-center items-center gap-2 px-6 py-2 rounded-lg text-white
            ${loading || !isFormValid
              ? 'bg-indigo-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700'}
          `}
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Updating...
            </>
          ) : (
            <>
              <Key className="w-4 h-4" />
              Update Password
            </>
          )}
        </button>
      </form>
    </div>
  );
}

function PasswordCheck({ passed, text }) {
  return (
    <div className="flex items-center gap-2">
      {passed ? (
        <Check className="w-4 h-4 text-green-500" />
      ) : (
        <X className="w-4 h-4 text-gray-400" />
      )}
      <span className={passed ? 'text-green-600' : 'text-gray-500'}>
        {text}
      </span>
    </div>
  );
}