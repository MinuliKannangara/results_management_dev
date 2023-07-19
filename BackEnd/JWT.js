const { sign, verify } = require('jsonwebtoken');


const createTokens = (user) => {
  const accessToken = sign({ username: user.username }, "jwtSecrettoSecure", {});
  return accessToken;
};

const validateToken = (req, res, next) => {
  const accessToken = req.cookies["access-token"];

  if (!accessToken) {
    return res.status(401).json({ error: "User not authenticated" });
  }
  try{
    const validToken = verify(accessToken, "jwtSecrettoSecure" )
    req.user = validToken;
    if(validToken){
      return next();
    }
  }catch(err){
    return res.json({error: err});
  }

  // verify(accessToken, "jwtSecrettoSecure", (err, userID) => {
  //   if (err) {
  //     return res.status(403).json({ error: err });
  //   }
  //   req.userID = userID;
  //   return next();
  // });
};

module.exports = { createTokens, validateToken };


//create the middleware
// const validateToken = (req, res, next) => {
//     const accessToken = req.cookies["access-token"];

//     if(!accessToken){
//         return res.status(400).json({error: "User not authenticated"});
//     };

//     //check the tocken is valid or not
//     try{
//         const validToken = verify(accessToken, "jwtSecrettoSecure" )
//             const { username } = validToken;
//             if(validToken){
//                 req.authenticated = true;
//                 req.user = {
//                     username: username,
                   
//                 }
//                 return next();
//             }else{
//                 return res.status(400).json({error: err});
//             }

       
        

//     }catch(err){
//             return res.status(400).json({error: err});
//     }

// }


//const jwt = require('jsonwebtoken');
// const jwt = require("jsonwebtoken");

// const validateToken = (req, res, next) => {
//   const accessToken = req.cookies["access-token"];

//   if (!accessToken) {
//     return res.status(401).json({ error: "User not authenticated" });
//   }

//   try {
//     const decodedToken = jwt.verify(accessToken, "jwtSecrettoSecure");

//     req.authenticated = true;
//     req.user = {
//       username: decodedToken.username,
//       //userID: decodedToken.userID
//     };

//     return next();
//   } catch (err) {
//     return res.status(401).json({ error: "Invalid access token" });
//   }
// };

// module.exports = validateToken;

// const validateToken = (req, res, next) => {
//   const accessToken = req.cookies["access-token"];

//   if (!accessToken) {
//     return res.status(400).json({ error: "User not authenticated" });
//   }

//   try {
//     const decodedToken = jwt.verify(accessToken, "jwtSecrettoSecure");

//     req.authenticated = true;
//     req.user = {
//       username: decodedToken.username,
//       userID: decodedToken.userID
//     };

//     return next();
//   } catch (err) {
//     return res.status(400).json({ error: err.message });
//   }
// }

//module.exports = validateToken;

// const validateToken = (req, res, next) => {
//     const accessToken = req.cookies["access-token"];
//     if (!accessToken) {
//       return res.status(401).json({ error: "Access token not found" });
//     }
  
//     try {
//       const decoded = verify(accessToken, "jwtSecrettoSecure");
//       req.user = decoded.user;
//       next();
//     } catch (error) {
//       return res.status(403).json({ error: "Invalid token" });
//     }
//   };

module.exports = {createTokens, validateToken};