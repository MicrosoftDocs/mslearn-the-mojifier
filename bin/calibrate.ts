import * as fs from "fs";
import fetch from "node-fetch";
import * as path from "path";
import { EmotivePoint } from "../shared/models/emotivePoint";
import { Face } from "../shared/models/faces";
import * as emojiConvert from "emoji-dictionary";

require("dotenv").config();

const API_URL = process.env["FACE_API_URL"];
const API_KEY = process.env["FACE_API_KEY"];

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

process.on("unhandledRejection", (reason, p) => {
  console.warn("Unhandled Rejection at: Promise", p, "reason:", reason);
});

async function getEmotion(emoji) {
  let trainEmojiFileName = path.resolve(
    __dirname,
    "./proxy-images/" + emoji + ".jpg"
  );

  const buffer = fs.readFileSync(trainEmojiFileName);

  const url =
    API_URL +
    "/detect?returnFaceId=false&returnFaceLandmarks=false&returnFaceAttributes=emotion";

  let response = await fetch(url, {
    headers: {
      "Ocp-Apim-Subscription-Key": API_KEY,
      "Content-Type": "application/octet-stream"
    },
    method: "POST",
    body: buffer
  });
  let data = await response.json();

  if (data.error) {
    if (data.error.code === "RateLimitExceeded") {
      console.debug(JSON.stringify(data));
      console.error("RateLimitExceeded waiting 30 seconds and trying again");
      await timeout(30000);
      return await getEmotion(emoji);
    } else {
      throw data.error;
    }
  }
  return data[0].faceAttributes.emotion;
}

const EMOJIS_TO_TRAIN = [
  "☺️",
  "🤓",
  "😃",
  "😆",
  "😉",
  "😍",
  "😎",
  "😐",
  "😕",
  "😖",
  "😘",
  "😜",
  "😝",
  "😠",
  "😧",
  "😩",
  "😬",
  "😭",
  "😱",
  "😳",
  "😴"
];

async function main() {
  let str = "";

  for (let emoji of EMOJIS_TO_TRAIN) {
    console.log(`Processing ${emoji}`);
    // Given an emoji like 😴 returns the word version, like 'sleepy'
    let emojiName = emojiConvert.getName(emoji);
    let emotion = await getEmotion(emojiName);
    // console.debug(emotion);
    let point = new EmotivePoint(emotion);
    let face = new Face(point, null);
    // console.log(`Existing emojis is ${face.mojiIcon}`);
    str += `{
        emotiveValues: new EmotivePoint({
            anger: ${emotion.anger},
            contempt: ${emotion.contempt},
            disgust: ${emotion.disgust},
            fear: ${emotion.fear},
            happiness: ${emotion.happiness},
            neutral: ${emotion.neutral},
            sadness: ${emotion.sadness},
            surprise: ${emotion.surprise}
        }),
        emojiIcon: "${emoji}"
      },
`;
  }
  console.log(str);
}

main();
