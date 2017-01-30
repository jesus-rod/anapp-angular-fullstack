import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
  $http;
  $scope;
  socket;
  awesomeThings = [];
  newThing = '';
  newThingFeatures = {};
  isLoggedIn: Function;
  getCurrentUser: Function;
  /*@ngInject*/
  constructor($http, $scope, socket, Upload, Auth) {
    this.$http = $http;
    this.socket = socket;
    this.Upload = Upload;
    this.newThingFeatures.typeFlag = 1;
    this.isLoggedIn = Auth.isLoggedInSync;
    this.$scope = $scope;
    this.getCurrentUser = Auth.getCurrentUserSync;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
  }

  $onInit() {

    this.$http.get('/api/things')
      .then(response => {
        console.log(response);
        this.awesomeThings = response.data;
        this.socket.syncUpdates('thing', this.awesomeThings);
      });
  }

  addThing() {
    if(this.newThing) {
      this.Upload.upload({
        url: 'api/media',
        data: {file: this.image}
      }).then( response =>{
        console.log(this.newThing);
        this.$http.post('/api/things', {
          name: this.newThing,
          type: this.newThingFeatures.typeFlag,
          image: response.data.path,
          postedBy: this.getCurrentUser()._id
        }).finally(()=>{
          this.newThing = '';
          this.image = {};
        });
      }).catch( err=>{
        console('err', err);
      });
    }
  }


  deleteThing(thing) {
    this.$http.delete(`/api/things/${thing._id}`);
  }

  addType(typeFlag) {
    if(typeFlag == 1){
      this.newThingFeatures.typeFlag = 1;
    }else if (typeFlag == 2){
      this.newThingFeatures.typeFlag = 2;
    }else{
      console.log("error typeFlag function")
    }
  }

  ///api/media?path=default-no-image.jpg
  fullScreen(imgRoute) {
    console.log(this.getCurrentUser()._id);
    console.log(imgRoute);
    this.$scope.currentFullScreenImage = imgRoute;
    this.$scope.fullScreenEnabled = true;
    console.log("fullscreen habilitado");
  }

  closeFullScreen(){
    this.$scope.fullScreenEnabled = false;
    console.log("fullscreen deshabilitado");
  }

}



export default angular.module('anppApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.pug'),
    controller: MainController
  })
  .name;
