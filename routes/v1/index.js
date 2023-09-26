var express = require('express');
var router = express.Router();
var path = require('path')

const multer = require('multer');

var storage = multer.memoryStorage()
var upload = multer({ storage: storage });

const limitsMulter = {
    files: 1, // allow only 1 file per request
    fileSize: 9000 * 1024 * 1024, // (replace MBs allowed with your desires)
};

const uploadNew = multer({
    // storage: storage,
    
    dest: path.resolve('./malter'),
    limits: limitsMulter,
});
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

const userController = require('../../Controller/Auth/User')
const userViewController = require('../../Controller/User/Saloon')
const userViewServiceController = require('../../Controller/User/Service')

const serviceController = require('../../Controller/Service')
const beauticianController = require('../../Controller/Beautician')
const saloonController = require('../../Controller/Saloon')
const ratingController = require('../../Controller/User/Rating')

const middleware = require('../../service/middleware').middleware;

/** ================================= without login url ================================= */
// define seperated route
//user login register
router.post('/user/register', userController.userRegister)
router.post('/user/login', userController.login)

//service add

router.post('/add-service', serviceController.addService)
router.post('/add-beautician', beauticianController.addBeautician)
router.post('/add-saloon', saloonController.addSaloon)

const AdminRoute = require('./admin')


/** ================================= without login url ================================= */

router.use(middleware); // ========> auth setup 

router.post('/user/add-rating', ratingController.addRating)
router.get('/user/view-saloon', userViewController.getSaloon)
router.post('/user/serch-by-rating', userViewController.getSaloonByRating)
router.get('/user/all-services', userViewServiceController.getService)
router.post('/user/filter-service-by-price', userViewServiceController.getServiceFilterByPrice)
router.get('/user/service-by-beautician', userViewServiceController.serviceByBeautician)
router.post('/user/service-sort-by-price', userViewServiceController.sortServiceByPrice)









module.exports = router;