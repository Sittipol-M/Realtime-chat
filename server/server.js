import createWebService from "./webService/app.js";
import createChatService from "./chatService/app.js";

const server = createWebService();
createChatService({ server });
