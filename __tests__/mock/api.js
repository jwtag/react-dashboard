import api from '../../src/utilities/api';

let mockApi = {};
for (let method in api)
{
	mockApi[method] = jest.fn();
}
export default mockApi;
