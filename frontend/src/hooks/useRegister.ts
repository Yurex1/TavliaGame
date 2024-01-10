import API_URL from "@/constants";
import { User } from "@/types/types";
import axios, { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";

interface CustomError {
  response?: {
    status?: number;
  };
}

const register = async (user: User) => {
  return await axios.post(API_URL +  "auth/create-user", user, {withCredentials: true});
};

const useRegister = ({setError, setShowAuth }: {setError: (error: number) => void, setShowAuth: (showAuth: boolean) => void}) => {
  const queryClient = useQueryClient();
  return useMutation(register, {
    onSuccess: () => {
      setError(-1);
      setShowAuth(false);
      queryClient.invalidateQueries(["user"]);
    },
    onError: (error : AxiosError<CustomError>) => {
      if(error.response?.status == 409)
      {
        setError(4);
      }
    }
  });
};

export default useRegister;
