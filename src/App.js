import React from 'react'
import './App.css'
import Logo from './components/Logo.js'
import Loading from './components/Loading.js'
import Feedback from './components/Feedback.js'
import Projects from './components/Projects.js'
import axios from 'axios'

class App extends React.Component {
    state = {
        loading: false,
        isFeedbackVisible: false,
        projects: []
    }

    componentDidMount = () => {
        this.fetchProjects()
    }

    fetchProjects = async () => {
        this.setState({loading: true})
        try {
            const {data} = await axios.get(process.env.REACT_APP_API_URL, {
                auth: {
                    username: process.env.REACT_APP_API_USERNAME,
                    password: process.env.REACT_APP_API_PWD
                }
            })
            this.setState({projects: data.projects, loading: false}, () => {
                console.log('projects', this.state.projects)
            })
        } catch (e) {
            console.log('Error fetching projects', e)
            this.setState({loading: false, isFeedbackVisible: true})
        }
    }

    render = () => {
        return (
            <div className="app">
                <Logo/>
                <Loading title="Fetching projects" visible={this.state.loading}/>
                <Feedback message="Oops something went wrong 🤷🏻‍♀️" visible={this.state.isFeedbackVisible}/>
                <Projects projects={this.state.projects}/>
            </div>
        )
    }
}

export default App
