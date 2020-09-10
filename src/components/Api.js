import axios from 'axios'

const getProjetcs = (queryParams = '') => {
	return axios.get(`${process.env.REACT_APP_API_URL}?${queryParams}`, {
        auth: {
            username: process.env.REACT_APP_API_USERNAME,
            password: process.env.REACT_APP_API_PWD
        }
    })
}

export default getProjetcs
