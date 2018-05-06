import Config from '@/../config/config';
import Api from '@/services/Api';

export default {
	
	async getWithFilter (params, callback) {
		if (typeof callback === 'function') {
			if (Auth.user.isAuthenticated) {
				Api.post('api/getByFilter', params, function (result) {
					callback(result);
				});
			}
		} else {
			return (await Api.post('api/getByFilter', params)).data;
		}
	}
};
