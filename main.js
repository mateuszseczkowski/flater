#!/usr/bin/env node

class Flat {
    constructor(name, localization, price) {
        this.name = name;
        this.localization = localization;
        this.price = price;
    }
}

const rp = require('request-promise');
const $ = require('cheerio');
const parseFunction = require('./parseFunction');
const url = 'https://www.otodom.pl/sprzedaz/mieszkanie/lodz/?search%5Bdist%5D=0&search%5Bcity_id%5D=1004';
const fs = require('fs');

  rp(url)
  .then(function(html) {
    //success!
    const flats = [];
    fs.writeFile("pageBody.htm", html, function(err) {
      if(err) {
          return console.log(err);
      }
  
      console.log("The file was saved!");
    }); 
    console.log($('header.offer-item-header', html).length);
    console.log($('header.offer-item-header', html).text());
    for (let i = 0; i < $('header.offer-item-header', html).length; i++) {
      flats.push(
        new Flat(
          $('header.offer-item-header', html)[i], //name
          $('p.text-nowrap.hidden-xs', html)[i], //localization
          $('li.offer-item-price', html)[i] //price
        ) 
      );
    }
    //console.log(flats[1]);
    // return Promise.all(
    //   flats.map(function(url) {
    //     return parseFunction('https://en.wikipedia.org' + url);
    //   })
    // );
  })
  // .then(function(presidents) {
  //   console.log(presidents);
  // })
  .catch(function(err) {
    //handle error
    console.log(err);
  });