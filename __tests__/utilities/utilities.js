import * as util from '../../src/utilities/utilities';

describe('getType', () =>
{
	it('should return specific type', done =>
	{
		expect(util.getType('foo')).toEqual('String');
		expect(util.getType(1)).toEqual('Number');
		expect(util.getType([])).toEqual('Array');
		expect(util.getType({})).toEqual('Object');
		expect(util.getType(() => {})).toEqual('Function');
		expect(util.getType(undefined)).toEqual('Undefined');
		expect(util.getType(null)).toEqual('Null');
		expect(util.getType(NaN)).toEqual('Number');
		done();
	});
});

describe('isInvalid', () =>
{
	const rule = {
		presence: {
			message: 'Value is required'
		}
	};

	it('should return when no rules passed', done =>
	{
		expect(util.isInvalid(null, 'value')).toEqual(undefined);
		done();
	});

	it('should return invalid', done =>
	{
		expect(util.isInvalid(rule, '')).toEqual(['Value is required']);
		done();
	});

	it('should return valid', done =>
	{
		expect(util.isInvalid(rule, 'value')).toEqual(undefined);
		done();
	});
});

describe('formInvalid', () =>
{
	const rule = {
		foo: {
			presence: {
				message: 'is required'
			}
		}
	};

	it('should return when no rules passed', done =>
	{
		expect(util.formInvalid(null, { foo: 'bar' })).toEqual(false);
		done();
	});

	it('should return invalid', done =>
	{
		expect(util.formInvalid(rule, { foo: '' })).toEqual({ foo: ['Foo is required'] });
		done();
	});

	it('should return invalid', done =>
	{
		expect(util.formInvalid(rule, { foo: 'bar' })).toEqual(undefined);
		done();
	});
});

describe('pickDifferences', () =>
{
	const src = {
		foo: 1,
		bar: 2
	};

	const compare = {
		foo: 1,
		bar: 3,
		baz: ''
	};

	it('should find no difference', done =>
	{
		const diff = util.pickDifferences(src, src, true);
		expect(diff).toEqual(undefined);
		done();
	});

	it('should pick differences strictly', done =>
	{
		const diff = util.pickDifferences(src, compare, false);
		expect(diff.hasOwnProperty('foo')).toEqual(false);
		expect(diff.hasOwnProperty('bar')).toEqual(true);
		expect(diff.hasOwnProperty('baz')).toEqual(true);
		done();
	});

	it('should pick differences laxly', done =>
	{
		const diff = util.pickDifferences(src, compare, true);
		expect(diff.hasOwnProperty('foo')).toEqual(false);
		expect(diff.hasOwnProperty('bar')).toEqual(true);
		expect(diff.hasOwnProperty('baz')).toEqual(false);
		done();
	});
});

describe('trimStringProperties', () =>
{
	it('should default to empty object', done =>
	{
		expect(util.trimStringProperties()).toEqual({});
		done();
	});

	it('should not trim non-string objects', done =>
	{
		const src = { foo: () => {} };
		expect(util.trimStringProperties(src)).toEqual(src);
		done();
	});

	it('should remove leading and trailing whitespace', done =>
	{
		const data = {
			foo: '     foo ',
			bar: {
				baz: '    baz'
			}
		};
		const trimmed = util.trimStringProperties(data);
		expect(trimmed.foo).toEqual('foo');
		expect(trimmed.bar.baz).toEqual('baz');
		done();
	});
});

describe('capitalize', () =>
{
	it('should return the input if not type stirng', done =>
	{
		expect(util.capitalize({})).toEqual({});
		done();
	});

	it('should capitalize first letter', done =>
	{
		expect(util.capitalize('lowercase')).toEqual('Lowercase');
		done();
	});
});

describe('convertFalseyToNullRecur', () =>
{
	it('should convert falsey values to null recursively', done =>
	{
		const input = {
			foo: 'bar',
			baz: '',
			bar: {
				foo: '',
				baz: 'foo'
			}
		};

		const output = {
			foo: 'bar',
			baz: null,
			bar: {
				foo: null,
				baz: 'foo'
			}
		};
		expect(util.convertFalseyToNullRecur(input)).toEqual(output);

		done();
	});
});

describe('stripEmptyValues', () =>
{
	it('should strip empty values from an object', done =>
	{
		const input = {
			foo: '',
			bar: 'baz',
			null: null,
			undef: undefined,
			zero: 0
		};
		const output = {
			bar: 'baz',
			zero: 0
		};
		expect(util.stripEmptyValues(input)).toEqual(output);
		done();
	});
});

describe('toArray', () =>
{
	it('should convert object to array', done =>
	{
		const array = util.toArray({ foo: true, bar: false });
		expect(array.length).toEqual(2);
		expect(array[0]).toEqual(true);
		expect(array[1]).toEqual(false);
		done();
	});
});

