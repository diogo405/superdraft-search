import React from 'react'
import './Loading.css'

function Loading(props) {
	let title
	if (props.title) {
		title = <div className="loading__title">{props.title}</div>
	}
	const loadingClass = props.visible ? 'loading loading--active' : 'loading'
	return (
		<div className={loadingClass}>
			{title}
			<div className="loading__ellipsis">
				<div></div><div></div><div></div><div></div>
			</div>
		</div>
	)
}

export default Loading
