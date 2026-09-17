import urlModel from "../models/url.model.js";

async function deleteUrlController(req, res) {
  const { id } = req.params;

  const url = await urlModel.findById(id);

  if (!url) {
    return res.status(404).json({
      message: "URL not found",
    });
  }

  await urlModel.findByIdAndDelete(id);

  return res.send(200).json({
    message: "URL deleted successfully",
  });
}

export default deleteUrlController;
