import { Card, CardContent } from "./ui/card"
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { AvatarFallback } from "./ui/avatar";

type Comment = {
  id: string;
  content: string;
  createdAt: Date;
  user: {
    name: string | null;
    image: string | null;
  };
};

export default function CommentList({comments} : {comments : Comment[]}) {
    if(comments.length === 0) {
        return (
            <p className="text-muted-foreground text-center py-8">
                No comments yet. Be the first to leave one!
            </p>
        )
    }
    return (
    <div className="flex flex-col gap-4">
      {comments.map((comment) => (
        <Card key={comment.id}>
          <CardContent>
            <div className="flex items-center gap-2 mb-2">
              <Avatar className="w-6 h-6">
                <AvatarImage
                  src={comment.user.image || ""}
                  alt={comment.user.name || "User"}
                />
                <AvatarFallback>{comment.user.name?.[0] || "U"}</AvatarFallback>
              </Avatar>
              <span className="font-medium text-sm">
                {comment.user.name || "Anonymous"}
              </span>
              <span className="text-muted-foreground text-xs">
                {new Date(comment.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-sm">{comment.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}