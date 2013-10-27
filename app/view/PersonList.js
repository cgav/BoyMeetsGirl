Ext.define('BoyMeetsGirl.view.PersonList', {
  extend: 'Ext.Container',
  xtype: 'personlist',
  requires: ['Ext.List'],
  config: {
    fullscreen: true,
    cls: 'person-list',
    layout: 'vbox',
    items: [
      {
        xtype: 'container',
        cls: 'title-toolbar',
        layout: 'hbox',
        items: [
          {
            xtype: 'button',
            itemId: 'backButton',
            baseCls: 'toolbar-button icon back'
          }, {
            xtype: 'component',
            flex: 1,
            cls: 'label',
            html: '<b>Boy</b>Meets<b>Girl</b>'
          }
        ]
      }, {
        xtype: 'container',
        cls: 'content',
        layout: 'vbox',
        flex: 1,
        items: [
          {
            xtype: 'list',
            itemId: 'personList',
            flex: 1,
            pressedCls: 'item-tapped',
            selectedCls: 'item-tapped',
            itemTpl: "					<div class='item'>						<div class='pic'>							<img src='{facebook_object.pic}' />						</div>						<div class='description'>							<div class='name'>{foreName} {[values.surName.substr(0, 1)]}. <span class='icon checked-green hidden'></span></div>							<div class='seen'>seen <b>{[parseInt((new Date().getTime() / 1000 - values.checkinTime) / 3600)]} hours</b> ago</div>							<div class='icons'>								<div class='set'>									<span class='icon heart-red'></span>									<span class='text'>{[values.facebook_object.pages.length]}</span>								</div>								<div class='set'>									<span class='icon cam-grey'></span>									<span class='text'>{[parseInt(Math.random() * 50)]}</span>								</div>							</div>						</div>					</div>				",
            store: 'Persons'
          }
        ]
      }
    ]
  }
});
