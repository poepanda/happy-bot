import auth from './auth';
import incomingWebhook from './incoming-webhook';
import dictionary from './dictionary';

export default (app, controller) => {
  auth(app, controller);
  incomingWebhook(app, controller);
  dictionary(app);
};
