var express = require('express');
var router = express.Router();
const jwt = require("./util/jwt");
const models = require("../../../models");

router.post('/', async(req, res, next) =>{
  const email = req.param('email');
  const password = req.param('password');
 const isUserExist = await models.User.findOne({
    where: {
      email,
      password,
    }
  }).catch((e)=>{
    throw new Error(e.message);
  })
  if(isUserExist){
    console.log('jwt.sign(isUserExist)=>',await jwt.sign(isUserExist));
    const token = await jwt.sign(isUserExist);
    return res.json(token);
  }else{
    return res.json("존재하지 않는 계정입니다.");
  }
});

module.exports = router;
