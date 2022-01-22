import spinner from '../../img/spinner-icon-gif.jpg';

const Spinner = () => {
	return (
		<div className='container'>
			<img
				src={spinner}
				alt='Loading...'
				style={{ width: '200px', margin: 'auto', display: 'block' }}
			/>
		</div>
	);
};

export default Spinner;
