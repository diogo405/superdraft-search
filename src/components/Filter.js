import React from 'react'
import { Formik, Field, Form } from 'formik';
import './Filter.css'
import Logo from './Logo.js'

class Filter extends React.Component {

	state = {isMoreOptionsVisible: false}

	render = () => {
		const filterClass = this.props.visible ? 'filter filter--active' : 'filter'
		const moreOptionsFormClass = this.state.isMoreOptionsVisible ? 'filter__form' : 'filter__form filter__form--hidden'
		return (
			<Formik 
				initialValues={{client_full_name: '',
					project_number: '',
					address: '',
					state: '',
					partner: '',
					staff: '',
					status: '',
					eta_status: '',
					communication: '',
					stage_title: '',
					page: 1
				}}
				onSubmit={values => {
        			this.props.onFilter(values)
      		}}>
      			<Form className={filterClass}>
      				<Logo/>
					<h2 className="filter__title">Filter by</h2>
					<div className="filter__row">
						<div className="filter__field">
							<label className="filter__label">Client Name</label>
							<Field className="filter__input" name="client_full_name" placeholder="e.g. John Smith"/>
						</div>
						<div className="filter__field">
							<label className="filter__label">Project Number</label>
							<Field className="filter__input" name="project_number" placeholder="e.g. SD99-9999"/>
						</div>
						<div className="filter__field">
							<label className="filter__label">Suburb</label>
							<Field className="filter__input" name="address" placeholder="e.g. Surfers Paradise"/>
						</div>
					</div>
					<span className="filter__link" onClick={() => this.setState({isMoreOptionsVisible: !this.state.isMoreOptionsVisible})}>{this.state.isMoreOptionsVisible ? 'Less options' : 'More options'}</span>
					<div className={moreOptionsFormClass}>
						<div className="filter__row">
							<div className="filter__field">
								<label className="filter__label">State</label>
								<div className="filter__select-wrap">
									<Field as="select" className="filter__input" name="state">
										<option value="">Select...</option>
										{this.props.states.map(s => <option key={s.value} value={s.value}>{s.name}</option>)}
									</Field>
								</div>
							</div>
							<div className="filter__field">
								<label className="filter__label">Partner</label>
								<Field className="filter__input" name="partner" placeholder="e.g. ABC Design"/>
							</div>
							<div className="filter__field">
								<label className="filter__label">Staff</label>
								<Field className="filter__input" name="staff" placeholder="e.g. John Smith"/>
							</div>
						</div>
						<div className="filter__row">
							<div className="filter__field">
								<label className="filter__label">Active Status</label>
								<div className="filter__select-wrap">
									<Field as="select" className="filter__input" name="status">
										{this.props.status.map(s => <option key={s.value} value={s.value}>{s.name}</option>)}
									</Field>
								</div>
							</div>
							<div className="filter__field">
								<label className="filter__label">ETA</label>
								<div className="filter__select-wrap">
									<Field as="select" className="filter__input" name="eta_status">
										{this.props.eta.map(e => <option key={e.value} value={e.value}>{e.name}</option>)}
									</Field>
								</div>
							</div>
							<div className="filter__field">
								<label className="filter__label">Communication Status</label>
								<div className="filter__select-wrap">
									<Field as="select" className="filter__input" name="communication">
										{this.props.communication.map(c => <option key={c.value} value={c.value}>{c.name}</option>)}
									</Field>
								</div>
							</div>
						</div>
						<div className="filter__row">
							<div className="filter__field filter__field--single">
								<label className="filter__label">Stage Title</label>
								<Field className="filter__input" name="stage_title" placeholder="e.g. Development Approval"/>
							</div>
						</div>
					</div>
					<button className="filter__button" type="submit">Filter</button>
				</Form>
			</Formik>
		)
	}
}

export default Filter
