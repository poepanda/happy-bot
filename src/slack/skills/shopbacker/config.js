import showShopbacker from './hears/shopbacker.show';

export const listenTo = [
  {
    name: 'Show/Find a shopbacker',
    patterns: [/^<@(.*)>$/, /^me$/],
    from: 'direct_message',
    examples: [
      {
        heard: '@Alex',
        reply: 'Alex info',
      },
    ],
    handler: showShopbacker,
  },
];

export const ACTIONS_ID = {
  new: 'new_shopbacker/create',
  edit: 'shopbacker_actions/edit',
  joinProject: 'shopbacker_actions/join_project',
  leaveProject: 'shopbacker_actions/leave_project',
};

export default {
  listenTo,
};
