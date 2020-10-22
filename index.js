registerPatcher({
    info: info,
    gameModes: [xelib.gmTES5, xelib.gmSSE, xelib.gmFO4],
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
    execute: (patch, helpers, settings, locals) => ({
        initialize: () => {
            locals = {
                game: xelib.GetGlobal('AppName'),
                removed: 0
            }

            locals.static = xelib.AddElement(patch, 'STAT\\STAT');
            xelib.AddElementValue(locals.static, 'EDID', 'None');
        },
        process: [{
            load: {
                signature: 'LSCR',
                filter: function(record) {
                    return true;
                }
            },
            patch: function(record) {
                if (!settings.showLore)
                    xelib.SetValue(record, 'DESC', ''); 

                xelib.SetLinksTo(record, locals.static, 'NNAM');

                if (locals.game === 'FO4') {
                    xelib.RemoveElement(record, 'TNAM');
                    xelib.RemoveElement(record, 'Conditions');             
                } else
                    xelib.RemoveElement(record, 'SNAM');

                locals.removed += 1;
            }
        }],
        finalize: () => {
            helpers.logMessage(`Removed ${locals.removed} loadscreens`);  
        }
    })
});