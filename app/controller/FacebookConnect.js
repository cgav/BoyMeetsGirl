Ext.define('BoyMeetsGirl.controller.FacebookConnect', {
  extend: 'Ext.app.Controller',
  config: {
    refs: {
      view: {
        selector: 'facebookconnect',
        xtype: 'facebookconnect',
        autoCreate: true
      },
      connectButton: 'facebookconnect #connectButton',
      errorPanel: 'facebookconnect #errorPanel'
    },
    control: {
      connectButton: {
        tap: 'connectFacebook'
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
  connectFacebook: function(sender) {
    var _this = this;
    this.getErrorPanel().setHidden(true);
    return BoyMeetsGirl.util.TribefireManager.connectFacebook(function(fid) {
      if (fid != null) {
        console.log("User's facebook ID is " + fid);
        return _this.getApplication().getController('Home').show();
      } else {
        return _this.getErrorPanel().setHidden(false);
      }
    });
  }
});
