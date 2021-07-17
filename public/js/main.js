import * as store from './store.js';
import * as wss from "./wss.js";
import * as webRTCHandler from "./webRTCHandler.js";
import * as constants from "./constants.js";

// Inicializacion de socket io connection
const socket = io("/");
wss.registerSocketEvents(socket);

// registrando eventos para codigo personal
const personalCodeCopyButton = document.getElementById('personal_code_copy_button');

personalCodeCopyButton.addEventListener('click', () => {
    const personalCode = store.getState().socketId;
    navigator.clipboard && navigator.clipboard.writeText(personalCode); // Copia al portapapeles el codigo
});

// Registrando eventos
const personalCodeChatButton = document.getElementById('personal_code_chat_button');

const personalCodeVideoButton = document.getElementById("personal_code_video_button");

personalCodeChatButton.addEventListener("click", () => {
    console.log("chat button clicked");

    const callePersonalCode = document.getElementById("personal_code_input").value;
    const callType = constants.callType.CHAT_PERSONAL_CODE;

    webRTCHandler.sendPreOffer(callType, callePersonalCode);
});

personalCodeVideoButton.addEventListener("click", () => {
    console.log("video button clicked");

    const callePersonalCode = document.getElementById("personal_code_input").value;
    const callType = constants.callType.VIDEO_PERSONAL_CODE;

    webRTCHandler.sendPreOffer(callType, callePersonalCode);
});