/**
 * Retrieves global data for the blog, using environment variables if available,
 * or default values otherwise. This function is useful for dynamically configuring
 * blog metadata based on the environment.
 *
 * @returns {Object} An object containing:
 *  - `name` (string): The name of the blog owner, retrieved from the `BLOG_NAME` environment variable,
 *    or defaulting to "Jay Doe".
 *  - `blogTitle` (string): The title of the blog, retrieved from the `BLOG_TITLE` environment variable,
 *    or defaulting to "Next.js Blog Theme".
 *  - `footerText` (string): The footer text of the blog, retrieved from the `BLOG_FOOTER_TEXT` environment variable,
 *    or defaulting to "All rights reserved.".
 *
 * Example usage:
 * ```javascript
 * import { getGlobalData } from './path-to-file';
 *
 * const globalData = getGlobalData();
 * console.log(globalData);
 * // Output:
 * // {
 * //   name: 'Jay Doe',
 * //   blogTitle: 'Next.js Blog Theme',
 * //   footerText: 'All rights reserved.'
 * // }
 * ```
 */
export const getGlobalData = () => {
  const name = process.env.BLOG_NAME
    ? decodeURI(process.env.BLOG_NAME)
    : 'Jay Doe';
  const blogTitle = process.env.BLOG_TITLE
    ? decodeURI(process.env.BLOG_TITLE)
    : 'Next.js Blog Theme';
  const footerText = process.env.BLOG_FOOTER_TEXT
    ? decodeURI(process.env.BLOG_FOOTER_TEXT)
    : 'All rights reserved.';

  return {
    name,
    blogTitle,
    footerText,
  };
};
