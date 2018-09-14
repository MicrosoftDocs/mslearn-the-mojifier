// Part 1
require("dotenv").config();
import fetch from "node-fetch";
import { EmotivePoint, Face, Rect } from "../shared/models";

process.on("unhandledRejection", (reason, p) => {
  console.warn("Unhandled Rejection at: Promise", p, "reason:", reason);
});

/* Given an image this calls the Emotive API and get a list of faces in the image and for each face the emotions */
async function getFaces(imageUrl) {
  //TODO
}

async function createMojifiedImage(imageUrl, faces) {
  //TODO
}

async function main() {
  const [imageUrl] = process.argv.slice(2);
  console.log(imageUrl);
  const faces = await getFaces(imageUrl);
  await createMojifiedImage(imageUrl, faces);
}
main();
