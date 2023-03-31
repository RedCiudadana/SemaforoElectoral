import EmberRouter from '@ember/routing/router';
import config from './config/environment';
import RouterScroll from 'ember-router-scroll';
import { inject as service } from '@ember/service';
import { scheduleOnce } from '@ember/runloop';
import { get } from '@ember/object';

const Router = EmberRouter.extend(RouterScroll, {
  location: config.locationType,
  rootURL: config.rootURL,
  locationType: 'router-scroll',
  metrics: service(),

  didTransition() {
    this._super(...arguments);
    this._trackPage();
  },

  _trackPage() {
    scheduleOnce('afterRender', this, () => {
      const page = this.get('url');
      const title = this.getWithDefault('currentRouteName', 'unknown');

      get(this, 'metrics').trackPage('GoogleAnalytics', { page, title });
    });
  }
});

Router.map(function() {
  this.route('metodologia');

  this.route('index', { path: '/'}, function() {
    this.route('previo');
    this.route('durante', { path: '/'});
    this.route('despues');
  });

  this.route('material', { path: '/material'});
});

export default Router;
