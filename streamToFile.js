import dateFormat from "dateformat";
import { existsSync, mkdirSync, createWriteStream } from "fs";

let DATA_HOME = "./data";
let date = dateFormat(new Date(), "yyyymmddhhMM");

const wstreamCreateDirIfNotExist = () => {
  if (!existsSync(DATA_HOME)) {
    mkdirSync(DATA_HOME, { recursive: true });
  }
};
wstreamCreateDirIfNotExist();

const wstreamArray = createWriteStream(DATA_HOME + "/" + date + ".json");
wstreamArray.on("finish", () => {
  console.log("file with array has been written");
});

const wstreamAverage = createWriteStream(DATA_HOME + "/" + "average" + ".txt", {
  //flags: a is for append (flags: w for erase and write in new file)
  flags: "a",
});
wstreamAverage.on("finish", () => {
  console.log("file with average has been written");
});

export { wstreamCreateDirIfNotExist, wstreamArray, wstreamAverage };
