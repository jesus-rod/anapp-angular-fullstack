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
};

export default class SignupController {
  user: User = {
    name: '',
    lastname: '',
    nacionalidad: '',
    cedula: '',
    email: '',
    password: ''
  };
  errors = {};
  submitted = false;
  Auth;
  $state;

  /*@ngInject*/
  constructor(Auth, $state) {
    this.Auth = Auth;
    this.$state = $state;
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
