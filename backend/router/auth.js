const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


require('../db/conn');
const User = require('../model/userSchema');

router.get('/', (req, res) => {
    res.send('Hello World form server router js');
});

//promise
// router.post('/register', (req, res) => {

//     const {name, email, phone, address, password, cpassword} = req.body;
//     if(!name || !email || !phone || !address || !password || !cpassword){
//         return res.status(422).json({error: "Please fill the field properly"});
//     }

//     User.findOne({email: email})
//     .then((userExist) => {
//         if(userExist){
//             return res.status(422).json({error: "Email already exist"});
//         }
    
//     const user = new User({name, email, phone, address, password, cpassword});
//     user.save().then(() => {
//         res.status(201).json({message: "User registered successfully"});
//     }).catch((err) => {
//         res.status(500).json({error: "Failed to register user"});
//     })

// })
// .catch((err) => {console.log(err)});


// });

//async await
router.post('/register', async (req, res) => {

    const {name, email, phone, address, password, cpassword} = req.body;
    
    if(!name || !email || !phone || !address || !password || !cpassword){
        return res.status(422).json({error: "Please fill the field properly"});
    }

    try{
        const userExist = await User.findOne({email: email});
        
        if(userExist){
            return res.status(422).json({error: "Email already exist"});
        }
        else if(password !== cpassword){
            return res.status(422).json({error: "Password and confirm password are not same"});
        }
        else{
            const user = new User({name, email, phone, address, password, cpassword});
            await user.save();
            res.status(201).json({message: "User registered successfully"});
        }
            
        

    }
    catch(err){
        console.log(err);
    }
    
});


//login route

router.post('/login', async (req, res) => {
    // console.log(req.body);
    // res.json({message: "User logged in successfully"});
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({error: "fill the data properly"});
        }

        const userLogin = await User.findOne({email: email});
        // console.log(userLogin);

        if(userLogin){
            const isMatch = await bcrypt.compare(password, userLogin.password);
            const token = await userLogin.generateAuthToken();
            
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });

            if(!isMatch){
                return res.status(400).json({error: "invalid credentials"});
            }
            else{
                res.json({message: "User logged in successfully"});
            }
        }
        else{
            return res.status(400).json({error: "invalid credentials"});
        }
        
    }
    catch(err){
        console.log(err);
    }
});

// Add this new route to get user profile data
router.get('/profile', async (req, res) => {
  try {
    // Log cookies received
    console.log('Cookies received:', req.cookies);
    
    const token = req.cookies.jwtoken;
    if (!token) {
      console.log('No token found in cookies');
      return res.status(401).json({ error: "No authentication token" });
    }

    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    console.log('Token verified, user ID:', verifyToken._id);
    
    const user = await User.findOne({ _id: verifyToken._id });
    if (!user) {
      console.log('No user found with ID:', verifyToken._id);
      return res.status(404).json({ error: "User not found" });
    }

    // Send user data without password
    const { password, cpassword, ...userData } = user._doc;
    console.log('Sending user data:', userData);
    res.json(userData);
  } catch (err) {
    console.error('Profile route error:', err);
    res.status(401).json({ error: "Unauthorized: " + err.message });
  }
});

// Worker Registration Route
router.post('/worker/register', async (req, res) => {
    const {name, email, phone, address, password, cpassword} = req.body;
    
    if(!name || !email || !phone || !address || !password || !cpassword){
        return res.status(422).json({error: "Please fill the field properly"});
    }

    try{
        const userExist = await User.findOne({email: email});
        
        if(userExist){
            return res.status(422).json({error: "Email already exist"});
        }
        else if(password !== cpassword){
            return res.status(422).json({error: "Password and confirm password are not same"});
        }
        else{
            console.log('Creating new worker account with email:', email);  // Debug log
            
            const user = new User({
                name, 
                email, 
                phone, 
                address, 
                password, 
                cpassword,
                user_type: 'worker'  // Make sure this is set
            });
            
            await user.save();
            console.log('Worker account created successfully');  // Debug log
            res.status(201).json({message: "Worker registered successfully"});
        }
    }
    catch(err){
        console.error('Registration error:', err);  // Better error logging
        res.status(500).json({error: "Failed to register"});
    }
});

// Worker Login Route
router.post('/worker/login', async (req, res) => {
    try{
        const {email, password} = req.body;
        console.log('Login attempt for:', email);  // Debug log
        
        if(!email || !password){
            return res.status(400).json({error: "Please fill the data properly"});
        }

        const userLogin = await User.findOne({
            email: email,
            user_type: 'worker'
        });
        
        console.log('Found user:', userLogin ? 'Yes' : 'No');  // Debug log
        console.log('User type:', userLogin?.user_type);  // Debug log

        if(userLogin){
            const isMatch = await bcrypt.compare(password, userLogin.password);
            console.log('Password match:', isMatch ? 'Yes' : 'No');  // Debug log
            
            if(!isMatch){
                return res.status(400).json({error: "Invalid credentials"});
            }

            const token = await userLogin.generateAuthToken();
            
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });

            res.json({message: "Worker logged in successfully"});
        }
        else{
            return res.status(400).json({error: "Invalid credentials - Worker account not found"});
        }
        
    }
    catch(err){
        console.error('Login error:', err);  // Better error logging
        res.status(500).json({error: "Server error"});
    }
});

// Add this route to update user types
router.post('/update-user-type', async (req, res) => {
    try {
        const { email, user_type } = req.body;
        
        const user = await User.findOneAndUpdate(
            { email: email },
            { $set: { user_type: user_type } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ message: "User type updated successfully", user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update user type" });
    }
});

// Add this route for logout
router.get('/logout', (req, res) => {
    res.clearCookie('jwtoken', { path: '/' });
    res.status(200).json({ message: "User logged out successfully" });
});

module.exports = router;


