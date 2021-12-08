const router = require('express').Router();
const messageCtrl = require('../controllers/messagesCtrl');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/new', auth, multer, messageCtrl.createMessage);
router.get('/', auth, messageCtrl.getAllMessages);
router.get('/me', auth, messageCtrl.getOneMessage);
router.post('/me', auth, messageCtrl.Maskmessage);
router.delete('/me', auth, messageCtrl.deleteMessage);

module.exports = router;