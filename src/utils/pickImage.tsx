import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../config/firebase';

export function handleLibraryPermission() {
    let result = ImagePicker.requestMediaLibraryPermissionsAsync()
    return result
}

export function handleCameraPermission() {
    let result = ImagePicker.requestCameraPermissionsAsync()
    return result
}

export function pickLibraryImage() {
    let result = ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        presentationStyle: ImagePicker.UIImagePickerPresentationStyle.FULL_SCREEN,
        quality: 0.5,
        allowsEditing: true,
        aspect: [4, 3],
    })
    return result
}

export function PickCameraImage() {
    let result = ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        presentationStyle: ImagePicker.UIImagePickerPresentationStyle.FULL_SCREEN,
        quality: 0.5,
        allowsEditing: true,
        aspect: [4, 3],
    })
    return result
}

export async function uploadImageAsync(uri: string, path: any, fName?: any) {
    const blob: any = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
    });
    const fileName = fName || uuid.v4();
    const fileRef = ref(storage, `${path}/${fileName}.jpeg`);
    const result = await uploadBytes(fileRef, blob);
    const url = await getDownloadURL(result.ref)

    blob.close();

    return { url };
}