const express= require ('express')
const productRouter= require('./routes/product.js')
const cartsRouter= require('./routes/carts.js')

const app= express()
const port=8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/static',express.static('public'))

app.use('/api/products',productRouter)
app.use('/api/carts',cartsRouter)




app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
});