import initDebug from 'debug';

const debug = initDebug('happy:db:utils:error');

const dbErrorMessage = (err) => {
  if (!err.code) {
    debug('We got unknown error: ', err);
    return 'Database unknown error!';
  }
  switch (err.code) {
    case 11000: return 'Already existed! Please update instead';
    default: return `Database Unknown error: ${err.code} - ${err.toSting()}`;
  }
};

export default (err, formatMessage) => {
  let errorMessage = '';
  const { errors } = err;
  if (errors && errors instanceof Object) {
    Object.keys(errors).forEach((key) => {
      errorMessage += formatMessage(errors[key].message);
    });
  } else {
    return formatMessage(dbErrorMessage(err));
  }
  return errorMessage;
};
