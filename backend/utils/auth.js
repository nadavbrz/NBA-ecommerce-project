const { compare } = require("bcrypt")
const { sign, verify } = require("jsonwebtoken")
const { NotAuthError } = require('./error');
const User = require('../schemas/userModal');





const KEY = process.env.KEY

function createJSONToken (email){
    return sign({email} , KEY , {expiresIn : "1d"})
}

function validateJSONToken(token){
    return verify(token,KEY)
}

function isValidPassword(password, storedPassword){
    return compare(password, storedPassword)
}
async function checkAuthMiddleware(req,res,next){
    if (!req.headers.authorization) {
        console.log('NOT AUTH. AUTH HEADER MISSING!.');
        return next(new NotAuthError('Not authenticated.'));
    }
   
    const authFragments = req.headers.authorization.split(' ');

  
    if (authFragments.length !== 2) {
        console.log('NOT AUTH. AUTH HEADER INVALID.');
        return next(new NotAuthError('Not authenticated.'));
    }

    const authToken = authFragments[1];
    try {
        const validatedToken = validateJSONToken(authToken);
        


        req.token = validatedToken;

        const user = await User.findOne({ email: validatedToken.email });
        if (!user) {
            console.log('NOT AUTH. USER NOT FOUND.');
            return next(new NotAuthError('Not authenticated.'));
        }

        req.user = user;

        req.isAdmin = user.role === 'admin';

    } catch (err) {

        console.log('NOT AUTH. TOKEN INVALID.');
        return next(new NotAuthError('Not authenticated.'));
    }
    next();
}

exports.createJSONToken = createJSONToken;
exports.validateJSONToken = validateJSONToken;
exports.isValidPassword = isValidPassword;
exports.checkAuth = checkAuthMiddleware;