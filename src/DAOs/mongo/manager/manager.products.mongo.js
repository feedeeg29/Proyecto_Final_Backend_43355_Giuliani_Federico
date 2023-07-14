import productModel from "../../mongo/models/model.products.mongo.js";


class productManager {
    getAll = async (req, res, query) => {
        try {
            const options = {
                page: req.query.page || 1,
                limit: req.query.limit || 1,
                lean: true
            };
            const datosProducts = await productModel.paginate({}, options);
            const products = datosProducts.docs;
            const hasPrevPage = datosProducts.hasPrevPage;
            const hasNextPage = datosProducts.hasNextPage;
            const prevPage = datosProducts.prevPage;
            const nextPage = datosProducts.nextPage;
            return { products, hasNextPage, hasPrevPage, nextPage, prevPage };

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