import { MdSend } from "react-icons/md";

// import "./styles/chat.css";

const ChatsPage = () => {
	return (
		<div className="chat-wrapper">
			<div className="chat-container">
				<div className="chat-header">Username</div>
				<div className="chat-messages">
					<div className="message sent">
						<div className="message-text">
							Hello! How are you doing?
						</div>
						<div className="message-time">10:00 AM</div>
					</div>
					<div className="message received">
						<div className="message-text">
							Hi there! I&#39;m good, thanks for asking.
						</div>
						<div className="message-time">10:05 AM</div>
					</div>
					{/* More messages go here */}
				</div>
				<div className="chat-input">
					<input type="text" placeholder="Type a message..." />
					<MdSend className="send-icon" />
				</div>
			</div>
		</div>
	);
};

export default ChatsPage;
