Tendo os seguintes models:

const categorySchecma = new mongoose.Schema({
name: { type: String, required: true, unique: true },
description: { type: String, default: "" },
});

export const Category = mongoose.model("Category", categorySchecma);

const productSchema = new mongoose.Schema({
name: { type: String, required: true },
price: { type: Number, required: true },
category: {
type: mongoose.Schema.Types.ObjectId,
ref: "Category",
required: true,
},
categoryId: { type: String, required: true },
sizes: { type: [String], default: [] },
});

export const Product = mongoose.model("Product", productSchema);

Em que o produto deve pertencer a uma categoria.

Crie um controller de criação de produto. Estou usando express e mongoose
