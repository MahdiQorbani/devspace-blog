import React from "react";
import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Layout from "@/components/Layout";
import Post from "@/components/Post";
import CategoryList from "@/components/CategoryList";
import { getPosts } from "@/lib/posts";

export default function CategoryBlogPage({ posts, category_name, categories }) {
  return (
    <Layout>
      <div className="flex justify-between">
        <div className="w-3/4 mr-10">
          <h1 className="text-5xl border-b-4 p-5 font-bold">
            {category_name} Posts
          </h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post, index) => (
              <Post key={index} post={post} />
            ))}
          </div>
          <Link
            href="/blog"
            className="block text-center border border-gray-500 text-gray-800 rounded-md py-4 my-5 transition duration-500 easw select-none hover:text-white hover:bg-gray-900 focus:outline-none focus:shadow-outline w-full"
          >
            All Posts
          </Link>
        </div>

        <div className="w-1/4">
          <CategoryList categories={categories} />
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts"));

  const categories = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );

    const { data: frontmatter } = matter(markdownWithMeta);

    return frontmatter.category.toLowerCase();
  });

  const paths = categories.map((category) => ({
    params: { category_name: category },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { category_name } }) {
  const posts = getPosts();

  //get categories for sidebar

  const categories = [
    ...new Set(posts.map((post) => post.frontmatter.category)),
  ];

  //filter post by category
  const categoryPosts = posts.filter(
    (post) => post.frontmatter.category.toLowerCase() === category_name
  );

  return {
    props: { posts: categoryPosts, category_name, categories },
  };
}
