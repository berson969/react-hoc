export type ItemType =  {
	year: string;
	amount: number;
	date: string;
	month: string;
}

export interface ListProps {
	list: ItemType[]
}
