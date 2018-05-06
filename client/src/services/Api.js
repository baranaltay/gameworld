import axios from 'axios';
// import Auth from '@/services/Auth';
import Config from '@/../config/config';

function apiGatewayRequest () {
	var axiosCreateOptions = {
		baseURL: Config.apiGateway
	};
	// if (Auth.user.isAuthenticated) {
	// 	axiosCreateOptions.headers = { 'Authorization': 'Bearer ' + Auth.user.token };
	// }
	// console.log('Created new axios in Api.js apiGatewayRequest, Auth.user.isAuthenticated:' + Auth.user.isAuthenticated);
	return axios.create(axiosCreateOptions);
}

export default {
	// getAsync: function (url, params, callback) {
	// 	console.log('url', url, 'params', params, 'callback', callback);
	// 	apiGatewayRequest().get(url, params).then(function (result) {
	// 		callback(null, result);
	// 	}).catch(function (error) {
	// 		callback(error, null);
	// 	});
	// },
	get: async function (url, params, callback) {
		if (typeof callback === 'function') {
			apiGatewayRequest().get(url, params).then(callback).catch(callback);
		} else {
			var apiResult = await apiGatewayRequest().get(url, params).then(function (result) {
				return result;
			}).catch(function (error, a) {
				return error;
			});
			return apiResult;
		}
	},
	post: async function (url, params, callback) {
		if (typeof callback === 'function') {
			apiGatewayRequest().post(url, params).then(callback).catch(callback);
		} else {
			var apiResult = await apiGatewayRequest().post(url, params).then(function (result) {
				return result;
			}).catch(function (error) {
				return error;
			});
			return apiResult;
		}
	},
	put: async function (url, params, callback) {
		if (typeof callback === 'function') {
			apiGatewayRequest().get(url, params).then(callback).catch(callback);
		} else {
			var apiResult = await apiGatewayRequest().put(url, params).then(function (result) {
				return result;
			}).catch(function (error) {
				return error;
			});
			return apiResult;
		}
	},
	delete: async function (url, params, callback) {
		if (typeof callback === 'function') {
			apiGatewayRequest().get(url, params).then(callback).catch(callback);
		} else {
			var apiResult = await apiGatewayRequest().delete(url, params).then(function (result) {
				return result;
			}).catch(function (error) {
				return error;
			});
			return apiResult;
		}
	}
};
