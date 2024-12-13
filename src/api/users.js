import { client } from "@/utils/http";

export const getUser = async (email) => {
  const response = await client.get(`/users?email=${email}`);

  return response.data;
};

export const registerUser = async ({ name, email }) => {
  const response = await client.post(`/users`, { name, email });

  return response.data;
};
