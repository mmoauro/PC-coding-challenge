import { Comment as CommentModel } from "@/app/models/Post";
import { timeAgo } from "@/app/utils/TimeUtils";
import Avatar from "../../icons/Avatar";
import Img from "../../Image";

interface Props {
  comment: CommentModel;
}

export default function Comment({ comment }: Readonly<Props>) {
  return (
    <div className="mt-2 flex">
      <Avatar
        className="w-6 h-6"
        url={comment.user?.avatar_url}
        username={comment.user?.username}
      />
      <div className="flex-col ml-2 w-full">
        <div className="flex">
          <p className="font-semibold">{comment.user?.username}</p>
          <p className="ml-4 text-gray-600">{timeAgo(comment.created_at)}</p>
        </div>
        <p className="text-text-primary break-words">{comment.text}</p>
        {comment.image_src && (
          <Img src={comment.image_src} alt="Comment image" />
        )}
      </div>
    </div>
  );
}
