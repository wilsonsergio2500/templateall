import { prompt, Question } from 'inquirer';
import { camelize } from 'underscore.string';
import { IGenrateMeta } from "../../types/generate-meta";
import { IGetDocumentTypes } from './contracts/document-types';
import { INTERACTIONS } from './constants';

export function getDocumentTypesAsync(): Promise<IGenrateMeta> {
    return new Promise((resolve, reject) => {

        const q = <Question<IGetDocumentTypes>>{
            ...INTERACTIONS.DOCUMENT_TYPES
        }
        const prmt = prompt([q])
        
        prmt.then((answ: IGetDocumentTypes) => {
            if (answ && answ.document) {
                const Name_original = answ.document as string;
                const Name_file = Name_original.replace(/\.?([A-Z])/g, (x: any, y: string) => "-" + y.toLocaleLowerCase()).replace(/^_/, "");
                const Name_titlelized = Name_original.charAt(0).toUpperCase() + Name_original.replace(/\.?([A-Z])/g, (x: any, y: string) => " " + y.toLocaleUpperCase()).replace(/^_/, "").slice(1);
                const Name_camelized = camelize(Name_original)
                const Name_pascalized = Name_original.charAt(0).toUpperCase() + Name_original.slice(1);
                resolve(<IGenrateMeta>{ Name_original, Name_file, Name_titlelized, Name_pascalized, Name_camelized })
            }
        })

    })
}