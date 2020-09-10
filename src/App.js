import React from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate'
import './App.css'
import './components/pagination.css'
import Loading from './components/Loading.js'
import Feedback from './components/Feedback.js'
import Projects from './components/Projects.js'
import Filter from './components/Filter.js'

class App extends React.Component {
    state = {
        loading: false,
        isFeedbackVisible: false,
        isFilterVisible: false,
        isProjectsVisible: false,
        isPaginationVisible: false,
        filterForm: {},
        projects: [],
        pagination: {},
        states: [],
        status: [],
        eta: [],
        communication: []
    }

    componentDidMount = () => {
        this.fetchProjects()
    }

    fetchProjects = async () => {
        try {
            this.setState({loading: true, isFeedbackVisible: false})
            const {data} = await axios.get(process.env.REACT_APP_API_URL, {
                auth: {
                    username: process.env.REACT_APP_API_USERNAME,
                    password: process.env.REACT_APP_API_PWD
                }
            })
            console.log('data', data)

            this.setState({
                projects: data.projects, 
                pagination: this.getPagination(data),
                loading: false,
                isFilterVisible: true,
                isProjectsVisible: true,
                isPaginationVisible: true,
                states: data.form.inputs.find(i => i.label === 'State').options,
                status: data.form.inputs.find(i => i.label === 'Status').options,
                eta: data.form.inputs.find(i => i.label === 'ETA Report').options,
                communication: data.form.inputs.find(i => i.label === 'Communication').options
            })
        } catch (e) {
            console.log('Error fetching projects', e)
            this.setState({loading: false, isFeedbackVisible: true})
        }
    }

    onFilter = async (form) => {
        try {
            this.setState({loading: true, isFeedbackVisible: false, isProjectsVisible: false, isPaginationVisible: false, filterForm: form})
            const queryParams = this.getQueryParams()
            const {data} = await axios.get(`${process.env.REACT_APP_API_URL}?${queryParams}`, {
                auth: {
                    username: process.env.REACT_APP_API_USERNAME,
                    password: process.env.REACT_APP_API_PWD
                }
            })

            console.log('data', data)
            this.setState({
                projects: data.projects, 
                pagination: this.getPagination(data),
                loading: false, 
                isProjectsVisible: true, 
                isPaginationVisible: true
            })
        } catch(e) {
            console.log('Error filtering projects', e)
            this.setState({loading: false, isFeedbackVisible: true, isProjectsVisible: false, isPaginationVisible: false})
        }
    }

    getPagination = (data) => {
        let pagination = {}
        pagination.pageCount = Math.ceil(data.total / parseInt(data.itemPerPage))
        pagination.page = parseInt(data.page)
        console.log('pagination', pagination)
        return pagination
    }

    onPageClick = (data) => {
        this.setState({ pagination: { page: data.selected + 1} }, () => {
            this.onFilter(this.state.filterForm)
        })
    };

    getQueryParams = () => {
       let queryParams = Object.keys(this.state.filterForm).map((key) => {
            return `${encodeURIComponent(key)}=${encodeURIComponent(this.state.filterForm[key])}`
        }).join('&') 
       return `${queryParams}&page=${this.state.pagination.page}`
    }

    render = () => {
        return (
            <div className="app">
                <Filter visible={this.state.isFilterVisible} states={this.state.states} status={this.state.status} eta={this.state.eta} communication={this.state.communication} onFilter={this.onFilter}/>
                <Feedback message="Oops something went wrong 🤷🏻‍♀️" visible={this.state.isFeedbackVisible}/>
                <Loading title="Fetching projects" visible={this.state.loading}/>
                <Projects projects={this.state.projects} visible={this.state.isProjectsVisible}/>
                <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    breakClassName={'pag__break'}
                    pageCount={this.state.pagination.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={2}
                    onPageChange={this.onPageClick}
                    containerClassName={this.state.isPaginationVisible && this.state.pagination.pageCount > 0 ? 'pag pag--active' : 'pag'}
                    subContainerClassName={'pag__sub'}
                    activeClassName={'pag__active'}
                />
            </div>
        )
    }
}

export default App
