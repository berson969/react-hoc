import React, {useEffect, useState} from 'react';
import moment from 'moment';
import "./index.css";

import { ItemType, ListProps } from "./ItemType.ts";
import {withSort} from "./hoc/withSort.tsx";


const YearTable: React.FC<ListProps> = (props) => {
	console.log('YearTable', props);

	return (
		<div>
			<h2>Year Table</h2>
			<table>
				<tr>
					<th>Year</th>
					<th>Amount</th>
				</tr>
				{props.list.map(item => (
					<tr>
						<td>{item.year}</td>
						<td>{item.amount}</td>
					</tr>
				))}
			</table>
		</div>
	);
};

const SortTable: React.FC<ListProps> = (props) => {
	console.log('SortTable', props);

	return (
		<div>
			<h2>Sort Table</h2>
			<table>
				<tr>
					<th>Date</th>
					<th>Amount</th>
				</tr>
				{props.list.map(item => (
					<tr>
						<td>{item.date}</td>
						<td>{item.amount}</td>
					</tr>
				))}
			</table>
		</div>
	);
};

const MonthTable: React.FC<ListProps> = (props) => {
	console.log('MonthTable', props);

	return (
		<div>
			<h2>Month Table</h2>
			<table>
				<tr>
					<th>Month</th>
					<th>Amount</th>
				</tr>
				{props.list.map(item => (
					<tr>
						<td>{item.month}</td>
						<td>{item.amount}</td>
					</tr>
				))}
			</table>
		</div>
	);
};

const updateItemType = (item: ItemType): ItemType => {
	const dateObject = moment(item.date).toDate();
	return {
		...item,
		year: moment(dateObject).format('YYYY'),
		month: moment(dateObject).format('MMMM'),
	};
};

const Aggregation: React.FC<ListProps> = () => {
	const  [list, setList] = useState<ItemType[]>([])

	useEffect(() => {
		document.title = 'Aggregation';
		const fetchData = async () => {
			try {
				const response = await fetch(import.meta.env.VITE_BASE_URL);
				if (response.ok) {
					const data = await response.json()
					console.log("data", data)
					const readyData = data.list.map((item: ItemType) => {
						return updateItemType(item)
					})
					setList(readyData);

				} else {
					console.log('Network response was not ok.');
				}
			} catch (error) {
				console.log(`Error fetching data: ${error}`);
			}
		}
		fetchData();
	}, []);

	const SortedMonthTable = withSort( {Component: MonthTable, list: list, sortField:  "month"} );
	return (
		<div id="aggregation">
			<SortedMonthTable />
			<YearTable list={list} />
			<SortTable list={list} />
		</div>
	);
}


export default Aggregation;
