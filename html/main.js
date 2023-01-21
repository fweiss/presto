// import { default as axios } from '/axios.js'
import axios from '/axios.js'

const formElem = document.getElementById('request')
const promptElem = document.getElementById('prompt')
const responseElem = document.getElementById('response')
const previewElem = document.getElementById('preview')

formElem.addEventListener('submit', (e) => {
    e.preventDefault()

    const prompt = promptElem.value
    axios
      .post("http://localhost:8080/chat", { prompt })
      .then((res) => {
        responseElem.innerText = res.data.trim()

        const iframeDocument = previewElem.contentDocument
        iframeDocument.body.innerHTML = res.data
      })
      .catch((err) => {
        console.error(err);
      });

})
