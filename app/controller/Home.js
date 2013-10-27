Ext.define('BoyMeetsGirl.controller.Home', {
  extend: 'Ext.app.Controller',
  config: {
    refs: {
      view: {
        selector: 'home',
        xtype: 'home',
        autoCreate: true
      },
      wantedButton: 'home #wantedButton',
      personListButton: 'home #personListButton'
    },
    control: {
      wantedButton: {
        tap: function(sender) {
          return this.getApplication().getController('Wanted').show();
        }
      },
      personListButton: {
        tap: function(sender) {
          return this.getApplication().getController('PersonList').show();
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
