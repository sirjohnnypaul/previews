const Device = require('../models/device');

module.exports = {
    index: async (req, res, next) => {
        const devices = await Device.find({});
        res.status(200).json(devices);
    },

    newDevice: async (req, res, next) => {
        const newDevice = req.value.body;
        const device = new Device(newDevice);
        await device.save();
        res.status(200).json(device);
    },

    getDeviceById: async (req, res, next) => {
        const device = await Device.findById(req.value.params.deviceId);
        res.status(200).json(device);
    },

    addDeviceTask: async (req, res, next) => {
        const device = await Device.findById(req.value.params.deviceId);
        const order = await req.body.order;
        await device.orders.push(order);
        res.status(200).json(device);
    },

    replaceDevice: async (req, res, next) => {
        const {deviceId} = req.value.params;
        const newDevice = req.value.body;
        const result = await Device.findByIdAndUpdate(deviceId,newDevice);
        res.status(200).json({success:true});
    },

    updateDevice: async (req, res, next) => {
        const {deviceId} = req.value.params;
        const newDevice = req.value.body;
        const result = await Device.findByIdAndUpdate(deviceId,newDevice);
        res.status(200).json({success:true});
    },

    deleteDevice: async (req, res, next) => {
        const {deviceId} = req.value.params;
        const device = await Device.findById(orderId);
        if(!device) {
            return res.status(404).json({error:'Device does not exist'});
        }
        await device.remove();
        res.status(200).json({success: true});
    }
}