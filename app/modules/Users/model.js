const connection = require('../../database/connections/connection');
const { generatRandomNumber, sqlDatetime } = require('../../middlewares/functions');
const md5 = require('md5');
let db = connection();
exports.getUserListByAdminEmail = async(email, token) => {
    db = await connection();
    let [results, fields] = await db.query("SELECT * FROM `users` WHERE email=? And role='admin' And token=? LIMIT 1", [email, token]);
    isValidNumber = results.length === 0;

    if (isValidNumber) {
        let [results, fields] = await db.query("SELECT `id` ,`email`,`role`,`is_active`,`profile_status`,`first_name`,`last_name`,`gender`,`university_id` FROM `users` WHERE role !='admin' ", []);;
        if (results.length) {
            return results;
        }
    } else {
        return 0;
    }

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
exports.updateUserById = async(data) => {
    let userUpdateDate = {};
    userUpdateDate.first_name = data.first_name;
    userUpdateDate.last_name = data.last_name;
    userUpdateDate.profile_status = "completed";
    userUpdateDate.gender = data.gender;
    userUpdateDate.university_id = data.university_id;
    const db = await connection();
    let [results, fields] = await db.query("UPDATE `users` SET ? WHERE email=? LIMIT 1", [userUpdateDate, data.email]);
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


exports.activeUserListById = async(adminEmail, token, id, email) => {
    const db = await connection();
    let [results_one, fields] = await db.query("SELECT * FROM `users` WHERE email=? And role='admin' And token=? LIMIT 1", [adminEmail, token]);
    isValidNumber = results_one.length === 0;

    if (isValidNumber) {
        let [results, fields] = await db.query("UPDATE `users` SET `is_active`='activated' WHERE id=? AND email=? LIMIT 1", [id, email]);
        if (results.affectedRows > 0) {
            return true
        } else {
            return false
        }
    }
}

exports.deleteUserListById = async(adminEmail, token, id, email) => {
    const db = await connection();
    let [results_one, fields] = await db.query("SELECT * FROM `users` WHERE email=? And role='admin' And token=? LIMIT 1", [adminEmail, token]);
    isValidNumber = results_one.length === 0;

    if (isValidNumber) {
        let [results, fields] = await db.query("DELETE FROM `users` WHERE `id`=? AND`email`=?", [id, email]);
        if (results.affectedRows > 0) {
            return true
        } else {
            return false
        }
    }
}

exports.saveStudentRequest = async(data) => {
    db = await connection();

    let [results, fields] = await db.query("INSERT INTO `program_request` SET ?", [data]);
    if (results.affectedRows === 1) {
        return true;
    }
    return false

}
exports.getAllLanguages = async() => {
    const db = await connection();
    let [results_one, fields] = await db.query("SELECT * FROM `languages`", []);
    if (results_one.length > 0) {
        return results_one;
    }
    return false;
}

exports.getAllProgramListById = async(id) => {
    const db = await connection();
    let [results_one, fields] = await db.query("SELECT * FROM `program_request` WHERE `student_id`=?", [id]);
    if (results_one.length > 0) {
        return results_one;
    }
    return false;
}
exports.fetchTeacherlanguageRequest = async(id) => {
    const db = await connection();
    let [results_one, fields] = await db.query("SELECT * FROM `teacher_language_request` WHERE `teacher_id`=? LIMIT 1", [id]);
    if (results_one.length > 0) {
        return results_one[0];
    }
    return false;
}
exports.saveTeacherlanguageRequest = async(data) => {
    console.log("saveTeacherlanguageRequest data =>", data);
    const db = await connection();
    let [results_one, fields] = await db.query("SELECT * FROM `teacher_language_request` WHERE `request_id`=? LIMIT 1", [data.request_id]);
    isValidNumber = results_one.length === 1;
    console.log("saveTeacherlanguageRequest results_one =>", results_one);
    if (isValidNumber) {
        let [results, fields] = await db.query("UPDATE `teacher_language_request` SET `language_list_id`=? WHERE `request_id`=? LIMIT 1", [data.language_list_id, data.request_id]);
        if (results.affectedRows > 0) {
            return true
        } else {
            return false
        }
    } else {
        delete data.request_id;
        console.log("saveTeacherlanguageRequest else =>", data);
        let [results, fields] = await db.query("INSERT INTO `teacher_language_request` SET ?", [data]);
        if (results.affectedRows === 1) {
            return true;
        }
        return false
    }
}

exports.fetchTeacherProgramBylanguageId = async(language_list_id) => {
    const db = await connection();
    let [results_one, fields] = await db.query("SELECT * FROM `program_request` WHERE FIND_IN_SET(`student_language_id`, ?)", [language_list_id]);
    if (results_one.length > 0) {
        return results_one;
    }
    return false;
}
exports.changeProgramById = async(data, id) => {
    const db = await connection();
    let [results, fields] = await db.query("UPDATE `program_request` SET ? WHERE id=? LIMIT 1", [data, id]);
    if (results.affectedRows > 0) {
        return true
    } else {
        return false
    }

}