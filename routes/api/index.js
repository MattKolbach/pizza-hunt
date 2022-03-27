//This file will import all of the API routes to prefix their endpoint names and package them up.

const router = require('express').Router();

const commentRoutes = require('./comment-routes');
const pizzaRoutes = require('./pizza-routes');

//add prefix of `/comments` to routes created in `pizza-routes.js`
router.use('/comments', commentRoutes);

//add prefix of `/pizzas` to routes created in `pizza-routes.js`
router.use('/pizzas', pizzaRoutes);




module.exports = router;