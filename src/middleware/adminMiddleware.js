const admin = require('../config/firebase-config');
const { getDetailedUser } = require('../controllers/client/controllerGetDetailedUser')

class AdminMiddleware {
	async decodeToken(req, res, next) {
		// console.log('AdminMiddleware req.headers', req.headers);
		if (req.headers.authorization && req.headers.user) {
			// const token = req.headers.authorization.split(' ')[1];
			const token = req.headers.authorization;
			// console.log('token', token);
			const username = req.headers.user
			try {
				const decodeValue = await admin.auth().verifyIdToken(token);
				const user = await getDetailedUser(username)
				// console.log('user', user);
				if (decodeValue) {
					if (user && user.dataValues.role === 'Admin') {
						return next();
					}
				}
				return res.status(403).json({ message: 'No autorizado' });
			} catch (e) {
				// console.log(e);
				return res.status(403).json({ message: 'No autorizado' });
				// return res.json({ message: 'Internal Error' });
			}
		}
		else {
			return res.status(403).json({ message: 'No autorizado' });
		}

	}
}
module.exports = new AdminMiddleware();
