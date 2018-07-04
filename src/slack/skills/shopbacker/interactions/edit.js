import _ from 'lodash';
import initDebug from 'debug';

import sendNewShopbackerForm from '../dialogs/new';

const debug = initDebug('happy:slack:skills:shopbacker:interact');

export default (bot, message, { me }) => {
  return sendNewShopbackerForm(bot, message, { me });
};
