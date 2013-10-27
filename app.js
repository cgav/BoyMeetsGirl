/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

Ext.application({
    name: 'BoyMeetsGirl',

    requires: [
        'Ext.MessageBox',
        'BoyMeetsGirl.util.TribefireManager'
    ],

    controllers: [
        'SignIn',
        'SignUp',
        'FacebookConnect',
        'Home',
        'PersonList',
        'Wanted',
        'Find',
        'Profile'
    ],

    views: [
        'Splash',
        'SignIn',
        'SignUp',
        'FacebookConnect',
        'Home',
        'PersonList',
        'Profile',
        'Wanted',
        'Find'
    ],

    stores: [
        'Persons'
    ],

    icon: {
        '57': 'resources/images/logo57.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/images/logo114.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/images/splash.png',
        '640x920': 'resources/images/splash.png',
        // '768x1004': 'resources/startup/768x1004.png',
        // '748x1024': 'resources/startup/748x1024.png',
        // '1536x2008': 'resources/startup/1536x2008.png',
        // '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        // Initialize the main view
        BoyMeetsGirl.util.TribefireManager.initialize(function () {
            Ext.Viewport.add(Ext.create('BoyMeetsGirl.view.SignIn'));
        });
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
