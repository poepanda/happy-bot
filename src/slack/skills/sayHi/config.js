import sayHiDirect from './sayHiDirect';

const specialCases = {
  'ê nhóc': 'dạ?!',
  'ê cu': 'dạ?!',
};

const specialCaseKeys = Object.keys(specialCases);

export const listenTo = [
  {
    name: 'Direct message - Saying hi!',
    patterns: ['^hi', '^hello', ...specialCaseKeys],
    from: 'direct_message',
    examples: [
      {
        heard: 'hi',
        reply: 'hi',
      },
      {
        heard: 'hello',
        reply: 'hi',
      },
      ...specialCaseKeys.map(key => ({
        heard: key,
        reply: specialCases[key],
      })),
    ],
    handler: sayHiDirect(specialCases),
  },
];

export default {
  listenTo,
};
