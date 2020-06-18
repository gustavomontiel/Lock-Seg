import { ThemeableBrowserOptions } from '@ionic-native/themeable-browser/ngx';

export const optionsThemeable: ThemeableBrowserOptions = {
    statusbar: {
      color: '#ffffffff'
    },
    toolbar: {
      height: 44,
      color: '#F58220'
    },
    title: {
      color: '#003264ff',
      showPageTitle: false,
      staticText: ''
    },
    backButton: {
      image: 'back',
      imagePressed: 'back_pressed',
      align: 'left',
      event: 'backPressed'
  },
    closeButton: {
      wwwImage: 'assets/imgs/back.png',
      wwwImagePressed: 'assets/imgs/back.png',
      wwwImageDensity: 2,
      align: 'left',
      event: 'closePressed'
    },
    backButtonCanClose: true
  };
