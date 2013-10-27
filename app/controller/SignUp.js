Ext.define('BoyMeetsGirl.controller.SignUp', {
  extend: 'Ext.app.Controller',
  config: {
    refs: {
      view: {
        selector: 'signup',
        xtype: 'signup',
        autoCreate: true
      },
      signUpButton: 'signup #signUpButton'
    },
    control: {
      signUpButton: {
        tap: function(sender) {
          return this.getApplication().getController('FacebookConnect').show();
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
  }
});
