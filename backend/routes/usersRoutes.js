const router = require('express').Router();
const userCtrl = require('../controllers/usersCtrl');
const auth = require('../middleware/auth');

router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.get('/me', auth, userCtrl.getUserProfile);
router.put('/me', auth, userCtrl.updateUserProfile);
router.delete('/me', auth, userCtrl.deleteProfile);

module.exports = router;