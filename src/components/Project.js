import React from 'react'
import './Project.css'

function Project(props) {
	return (
		<div className="project">
			<h2 className="project__number">{props.project.number}</h2>
			<h3 className="project__name">{props.project.title}</h3>
			<hr className="project__sep"/>
			<span className="project__client">{props.project.client_name}</span>
			<span className="project__stage">{props.project.active_stage}</span>
			<div className="project__members">
				{props.project.members && props.project.members.map(m => <div className="project__member" title={m.name}>{m.name.substring(0, 1)}</div>)}
			</div>
		</div>
	)
}

export default Project
