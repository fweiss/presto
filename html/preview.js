export default class Preview {
    constructor(previewElem) {
        this.previewString = ''
        this.previewElem = previewElem
        this.onUpdate = () => {}
        this.allowInvalidReplacement = true
    }
    get previewBodyElem() {
        return this.previewElem.contentDocument.body
    }
    isTextValidAFrameMarkup(text) {
        return text.trim().startsWith('<a-scene')
    }
    getPreviewString() {
        this.previewString = this.previewBodyElem.innerHTML
        this.onUpdate(this.previewString)

        // but comes with extra
        // <canvas class="a-canvas a-grab-cursor" data-aframe-canvas="true" width="600" height="300"></canvas>
        // <div class="a-loader-title" style="display: none;">Presto VR View</div>
        // <a-entity camera="" position="" wasd-controls="" rotation="" look-controls="" aframe-injected=""></a-entity>        
    }
    replaceWithPreviewString(preview) {
        if (this.allowInvalidReplacement || this.isTextValidAFrameMarkup(preview)) {
            this.previewBodyElem.innerHTML = preview
        }
    }
}
