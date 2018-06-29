/* global ngapp, xelib */
registerPatcher({
    info: info,
    gameModes: [xelib.gmTES5, xelib.gmSSE],
    settings: {
        label: 'Load Screen Remover',
        hide: true
    },
    requiredFiles: [],
    getFilesToPatch: function(filenames) {
        return filenames;
    },
    execute: {
        process: [{
            load: function(plugin, helpers, settings, locals) {
                return {
                    signature: 'LSCR',
                    filter: function(record) {
                        return true;
                    }
                }
            },
            patch: function(record, helpers, settings, locals) {
                helpers.logMessage("Removing Loadscreen for " + xelib.LongName(record));
                xelib.SetValue(record, 'DESC', ''); 
                xelib.SetValue(record, 'NNAM', '');
                xelib.RemoveElement(record, 'SNAM');
            }
        }]
    }
});