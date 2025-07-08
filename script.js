import { keys } from "./keys.js";

const allKeys = [];

document.addEventListener("DOMContentLoaded", () => {
    const pianoKeysContainer = document.querySelector(".piano-keys");

    createPianoKeys(pianoKeysContainer);
});

const createPianoKeys = (container) => {
    keys.forEach(({ note, key, isBlack, mappedKey }) => {
        const li = document.createElement("li");
        li.className = `key ${isBlack ? "black" : "white"}`;
        const displayKey = mappedKey || key;
        li.dataset.key = displayKey;
        li.innerHTML = `
            <div>${note}</div>
            <span>${key}</span>
        `;
        allKeys.push(displayKey);
        container.appendChild(li);
    });
};
