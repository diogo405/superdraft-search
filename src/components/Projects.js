import React from 'react'
import './Projects.css'
import Project from './Project.js'

function Projects(props) {
	const projectsClassName = props.visible ? 'projects projects--active' : 'projects'
	const projects = props.projects ? 
		props.projects.map(p => <Project project={p} key={p.number}/>) :
		<div className="projects__noresults">No results found.</div>
	return (
		<div className={projectsClassName}>
			{projects}
		</div>
	)
}

export default Projects
