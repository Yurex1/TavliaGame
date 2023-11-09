import axios from "axios";
import { useQuery } from "react-query";

const useUser= () => {
    return useQuery('user', async () => (axios.get('/profile')));
};

export default useUser;