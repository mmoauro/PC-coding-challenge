interface Props {
  post: {
    created_at: string;
    text: string | null;
    image_src: string | null;
    post_comments: {
      text: string | null;
      created_at: string;
      image_src: string | null;
    }[];
    user: {
      username: string;
      avatar_url: string | null;
    } | null;
  };
}

export default function Post({ post }: Readonly<Props>) {
  return (
    <div className="">
      <div className="flex flex-col bg-transparent p-4 border-t border-gray-600">
        <div className="flex items-center">
          <img
            src={
              post.user?.avatar_url ||
              "https://www.automoli.com/common/vehicles/_assets/img/gallery/f35/volkswagen-passat-b6.jpg"
            }
            alt="avatar"
            height={20}
            width={20}
            className="w-8 h-8 rounded-full"
          />
          <p className=" ml-2">{post.user?.username}</p>
        </div>
        <div className="px-8">
          <p className=" mt-4">{post.text}</p>
          {post.image_src && (
            <img
              src={
                "https://www.automoli.com/common/vehicles/_assets/img/gallery/f35/volkswagen-passat-b6.jpg"
              }
              alt="post"
              className="w-full h-64 object-cover mt-4"
            />
          )}
        </div>
        {post.post_comments.map((comment, index) => (
          <div key={index} className="flex items-center mt-2">
            <img
              src={post.user?.avatar_url || "/avatar.png"}
              alt="avatar"
              className="w-8 h-8 rounded-full"
            />
            <p className="text-black ml-2">{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
