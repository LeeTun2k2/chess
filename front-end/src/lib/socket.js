import io from "socket.io-client";
import appSettings from "../settings/appSettings";

const socket = io(appSettings.SOCKET_PROXY, {
  transports: ['websocket'],
  withCredentials: false,
  extraHeaders: {
    'Access-Control-Allow-Origin': '*'
  }
});

export default socket;