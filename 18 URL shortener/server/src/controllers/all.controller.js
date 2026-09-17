import urlModel from "../models/url.model.js";

async function getAllUrlController(req, res) {
  const urls = await urlModel.find();

  return res.status(200).json({
    message: "URLs fetched successfully",
    data: {
      urls,
    },
  });
}

export default getAllUrlController;
