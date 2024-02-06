import API_URL from "@/constants";
import { User } from "@/types/types";
import axios, { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";

interface CustomError {
  response?: {
    status?: number;
  };
}

const login = async (user: User) => {
  return await axios.post(API_URL + "auth/login", user, {withCredentials: true});
};

const useLogin = ({setError, setShowAuth }: {setError: (error: number) => void, setShowAuth: (showAuth: boolean) => void}) => {
  const queryClient = useQueryClient();
  return useMutation(login, {
    onSuccess: (data) => {
      localStorage.setItem("token", data.data);
      setError(-1);
      setShowAuth(false);
      queryClient.invalidateQueries(["user"]);
    },
    onError: (error : AxiosError<CustomError>) => {
      if(error.response?.status)
      {
        console.log(error.response?.status);
      }
    }
  });
};

export default useLogin;
