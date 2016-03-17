angular.module("app")

.config(["$translateProvider", function($translateProvider) {
  $translateProvider.fallbackLanguage("en");
  $translateProvider.preferredLanguage("en");
  $translateProvider.useSanitizeValueStrategy("escape");

  // English Translation
  $translateProvider.translations("en", {
    "DISPLAY": "Display",
    "SETTINGS": "Settings",
    "TIP": "tip: drag to rearrange",
    "IPCAMERAS": "IP Cameras",
    "CONFIGURE": "Configure Camera",
    "CFGNOTICE": "H264 and MJPEG via RSTP/HTTP (TCP) Only",
    "CFGMPG2": "MPEG2 Requires License",
    "SCAN": "Scan",
    "ADDCAMERA": "Add Camera",
    "NAME": "Name",
    "FEEDURI": "Feed URI",
    "JPEGURI": "JPEG URI",
    "ASPECTRATIO": "Aspect Ratio",
    "FILL": "Fill",
    "STRETCH": "Stretch",
    "LETTERBOX": "Letterbox",
    "AUDIOOUTPUT": "Audio Output",
    "NONE": "None",
    "HDMI": "HDMI",
    "SPEAKER": "Speaker",
    "BOTH": "Both",
    "DISCOVERY": "Discovery",
    "HOST": "Host/IP",
    "USERNAME": "User Name",
    "PASSWORD": "Password",
    "QUERYCAM": "Query Camera",
    "DELETE": "Delete",
    "CANCEL": "Cancel",
    "SAVE": "Save",
    "HOMEPAGE": "Project Website",
    "VERSION": "Version",
    "HWINFO": "Raspberry Pi Hardware Details",
    "VIDINFO": "Hardware Video Support",
    "CPUSERIAL": "Serial Number",
    "BUYLICENSE": "Purchase License Keys",
    "ENABLED": "enabled",
    "DISABLED": "disabled",
    "SUPPORT": "Support",
    "HELP": "Help (Wiki)",
    "SOURCE": "Source Code (GitHub)",
    "POWERED": "Powered by",
    "AUTHORED": "Written by",
    "THANKS": "Thanks To",
    "LICENSE": "License",
    "TMDISCLAIMER": "All product and company names are trademarks™ or registered® trademarks of their respective holders. Use of them does not imply any affiliation with or endorsement by them.",
  });

  // French Translation - Google Translate
  $translateProvider.translations("fr", {
    "DISPLAY": "Afficher",
    "SETTINGS": "Configures",
    "TIP": "astuce: faites glisser pour réorganiser",
    "IPCAMERAS": "Caméras IP",
    "CONFIGURE": "Configurer la caméra",
    "CFGNOTICE": "H264 et MJPEG via RSTP / HTTP (TCP) seulement",
    "CFGMPG2": "MPEG2 Requiert License",
    "SCAN": "Balayage",
    "ADDCAMERA": "Ajouter Appareil photo",
    "NAME": "Nom",
    "FEEDURI": "Alimenter URI",
    "JPEGURI": "JPEG URI",
    "ASPECTRATIO": "Ratio d'aspect",
    "FILL": "Remplir",
    "STRETCH": "Étendue",
    "LETTERBOX": "Letterbox",
    "AUDIOOUTPUT": "Sortie audio",
    "NONE": "Aucun",
    "HDMI": "HDMI",
    "SPEAKER": "Orateur",
    "BOTH": "Tous les deux",
    "DISCOVERY": "la découverte",
    "HOST": "Host/IP",
    "USERNAME": "Nom d'utilisateur",
    "PASSWORD": "Mot de passe",
    "QUERYCAM": "Caméra Query",
    "DELETE": "Effacer",
    "CANCEL": "Annuler",
    "SAVE": "Sauvegarder",
    "HOMEPAGE": "Page d'accueil",
    "HELP": "Aidez-moi (Wiki)",
    "SOURCE": "Code source (GitHub)",
    "POWERED": "Alimenté par",
    "AUTHORED": "Écrit par",
    "THANKS": "Grâce à",
    "LICENSE": "License",
    "TMDISCLAIMER": "Tous les noms de produits et de sociétés sont des marques commerciales ou des marques déposées ™ registered® de leurs détenteurs respectifs. L`utilisation d`entre eux ne comporte aucune affiliation avec ou approbation par eux.",
  });

}]);
