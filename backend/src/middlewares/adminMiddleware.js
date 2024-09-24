exports.isAdmin = (req, res, next) => {
  console.log("req.user.role",req.user)
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied." });
  }
  next();
};
