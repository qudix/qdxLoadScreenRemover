/* global ngapp, xelib, registerPatcher, patcherUrl */

registerPatcher({
    info: info,
    gameModes: [xelib.gmTES5, xelib.gmSSE],
    settings: {
        label: 'Load Screen Remover',
        templateUrl: `${patcherUrl}/partials/settings.html`,
        controller: function($scope) {},
        defaultSettings: {
            showLore: false
        }
    },
    getFilesToPatch: function(filenames) {
        return filenames;
    },
    execute: (patchFile, helpers, settings, locals) => ({
        process: [{
            load: {
                signature: 'LSCR',
                filter: function(record) {
                    return true;
                }
            },
            patch: function(record) {
                helpers.logMessage(`Removing Loadscreen for ${xelib.LongName(record)}`);

                if (!settings.showLore)
                    xelib.SetValue(record, 'DESC', ''); 

                xelib.SetValue(record, 'NNAM', '');
                xelib.RemoveElement(record, 'SNAM');
            }
        }]
    })
});