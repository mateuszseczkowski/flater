import dateFormat from "dateformat";
import { createWriteStream } from "fs";

let date = dateFormat(new Date(), "yyyymmddhhMM");

const wstreamArray = createWriteStream("./data/" + date + ".json");
wstreamArray.on("finish", function () {
  console.log("file with array has been written");
});

const wstreamAverage = createWriteStream("./data/" + "average" + ".txt", {
  //flags: a is for append (flags: w for erase and write in new file)
  flags: "a",
});
wstreamAverage.on("finish", function () {
  console.log("file with average has been written");
});

export { wstreamArray, wstreamAverage };
