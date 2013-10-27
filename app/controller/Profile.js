Ext.define('BoyMeetsGirl.controller.Profile', {
  extend: 'Ext.app.Controller',
  config: {
    refs: {
      view: {
        selector: 'profile',
        xtype: 'profile',
        autoCreate: true
      },
      backButton: 'profile #backButton'
    },
    control: {
      backButton: {
        tap: function(sender) {
          return this.getApplication().getController('PersonList').show('right');
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
