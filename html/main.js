import axios from '/axios.js'
import Preview from '/preview.js'

const formElem = document.getElementById('request')
const promptElem = document.getElementById('prompt')
const responseElem = document.getElementById('response')
const previewElem = document.getElementById('preview')
const codeElem = document.getElementById('code')

const preview = new Preview(previewElem)
preview.onUpdate = (previewString) => {
    // promptElem.value = previewString
    codeElem.value = previewString
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

    const params = formJson(e)

    // const prompt = promptElem.value
    axios
      .post("http://localhost:8080/chat", params)
      .then((res) => {
        const content = res.data.content
        // responseElem.innerText = content.trim()
        codeElem.value = content.trim()

        // const iframeDocument = previewElem.contentDocument
        // iframeDocument.body.innerHTML = res.data
        preview.replaceWithPreviewString(content)
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
    // Following error message is actually in the response data - to lazy to parse it out
    const erro429 = 'You exceeded your current quota. Please check your plan and billing details'
    if (error.response.status === 429) {
        alert(erro429)
    } else {
        alert(error.message + '. ' + error.response.statusText)
    }
    responseElem.disabled = false
    responseElem.classList.remove('spinner')
    return Promise.reject(error);
})

function formJson(submitEvent) {
    const data = new FormData(submitEvent.currentTarget);
    return {
        prompt: data.get('prompt'),
        code: data.get('code'),
        temperature: parseFloat(data.get('temperature')) || 0,
        reuseSession: data.get('reuseSession'),
    }
}
