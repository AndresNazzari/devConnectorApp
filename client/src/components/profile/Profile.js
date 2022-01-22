import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profiles';
import Spinner from '../layout/Spinner';
import Alert from '../layout/Alert';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGitHub from './ProfileGitHub';
const Profile = ({ getProfileById, profile: { profile, loading }, auth }) => {
	const { id } = useParams();

	useEffect(() => {
		getProfileById(id);
	}, [getProfileById, id]);

	return profile == null || loading ? (
		<Spinner />
	) : (
		<div className='container'>
			<Alert />
			<Link to='/profiles' className='btn btn-light'>
				Back To Profiles
			</Link>
			{auth.isAuthenticated &&
				auth.loading === false &&
				auth.user._id === profile.user._id && (
					<Link to='/edit-profile' className='btn btn-dark'>
						Edit Profile
					</Link>
				)}
			<div className='profile-grid my-1'>
				<ProfileTop profile={profile} />
				<ProfileAbout profile={profile} />
				<div className='profile-exp bg-white p-2'>
					<h2 className='text-primary'>Experience</h2>
					{profile.experience.length > 0 ? (
						<>
							{profile.experience.map((experince) => (
								<ProfileExperience key={experince._id} experince={experince} />
							))}
						</>
					) : (
						<h4> No Experience credentials </h4>
					)}
				</div>
				<div className='profile-edu bg-white p-2'>
					<h2 className='text-primary'>Education</h2>
					{profile.education.length > 0 ? (
						<>
							{profile.education.map((education) => (
								<ProfileEducation key={education._id} education={education} />
							))}
						</>
					) : (
						<h4> No Education credentials </h4>
					)}
				</div>

				{profile.githubusername && (
					<ProfileGitHub username={profile.githubusername} />
				)}
			</div>
		</div>
	);
};

Profile.propTypes = {
	getProfileById: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profileReducer,
	auth: state.authReducer,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
