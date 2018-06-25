import React from 'react';
import { mount } from 'enzyme';
import List from '../../src/components/List';

const Item = props =>
{
	return <div onClick={props.onClick}>Item</div>;
};

function setup(opts = {})
{
	const defaultProps = {
		ListItem: Item,
		title: 'List Title',
		titleClass: 'title-class',
		items: [1, 2],
		onClickItem: jest.fn()
	};

	const props = Object.assign({}, defaultProps, opts);
	const enzymeWrapper = mount(<List {...props} />);
	return {
		props,
		enzymeWrapper
	};
}

describe('List', () =>
{
	it('shoud render list without title', done =>
	{
		const { enzymeWrapper } = setup({ title: null, titleClass: null });

		const title = enzymeWrapper.find('.list-title');
		expect(title.length).toEqual(0);
		done();
	});

	it('shoud render list without title class', done =>
	{
		const { enzymeWrapper, props } = setup({ titleClass: null });

		const title = enzymeWrapper.find('.list-title');
		expect(title.length).toEqual(1);
		expect(enzymeWrapper.find('h3').text()).toEqual(props.title);
		const titleClass = enzymeWrapper.find('.title-class');
		expect(titleClass.length).toEqual(0);
		done();
	});

	it('shoud render list and children', done =>
	{
		const { enzymeWrapper, props } = setup();

		const title = enzymeWrapper.find('.title-class');
		expect(title.length).toEqual(1);
		expect(title.text()).toEqual(props.title);

		const items = enzymeWrapper.find('Item');
		expect(items.length).toEqual(props.items.length);
		items.forEach((i, idx) =>
		{
			//Default order is reversed
			expect(i.props().item).toEqual(props.items[items.length - 1 - idx]);
			expect(i.props.onClick).toEqual(props.onClick);
		});
		items.first().simulate('click');
		expect(props.onClickItem.mock.calls.length).toEqual(1);

		enzymeWrapper.find('.fa .fa-sort').simulate('click');
		const reversedItems = enzymeWrapper.find('Item');
		expect(reversedItems[0]).toEqual(items[1]);
		done();
	});
});
