const fs= require('fs')

class ProductManager{
    constructor (path) {
        this.products=[]
        this.path=path
    }

    async addProduct(title,description,price,thumbnail,code,stock,){
        if (title!='' && description!='' && price!=0 && thumbnail!='' && code!='' && stock!=0){
            const productsString= await fs.promises.readFile(this.path,'utf-8')
            this.products= JSON.parse(productsString)
            const sameCode = this.products.find ((element)=> (element.code === code))
            if (sameCode){
                console.log("No se puede ingresar productos con el mismo codigo")
            }else{
                let id=0;
                for (let i=0; i< this.products.length; i++){
                    const element= this.products[i]
                    if (element.id > id) {
                        id= element.id
                    }
                }
                id++
                this.products.push({id:id, title, description,price,thumbnail,code,stock})
                const productsString= JSON.stringify(this.products,null,2)
                await fs.promises.writeFile(this.path,productsString)
            }
        }else{
            console.log("Debe ingresar los valores para agregar el producto")
        }
    }

    async getProducts(){
        const productsString= await fs.promises.readFile(this.path,'utf-8')
        this.products= JSON.parse(productsString)
        console.log(this.products)
    }

    async getProductById(id){
        const productsString= await fs.promises.readFile(this.path,'utf-8')
        this.products= await JSON.parse(productsString)
        const findProduct = this.products.find ((product)=>(product.id == id))
        if(findProduct){
            const index= this.products.findIndex((element)=>(element.id == id))
            console.log(this.products[index])
        }else{
            console.log("No existe el producto con id " + id)
        }
    }

    async updateProductById(id,modifier){
        const productsString= await fs.promises.readFile(this.path,'utf-8')
        this.products= JSON.parse(productsString)
        const findProduct = this.products.find ((product)=>(product.id == id))
        if (findProduct) {
            const index= this.products.findIndex((element)=>(element.id == id))
            let modifiedProduct= this.products[index]
            modifiedProduct={...modifiedProduct,...modifier}
            this.products[index]={...modifiedProduct}
            const productsString= JSON.stringify(this.products,null,2)
            await fs.promises.writeFile(this.path,productsString)
        } else {
            console.log(`No se encontro un producto con id ${id}`)
        }
    }

    async deleteProduct(id){
        const productsString= await fs.promises.readFile(this.path,'utf-8')
        this.products= JSON.parse(productsString)
        const findProduct = this.products.find ((product)=>(product.id == id))
        if (findProduct) {
            const index= this.products.findIndex((element)=>(element.id == id))
            this.products.splice(index,1)
            const productsString= JSON.stringify(this.products,null,2)
            await fs.promises.writeFile(this.path,productsString)
        } else {
            console.log(`No se encontro un producto con id ${id}`)
        }
    }
}

const product= new ProductManager ('products.json')
