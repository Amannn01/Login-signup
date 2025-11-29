const ensureAuth = require('../Middleware/Auth');

const router = require('express').Router();

router.get('/',ensureAuth,(req,res)=>{
    // console.log("=============",req.user);
    res.status(200).json([
        {
        name:'mobile',
        price:1000,
        brand:'samsung'
    },   {
        name:'tv',
        price:2000,
        brand:'mi'
    }
])
});

module.exports=router;