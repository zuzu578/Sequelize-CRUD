var express = require('express');
var router = express.Router();
const models = require("../../../models");
const axios = require("axios"); 
const cheerio = require("cheerio");

router.post('/', async(req, res, next) =>{
const genre = req.param("genre");
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
      let dataList = [];
      const $ = cheerio.load(html.data);
      const $bodyList = $("table").children("tbody");
      $bodyList.each(function(i, elem) {
        //console.log($(this).find('th').text())
        dataList.push($(this).find('th').text());
        // models.Music.create({
        //   title : $(this).find('th').text()
        // }).catch((e)=>{
        //   throw new Error(e.message);
        // })
        //console.log($(this).find('td').text().replace(/(\s*)/g, "").split(""))
        // ulList[i] = {
        //    //title: $(this).find('th').text().replace(/(\s*)/g, "").split("").join("")
        //    title: $(this).find('th').text().replace(/(\s*)/g, "").split("").join(""),
        //    level: $(this).find('td').text().split("")
            
        // };
      });
  
      //const data = ulList.filter(n => n.title);
      //res.send(data);
      return dataList;
    })
   .then((res)=>{
     //console.log(res);
   });
});

module.exports = router;
