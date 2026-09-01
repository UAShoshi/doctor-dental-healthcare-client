import { Link } from 'react-router-dom';
import ErrorImg from '../../assets/author/error-img.jpg';

const ErrorPage = () => {
    return (
        <div>
            <section className="flex items-center h-full p-16">
	<div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
		<div className="max-w-md text-center">
			<img src={ErrorImg} alt="" />
			{/* <h2 className="mb-8 font-extrabold text-9xl">
				<span className="sr-only">Error</span>404
			</h2> */}
			<p className="text-2xl font-semibold md:text-3xl">Sorry, we couldn't find this page.</p>
			<p className="mt-4 mb-8">But dont worry, you can find plenty of other things on our homepage.</p>
			<button className='px-8 py-3 font-semibold rounded '><Link
                  to="/"
                  className="inline-flex items-center justify-center gap-2 border border-blue-600 text-blue-600 px-5 py-3 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition"
                >
                  ← Back to homepage
                </Link></button>
		</div>
	</div>
</section>
        </div>
    );
};

export default ErrorPage;