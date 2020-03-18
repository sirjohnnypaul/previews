const router = require('express-promise-router')();
const OrdersController = require('../controllers/orders');
const {validateParam,validateHeader,validateBody, schemas} = require('../helpers/routeHelpers');
const fs = require('fs');
const multer = require('multer')
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        const uploadsDir = path.join(__dirname, '..', 'UploadedFiles',`${Date.now()}`)
        fs.mkdirSync(uploadsDir)
        cb(null,uploadsDir)
    },
    filename:function(req, file, cb){
        cb(null,file.originalname)
    }
});

const upload = multer({storage});

router.route('/')
    .get(validateHeader(schemas.tokenSchema,'authorization'),OrdersController.index)

    .post(validateHeader(schemas.tokenSchema,'authorization'),
        OrdersController.newOrder)

router.route('/files')
    .get(validateHeader(schemas.tokenSchema,'authorization'),OrdersController.indexFiles)
    .post(validateHeader(schemas.tokenSchema,'authorization'),upload.single("data"),OrdersController.uploadFile)

router.route('/files/:id')
    .get(validateHeader(schemas.tokenSchema,'authorization'),OrdersController.indexSingleFile)
    .delete(validateHeader(schemas.tokenSchema,'authorization'), OrdersController.deleteSingleFile)

router.route('/files/:id/download')
    .get(validateHeader(schemas.tokenSchema,'authorization'),OrdersController.downloadSingleFile)

router.route('/:orderId')
    .get(validateHeader(schemas.tokenSchema,'authorization'),validateParam(schemas.idSchema, 'orderId'),
        OrdersController.getOrderById)

    .put(validateHeader(schemas.tokenSchema,'authorization'),validateParam(schemas.idSchema, 'orderId'),
        validateBody(schemas.putOrderSchema),
            OrdersController.replaceOrder)

    .patch(validateHeader(schemas.tokenSchema,'authorization'),validateParam(schemas.idSchema, 'orderId'),
        validateBody(schemas.patchOrderchema),
            OrdersController.updateOrder)
    
    .delete(validateHeader(schemas.tokenSchema,'authorization'),validateParam(schemas.idSchema, 'orderId'),
        OrdersController.deleteOrder)


module.exports = router;