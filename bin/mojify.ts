// Part 1
require("dotenv").config();
import fetch from "node-fetch";
import { EmotivePoint, Face, Rect } from "../shared/models";

// Part 2
import * as Jimp from "jimp";
import * as path from "path";

const API_URL = process.env["FACE_API_URL"];
const API_KEY = process.env["FACE_API_KEY"];

process.on("unhandledRejection", (reason, p) => {
  console.warn("Unhandled Rejection at: Promise", p, "reason:", reason);
});

/* Given an image this calls the Emotive API and get a list of faces in the image and for each face the emotions */
async function getFaces(imageUrl) {
  const url =
    API_URL +
    "/detect?returnFaceId=false&returnFaceLandmarks=false&returnFaceAttributes=emotion";

  let response = await fetch(url, {
    headers: {
      "Ocp-Apim-Subscription-Key": API_KEY,
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({ url: imageUrl })
  });
  let resp = await response.json();
  console.log(JSON.stringify(resp));

  if (resp.length === 0) {
    throw "No faces found in image";
  }

  let faces = [];

  // Loop through faces and find an emoji
  for (let f of resp) {
    let scores = new EmotivePoint(f.faceAttributes.emotion);
    let faceRectangle = new Rect(f.faceRectangle);
    let face = new Face(scores, faceRectangle);
    console.log(face.mojiIcon);
    faces.push(face);
  }
  return faces;
}

async function createMojifiedImage(imageUrl, faces) {
  // Read the image which is provided through link in url query
  let sourceImage = await Jimp.read(imageUrl);

  // Create a composite image, we will "append" to this composite an emoji image for each face found
  let compositeImage = sourceImage;

  for (let face of faces) {
    const mojiName = face.mojiName;
    const faceHeight = face.faceRectangle.height;
    const faceWidth = face.faceRectangle.width;
    const faceTop = face.faceRectangle.top;
    const faceLeft = face.faceRectangle.left;

    // Load the emoji from disk
    let mojiPath = path.resolve(
      __dirname,
      "../shared/emojis/" + mojiName + ".png"
    );
    let emojiImage = await Jimp.read(mojiPath);

    // Resize the emoji to fit the face
    emojiImage.resize(faceWidth, faceHeight);

    // Compose the emoji on the image
    compositeImage = compositeImage.composite(emojiImage, faceLeft, faceTop);
  }
  compositeImage.write(path.join(__dirname, "..", "mojified.jpg"));
}

async function main() {
  const [imageUrl] = process.argv.slice(2);
  console.log(imageUrl);
  const faces = await getFaces(imageUrl);
  await createMojifiedImage(imageUrl, faces);
}
main();
