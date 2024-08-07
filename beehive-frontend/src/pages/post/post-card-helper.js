import { POST_BASE } from "@/constants/endpoints";
import { HttpGet, HttpPost } from "@/utils/api-service";

export const fetchPostById = async (postId, username) => {
  let apiUrl = `${POST_BASE}`;
  let response = {};
  let parameters = {
    postId: postId,
    username: username,
  };
  try {
    response = await HttpGet(apiUrl, parameters, {});
  } catch (error) {
    console.error(error);
  }
  return response.data;
};

export const upvoteAPost = async (postId, username) => {
  let apiUrl = `${POST_BASE}/${postId}/like?username=${username}`;
  let response = {};
  try {
    response = await HttpPost(apiUrl, {}, {});
  } catch (error) {
    console.error(error);
  }
  return response.data;
};

export const downvoteAPost = async (postId, username) => {
  let apiUrl = `${POST_BASE}/${postId}/unlike?username=${username}`;
  let response = {};
  try {
    response = await HttpPost(apiUrl, {}, {});
  } catch (error) {
    console.error(error);
  }
  return response.data;
};
