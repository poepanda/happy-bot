import _ from 'lodash';

const projectRoles = roles => (
  _.map(roles, ({ name, todo }) => `
    > - *${name}*: ${todo}\n
  `)
);

const renderProjects = (slackId, projects) => ({
  fallback: 'Po\'s Projects',
  author_name: 'Projects',
  author_icon: ':beers:',
  color: 'warning',
  text: !projects.length ? `Here are projects that <@${slackId}>'s involved` : 'None',
  fields: _.map(projects, ({ name, roles }) => ({
    title: name,
    value: projectRoles(roles),
    short: false,
  })),
});

export default (user) => {
  const {
    name,
    slackId,
    projects,
    team,
    bio,
    avatarUrl,
    email,
    role,
  } = user;
  const teamInfo = team.split(' - ');
  return {
    text: 'Here you go',
    attachments: [
      {
        fallback: `<@${slackId}> Profile`,
        author_name: name,
        author_icon: 'https://i0.wp.com/www.flyhoneystars.com/wp-content/uploads/2015/11/shopbacklogo.jpg?resize=300%2C300',
        thumb_url: avatarUrl,
        // thumb_url: 'https://theme.zdassets.com/theme_assets/716754/44f2c2d2c8c3daad077843549f93561a9bdd3f43.png',
        text: bio,
        fields: [
          {
            title: 'Team',
            value: teamInfo[1],
            short: true,
          },
          {
            title: 'Located',
            value: teamInfo[0],
            short: true,
          },
          {
            title: 'Email',
            value: email,
            short: false,
          },
          {
            title: 'Role',
            value: role,
            short: false,
          },
        ],
      },
      { ...renderProjects(slackId, projects) },
      {
        fallback: 'Call to actions',
        text: 'Something you can do',
        callback_id: `shopbacker_actions-${slackId}`,
        color: '#FF4445',
        attachment_type: 'default',
        actions: [
          {
            name: 'profile-action',
            text: 'Edit',
            type: 'button',
            value: 'edit',
          },
          {
            name: 'profile-action',
            text: 'Join project',
            type: 'button',
            value: 'join',
          },
          {
            name: 'profile-action',
            text: 'Leave project',
            type: 'button',
            value: 'leave-project',
          },
        ],
      },
    ],
  };
};
