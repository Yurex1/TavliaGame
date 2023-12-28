import SocketApi from "@/api/socket-api";
import { useEffect } from "react"

export const useConnect = () => {

    const connectSocket = () => {
        SocketApi.initSocket();
    }

    useEffect(() => {
        connectSocket();
    },[])
}