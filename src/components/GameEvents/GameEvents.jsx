import './GameEvents.css';

function GameEvents({ game, onAddEvent, onDeleteEvent, selectedFilters }) {
  const getEventTypeInfo = (type) => {
    const types = {
      patch: { icon: '🔧', label: 'Patch', color: '#3b82f6' },
      dlc: { icon: '🎁', label: 'DLC', color: '#ec4899' },
      expansion: { icon: '📦', label: 'Expansion', color: '#06b6d4' },
      season: { icon: '🎬', label: 'Season', color: '#10b981' },
      movie: { icon: '🎥', label: 'Movie', color: '#f43f5e' },
      show: { icon: '📺', label: 'TV Show', color: '#ef4444' },
      tournament: { icon: '🏆', label: 'Tournament', color: '#eab308' },
      irl: { icon: '🎪', label: 'IRL Event', color: '#64748b' },
      ingame: { icon: '🎮', label: 'In-Game', color: '#22d3ee' }
    };
    return types[type] || types.patch;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const filteredEvents = game.events?.filter(event =>
    selectedFilters.length === 0 || selectedFilters.includes(event.type)
  ) || [];

  const sortedEvents = [...filteredEvents].sort((a, b) => 
    new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="game-events">
      <div className="game-events-header">
        <div 
          className="game-banner"
          style={{ backgroundImage: `url(${game.background_image})` }}
        >
          <div className="game-banner-overlay">
            <h1 className="game-title">{game.name}</h1>
            <div className="game-meta">
              {game.rating && (
                <span className="meta-badge">
                  ⭐ {game.rating.toFixed(1)}
                </span>
              )}
              {game.released && (
                <span className="meta-badge">
                  📅 {new Date(game.released).getFullYear()}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="game-events-content">
        <div className="events-toolbar">
          <h2 className="events-title">
            <span>📋</span>
            Events ({sortedEvents.length})
          </h2>
          <button onClick={onAddEvent} className="btn-add-event">
            <span>+</span> Add Event
          </button>
        </div>

        {sortedEvents.length === 0 ? (
          <div className="no-events">
            <div className="no-events-icon">📅</div>
            <p>No events added yet</p>
            <button onClick={onAddEvent} className="btn-add-first">
              Add Your First Event
            </button>
          </div>
        ) : (
          <div className="events-list">
            {sortedEvents.map(event => {
              const typeInfo = getEventTypeInfo(event.type);
              
              return (
                <div 
                  key={event.id}
                  className="event-item"
                  style={{ '--event-color': typeInfo.color }}
                >
                  <div className="event-item-header">
                    <div className="event-type-badge" style={{ backgroundColor: typeInfo.color }}>
                      <span>{typeInfo.icon}</span>
                      <span>{typeInfo.label}</span>
                    </div>
                    <button
                      onClick={() => onDeleteEvent(event.id)}
                      className="btn-delete"
                      title="Delete event"
                    >
                      🗑️
                    </button>
                  </div>

                  <h3 className="event-item-title">{event.title}</h3>
                  <div className="event-item-date">📅 {formatDate(event.date)}</div>
                  
                  {event.description && (
                    <p className="event-item-description">{event.description}</p>
                  )}

                  {event.url && (
                    <a 
                      href={event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="event-item-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      🔗 Source
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default GameEvents;
