
const jwt = require("jsonwebtoken");

const genToken = (userId, res) => {
	try {
		const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
			expiresIn: "15d",
		});

		res.cookie("jwt", token, {
			maxAge: 15 * 24 * 60 * 60 * 1000, // MS
			httpOnly: true, // prevent XSS attacks cross-site scripting attacks
			sameSite: "strict", // CSRF attacks cross-site request forgery attacks
			secure: process.env.NODE_ENV !== "development",
		});
	} catch (error) {
		console.error("Error generating token or setting cookie:", error);
		res.status(500).send("Internal Server Error");
	}
};

module.exports = genToken;
