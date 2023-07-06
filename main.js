import $ from "cheerio";
import dateFormat from "dateformat";
import fetch from "node-fetch";

import { wstreamArray, wstreamAverage } from "./streamToFile";

let date = dateFormat(new Date(), "dd.mm.yyyy hh:MM");
const url =
  "https://www.otodom.pl/sprzedaz/mieszkanie/lodz/?search%5Bdist%5D=0&search%5Bcity_id%5D=1004&nrAdsPerPage=72";

class Flat {
  constructor(name, localization, price, currency) {
    this.name = name;
    this.localization = localization;
    this.price = price;
    this.currency = currency;
  }
}

fetch(url)
  .then(function (html) {
    const flats = [];
    console.log(
      "Number of objects: " + $("span.offer-item-title", html).length
    );

    for (let i = 0; i < $("span.offer-item-title", html).length; i++) {
      flats.push(
        new Flat(
          $("span.offer-item-title", html)
            .map(function () {
              return $(this).text();
            })
            .toArray()[i], //name
          $("p.text-nowrap.hidden-xs", html)
            .map(function () {
              return $(this).text().split(": ");
            })
            .toArray()[i], //localization
          $("li.offer-item-price", html)
            .map(function () {
              return $(this)
                .text()
                .trim()
                .replace(/[^\d.,]/g, "");
            })
            .toArray()[i], //price (with float with . and ,)
          $("li.offer-item-price", html)
            .map(function () {
              return $(this).text().trim().replace(/[^\D]/g, "").trim();
            })
            .toArray()[i] //currency
        )
      );
    }

    for (let i = flats.length - 1; i >= 0; i--) {
      if (parseInt(flats[i].price) < 60000) {
        //filter too low prices (prywatne kamienice)
        flats.splice(i, 1);
      }
    }

    console.log("Number of objects after filtering: " + flats.length);

    let total = 0;
    for (let i = 0; i < flats.length; i++) {
      total += parseInt(flats[i].price);
    }
    let averagePriceOfAllFlats = total / flats.length;

    wstreamArray.write(JSON.stringify(flats));
    wstreamArray.end();

    wstreamAverage.write(date + ";" + averagePriceOfAllFlats + "\n");
    wstreamAverage.end();
  })
  .catch(function (err) {
    console.log(err);
  });
