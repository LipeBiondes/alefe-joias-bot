const validateParamsUserId = async (req, res, next) => {
  const { userId } = req.params;

  if (!userId || userId === "" || userId.length === 0) {
    return res.status(400).json({ message: "id is required" });
  }

  next();
};

const validateParamsOrderId = async (req, res, next) => {
  const { orderId } = req.params;

  if (!orderId || orderId === "" || orderId.length === 0) {
    return res.status(400).json({ message: "id is required" });
  }

  next();
};

module.exports = { validateParamsUserId, validateParamsOrderId };
