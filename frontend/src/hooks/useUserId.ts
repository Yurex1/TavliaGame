import API_URL from "@/constants";
import axios from "axios";
import { useQuery } from "react-query";

const getUserId = async (id: number) => {
  if (localStorage.getItem("token") === null) return null;
  return await axios.get(API_URL + "auth/" + id.toString(), {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")?.toString(),
    },
  });
};

const useUserId = (id: number | null) => {
  if (id)
    return useQuery(["userId:" + id.toString()], () => {
      getUserId(id);
    });
  return null;
};

export default useUserId;
