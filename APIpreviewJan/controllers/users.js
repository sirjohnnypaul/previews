const User = require('../models/user');
const Order = require('../models/order');
const Helper = require('../helpers/routeHelpers');
const randomString = require('randomstring');
const sender = require('../external/sender');

module.exports = {

    index: async (req,res,next) => {
        const users = await User.find({});
        res.status(200).json(users);
    },

    newUser: async (req,res, next) => {
        const newUser = await new User(req.value.body);
        
        try {
            let emailAlreadyExists = await User.find({email:newUser.email});
            let count = await emailAlreadyExists.length;
            if(count != 0) {
                res.status(400).json("User already exists, try another email or login");
            } else {
                let password = await newUser.password;
                await console.log(password);
                newUser.password = await Helper.hashPassword(password);
                await console.log(newUser.password);
                newUser.token = await randomString.generate();
                newUser.accountstatus = await Helper.setPendingStatus('Pending Validation');
                await console.log('generated token: ', newUser.token);  
                const htmlTemplate = `<h1>Welcome in xPrint!</h1>
                <br/>
                <h3>Thanks for registering! There is one more step we need you to do. Click below link to confirm your registration.</h3>
                <br/><br/>
                <a href="https://xprinttrial9686575532432511.herokuapp.com/verify/${newUser.token}">VERIFY EMAIL</a>
                `
                await sender.sendMail('noresponse@xprint.com',newUser.email,'Verify Your Email',htmlTemplate);
                const user = await newUser.save();
                await console.log('New user:',user);
                res.status(200).json("Acount Created, pending email verification");
            }
        } catch (error) {
            console.log(error);
            console.log("No users found, will be created");
            let password = await newUser.password;
            await console.log(password);
            newUser.password = await Helper.hashPassword(password);
            await console.log(newUser.password);
            newUser.token = await randomString.generate();
            newUser.accountstatus = await Helper.setPendingStatus('Pending Validation');
            await console.log('generated token: ', newUser.token);  
            const htmlTemplate = `<h1>Welcome in xPrint!</h1>
            <br/>
            <h3>Thanks for registering! There is one more step we need you to do. Click below link to confirm your registration.</h3>
            <br/><br/>
            <a href="localhost:2531/users/verify/${newUser.token}">VERIFY EMAIL</a>
            `
            await sender.sendMail('noresponse@xprint.com',newUser.email,'Verify Your Email',htmlTemplate);
            const user = await newUser.save();
            await console.log('New user:',user);
            res.status(200).json("Acount Created, pending email verification");
        }
        
 
      
    },

    login: async (req,res,next) => {
        const userLogging = await req.value.body;
        const userExists = await User.find({email:userLogging.email});
        if(userExists[0].accountstatus != 'Verified'){
            res.status(401).json("Verify your account first by email we sent you!");
        } else {
            //await console.log(userExists[0].password);
            let response = await Helper.comparePasswords(userLogging.password,userExists[0].password);
            if(response === true){
                userExists[0].token = await randomString.generate();
                await userExists[0].save();
                res.status(200).json(userExists[0]);
            }
            else {
                res.status(400).json("Wrong email or password!");
            }
        }
    },

    logout: async(req,res,next) => {
        const {userId} = await req.value.params;
        try {
            const user = await User.findById(userId);
            user.token = '';
            await user.save();
            res.status(200).json("User logged out!");
        } catch (error) {
            next(error);
        }
    },

    getUser: async (req,res,next) => {
        const {userId} = req.value.params; 
        const user = await User.findById(userId);
        res.status(200).json(user);
    },

    replaceUser: async (req,res,next) => {
        const {userId} = req.value.params;
        const newUser = req.value.body;
        const result = await User.findByIdAndUpdate(userId,newUser);
        res.status(200).json({success:true});
    },

    updateUser: async (req,res,next) => {
        const {userId} = req.value.params;
        const newUser = req.value.body;
        const result = await User.findByIdAndUpdate(userId,newUser);
        res.status(200).json({success:true});
    },

    getUserOrders: async (req,res,next) => {
        const {userId} = req.params;
        const user = await User.findById(userId).populate('orders');
        res.status(200).json(user.orders);
    },

    newUserOrder: async (req,res,next) => {
        const {userId} = req.value.params;
        const newOrder = new Order(req.value.body);
        const user = await User.findById(userId);
        newOrder.user = user;
        await newOrder.save();
        user.orders.push(newOrder);
        await user.save();
        res.status(201).json(newOrder);
    },

    deleteUser: async (req,res,next) => {
        const {userId} = req.value.params; 
        const user = await User.findById(userId);
        if(!user) {
            return res.status(404).json({error:'User does not exist'});
        }
        await user.remove();
        await user.save();
        res.status(200).json(user);
    },

};
