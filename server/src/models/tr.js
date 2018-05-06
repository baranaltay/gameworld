var mongoose = require('mongoose');

module.exports = mongoose.model('trs', new mongoose.Schema({
	TCKNO: { type: String },
	Adi: { type: String, index: true },
	Soyadi: { type: String, index: true },
	AnaAdi: { type: String, index: true },
	BabaAdi: { type: String },
	Cinsiyeti: { type: String },
	DogumYeri: { type: String },
	DogumTarihi: { type: String },
	NufusIl: { type: String },
	NufusIlce: { type: String },
	AdresIl: { type: String },
	AdresIlce: { type: String },
	AdresBelde: { type: String },
	AdresMuhtarlik: { type: String },
	AdresCaddeSokak: { type: String },
	KapiNo: { type: String },
	DaireNo: { type: String }
}));