import { client } from "@/utils/http";

export const getUserPosts = async (userId) => {
  const response = await client.get(`/posts?userId=${userId}`);

  return response.data;
};
