import { EmotivePoint } from "./emotivePoint";

const FIXED_EMOJIS = [
  {
    emotiveValues: new EmotivePoint({
      anger: 0,
      contempt: 1,
      disgust: 0,
      fear: 0,
      happiness: 0,
      neutral: 0,
      sadness: 0,
      surprise: 0
    }),
    emojiIcon: "😒"
  },
  {
    emotiveValues: new EmotivePoint({
      anger: 1,
      contempt: 0,
      disgust: 0,
      fear: 0,
      happiness: 0,
      neutral: 0,
      sadness: 0,
      surprise: 0
    }),
    emojiIcon: "😡"
  }
];

/* This is a map of emoji to closest values for each emotion */
export const MOJIS = [
  ...FIXED_EMOJIS,
  {
    emotiveValues: new EmotivePoint({
      anger: 0,
      contempt: 0,
      disgust: 0,
      fear: 0,
      happiness: 0.962,
      neutral: 0.037,
      sadness: 0,
      surprise: 0.001
    }),
    emojiIcon: "☺️"
  },
  {
    emotiveValues: new EmotivePoint({
      anger: 0.572,
      contempt: 0.025,
      disgust: 0.242,
      fear: 0.001,
      happiness: 0.014,
      neutral: 0.111,
      sadness: 0.033,
      surprise: 0.003
    }),
    emojiIcon: "💩"
  },
  {
    emotiveValues: new EmotivePoint({
      anger: 0,
      contempt: 0,
      disgust: 0,
      fear: 0,
      happiness: 0.997,
      neutral: 0.003,
      sadness: 0,
      surprise: 0
    }),
    emojiIcon: "🤓"
  },
  {
    emotiveValues: new EmotivePoint({
      anger: 0.005,
      contempt: 0.007,
      disgust: 0,
      fear: 0,
      happiness: 0.001,
      neutral: 0.978,
      sadness: 0.009,
      surprise: 0
    }),
    emojiIcon: "🤔"
  },
  {
    emotiveValues: new EmotivePoint({
      anger: 0,
      contempt: 0.001,
      disgust: 0,
      fear: 0,
      happiness: 0.948,
      neutral: 0.052,
      sadness: 0,
      surprise: 0
    }),
    emojiIcon: "🦄"
  },
  {
    emotiveValues: new EmotivePoint({
      anger: 0.001,
      contempt: 0,
      disgust: 0,
      fear: 0,
      happiness: 0.969,
      neutral: 0.03,
      sadness: 0,
      surprise: 0
    }),
    emojiIcon: "😃"
  },
  {
    emotiveValues: new EmotivePoint({
      anger: 0,
      contempt: 0,
      disgust: 0,
      fear: 0,
      happiness: 1,
      neutral: 0,
      sadness: 0,
      surprise: 0
    }),
    emojiIcon: "😆"
  },
  {
    emotiveValues: new EmotivePoint({
      anger: 0,
      contempt: 0.081,
      disgust: 0,
      fear: 0,
      happiness: 0.871,
      neutral: 0.032,
      sadness: 0,
      surprise: 0.016
    }),
    emojiIcon: "😉"
  },
  {
    emotiveValues: new EmotivePoint({
      anger: 0,
      contempt: 0,
      disgust: 0,
      fear: 0,
      happiness: 0.995,
      neutral: 0.005,
      sadness: 0,
      surprise: 0
    }),
    emojiIcon: "😍"
  },
  {
    emotiveValues: new EmotivePoint({
      anger: 0.001,
      contempt: 0.003,
      disgust: 0,
      fear: 0,
      happiness: 0.002,
      neutral: 0.99,
      sadness: 0.003,
      surprise: 0.001
    }),
    emojiIcon: "😎"
  },
  {
    emotiveValues: new EmotivePoint({
      anger: 0.005,
      contempt: 0.03,
      disgust: 0.001,
      fear: 0.049,
      happiness: 0.012,
      neutral: 0.511,
      sadness: 0.016,
      surprise: 0.375
    }),
    emojiIcon: "😐"
  },
  {
    emotiveValues: new EmotivePoint({
      anger: 0,
      contempt: 0.001,
      disgust: 0,
      fear: 0,
      happiness: 0.039,
      neutral: 0.952,
      sadness: 0.002,
      surprise: 0.006
    }),
    emojiIcon: "😕"
  },
  {
    emotiveValues: new EmotivePoint({
      anger: 0.093,
      contempt: 0.003,
      disgust: 0.001,
      fear: 0.003,
      happiness: 0,
      neutral: 0.881,
      sadness: 0.006,
      surprise: 0.013
    }),
    emojiIcon: "😖"
  },
  {
    emotiveValues: new EmotivePoint({
      anger: 0,
      contempt: 0.001,
      disgust: 0,
      fear: 0,
      happiness: 0,
      neutral: 0.988,
      sadness: 0.011,
      surprise: 0
    }),
    emojiIcon: "😘"
  },
  {
    emotiveValues: new EmotivePoint({
      anger: 0.001,
      contempt: 0.181,
      disgust: 0.003,
      fear: 0,
      happiness: 0.727,
      neutral: 0.087,
      sadness: 0,
      surprise: 0
    }),
    emojiIcon: "😜"
  },
  {
    emotiveValues: new EmotivePoint({
      anger: 0,
      contempt: 0,
      disgust: 0,
      fear: 0,
      happiness: 1,
      neutral: 0,
      sadness: 0,
      surprise: 0
    }),
    emojiIcon: "😝"
  },
  {
    emotiveValues: new EmotivePoint({
      anger: 0.049,
      contempt: 0.002,
      disgust: 0,
      fear: 0,
      happiness: 0,
      neutral: 0.941,
      sadness: 0.008,
      surprise: 0
    }),
    emojiIcon: "😠"
  },
  {
    emotiveValues: new EmotivePoint({
      anger: 0,
      contempt: 0,
      disgust: 0.001,
      fear: 0,
      happiness: 0.004,
      neutral: 0.94,
      sadness: 0.001,
      surprise: 0.053
    }),
    emojiIcon: "😧"
  },
  {
    emotiveValues: new EmotivePoint({
      anger: 0.031,
      contempt: 0.009,
      disgust: 0.096,
      fear: 0.017,
      happiness: 0,
      neutral: 0.584,
      sadness: 0.223,
      surprise: 0.04
    }),
    emojiIcon: "😩"
  },
  {
    emotiveValues: new EmotivePoint({
      anger: 0,
      contempt: 0,
      disgust: 0,
      fear: 0,
      happiness: 0.987,
      neutral: 0.012,
      sadness: 0,
      surprise: 0
    }),
    emojiIcon: "😬"
  },
  {
    emotiveValues: new EmotivePoint({
      anger: 0.001,
      contempt: 0.007,
      disgust: 0.003,
      fear: 0.001,
      happiness: 0,
      neutral: 0.298,
      sadness: 0.689,
      surprise: 0
    }),
    emojiIcon: "😭"
  },
  {
    emotiveValues: new EmotivePoint({
      anger: 0.003,
      contempt: 0,
      disgust: 0.001,
      fear: 0.034,
      happiness: 0,
      neutral: 0,
      sadness: 0,
      surprise: 0.961
    }),
    emojiIcon: "😱"
  },
  {
    emotiveValues: new EmotivePoint({
      anger: 0.007,
      contempt: 0.003,
      disgust: 0,
      fear: 0.057,
      happiness: 0,
      neutral: 0.098,
      sadness: 0,
      surprise: 0.834
    }),
    emojiIcon: "😳"
  },
  {
    emotiveValues: new EmotivePoint({
      anger: 0.004,
      contempt: 0.006,
      disgust: 0.008,
      fear: 0.002,
      happiness: 0,
      neutral: 0.872,
      sadness: 0.105,
      surprise: 0.003
    }),
    emojiIcon: "😴"
  }
];
