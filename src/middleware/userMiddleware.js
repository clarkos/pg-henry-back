const admin = require('../config/firebase-config');
const {getDetailedUser} = require('../controllers/client/controllerGetDetailedUser')

class UserMiddleware {
	async decodeToken(req, res, next) {
		if (req.headers.authorization && req.headers.user) {
			const token = req.headers.authorization;
			const username = req.headers.user;
			try {
				const decodeValue = await admin.auth().verifyIdToken(token);
				const user = await getDetailedUser(username)
				if (decodeValue && username === decodeValue.email && user && user.role === 'User') {
					return next();
				}
				return res.status(403).json({ message: 'No autorizado' });
			} catch (e) {
				return res.status(403).json({ message: 'No autorizado' });
			}
		}
		else{
			return res.status(403).json({ message: 'No autorizado' });
		}
	}
}
module.exports = new UserMiddleware();
