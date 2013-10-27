Ext.define('BoyMeetsGirl.controller.PersonList', {
  extend: 'Ext.app.Controller',
  config: {
    refs: {
      view: {
        selector: 'personlist',
        xtype: 'personlist',
        autoCreate: true
      },
      personList: 'personlist #personList',
      backButton: 'personlist #backButton'
    },
    control: {
      personList: {
        itemtap: function(sender, index, target, record) {
          return this.getApplication().getController('Profile').show('left', record);
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
