const fs= require('fs')

class CartsManger{
    constructor(path){
        this.carts=[]
        this.path=path
    }

    //Genero la funciona para agregar un nuevo carrito
    async addCart(){
        let cartsString= await fs.promises.readFile(this.path,'utf-8')
        this.carts= JSON.parse(cartsString)
        let id=0;
        for (let i=0; i< this.carts.length; i++){
            const element= this.carts[i]
            if (element.id > id) {
                id= element.id
            }
        }
        id++
        this.carts.push({id:id, products:[]})
        cartsString= JSON.stringify(this.carts,null,2)
        await fs.promises.writeFile(this.path,cartsString)
        console.log(this.carts)
    }

    //Genero la funcion para consultar un carrito por su id
    async getCartById(id){
        let cartsString= await fs.promises.readFile(this.path,'utf-8')
        this.carts= JSON.parse(cartsString)
        const findCart= this.carts.find((cart)=>(cart.id == id))
        if (findCart) {
            const index= this.carts.findIndex((element)=>(element.id == id))
            console.log(this.carts[index])
            return this.carts[index]
        }else{
            console.log(`No existe el el carrito con id ${id}`)
            return (`No existe el carrito con id ${id}`)
        }
    }
    //Genero la funcion que agrega los productos en el carro
    async addProductOnCart(cid,pid){
        //leo el json con los carros creados
        let cartsString= await fs.promises.readFile(this.path,'utf-8')
        this.carts= JSON.parse(cartsString)
        //Busco el carro que quiero modificar
        const cartIndex= this.carts.findIndex((element)=>(element.id == cid))
        const products= this.carts[cartIndex].products
        let control= 0
        for (let i = 0; i < products.length; i++) {
            if(products[i].product == pid){
                products[i].quantity +=1
                control +=1
            }
        }
        if (control == 0) {
            products.push({product:pid, quantity:1})
        }
        this.carts[cartIndex].products=[...products]
        cartsString= JSON.stringify(this.carts,null,2)
        await fs.promises.writeFile(this.path,cartsString)
    }
}

module.exports= CartsManger;