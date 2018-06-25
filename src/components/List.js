import React from 'react';
import PropTypes from 'prop-types';

export default class List extends React.Component
{
	static propTypes = {
		items: PropTypes.array.isRequired,
		onClickItem: PropTypes.func.isRequired,
		ListItem: PropTypes.func.isRequired,
		title: PropTypes.string,
		titleClass: PropTypes.string
	};

	constructor(props)
	{
		super(props);
		this.state = { reverse: true };
		this.toggleReverse = this.toggleReverse.bind(this);
	}

	toggleReverse()
	{
		const { reverse } = this.state;
		this.setState({ reverse: !reverse });
	}

	renderTitle()
	{
		const { title, titleClass } = this.props;
		if (!title) return null;
		return (
			<div className="list-title">
				<h3 className={titleClass || ''}>{title}</h3>
				<i className="fa fa-sort clickable" onClick={this.toggleReverse} />
			</div>
		);
	}

	renderList()
	{
		const { items, ListItem } = this.props;

		let renderedItems = [];
		if (this.state.reverse)
		{
			for (let i = items.length - 1; i >= 0; i--)
			{
				renderedItems.push(<ListItem key={i} item={items[i]} onClick={this.props.onClickItem} />);
			}
		} else
		{
			for (let i = 0, l = items.length; i < l; i++)
			{
				renderedItems.push(<ListItem key={i} item={items[i]} onClick={this.props.onClickItem} />);
			}
		}
		return renderedItems;
	}

	render()
	{
		return (
			<div className="list-container">
				{this.renderTitle()}
				<ul>
					{this.renderList()}
				</ul>
			</div>
		);
	}
}
