import { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

export default function RegisterPage({ onSwitchToLogin, onSuccess }) {
  const { register, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Initialize Google Sign-In
  useEffect(() => {
    const initGoogle = () => {
      if (window.google && window.google.accounts) {
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: handleGoogleResponse,
        });
        
        window.google.accounts.id.renderButton(
          document.getElementById('google-signup-btn'),
          { 
            theme: 'filled_black', 
            size: 'large', 
            width: '100%',
            text: 'signup_with',
            shape: 'rectangular'
          }
        );
      }
    };

    // Wait for Google script to load
    if (window.google) {
      initGoogle();
    } else {
      const checkGoogle = setInterval(() => {
        if (window.google) {
          initGoogle();
          clearInterval(checkGoogle);
        }
      }, 100);
      
      // Clear after 5 seconds
      setTimeout(() => clearInterval(checkGoogle), 5000);
    }
  }, []);

  const handleGoogleResponse = async (response) => {
    setError('');
    setLoading(true);
    
    try {
      await loginWithGoogle(response.credential);
      onSuccess?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Username validation
    if (username.length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setError('Username can only contain letters, numbers, and underscores');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await register(email, username, password);
      onSuccess?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <span className="auth-logo">◈</span>
          <h1>Create Account</h1>
          <p>Join EventHorizon and never miss a gaming event</p>
        </div>

        {/* Google Sign-Up Button */}
        <div className="google-btn-container">
          <div id="google-signup-btn"></div>
        </div>

        <div className="auth-divider">
          <span>or</span>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="auth-error">{error}</div>}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username"
              required
              minLength={3}
              maxLength={20}
            />
            <span className="form-hint">This will be displayed to others</span>
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account?</p>
          <button onClick={onSwitchToLogin} className="auth-switch">
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
