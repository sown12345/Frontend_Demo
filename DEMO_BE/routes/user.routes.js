const router = require('express').Router();
const auth = require('../middleware/auth');
const ctrl = require('../controllers/user.controller');
const upload = require('../middleware/upload');
const { USER } = require('../constants/routes');

router.post(USER.REGISTER, ctrl.register);
router.post(USER.LOGIN, ctrl.login);
router.get(USER.PROFILE, auth, ctrl.getProfile);
router.put(USER.PROFILE, auth, ctrl.updateProfile);
router.put(USER.AVATAR, auth, upload('avatar'), ctrl.uploadAvatar);

module.exports = router;
