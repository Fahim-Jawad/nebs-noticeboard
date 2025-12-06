export default function SuccessPublishModal({ notice, onClose, onCreateAnother, onView }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="success-icon">✔</div>
        <h2>Notice Published Successfully!</h2>

        <p style={{ marginTop: 10 }}>
          Your notice "<strong>{notice.title}</strong>" has been published and is now
          visible to the selected department.
        </p>

        <div style={{ marginTop: 25 }}>
          <button className="btn" onClick={onView}>View Notice</button>
        </div>
        <div style={{ marginTop: 10 }}>
          <button className="btn ghost" onClick={onCreateAnother}>
            Create Another
          </button>
        </div>
        <div style={{ marginTop: 10 }}>
          <button className="btn ghost" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
