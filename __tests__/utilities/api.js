import api from '../../src/utilities/api';
import moxios from 'moxios';

describe('api', () =>
{
	const tests = [
		{
			name: 'sample',
			uri: '/sample',
			method: 'get',
			data: { property: 'foo' },
			response: [],
			args: ['property'],
			invalidError: 'property is required'
		}
	];

	tests.forEach((config, idx) =>
	{
		beforeEach(done =>
		{
			moxios.install();
			done();
		});

		afterEach(done =>
		{
			moxios.uninstall();
			done();
		});

		it(`${config.name} success`, done =>
		{
			api[config.name](config.data);
			moxios.wait(function()
			{
				const request = moxios.requests.mostRecent();
				request
					.respondWith({
						status: 200,
						response: config.response || {}
					})
					.then(res =>
					{
						expect(res).toBeDefined();
						expect(res.data).toEqual(config.response);
						done();
					})
					.catch(done);
			});
		});

		it(`${config.name} invalid data`, done =>
		{
			moxios.stubRequest(config.uri, {
				status: 200,
				response: config.response || {}
			});

			api
				[config.name]({})
				.then(res =>
				{
					done(new Error('Should reject'));
				})
				.catch(e =>
				{
					const verb = config.args.length > 1 ? 'are' : 'is';
					const error = config.invalidError
						? `Invalid data: ${config.invalidError}`
						: `Invalid data: ${config.args.join(', ')} ${verb} required`;
					expect(e.message).toEqual(error);
					done();
				})
				.catch(done);
		});
	});
});
