const {verify} = require("jsonwebtoken");

const validateToken = (req, res, next) => {
    //grab the tokn from the front end to validate
    const accessToken = req.header("accessToken");

    if(!accessToken){
        return res.json({error: "User not authenticated"});
    }

    try{
        const validToken = verify(accessToken, "JWTMYsecretResultsManagement");
        // req.user = validToken; // Store the decoded token in the request object for further use
        if(validToken){
            req.user = validToken; // Store the decoded token in the request object for further use
            return next();
        }
    } catch(err){
        return res.json({error: err});
    }
};

module.exports = {validateToken};