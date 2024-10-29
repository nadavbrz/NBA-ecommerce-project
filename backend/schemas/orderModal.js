
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  username: { type: String, required: true }, 
  products: [
    {
      product: { type: Schema.Types.ObjectId, required: true, refPath: 'products.model' },
      quantity: { type: Number, required: true },
      productName: { type: String, required: true },
      imgSrc: { type: String, required: true },
    },
  ],
  totalAmount: { type: Number, required: true }, 
  orderDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["pending", "shipped", "delivered"],
    default: "pending",
  },
})

// Custom method to populate products
orderSchema.methods.populateProducts = async function() {
  for (let i = 0; i < this.products.length; i++) {
    const modelName = this.products[i].model;
    this.products[i].product = await mongoose.model(modelName).findById(this.products[i].product);
  }
  return this;
};

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
