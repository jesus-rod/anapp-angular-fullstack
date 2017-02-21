'use strict';
// @flow

import angular from 'angular';

type User = {
  name: string;
  lastname: string;
  nacionalidad: string;
  cedula: string;
  email: string;
  password: string;
  estado: string;
  parroquia: string;
};

export default class SignupController {
  user: User = {
    name: '',
    lastname: '',
    nacionalidad: '',
    cedula: '',
    email: '',
    password: '',
    estado: '',
    parroquia: ''
  };
  errors = {};
  submitted = false;
  Auth;
  $state;

  /*@ngInject*/
  constructor($http, Auth, $state, $filter) {
    this.Auth = Auth;
    this.$state = $state;
    this.$http = $http;
    this.$filter = $filter;
    this.estados = [];
    this.parroquias = [];
  }

  $onInit(){
    this.$http.get('/api/estados')
      .then(response => {
        console.log(response);
        this.estados = response.data;
      });
  }

  updateParroquias(){
    var estadoElegido = this.$filter('filter')(this.estados, {_id: this.user.estado })[0];
    this.parroquias = estadoElegido.parroquiasOwned;
  }


  register(form) {
    this.submitted = true;

    if(form.$valid) {
      return this.Auth.createUser({
        name: this.user.name,
        lastname: this.user.lastname,
        nacionalidad: this.user.nacionalidad,
        cedula: this.user.cedula,
        email: this.user.email,
        estado: this.user.estado,
        parroquia: this.user.parroquia,
        password: this.user.password
      })
        .then(() => {
          // Account created, redirect to home
          this.$state.go('main');
        })
        .catch(err => {
          err = err.data;
          this.errors = {};
          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, (error, field) => {
            form[field].$setValidity('mongoose', false);
            this.errors[field] = error.message;
          });
        });
    }
  }
}
