Ext.define('BoyMeetsGirl.controller.Find', {
  extend: 'Ext.app.Controller',
  config: {
    refs: {
      view: {
        selector: 'find',
        xtype: 'find',
        autoCreate: true
      },
      backButton: 'find #backButton'
    },
    control: {
      backButton: {
        tap: function(sender) {
          return this.getApplication().getController('Wanted').show('right');
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
