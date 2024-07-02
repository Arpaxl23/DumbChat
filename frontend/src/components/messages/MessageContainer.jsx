import { useEffect } from "react";
import React from 'react';
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";

import Messages from "./Messages";

import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";

const MessageContainer = () => {
	const { selectedConversation, setSelectedConversation } = useConversation();

	useEffect(() => {
		
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);

	return (
		<div className='md:min-w-[450px] flex flex-col'>
			{!selectedConversation ? (
				<NoChatSelected />
			) : (
				<>
					{/* Header */}
					<div className='bg-yellow-200 px-4 py-2 mb-2 flex items-center'>
						<div className='w-10 round-full overflow-hidden mr-4'>
							<img src={selectedConversation.profilePic} alt='ProfilePic' className='w-full h-full object-cover'  />
						</div>
						<span className='text-orange-600 font-bold'>{selectedConversation.fullName}</span>
					</div>
					<Messages />
					<MessageInput />
				</>
			)}
		</div>
	);
};
export default MessageContainer;

const NoChatSelected = () => {
	const { authUser } = useAuthContext();
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋 {authUser.fullName} </p>
				<p>Let start messaging your friends</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};