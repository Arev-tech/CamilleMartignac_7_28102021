const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'azerfdz2345653534RVFF');
        const userId = decodedToken.userId;
        if(req.body.userId && req.body.userId !== userId) {
            res.status(401).json({ 'error' : 'invalid request' });
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            'error' : 'invalid request'
        });
    }
};