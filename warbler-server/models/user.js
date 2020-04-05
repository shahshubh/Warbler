const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileImageUrl: {
        type: String
    },
    message: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }]
});

userSchema.pre("save", async function(next){  //Pre i.e. before we save this function will run
    try{
        if(!this.isModified("password")){
            return next();
        } 
        let hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        return next();
    } catch (err) {
        return next(err);
    }
});

userSchema.methods.comparePassword = async function(candidatePassword, next){
    try {
        let isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        next(error);
    }
}

const User = mongoose.model("User", userSchema);

module.exports = User;