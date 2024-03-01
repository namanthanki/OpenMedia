import "./styles/notification-overlay.css";

const NotificationOverlay = ({ onClose }) => {
	const notifications = [
		{ id: 1, message: "You have a new message.", timestamp: "1 min ago" },
		{ id: 2, message: "Your post has been liked.", timestamp: "5 min ago" },
		{ id: 3, message: "You have a new follower.", timestamp: "10 min ago" },
	];

	return (
		<div className="notification-overlay">
			<div className="notification-header">
				<h3>Notifications</h3>
				<button className="close-button" onClick={onClose}>
					Close
				</button>
			</div>
			<div className="notification-list">
				{notifications.map((notification) => (
					<div key={notification.id} className="notification-item">
						<p className="notification-message">
							{notification.message}
						</p>
						<span className="timestamp">
							{notification.timestamp}
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default NotificationOverlay;
