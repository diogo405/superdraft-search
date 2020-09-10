import React from 'react'
import './Projects.css'
import Project from './Project.js'

function Projects(props) {
	const projectsClassName = props.visible ? 'projects projects--active' : 'projects'
	return (
		<div className={projectsClassName}>
			{props.projects.map(p => <Project project={p} key={p.number}/>)}
		</div>
	)
}

export default Projects
