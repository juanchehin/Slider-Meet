/* Este archivo contiene */

console.log("Entra element.js");

// Modal con "Llamada entrante" 
// Se dispara al hacer clic en "Video call".
export const getIncomingCallDialog = (callTypeInfo, acceptCallHandler, rejectCallHandler) => {

    console.log("getting incoming call dialog");
    const dialog = document.createElement('div');
    dialog.classList.add('dialog_wrapper'); // Añado la clase dialog_wrapper (ver carpeta CSS)

    const dialogContent = document.createElement("div");
    dialogContent.classList.add("dialog_content");
    dialog.appendChild(dialogContent);

    const title = document.createElement('p');
    title.classList.add('dialog_title');
    title.innerHTML = `Llamada entrante de tipo : ${callTypeInfo}`;

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('dialog_image_container');
    const image = document.createElement("img");
    const avatarImagePath = './utils/images/dialogAvatar.png';
    image.src = avatarImagePath;
    imageContainer.appendChild(image);

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('dialog_button_container');

    const acceptCallButton = document.createElement('button');
    acceptCallButton.classList.add('dialog_accept_call_button');
    const acceptCallImg = document.createElement('img');
    acceptCallImg.classList.add('dialog_button_image');
    const acceptCallImgPath = './utils/images/acceptCall.png';
    acceptCallButton.append(acceptCallImg);
    buttonContainer.appendChild(acceptCallButton);

    const rejectCallButton = document.createElement('button');
    rejectCallButton.classList.add('dialog_reject_call_button');
    const rejectCallImg = document.createElement('img');
    rejectCallImg.classList.add('dialog_button_image');
    const rejectCallImgPath = './utils/images/rejectCall.png';
    rejectCallButton.src = rejectCallImgPath;
    rejectCallButton.append(rejectCallImg);
    buttonContainer.appendChild(rejectCallButton);

    dialogContent.appendChild(title);
    dialogContent.appendChild(imageContainer);
    dialogContent.appendChild(buttonContainer);

    // Boton de aceptar llamada
    acceptCallButton.addEventListener('click', () => {
        console.log("entra acceptCallButton");
        // acceptCallHandler();
    });

    rejectCallButton.addEventListener('click', () => {
        rejectCallHandler();
    });
    return dialog;
};

// Obtengo el dialogo de la llamada
export const getCallingDialog = (rejectCallHandler) => {
    console.log("element.js getCallingDialog");

    const dialog = document.createElement('div');
    dialog.classList.add('dialog_wrapper');

    const dialogContent = document.createElement("div");
    dialogContent.classList.add("dialog_content");
    dialog.appendChild(dialogContent);

    const title = document.createElement('p');
    title.classList.add('dialog_title');
    title.innerHTML = `Calling `;

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('dialog_image_container');
    const image = document.createElement("img");
    const avatarImagePath = './utils/images/dialogAvatar.png';
    image.src = avatarImagePath;
    imageContainer.appendChild(image);

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add("dialog_button_container");

    const hangUpCallButton = document.createElement("button");
    hangUpCallButton.classList.add('dialog_reject_call_button');

    const hangUpCallImg = document.createElement('img');
    hangUpCallImg.classList.add('dialog_button_image');

    const rejectCallImgPath = './utils/images/rejectCall.png';
    hangUpCallButton.src = rejectCallImgPath;

    rejectCallButton.append(hangUpCallImg);
    buttonContainer.appendChild(hangUpCallButton);

    dialogContent.appendChild(title);
    dialogContent.appendChild(imageContainer);
    dialogContent.appendChild(buttonContainer);

    return dialog;
}

export const getIngoDialog = (dialogTitle, dialogDescription) => {
    const dialog = document.createElement('div');
    dialog.classList.add('dialog_wrapper');
    const dialogContent = document.createElement("div");
    dialogContent.classList.add("dialog_content");
    dialog.appendChild(dialogTitle);

    const title = document.createElement('p');
    title.classList.add('dialog_title');
    title.innerHTML = dialogTitle;

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('dialog_image_container');
    const image = document.createElement("img");
    const avatarImagePath = './utils/images/dialogAvatar.png';
    image.src = avatarImagePath;
    imageContainer.appendChild(image);

    const description = document.createElement('p');
    description.classList.add('dialog_description');
    description.innerHTML = dialogDescription;

    dialogContent.appendChild(title);
    dialogContent.appendChild(imageContainer);
    dialogContent.appendChild(description);

    return dialog;
}