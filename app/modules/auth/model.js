const connection = require('../../database/connections/connection');
const { generatRandomNumber, sqlDatetime } = require('../../middlewares/functions');
const md5 = require('md5');
let db = connection();
exports.saveUserData = async(data) => {
    db = await connection();
    const alldata = {
        email: data.email,
        password: md5(data.password),
        role: data.type,
        is_active: "not_active",
        profile_status: "not_completed",
        university_id: "",
        registerData: first_name = "",
        registerData: last_name = "",
        registerData: gender = "",
        registerData: gender = "",
        university_id: gender = "",
        create_at: moment().format('YYYY-MM-DD h:mm:ss'),
    }
    let [results, fields] = await db.query("SELECT * FROM `users` WHERE email=? LIMIT 1", [data.email]);
    isValidNumber = results.length === 0;

    if (isValidNumber) {
        let [results, fields] = await db.query("INSERT INTO `users` SET ?", alldata);
        if (results.affectedRows === 1) {
            return 1;
        }
    } else {
        return 0;
    }

}
exports.findUserByCredential = async(data) => {
    const db = await connection();
    let [results_one, fields] = await db.query("SELECT * FROM `users` WHERE email=? AND password=? LIMIT 1", [data.email, md5(data.password)]);
    console.log("results_one =>", results_one)
    if (results_one.length > 0) {
        delete results_one[0].password;
        return results_one[0];
    }
    return false;
}
exports.findUserByEmail = async(email) => {
    const db = await connection();
    let [results_one, fields] = await db.query("SELECT * FROM `users` WHERE email=? LIMIT 1", [email]);
    console.log("results_one =>", results_one)
    if (results_one.length > 0) {
        delete results_one[0].password;
        return results_one[0];
    }
    return false;
}
exports.changeUserPssword = async(email, newPassword) => {
    const db = await connection();
    let [results, fields] = await db.query("UPDATE `users` SET password=? WHERE email=? LIMIT 1", [md5(newPassword), email]);
    console.log("results =>", results)
    if (results.affectedRows > 0) {
        return true
    } else {
        return false
    }
}
exports.updateTokenUser = async(email, token) => {
    const db = await connection();
    let [results, fields] = await db.query("UPDATE `users` SET `token`=? WHERE email=? LIMIT 1", [token, email]);
    if (results.affectedRows > 0) {
        return true
    } else {
        return false
    }
}