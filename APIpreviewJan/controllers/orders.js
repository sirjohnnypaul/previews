const getPageCount = require('docx-pdf-pagecount');
const Order = require('../models/order');
const User = require('../models/user');
const cryptoString = require('crypto-random-string');
const listEndpoints = require('express-list-endpoints');
const formidable = require('formidable')
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');
const File = require('../models/file');
const util = require('util');
const readdir = util.promisify(fs.readdir);
const unlink = util.promisify(fs.unlink);

module.exports = {
    index: async (req, res, next) => {
        const orders = await Order.find({});
        res.status(200).json(orders);
    },

    indexFiles: (req,res,next) => {
        File.find({}, function(err, files) {
            if(err) res.send(err)
            res.json(files)
        })
    },

    indexSingleFile: (req,res,next) => {
        File.findById(req.params.id, function(err, file) {
            if(err) res.send(err)
            res.json(file)
        })
    },


    downloadSingleFile:  (req,res,next) => {
        File.findById(req.params.id, function(err, file) {
            if(err) res.send(err)
            if(file != null) {
                const directoryToLook = path.join(__dirname, '..','UploadedFiles',`${file.path}`)
                if(directoryToLook != null) {
                    console.log(directoryToLook);
                    res.download(directoryToLook); 
                } else {
                    console.log('path posted',directoryToLook);
                    res.send("No file exist")
                }
            }
            else {
                res.send("no file")
            }
        })
    },

    deleteSingleFile: (req,res,next) => {
        File.findById(req.params.id, function(err, file) {
            if(err) res.send(err)
            if(file != null) {
            const removeDir = path.join(__dirname, '..', 'UploadedFiles')
            rimraf(`${removeDir}${file.path}/*`, function () { res.json({message:`File  was succesfully deleted`}); });
            }
            else {
                res.send("no file")
            }
        })
        // File.deleteOne({_id: req.params.id}, function(err,file){
        //     if(err) res.send(err)
        //     try {
        //         fs.unlinkSync(file.path)
        //       } catch(err) {
        //         console.error(err)
        //     }
        //     res.json({message:`File (${req.params.id}) was succesfully deleted`});
        // })
    },

     uploadFile: async (req, res, next) => {
        const remove =  await path.join(__dirname, '..', 'UploadedFiles')
        const relPath =  await req.file.path.replace(remove,'')
        const newFile =  await new File(req.body)
        newFile.path = await relPath
        await newFile.save(function(err,file){
            if(err) {
                 res.status(400).json(err);
            } else {
                getPageCount(path.join(__dirname, '..', 'UploadedFiles',file.path))
                    .then(pages => {
                        console.log(pages);
                        let objectReturned = {
                            file: file,
                            pages: pages
                        }
                        res.status(200).json(objectReturned);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        })
      },

    newOrder: async (req, res, next) => {
        try {
            let userFound = null;
            await User.findById(req.body.user, async (err,user)=>{
                userFound = user;
                const newOrder = await req.body;
                // order.user = user;
                //pricing
                let price;
                switch(newOrder.type){
                  case 'black & white 1-side':
                    newOrder.price = newOrder.pagesToPrint*0.1;
                    break;
                  case 'black & white 2-side':
                    newOrder.price = newOrder.pagesToPrint*0.16;
                    break;
                  case 'color 1-side':
                    newOrder.price = newOrder.pagesToPrint*1;
                      break;
                  case 'color 2-side':
                    newOrder.price = newOrder.pagesToPrint*1.6;
                      break;
                  default:
                    newOrder.price = 0; 
                }
                const order = await new Order(newOrder);
                let ordertoAdd = await order.save();
                // await user.orders.push(ordertoAdd);
                await userFound.userOrders.push(ordertoAdd);
                await userFound.save();
                //await res.status(200).json(ordertoAdd);  
                await res.status(200).json(ordertoAdd); 
            });
        } catch (error) {
            console.log(error);
            await res.status(500);  
        } 
    },

    getOrderById: async (req, res, next) => {
        const order = await Order.findById(req.value.params.orderId);
        res.status(200).json(order);
    },

    replaceOrder: async (req, res, next) => {
        const {orderId} = req.value.params;
        const newOrder = req.value.body;
        const result = await Order.findByIdAndUpdate(orderId,newOrder);
        res.status(200).json({success:true});

    },

    updateOrder: async (req, res, next) => {
        const {orderId} = req.value.params;
        const newOrder = req.value.body;
        const result = await Order.findByIdAndUpdate(orderId,newOrder);
        res.status(200).json({success:true});
    },

    deleteOrder: async (req, res, next) => {
        const {orderId} = req.value.params;
        const order = await Order.findById(orderId);
        if(!order) {
            return res.status(404).json({error:'Order does not exist'});
        }
        const userId = order.user;
        const user = await User.findById(userId);
        await order.remove();
        user.orders.pull(order);
        await user.save();

        res.status(200).json({success: true});
    },
      
    
}