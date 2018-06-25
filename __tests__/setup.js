import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

export const error = new Error('Fail');
export const stepper = fn => mock =>
{
	let method = mock instanceof Error ? 'throw' : 'next';
	const val = fn[method](mock).value;
	return val;
};
