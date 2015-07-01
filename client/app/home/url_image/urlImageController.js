angular.module('app.home.urlImage', [ 'ui.router'])
.controller('urlImageController', function ($scope, $state, Url) {

  $scope.send = function (cropCoor) {
    Url.postUrl(cropCoor, $scope.urlImagePreview, $scope.url, function (err, data) {
      if (err) {
        $scope.error = 'UPS! We are in troubles.';
      }else {
        $scope.$emit('emptyUrls');
        $state.go('home.list');
      }
    });
  };

})
.directive('crop', function () {

  var linker = function(scope, element, attrs){
    element.Jcrop({
      onSelect: function (c) {
        $(element).fadeOut(800);
        for (key in c) {
          c[key] = c[key] * 4;
        }
        scope.crop({cropCoor: c});
      }
    });
  };

  return {
    restrict: 'A',
    scope: {
      crop: '&',
    },
    link: linker
  }
});
