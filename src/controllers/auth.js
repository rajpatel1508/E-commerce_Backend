const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const shortid = require('shortid');

const generateJwtToken = (_id, role) => {
    return jwt.sign({ _id, role }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
};

//Function to signup user
exports.signup = (req, res) => {
    console.log('rererererr')
    User.findOne({ email: req.body.email })
        .exec(async (error, user) => {
            if (user) {
                return res.status(400).json({
                    message: 'User already registered'
                })
            }
            const {
                firstName,
                lastName,
                email,
                password
            } = req.body;
            console.log(req.body);
            const hash_password = await bcrypt.hash(password, 10);
            const _user = new User({
                firstName,
                lastName,
                email,
                hash_password,
                username: shortid.generate()
            });
            console.log(_user);
            _user.save((error, data) => {
                if (data) {
                    const token = generateJwtToken(user._id, user.role);
                    const { _id, firstName, lastName, email, role, fullname } = user;
                    return res.status(201).json({
                        token,
                        user: { _id, firstName, lastName, email, role, fullname },
                    });
                }
                if (error) {
                    return res.status(400).json({
                        message: 'something went wronggggggggggggg'
                    })
                }
            });
        });
}

//Function to signin user
exports.signin = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec(async (error, user) => {
            if (error) {
                return res.status(400).json({ error });
            }
            if (user) {
                const isPassword = await user.authenticate(req.body.password);

                if (isPassword && user.role === 'user') {
                    // const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    const token = generateJwtToken(user._id, user.role);
                    const { _id, firstName, lastName, email, role, fullname } = user;
                    return res.status(200).json({
                        token,
                        user: {
                            _id, firstName, lastName, email, role, fullname
                        }
                    });
                } else {
                    return res.status(400).json({
                        message: 'Something Went Wrong'
                    });
                }
            } else {
                return res.status(400).json({ message: "Something went wrong" });
            }
        });
};

