const authModel = require('./model');
const jwt_decode = require('jwt-decode');
const {
    validatonRejesterData,
    validatonLoginData,
    validatonAuthData,
} = require("../../middlewares/functions");
const tokenService = require('./token');

// register user module
exports.createUser = async(req, res) => {
    let {
        email,
        password,
        replacePassword,
        userType
    } = req.body;
    console.log("req.body =>", req.body);

    let registerData = {};
    registerData.email = email;
    registerData.password = password;
    registerData.repPassword = replacePassword;
    registerData.type = userType,
        console.log(registerData);
    let userData = Object.values(registerData);
    if (userData.indexOf(undefined) > -1) {
        return res.status(422).send({
            success: false,
            message: "invalid data",
        });
    }

    let validatData = validatonAuthData(registerData);

    if (validatData.isValid) {
        return res.status(200).send({
            success: false,
            message: validatData.errorMessage,
        })
    } else {
        try {
            const userResult = await authModel.saveUserData(registerData);

            if (userResult) {
                return res.status(200).send({
                    success: true,
                    message: "New User Created Successfully",
                })
            } else {
                return res.status(409).send({
                    success: false,
                    message: "This email is already registered",
                })
            }
        } catch (error) {
            return res.status(422).send({
                success: false,
                message: "An error occurred while creating the new user",
                error
            })
        }
    }
}

// login user module
exports.login = async(req, res) => {

    let {
        email,
        password,
    } = req.body;
    let loginData = {};
    loginData.email = email;
    loginData.password = password;

    let userData = Object.values(loginData);
    if (userData.indexOf(undefined) > -1) {
        return res.status(200).send({
            success: false,
            message: "invalid data",
        })
    }


    let validatData = validatonAuthData(loginData);
    if (validatData.isValid) {
        return res.status(200).send({
            success: false,
            message: validatData.errorMessage,
        })
    } else {
        console.log("email =>", loginData)
        try {
            const userResult = await authModel.findUserByCredential(loginData);
            console.log("userResult =>", userResult)
            if (!userResult) {
                return res.status(200).send({
                    success: false,
                    message: "The password or email entered is incorrect"
                })
            }
            console.log("userResult =>", userResult)
            const token = tokenService.generate({
                uid: userResult.id,
                email: userResult.email,
                role: userResult.role,
            }, "2h")
            const tokenUpdate = await authModel.updateTokenUser(userResult.email, token);
            // const saveToken = await authModel.saveTokenUser(token, data.email)
            return res.send({
                success: true,
                message: "You have successfully logged in",
                email: userResult.email,
                id: userResult.id,
                role: userResult.role,
                first_name: userResult.first_name,
                last_name: userResult.last_name,
                last_login: userResult.last_login,
                activated: userResult.is_active,
                profile_status: userResult.profile_status,
                gender: userResult.gender,
                university_id: userResult.university_id,
                token
            });
        } catch (error) {
            return res.status(422).send({
                success: false,
                message: "An error occurred while login",
                error
            })
        }

    }

}

// logout user module
exports.logout = async(req, res) => {
    const decoded = jwt_decode(req.token);

    const tokenUpdate = await authModel.updateTokenUser(decoded.email, "");
    console.log("tokenUpdate", tokenUpdate)
    return res.status(200).send({
        success: true,
        message: "logout route",
    })

}
exports.checkIsUserLogin = async(req, res) => {
    const decoded = jwt_decode(req.token);

    const userResult = await authModel.findUserByEmail(decoded.email, "");
    console.log("tokenUpdate", userResult)
    return res.status(200).send({
        success: true,
        message: "You have successfully logged in",
        email: userResult.email,
        id: userResult.id,
        role: userResult.role,
        first_name: userResult.first_name,
        last_name: userResult.last_name,
        last_login: userResult.last_login,
        activated: userResult.is_active,
        profile_status: userResult.profile_status,
        gender: userResult.gender,
        university_id: userResult.university_id,
        token: req.token,
    })
}

// forgot Password user module
exports.forgotPassword = async(req, res) => {
        let {
            email,
        } = req.body;
        let forgetPasswordData = {};
        forgetPasswordData.email = email;
        let userData = Object.values(forgetPasswordData);
        if (userData.indexOf(undefined) > -1) {
            return res.status(200).send({
                success: false,
                message: "invalid data",
            })
        }


        let validatData = validatonAuthData(forgetPasswordData);

        if (validatData.isValid) {
            return res.status(200).send({
                success: false,
                message: validatData.errorMessage,
            })
        } else {
            try {
                const userResult = await authModel.findUserByEmail(forgetPasswordData.email);
                console.log(userResult)
                if (!userResult) {
                    return res.status(200).send({
                        success: false,
                        message: "The user was not found"
                    })
                }
                const token = tokenService.generate({
                    uid: userResult.id,
                    email: userResult.email,
                    role: userResult.role,
                }, 120)
                const saveToken = await authModel.updateTokenUser(userResult.email, token);

                return res.send({
                    success: true,
                    message: "The desired user was found",
                    token
                });
            } catch (error) {
                return res.status(422).send({
                    success: false,
                    message: "An error occurred while login",
                    error
                })
            }

        }


    }
    // change Password user module
exports.changePassword = async(req, res) => {
    let {
        email,
        password,
        replacePassword,
    } = req.body;
    let changePasswordData = {};
    changePasswordData.email = email;
    changePasswordData.password = password;
    changePasswordData.repPassword = replacePassword;
    let userData = Object.values(changePasswordData);
    if (userData.indexOf(undefined) > -1) {
        return res.status(200).send({
            success: false,
            message: "invalid data",
        })
    }


    let validatData = validatonAuthData(changePasswordData);
    if (validatData.isValid) {
        return res.status(200).send({
            success: false,
            message: validatData.errorMessage,
        })
    } else {
        try {
            const userResult = await authModel.changeUserPssword(changePasswordData.email, changePasswordData.password);
            console.log("2 userResult =>", userResult)
            if (!userResult) {
                return res.status(200).send({
                    success: false,
                    message: "The user was not found"
                })
            }

            const saveToken = await authModel.updateTokenUser(userResult.email, "");

            return res.send({
                success: true,
                message: "Your password has been successfully changed",
            });
        } catch (error) {
            return res.status(422).send({
                success: false,
                message: "An error occurred while login",
                error
            })
        }

    }


}