Ext.define('BoyMeetsGirl.controller.SignIn', {
  extend: 'Ext.app.Controller',
  config: {
    refs: {
      view: {
        selector: 'signin',
        xtype: 'signin',
        autoCreate: true
      },
      signInButton: 'signin #signInButton',
      emailText: 'signin #emailText',
      passwordText: 'signin #passwordText',
      errorPanel: 'signin #errorPanel'
    },
    routes: {
      signup: 'signup'
    },
    control: {
      signInButton: {
        tap: 'signin'
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
  },
  signin: function(sender) {
    var email, password,
      _this = this;
    this.getErrorPanel().setHidden(true);
    email = this.getEmailText().getValue();
    password = this.getPasswordText().getValue();
    return BoyMeetsGirl.util.TribefireManager.signIn(email, password, function(member) {
      if (member != null) {
        return BoyMeetsGirl.util.TribefireManager.connectFacebook(function(fid) {
          if (fid != null) {
            console.log("User's facebook ID is " + fid);
            return _this.getApplication().getController('Home').show();
          } else {
            return console.log("Could not connect to facebook");
          }
        });
      } else {
        return _this.getErrorPanel().setHidden(false);
      }
    });
  }
});
