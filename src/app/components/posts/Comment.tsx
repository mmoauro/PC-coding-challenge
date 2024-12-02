import { timeAgo } from "@/app/utils/TimeUtils";

interface Props {
  comment: {
    text: string | null;
    created_at: string;
    image_src: string | null;
    user: {
      username: string;
      avatar_url: string | null;
    } | null;
  };
}

export default function Comment({ comment }: Readonly<Props>) {
  return (
    <div className="mt-2 flex">
      <img
        src={comment.user?.avatar_url || ""}
        alt="avatar"
        className="w-6 h-6 rounded-full"
      />
      <div className="flex-col ml-2">
        <div className="flex">
          <p className="font-semibold">{comment.user?.username}</p>
          <p className="ml-4 text-gray-600">{timeAgo(comment.created_at)}</p>
        </div>
        <p className="text-text-primary">{comment.text}</p>
        {comment.image_src && (
          <img src={comment.image_src} className="rounded-lg" />
        )}
      </div>
    </div>
  );
}
