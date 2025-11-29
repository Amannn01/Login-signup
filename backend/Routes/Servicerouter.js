const ensureAuth = require('../Middleware/Auth');

// const sureAuth =require('../Middleware/ServiceAuth')
const router = require('express').Router();
router.get('/',ensureAuth,(req,res)=>{
    console.log("=============",req.user);
    res.status(200).json([
        {
        name:'washing machine',
        price:1500,
        brand:'lg'
    },   {
        name:'refrigerator',
        price:2500,
        brand:'whirlpool'
    }
])
});

module.exports=router;