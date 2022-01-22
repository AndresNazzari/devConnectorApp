import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom';
import { useEffect } from 'react';

const PrivateRoute = ({ auth: { isAuthenticated, loading } }) => {
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthenticated && !loading) {
			return <>{navigate('/login')}</>;
		}
	});

	return <Outlet />;
};

PrivateRoute.propTypes = {
	auth: PropTypes.object,
};

const mapStatetoProps = (state) => ({
	auth: state.authReducer,
});

export default connect(mapStatetoProps)(PrivateRoute);
