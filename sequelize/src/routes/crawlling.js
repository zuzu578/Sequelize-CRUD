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
console.log("genre ===> " , genre);
const getHtml = async () => {
    try {
      return await axios.get(`https://taiko.namco-ch.net/taiko/songlist/${genre}.php`);
    } catch (error) {
      console.error(error);
    }
  };
  getHtml()
    .then(html => {
      let songList = [];
      const $ = cheerio.load(html.data);
      const $bodyList = $("table").children("tbody").toArray();
      $bodyList.forEach((i)=>{
        songList.push($(i).find('tr').text().replace(/(\s*)/g, "").split("-"))
      });
      console.log(songList[1]);
      res.send(songList[1]);
    })
   
});

module.exports = router;
