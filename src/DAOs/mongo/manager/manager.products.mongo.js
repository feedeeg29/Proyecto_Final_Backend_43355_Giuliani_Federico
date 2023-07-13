import productModel from "../../mongo/models/model.products.mongo.js";


class productManager {
    getAll = async () => {
        try {
            return await productModel.find().lean();
        } catch (err) {
            throw new Error(err);
        }
    }
    getOne = async (id) => {
        try {
            return await productModel.findById(id).lean();
        } catch (err) {
            throw new Error(err);
        }
    }
    createProduct = async (product) => {
        try {
            const newProduct = new productModel(product);
            return await newProduct.save();
        } catch (err) {
            throw new Error(err);
        }
    }
    updateProduct = async (id, newContent) => {
        try {
            return await productModel.findByIdAndUpdate(id, newContent, { new: true });
        }
        catch (err) {
            throw new Error(err);
        }
    }
    deleteProduct = async (id) => {
        try {
            return await productModel.findByIdAndDelete(id);
        }
        catch (err) {
            throw new Error(err);
        }
    }
}
export default productManager 