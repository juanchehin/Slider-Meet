export const updatePersonalCode = (personalCode) => {
    const personalCodeParagraph = document.getElementById(
        "personal_code_paragraph"
    );
    console.log('personal code es : ', personalCode);
    personalCodeParagraph.innerHTML = personalCode;
};