import { useEffect, useState } from 'react';
import { IoMailOutline } from 'react-icons/io5';
import { RxTwitterLogo } from 'react-icons/rx';
import { Link, useParams } from 'react-router-dom';

const BlogsDetails = () => {

     const { id } = useParams();

  const [blogs, setBlogs] = useState([]);
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  // ===============================
  // Fetch Blogs
  // ===============================
  useEffect(() => {
    fetch("/blogs.json")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);

        const foundBlog = data.find(
          (item) => item._id === id
        );

        setBlog(foundBlog);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Blog loading error:", error);
        setLoading(false);
      });
  }, [id]);

  // ===============================
  // Loading State
  // ===============================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>

          <p className="mt-4 text-slate-500">
            Loading blog...
          </p>
        </div>
      </div>
    );
  }

  // ===============================
  // Blog Not Found
  // ===============================
  if (!blog) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-5">

        <div className="bg-white rounded-2xl shadow-md p-10 text-center max-w-md">

          <div className="text-6xl mb-5">
            🦷
          </div>

          <h2 className="text-3xl font-bold text-slate-800">
            Blog Not Found
          </h2>

          <p className="text-slate-500 mt-3 leading-7">
            Sorry, the blog you are looking for could not be found.
          </p>

          <Link
            to="/blogs"
            className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            ← Back to Blogs
          </Link>

        </div>

      </div>
    );
  }

  // ===============================
  // Related Blogs
  // ===============================

  const relatedBlogs = blogs
    .filter((item) => item._id !== blog._id)
    .slice(0, 3);


    return (
          <div className="bg-slate-50 min-h-screen">

      {/* =====================================================
          BREADCRUMB
      ====================================================== */}

      <div className="max-w-7xl mx-auto px-5 pt-8">

        <div className="flex flex-wrap items-center gap-2 text-sm">

          <Link
            to="/"
            className="text-slate-500 hover:text-blue-600 transition"
          >
            🏠 Home
          </Link>

          <span className="text-slate-400">
            ›
          </span>

          <Link
            to="/blogs"
            className="text-slate-500 hover:text-blue-600 transition"
          >
            Blogs
          </Link>

          <span className="text-slate-400">
            ›
          </span>

          <span className="text-slate-700 line-clamp-1">
            {blog.blogTitle}
          </span>

        </div>

      </div>


      {/* =====================================================
          MAIN SECTION
      ====================================================== */}

      <section className="max-w-7xl mx-auto px-5 py-8">

        <div className="grid lg:grid-cols-3 gap-8">

          {/* =================================================
              LEFT - BLOG ARTICLE
          ================================================== */}

          <article className="lg:col-span-2 bg-white rounded-2xl shadow-sm overflow-hidden">

            {/* -----------------------------------------------
                BLOG HEADER
            ------------------------------------------------ */}

            <div className="p-6 md:p-8 lg:p-10">

              {/* Category */}

              <span className="inline-block bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide">
                {blog.category}
              </span>


              {/* Blog Title */}

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 leading-tight mt-5">
                {blog.blogTitle}
              </h1>


              {/* Author / Date / Read Time */}

              <div className="flex flex-wrap items-center gap-x-6 gap-y-4 mt-7">

                {/* Author */}

                <div className="flex items-center gap-3">

                  <img
                    src={blog.authorImg}
                    alt={blog.author}
                    className="w-11 h-11 rounded-full object-cover border-2 border-blue-100"
                  />

                  <div>

                    <p className="text-sm font-semibold text-slate-800">
                      {blog.author}
                    </p>

                    <p className="text-xs text-slate-500">
                      Dental Professional
                    </p>

                  </div>

                </div>


                {/* Date */}

                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <span>📅</span>
                  <span>{blog.date}</span>
                </div>


                {/* Read Time */}

                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <span>◷</span>
                  <span>{blog.readTime}</span>
                </div>

              </div>

            </div>


            {/* =================================================
                FEATURED IMAGE
            ================================================== */}

            <div className="px-5 md:px-8 lg:px-8">

              <img
                src={blog.blogImage}
                alt={blog.blogTitle}
                className="w-full h-[280px] md:h-[420px] lg:h-[500px] object-cover rounded-xl"
              />

            </div>


            {/* =================================================
                BLOG CONTENT
            ================================================== */}

            <div className="p-6 md:p-8 lg:p-10">


              {/* -----------------------------------------------
                  INTRODUCTION
              ------------------------------------------------ */}

              <p className="text-base md:text-lg text-slate-600 leading-8">
                {blog.blogDetails}
              </p>


              {/* =================================================
                  WHY IMPORTANT
              ================================================== */}

              <div className="mt-10">

                <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
                  Why Is This Important?
                </h2>

                <p className="text-slate-600 leading-8 mt-4">
                  Taking care of your oral health should be an important
                  part of your everyday routine. Regular dental care can
                  help identify potential problems early and support
                  healthy teeth and gums. Maintaining good oral hygiene
                  also helps you enjoy a confident and beautiful smile
                  for many years.
                </p>

              </div>


              {/* =================================================
                  BENEFITS
              ================================================== */}

              <div className="mt-10">

                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-7">
                  Benefits of Regular Dental Care
                </h2>


                <div className="space-y-5">

                  {blog.highlights &&
                    blog.highlights.map((highlight, index) => (

                      <div
                        key={index}
                        className="flex items-start gap-4"
                      >

                        {/* Icon */}

                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-xl">
                          🦷
                        </div>


                        {/* Content */}

                        <div>

                          <h3 className="font-bold text-slate-800">
                            {highlight}
                          </h3>

                          <p className="text-sm md:text-base text-slate-600 leading-7 mt-1">
                            Professional dental care can help maintain
                            healthy teeth and gums while reducing the
                            risk of future oral health problems.
                          </p>

                        </div>

                      </div>

                    ))}

                </div>

              </div>


              {/* =================================================
                  CONCLUSION
              ================================================== */}

              <div className="mt-10">

                <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
                  Conclusion
                </h2>

                <p className="text-slate-600 leading-8 mt-4">
                  Maintaining good dental health is an investment in
                  your overall well-being and confidence. By following
                  healthy oral hygiene habits and visiting your dentist
                  regularly, you can protect your smile and enjoy better
                  oral health for years to come.
                </p>

              </div>


              {/* =================================================
                  TAGS
              ================================================== */}

                <div className="mt-10 pt-8 border-t border-slate-200">

                <div className="flex flex-wrap items-center gap-3">

                  <span className="font-bold text-slate-800">
                    Tags:
                  </span>

                  {blog.tags &&
                    blog.tags.map((tag, index) => (

                      <span
                        key={index}
                        className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-xs md:text-sm"
                      >
                        {tag}
                      </span>

                    ))}

                </div>

              </div>

              {/* =================================================
                  SHARE + BACK
              ================================================== */}

              <div className="mt-7 flex flex-col md:flex-row md:items-center justify-between gap-5">

                {/* Share */}

                <div className="flex items-center gap-3">

                  <span className="font-semibold text-slate-700">
                    Share this article:
                  </span>

                  <button
                    className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center hover:bg-blue-600 hover:text-white transition"
                    title="Facebook"
                  >
                    f
                  </button>

                  <button
                    className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center hover:bg-blue-400 hover:text-white transition"
                    title="Twitter"
                  >
                    <RxTwitterLogo></RxTwitterLogo>
                  </button>

                  <button
                    className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center hover:bg-blue-600 hover:text-white transition"
                    title="LinkedIn"
                  >
                    in
                  </button>

                  <button
                    className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center hover:bg-red-500 hover:text-white transition"
                    title="Pinterest"
                  >
                    <IoMailOutline></IoMailOutline>
                  </button>

                </div>


                {/* Back Button */}

                <Link
                  to="/blogs"
                  className="inline-flex items-center justify-center gap-2 border border-blue-600 text-blue-600 px-5 py-3 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition"
                >
                  ← Back to Blogs
                </Link>

              </div>

            </div>

          </article>


          {/* =================================================
              RIGHT SIDEBAR
          ================================================== */}

          <aside className="space-y-7">


            {/* =================================================
                ABOUT AUTHOR
            ================================================== */}

            <div className="bg-white rounded-2xl shadow-sm p-6">

              <h2 className="text-xl font-bold text-slate-800 mb-6">
                About the Author
              </h2>


              <div className="flex items-center gap-4">

                <img
                  src={blog.authorImg}
                  alt={blog.author}
                  className="w-20 h-20 rounded-full object-cover border-4 border-blue-50"
                />

                <div>

                  <h3 className="text-lg font-bold text-slate-800">
                    {blog.author}
                  </h3>

                  <p className="text-blue-600 text-sm mt-1">
                    Dental Surgeon
                  </p>

                </div>

              </div>


              <p className="text-sm text-slate-600 leading-7 mt-5">
                {blog.author} is a passionate dental professional
                dedicated to providing quality dental care and helping
                patients maintain healthy and confident smiles.
              </p>


              {/* Social Icons */}

              <div className="flex gap-3 mt-5">

                <button className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition">
                  f
                </button>

                <button className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition">
                  in
                </button>

                <button className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition">
                  <RxTwitterLogo></RxTwitterLogo>
                </button>

              </div>

            </div>


            {/* =================================================
                RELATED BLOGS
            ================================================== */}

            <div className="bg-white rounded-2xl shadow-sm p-6">

              <div className="flex items-center justify-between mb-6">

                <h2 className="text-xl font-bold text-slate-800">
                  Related Blogs
                </h2>

                <Link
                  to="/blogs"
                  className="text-sm text-blue-600 font-semibold hover:text-blue-800"
                >
                  View All
                </Link>

              </div>


              <div className="space-y-5">

                {relatedBlogs.map((relatedBlog) => (

                  <Link
                    key={relatedBlog._id}
                    to={`/blog/${relatedBlog._id}`}
                    className="flex gap-4 group"
                  >

                    {/* Image */}

                    <img
                      src={relatedBlog.blogImage}
                      alt={relatedBlog.blogTitle}
                      className="w-20 h-20 flex rounded-xl object-cover"
                    />


                    {/* Content */}

                    <div>

                      <span className="text-[10px] uppercase font-bold text-blue-600">
                        {relatedBlog.category}
                      </span>

                      <h3 className="text-sm font-bold text-slate-800 leading-5 mt-1 line-clamp-2 group-hover:text-blue-600 transition">
                        {relatedBlog.blogTitle}
                      </h3>

                      <p className="text-xs text-slate-500 mt-2">
                        {relatedBlog.date}
                      </p>

                    </div>

                  </Link>

                ))}

              </div>

            </div>


            {/* =================================================
                APPOINTMENT CTA
            ================================================== */}

            <div className="bg-blue-50 rounded-2xl p-7 text-center">

              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto text-3xl shadow-sm">
                📅
              </div>


              <h2 className="text-2xl font-bold text-slate-800 mt-5">
                Need a Dental Checkup?
              </h2>


              <p className="text-slate-600 text-sm leading-6 mt-3">
                Book an appointment today and take the first step
                toward a healthier and brighter smile.
              </p>


              <Link
                to="/appointment"
                className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                Book Appointment
              </Link>

            </div>

          </aside>

        </div>

      </section>


      {/* =====================================================
          YOU MAY ALSO LIKE
      ====================================================== */}

      <section className="max-w-7xl mx-auto px-5 pb-16">

        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">

          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 text-center mb-8">
            You May Also Like
          </h2>


          <div className="grid md:grid-cols-3 gap-6">

            {relatedBlogs.map((item) => (

              <Link
                key={item._id}
                to={`/blogsdetails/${item._id}`}
                className="group border border-slate-100 rounded-xl overflow-hidden hover:shadow-lg transition duration-300"
              >

                {/* Image */}

                <div className="overflow-hidden">

                  <img
                    src={item.blogImage}
                    alt={item.blogTitle}
                    className="w-full h-48 object-cover group-hover:scale-105 transition duration-500"
                  />

                </div>


                {/* Content */}

                <div className="p-5">

                  <span className="text-xs uppercase font-bold text-blue-600">
                    {item.category}
                  </span>


                  <h3 className="text-lg font-bold text-slate-800 leading-6 mt-2 line-clamp-2 group-hover:text-blue-600 transition">
                    {item.blogTitle}
                  </h3>


                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-4">

                    <span>
                      📅 {item.date}
                    </span>

                    <span>
                      ◷ {item.readTime}
                    </span>

                  </div>

                </div>

              </Link>

            ))}

          </div>

        </div>

      </section>

    </div>
    );
};

export default BlogsDetails;