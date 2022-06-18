const express = require('express');
const bcrypt = require('bcryptjs');
const router =  express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

//User model
const User = require('../../models/User');

//user auth
router.post('/',(req, res) => {
    const { userType,email,password } = req.body;

    //validation
    if(!userType || !email || !password){
        return res.status(400).json({msg: 'Please enter all fields'});
    }

    //Find user
    User.findOne({ email,userType })
    .then(user => {
        if(!user ) return res.status(400).json({ msg : "User doesn't exists "});

        
        //Validate password
        bcrypt.compare(password,user.password)
        .then(isMatch => {
            if(!isMatch) return res.status(400).json({ msg: "Invalid credentials"});

            jwt.sign(
                { id: user.id },
                "secret", { expiresIn: 3600 },
                (err , token ) => {
                    if(err) throw err;
                    res.json({
                        token,
                        user: {
                            id: user.id,
                            userType: user.userType,
                            name: user.name,
                            email: user.email
                        }
                    })
                }
            )

        })
      
    });
});


//GET api/auth/user
//Get user data
//private
router.get('/user', auth , (req,res) => {


    User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
});


module.exports = router;