import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { CN } from "@/languages/cn";
import { EN } from "@/languages/en";
import { TH } from "@/languages/th";

@Injectable({
    providedIn: 'root'
})

export class LanguageService {

    public static langChange = new Subject<any>();
    private static lang: object = { en: EN, th: TH, cn: CN };

    constructor() { }

    public static getLang(key: string) {
        return this.lang[this.getActiveLang()][key];
    }

    public static getActiveLang() {
        if (!localStorage.getItem('lang'))
            this.setActiveLang('en');
        return localStorage.getItem('lang');
    }

    public static setActiveLang(lang: string) {
        localStorage.setItem('lang', lang);
        this.langChange.next(this.getActiveLang());
    }

    public static isActiveLang(lang: string) {
        return localStorage.getItem('lang') == lang;
    }
}
