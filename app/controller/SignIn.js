Ext.define('BoyMeetsGirl.controller.SignIn', {
  extend: 'Ext.app.Controller',
  config: {
    refs: {
      view: {
        selector: 'signin',
        xtype: 'signin',
        autoCreate: true
      },
      signInButton: 'signin #signInButton'
    },
    routes: {
      signup: 'signup'
    },
    control: {
      signInButton: {
        tap: function(sender) {
          return console.log("signed in tapped");
        }
      }
    }
  },
  show: function(direction) {
    if (direction == null) {
      direction = 'left';
    }
    return Ext.Viewport.animateActiveItem(this.getView(), {
      type: 'slide',
      direction: direction
    });
  },
  signup: function() {
    return this.getApplication().getController('SignUp').show();
  }
});
