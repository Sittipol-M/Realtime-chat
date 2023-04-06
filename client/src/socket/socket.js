import io from "socket.io-client";
import ENV from "../env.json";
const { API } = ENV;

const socket = io(API);

export { socket };
