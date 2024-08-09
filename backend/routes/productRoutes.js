const express = require("express");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
} = require("../controllers/productController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// router.get("/", getProducts);
router.route("/").get(getProducts).post(protect, admin, createProduct);
router.get('/top', getTopProducts);
// router.get("/:id", getProductById);
router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);
router.route("/:id/reviews").post(protect, createProductReview);

module.exports = router;
