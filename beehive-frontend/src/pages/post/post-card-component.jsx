import {
  Avatar,
  AvatarFallback,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui";
import { getRelativeDate } from "@/utils/get-relative-date";
import { Heart, MessageSquareIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { downvoteAPost, upvoteAPost } from "./post-card-helper";

export function PostCardComponent({ post, className, lineClamp }) {
  const navigate = useNavigate();
  const [numOfLikes, setNumOfLikes] = useState(post.numberOfLikes);
  const [fillColor, setFillColor] = useState(
    post.postLikedByCurrentUser ? "crimson" : "none",
  );
  const username = localStorage.getItem("username");

  const onLikeButtonPress = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (!post.postLikedByCurrentUser) {
        await upvoteAPost(post.postId, username).then((res) => {
          if (res.statusMessage === "SUCCESS") {
            post.postLikedByCurrentUser = !post.postLikedByCurrentUser;
            setFillColor("crimson");
            setNumOfLikes(numOfLikes + 1);
          }
        });
      } else {
        if (numOfLikes > 0) {
          await downvoteAPost(post.postId, username).then((res) => {
            if (res.statusMessage === "SUCCESS") {
              post.postLikedByCurrentUser = !post.postLikedByCurrentUser;
              setFillColor("none");
              setNumOfLikes(numOfLikes - 1);
            }
          });
        }
      }
    } catch (e) {
      toast.error("An Error Occured");
      console.error("Error in post-card-component", e);
    }
  };

  return (
    <Card className={`inline-flex w-full px-0 py-4 ${className}`}>
      <div className="grid grid-rows-2 place-items-start gap-0 py-0 pl-4 pr-0">
        <div>
          <Avatar className="rounded-md border-2">
            <AvatarFallback className="rounded-md bg-secondary/[50%] font-mono">
              {post.postedBy.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="w-full flex-initial">
        <CardHeader className="py-0 pl-4 pr-10">
          <div className="grid grid-cols-2 gap-0">
            <div>
              <p className="text-foreground/[65%]">{post.postedBy}</p>
            </div>
            <div className="place-self-end">
              <CardDescription className="text-right">
                {getRelativeDate(post.postedOn)}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="py-1 pl-4 pr-10">
          <h4 className="font-bold">{post.postTitle}</h4>
        </CardContent>
        <CardContent className={`py-1 pl-4 pr-10 ${lineClamp}`}>
          <p>{post.postBody}</p>
        </CardContent>
        <CardFooter className="grid grid-cols-2 px-4 pb-0 pt-2">
          <div className="inline-flex gap-6">
            <Button
              variant="secondary"
              onClick={onLikeButtonPress}
              className="inline-flex h-8 items-center gap-2 border pl-2 pr-3"
            >
              <Heart
                size={20}
                color={fillColor !== "none" ? fillColor : "currentColor"}
                fill={fillColor}
                strokeWidth={3}
              />
              <p className="text-center">{numOfLikes}</p>
            </Button>
            <Button
              variant="secondary"
              className="inline-flex h-8 items-center gap-2 border pl-2 pr-3"
              onClick={(e) => {
                e.preventDefault();
                navigate(`/${post.postedBy}/post/${post.postId}`, {
                  replace: true,
                });
              }}
            >
              <MessageSquareIcon strokeWidth={3} size={20} />
              <p className="text-center">{post.numberOfReplies}</p>
            </Button>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}
