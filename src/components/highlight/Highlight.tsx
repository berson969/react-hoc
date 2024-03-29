import React, {useEffect, useState} from 'react';
import { ItemType, listData } from "./list.ts";
import "./index.css"

const Article: React.FC<ItemType> = (props)  => {
	return (
		<div className="item item-article">
			<h3><a href="#">{props.title}</a></h3>
			<p className="views">Прочтений: {props.views}</p>
		</div>
	)
};



const Video: React.FC<ItemType> = (props) => {
	return (
		<div className="item item-video">
			<iframe src={props.url}  allow="autoplay; encrypted-media" ></iframe>
			<p className="views">Просмотров: {props.views}</p>
		</div>
	)
};

interface PopularNewProps {
	item: ItemType;
	Component: React.FC<ItemType>
}

const New: React.FC<PopularNewProps> = (props) => {
	const {item, Component} = props;
	return (
		<div className="wrap-item wrap-item-new">
			<Component {...item} />
		</div>
	)
}

const Popular: React.FC<PopularNewProps> = (props) => {
	const {item, Component} = props;
	return (
		<div className="wrap-item wrap-item-popular">
			<Component {...item} />
		</div>
	)
}

interface ListProps {
	list: ItemType[];
}

const List: React.FC<ListProps> = (props) => {
	return props.list.map(item => {
		const Component = item.type === 'video' ? Video : Article;

		if (item.views > 1000) {
			return (
				<Popular item={item} Component={Component} />
		)} else if (item.views < 100) {
			return (
				<New item={item} Component={Component} />
		)} else {
			return (
			<Component {...item} />
		)}
	});
};

const Highlight: React.FC = () => {

	const [list] = useState(listData)

	useEffect(() => {
		document.title = 'Highlight';
	}, []);



	return (
		<div className="items-container">
			<List list={list} />
		</div>

	);
};

export default Highlight;
