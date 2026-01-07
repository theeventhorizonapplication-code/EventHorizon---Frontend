import React from 'react';
import './Timeline.css';

const Timeline = ({ games, onGameClick }) => {
  // Sort games by release date
  const sortedGames = [...games].sort((a, b) => {
    if (!a.released) return 1;
    if (!b.released) return -1;
    return new Date(a.released) - new Date(b.released);
  });

  const formatDate = (dateString) => {
    if (!dateString) return 'TBA';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getGameStatus = (game) => {
    if (!game.released) return { label: 'TBA', class: 'status-tba' };
    
    const releaseDate = new Date(game.released);
    const today = new Date();
    
    if (releaseDate > today) {
      const daysUntil = game.daysUntilRelease;
      return { 
        label: `${daysUntil} days`, 
        class: 'status-upcoming' 
      };
    } else {
      return { label: 'Released', class: 'status-released' };
    }
  };

  return (
    <div className="timeline-wrapper">
      <div className="timeline-container">
        <div className="timeline-grid">
          {sortedGames.map((game) => {
            const status = getGameStatus(game);
            
            return (
              <div 
                key={game.id} 
                className={`timeline-card ${status.class}`}
                onClick={() => onGameClick(game.id)}
              >
                <img 
                  src={game.background_image || '/placeholder.png'} 
                  alt={game.name} 
                />
                <div className="game-info">
                  <h3>{game.name}</h3>
                  <p className="date">{formatDate(game.released)}</p>
                  <span className={`status-badge ${status.class}`}>
                    {status.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Visual timeline bar */}
      <div className="timeline-bar">
        <div className="timeline-line"></div>
        {sortedGames.map((game, index) => (
          <div 
            key={game.id}
            className="timeline-marker"
            style={{ left: `${(index / (sortedGames.length - 1)) * 100}%` }}
            title={`${game.name} - ${formatDate(game.released)}`}
          >
            <div className="marker-dot"></div>
            <div className="marker-label">{formatDate(game.released)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;