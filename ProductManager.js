const fs= requiere('fs')

class ProductManager{
    constructor (path) {
        this.products=[]
        this.path=path
    }

    async addProduct(title,description,price,thumbnail,code,stock,){
        if (title!='' && description!='' && price!=0 && thumbnail!='' && code!='' && stock!=0){
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
                await fs.promises.writeFile('products.json',productsString)
            }
        }else{
            console.log("Debe ingresar los valores para agregar el producto")
        }
    }

    async getProducts(){
        const productsString= await fs.promises.readFile('products.json','utf-8')
        this.products= JSON.parse(productsString)
        console.log(this.products)
    }

    async getProductById(id){
        const productsString= await fs.promises.readFile('products.json','utf-8')
        this.products= JSON.parse(productsString)
        const findProduct = this.products.find ((product)=>(product.id == id))
        if(findProduct){
            console.log(this.products[id-1])
        }else{
            console.log("No existe el producto con id " + id)
        }
    }

    async updateProduct(id,modifier){
        const productsString= await fs.promises.readFile('products.json','utf-8')
        this.products= JSON.parse(productsString)
        const findProduct = this.products.find ((product)=>(product.id == id))
        if (findProduct) {
            const modifiedProduct= this.products[id-1]
            modifiedProduct={...modifiedProduct,modifier}
            this.products.push(modifiedProduct)
            const productsString= JSON.stringify(this.products,null,2)
            await fs.promises.writeFile('products.json',productsString)
        } else {
            console.log(`No se encontro un producto con id ${id}`)
        }
    }

    async deleteProduct(id){
        const productsString= await fs.promises.readFile('products.json','utf-8')
        this.products= JSON.parse(productsString)
        const findProduct = this.products.find ((product)=>(product.id == id))
        if (findProduct) {
            this.products.splice(id-1,1)
            const productsString= JSON.stringify(this.products,null,2)
            await fs.promises.writeFile('products.json',productsString)
        } else {
            console.log(`No se encontro un producto con id ${id}`)
        }
    }
}