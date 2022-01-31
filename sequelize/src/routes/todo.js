var express = require('express');
var router = express.Router();
var req = require('request');
const jwt = require("./util/jwt");
const models = require("../../../models");
const { Op } = require("sequelize");
router.post('/',async(req,res)=>{
  const { id } = jwt.verify(req.headers.authorization );
  if(id){
    const title = req.param("title");
    const context = req.param("context");
    const result = await models.Todo.create({
      title:title,
      context:context,
      userIdx: id
    }).catch((e)=>{console.log(e.message)});
    res.send('success');
  }else{
    res.send(`계정이 존재하지 않습니다.`)
    return false;
  }
  
})

router.delete("/",async(req,res)=>{
  const { id } = jwt.verify(req.headers.authorization );
  if(id){
    const idx = req.param("idx");
    console.log('idx', idx);
    await models.Todo.destroy({
      where:{
        idx:idx
      }
    }).catch((e)=>{
      throw new Error(e.message)
    })
    res.send('success');
  }else{
    res.send(`삭제 권한이 없습니다.`)
    return false;
  }
  
})

router.get("/",async(req,res)=>{
  const { id } = jwt.verify(req.headers.authorization);
  const idx = req.param('idx');
  const content = req.param('content');
  const status = req.param('status');
  let statusParams = {};
  let searchParams = {};
  let contentValue ={};
  let contentParams = {};
  let idxSearch = {}
  if(status){
    statusParams = {
      status : status,
    }
  }
  if(idx){
    idxSearch = {
      idx:idx,
    }
  }
  console.log('content!!!==>',content);
  if(content){
    if(content.indexOf("%") >=0){
      contentValue = { [Op.like]:content}
    }
    contentParams = {
      [Op.or] : [{title:contentValue },{context: contentValue}],
    }
  }
  searchParams = {
    ...contentParams,
    ...idxSearch,
    ...statusParams,
  }
  res.json(await models.Todo.findAll({
    where:{
      ...searchParams
    }
  })
  .catch((e)=>{throw new Error(e.message)}))
})
module.exports = router;
