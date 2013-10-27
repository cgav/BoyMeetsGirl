Ext.define('BoyMeetsGirl.view.SignIn', {
  extend: 'Ext.Container',
  xtype: 'signin',
  requires: ['Ext.field.Text', 'Ext.field.Password'],
  config: {
    fullscreen: true,
    cls: 'signin',
    items: [
      {
        xtype: 'component',
        cls: 'title-toolbar',
        html: '<b>Boy</b>Meets<b>Girl</b>'
      }, {
        xtype: 'container',
        cls: 'content',
        items: [
          {
            xtype: 'container',
            cls: 'header',
            layout: {
              type: 'hbox',
              pack: 'left',
              align: 'center'
            },
            items: [
              {
                xtype: 'component',
                cls: 'logo'
              }, {
                xtype: 'component',
                cls: 'description',
                html: 'Sign in with your<br><b>Chaya Fuera</b> account'
              }
            ]
          }, {
            xtype: 'panel',
            itemId: 'errorPanel',
            cls: 'error',
            html: 'Email and/or password is wrong.',
            hidden: true
          }, {
            xtype: 'container',
            cls: 'body',
            items: [
              {
                xtype: 'textfield',
                itemId: 'emailText',
                placeHolder: 'Email address'
              }, {
                xtype: 'passwordfield',
                itemId: 'passwordText',
                placeHolder: 'Password'
              }
            ]
          }, {
            xtype: 'button',
            baseCls: 'button',
            itemId: 'signInButton',
            text: 'Sign in'
          }, {
            xtype: 'component',
            cls: 'footer',
            itemId: 'footer',
            html: 'No account yet? <a href="#signup" class="createAccount">Create one here</a>.'
          }
        ]
      }
    ]
  }
});
