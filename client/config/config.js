module.exports = {
	apiGateway: process.env.NODE_ENV === 'development'
		? 'http://localhost:8080'
		: 'http://159.89.97.202:8080'
	// externalAuth: {
	// 	google: { // support@formbuilder.io
	// 		clientId: '867198227335-6i7jqhkm0h9f218lba1gd6psnrh5noa1.apps.googleusercontent.com',
	// 		apiGatewayCallbackUrl: '/auth/externallogin/google',
	// 		webCallbackUrl: '/auth/google/callback'
	// 	},
	// 	facebook: { // tolga@formbuilder.io
	// 		clientId: '325413477969404',
	// 		apiGatewayCallbackUrl: '/auth/externallogin/facebook',
	// 		webCallbackUrl: '/auth/facebook/callback'
	// 	}
	// }
};
