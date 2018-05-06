const tr = require('../models/tr');

module.exports = {
	getByFilter: function (req, res) {
		for (key in req.body.query) {
			req.body.query[key] = req.body.query[key].replace(/i/g, 'İ');
			req.body.query[key] = req.body.query[key].toUpperCase();
		}
		var query = tr.find(req.body.query);
		query.select('-_id');
		if (req.body.limit) {
			query.limit(req.body.limit);
		}
		if (req.body.skip) {
			query.skip(req.body.skip);
		}
		query.exec(function (err, resources) {
			tr.count(req.body.query, function (countErr, countResult) {
				var returnObject = {
					result: resources,
					total: countResult
				};
				if (resources !== null && resources !== []) {
					res.status(200).send(returnObject);
				} else {
					res.sendStatus(204);
				}
			});
		});
	},
	filter: function (req, res) {
		// var query = {
		// 	TCKNO: req.body.TCKNO,
		// 	Adi: req.body.Adi,
		// 	Soyadi: req.body.Soyadi,
		// 	AnaAdi: req.body.AnaAdi,
		// 	BabaAdi: req.body.BabaAdi,
		// 	Cinsiyeti: req.body.Cinsiyeti,
		// 	DogumYeri: req.body.DogumYeri,
		// 	DogumTarihi: req.body.DogumTarihi,
		// 	NufusIl: req.body.NufusIl,
		// 	NufusIlce: req.body.NufusIlce,
		// 	AdresIl: req.body.AdresIl,
		// 	AdresIlce: req.body.AdresIlce,
		// 	AdresBelde: req.body.AdresBelde,
		// 	AdresMuhtarlik: req.body.AdresMuhtarlik,
		// 	AdresCaddeSokak: req.body.AdresCaddeSokak,
		// 	KapiNo: req.body.KapiNo,
		// 	DaireNo: req.body.DaireNo
		// };
		tr
			.find({ Soyadi: req.body.Soyadi })
			.select('-__v')
			.exec(function (err, resources) {
				if (err) {
					return res.sendStatus(400);
				}

				if (resources !== null) {
					res.status(200).send(resources.length.toString());
				} else {
					res.sendStatus(204);
				}
			});
	}
}	