Ext.define('BoyMeetsGirl.controller.Find', {
  extend: 'Ext.app.Controller',
  config: {
    refs: {
      view: {
        selector: 'find',
        xtype: 'find',
        autoCreate: true
      },
      backButton: 'find #backButton',
      image: 'find #image',
      description: 'find #description',
      qr: 'find #qr'
    },
    control: {
      backButton: {
        tap: function(sender) {
          return this.getApplication().getController('Wanted').show('right');
        }
      }
    }
  },
  show: function(direction, record) {
    if (direction == null) {
      direction = 'left';
    }
    if (record == null) {
      record = null;
    }
    Ext.Viewport.animateActiveItem(this.getView(), {
      type: 'slide',
      direction: direction
    });
    if (record != null) {
      this.getImage().setSrc(record.raw.pic);
      this.getDescription().setHtml("Meet <b>" + record.raw.name + "</b> at the bar in the Lounge and claim your free drink.");
      return this.getQr().setSrc('https://chart.googleapis.com/chart?cht=qr&chs=160x160&chl=' + record.raw.qr);
    }
  }
});
