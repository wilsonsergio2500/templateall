import { IConfig } from "../../types/config";
import { ISelectionMeta } from "../../types/selection-meta";
import { prompt, Question } from 'inquirer';
import { join } from 'path';
import { IGetDocumentSelection } from "./contracts/document-selection";
import { INTERACTIONS } from './constants';

export function getDocumentSelectionAsync(config: IConfig) : Promise<ISelectionMeta> {
    return new Promise((resolve, reject) => {

        const q = <Question<IGetDocumentSelection>>{
            ...INTERACTIONS.DOCUMENT_SELECTION,
            choices: Object.keys(config.types)
        };
        const prmt = prompt([q]);
        prmt.then((answ: IGetDocumentSelection) => {
            const type = config.types[answ.type];
            const path = join(config.templates, type);
            resolve(<ISelectionMeta>{ path, type });
        })
    });
}