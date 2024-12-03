export interface Post {
  created_at: string;
  text: string | null;
  image_src: string | null;
  external_id: string;
  post_comments: Comment[];
  user: {
    username: string;
    avatar_url: string | null;
  } | null;
}

export interface Comment {
  text: string | null;
  created_at: string;
  image_src: string | null;
  user: {
    username: string;
    avatar_url: string | null;
  } | null;
}
