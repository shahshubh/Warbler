const mongoose = require("mongoose");
const User = require("./user");

const messageSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
            maxlength: 160
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
);

messageSchema.pre("remove", async function(next){
    try {
        //find user 
        let user = await User.findById(this.user);
        //remove id of message from msg list
        user.messages.remove(this.id);
        //save the user
        await user.save();  
        //return next
        return next();
    } catch (error) {
        return next(error); 
    }
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;