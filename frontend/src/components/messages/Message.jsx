import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();
	const Me = message.senderId === authUser._id;
	const formattedTime = extractTime(message.createdAt);
	const chatClassName = Me ? "chat-end" : "chat-start";
	const profilePic = Me ? authUser.profilePic : selectedConversation?.profilePic;
	const bubbleBgColor = Me ? "bg-sky-300" : "bg-green-300";

	const shakeClass = message.shouldShake ? "shake" : "";

	return (
		<div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={profilePic} />
				</div>
			</div>
			<div className={`chat-bubble ${bubbleBgColor} text-black  ${shakeClass} pb-2`}>{message.message}</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
		</div>
	);
};
export default Message;