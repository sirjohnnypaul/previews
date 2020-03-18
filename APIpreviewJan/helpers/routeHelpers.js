const Joi = require('joi');
const bcrypt = require('bcryptjs');
const keys = require('../configuration/authentication');


module.exports = {
    
    validateParam: (schema,name) => {
        return (req,res,next) => {
            console.log('res.params',req.params);
            const result = Joi.validate({param:req['params'][name]},schema);
            if(result.error) {
                return res.status(400).json(result.error);
            } else {
                if(!req.value)
                    req.value = {};

                if(!req.value['params'])
                    req.value['params'] = {};

                req.value['params'][name] = result.value.param;
                next();
            }
        }
    },

    validateHeader: (schema,name) => {
        return (req,res,next) => {
            console.log('res.headers',req.headers);
            const result = Joi.validate({header:req['headers'][name]},schema);
            if(result.error) {
                return res.status(400).json(result.error);
            } else {
                if(!req.value)
                    req.value = {};

                if(!req.value['headers'])
                    req.value['headers'] = {};

                req.value['headers'][name] = result.value.header;
                next();
            }
        }
    },

    validateBody: (schema) => {
        return (req,res,next) => {
            const result = Joi.validate(req.body,schema);

            if (result.error) {
                return res.status(400).json(result.error);
            } else {
                if (!req.value)
                    req.value = {};

                if (!req.value['body'])
                    req.value['body'] = {};
                
                req.value['body'] = result.value;
                next();
            }
        }
    },

    schemas: {

        idSchema: Joi.object().keys({
            param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),

        userTokenSchema: Joi.object().keys({
            header: Joi.string().regex(/^[A-Za-z0-9]{32}$/).required()
        }),

        tokenSchema: Joi.object().keys({
            header: Joi.string().valid(keys.API_BEARER_AUTH).required()
        }),
        
        userSchema: Joi.object().keys({
            name: Joi.string().required(),
            surname: Joi.string().required(),
            email: Joi.string().email().required(),
            phone: Joi.string().required(),
            address: Joi.string().required(),
            city: Joi.string().required(),
            postCode: Joi.string().required(),
            country: Joi.string().required(),
            password: Joi.string().required(),
            orders: Joi.array().items(Joi.object().keys({
                fileURL: Joi.string().optional(),
                status: Joi.string().optional(),
                dateCreated: Joi.string().optional(),
                deliveryDate: Joi.string().optional(),
                delivery: Joi.string().optional(),
                price: Joi.string().optional(),
                type: Joi.string().optional(),
                description: Joi.string().optional()
            })).optional(),
            accountType: Joi.string().required()
        }),

        loginSchema: Joi.object().keys({
            email: Joi.string().required(),
            password: Joi.string().required()
        }),

        userOptionalSchema: Joi.object().keys({
            firstName: Joi.string(),
            lastName: Joi.string(),
            email: Joi.string().email()
        }),

        userOrderSchema: Joi.object().keys({
            fileURL: Joi.string().optional(),
            status: Joi.string().optional(),
            dateCreated: Joi.string().optional(),
            deliveryDate: Joi.string().optional(),
            delivery: Joi.string().optional(),
            price: Joi.string().optional(),
            type: Joi.string().optional(),
            description: Joi.string().optional(),
            veryficationId: Joi.string().required()
        }),

        orderSchema: Joi.object().keys({
            user: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            fileURL: Joi.string().optional(),
            status: Joi.string().optional(),
            dateCreated: Joi.string().optional(),
            deliveryDate: Joi.string().optional(),
            delivery: Joi.string().optional(),
            price: Joi.string().optional(),
            type: Joi.string().optional(),
            description: Joi.string().optional().required(),
            veryficationId: Joi.string().required()
        }),

        putOrderSchema: Joi.object().keys({
            user: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            fileURL: Joi.string().optional(),
            status: Joi.string().optional(),
            dateCreated: Joi.string().optional(),
            deliveryDate: Joi.string().optional(),
            delivery: Joi.string().optional(),
            price: Joi.string().optional(),
            type: Joi.string().optional(),
            description: Joi.string().optional()
        }),

        patchOrderSchema: Joi.object().keys({
            user: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            fileURL: Joi.string().optional(),
            status: Joi.string().optional(),
            dateCreated: Joi.string().optional(),
            deliveryDate: Joi.string().optional(),
            delivery: Joi.string().optional(),
            price: Joi.string().optional(),
            type: Joi.string().optional(),
            description: Joi.string().optional()
        })
    },

    hashPassword: async (password) => {
        try {
            const salt = await bcrypt.genSalt(10);
            return await bcrypt.hash(password,salt);
        } catch (error) {
            throw new Error('Hashing password failed',error);
        }
    },

    comparePasswords: async (password,hashedPassword) => {
        try {
            return await bcrypt.compare(password,hashedPassword);
        } catch (error) {
            throw new Error('Comparing failed',error);
        }
    },

    setPendingStatus: async (status) => {
        try {
            return await status;
        } catch (error) {
            throw new Error('Setting status failed',error);
        }
    },

    setVerifiedStatus: async (status) => {
        try {
            return await status;
        } catch (error) {
            throw new Error('Setting status failed',error);
        }
    }

}
