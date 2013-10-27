Ext.define('BoyMeetsGirl.controller.FacebookConnect', {
  extend: 'Ext.app.Controller',
  config: {
    refs: {
      view: {
        selector: 'facebookconnect',
        xtype: 'facebookconnect',
        autoCreate: true
      },
      connectButton: 'facebookconnect #connectButton'
    },
    control: {
      connectButton: {
        tap: function(sender) {
          return this.getApplication().getController('Home').show();
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
