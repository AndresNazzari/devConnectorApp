import React from 'react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profiles';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import Alert from '../layout/Alert';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
	useEffect(() => {
		getProfiles();
	}, [getProfiles]);

	return loading ? (
		<Spinner />
	) : (
		<div className='container'>
			<Alert />
			<h1 className='large text-primary'>Developers</h1>
			<p className='lead'>
				<i className='fab fa-connectdevelop'></i> Browse and connect with
				developers
			</p>

			<div className='profiles'>
				{profiles.length > 0 ? (
					profiles.map((profile) => (
						<ProfileItem key={profile._id} profile={profile} />
					))
				) : (
					<h4> No Profiles Found...</h4>
				)}
			</div>
		</div>
	);
};

Profiles.propTypes = {
	getProfiles: PropTypes.func.isRequired,
	profile: PropTypes.object,
};

const mapStateToProps = (state) => ({
	profile: state.profileReducer,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
