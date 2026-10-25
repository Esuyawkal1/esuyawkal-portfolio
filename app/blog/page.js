// @flow strict

import { personalData } from "@/utils/data/personal-data";
import BlogCard from "../components/homepage/blog/blog-card";

async function getBlogs() {
  try {
    const res = await fetch(`https://dev.to/api/articles?username=${personalData.devUsername}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.warn('Could not fetch dev.to articles during build, using fallback:', error.message);
    return [];
  }
};

async function page() {
  const blogs = await getBlogs();

  return (
    <div className="py-8">
      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-16 h-[2px] bg-[#1b2c68]"></span>
          <span className="bg-[#101735] border border-[#f43f5e]/40 text-[#f43f5e] font-bold font-mono px-6 py-2.5 text-lg sm:text-xl rounded-xl shadow-[0_0_15px_rgba(244,63,94,0.15)]">
            ALL BLOGS
          </span>
          <span className="w-16 h-[2px] bg-[#1b2c68]"></span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 lg:gap-8 xl:gap-10">
        {
          blogs.map((blog, i) => (
            blog?.cover_image &&
            <BlogCard blog={blog} key={i} priority={i < 3} />
          ))
        }
      </div>
    </div>
  );
};

export default page;