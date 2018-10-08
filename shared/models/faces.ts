import { MOJIS } from "./mojis";
import { Rect } from "./rect";
import * as emoji from "emoji-dictionary";

export class Face {
  emotivePoint;
  faceRectangle;
  moji;
  mojiIcon;

  constructor(emotivePoint, faceRectangle: Rect) {
    this.emotivePoint = emotivePoint;
    this.faceRectangle = faceRectangle;
    this.moji = this.chooseMoji(this.emotivePoint);
    this.mojiIcon = this.moji.emojiIcon;
  }

  get mojiName() {
    // Given an emoji like 😴 returns the word version, like 'sleepy'
    return emoji.getName(this.mojiIcon);
  }

  chooseMoji(point) {
    let closestMoji = null;
    let closestDistance = Number.MAX_VALUE;
    for (let moji of MOJIS) {
      let emoPoint = moji.emotiveValues;
      let distance = emoPoint.distance(point);
      if (distance < closestDistance) {
        closestMoji = moji;
        closestDistance = distance;
      }
    }
    return closestMoji;
  }
}
