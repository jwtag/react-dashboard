import axios from 'axios';
import { loginSagas } from '../components/SignInButton/LoginSagas';

export default {
	sample,
	login
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

function login(fbAccessToken)
{
	if (!fbAccessToken) return Promise.reject(new Error('Invalid data: token is required'));

	const params = {
		provider : "facebook",
		fbAccessToken
	};
	return axios.post("/signin", params).then(console.log(Response));
}