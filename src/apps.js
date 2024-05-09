const express= require ('express')
const handlebars = require ('express-handlebars')
const {Server}= require ('socket.io')

const productRouter= require('./routes/apis/product.js')
const cartsRouter= require('./routes/apis/carts.js')
const viewsRouter= require('./routes/views.router.js')


const app= express()
const port=8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

app.engine('hbs', handlebars.engine({
    extname:'.hbs'
}))
app.set('view engine', 'hbs')
app.set('views', './views')


app.use('/api/products',productRouter)
app.use('/api/carts',cartsRouter)
app.use('/views',viewsRouter)




const serverHttp= app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
});

const io = new Server(serverHttp)
io.on('connection', socket =>{
    console.log ('Nuevo cliente conectado')

    socket.on('recibirMensajeCliente', data =>{
        console.log (data) 
    })
    socket.emit('soloParaElActual','Este lo debe recibir solo el socket acutal')
})