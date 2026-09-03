import postModel from "../model/post.model.js";
import imagekit from "../service/storage.service.js";

const createPost = async (req, res) => {
  try {
    const { caption } = req.body;

    if (!caption || !req.file) {
      return res.status(400).json({
        message: "caption and photo are required",
        success: false,
      });
    }

    const { url } = await imagekit.files.upload({
      file: req.file.buffer.toString("base64"),
      fileName: req.file.originalname,
    });

    await postModel.create({
      image: url,
      caption,
    });

    return res.status(201).json({
      message: "post created successfully",
      image: url,
      caption,
    });
  } catch (error) {
    console.error("Post creation error", error);
    res.status(500).json({
      message: "Something went wrong in post creation",
    });
  }
};

export default createPost;
