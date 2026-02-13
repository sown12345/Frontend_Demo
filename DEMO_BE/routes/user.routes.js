const router = require('express').Router();
const auth = require('../middleware/auth');
const ctrl = require('../controllers/user.controller');
const upload = require('../middleware/upload');

router.post('/register', ctrl.register);
router.post('/login', ctrl.login);
router.get('/profile', auth, ctrl.getProfile);
router.put('/profile', auth, ctrl.updateProfile);
router.put('/avatar', auth, upload.single('avatar'), ctrl.uploadAvatar);

module.exports = router;
