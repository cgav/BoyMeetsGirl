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
            flex: 1,
            pressedCls: 'item-tapped',
            selectedCls: 'item-tapped',
            itemTpl: "					<div class='item'>						<div class='pic'>							<img src='{pic}' />						</div>						<div class='description'>							<div class='name'>{name} <span class='icon checked-green hidden'></span></div>							<div class='seen'>seen <b>{seen}</b> ago</div>							<div class='icons'>								<div class='set'>									<span class='icon heart-red'></span>									<span class='text'>{interests}</span>								</div>								<div class='set'>									<span class='icon cam-grey'></span>									<span class='text'>{photos}</span>								</div>							</div>						</div>					</div>				",
            data: [
              {
                pic: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc3/c0.0.628.628/s320x320/1379474_10152281554223765_259450346_n.jpg',
                name: 'Julia N.',
                seen: '30 minutes',
                interests: 8,
                photos: 20
              }, {
                pic: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc3/c0.0.628.628/s320x320/1379474_10152281554223765_259450346_n.jpg',
                name: 'Julia N.',
                seen: '30 minutes',
                interests: 8,
                photos: 20
              }, {
                pic: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc3/c0.0.628.628/s320x320/1379474_10152281554223765_259450346_n.jpg',
                name: 'Julia N.',
                seen: '30 minutes',
                interests: 8,
                photos: 20
              }
            ]
          }
        ]
      }
    ]
  }
});
