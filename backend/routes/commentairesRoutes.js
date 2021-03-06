const router = require('express').Router();
const commentaireCtrl = require('../controllers/commentairesCtrl');
const auth = require('../middleware/auth');

router.post('/commentaires', auth, commentaireCtrl.createCommentaire);
router.get('/commentaires', auth, commentaireCtrl.getAllCommentaires);
router.delete('/commentaires', auth, commentaireCtrl.deleteCommentaires);

module.exports = router;