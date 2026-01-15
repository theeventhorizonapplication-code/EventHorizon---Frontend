import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './AuthContext';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import './styles/App.css';

const API_URL = 'https://eventhorizon-backend-production.up.railway.app';

// Popular games to suggest
const SUGGESTED_GAMES = [
  { searchTerm: "Path of Exile 2" },
  { searchTerm: "Diablo IV" },
  { searchTerm: "Counter-Strike 2" },
  { searchTerm: "Destiny 2" },
  { searchTerm: "Elden Ring" },
  { searchTerm: "Apex Legends" },
];

// Genre list for browsing
const GENRES = [
  // Core
  { slug: 'action', name: 'Action' },
  { slug: 'role-playing-games-rpg', name: 'RPG' },
  { slug: 'shooter', name: 'Shooter' },
  { slug: 'strategy', name: 'Strategy' },
  { slug: 'adventure', name: 'Adventure' },
  { slug: 'puzzle', name: 'Puzzle' },
  { slug: 'platformer', name: 'Platformer' },
  { slug: 'fighting', name: 'Fighting' },
  { slug: 'racing', name: 'Racing' },
  { slug: 'sports', name: 'Sports' },
  { slug: 'simulation', name: 'Simulation' },
  { slug: 'indie', name: 'Indie' },
  // Specific
  { slug: 'battle-royale', name: 'Battle Royale', tag: true },
  { slug: 'survival', name: 'Survival', tag: true },
  { slug: 'horror', name: 'Horror', tag: true },
  { slug: 'roguelike', name: 'Roguelike', tag: true },
  { slug: 'massively-multiplayer', name: 'MMORPG' },
  { slug: 'card', name: 'Card' },
  { slug: 'moba', name: 'MOBA', tag: true },
  { slug: 'metroidvania', name: 'Metroidvania', tag: true },
  { slug: 'souls-like', name: 'Souls-like', tag: true },
  { slug: 'open-world', name: 'Open World', tag: true },
  { slug: 'tower-defense', name: 'Tower Defense', tag: true },
  { slug: 'city-builder', name: 'City Builder', tag: true },
  { slug: 'sandbox', name: 'Sandbox', tag: true },
  { slug: 'co-op', name: 'Co-op', tag: true },
  { slug: 'arcade', name: 'Arcade' },
  { slug: 'turn-based', name: 'Turn-Based', tag: true },
  { slug: 'real-time-strategy', name: 'RTS', tag: true },
  { slug: 'hack-and-slash', name: 'Hack and Slash', tag: true },
  { slug: 'dungeon-crawler', name: 'Dungeon Crawler', tag: true },
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

// ============ TODAY MODAL ============
function TodayModal({ isOpen, onClose, events, onSelectEvent }) {
  if (!isOpen) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate.getTime() === today.getTime();
  });

  const formattedDate = today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content today-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        
        <div className="today-modal-header">
          <span className="today-modal-icon">📅</span>
          <h2>Today's Events</h2>
          <p className="today-modal-date">{formattedDate}</p>
        </div>

        <div className="today-modal-body">
          {todayEvents.length > 0 ? (
            <div className="today-events-list">
              {todayEvents.map(event => (
                <div 
                  key={event.id || event.steam_gid} 
                  className="today-event-card"
                  onClick={() => { onSelectEvent(event); onClose(); }}
                >
                  {event.gameImage && (
                    <img src={event.gameImage} alt="" className="today-event-image" />
                  )}
                  <div className="today-event-info">
                    <span className="today-event-game">{event.gameName || event.game_name}</span>
                    <span className="today-event-title">{event.title}</span>
                    <span className="today-event-type" data-type={event.type}>
                      {event.type?.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="today-empty">
              <span className="today-empty-icon">🎮</span>
              <p>No events scheduled for today</p>
              <span className="today-empty-hint">Check back tomorrow or browse your timeline!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============ GENRE MODAL ============
function GenreModal({ isOpen, onClose, genre, onTrack, trackedIds }) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || !genre) return;

    const fetchGenreGames = async () => {
      setLoading(true);
      setGames([]);
      try {
        const param = genre.tag ? 'tags' : 'genres';
        const response = await fetch(`${API_URL}/api/games/browse?${param}=${genre.slug}`);
        const data = await response.json();
        setGames(data || []);
      } catch (err) {
        console.error('Failed to fetch genre games:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGenreGames();
  }, [isOpen, genre]);

  if (!isOpen || !genre) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content genre-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        
        <div className="genre-modal-header">
          <h2>{genre.name} Games</h2>
          <p className="genre-modal-subtitle">Popular games in this genre</p>
        </div>

        <div className="genre-modal-body">
          {loading ? (
            <div className="genre-loading">
              <div className="cyber-loader"></div>
              <span>Loading games...</span>
            </div>
          ) : games.length > 0 ? (
            <div className="genre-games-grid">
              {games.map(game => (
                <div 
                  key={game.id} 
                  className={`genre-game-card ${trackedIds.includes(game.id) ? 'tracked' : ''}`}
                  onClick={() => !trackedIds.includes(game.id) && onTrack(game)}
                >
                  <img src={game.background_image || '/placeholder.png'} alt={game.name} />
                  <div className="genre-game-overlay">
                    <span className="genre-game-name">{game.name}</span>
                    {game.metacritic && (
                      <span className="genre-game-score">{game.metacritic}</span>
                    )}
                    <span className={trackedIds.includes(game.id) ? 'badge-tracked' : 'badge-add'}>
                      {trackedIds.includes(game.id) ? '✓ Tracked' : '+ Track'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="genre-empty">
              <p>No games found for this genre</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============ HOME PAGE ============
function HomePage({ onAddGame, onSearch, events, games, onSelectEvent, onShowToday, onSelectGenre }) {
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

  // Get today's date formatted
  const getTodayFormatted = () => {
    return new Date().toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Count today's events
  const getTodayEventCount = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return events.filter(event => {
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate.getTime() === today.getTime();
    }).length;
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
            <div className="timeline-header">
              <h3 className="home-timeline-title">Your Timeline</h3>
              <button className="today-btn" onClick={onShowToday}>
                <span className="today-btn-icon">📅</span>
                <span className="today-btn-date">{getTodayFormatted()}</span>
                {getTodayEventCount() > 0 && (
                  <span className="today-btn-badge">{getTodayEventCount()}</span>
                )}
              </button>
            </div>
            {events.length > 0 ? (
              <div className="home-timeline-scroll">
                {events.slice(0, 20).map(event => (
                  <div 
                    key={event.id || event.steam_gid} 
                    className="home-timeline-card"
                    onClick={() => onSelectEvent(event)}
                  >
                    <span className="htc-date">{formatDate(event.date)}</span>
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

        {/* Browse by Genre */}
        <div className="genre-section">
          <h2 className="genre-section-title">
            <span className="pulse-dot"></span>
            Browse by Genre
          </h2>
          <div className="genre-tags">
            {GENRES.map(genre => (
              <button 
                key={genre.slug} 
                className="genre-tag"
                onClick={() => onSelectGenre(genre)}
              >
                {genre.name}
              </button>
            ))}
          </div>
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
      
      if (diff === 0) return { type: 'today', text: 'Event Today!', color: '#22d3ee' };
      if (diff === 1) return { type: 'tomorrow', text: 'Event Tomorrow', color: '#a78bfa' };
      if (diff > 0 && diff <= 7) return { type: 'soon', text: `Event in ${diff} days`, color: '#60a5fa' };
    }
    return null;
  };

  if (games.length === 0) {
    return (
      <div className="mygames-page empty-state">
        <div className="empty-message">
          <span className="empty-icon">🎮</span>
          <h2>No games tracked yet</h2>
          <p>Start by adding some games to track their events</p>
          <button className="add-btn-large" onClick={onAddGame}>+ Add Your First Game</button>
        </div>
      </div>
    );
  }

  return (
    <div className="mygames-page">
      {/* Games Grid */}
      <section className="games-section">
        <h2 className="section-title">Your Games</h2>
        <div className="games-grid">
          {games.map(game => {
            const status = getGameStatus(game.game_id);
            return (
              <div 
                key={game.id} 
                className={`game-card ${status ? 'has-event' : ''}`}
                onClick={() => onSelectGame(game)}
              >
                <img src={game.game_image} alt={game.game_name} />
                <div className="game-card-overlay">
                  <span className="game-card-name">{game.game_name}</span>
                  {status && (
                    <span className="game-status" style={{ color: status.color }}>
                      {status.text}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Timeline */}
      <section className="timeline-section">
        <h2 className="section-title">Upcoming Events</h2>
        {loadingEvents ? (
          <div className="loading-events">
            <div className="cyber-loader"></div>
            <span>Loading events...</span>
          </div>
        ) : events.length > 0 ? (
          <div className="timeline-list">
            {events.map(event => (
              <div 
                key={event.id || event.steam_gid} 
                className="timeline-row"
                onClick={() => onSelectEvent(event)}
              >
                <span className="timeline-icon">{getEventIcon(event.type)}</span>
                <span className="timeline-game">{event.gameName || event.game_name}</span>
                <span className="timeline-title">{event.title}</span>
                <span className="timeline-date">{formatDate(event.date)}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-events-message">
            <p>No events found. Click ↻ in the header to discover events!</p>
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
        <p>
          EventHorizon helps you track all the important events for your favorite games -
          patches, seasons, DLCs, tournaments, and more.
        </p>
        <h2>How it works</h2>
        <ol>
          <li>Add games you want to track</li>
          <li>Click the refresh button to discover events</li>
          <li>View your personalized timeline</li>
        </ol>
        <h2>Features</h2>
        <ul>
          <li>Track multiple games at once</li>
          <li>Automatic event discovery</li>
          <li>Clean, organized timeline view</li>
          <li>Details and source links for each event</li>
        </ul>
      </div>
    </div>
  );
}

// ============ SEARCH MODAL ============
function SearchModal({ isOpen, onClose, onTrack, trackedIds }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setSearching(true);
    try {
      const response = await fetch(`${API_URL}/api/games?search=${encodeURIComponent(query)}`);
      const data = await response.json();
      setResults(data || []);
    } catch (err) {
      console.error('Search failed:', err);
    } finally {
      setSearching(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content search-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <h2>Search Games</h2>
        
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a game..."
            autoFocus
          />
          <button type="submit" disabled={searching}>
            {searching ? 'Searching...' : 'Search'}
          </button>
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
  const [showToday, setShowToday] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null);
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
            onShowToday={() => setShowToday(true)}
            onSelectGenre={setSelectedGenre}
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

      <TodayModal
        isOpen={showToday}
        onClose={() => setShowToday(false)}
        events={events}
        onSelectEvent={setSelectedEvent}
      />

      <GenreModal
        isOpen={!!selectedGenre}
        onClose={() => setSelectedGenre(null)}
        genre={selectedGenre}
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
