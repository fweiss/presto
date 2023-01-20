// import { default as axios } from '/axios.js'
import axios from '/axios.js'

const formElem = document.getElementById('request')
const inputElem = document.getElementById('input')
const responseElem = document.getElementById('response')

formElem.addEventListener('submit', (e) => {
    e.preventDefault()

    const prompt = inputElem.value
    axios
      .post("http://localhost:8080/chat", { prompt })
      .then((res) => {
        responseElem.innerHTML = res.data
      })
      .catch((err) => {
        console.error(err);
      });

})
