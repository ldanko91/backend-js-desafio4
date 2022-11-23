import express, { json, urlencoded } from "express";

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

const PORT = 8080;

const productos = [
    
    {
        "title": "Tanque 500",
        "price": 21000,
        "thumbnail": "./img/maral60.jpg",
        "id": 1
      },
    {
        "title": "Vanitory Maral 60",
        "price": 21000,
        "thumbnail": "./img/maral60.jpg",
        "id": 2
      },
      {
        "title": "Vanitory standard 50",
        "price": 17000,
        "thumbnail": "./img/std50.jpg",
        "id": 3
      },
      
]


app.get("/api/productos", (req, res)=>{
    try {
        res.json({
            status:"OK",
            data: {productos},
        })
    } catch (error) {
        console.log(error)
    }
})

app.get("/api/productos/:id", (req, res)=>{
    const {id} = req.params;
    const productoId = productos.find((producto) => producto.id === Number(id));

    if(!productoId) {
        res.status(404).json({
            status: "Not found",
            data: "Producto no encontrado"
        })
    } else {
        res.status(200).json({
            status: "OK",
            data: {productoId}
        })
    }
})

app.post('/api/productos', (req, res) => {
    const nuevoProducto = req.body;
    console.log(req.body)

    const maxId = productos.length;

    productos.push({ title:nuevoProducto.title , price:nuevoProducto.price , thumbnail:nuevoProducto.thumbnail , id: maxId + 1});
    console.log(productos)

    res.status(200).json({
        status: "Operación correcta",
        data: {nuevoProducto}
    })
})

app.put('/api/productos/:id', (req, res) => {
    const {id} = req.params;
    const updateProd = req.body;
    
    console.log(`Se va a modificar el producto con index: ${Number(id)-1}`)

    productos.splice((Number(id)-1), 1)

    productos.push({ title:updateProd.title , price:updateProd.price , thumbnail:updateProd.thumbnail , id: Number(id)});
    console.log(productos)

    res.status(200).json({
        status: "Operación correcta",
        data: {updateProd}
    })
})

app.delete('/api/productos/:id', (req, res) => {
    const {id} = req.params;
    
    productos.splice((Number(id)-1), 1)
    console.log(productos)


    res.status(200).json({
        status: "Operación correcta",
        data: `Producto con ID: ${id} eliminado`
    })
})

app.listen(PORT, ()=>{
    console.log(`Servidor conectado a puerto: ${PORT}`)
})