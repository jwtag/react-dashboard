import axios from 'axios';

export default {
	signIn
};

function signIn(providerAccessToken)
{
	if (!providerAccessToken) return Promise.reject(new Error('Invalid data: token is required'));
	const params = {
		provider : "facebook",
		providerAccessToken: fbAccessToken.property
	};
	return axios.post("/signin", params);
}