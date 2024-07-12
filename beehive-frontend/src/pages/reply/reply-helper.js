import { POST_BASE, REPLY_TO_POST } from "@/constants/endpoints";
import { HttpGet, HttpPost } from "@/utils/api-service";

export const fetchAllReplies = async (postId, pageNumber = 0) => {
  let apiUrl = `${POST_BASE}/${postId}/replies`;
  let parameters = {
    pageNumber: pageNumber,
  };
  let response = await HttpGet(apiUrl, parameters, {});
  return response.data;
};

export const replyToPost = async (postId, replyBody, repliedBy) => {
  let apiUrl = REPLY_TO_POST;
  let reply = {
    postId: postId,
    replyBody: replyBody,
    repliedBy: repliedBy,
  };
  let response = await HttpPost(apiUrl, { reply: reply }, {});
  return response.data;
};
