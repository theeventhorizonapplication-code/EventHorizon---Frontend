import './EventFilters.css';

const eventTypes = {
  patch: { icon: '🔧', label: 'Patches & Updates', color: '#3b82f6' },
  dlc: { icon: '🎁', label: 'DLC', color: '#ec4899' },
  expansion: { icon: '📦', label: 'Expansions', color: '#06b6d4' },
  season: { icon: '🎬', label: 'Seasons', color: '#10b981' },
  movie: { icon: '🎥', label: 'Movies', color: '#f43f5e' },
  show: { icon: '📺', label: 'TV Shows', color: '#ef4444' },
  tournament: { icon: '🏆', label: 'Tournaments', color: '#eab308' },
  irl: { icon: '🎪', label: 'IRL Events', color: '#64748b' },
  ingame: { icon: '🎮', label: 'In-Game Events', color: '#22d3ee' }
};

function EventFilters({ selectedFilters, onFilterChange }) {
  const toggleFilter = (type) => {
    if (selectedFilters.includes(type)) {
      onFilterChange(selectedFilters.filter(f => f !== type));
    } else {
      onFilterChange([...selectedFilters, type]);
    }
  };

  return (
    <div className="event-filters">
      <h3 className="filters-title">
        <span className="filters-icon">📋</span>
        Event Types
      </h3>
      <div className="filter-chips">
        {Object.entries(eventTypes).map(([key, info]) => {
          const isActive = selectedFilters.length === 0 || selectedFilters.includes(key);
          
          return (
            <button
              key={key}
              className={`filter-chip ${isActive ? 'active' : 'inactive'}`}
              style={{
                '--chip-color': info.color,
                backgroundColor: isActive ? info.color : 'transparent',
                borderColor: info.color
              }}
              onClick={() => toggleFilter(key)}
            >
              <span className="chip-icon">{info.icon}</span>
              <span className="chip-label">{info.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default EventFilters;
