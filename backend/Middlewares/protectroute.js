const jwt=require("jsonwebtoken");

const User=require("../Models/user.Model");

const protectRoute = async (req, res, next) => {
	try {
		const token = req.cookies.jwt;

		if (!token) {
			return res.status(401).json({ error: "Unauthorized - No Token Provided" });
		}

		const verify = jwt.verify(token, process.env.JWT_SECRET);

		if (!verify) {
			return res.status(401).json({ error: "Unauthorized - Invalid Token" });
		}

		const user = await User.findById(verify.userId).select("-password");

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		req.user = user;

		next();
	} catch (error) {
		console.log("Error in protectRoute middleware: ", error.message);

		res.status(500).json({ error: "Internal server error" });
	}
};

module.exports = protectRoute;
