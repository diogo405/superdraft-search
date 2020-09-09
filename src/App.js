import React from 'react'
import './App.css'
import Logo from './components/Logo.js'
import Loading from './components/Loading.js'
import Feedback from './components/Feedback.js'
import Projects from './components/Projects.js'
import Filter from './components/Filter.js'
import axios from 'axios'

class App extends React.Component {
    state = {
        loading: false,
        isFeedbackVisible: false,
        isFilterVisible: false,
        isProjectsVisible: false,
        projects: [],
        states: [],
        status: [],
        eta: [],
        communication: []
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
            console.log('data', data)

            this.setState({
                projects: data.projects, 
                loading: false,
                isFilterVisible: true,
                isProjectsVisible: true,
                states: data.form.inputs.find(i => i.label === 'State').options,
                status: data.form.inputs.find(i => i.label === 'Status').options,
                eta: data.form.inputs.find(i => i.label === 'ETA Report').options,
                communication: data.form.inputs.find(i => i.label === 'Communication').options
                }, () => {
                console.log('projects', this.state.projects)
            })
        } catch (e) {
            console.log('Error fetching projects', e)
            this.setState({
                loading: false, 
                isFeedbackVisible: true
            })
        }
    }

    onFilter = async (form) => {
        console.log('form', form)
        const queryParams = Object.keys(form).map((key) => {
            return `${encodeURIComponent(key)}=${encodeURIComponent(form[key])}`
        }).join('&')
        console.log('queryParams', queryParams)

        this.setState({loading: true, isProjectsVisible: false})
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API_URL}?${queryParams}`, {
                auth: {
                    username: process.env.REACT_APP_API_USERNAME,
                    password: process.env.REACT_APP_API_PWD
                }
            })
            console.log('data', data)

            this.setState({
                projects: data.projects, 
                loading: false,
                isProjectsVisible: true
                }, () => {
                console.log('projects', this.state.projects)
            })
        } catch(e) {
            console.log('Error filtering projects', e)
            this.setState({
                loading: false, 
                isFeedbackVisible: true,
                isProjectsVisible: false
            })
        }
    }

    render = () => {
        return (
            <div className="app">
                <Logo/>
                <Filter visible={this.state.isFilterVisible} states={this.state.states} status={this.state.status} eta={this.state.eta} communication={this.state.communication} onFilter={this.onFilter}/>
                <Feedback message="Oops something went wrong 🤷🏻‍♀️" visible={this.state.isFeedbackVisible}/>
                <Loading title="Fetching projects" visible={this.state.loading}/>
                <Projects projects={this.state.projects}/>
            </div>
        )
    }
}

export default App
