import * as wss from './wss.js';
import * as constants from './constants.js';
import * as ui from './ui.js';

let connectedUserDetails;

export const sendPreOffer = (callType, callePersonalCode) => {
    const data = {
        callType,
        callePersonalCode
    }

    wss.sendPreOffer(data);
};

export const handlePreOffer = (data) => {
    const { callType, callerSocketId } = data;

    connectedUserDetails = {
        socketId: callerSocketId,
        callType,
    };

    if (callType === constants.callType.CHAT_PERSONAL_CODE || calltype === constants.callType.VIDEO_PERSONAL_CODE) {
        ui.showIncomingCallDialog(callType, acceptCallHandler, rejectCallHandler);
    }
};

const acceptCallHandler = () => {
    console.log('call accepted');
}

const rejectCallHandler = () => {
    console.log('call recject');
}