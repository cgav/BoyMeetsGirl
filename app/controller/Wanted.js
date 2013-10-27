Ext.define('BoyMeetsGirl.controller.Wanted', {
  extend: 'Ext.app.Controller',
  config: {
    refs: {
      view: {
        selector: 'wanted',
        xtype: 'wanted',
        autoCreate: true
      },
      wantedList: 'wanted #wantedList',
      backButton: 'wanted #backButton'
    },
    control: {
      wantedList: {
        itemtap: function(sender, index, target, record) {
          return this.getApplication().getController('Find').show('left', record);
        }
      },
      backButton: {
        tap: function(sender) {
          return this.getApplication().getController('Home').show('right');
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
