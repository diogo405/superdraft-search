import React from 'react'
import './Projects.css'
import Project from './Project.js'

function Projects(props) {
	return (
		<div className="projects">
			{props.projects.map(p => <Project project={p} key={p.number}/>)}
		</div>
	)
}

export default Projects
