angular.module("app")
  // Translations are loaded out of /public/language

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
