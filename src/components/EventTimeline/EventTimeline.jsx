import './EventTimeline.css';

function EventTimeline({ events, onEventClick }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDaysUntil = (dateString) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    const diffTime = eventDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatCountdown = (daysUntil) => {
    if (daysUntil < 0) return `${Math.abs(daysUntil)} days ago`;
    if (daysUntil === 0) return 'Today!';
    if (daysUntil === 1) return 'Tomorrow';
    return `in ${daysUntil} days`;
  };

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

  if (!events || events.length === 0) {
    return (
      <div className="empty-timeline">
        <div className="empty-timeline-icon">📅</div>
        <h2>No events yet</h2>
        <p className="empty-timeline-text">Track some games and add events to see your timeline!</p>
      </div>
    );
  }

  return (
    <div className="event-timeline">
      <h2 className="timeline-title">
        <span className="timeline-icon">🚀</span>
        Event Timeline
      </h2>
      
      <div className="events-grid">
        {events.map((event) => {
          const typeInfo = getEventTypeInfo(event.type);
          const daysUntil = getDaysUntil(event.date);
          const isPast = daysUntil < 0;
          
          return (
            <div
              key={event.id}
              className={`event-card ${isPast ? 'past' : 'upcoming'}`}
              onClick={() => onEventClick && onEventClick(event)}
              style={{ '--event-color': typeInfo.color }}
            >
              <div className="event-card-header">
                <div className="event-type-badge" style={{ backgroundColor: typeInfo.color }}>
                  <span className="event-type-icon">{typeInfo.icon}</span>
                  <span className="event-type-label">{typeInfo.label}</span>
                </div>
                {!isPast && (
                  <div className="event-countdown" style={{ borderColor: typeInfo.color, color: typeInfo.color }}>
                    {formatCountdown(daysUntil)}
                  </div>
                )}
              </div>

              {event.gameImage && (
                <div className="event-game-thumb-wrapper">
                  <img 
                    src={event.gameImage} 
                    alt={event.gameName}
                    className="event-game-thumb"
                  />
                  <div className="event-game-overlay">
                    <span className="event-game-name">{event.gameName}</span>
                  </div>
                </div>
              )}

              <div className="event-card-body">
                <h3 className="event-title">{event.title}</h3>
                <div className="event-date">
                  📅 {formatDate(event.date)}
                </div>
                {event.description && (
                  <p className="event-description">{event.description}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default EventTimeline;
