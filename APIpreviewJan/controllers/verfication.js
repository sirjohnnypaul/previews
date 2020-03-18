const Helper = require('../helpers/routeHelpers');
const randomString = require('randomstring');
const path = require('path');
const sender = require('../external/sender');
const dir = path.join(__dirname,'/../testFiles');
const fs = require('fs');
const Order = require('../models/order');
const User = require('../models/user');
module.exports = {

    verify: async (req,res,next) => {
        const token = await req.params.token;
        await console.log("Token:", token);
        try {
            const user = await User.findOne({'token': token });
            if(!user) {
                res.json("Validation error");
                return;
            } else {
                user.accountstatus = await Helper.setVerifiedStatus('Verified');
                const htmlTemplateVerified = `<div style="height:400px; width:100%; background:red;color:white;"><h1>Welcome in xPrint!</h1>
                <br/>
                <h3>Verification Succesfull! Login and use xPrint!.</h3>
                <br/><br/></div>
                `
                await sender.sendMail('noresponse@xprint.com',user.email,'Email verified',htmlTemplateVerified);
                await user.save();
                res.status(200).json("Acount Verification Succesfull!");
            }
        } catch (error) {
            next(error);
        }
    },

    payment: async (req,res,next) => {
        let returnInfo = await req.body;
        // console.log(returnInfo);
        if(returnInfo.tr_status=='TRUE') {
            let orderId = await returnInfo.tr_crc;
            const order = await Order.findById(orderId);
            order.status = 'paid';
            order.save();
            console.log("order updated payment info");
            res.status(200);
        }
    }
};
