import productModel from "../model/product.model.js";
import { uploadFile } from "../services/storage.service.js";

export async function createProduct(req, res) {
  const { title, description, price, sizes } = req.body;

  const fileUrls = [];

  for (let i = 0; i < req.files.length; i++) {
    const response = await uploadFile({
      buffer: req.files[i].buffer,
      fileName: req.files[i].originalName,
    });
    fileUrls.push(response.url);
  }
  const product = await productModel.create({
    title,
    description,
    price: {
      amount: price.amount,
      currency: price.currency,
    },
    sizes: {
      size: sizes[0].size,
      stock: sizes[0].stock,
    },
    images: fileUrls,
    seller: req.user.userId,
  });

  return res.status(200).json({
    message: "Product created successfully",
    data: { product },
  });
}

export async function listAllProduct(req, res) {
  const products = await productModel.find({ published: true });

  return res.status(200).json({
    message: "products data fetched successfully",
    data: { products },
  });
}
export async function listAllProductsToSeller(req, res) {
  const products = await productModel.find({});

  return res.status(200).json({
    message: "products data fetched successfully",
    data: { products },
  });
}

export async function unlistProduct(req, res) {
  const { id } = req.params;

  const product = await productModel.findById(id);

  if (!product) {
    return res.status(404).json({
      message: "product not found by id",
    });
  }

  await productModel.findByIdAndUpdate(id, { published: false });

  return res.status(200).json({
    message: "product unpublished successfully",
  });
}

export async function listProduct(req, res) {
  const { id } = req.params;

  const product = await productModel.findById(id);

  if (!product) {
    return res.status(404).json({
      message: "product not found by id",
    });
  }

  await productModel.findByIdAndUpdate(id, { published: true });

  return res.status(200).json({
    message: "product published successfully",
  });
}
