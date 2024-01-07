import API_URL from "@/constants";
import { User } from "@/types/types";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

const register = async (user: User) => {
  return await axios.post(API_URL +  "auth", user, {withCredentials: true});
};

const useRegister = ({setError, setShowAuth }: {setError: (error: number) => void, setShowAuth: (showAuth: boolean) => void}) => {
  const queryClient = useQueryClient();
  return useMutation(register, {
    onSuccess: (data) => {
      if(typeof data.data == "string") {
        setError(4);
        return;
      }
      setError(-1);
      setShowAuth(false);
      queryClient.invalidateQueries(["user"]);
    },
    onError: () => {
      setError(0);
    }
  });
};

export default useRegister;
