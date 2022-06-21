const userModel = require('./model');
const jwt_decode = require('jwt-decode');
const {
    validatonRejesterData,
    validatonLoginData,
    validatonAuthData,
} = require("../../middlewares/functions");
const tokenService = require('./token');

// register user module
exports.completeUserProfile = async(req, res) => {
    let {
        id,
        email,
        firstName,
        lastName,
        gender,
        universityId
    } = req.body;

    let userData = {};
    userData.email = email;
    userData.first_name = firstName;
    userData.last_name = lastName;
    userData.profile_status = "completed";
    userData.gender = gender;
    userData.university_id = universityId;

    let userDataValid = Object.values(userData);
    if (userDataValid.indexOf(undefined) > -1) {
        return res.status(422).send({
            success: false,
            message: "invalid data",
        });
    }

    let validatData = validatonAuthData(userData);

    if (validatData.isValid) {
        return res.status(200).send({
            success: false,
            message: validatData.errorMessage,
        })
    } else {
        try {
            const userResult = await userModel.updateUserById(userData);
            const newUserData = await userModel.findUserByEmail(userData.email);
            if (userResult) {
                return res.status(200).send({
                    success: true,
                    message: "update User profile Successfully",
                    profile_status: newUserData.profile_status,
                    is_active: newUserData.is_active,
                    first_name: newUserData.first_name,
                    last_name: newUserData.last_name,
                    university_id: newUserData.university_id,
                    gender: newUserData.gender,
                    profile_status: newUserData.profile_status,
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


// get all user module
exports.getAllUserList = async(req, res) => {
    const decoded = jwt_decode(req.token);
    const userList = await userModel.getUserListByAdminEmail(decoded.email, req.token);
    if (!userList) {
        return res.status(200).send({
            success: false,
            message: "user not fond",
        })
    }
    return res.status(200).send({
        success: true,
        message: "get user list success",
        users: userList,
    })

}

exports.userActivity = async(req, res) => {
    let {
        id,
        email,
    } = req.body;
    const decoded = jwt_decode(req.token);
    const userList = await userModel.activeUserListById(decoded.email, req.token, id, email);
    if (!userList) {
        return res.status(200).send({
            success: false,
            message: "user not fond",
        })
    }
    return res.status(200).send({
        success: true,
        message: "active user success",
        users: userList,
    })

}

exports.deleteUser = async(req, res) => {
    let {
        id,
        email,
    } = req.body;
    const decoded = jwt_decode(req.token);
    const userList = await userModel.deleteUserListById(decoded.email, req.token, id, email);

    if (!userList) {
        return res.status(200).send({
            success: false,
            message: "user not fond",
        })
    }
    return res.status(200).send({
        success: true,
        message: "delete user success",
        users: userList,
    })

}


exports.addStudentNewRequest = async(req, res) => {
    let {
        studentId,
        programTime,
        studentName,
        studentProgram,
        studentLanguageId,
        comment,
        availabilities,
    } = req.body;
    let requestData = {
        student_id: studentId,
        student_name: studentName,
        student_program: studentProgram,
        student_language_id: studentLanguageId,
        comment: comment,
        availabilities: availabilities,
        request_status: "Unknown",
        program_time: programTime,
    };
    try {
        const requestSave = await userModel.saveStudentRequest(requestData);
        if (!requestSave) {
            return res.status(200).send({
                success: false,
                message: "Request encountered a problem",
            })
        }
        return res.status(200).send({
            success: true,
            message: "Your request has been registered successfully",
        })
    } catch (error) {
        return res.status(200).send({
            success: false,
            message: "Your request has not been submitted",
        })
    }

}
exports.getAllLanguagesList = async(req, res) => {
    const decoded = jwt_decode(req.token);
    const languagesList = await userModel.getAllLanguages(decoded.email, req.token);
    if (!languagesList) {
        return res.status(200).send({
            success: false,
            message: "languge not find",
        })
    }
    return res.status(200).send({
        success: true,
        message: "fetch Languages List success",
        languages: languagesList,

    })

}
exports.getAllStudentProgtamList = async(req, res) => {
    let {
        studentId,
    } = req.body;
    const requestProgramList = await userModel.getAllProgramListById(studentId);
    if (!requestProgramList) {
        return res.status(200).send({
            success: false,
            message: "requst program list not find",
        })
    }
    return res.status(200).send({
        success: true,
        message: "fetch requst program  List success",
        requestProgramList: requestProgramList,

    })

}

exports.getTeacherlanguageRequestById = async(req, res) => {
    let {
        teacherId,
    } = req.body;
    const requestProgramList = await userModel.fetchTeacherlanguageRequest(teacherId);
    if (!requestProgramList) {
        return res.status(200).send({
            success: false,
            message: "requst program list not find",
        })
    }
    return res.status(200).send({
        success: true,
        message: "fetch requst program  List success",
        ...requestProgramList,

    })

}
exports.saveTeacherlanguageRequestList = async(req, res) => {
    let {
        requestId,
        teacherId,
        teacherName,
        languageListId,
    } = req.body;
    let languageRequesData = {
        request_id: requestId != "" ? requestId : 0,
        teacher_id: teacherId,
        teacher_name: teacherName,
        language_list_id: languageListId
    }
    const requestProgramList = await userModel.saveTeacherlanguageRequest(languageRequesData);
    if (!requestProgramList) {
        return res.status(200).send({
            success: false,
            message: "requst program list not find",
        })
    }
    return res.status(200).send({
        success: true,
        message: "fetch requst program  List success",
        requestProgramList: requestProgramList,

    })

}

exports.getTeacherRequestBylanguageId = async(req, res) => {
    let {
        languageListId,
    } = req.body;
    const requestProgramList = await userModel.fetchTeacherProgramBylanguageId(languageListId);
    if (!requestProgramList) {
        return res.status(200).send({
            success: false,
            message: "requst program list not find",
        })
    }
    return res.status(200).send({
        success: true,
        message: "fetch requst program  List success",
        programList: requestProgramList,

    })

}
exports.changeProgramStatus = async(req, res) => {
    let {
        id,
        status,
        teacherId,
        teacherName,
    } = req.body;
    let programData = {
        request_status: status,
        accept_teacher_id: teacherId,
        teacher_name: teacherName,
    }
    const userList = await userModel.changeProgramById(programData, id);
    if (!userList) {
        return res.status(200).send({
            success: false,
            message: "program not fond",
        })
    }
    return res.status(200).send({
        success: true,
        message: "program status update is success",
        users: userList,
    })

}