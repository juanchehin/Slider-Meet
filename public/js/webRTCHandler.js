import * as wss from './wss.js';
import * as constants from './constants.js';
import * as ui from './ui.js';

let connectedUserDetails;
console.log('pasa es : ');

export const sendPreOffer = (callType, callePersonalCode) => {
    connectedUserDetails = {
        callType,
        socketId: callePersonalCode
    }

    // if (data.callType === constants.callType.CHAT_PERSONAL_CODE || data.callType === constants.callType.VIDEO_PERSONAL_CODE) {
    if (callType === constants.callType.CHAT_PERSONAL_CODE || callType === constants.callType.VIDEO_PERSONAL_CODE) {
        const data = {
            callType,
            callePersonalCode
        };
        ui.showIncomingCallDialog(callingDialogRejectCallHandler);
        wss.sendPreOffer(data);
    }
};

export const handlePreOffer = (data) => {
    // console.log('data es : ', data);
    const { callType, callerSocketId } = data;

    connectedUserDetails = {
        socketId: callerSocketId,
        callType,
    };

    console.log('callType es : ', data.callType);
    console.log('callType es : ', callType[0]);


    if (data.callType === constants.callType.CHAT_PERSONAL_CODE || data.callType === constants.callType.VIDEO_PERSONAL_CODE) {
        ui.showIncomingCallDialog(callType, acceptCallHandler, rejectCallHandler);
    }
};

const acceptCallHandler = () => {
    console.log('call accepted');
    sendPreOfferAnswer(constants.preOfferAnswer.CALL_ACCEPTED);
}

const rejectCallHandler = () => {
    console.log('call recject');
    sendPreOfferAnswer();
    sendPreOfferAnswer(constants.preOfferAnswer.CALL_REJECT);
}

const callingDialogRejectCallHandler = () => {
    console.log('rejection the call');
}

const sendPreOfferAnswer = (preOfferAnswer) => {
    const data = {
        callerSocketId: connectedUserDetails.socketId,
        preOfferAnswer
    };
    ui.removeAllDialogs();
    wss.sendPreOfferAnswer(data)
}

export const handlePreOfferAnswer = (data) => {
    const { preOfferAnswer } = data;
    console.log("pre offer answer came");
    console.log(data);
    ui.removeAllDialogs();

    if (preOfferAnswer === constants.preOfferAnswer.CALLEE_NOT_FOUND) {
        ui.showInfoDialog(preOfferAnswer);
    }

    if (preOfferAnswer === constants.preOfferAnswer.CALL_UNAVAILABLE) {
        ui.showInfoDialog(preOfferAnswer);

    }

    if (preOfferAnswer === constants.preOfferAnswer.CALL_REJECT) {

    }

    if (preOfferAnswer === constants.preOfferAnswer.CALL_ACCEPTED) {

    }
}