import initDebug from 'debug';

import injectInteractions from './interactions';
import injectSubmissions from './submissions';
import injectHears from './hears';

const debug = initDebug('happy:slack:skills:shopbacker');

export default (controller) => {
  debug('Skill learned!');

  injectInteractions(controller);
  injectSubmissions(controller);
  injectHears(controller);
};
