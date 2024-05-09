const {Router}= require('express')
const router= Router()
const CartsManger= require('../../managers/cartsManager.js')
const ProductManager= require('../../managers/productManager.js')

const cartsManager= new CartsManger('./managers/carts.json')

const productManager= new ProductManager('./managers/products.json')

//Genero el POST para crear un carrito nuevo
router.post('/',async(req,res)=>{
    try {
        await cartsManager.addCart()
        res.status(200).json({status:'Ok', data:'Carro creado correctamente'})
    } catch (error) {
        res.status(400).json({status:'Error', data:'No se pudo crear el carrito'})
    }
})

//Genero el GET que muestra los productos del id del carrito brindado
router.get('/:cid', async(req,res)=>{
    try {
        const cid= req.params.cid;
        const cart= await cartsManager.getCartById(cid)
        res.status(200).json({status:'Ok', data:cart.products})
    } catch (error) {
        res.status(400).json({status:'Error', data:'No se pudo encontrar el carrito'})
    }
})

//Genero el POST que va a colocar los productos en el carrito
router.post('/:cid/product/:pid',async(req,res)=>{
    try {
    const cid= req.params.cid
    const pid= parseInt(req.params.pid) 
    if (typeof await productManager.getProductById(pid) === 'string') {
        error
    } else {
        await cartsManager.addProductOnCart(cid,pid)
        res.status(200).json({status:'Ok', data:'Se agrego el producto al carro'})
    }
    
    } catch (error) {
        res.status(400).json({status:'Error', data:'No existe el producto indicado'})
    }
})

module.exports= router;