class ProfilePhotoSubject {
    constructor() {
        this.subscribersList = [];
    }
    subscribe(element) {
        this.subscribersList.push(element);
    }
    emitChanges(imgBase64) {
        this.subscribersList.forEach(subscriber => {
            subscriber.updateElement(imgBase64);
        });
    }
}
class ProfilePhotoObserver {
    constructor(id) {
        this.elementId = id;
    }
    updateElement(imgBase64) {
        let profPic = document.getElementById(this.elementId);
        profPic.src = imgBase64;
    }
}
const profilePhotoSubject = new ProfilePhotoSubject();
const profilePhotoObserver1 = new ProfilePhotoObserver('profile_pic_1');
const profilePhotoObserver2 = new ProfilePhotoObserver('profile_pic_2');
profilePhotoSubject.subscribe(profilePhotoObserver1);
profilePhotoSubject.subscribe(profilePhotoObserver2);
let uploadBtn = document.getElementById('upload_btn');
let uploadInput = document.getElementById('upload_input');
uploadBtn.addEventListener("click", () => {
    uploadInput.click();
});
uploadInput.addEventListener("change", (event) => {
    if (event.target.files) {
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (loadEvent) => {
            profilePhotoSubject.emitChanges(loadEvent.target.result);
        };
    }
});
