import React, {useEffect, useState} from 'react';
import { VideoType, listData } from "./list.ts";
import moment from "moment";
import "./index.css"

interface DateTimeProps {
	date: string;
}

const DateTime: React.FC<DateTimeProps> = (props)  => {
	return (
		<p className="date">{props.date}</p>
	)
}

const DateTimePretty: React.FC<DateTimeProps> = (props) => {
	const formatDateTime = (date: string) => {
		const currentDateTime = moment();
		const dateTime = moment(date);
		const diffMinutes = currentDateTime.diff(dateTime, 'minutes');
		const diffHours = currentDateTime.diff(dateTime, 'hours');
		const diffDays = currentDateTime.diff(dateTime, 'days');

		if (diffMinutes < 60) {
			return `${diffMinutes} минут назад`;
		} else if (diffHours < 24) {
			return `${diffHours} часов назад`;
		} else {
			return `${diffDays} дней назад`;
		}
	}


	const formattedDate = formatDateTime(props.date);
	return (
		<DateTime date={formattedDate} />
	)
}

const Video: React.FC<VideoType> = (props) =>  {
	return (
		<div className="video">
			<iframe src={props.url} allowFullScreen={true} allow="autoplay; encrypted-media"></iframe>
			<DateTimePretty date={props.date} />
		</div>
	)
}
interface VideoListProps {
	list: VideoType[];
}

const VideoList: React.FC<VideoListProps> = (props) =>  {
	return props.list.map((item: VideoType, index: number) => <Video key={index} url={item.url} date={item.date} />);
}

const Time: React.FC = () => {
	const [list] = useState(listData)

	useEffect(() => {
		document.title = 'Time';
	}, []);

	return (
		<div className="video-container">
			<VideoList  list={list} />
		</div>
	);
};

export default Time;
