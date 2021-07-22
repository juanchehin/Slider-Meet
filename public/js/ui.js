import * as constants from "./constants.js";
import * as elements from "./elements.js";

export const updatePersonalCode = (personalCode) => {
    const personalCodeParagraph = document.getElementById(
        "personal_code_paragraph"
    );
    console.log('personal code es : ', personalCode);
    personalCodeParagraph.innerHTML = personalCode;
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