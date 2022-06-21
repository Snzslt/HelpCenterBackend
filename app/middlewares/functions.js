const crypto = require("crypto");
const moment = require('moment-timezone');


const generatRandomNumber = (end) => {
    return Math.floor(Math.random() * end)
}
const sqlDatetime = () => {
    return new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000).toJSON().slice(0, 19).replace('T', ' ');
}

const IsValidPhoneNumber = (value) => {
    return /(0|\+98)?([ ]|,|-|[()]){0,2}9[0-9]([ ]|,|-|[()]){0,2}(?:[0-9]([ ]|,|-|[()]){0,2}){8}/g.test(
        value
    );
}
const IsValidEmail = (value) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(
        value
    );
}
const checkPassword = (value) => {
    return /^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*).{6,}/g.test(value)
}

const IsValidFullName = (value) => {
    if (value.length < 40) {
        return true;
    }
    return false;
}

const validatonRejesterData = (data) => {
    let errorData = {};
    let notValid = false;

    if (data.fullName === "" && data.fullName.length <= 2) {
        errorData.fullName = "The first and last name fields cannot be empty";
        notValid = true;
    }
    let email = data.email;
    if (!IsValidEmail(email)) {
        errorData.email = "The entered email is not valid";
        notValid = true;
    }
    if (data.email == "") {
        errorData.email = "The email field cannot be empty";
        notValid = true;
    }
    if (data.password.length >= 6) {
        if (!checkPassword(data.password)) {
            errorData.password = "The password entered is incorrect";
            notValid = true;
        }
    } else {
        errorData.password = " Password is less than 6 characters";
    }
    if (data.password == "") {
        errorData.password = "The password field could not be empty";
        notValid = true;
    }
    if (data.repPassword.length >= 6) {
        if (!checkPassword(data.repPassword)) {
            if (data.repPassword !== data.password) {
                errorData.repPassword = "repeat password is not the same as password";
                notValid = true;
            }
        }

    } else {
        errorData.repPassword = "Repeat password is less than 6 characters";
        notValid = true;
    }
    if (data.repPassword == "") {
        errorData.repPassword = "Repeat password can not be empty";
        notValid = true;
    }

    if (data.gender.length > 10 && data.gender.length <= 0) {
        errorData.repPassword = "Repeat gender can not be empty";
        notValid = true;
    }
    if (data.gender.university_id > 15 && data.gender.length <= 0) {
        errorData.repPassword = "Repeat university id can not be empty";
        notValid = true;
    }

    return {
        errorMessage: errorData,
        isValid: notValid,
    }
}
const validatonLoginData = (data) => {
    console.log("data ->", data)
    let errorData = {};
    let notValid = false;
    if (Object.keys(data).length == 0) {
        return {
            errorMessage: "Error in submitted data",
            isValid: true,
        }
    }
    let email = data.email;
    if (!IsValidEmail(email)) {
        errorData.email = "The entered email is not valid";
        notValid = true;
    }
    if (data.email == "") {
        errorData.email = "The email field cannot be empty";
        notValid = true;
    }
    if (data.password.length >= 6) {
        if (!checkPassword(data.password)) {
            errorData.password = "The password entered is incorrect";
            notValid = true;
        }
    } else {
        errorData.password = " Password is less than 6 characters";
    }
    if (data.password == "") {
        errorData.password = "The password field could not be empty";
        notValid = true;
    }

    return {
        errorMessage: errorData,
        isValid: notValid,
    }

}

const validatonAuthData = (data) => {
    let errorData = {};
    let notValid = false;
    switch (true) {
        case "first_name" in data:
            if (data.fullName === "" && data.fullName.length <= 2) {
                errorData.fullName = "The first name fields cannot be empty";
                notValid = true;
            }
            break;
        case "last_name" in data:
            if (data.fullName === "" && data.fullName.length <= 2) {
                errorData.fullName = "The last name fields cannot be empty";
                notValid = true;
            }
            break;
        case "gender" in data:
            if (data.gender === "" && data.gender.length <= 2) {
                errorData.gender = "The gender fields cannot be empty";
                notValid = true;
            }
            break;
        case "university_id" in data:
            if (data.university_id === "" && data.university_id.length <= 2 && data.university_id.length <= 15) {
                errorData.gender = "The university Id and last name fields cannot be empty";
                notValid = true;
            }
            break;
        case "email" in data:
            let email = data.email;
            if (!IsValidEmail(email)) {
                errorData.email = "The entered email is not valid";
                notValid = true;
            }
            if (data.email == "") {
                errorData.email = "The email field cannot be empty";
                notValid = true;
            }
            break;
        case "password" in data:
            if (data.password.length >= 6) {
                if (!checkPassword(data.password)) {
                    errorData.password = "The password entered is incorrect";
                    notValid = true;
                }
            } else {
                errorData.password = " Password is less than 6 characters";
            }
            if (data.password == "") {
                errorData.password = "The password field could not be empty";
                notValid = true;
            }
            break;
        case "repPassword" in data:
            if (data.repPassword.length >= 6) {
                if (!checkPassword(data.repPassword)) {
                    if (data.repPassword !== data.password) {
                        errorData.repPassword = "repeat password is not the same as password";
                        notValid = true;
                    }
                }

            } else {
                errorData.repPassword = "Repeat password is less than 6 characters";
                notValid = true;
            }
            if (data.repPassword == "") {
                errorData.repPassword = "Repeat password can not be empty";
                notValid = true;
            }
            break;
            // case "" in data:

            // break;
    }
    return {
        errorMessage: errorData,
        isValid: notValid,
    }

};




exports.generatRandomNumber = generatRandomNumber;
exports.sqlDatetime = sqlDatetime;
exports.checkPassword = checkPassword;
exports.IsValidPhoneNumber = IsValidPhoneNumber;
exports.IsValidFullName = IsValidFullName;
exports.validatonRejesterData = validatonRejesterData;
exports.validatonLoginData = validatonLoginData;
exports.validatonAuthData = validatonAuthData;