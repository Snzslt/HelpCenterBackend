const express = require('express');
const Users = require('./controllers');
const checkAuth = require('../../middlewares/checkAuth');
const router = express.Router();

router.post('/update-complete-profile', checkAuth, Users.completeUserProfile);
router.post('/user-list', checkAuth, Users.getAllUserList);
router.post('/program-list-student', checkAuth, Users.getAllStudentProgtamList);
router.post('/user-activity', checkAuth, Users.userActivity);
router.post('/delete-user', checkAuth, Users.deleteUser);
router.post('/save-student-request', checkAuth, Users.addStudentNewRequest);
router.post('/language-list', checkAuth, Users.getAllLanguagesList);
router.post('/get-teacher-language-request-by-id', checkAuth, Users.getTeacherlanguageRequestById);
router.post('/get-teacher-program', checkAuth, Users.getTeacherRequestBylanguageId);
router.post('/save-teacher-language-list-Id', checkAuth, Users.saveTeacherlanguageRequestList);
router.post('/change-program-status', checkAuth, Users.changeProgramStatus);


module.exports = router;