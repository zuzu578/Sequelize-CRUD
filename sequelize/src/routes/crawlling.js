var express = require('express');
var router = express.Router();
const models = require("../../../models");
const axios = require("axios"); 
const cheerio = require("cheerio");

router.get('/', async(req, res, next) =>{
let genre = req.param("genre");
if(!genre){
  genre = "game"
}
try{
  const getHtml = await axios.get(`https://taiko.namco-ch.net/taiko/songlist/${genre}.php`);
  let songList = [];
    const $ = cheerio.load(getHtml.data);
    const $bodyList = $("table").children("tbody").toArray();
    $bodyList.forEach((i)=>{
      songList.push($(i).find('tr').text().replace(/(\s*)/g, "").split("-"))
    });
    res.send(songList[1]);
}catch(error){
  console.log(error.message);
}
});

module.exports = router;
