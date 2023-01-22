import axios from '/axios.js'
import Preview from '/preview.js'

const formElem = document.getElementById('request')
const promptElem = document.getElementById('prompt')
const responseElem = document.getElementById('response')
const previewElem = document.getElementById('preview')

const preview = new Preview(previewElem)
preview.onUpdate = (previewString) => {
    promptElem.value = previewString
}

// get the  preview string if iframe document is ready
// otherwise, use an event listener
if (previewElem.contentDocument.readyState == 'complete') {
    preview.getPreviewString();
} else {
    previewElem.contentWindow.addEventListener('load', (e) => {
        preview.getPreviewString();
    })    
}


formElem.addEventListener('submit', (e) => {
    e.preventDefault()

    const prompt = promptElem.value
    axios
      .post("http://localhost:8080/chat", { prompt })
      .then((res) => {
        responseElem.innerText = res.data.trim()

        // const iframeDocument = previewElem.contentDocument
        // iframeDocument.body.innerHTML = res.data
        preview.replaceWithPreviewString(res.data)
      })
      .catch((err) => {
        console.error(err);
      });

})

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    responseElem.disabled = true
    responseElem.classList.add('spinner')
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    responseElem.disabled = false
    responseElem.classList.remove('spinner')
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
})


