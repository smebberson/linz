var linz = require('../');

module.exports = function () {

	return function (req, res, next) {

		req.linz.model.getObject(req.params.id, function (err, doc) {

			if (!err) {
				req.linz.record = doc;
			}

			next();

		});

	}

}
