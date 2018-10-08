import * as Jimp from "jimp";
import * as path from "path";
import fetch from "node-fetch";
import { EmotivePoint } from "../shared/models/emotivePoint";
import { Rect } from "../shared/models/rect";
import { Face } from "../shared/models/faces";

const API_URL = process.env["FACE_API_URL"];
const API_KEY = process.env["FACE_API_KEY"];

process.on("unhandledRejection", (reason, p) => {
  console.warn("Unhandled Rejection at: Promise", p, "reason:", reason);
});

async function createMojifiedImage(context, imageUrl, faces) {
  // read the image which is provided through link in url query
  let sourceImage = await Jimp.read(imageUrl);
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
    emojiImage.resize(faceWidth, faceHeight); // resize the emoji to fit the face
    compositeImage = compositeImage.composite(emojiImage, faceLeft, faceTop); // compose the emoji on the image
  }

  return new Promise((resolve, reject) => {
    compositeImage.getBuffer(Jimp.MIME_JPEG, (error, buffer) => {
      // get a buffer of the composed image
      if (error) {
        let message = "There was an error adding the emoji to the image";
        context.log.error(error);
        reject(message);
      } else {
        // put the image into the context body
        resolve(buffer);
      }
    });
  });
}

/* Given an image this calls the Emotive API and get a list of faces in the image and for each face the emotions */
async function getFaces(imageUrl) {
  const fullUrl =
    API_URL +
    "/detect?returnFaceId=false&returnFaceLandmarks=false&returnFaceAttributes=emotion";

  let response = await fetch(fullUrl, {
    headers: {
      "Ocp-Apim-Subscription-Key": API_KEY,
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({ url: imageUrl })
  });
  let resp = await response.json();

  if (resp.length === 0) {
    throw "No faces found in image";
  }

  let faces = [];

  // Loop through faces and find an emoji
  for (let f of resp) {
    let scores = new EmotivePoint(f.faceAttributes.emotion);
    let faceRectangle = new Rect(f.faceRectangle);
    let face = new Face(scores, faceRectangle);
    faces.push(face);
  }

  return faces;
}

export async function index(context, req) {
  context.log("ReplyWithMojifiedImage HTTP trigger");

  context.res = {
    status: 200,
    headers: {
      "Content-Type": "image/jpeg"
    },
    isRaw: true
  };

  const { imageUrl } = req.query;
  if (!imageUrl) {
    let message = `imageUrl is required`;
    context.log.error(message);
    return context.done(message, { status: 400, body: message });
  } else {
    context.log(`Called with imageUrl: "${imageUrl}"`);
  }

  // Get the responce from the faceAPI
  try {
    let faces = await getFaces(imageUrl);
    let buffer = await createMojifiedImage(context, imageUrl, faces);
    context.res.body = buffer;
    context.log(`Posted reply with mojified image`);
    context.done();
  } catch (err) {
    let message =
      "There was an error processing this image: " + JSON.stringify(err);
    context.log.error(message);
    context.done(null, {
      status: 400,
      body: message
    });
  }
}
