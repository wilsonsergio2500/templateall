
import { getConfig } from './utils/get-config';
import { getDocumentTypesAsync } from './utils/interactions/get-document-types';
import { getDocumentSelectionAsync } from './utils/interactions/get-document-selection';
import { getFiles } from './utils/get-files';
import { generateTemplatesAsync } from './utils/generate-templates';

export function Execute(){
    const config = getConfig();
    async function DoAsync() {
        let meta = await getDocumentTypesAsync();
        const sel = await getDocumentSelectionAsync(config);
        const files = getFiles(sel.path);
        const { type: Type, path } = sel;
        meta = { ...meta, Type, path };
        for (var i = 0; i < files.length; i++) {
            await generateTemplatesAsync(files[i], meta, config);
        }
    }
    DoAsync();
}

module.exports = Execute;