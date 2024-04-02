import React from "react";

export type ItemType =  {
	id? : string;
	year: string;
	amount: number;
	date: string;
	month: string;
	monthNumber: number;
}

export interface ListProps {
	list: ItemType[]
}

export interface SortProps {
	Component: React.FC<ListProps>;
	props: ListProps;
	sortField: "year" | "month" | "date";
}
