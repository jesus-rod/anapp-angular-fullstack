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
  constructor($http, $scope, socket, Upload, Auth, $timeout) {
    this.$http = $http;
    this.socket = socket;
    this.Upload = Upload;
    this.newThingFeatures.typeFlag = 1;
    this.isLoggedIn = Auth.isLoggedInSync;
    this.$scope = $scope;
    this.getCurrentUser = Auth.getCurrentUserSync;
    this.busy = false;
    this.items = [];
    this.page = 0;
    this.timeout = $timeout;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
  }

  $onInit() {

    // this.$http.get('/api/things')
    //   .then(response => {
    //     console.log(response);
    //     this.items = response.data;
    //     this.socket.syncUpdates('thing', this.items);
    //   });
  }
  nextPage(){
    if (this.busy) return;
    this.busy = true;
    this.$http.get('/api/things/page?page='+this.page)
      .then(response => {
        console.log(response.data);
        if(response.data.length){
          this.busy = false;
          this.page++;
          this.items = this.items.concat(response.data);
        }else{
          this.busy = true;
          this.timeout(()=>{
            this.busy = false;
          },2000);
        }
        console.log('this.items', this.items)
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
        }).then((response) => {
          console.log("-->", this.newThing);
          console.log("-->", response.data);
          response.data.postedBy = {
            name: this.getCurrentUser().name
          };
          this.items.splice(0, 0, response.data);

          console.log("items -->", this.items);
          // this.socket.syncUpdates('thing', this.items);
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
    this.socket.syncUpdates('thing', this.items);
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
    this.$scope.currentFullScreenImage = imgRoute;
    this.$scope.fullScreenEnabled = true;
  }

  closeFullScreen(){
    this.$scope.fullScreenEnabled = false;
  }

}



export default angular.module('anppApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.pug'),
    controller: MainController
  })
  .name;
