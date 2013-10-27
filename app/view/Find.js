Ext.define('BoyMeetsGirl.view.Find', {
  extend: 'Ext.Container',
  xtype: 'find',
  requires: [],
  config: {
    fullscreen: true,
    cls: 'find',
    layout: 'vbox',
    items: [
      {
        xtype: 'container',
        cls: 'title-toolbar',
        layout: 'hbox',
        items: [
          {
            xtype: 'button',
            baseCls: 'toolbar-button icon back'
          }, {
            xtype: 'component',
            flex: 1,
            cls: 'label',
            html: '<b>Go find her!</b>'
          }
        ]
      }, {
        xtype: 'container',
        cls: 'content',
        items: [
          {
            xtype: 'container',
            layout: 'hbox',
            cls: 'header',
            items: [
              {
                xtype: 'image',
                src: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc3/c0.0.628.628/s320x320/1379474_10152281554223765_259450346_n.jpg',
                cls: 'profile-pic'
              }, {
                xtype: 'component',
                cls: 'description',
                html: 'Meet <b>Julia N.</b> at the bar in the Lounge and claim your free drink.'
              }
            ]
          }, {
            xtype: 'container',
            cls: 'qr-wrapper',
            items: [
              {
                xtype: 'component',
                cls: 'qr'
              }
            ]
          }
        ]
      }
    ]
  }
});
