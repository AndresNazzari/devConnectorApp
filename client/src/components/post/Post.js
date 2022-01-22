import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import Alert from '../layout/Alert';
import { getPost } from '../../actions/post';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = ({ getPost, post: { post, loading } }) => {
	const { id } = useParams();

	useEffect(() => {
		getPost(id);
	}, [getPost, id]);

	return post == null || loading ? (
		<Spinner />
	) : (
		<section className='container'>
			<Alert />
			<Link to='/posts' className='btn'>
				Back To Posts
			</Link>
			<PostItem post={post} showActions={false} />
			<CommentForm postId={post._id} />
			{post.comments &&
				post.comments.length > 0 &&
				post.comments.map((comment) => (
					<CommentItem key={comment._id} comment={comment} postId={post._id} />
				))}
		</section>
	);
};

Post.propTypes = {
	getPost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	post: state.postReducer,
});

export default connect(mapStateToProps, { getPost })(Post);
