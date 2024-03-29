import React from 'react';
import { ItemType, ListProps } from "../ItemType.ts"


interface SortProps {
	Component: React.FC<ListProps>;
	props: ListProps;
	sortField: "year" | "month" | "date";
}

export const  withSort: React.FC<SortProps> = ({Component, props, sortField}) => {

	const sortedList: ItemType[] = [...props.list].sort((a, b) => {
		if (sortField === "year") {
			return parseInt(a.year) - parseInt(b.year);
		} else if (sortField === "month") {
			return a.month.localeCompare(b.month);
		} else {
			return new Date(a.date).getTime() - new Date(b.date).getTime();
		}
	});

	return <Component list={sortedList} />;
};
