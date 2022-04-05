class ProfilePhotoSubject {
    private subscribersList: ProfilePhotoObserver[] = [];

    public subscribe(element: ProfilePhotoObserver) {
        this.subscribersList.push(element);
    }

    public emitChanges(imgBase64: string) {
        this.subscribersList.forEach(subscriber => {
            subscriber.updateElement(imgBase64);
        });
    }
}

class ProfilePhotoObserver {
    public elementId: string;

    constructor(id: string) {
        this.elementId = id;
    }

    public updateElement(imgBase64: string) {
        let profPic: HTMLImageElement = <HTMLImageElement>document.getElementById(this.elementId);

        profPic.src = imgBase64;
    }
}

const profilePhotoSubject = new ProfilePhotoSubject();
const profilePhotoObserver1 = new ProfilePhotoObserver('profile_pic_1');
const profilePhotoObserver2 = new ProfilePhotoObserver('profile_pic_2');

profilePhotoSubject.subscribe(profilePhotoObserver1);
profilePhotoSubject.subscribe(profilePhotoObserver2);


let uploadBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById('upload_btn');
let uploadInput: HTMLInputElement = <HTMLInputElement>document.getElementById('upload_input');

uploadBtn.addEventListener("click", () => {
    uploadInput.click();
});

uploadInput.addEventListener("change", (event: any) => {
    if (event.target.files) {
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);

        reader.onload = (loadEvent: any) => {
            profilePhotoSubject.emitChanges(loadEvent.target.result);
        }
    }
});