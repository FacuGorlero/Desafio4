const express = require("express");
const ProductManager = require("./Manager/ProductManager.js");
const { productosrouter} = require("./routes/products.route.js");
const { cartsRouter } = require ("./routes/cart.route.js");
const handlebars = require("express-handlebars");
const {viewsrouter} = require("./routes/views.route.js");
const { Server } = require("socket.io");


const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.engine('hbs', handlebars.engine({extname: '.hbs'}));
app.set('view engine', 'hbs');
app.set("views", __dirname + "/views")

app.use('/views', viewsrouter)

app.use("/api/products", productosrouter)
app.use('/api/carts/', cartsRouter)
app.use(( err, req, res, next)=>{
  console.error(err.stack)
  res.status(500).send('Error de server')
})

const serverHttp = app.listen(port, () => {
  console.log(`Server andando en port ${port}`);
});

const socketServer = new Server(serverHttp);
app.set('socket.io', socketServer);



socketServer.on("connection", (socket) => {
  console.log("Client connected");
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
  