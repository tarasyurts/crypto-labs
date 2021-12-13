import des from './des/des.js'
import galoisField from './galois-field/galois-field.js'
import { navs, initState } from './const.js'

let state = {}
const setState = (newState) => {
    state = newState
    updateView(state)
}

const updateView = (state) => {
    const nav = document.querySelector('#nav')
        , content = document.querySelector('#content')

    nav.innerHTML = navs.map(_ => `<button data-nav="${_}" class="${state.nav === _ ? 'bg-indigo-500' : 'bg-gray-400'} nav-btn mr-2 text-white font-semibold py-1 px-2.5 rounded-sm shadow-md">${_}</button>`).join('')
    
    content.innerHTML = getContent()

    function getContent() {
        switch(state.nav) {
            case 'DES': return `<h2 class="text-left text-5xl lg:text-6xl text-indigo-500 font-bold mb-8">Encryptor U'd <span class="font-normal">💖</span></h2>
            <div class="flex -m-1.5 mb-1.5">
                <textarea type="text" class="h-24 resize-none focus:ring-4 outline-none rounded-sm shadow-lg flex-grow py-1 px-2.5 m-1.5" id="encodeInput" placeholder="String to encode..."></textarea>
                <textarea disabled type="text" class="h-24 resize-none focus:ring-4 outline-none rounded-sm shadow-lg flex-grow py-1 px-2.5 m-1.5" id="decodeInput" placeholder="decoded..."></textarea>
            </div>
            <input type="text" class="focus:ring-4 outline-none rounded-sm shadow-lg w-full py-1 px-2.5 mb-3" id="key" placeholder="Key...">
            <div class="flex justify-between mb-4">
                <button id="encodeBtn" class="bg-indigo-500 text-white font-semibold py-1 px-2.5 rounded-sm shadow-md">Encode →</button>
                <!-- <button id="decodeBtn" class="bg-indigo-500 text-white font-semibold py-1 px-2.5 rounded-sm shadow-md">← Decode</button> -->
            </div>`
            case 'GF': return `<h2 class="text-left text-5xl lg:text-6xl text-indigo-500 font-bold mb-8">Galois field (2^8)*</h2>
            <div class="flex flex-wrap justify-between mb-4">
                <input type="text" placeholder="a hex..." id="aInput" class="focus:ring-4 outline-none rounded-sm shadow-lg py-1 px-2.5 mb-3" />
                <input type="text" placeholder="b hex..." id="bInput" class="focus:ring-4 outline-none rounded-sm shadow-lg py-1 px-2.5 mb-3" />
                <input type="text" disabled placeholder="result" id="resultInput" class="focus:ring-4 outline-none rounded-sm shadow-lg py-1 px-2.5 mb-3" />
            </div>
            <div class="flex justify-between mb-4">
                <button id="cmpResBtn" class="bg-indigo-500 text-white font-semibold py-1 px-2.5 rounded-sm shadow-md">Compute</button>
            </div>`
        }
    }
}

window?.addEventListener('load', () => setState(initState))

document?.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav-btn')) {
        if (e.target.dataset.nav !== state.nav) {
            setState({...state, nav: e.target.dataset.nav })
        }
    } else if (state.nav === 'DES' && e.target.id === 'encodeBtn' || e.target.id === 'decodeBtn') {
        const encodeInput = document.querySelector('#encodeInput')
            , decodeInput = document.querySelector('#decodeInput')
            , key = document.querySelector('#key')
            
        if (e.target.id === 'encodeBtn') {
            decodeInput.value = des(encodeInput.value, key.value, 'encode')
        } else if (e.target.id === 'decodeBtn') {
            encodeInput.value = des(decodeInput.value, key.value, 'decode')
        }
    } else if (state.nav === 'GF' && e.target.id === 'cmpResBtn') {
        const aInput = document.querySelector('#aInput')
            , bInput = document.querySelector('#bInput')
            , resultInput = document.querySelector('#resultInput')
        
        resultInput.value = galoisField(aInput.value, bInput.value, '100011011')
    } 
})
