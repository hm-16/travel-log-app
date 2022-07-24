const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require('bcrypt');

//register

router.post("/register",async (req,res)=>{
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt);

        const newUser = new User({
            username : req.body.username,
            email : req.body.email,
            password: hashedPassword,
        });
        const user = await newUser.save();
        res.status(200).json(user._id);
                
    } catch (error) {
        res.status(500).json(error);
    }
})

router.post("/login", async (req,res)=>{
    try {
        const user = await User.findOne({email:req.body.email});
        if(!user) return res.status(400).json("Wrong credentials!");

        const validPassword = await bcrypt.compare(req.body.password,user.password);
        if(!validPassword) return res.status(400).json("Wrong credentials!");

        res.status(200).json({_id:user._id,email:user.email});
    } catch (error) {
        res.status(500).json(error);
    }

});

module.exports = router;