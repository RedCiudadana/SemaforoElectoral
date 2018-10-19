import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({

    spreadsheets: service(),

    model() {
        return this.get('spreadsheets').fetch('/static-files/campana');
    }
});
