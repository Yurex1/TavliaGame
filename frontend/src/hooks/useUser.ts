import API_URL from "@/constants";
import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";


interface CustomError {
    response?: {
      status?: number;
    };
  }

const getUser = async () => {
    if(localStorage.getItem('token') === null) return null;
    return await axios.get(API_URL + 'auth/profile' , {headers: {Authorization: "Bearer " + localStorage.getItem('token')?.toString()}});
}

const useUser= () => {
    return useQuery(['user'], getUser, {onError: (error : AxiosError<CustomError>) => {
        if(error.response?.status == 401)
        {
            localStorage.removeItem('token');
        }
    }});
};

export default useUser;