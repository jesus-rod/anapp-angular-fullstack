'use strict'

const angular = require('angular');
const uiRouter = require('angular-ui-router');
import routes from './diputados.routes';



export class DiputadosComponent {

  $http;
  $scope;
  moment;

  getCurrentUser: Function;
  /*@ngInject*/
  constructor($http, $scope, moment, Auth) {
    this.$http = $http;
    this.$scope = $scope;
    this.moment = moment;
    this.message = 'Hello';
    this.items = [];
    this.minDate = this.moment();
    this.pickerDate = this.moment().format('DD/MM/YYYY');
    this.newAgenda = {};
    this.warning = true;


    this.getCurrentUser = Auth.getCurrentUserSync;
  }


  $onInit() {

    this.$http.get('/api/things/state')
      .then(response => {
        console.log(response);
        this.items = response.data;
        console.log("min date is ", this.minDate);
        console.log("selected date is ", this.pickerDate);
      });
  }


  addAgenda() {
    console.log("my date is",this.pickerDate);
    this.newAgenda.date = this.moment(this.pickerDate, "DD/MM/YYYY").toISOString();
    console.log(this.newAgenda);
    // print(this.newAgenda);

    if (this.newAgenda.title && this.newAgenda.content && this.newAgenda.date) {
      console.log("all good");
      this.warning = false;



      this.$http.post('/api/agendas', {
        title: this.newAgenda.title,
        content: this.newAgenda.content,
        date: this.newAgenda.date,
        postedBy: this.getCurrentUser()._id
      })
        .then((response) => {
          console.log("-->", this.newAgenda);
          console.log("-->", response.data);
          response.data.postedBy = {
            name: this.getCurrentUser().name
          };

        }).finally(() => {
          this.newAgenda = {};
          this.warning = true;
          swal("Agenda", "Nuevo evento agregado a la agenda", "success");

        }).catch(err => {
          console('err', err);
          swal("Error", "Hubo un problema al agregar evento a la agenda", "error");
        });



    } else {
      this.warning = true;
      console.log("all not good");
      swal("Error", "Debes llenar todos los campos para poder agregar un nuevo evento", "error");
    }


  }

  ///api/media?path=default-no-image.jpg
  fullScreen(imgRoute) {
    this.$scope.currentFullScreenImage = imgRoute;
    this.$scope.fullScreenEnabled = true;
  }

  closeFullScreen() {
    this.$scope.fullScreenEnabled = false;
  }

}

export default angular.module('anappAngularFullstackApp.diputados', ['anppApp.auth', uiRouter])
  .config(routes)
  .component('diputados', {
    template: require('./diputados.pug'),
    controller: DiputadosComponent,
    controllerAs: 'diputadosCtrl'
  })
  .name;
