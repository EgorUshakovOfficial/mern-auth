const { getToken, COOKIE_OPTIONS, getRefreshToken, verifyUser} = require('./authenticate');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport'); 

module.exports = (app, User) => {
    // Register route 
    app.post('/register', (req, res) => {
        const { firstName,
            lastName,
            email,
            password } = req.body  
        // Hash password
        const saltRounds = 10
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) {
                res.statusCode = 500
                res.send(err)
            } else {
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) {
                        res.statusCode = 500
                        res.send(err)
                    } else {
                        // Create new user in the database 
                        let user = new User({
                            firstName,
                            lastName,
                            email,
                            password:hash
                        })

                        // Save user
                        user.save()
                            .then(user => {
                                // Generate refresh token and auth token 
                                const token = getToken({ _id: user._id })
                                const refreshToken = getRefreshToken({ _id: user._id })
                                user.refreshToken.push({ refreshToken })

                                // Set refresh token as http only cookie and send back auth token 
                                res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
                                res.send({ success: true, token })
                            })
                            .catch(err => {
                                res.statusCode = 500
                                res.send(err)
                            })
                    }
                })
            }
        })
    })

    // Invalid login route for incorrect email address or password
    app.get("/invalidCredentials", (req, res) => {
        res.statusCode = 401
        res.send("Unauthorized") 
    })

    // Login route
    app.post("/login", passport.authenticate("local", { failureRedirect: "/invalidCredentials" }), (req, res) => {
        const token = getToken({ _id: req.user._id })
        const refreshToken = getRefreshToken({ _id: req.user._id })
        User.findOne({ _id: req.user._id })
            .then(user => {
                user.refreshToken.push({ refreshToken })
                user.save((err, user) => {
                    if (err) {
                        res.statusCode = 500
                        res.send(err)
                    } else {
                        res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
                        // Used for checking if refreshToken has been set as http-only cookie  
                        COOKIE_OPTIONS.httpOnly = false
                        res.cookie("connect-sid", "", COOKIE_OPTIONS)
                        res.json({success: true, token})
                    }
                })
            })
            .catch(err => {
                res.statusCode = 500
                res.send(err)
            })
    })

    // Logout route 
    app.get('/logout', (req, res) => {
        const { signedCookies = {} } = req;
        const { refreshToken } = signedCookies
        if (refreshToken) {
            try {
                const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
                User.findOne({ _id: payload._id })
                    .then(user => {
                        const tokenIndex = user.refreshToken.findIndex(
                            item => item.refreshToken === refreshToken
                        )
                        if (tokenIndex !== -1) {
                            user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove()
                        }
                        user.save((err, user) => {
                            if (err) {
                                res.statusCode = 500
                                res.send(err)
                            } else {
                                res.clearCookie("refreshToken")
                                res.clearCookie("connect-sid")
                                res.json({ success: true })
                            }
                        })
                    })
            } catch (err) {
                res.statusCode = 500
                res.send(err)
            }
        } else {
            res.clearCookie("refreshToken", COOKIE_OPTIONS)
            res.send("User session has expired. Please log in")
        }
    })

    // Refresh token route 
    app.post("/refreshToken", (req, res, next) => {
        const { signedCookies = {} } = req
        const { refreshToken } = signedCookies

        if (refreshToken) {
            try {
                const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
                const userId = payload._id
                User.findOne({ _id: userId })
                    .then(user => {
                        if (user) {
                            // Find the refresh token against the user record in database 
                            const tokenIndex = user.refreshToken.findIndex(
                                item => item.refreshToken === refreshToken
                            )
                            if (tokenIndex === -1) {
                                res.statusCode = 401
                                res.send("Unauthorized")
                            } else {
                                const token = getToken({ _id: userId })
                                // If the refresh token exists in array, replace it with a new one 
                                const newRefreshToken = getRefreshToken({ _id: userId })
                                user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken }
                                user.save((err, user) => {
                                    if (err) {
                                        res.statusCode = 500
                                        res.send(err)
                                    } else {
                                        res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS)
                                        // Used for checking if refreshToken has been set as http-only cookie  
                                        COOKIE_OPTIONS.httpOnly = false
                                        res.cookie("connect-sid", "", COOKIE_OPTIONS)
                                        res.json({ success: true, token })
                                    }
                                })
                            }
                        } else {
                            res.statusCode = 401
                            res.send("Unauthorized")
                        }
                    })
            } catch (err) {
                res.statusCode = 401
                res.send("Unauthorized")
            }
        } else {
            res.statusCode = 401
            res.send("Unauthorized")
        }
    })

    // User route 
    app.get('/user', verifyUser, (req, res) => {
        res.json({user: req.user})
    })
}
