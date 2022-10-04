import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, NgForm } from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [],
})

export class FormHelperModule {

    public static compareObjects(o1: any, o2: any): boolean {
        return o1 && o2 && o1 === o2;
    }

    public static matchObjectToName(id: number, idKey: string, nameKey: string, object: any[], deepFirstObject = null) {
        for (let index in object)
            if (deepFirstObject) {
                if (object[index][deepFirstObject][idKey] == id)
                    return object[index][deepFirstObject][nameKey];
            } else {
                if (object[index][idKey] == id)
                    return object[index][nameKey];
            }
        return '-';
    }

    public static nestedFilterCheck(search, data, key) {
        if (typeof data[key] === 'object') {
            for (const k in data[key]) {
                if (data[key][k] !== null) {
                    search = this.nestedFilterCheck(search, data[key], k);
                }
            }
        } else {
            search += data[key];
        }
        return search;
    }
}
