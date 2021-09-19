require('./bootstrap');
import Vue from 'vue';




chrome.contextMenus.create({
    title: "Search Whitaker's Words",
    contexts: ["selection"]
});


chrome.contextMenus.onClicked.addListener(function() {
    chrome.runtime.sendMessage({ method: "getSelection" }, function (response) {
        sendToWW(response.data);
    });
});

function sendToWW(selectedText) {
    var serviceCall = 'http://archives.nd.edu/cgi-bin/wordz.pl?keyword=' + selectedText;
    chrome.tabs.create({ url: serviceCall });
}

window.Vue = require('vue');

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueAxios from 'vue-axios';
import axios from 'axios';

import App from './App.vue';
Vue.use(VueAxios, axios);

import HomeComponent from './components/HomeComponent.vue';
import CreateComponent from './components/CreateComponent.vue';
import IndexComponent from './components/IndexComponent.vue';
import EditComponent from './components/EditComponent.vue';

const routes = [
  {
      name: 'home',
      path: '/',
      component: HomeComponent
  },
  {
      name: 'create',
      path: '/create',
      component: CreateComponent
  },
  {
      name: 'posts',
      path: '/posts',
      component: IndexComponent
  },
  {
      name: 'edit',
      path: '/edit/:id',
      component: EditComponent
  }
];

const router = new VueRouter({ mode: 'history', routes: routes});
const app = new Vue(Vue.util.extend({ router }, App)).$mount('#app');
