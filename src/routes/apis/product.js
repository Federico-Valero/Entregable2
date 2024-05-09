const {Router}= require('express')
const router= Router()
const ProductManager= require('../../managers/productManager.js')

const productManager= new ProductManager('./managers/products.json')

// Ruta get preedeterminada, devuelve listado de productos actual
router.get('/', async (req,res)=>{
    try{
        const limit= req.query.limit
        const products= await productManager.getProducts()
        if (limit) {
            res.status(200).json({ status: 'ok', data: products.slice(0,limit) });
        }else{
            res.status(200).json({ status: 'oka', data: products });
        }
    }catch (error){
        res.status(400).json({status:'Error', data:'Error al intentar mostrar los productos'})
    }

// Ruta get con id, devuelve producto con ID indicado
})
router.get('/:pid', async (req,res)=>{
    try {const pid= req.params.pid;
        const product= await productManager.getProductById(pid)
        res.status(200).json({status:'ok', data:product})
    }catch(error){
        res.status(404).json({ status: "Error", message: error.message })
    }
})

// Ruta post, agrega un producto con los datos pasados por body
router.post('/', async (req,res)=>{
    try{
        let {title,description,code,price,status,stock,category,thumbnails}= req.body
        status=req.body.status || true
        if(title && description && code && price && status && stock && category){
            await productManager.addProduct(title,description,price,thumbnails,code,stock)
            res.status(200).json({status:'Ok', data:"Producto agregado correctamente"})
        }
    }catch (error){
        res.status(400).json({status:'Error', data:'Debe ingresar valores validos'})
    }
})

// Ruta put actualiza el producto con el ID indicado y coloca los datos pasados por body
router.put('/:pid', async (req,res)=>{
    try{
        const pid= req.params.pid;
        const modifier= req.body;
        const product= await productManager.updateProductById(pid,modifier)
        res.status(200).json({status:'Ok', data: product})
    }catch (error){
        res.status(404).json({ status: "Error", message: error.message })
    }

// Ruta delete elimina el producto con el ID indicado
router.delete('/:pid', async (req,res)=>{
    try {
        const pid= req.params.pid;
        await productManager.deleteProduct(pid);
        res.status(200).json({status:'Ok', data:"Producto eliminado correctamente"})
    } catch (error) {
        res.status(404).json({ status: "Error", message: error.message })
    }
})

})



module.exports= router;