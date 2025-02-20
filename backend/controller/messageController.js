const Conversation=require("../Models/conversation.Model");
const Message=require("../Models/message.Model");
//const {io}=require("../socket/socket");
const {getReceiverSocketId,io}=require("../socket/socket");


const sendmessage=async(req,res)=>{
    try{
        const{ message}=req.body;
        const {id:receiverId}=req.params;
        const senderId=req.user._id;
        let conversation=await Conversation.findOne({
            participant:{$all:[senderId,receiverId]},
        });
        if(!conversation){
            conversation=await Conversation.create({
                participants:[senderId,receiverId],
            });
        }
        const newMessage=new Message({
            senderId,
            receiverId,
            message,
        });
        if(newMessage){
            conversation.messages.push(newMessage._id);
        }
        await Promise.all([conversation.save(), newMessage.save()]);

        const receiverSocketId=getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage);
        }
        res.status(201).json(newMessage);

    }catch(error){
        console.log("Error in sendMessage controller:",error.message);
        res.status(500).json({error:"Internal server error"});
    }
};
const getMessage=async(req,res)=>{
    try{
        const{id:userToChatId}=req.params;
        const senderId=req.user._id;

        const conversation=await Conversation.findOne({
            participants:{$all:[senderId,userToChatId]},
        }).populate("messages");
        if(!conversation){
            return res.status(200).json([]);
        }
            const messages=conversation.messages;
            res.status(200).json(messages);

    }catch(error){
        console.log("Error in getMessage controller:",error.message);
        res.status(500).json({error:"Internal server error"});

    }
}
module.exports={sendmessage,getMessage};