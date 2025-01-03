const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true
    },
    
    phone: {
        type: Number,
        required:true
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    user_type: {
        type: String,
        required: true,
        enum: ['customer', 'worker'],
        default: 'customer'
    },
    tokens: [
        {   token: {
                type: String,
                required: true
            }
        }
    ]

})



//hashing the password
userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
})

//generating the token
userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id: this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token: token});
        await this.save();
        return token;
    }
    catch(err){
        console.log(err);
    }
}

const User = mongoose.model('PROFILEINFO', userSchema);

module.exports = User;