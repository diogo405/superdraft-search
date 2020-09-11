import React from 'react'
import './Projects.css'
import Project from './Project.js'

function Projects(props) {
	const projectsClassName = props.visible ? 'projects projects--active' : 'projects'
	const projects = props.projects ? 
		props.projects.map(p => <Project project={p} key={p.number}/>) :
		<div className="projects__noresults">No results found.</div>
	const projectsTitle = props.projects ? <h2 className="projects__title">Showing {props.projects.length}/{props.total} projects</h2> : ''

	return (
		<div className={projectsClassName}>
			{projectsTitle}
			<div className="projects__cont">
				{projects}
			</div>
		</div>
	)
}

export default Projects
