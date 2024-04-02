import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { ItemType, SortProps } from "../ItemType.ts"

export const  withSort: React.FC<SortProps> = ({Component, props: { list }, sortField}) => {

	const sortedList: ItemType[] = [...list].sort((a, b) => {
		if (sortField === "year") {
			return parseInt(a.year) - parseInt(b.year);
		} else if (sortField === "month") {
			return a.monthNumber - b.monthNumber;
		} else {
			return new Date(a.date).getTime() - new Date(b.date).getTime();
		}
	}).map(item => ({ ...item, id: uuidv4() }));

	return <Component list={sortedList} />;
};
