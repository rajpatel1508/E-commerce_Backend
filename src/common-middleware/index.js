const jwt = require('jsonwebtoken');
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');

//Function to create storage for files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + '-' + file.originalname);
    }
})
//Assigning storage
exports.upload = multer({ storage: storage });

//Middleware Function for verification
exports.requiresignin = (req, res, next) => {
    if (req.headers.authorization) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const user = jwt.verify(token, process.env.JWT_SECRET);
            req.user = user;
        } catch {
            res.redirect('admin/signout');
        }
    }
    else {
        res.status(400).json({ message: 'Authorization required' });
    }
    next();
}

//Middleware to check if user role is 'user'
exports.userMiddleware = (req, res, next) => {
    if (req.user.role !== 'user') {
        return res.status(400).json({ message: 'User Access Denied' });
    }
    next();
}

//Middleware to check if user role is 'admin'
exports.adminMiddleware = (req, res, next) => {
    // console.log(req.headers);
    if (req.user.role !== 'admin') {
        return res.status(400).json({ message: 'Admin Access Denied' });
    }
    next();
}