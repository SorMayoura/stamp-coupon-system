import { PortableTextBlock } from "sanity";

export type Author = {
  name: string;
  image: string;
  slug: any;
  bio?: string;
  _id?: number | string;
  _ref?: number | string;
};

export type Blog = {
  _id: number;
  title: string;
  slug: any;
  category?: string;
  metadata?: string;
  body?: PortableTextBlock[];
  mainImage?: any;
  author?: Author;
  tags?: string[];
  publishedAt?: string;
};

// export type BlogTwo = {
//   id: number;
//   title: string;
//   paragraph: string;
//   image: string;
//   tags: string[];
//   publishDate: string;
// };
