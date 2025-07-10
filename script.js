import { keys } from "./keys.js";

const allKeys = [];
const audioMap = {};

document.addEventListener("DOMContentLoaded", () => {
    const pianoKeysContainer = document.querySelector(".piano-keys");
    createPianoKeys(pianoKeysContainer);
    preloadAudio();

    document.addEventListener("keydown", pressedKey);
});

const createPianoKeys = (container) => {
    keys.forEach(({ note, key, isBlack, mappedKey }) => {
        const li = document.createElement("li");
        li.className = `key ${isBlack ? "black" : "white"}`;
        const displayKey = mappedKey || key;
        li.dataset.key = displayKey;
        li.innerHTML = `<div>${note}</div>
        <span>${key.toUpperCase()}</span>`;
        li.addEventListener("click", () => playTune(displayKey));
        allKeys.push(displayKey);
        container.appendChild(li);
    });
};

const preloadAudio = () => {
    allKeys.forEach((key) => {
        audioMap[key] = new Audio(`./pianoKeys/${key}.mp3`);
    });
};

const pressedKey = (e) => {
    const keyObject = keys.find((key) => key.key === e.key);

    const key = keyObject?.mappedKey || e.key;

    if (allKeys.includes(key)) {
        playTune(key);
    }
};

const playTune = (key) => {
    const audio = audioMap[key];

    if (!audio) return;

    const volumeInput = document.querySelector(".volume-slider input");

    audio.currentTime = 0;
    audio.volume = volumeInput.value;
    audio.play();

    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    clickedKey.classList.add("active");

    setTimeout(() => clickedKey.classList.remove("active"), 150);
};