describe('stringToBool', () =>
{
	it('should cast strings to booleans', done =>
	{
		expect(util.stringToBool('false')).toEqual(false);
		expect(util.stringToBool('true')).toEqual(true);
		expect(util.stringToBool('FALSE')).toEqual(false);
		expect(util.stringToBool('TRUE')).toEqual(true);
		done();
	});

	it('should ignore non boolean-castable strings', done =>
	{
		expect(util.stringToBool({})).toEqual({});
		expect(util.stringToBool(NaN)).toEqual(NaN);
		expect(util.stringToBool([])).toEqual([]);
		expect(util.stringToBool(1)).toEqual(1);
		expect(util.stringToBool('STRING')).toEqual('STRING');
		done();
	});
});

describe('objectById', () =>
{
	it('should return object by id', done =>
	{
		const obj = { id: 1, name: 'name' };
		expect(util.objectById(obj)).toEqual({ 1: obj });
		done();
	});

	it('should return empty object when passed non-object', done =>
	{
		expect(util.objectById(NaN)).toEqual({});
		expect(util.objectById([])).toEqual({});
		expect(util.objectById(1)).toEqual({});
		expect(util.objectById('STRING')).toEqual({});
		done();
	});
});

describe('isDefined', () =>
{
	it('should return false for null, undefined, empty string', done =>
	{
		expect(util.isDefined('')).toEqual(false);
		expect(util.isDefined(undefined)).toEqual(false);
		expect(util.isDefined(null)).toEqual(false);
		expect(util.isDefined('String')).toEqual(true);
		expect(util.isDefined(1)).toEqual(true);
		expect(util.isDefined({})).toEqual(true);
		expect(util.isDefined([])).toEqual(true);
		done();
	});
});

describe('getMediaType', () =>
{
	it('should return null', done =>
	{
		expect(util.getMediaType('')).toEqual(null);
		expect(util.getMediaType('a.mp3')).toEqual(null);
		done();
	});

	it('should return image', done =>
	{
		expect(util.getMediaType('a.png')).toEqual('image');
		expect(util.getMediaType('a.jpg')).toEqual('image');
		expect(util.getMediaType('a.jpeg')).toEqual('image');
		expect(util.getMediaType('a.gif')).toEqual('image');
		done();
	});

	it('should return video', done =>
	{
		expect(util.getMediaType('a.mp4')).toEqual('video');
		expect(util.getMediaType('a.mkv')).toEqual('video');
		expect(util.getMediaType('a.mov')).toEqual('video');
		expect(util.getMediaType('a.m4v')).toEqual('video');
		expect(util.getMediaType('a.avi')).toEqual('video');
		expect(util.getMediaType('a.webm')).toEqual('video');
		done();
	});
});

describe('getMediaTypeFromMime', () =>
{
	it('should return null', done =>
	{
		expect(util.getMediaTypeFromMime('')).toEqual(null);
		expect(util.getMediaTypeFromMime('audio/mp3')).toEqual(null);
		done();
	});

	it('should return image', done =>
	{
		expect(util.getMediaTypeFromMime('image/png')).toEqual('image');
		expect(util.getMediaTypeFromMime('image/jpg')).toEqual('image');
		expect(util.getMediaTypeFromMime('image/jpeg')).toEqual('image');
		expect(util.getMediaTypeFromMime('image/gif')).toEqual('image');
		done();
	});

	it('should return video', done =>
	{
		expect(util.getMediaTypeFromMime('video/mp4')).toEqual('video');
		expect(util.getMediaTypeFromMime('video/mkv')).toEqual('video');
		expect(util.getMediaTypeFromMime('video/mov')).toEqual('video');
		expect(util.getMediaTypeFromMime('video/m4v')).toEqual('video');
		expect(util.getMediaTypeFromMime('video/avi')).toEqual('video');
		expect(util.getMediaTypeFromMime('video/webm')).toEqual('video');
		done();
	});
});

describe('camelToSpace', () =>
{
	it('should return null', done =>
	{
		expect(util.camelToSpace({})).toEqual(null);
		expect(util.camelToSpace([])).toEqual(null);
		expect(util.camelToSpace(null)).toEqual(null);
		expect(util.camelToSpace(undefined)).toEqual(null);
		expect(util.camelToSpace(1)).toEqual(null);
		done();
	});

	it('should return space case', done =>
	{
		expect(util.camelToSpace('')).toEqual('');
		expect(util.camelToSpace('camel')).toEqual('camel');
		expect(util.camelToSpace('camelToSpace')).toEqual('camel To Space');
		expect(util.camelToSpace('lowerABC')).toEqual('lower ABC');
		done();
	});
});

