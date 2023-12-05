const {Router} = require('express');
const ProductManager = require('../Manager/ProductManager.js');
const router = Router();

const productos = new ProductManager('./src/mock/Productos.json')

router.get('/', async (req, res) => {

    const products = await productos.getProducts();
    res.render('home',{
        title: 'ComercioSport Club',
        products,
    })

})


router.get('/realtimeproducts', async (req, res) => {
    const products = await productos.getProducts();
    res.render('realtimeproducts',{
        title: 'ComercioSport Club',
        products
    });
})


exports.viewsrouter = router;