import des from './des/des.js'

const encodeInput = document.querySelector('#encodeInput')
    , decodeInput = document.querySelector('#decodeInput')
    , key = document.querySelector('#key')
    , encodeBtn = document.querySelector('#encodeBtn')
    , decodeBtn = document.querySelector('#decodeBtn')

encodeBtn?.addEventListener('click', encodeHandler)
decodeBtn?.addEventListener('click', decodeHandler)

function encodeHandler() {
    if (!(encodeInput || decodeInput))
        return

    decodeInput.value = des(encodeInput.value, key.value, 'encode')
}

function decodeHandler() {
    if (!(encodeInput || decodeInput))
        return

    encodeInput.value = des(decodeInput.value, key.value, 'decode')
}