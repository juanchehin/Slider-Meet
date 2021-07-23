import * as constants from "./constants.js";
import * as elements from "./elements.js";

export const updatePersonalCode = (personalCode) => {
    const personalCodeParagraph = document.getElementById(
        "personal_code_paragraph"
    );
    console.log('personal code es : ', personalCode);
    personalCodeParagraph.innerHTML = personalCode;
};

export const updateLocalVideo = (stream) => {
    console.log('updateLocalVideo')
    const localVideo = document.getElementById('local_video');
    console.log('updateLocalVideo stream ', stream)

    localVideo.srcObject = stream;

    localVideo.addEventListener("loadedmetadata", () => {
        localVideo.play();
    });
};

export const updateRemoteVideo = (stream) => {
    const remoteVideo = document.getElementById('remote_video');
    remoteVideo.srcObject = stream;

    localVideo.addEventListener("loadedmetadata", () => {
        localVideo.play();
    });
};

export const showIncomingCallDialog = (callType, acceptCallHandler, rejectCallHandler) => {
    const callTypeInfo = callType === constants.callType.CHAT_PERSONAL_CODE ? "Chat" : "Video";

    const getIncomingCallDialog = elements.getIncomingCallDialog(callType, acceptCallHandler, rejectCallHandler);

    // Remuevo todos los dialogos HTML
    const dialog = document.getElementById('dialog');
    console.log('dialog es : ', dialog);
    // dialog.querySelector('*').forEach((dialog) => dialog.remove());
    dialog.querySelectorAll("*").forEach((dialog) => dialog.remove());
    dialog.appendChild(getIncomingCallDialog);
};

export const showCallElements = (callType) => {
    const finishConnectionChatButtonContainer = document.getElementById(
        "finish_chat_button_container"
    );
    showElement(finishConnectionChatButtonContainer);

    const newMessageInput = document.getElementById("new_message");
    showElement(newMessageInput);

    disabledDashoard();
};

export const showVideoCallElements = () => {
    console.log('showVideoCallElements es : ');

    const callButtons = document.getElementById('call_buttons');
    showElement(callButtons);

    const placeholder = document.getElementById('video_placeholder');
    hideElement(placeholder);

    const remoteVideo = document.getElementById('remote_video');
    showElement(remoteVideo);

    const newMessageInput = document.getElementById("new_message");
    showElement(newMessageInput);

    disabledDashoard();

}

export const showCallingDialog = (rejectCallHandler) => {
    const callingDialog = elements.getIncomingCallDialog(rejectCallHandler);

    // Muesto los dialogos
    const dialog = document.getElementById('dialog');
    dialog.querySelectorAll("*").forEach((dialog) => dialog.remove());

    dialog.appendChild(callingDialog);
}

export const showInfoDialog = () => {
    let infoDialog = null;

    if (preOfferAnswer === constants.preOfferAnswer.CALL_REJECT) {
        infoDialog = elements.getInfoDialog(
            'Llamada rechazada',
            'Se rechazo tu llamada'
        );
    }

    if (preOfferAnswer === constants.preOfferAnswer.CALLEE_NOT_FOUND) {
        infoDialog = elements.getInfoDialog(
            'Llamada desconectada',
            'Chequea tu codigo personal'
        );
    }

    if (preOfferAnswer === constants.preOfferAnswer.CALLEE_NOT_FOUND) {
        infoDialog = elements.getInfoDialog(
            'Inconveniente en la llamda',
            'Probablemente llamada ocupada.Intenta de nuevo mas tarde'
        );
    }

    if (infoDialog) {
        const dialog = document.getElementById('dialog');
        dialog.appendChild(infoDialog);

        setTimeout(() => {
            removeAllDialogs();
        }, [4000]);
    }
};

export const removeAllDialogs = () => {

    // Remuevo todos los dialogos HTML
    const dialog = document.getElementById('dialog');
    dialog.querySelectorAll("*").forEach((dialog) => dialog.remove());
}

// Funciones de ayuda

const enableDashoard = () => {
    const doshboardBloquer = document.getElementById('dashboard_blur');
    if (doshboardBloquer.classList.contains('display_none')) {
        doshboardBloquer.classList.add('display_none');
    }
};

const disabledDashoard = () => {
    const doshboardBloquer = document.getElementById('dashboard_blur');
    if (doshboardBloquer.classList.contains('display_none')) {
        doshboardBloquer.classList.remove('display_none');
    }
};

const hideElement = (element) => {
    if (!elements.classList.contains('display_none')) {
        element.classList.add('display_none');
    }
};

const showElement = (element) => {
    if (elements.classList.contains('display_none')) {
        element.classList.remove('display_none');
    }
};