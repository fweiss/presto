export default class Preview {
    constructor(previewElem) {
        this.previewString = ''
        this.previewElem = previewElem
        this.onUpdate = () => {}
    }
    get previewBodyElem() {
        return this.previewElem.contentDocument.body
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
        if (preview.trim().startsWith('<a-scene')) {
            this.previewBodyElem.innerHTML = preview
        }
    }
}
