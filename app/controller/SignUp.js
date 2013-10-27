Ext.define('BoyMeetsGirl.controller.SignUp', {
  extend: 'Ext.app.Controller',
  config: {
    refs: {
      view: {
        selector: 'signup',
        xtype: 'signup',
        autoCreate: true
      },
      signUpButton: 'signup #signUpButton',
      firstnameText: 'signup #firstnameText',
      lastnameText: 'signup #lastnameText',
      emailText: 'signup #emailText',
      passwordText: 'signup #passwordText'
    },
    control: {
      signUpButton: {
        tap: 'signup'
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
  signup: function(sender) {
    var email, firstname, lastname, password,
      _this = this;
    firstname = this.getFirstnameText().getValue();
    lastname = this.getLastnameText().getValue();
    email = this.getEmailText().getValue();
    password = this.getPasswordText().getValue();
    return BoyMeetsGirl.util.TribefireManager.signUp(firstname, lastname, email, password, function(memberId) {
      console.log(memberId);
      return _this.getApplication().getController('FacebookConnect').show();
    });
  }
});
