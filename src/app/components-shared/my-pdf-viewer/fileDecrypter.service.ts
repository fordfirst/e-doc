import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js/crypto-js';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class FileDecrypterService {

    public static SECRET_KEY: string = "dv+2nrfeibceYSUAdqrwSs4sHMkWfyCFnEaprG7n4Kg=";

    constructor(private httpClient: HttpClient) { }

    public async decryptThenDownload(blob: Blob, fileNameWithExtension: string): Promise<void> {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(new Blob([await FileDecrypterService.decrypt(blob)]));
        link.download = fileNameWithExtension;
        link.click();
    }

    public async decryptThenURL(blob: Blob): Promise<string> {
        console.log('decryptThenURL')
        return window.URL.createObjectURL(new Blob([await FileDecrypterService.decrypt(blob)]));
    }


    private static async decrypt(blob: Blob): Promise<Uint8Array> {
        // text must be encoded base 64 before decode aes
        const decryptedData = await CryptoJS.AES.decrypt(await blob.text(), CryptoJS.enc.Base64.parse(FileDecrypterService.SECRET_KEY), {

            // console.log('in2')
            // const decryptedData = await CryptoJS.AES.decrypt( await blob.arrayBuffer(), CryptoJS.enc.Base64.parse(FileDecrypterService.SECRET_KEY), {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });

        return FileDecrypterService.convertWordArrayToUint8Array(decryptedData);
    }

    // WordArray crypto is 32 bit we need convert to u number 1 byte = 8 bit
    private static convertWordArrayToUint8Array(wordArray): Uint8Array {
        var arrayOfWords = wordArray.hasOwnProperty("words") ? wordArray.words : [];
        var length = wordArray.hasOwnProperty("sigBytes") ? wordArray.sigBytes : arrayOfWords.length * 4;
        var uInt8Array = new Uint8Array(length), index = 0, word, i;
        for (i = 0; i < length; i++) {
            word = arrayOfWords[i];
            uInt8Array[index++] = word >> 24;
            uInt8Array[index++] = (word >> 16) & 0xff;
            uInt8Array[index++] = (word >> 8) & 0xff;
            uInt8Array[index++] = word & 0xff;
        }
        return uInt8Array;
    }

}
