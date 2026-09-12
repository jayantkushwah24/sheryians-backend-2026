import urlModel from "../models/url.model.js";
import { generateCode } from "../utils/generateCode.js";

async function createUrlController(req, res) {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({
      error: "Please enter a URL",
    });
  }

  if (
    url.startsWith("http://") == false &&
    url.startsWith("https://") == false
  ) {
    return res.status(400).json({
      error: "Please enter a valid URL starting with http:// or https://",
    });
  }

  if (url > 2048) {
    return res.status(400).json({
      error: "URL is too long",
    });
  }

  const code = generateCode();

  const newUrl = await urlModel.create({
    originalUrl: url,
    shortCode: code,
  });

  return res.status(201).json({
    message: "URL shortened successfully",
    data: {
      shortCode: newUrl.shortCode,
      originalUrl: newUrl.originalUrl,
    },
  });
}

export default createUrlController;
