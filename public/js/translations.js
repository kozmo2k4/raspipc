angular.module("app")
  // Translations are now loaded out of /public/language/local-XX.json
  .config(["$translateProvider", function($translateProvider) {
    $translateProvider.fallbackLanguage("en");
    $translateProvider.preferredLanguage("en");
    $translateProvider.useSanitizeValueStrategy("escape");

    var fileNameConvention = {
      prefix: 'language/locale-',
      suffix: '.json'
    };

    $translateProvider.useStaticFilesLoader(fileNameConvention);
  }]);
