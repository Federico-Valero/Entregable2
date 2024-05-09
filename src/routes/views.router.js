const{Router}=require('express')
const router = Router()

const productMock=[
    {id:1,name:'Product 1',price:1500,stock:100, description:'Esto es un producto'},
    {id:2,name:'Product 2',price:1500,stock:100, description:'Esto es un producto 2'},
    {id:3,name:'Product 3',price:1500,stock:100, description:'Esto es un producto 3'}
]

router.get('/', (req,res)=>{
    res.render('index',{
        title: 'Mercadito Fede',
        name: 'Fede'
    })
})

router.get('/prod',(req,res)=>{
    const userMock={
        name:'Fede',
        title:'Productos',
        role:'admin'
    }
    res.render('product', {
        name: userMock.name,
        title: userMock.title,
        isAdmin: userMock.role === 'admin',
        products: productMock
    })
})

module.exports=router