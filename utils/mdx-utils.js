/**
 * Utilities for handling blog posts written in MDX format.
 * These functions provide file system operations for reading, sorting,
 * and transforming MDX files into usable data within a Next.js application.
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import rehypePrism from '@mapbox/rehype-prism';
import remarkGfm from 'remark-gfm';

/**
 * Path to the posts directory.
 */
export const POSTS_PATH = path.join(process.cwd(), 'posts');

/**
 * Retrieves the file paths of all MDX files in the `POSTS_PATH` directory.
 *
 * @returns {string[]} List of file paths for MDX files.
 */
export const getPostFilePaths = () => {
  return fs.readdirSync(POSTS_PATH)
    // Only include md(x) files
    .filter((path) => /\.mdx?$/.test(path));
};

/**
 * Sorts an array of posts by their date in descending order.
 *
 * @param {Object[]} posts - Array of post objects with `data.date` properties.
 * @returns {Object[]} Sorted array of posts.
 */
export const sortPostsByDate = (posts) => {
  return posts.sort((a, b) => {
    const aDate = new Date(a.data.date);
    const bDate = new Date(b.data.date);
    return bDate - aDate;
  });
};

/**
 * Retrieves all posts from the `POSTS_PATH` directory, sorted by date.
 *
 * @returns {Object[]} Array of posts, each containing content, metadata, and file path.
 */
export const getPosts = () => {
  let posts = getPostFilePaths().map((filePath) => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
    const { content, data } = matter(source);

    return {
      content,
      data,
      filePath,
    };
  });

  posts = sortPostsByDate(posts);

  return posts;
};

/**
 * Retrieves a specific post by its slug.
 *
 * @param {string} slug - The slug of the post.
 * @returns {Promise<Object>} The post's MDX source, metadata, and file path.
 */
export const getPostBySlug = async (slug) => {
  const postFilePath = path.join(POSTS_PATH, `${slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypePrism],
    },
    scope: data,
  });

  return { mdxSource, data, postFilePath };
};

/**
 * Retrieves the next post relative to the given slug.
 *
 * @param {string} slug - The slug of the current post.
 * @returns {Object|null} The next post's title and slug, or null if none exist.
 */
export const getNextPostBySlug = (slug) => {
  const posts = getPosts();
  const currentFileName = `${slug}.mdx`;
  const currentPost = posts.find((post) => post.filePath === currentFileName);
  const currentPostIndex = posts.indexOf(currentPost);

  const post = posts[currentPostIndex - 1];
  if (!post) return null;

  const nextPostSlug = post?.filePath.replace(/\.mdx?$/, '');

  return {
    title: post.data.title,
    slug: nextPostSlug,
  };
};

/**
 * Retrieves the previous post relative to the given slug.
 *
 * @param {string} slug - The slug of the current post.
 * @returns {Object|null} The previous post's title and slug, or null if none exist.
 */
export const getPreviousPostBySlug = (slug) => {
  const posts = getPosts();
  const currentFileName = `${slug}.mdx`;
  const currentPost = posts.find((post) => post.filePath === currentFileName);
  const currentPostIndex = posts.indexOf(currentPost);

  const post = posts[currentPostIndex + 1];
  if (!post) return null;

  const previousPostSlug = post?.filePath.replace(/\.mdx?$/, '');

  return {
    title: post.data.title,
    slug: previousPostSlug,
  };
};
