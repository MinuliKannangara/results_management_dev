// const { sign, verify } = require('jsonwebtoken');

// const createTokens = (user) => {
//   const accessToken = sign({ username: user.username }, "jwtSecrettoSecure", {});
//   return accessToken;
// };

// const validateToken = (req, res, next) => {
//   const accessToken = req.cookies["access-token"];

//   if (!accessToken) {
//     return res.status(401).json({ error: "User not authenticated" });
//   }

//   try {
//     const validToken = verify(accessToken, "jwtSecrettoSecure");
//     req.user = validToken; // Store the decoded token in the request object for further use
//     return next(); // Proceed to the next middleware/route handler
//   } catch (err) {
//     return res.status(401).json({ error: "Invalid token" });
//   }
// };

// module.exports = { createTokens, validateToken };
