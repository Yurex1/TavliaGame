import {useQueryClient } from "react-query";


const useLogout = () => {
  const queryClient = useQueryClient();
  const logout = () => {
    localStorage.removeItem("token");
    queryClient.invalidateQueries("user");
  };
  return logout;
};

export default useLogout;