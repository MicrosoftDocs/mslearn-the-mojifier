import * as querystring from "querystring";

process.on("unhandledRejection", (reason, p) => {
  console.warn("Unhandled Rejection at: Promise", p, "reason:", reason);
});

export async function index(context, req) {
  context.log("RespondToSlackCommand HTTP trigger");

  context.res = {
    headers: {
      "Content-Type": "application/json"
    },
    body: null
  };

  const { text } = querystring.parse(req.body);
  let message = "Your mojified image my liege..";
  if (!text) {
    message = "You must provide an image to mojify";
  }

  const mojifyUrl =
    req.url.substr(0, req.url.lastIndexOf("/")) + "/MojifyImage";

  context.res.body = {
    response_type: "in_channel",
    text: message,
    attachments: [
      {
        image_url: `${mojifyUrl}?imageUrl=${text}`
      }
    ]
  };

  context.done();
}
