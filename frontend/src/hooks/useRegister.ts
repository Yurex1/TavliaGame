import API_URL from "@/constants";
import { User } from "@/types/types";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

const register = async (user: User) => {
  return await axios.post(API_URL +  "auth", user, {withCredentials: true});
};

const useRegister = ({setError, setShowAuth }: {setError: (error: string) => void, setShowAuth: (showAuth: boolean) => void}) => {
  const queryClient = useQueryClient();
  return useMutation(register, {
    onSuccess: (data) => {
      if(typeof data.data == "string") {
        setError(data.data);
        return;
      }
      setError("");
      setShowAuth(false);
      queryClient.invalidateQueries(["user"]);
    },
    onError: () => {
      setError("User with this login or email has already been created.");
    }
  });
};

export default useRegister;
