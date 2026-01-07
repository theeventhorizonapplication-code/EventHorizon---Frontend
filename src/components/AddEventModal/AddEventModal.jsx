import { useState } from 'react';
import './AddEventModal.css';

function AddEventModal({ game, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    type: 'patch',
    title: '',
    date: '',
    description: '',
    url: ''
  });

  const eventTypes = {
    patch: { icon: '🔧', label: 'Patch/Update' },
    dlc: { icon: '🎁', label: 'DLC' },
    expansion: { icon: '📦', label: 'Expansion' },
    season: { icon: '🎬', label: 'Season' },
    movie: { icon: '🎥', label: 'Movie' },
    show: { icon: '📺', label: 'TV Show' },
    tournament: { icon: '🏆', label: 'Tournament' },
    irl: { icon: '🎪', label: 'IRL Event' },
    ingame: { icon: '🎮', label: 'In-Game Event' }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.date) {
      alert('Please fill in title and date');
      return;
    }
    onAdd(formData);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <h2 className="modal-title">Add New Event</h2>
            <p className="modal-subtitle">for {game.name}</p>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label className="form-label">Event Type *</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              className="form-select"
              required
            >
              {Object.entries(eventTypes).map(([key, info]) => (
                <option key={key} value={key}>
                  {info.icon} {info.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Event Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="e.g., Season 5 Launch, Update 2.1"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Date *</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description (Optional)</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Add details about this event..."
              className="form-textarea"
              rows="3"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Source URL (Optional)</label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({...formData, url: e.target.value})}
              placeholder="https://..."
              className="form-input"
            />
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-cancel">
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              <span>+</span> Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEventModal;
