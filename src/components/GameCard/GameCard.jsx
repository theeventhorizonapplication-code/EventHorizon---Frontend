import './GameCard.css';

function GameCard({ game, onTrack, onRemove, onSelect, isTracked, isSelected, eventCount }) {
  const handleClick = () => {
    if (onSelect) {
      onSelect(game);
    }
  };

  const handleButtonClick = (e) => {
    e.stopPropagation();
    if (isTracked && onRemove) {
      onRemove(game.id);
    } else if (onTrack) {
      onTrack(game);
    }
  };

  return (
    <div 
      className={`game-card ${isSelected ? 'selected' : ''} ${isTracked ? 'tracked' : ''}`}
      onClick={handleClick}
    >
      <div className="game-card-image-wrapper">
        <img 
          src={game.background_image || '/placeholder.png'} 
          alt={game.name}
          className="game-card-image"
        />
        {eventCount !== undefined && eventCount > 0 && (
          <div className="event-badge">
            <span className="event-badge-icon">📅</span>
            <span className="event-badge-count">{eventCount}</span>
          </div>
        )}
      </div>
      
      <div className="game-card-content">
        <h3 className="game-card-title">{game.name}</h3>
        
        {game.rating && (
          <div className="game-card-rating">
            <span className="rating-star">⭐</span>
            <span className="rating-value">{game.rating.toFixed(1)}</span>
          </div>
        )}
        
        {game.released && (
          <div className="game-card-date">
            {new Date(game.released).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            })}
          </div>
        )}
        
        {!isTracked && onTrack && (
          <button onClick={handleButtonClick} className="btn-track">
            + Track Game
          </button>
        )}
        
        {isTracked && onRemove && (
          <button onClick={handleButtonClick} className="btn-remove">
            Remove
          </button>
        )}
      </div>
    </div>
  );
}

export default GameCard;
