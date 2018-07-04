import glob from 'glob';
import Promise from 'bluebird';
import initDebug from 'debug';
import path from 'path';

const debug = initDebug('happy:slack:utils:skillDictionary');

export default () => (
  new Promise((resolve) => {
    glob(path.join(__dirname, '../skills/**/config.js'), {}, (err, files) => {
      let skills = [];

      debug('getting library', files);
      files.forEach((Skill) => {
        // eslint-disable-next-line
        const { listenTo } = require(Skill);
        skills = [
          ...skills,
          ...listenTo,
        ];
      });
      resolve(skills);
    });
  })
);
