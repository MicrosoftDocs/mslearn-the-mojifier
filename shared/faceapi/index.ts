import * as fs from "fs";
import fetch from "node-fetch";
import * as path from "path";
import { EmotivePoint } from "../models/emotivePoint";
import { Face } from "../models/faces";
import { Rect } from "../models/rect";
import * as emojiConvert from "emoji-dictionary";

const API_URL = process.env["FACE_API_URL"];
const API_KEY = process.env["FACE_API_KEY"];

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function callFaceApi(context, contentType, body) {

    const faceApiUrlWithParams =
        API_URL +
        "/detect?returnFaceId=false&returnFaceLandmarks=false&returnFaceAttributes=emotion";

    let response;
    try {
        response = await fetch(faceApiUrlWithParams, {
            headers: {
                "Ocp-Apim-Subscription-Key": API_KEY,
                "Content-Type": contentType
            },
            method: "POST",
            body: body
        });
    } catch (error) {
        throw new Error(`Call to Face API with URL: [${API_URL}] threw exception: [${error.message}]. Check that the FACE_API_URL environment variable is set`);
    }

    if (!response.ok) {
        context.log(`Call to Face API with URL: [${API_URL}] failed with status [${response.status}: ${response.statusText}]`);
        if (response.status == 429) {
            context.log(`${response.statusText}: waiting 30 seconds and trying again`);
            await timeout(30000);
            return await callFaceApi(context, contentType, body);
        } else {
            throw new Error(`Call to Face API with URL: [${API_URL}] failed with status [${response.status}: ${response.statusText}]`);
        }
    } else {
        return  await response.json();
    }
}


// Given an emoji character, get the emotion for the corresponding proxy image
export async function getEmotionFromLocalProxyImage(context, emoji) {
    let trainEmojiFileName = path.resolve(
        __dirname,
        "../proxy-images/" + emoji + ".jpg"
    );

    const buffer = fs.readFileSync(trainEmojiFileName);

    let faceData = await callFaceApi(context, "application/octet-stream", buffer);

    return faceData[0].faceAttributes.emotion;
}

// Given an image this calls the Emotive API and get a list of faces in the image
// and the emotion detected for each face
export async function getFaces(context, imageUrl) {
    const body = JSON.stringify({ url: imageUrl });

    let faceData = await callFaceApi(context, "application/json", body);

    let faces = [];
    for (let f of faceData) {
        let scores = new EmotivePoint(f.faceAttributes.emotion);
        let faceRectangle = new Rect(f.faceRectangle);
        let face = new Face(scores, faceRectangle);
        faces.push(face);
    }
    return faces;
}
