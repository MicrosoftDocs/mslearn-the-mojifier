import Jimp = require("jimp");
import * as path from "path";
import * as FaceApi from "../shared/faceapi";

async function createMojifiedImage(context, imageUrl, faces) {
  let sourceImage = await Jimp.read(imageUrl);
  // Create a composite image, we will "append" to this composite an emoji image for each face found
  let compositeImage = sourceImage;

  if (faces.length == 0) {
    throw new Error(`No faces found in image`);
  }

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

  try {
    return await compositeImage.getBufferAsync(Jimp.MIME_JPEG);
  } catch (error) {
    context.log(`There was an error adding the emoji to the image: ${error}`);
    throw new Error(error);
  }
}

export async function index(context, req) {
  context.log(`ReplyWithMojifiedImage HTTP trigger`);

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
    context.log(message);
    context.res = { status: 400, body: message }
  } else {
    context.log(`Called with imageUrl: "${imageUrl}"`);

    // Get the response from the faceAPI
    try {
      let faces = await FaceApi.getFaces(context, imageUrl);
      if (faces) {
        let buffer = await createMojifiedImage(context, imageUrl, faces);
        context.res.body = buffer;
        context.log(`Posted reply with mojified image`);
      } else {
        context.res = { status: 400, body: `Could not process image: ${imageUrl}` };
      }
    } catch (err) {
      let message = `There was an error processing this image: ${err.message}`;
      context.log(message);
      context.res = { status: 400, body: message };
    }
  }
}
