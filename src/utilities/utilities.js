import validatejs from 'validate.js';
import reduce from 'lodash/reduce';
import isEqual from 'lodash/isEqual';

export const timezone = 'America/Los_Angeles';

export function isInvalid(rule, value)
{
	if (value === '') value = undefined;
	if (!rule) return;
	return validatejs.single(value, rule);
}

export function formInvalid(rules, state)
{
	if (!rules) return false;
	const values = convertFalseyToNullRecur({ ...state });
	return validatejs(values, rules);
}

export function pickDifferences(src, target, falseyToNull)
{
	const diff = reduce(
		target,
		(result, value, key) =>
		{
			let srcVal = src[key];
			if (falseyToNull)
			{
				value = convertFalseyToNull(value);
				srcVal = convertFalseyToNull(srcVal);
			}
			if (!isEqual(value, srcVal)) result[key] = target[key];
			return result;
		},
		{}
	);
	if (!Object.keys(diff).length) return;
	return diff;
}

function convertFalseyToNull(val)
{
	if (val === undefined || val === null || val === '') return null;
	return val;
}

export function convertFalseyToNullRecur(obj)
{
	let converted = {};
	for (let key in obj)
	{
		if (getType(obj[key]) === 'Object') converted[key] = convertFalseyToNullRecur(obj[key]);
		else converted[key] = convertFalseyToNull(obj[key]);
	}
	return converted;
}

export function capitalize(val)
{
	if (typeof val !== 'string') return val;
	return val[0].toUpperCase() + val.substring(1);
}

export function trimStringProperties(obj = {})
{
	return reduce(
		obj,
		(result, value, key) =>
		{
			if (getType(value) === 'String')
			{
				result[key] = value.trim();
			} else if (getType(value) === 'Object')
			{
				result[key] = trimStringProperties(value);
			} else result[key] = value;
			return result;
		},
		{}
	);
}

export function getType(val)
{
	return Object.prototype.toString.call(val).slice(8, -1);
}

export function stripEmptyValues(obj)
{
	return Object.keys(obj).reduce((d, key) =>
	{
		const val = obj[key];
		if (val === undefined || val === null || val === '') return d;
		d[key] = val;
		return d;
	}, {});
}


export function toArray(obj)
{
	const array = [];
	for (let key in obj)
	{
		array.push(obj[key]);
	}
	return array;
}

export function stringToBool(value)
{
	if (value && typeof value === 'string')
	{
		if (value.toLowerCase() === 'true') return true;
		if (value.toLowerCase() === 'false') return false;
	}
	return value;
}

export function isDefined(value)
{
	return value !== undefined && value !== null && value !== '';
}

export function objectById(obj)
{
	if (getType(obj) !== 'Object') return {};
	return { [obj.id]: obj };
}

export function getMediaType(string)
{
	if (!string) return null;
	if (/(\.png|\.gif|\.jpe?g)$/.test(string)) return 'image';
	if (/(\.mp4|\.mkv|\.avi|.mov|\.webm|\.m4v)$/.test(string)) return 'video';
	return null;
}

export function getMediaTypeFromMime(string)
{
	if (!string) return null;
	if (string.indexOf('image/') >= 0) return 'image';
	if (string.indexOf('video/') >= 0) return 'video';
	return null;
}

export function camelToSpace(string)
{
	if (string === '') return string;
	if (getType(string) !== 'String') return null;
	return string.replace(/([a-z])([A-Z])/g, '$1 $2');
}

