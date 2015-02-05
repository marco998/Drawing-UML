/**
* Initializer servant à injecter le store dans les vues (par défaut le store est injecté dans les routes et controllers)
**/

export function initialize( container, app) {
  app.inject('view', 'store', 'store:main');
}

export default {
  name: 'init',
  initialize: initialize,

};
