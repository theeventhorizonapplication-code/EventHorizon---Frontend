import React from 'react';
import './GameDetail.css';
import "./GameDetail.css";


const GameDetail = ({ game, isTracked, onTrack, onBack }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'TBA';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="game-detail">
      <button onClick={onBack} className="back-button">
        ⬅️ Back
      </button>

      {/* Hero Section */}
      <div 
        className="detail-hero"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(${game.background_image})` 
        }}
      >
        <div className="hero-content">
          <h1>{game.name}</h1>
          <div className="hero-meta">
            {game.released && (
              <span className="meta-item">
                📅 {formatDate(game.released)}
              </span>
            )}
            {game.rating && (
              <span className="meta-item">
                ⭐ {game.rating}/5
              </span>
            )}
            {game.metacritic && (
              <span className="meta-item metacritic">
                Metacritic: {game.metacritic}
              </span>
            )}
          </div>
          <button 
            onClick={onTrack}
            className={isTracked ? 'btn-tracked' : 'btn-track-large'}
          >
            {isTracked ? '✓ Tracked' : '+ Track This Game'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="detail-content">
        
        {/* Description */}
        {game.description && (
          <div className="detail-section">
            <h2>About</h2>
            <p className="description">{game.description}</p>
          </div>
        )}

        {/* Info Grid */}
        <div className="detail-section">
          <h2>Game Info</h2>
          <div className="info-grid">
            {game.genres?.length > 0 && (
              <div className="info-item">
                <strong>Genres:</strong>
                <div className="tag-list">
                  {game.genres.map((genre, i) => (
                    <span key={i} className="tag">{genre}</span>
                  ))}
                </div>
              </div>
            )}

            {game.platforms?.length > 0 && (
              <div className="info-item">
                <strong>Platforms:</strong>
                <div className="tag-list">
                  {game.platforms.map((platform, i) => (
                    <span key={i} className="tag platform-tag">{platform}</span>
                  ))}
                </div>
              </div>
            )}

            {game.developers?.length > 0 && (
              <div className="info-item">
                <strong>Developers:</strong>
                <p>{game.developers.join(', ')}</p>
              </div>
            )}

            {game.publishers?.length > 0 && (
              <div className="info-item">
                <strong>Publishers:</strong>
                <p>{game.publishers.join(', ')}</p>
              </div>
            )}

            {game.esrb_rating && (
              <div className="info-item">
                <strong>ESRB Rating:</strong>
                <span className="tag esrb-tag">{game.esrb_rating}</span>
              </div>
            )}
          </div>
        </div>

        {/* DLC Section */}
        {game.dlc?.length > 0 && (
          <div className="detail-section">
            <h2>DLC & Expansions</h2>
            <div className="dlc-list">
              {game.dlc.map((dlc) => (
                <div key={dlc.id} className="dlc-item">
                  <h4>{dlc.name}</h4>
                  <p>{formatDate(dlc.released)}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        <div className="detail-section">
          <h2>Links</h2>
          <div className="link-buttons">
            {game.website && (
              <a 
                href={game.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="link-button"
              >
                🌐 Official Website
              </a>
            )}
            {game.reddit_url && (
              <a 
                href={game.reddit_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="link-button"
              >
                💬 Reddit Community
              </a>
            )}
          </div>
        </div>

        {/* Screenshots */}
        {game.screenshots?.length > 0 && (
          <div className="detail-section">
            <h2>Screenshots</h2>
            <div className="screenshot-grid">
              {game.screenshots.map((screenshot, i) => (
                <img 
                  key={i}
                  src={screenshot.image} 
                  alt={`${game.name} screenshot ${i + 1}`}
                  className="screenshot"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameDetail;