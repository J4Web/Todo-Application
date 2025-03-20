import React, { useState } from "react";
import { LogIn, UserPlus } from "lucide-react";

// Type definitions
interface AuthProps {
  onLogin: (user: { username: string; password: string }) => void;
  onSignup: (user: { username: string; password: string }) => void;
}

interface LoginProps {
  onLogin: (user: { username: string; password: string }) => void;
  onSwitchToSignup: () => void;
}

interface SignupProps {
  onSignup: (user: { username: string; password: string }) => void;
  onSwitchToLogin: () => void;
}

export function Login({ onLogin, onSwitchToSignup }: LoginProps) {
  const [Username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onLogin({ username: Username, password: password });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm border">
      <div className="flex justify-center mb-6">
        <div className="p-3 bg-blue-100 rounded-full">
          <LogIn className="h-6 w-6 text-blue-600" />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="Username"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Username
          </label>
          <input
            id="Username"
            type="Username"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Login
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={onSwitchToSignup}
            className="text-blue-600 hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}

// Signup Component
export function Signup({ onSignup, onSwitchToLogin }: SignupProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === confirmPassword) {
      onSignup({ username, password });
    }
  };

  const handleSignUp = () => {
    if (password === confirmPassword) {
      onSignup({ username: username, password: password });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm border">
      <div className="flex justify-center mb-6">
        <div className="p-3 bg-blue-100 rounded-full">
          <UserPlus className="h-6 w-6 text-blue-600" />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="Username"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Username
          </label>
          <input
            id="Username"
            type="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          disabled={password !== confirmPassword}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          onClick={handleSignUp}
        >
          Sign Up
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <button
            onClick={onSwitchToLogin}
            className="text-blue-600 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

// Auth Container Component
export default function AuthContainer({ onLogin, onSignup }: AuthProps) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="max-w-4xl mx-auto p-4 pt-8">
      {showLogin ? (
        <Login onLogin={onLogin} onSwitchToSignup={() => setShowLogin(false)} />
      ) : (
        <Signup
          onSignup={onSignup}
          onSwitchToLogin={() => setShowLogin(true)}
        />
      )}
    </div>
  );
}
