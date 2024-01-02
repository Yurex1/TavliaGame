import API_URL from "@/constants";
import { User } from "@/types/types";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

const login = async (user: User) => {
  return await axios.post(API_URL + "auth/login", user, {withCredentials: true});
};

const useLogin = ({setError, setShowAuth }: {setError: (error: string) => void, setShowAuth: (showAuth: boolean) => void}) => {
  const queryClient = useQueryClient();
  return useMutation(login, {
    onSuccess: (data) => {
      localStorage.setItem("token", data.data);
      setError("");
      setShowAuth(false);
      queryClient.invalidateQueries(["user"]);
    },
    onError: () => {
      setError("incorect username or password");  
    }
  });
};

export default useLogin;
