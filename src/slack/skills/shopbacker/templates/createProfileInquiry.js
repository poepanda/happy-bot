const profileInquiry = (user, tryAgain = false) => ({
  text: tryAgain
    ? '...'
    : 'Oops! I could not find this shopbacker profile',
  attachments: [
    {
      fallback: 'Call to actions',
      text: tryAgain
        ? 'What you want to do now?'
        : 'You want me to add it? You will need to fill in some information ;)',
      callback_id: `new_shopbacker-${user}`,
      color: '#FF4445',
      attachment_type: 'default',
      actions: [
        {
          name: 'profile-action',
          text: tryAgain ? 'Try again' : 'Yes',
          type: 'button',
          value: 'create',
        },
        {
          name: 'profile-action',
          text: tryAgain ? 'Cancel' : 'No',
          type: 'button',
          value: 'cancel',
        },
      ],
    },
  ],
});

export default profileInquiry;
