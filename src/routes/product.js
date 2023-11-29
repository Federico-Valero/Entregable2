const {Router}= require('express')
const router= Router()
const ProductManager= require('../managers/productManager.js')

const productManager= new ProductManager('./managers/products.json')

router.get('/', async (req,res)=>{
    const limit= req.query.limit
    const products= await productManager.getProducts()
    if (limit) {
        res.status(200).json({ status: 'ok', data: products.slice(0,limit) });
    }else{
        res.status(200).json({ status: 'oka', data: products });
    }
})
router.get('/:pid', async (req,res)=>{
    const pid= req.params.pid;
    const product= await productManager.getProductById(pid)
    res.status(200).json({status:'ok', data:product})    
})
router.post



module.exports= router;