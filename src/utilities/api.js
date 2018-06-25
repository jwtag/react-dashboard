import axios from 'axios';

export default {
	sample
};

function sample(data)
{
	const { property } = data;
	if (!property) return Promise.reject(new Error('Invalid data: property is required'));

	const params = {
		property
	};
	return axios.get('/sample', { params }).then(r => r.data);
}