import { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

export default function LoginPage({ onSwitchToRegister, onSuccess }) {
  const { login, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
          document.getElementById('google-signin-btn'),
          { 
            theme: 'filled_black', 
            size: 'large', 
            width: '100%',
            text: 'continue_with',
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
    setLoading(true);

    try {
      await login(email, password);
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
          <h1>Welcome Back</h1>
          <p>Sign in to your EventHorizon account</p>
        </div>

        {/* Google Sign-In Button */}
        <div className="google-btn-container">
          <div id="google-signin-btn"></div>
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
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account?</p>
          <button onClick={onSwitchToRegister} className="auth-switch">
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}
