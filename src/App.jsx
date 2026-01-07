import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './AuthContext';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Popular games to suggest
const SUGGESTED_GAMES = [
  { searchTerm: "Path of Exile 2" },
  { searchTerm: "Diablo IV" },
  { searchTerm: "Counter-Strike 2" },
  { searchTerm: "Destiny 2" },
  { searchTerm: "Elden Ring" },
  { searchTerm: "Apex Legends" },
];

// ============ NAVIGATION ============
function Navigation({ currentPage, onNavigate, onSearch, onRefresh, isRefreshing, gamesCount }) {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-left">
        <div className="header-brand" onClick={() => onNavigate('home')}>
          <span className="header-logo">◈</span>
          <h1>Event<span className="highlight">Horizon</span></h1>
        </div>
        
        <nav className="header-nav">
          <button 
            className={`nav-btn ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => onNavigate('home')}
          >
            Home
          </button>
          <button 
            className={`nav-btn ${currentPage === 'mygames' ? 'active' : ''}`}
            onClick={() => onNavigate('mygames')}
          >
            Your Games {gamesCount > 0 && <span className="nav-badge">{gamesCount}</span>}
          </button>
          <button 
            className={`nav-btn ${currentPage === 'about' ? 'active' : ''}`}
            onClick={() => onNavigate('about')}
          >
            About
          </button>
        </nav>
      </div>
      
      <div className="header-right">
        {currentPage === 'mygames' && gamesCount > 0 && (
          <button 
            className="refresh-btn" 
            onClick={onRefresh}
            disabled={isRefreshing}
            title="Discover Events"
          >
            {isRefreshing ? '⟳' : '↻'}
          </button>
        )}
        
        <button className="add-btn" onClick={onSearch}>+ Add Game</button>
        
        {user && (
          <div className="user-menu">
            <span className="user-name">👤 {user.username}</span>
            <button className="logout-btn" onClick={logout}>Logout</button>
          </div>
        )}
      </div>
    </header>
  );
}

// ============ HOME PAGE ============
function HomePage({ onAddGame, onSearch, events, games, onSelectEvent }) {
  const [suggestedGames, setSuggestedGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuggestions = async () => {
      const fetchedGames = [];
      for (const suggestion of SUGGESTED_GAMES) {
        try {
          const response = await fetch(`${API_URL}/api/games?search=${encodeURIComponent(suggestion.searchTerm)}`);
          const data = await response.json();
          if (data && data.length > 0) {
            fetchedGames.push(data[0]);
          }
        } catch (err) {
          console.error('Failed to fetch:', err);
        }
      }
      setSuggestedGames(fetchedGames);
      setLoading(false);
    };
    fetchSuggestions();
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    date.setHours(0,0,0,0);
    today.setHours(0,0,0,0);
    tomorrow.setHours(0,0,0,0);
    
    if (date.getTime() === today.getTime()) return 'Today';
    if (date.getTime() === tomorrow.getTime()) return 'Tomorrow';
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getEventIcon = (type) => {
    const icons = { patch: '🔧', update: '⬆️', season: '🎬', expansion: '📦', dlc: '🎁' };
    return icons[type] || '📌';
  };

  return (
    <div className="home-page">
      <div className="cyber-bg"></div>
      <div className="grid-overlay"></div>
      
      <div className="home-content">
        <div className="logo-container">
          <div className="logo-glow"></div>
          <h1 className="logo">
            <span className="logo-icon">◈</span>
            <span className="logo-text">Event<span className="logo-highlight">Horizon</span></span>
          </h1>
        </div>

        <p className="tagline">Your personal gaming command center</p>
        <p className="description">
          Track patches, seasons, tournaments & events.<br />
          Never miss a moment in your favorite games.
        </p>

        {/* Timeline */}
        {games.length > 0 && (
          <div className="home-timeline">
            <h3 className="home-timeline-title">Your Timeline</h3>
            {events.length > 0 ? (
              <div className="home-timeline-scroll">
                {events.slice(0, 20).map(event => (
                  <div 
                    key={event.id || event.steam_gid} 
                    className="home-timeline-card"
                    onClick={() => onSelectEvent(event)}
                  >
                    <div className="htc-image">
                      {event.gameImage ? (
                        <img src={event.gameImage} alt="" />
                      ) : (
                        <div className="htc-image-placeholder"></div>
                      )}
                      <span className="htc-type-badge" data-type={event.type}>
                        {event.type?.toUpperCase()}
                      </span>
                    </div>
                    <div className="htc-content">
                      <span className="htc-game">{event.gameName || event.game_name}</span>
                      <span className="htc-title">{event.title}</span>
                      <span className="htc-date">{formatDate(event.date)}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="home-timeline-empty">
                No events yet. Go to Your Games and click ↻ to discover events!
              </div>
            )}
          </div>
        )}

        {/* Popular Games */}
        <div className="suggested-section">
          <h2 className="suggested-title">
            <span className="pulse-dot"></span>
            Popular Games
          </h2>
          
          {loading ? (
            <div className="loading-suggestions">
              <div className="cyber-loader"></div>
              <span>Loading...</span>
            </div>
          ) : (
            <div className="suggested-grid">
              {suggestedGames.map(game => (
                <div key={game.id} className="suggested-card" onClick={() => onAddGame(game)}>
                  <img src={game.background_image} alt={game.name} />
                  <div className="suggested-card-overlay">
                    <span className="suggested-card-name">{game.name}</span>
                    <span className="add-icon">+ Track</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button className="search-cta" onClick={onSearch}>
          <span>Search for other games</span>
          <span className="cta-arrow">→</span>
        </button>
      </div>
    </div>
  );
}

// ============ MY GAMES PAGE ============
function MyGamesPage({ games, events, onSelectGame, onSelectEvent, loadingEvents, onAddGame }) {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    date.setHours(0,0,0,0);
    today.setHours(0,0,0,0);
    tomorrow.setHours(0,0,0,0);
    
    if (date.getTime() === today.getTime()) return 'Today';
    if (date.getTime() === tomorrow.getTime()) return 'Tomorrow';
    
    const diff = Math.ceil((date - today) / (1000 * 60 * 60 * 24));
    if (diff < 0) return `${Math.abs(diff)}d ago`;
    if (diff <= 7) return `In ${diff} days`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getEventIcon = (type) => {
    const icons = { patch: '🔧', update: '⬆️', season: '🎬', expansion: '📦', dlc: '🎁' };
    return icons[type] || '📌';
  };

  const getGameStatus = (gameId) => {
    const gameEvents = events.filter(e => e.game_id === gameId);
    const today = new Date();
    today.setHours(0,0,0,0);

    for (const event of gameEvents) {
      const eventDate = new Date(event.date);
      eventDate.setHours(0,0,0,0);
      const diff = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
      
      if (diff === 0) return { label: 'TODAY', color: '#ef4444' };
      if (diff === 1) return { label: 'TOMORROW', color: '#f59e0b' };
      if (diff > 0 && diff <= 7) return { label: `${diff}d`, color: '#a855f7' };
    }
    return null;
  };

  if (games.length === 0) {
    return (
      <div className="mygames-page">
        <div className="empty-state-large">
          <div className="empty-icon">🎮</div>
          <h2>No games tracked yet</h2>
          <p>Add some games to start tracking events!</p>
          <button className="add-btn-large" onClick={onAddGame}>+ Add Game</button>
        </div>
      </div>
    );
  }

  return (
    <div className="mygames-page">
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Your Games</h2>
          <button className="section-add-btn" onClick={onAddGame}>+ Add Game</button>
        </div>
        <div className="games-grid">
          {games.map(game => {
            const status = getGameStatus(game.game_id);
            const gameData = game.game_data || {};
            return (
              <div key={game.game_id} className="game-tile" onClick={() => onSelectGame(game)}>
                <img src={game.game_image || gameData.background_image} alt={game.game_name} />
                {status && (
                  <div className="status-badge" style={{ backgroundColor: status.color }}>
                    {status.label}
                  </div>
                )}
                <div className="game-tile-overlay">
                  <span className="game-title">{game.game_name}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Timeline</h2>
        
        {loadingEvents ? (
          <div className="loading-state">Loading events...</div>
        ) : events.length === 0 ? (
          <div className="empty-state">
            <p>No events yet</p>
            <p className="hint">Click the ↻ button to discover events!</p>
          </div>
        ) : (
          <div className="timeline">
            {events.slice(0, 30).map(event => (
              <div key={event.id || event.steam_gid} className="timeline-row" onClick={() => onSelectEvent(event)}>
                <span className="timeline-icon">{getEventIcon(event.type)}</span>
                <span className="timeline-game">{event.gameName || event.game_name}</span>
                <span className="timeline-title">{event.title}</span>
                <span className="timeline-date">{formatDate(event.date)}</span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

// ============ ABOUT PAGE ============
function AboutPage() {
  return (
    <div className="about-page">
      <div className="about-content">
        <h1>About EventHorizon</h1>
        <p className="about-tagline">Your personal gaming command center</p>
        
        <div className="about-section">
          <h2>What is EventHorizon?</h2>
          <p>
            EventHorizon helps you track all the important events for your favorite games - 
            patches, DLC releases, seasonal content, and more. Never miss another update.
          </p>
        </div>

        <div className="about-section">
          <h2>Features</h2>
          <ul>
            <li>🎮 Track unlimited games</li>
            <li>✨ Auto-discover events from Steam</li>
            <li>📅 Unified timeline</li>
            <li>🔐 Personal account to save your data</li>
            <li>📝 Add custom events</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// ============ SEARCH MODAL ============
function SearchModal({ isOpen, onClose, onTrack, trackedIds }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/games?search=${encodeURIComponent(query)}`);
      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error('Search failed:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <h2>Find Games</h2>
        
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search games..."
            autoFocus
          />
          <button type="submit" disabled={loading}>{loading ? '...' : 'Search'}</button>
        </form>

        <div className="search-results">
          {results.map(game => (
            <div 
              key={game.id} 
              className={`search-result ${trackedIds.includes(game.id) ? 'tracked' : ''}`}
              onClick={() => !trackedIds.includes(game.id) && onTrack(game)}
            >
              <img src={game.background_image || '/placeholder.png'} alt={game.name} />
              <div className="search-result-info">
                <h4>{game.name}</h4>
                <span className={trackedIds.includes(game.id) ? 'badge-tracked' : 'badge-add'}>
                  {trackedIds.includes(game.id) ? '✓ Tracked' : '+ Track'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============ GAME MODAL ============
function GameModal({ game, onClose, onRemoveGame }) {
  if (!game) return null;

  const gameData = game.game_data || {};

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content game-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        
        <div className="game-modal-header" style={{ backgroundImage: `url(${game.game_image || gameData.background_image})` }}>
          <div className="game-modal-header-overlay">
            <h2>{game.game_name}</h2>
          </div>
        </div>

        <div className="game-modal-body">
          <button className="btn-remove-game" onClick={() => { onRemoveGame(game.game_id); onClose(); }}>
            Remove Game
          </button>
        </div>
      </div>
    </div>
  );
}

// ============ EVENT MODAL ============
function EventModal({ event, onClose }) {
  if (!event) return null;

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', { 
      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' 
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content event-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        
        {event.gameImage && (
          <div className="event-modal-header" style={{ backgroundImage: `url(${event.gameImage})` }}>
            <div className="event-modal-header-overlay">
              <span>{event.gameName || event.game_name}</span>
            </div>
          </div>
        )}
        
        <div className="event-modal-body">
          <h2>{event.title}</h2>
          <p className="event-modal-date">{formatDate(event.date)}</p>
          {event.description && <p className="event-modal-desc">{event.description}</p>}
          {event.source_url && (
            <a href={event.source_url} target="_blank" rel="noopener noreferrer" className="event-modal-link">
              View Source →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ============ MAIN APP CONTENT ============
function AppContent() {
  const { isAuthenticated, loading, authFetch, user } = useAuth();
  const [authPage, setAuthPage] = useState('login');
  
  const [games, setGames] = useState([]);
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState('home');
  const [showSearch, setShowSearch] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch user's games and timeline
  useEffect(() => {
    if (isAuthenticated) {
      fetchGames();
      fetchTimeline();
    }
  }, [isAuthenticated]);

  const fetchGames = async () => {
    try {
      const response = await authFetch('/api/user/games');
      const data = await response.json();
      setGames(data);
    } catch (err) {
      console.error('Failed to fetch games:', err);
    }
  };

  const fetchTimeline = async () => {
    setLoadingEvents(true);
    try {
      const response = await authFetch('/api/user/timeline');
      const data = await response.json();
      setEvents(data.events || []);
    } catch (err) {
      console.error('Failed to fetch timeline:', err);
    } finally {
      setLoadingEvents(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await authFetch('/api/discover/all', { method: 'POST' });
      await fetchTimeline();
    } catch (err) {
      console.error('Refresh failed:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleTrackGame = async (game) => {
    try {
      await authFetch('/api/user/games', {
        method: 'POST',
        body: { game }
      });
      await fetchGames();
      await fetchTimeline();
      setCurrentPage('mygames');
    } catch (err) {
      console.error('Track game failed:', err);
    }
    setShowSearch(false);
  };

  const handleRemoveGame = async (gameId) => {
    try {
      await authFetch(`/api/user/games/${gameId}`, { method: 'DELETE' });
      await fetchGames();
      await fetchTimeline();
    } catch (err) {
      console.error('Remove game failed:', err);
    }
  };

  // Show loading
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="cyber-loader"></div>
        <p>Loading...</p>
      </div>
    );
  }

  // Show auth pages if not logged in
  if (!isAuthenticated) {
    if (authPage === 'login') {
      return <LoginPage onSwitchToRegister={() => setAuthPage('register')} onSuccess={() => {}} />;
    }
    return <RegisterPage onSwitchToLogin={() => setAuthPage('login')} onSuccess={() => {}} />;
  }

  return (
    <div className="app">
      <Navigation 
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onSearch={() => setShowSearch(true)}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        gamesCount={games.length}
      />

      <main className="main">
        {currentPage === 'home' && (
          <HomePage 
            onAddGame={handleTrackGame} 
            onSearch={() => setShowSearch(true)}
            events={events}
            games={games}
            onSelectEvent={setSelectedEvent}
          />
        )}
        
        {currentPage === 'mygames' && (
          <MyGamesPage 
            games={games}
            events={events}
            onSelectGame={setSelectedGame}
            onSelectEvent={setSelectedEvent}
            loadingEvents={loadingEvents}
            onAddGame={() => setShowSearch(true)}
          />
        )}
        
        {currentPage === 'about' && <AboutPage />}
      </main>

      <SearchModal
        isOpen={showSearch}
        onClose={() => setShowSearch(false)}
        onTrack={handleTrackGame}
        trackedIds={games.map(g => g.game_id)}
      />

      <GameModal
        game={selectedGame}
        onClose={() => setSelectedGame(null)}
        onRemoveGame={handleRemoveGame}
      />

      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
}

// ============ APP WITH AUTH PROVIDER ============
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
