const { requiresignin, userMiddleware } = require("../common-middleware");
const { addOrder, getOrders, getOrder } = require("../controllers/order");
const router = require("express").Router();

router.post("/addOrder", requiresignin, userMiddleware, addOrder);
router.get("/getOrders", requiresignin, userMiddleware, getOrders);
router.post("/getOrder", requiresignin, userMiddleware, getOrder);

module.exports = router;