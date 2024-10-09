const Product = require('./../models/product')

module.exports = {
    getProducts : async(req,res)=>{
       const data = await Product.find()
       res.json(data)
       console.log(data)
    },
    createProduct: async (req, res) => {
        try {
          const {name, description, value } = req.body;
          const product = new Product({name, description, value });
          await product.save();
          res.json(product);
          console.log(product)
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
      },
      updateProduct: async (req, res) => {
        const { id } = req.params;
    
        try {
            const productUpdate = await Product.findByIdAndUpdate(id, req.body, {
                new: true, // Devuelve el documento actualizado
                runValidators: true // Valida los cambios según el esquema
            });
           if (!productUpdate) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
    
            res.json(productUpdate);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },    
    deleteProduct : async(req,res)=>{
        const id = req.params.id
        const product = await Product.findByIdAndDelete(id)
        res.json({message: 'Producto eliminado'})
        console.log(`Producto eliminado ${product}`)
    }
  }