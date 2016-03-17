angular.module('app')

.config(['$translateProvider', function($translateProvider) {
  $translateProvider.fallbackLanguage('en');
  $translateProvider.preferredLanguage('en');
  $translateProvider.useSanitizeValueStrategy('escape');

  // English Translation
  $translateProvider.translations('en', {
    'DISPLAY': 'Display',
    'SETTINGS': 'Settings',
    'TIP': 'tip: drag to rearrange',
    'IPCAMERAS': 'IP Cameras',
    'CONFIGURE': 'Configure Camera',
    'CFGNOTICE': 'H264 & MJPEG via RSTP/HTTP (TCP) Only',
    'CFGMPG2': 'MPEG2 Requires License',
    'SCAN': 'Scan',
    'ADDCAMERA': 'Add Camera',
    'NAME': 'Name',
    'FEEDURI': 'Feed URI',
    'JPEGURI': 'JPEG URI',
    'FEED': 'Feed',
    'ASPECTRATIO': 'Aspect Ratio',
    'FILL': 'Fill',
    'STRETCH': 'Stretch',
    'LETTERBOX': 'Letterbox',
    'AUDIOOUTPUT': 'Audio Output',
    'NONE': 'None',
    'AUDIOOUTPUT': 'Audio Output',
    'HDMI': 'HDMI',
    'SPEAKER': 'Speaker',
    'BOTH': 'Both',
    'DISCOVERY': 'Discovery',
    'HOST': 'Host/IP',
    'USERNAME': 'User Name',
    'PASSWORD': 'Password',
    'QUERYCAM': 'Query Camera',
    'DELETE': 'Delete',
    'CANCEL': 'Cancel',
    'SAVE': 'Save',
    'HOMEPAGE': 'Homepage',
    'HELP': 'Help (Wiki)',
    'SOURCE': 'Source Code (GitHub)',
    'POWERED': 'Powered by',
    'AUTHORED': 'Written by',
    'THANKS': 'Thanks To',
    'LICENSE': 'License',
    'TMDISCLAIMER': 'All product and company names are trademarks™ or registered® trademarks of their respective holders. Use of them does not imply any affiliation with or endorsement by them.',
  });

}]);
