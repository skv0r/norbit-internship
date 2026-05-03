const LOWER_LATIN = "abcdefghijklmnopqrstuvwxyz";
const UPPER_LATIN = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER_CYR = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
const UPPER_CYR = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";
const DIGITS = "0123456789";
const SPECIAL = "!@#$%^&*()-_=+[]{};:,.?";

const dialog = document.getElementById("settings-modal");
const openBtn = document.getElementById("open-settings");
const passwordInput = document.getElementById("input");
const copyBtn = document.getElementById("copy-btn");
const generateBtn = document.getElementById("generate-btn");

function getRandomSymbol(alphabet) {
    return alphabet[Math.floor(Math.random() * alphabet.length)]
}

function getSettings(){
    const length = document.getElementById("password-length").value;
    return {
        length,
        isCyrillic: document.getElementById("cyrillic").checked,
        isUppercase: document.getElementById("uppercase").checked,
        isDigits: document.getElementById("digits").checked,
        isSpecial: document.getElementById("special").checked,
    }
}

function getAlphabet(s) {
    let alphabet = "";
    if (s.isUppercase) {
        alphabet += LOWER_LATIN + UPPER_LATIN;
    } else {
        alphabet += LOWER_LATIN;
    }
    if (s.isCyrillic) {
        if (s.isUppercase) {
            alphabet += LOWER_CYR + UPPER_CYR;
        } else {
            alphabet += LOWER_CYR;
        }
    }
    if (s.isDigits) alphabet += DIGITS;
    if (s.isSpecial) alphabet += SPECIAL;

    return alphabet;
}

function getPassword() {
    const s = getSettings();
    const len = Number(s.length);
    const alphabet = getAlphabet(s);

    if (!alphabet.length || len < 1) {
        return "";
    }

    let password = "";
    for (let i = 0; i < len; i++) {
        password += getRandomSymbol(alphabet);
    }
    return password;
}

function applyGeneratedPassword() {
    const pwd = getPassword();
    if (!pwd) {
        alert("Выберите хотя бы один тип символов и задайте длину.");
        return;
    }
    passwordInput.value = pwd;
}

openBtn.addEventListener("click", () => {
    dialog.showModal();
});

generateBtn.addEventListener("click", () => {
    applyGeneratedPassword();
});

copyBtn.addEventListener("click", () => {
    const text = passwordInput.value.trim();
    if (!text) return;
  
    navigator.clipboard.writeText(text)
      .then(() => alert("Скопировано"))
      .catch(() => alert("Не удалось скопировать"));
  });

dialog.addEventListener("close", () => {
    if (dialog.returnValue !== "ok") return;
    applyGeneratedPassword();
});