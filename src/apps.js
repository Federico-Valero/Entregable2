const express= require ('express')
const ProductManager= require('./productManager')

const app= express()
const port=8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const productManager= new ProductManager('./products.json')

app.get("/products", async (req,res)=>{
    const limit= req.query.limit
    const products= await productManager.getProducts()
    if (limit) {
        res.status(200).json({ status: 'ok', data: products.slice(0,limit) });
    }else{
        res.status(200).json({ status: 'oka', data: products });
    }
})

app.get("/products/:pid", async (req,res)=>{
    const pid= req.params.pid;
    const product= await productManager.getProductById(pid)
    res.status(200).json({status:'ok', data:product})    
})


app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
});