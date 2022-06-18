const express = require('express');
const bcrypt = require('bcryptjs');
const router =  express.Router();
const jwt = require('jsonwebtoken');

//User model
const User = require('../../models/User');

// @route GET api/users
// @route  Register new user
// @access public
router.post('/',(req, res) => {
    const { userType, name,email,password } = req.body;

    //validation
    if(!userType || !name || !email || !password){
        return res.status(400).json({msg: 'Please enter all fields'});
    }

    //Find user
    User.findOne({ email })
    .then(user => {
        if(user) return res.status(400).json({ msg : "User already exists "});

        const newUser = new User({
            userType,
            name,
            email,
            password
        });

        //password encryption
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt,(err,hash)=>{
                if(err) throw err;
                newUser.password = hash;
                newUser.save()
                .then(user => {

                    jwt.sign(
                        { id: user.id },
                        "secret",
                        (err , token ) => {
                            if(err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    userType:user.userType,
                                    name: user.name,
                                    email: user.email
                                }
                            })
                        }
                    )
                });
            });
        })
    });
});


module.exports = router;