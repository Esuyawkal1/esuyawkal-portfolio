// @flow strict
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import BlogCard from './blog-card';

function Blog({ blogs }) {
  return (
    <div id='blogs' className="relative z-10 border-t my-12 lg:my-24 border-[#1b2c68]">
      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-16 h-[2px] bg-[#1b2c68]"></span>
          <span className="bg-[#101735] text-[#f43f5e] font-bold font-mono px-6 py-2.5 text-lg sm:text-xl rounded-xl shadow-[0_0_15px_rgba(244,63,94,0.15)]">
            BLOGS
          </span>
          <span className="w-16 h-[2px] bg-[#1b2c68]"></span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 lg:gap-8 xl:gap-10">
        {
          blogs.slice(0, 6).map((blog, i) => (
            blog?.cover_image &&
            <BlogCard blog={blog} key={i} />
          ))
        }
      </div>

      <div className="flex justify-center mt-6 lg:mt-12">
        <Link
          className="flex items-center gap-2 hover:gap-3 rounded-full bg-[#101735] text-white border border-[#38bdf8]/40 hover:border-[#38bdf8] hover:bg-[#16214c] px-6 sm:px-8 py-3 sm:py-3.5 text-center text-xs sm:text-sm font-semibold uppercase tracking-wider no-underline transition-all duration-200 shadow-[0_0_15px_rgba(56,189,248,0.15)] hover:scale-105 active:scale-95"
          role="button"
          href="/blog"
        >
          <span>View More</span>
          <FaArrowRight size={16} className="text-[#38bdf8]" />
        </Link>
      </div>
    </div>
  );
};

export default Blog;