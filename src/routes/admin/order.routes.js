const express = require("express");
const { requiresignin, adminMiddleware } = require("../../common-middleware");
const {
    updateOrder,
    getCustomerOrders,
} = require("../../controllers/admin/order.admin");
const router = express.Router();

router.post(`/order/update`, requiresignin, adminMiddleware, updateOrder);
router.post(
    `/order/getCustomerOrders`,
    requiresignin,
    adminMiddleware,
    getCustomerOrders
);

module.exports = router;