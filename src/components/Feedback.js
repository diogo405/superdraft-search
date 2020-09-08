import React from 'react'
import './Feedback.css'

function Feedback(props) {
	const feedbackClass = props.visible ? 'fback fback--active' : 'fback'
	return (
		<div className={feedbackClass}>
			{props.message}
		</div>
	)
}

export default Feedback
