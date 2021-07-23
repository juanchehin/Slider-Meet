import * as wss from './wss.js';
import * as constants from './constants.js';
import * as ui from './ui.js';
import * as store from './store.js';


let connectedUserDetails;
let peerConnection;

const defaultConstrains = {
    audio: true,
    video: true
}

const configuration = {
    iceServers: [{
        urls: 'stun:stun.l.google.com:13902'
    }]
}


export const getLocalPreview = () => {
    navigator.mediaDevices.getUserMedia(defaultConstrains)
        .then((stream) => {
            ui.updatePersonalCode(stream);
            store.setLocalStream(stream);
        })
        .catch((err) => {
            console.log("error al acceder a la camara");
            console.log(err);
        });
};

const createPeerConnection = () => {
    peerConnection = new RTCPeerConnection(configuration);

    peerConnection.onicecandidate = (event) => {
        console.log("getting ice candidates from stun server");
        if (event.candidate) {

        }
    }

    peerConnection.onconnectionstatechange = (event) => {
        if (peerConnection.connectionState === 'connected') {
            console.log("getting ice candidates from stun server");
        }
    }

    const remoteStream = new MediaStream();
    store.setRemoteStream(remoteStream);
    ui.updateRemoteVideo(remoteStream);

    peerConnection.ontrack = (event) => {
        remoteStream.addTrack(event.track);
    }

    if (connectedUserDetails.callType === constants.callType.VIDEO_PERSONAL_CODE) {
        const localStream = store.getState().localStream;

        for (const track of localStream.getTracks()) {
            peerConnection.addTrack(track, localStream);
        }
    }
};

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
    ui.showCallElements(connectedUserDetails.callType);
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
        ui.showInfoDialog(preOfferAnswer);
    }

    if (preOfferAnswer === constants.preOfferAnswer.CALL_ACCEPTED) {
        ui.showCallElements(connectedUserDetails.callType);
        createPeerConnection();
        sendWebRTCOffer();
    }
}

const sendWebRTCOffer = async() => {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    wss.sendDataUsingWebRTCSignaling({
        connectedUserSocketId: connectedUserDetails.socketId,
        type: constants.webRTCSignaling.OFFER,
        offer: offer,
    });
};

export const handleWebRTCOffer = async(data) => {
    await peerConnection.setRemoteDescription(data.offer);
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    wss.sendDataUsingWebRTCSignaling({
        connectedUserSockerId: connectedUserDetails.socketId,
        type: constants.webRTCSignaling.ANSWER,
        answer: answer,
    });
};

export const handleWebRTCAnswer = async(data) => {
    console.log("handling webRTC Answer");
    await peerConnection.setRemoteDescription(data.answer);
};