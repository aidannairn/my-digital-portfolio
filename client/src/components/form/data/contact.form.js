const formSettings = {
  inputGroups: [
    { inputs: [
      {
        component: 'LabelTextInput',
        properties: {
          label: 'Name',
          name: 'name',
          placeholder: 'What is your name?',
          required: true
        }
      },
      {
        component: 'LabelTextInput',
        properties: {
          label: 'Email',
          name: 'email',
          type: 'email',
          placeholder: 'What is your email address?',
          required: true
        }
      },
      {
        component: 'LabelTextArea',
        properties: {
          label: 'Message',
          rows: 5,
          name: 'message',
          placeholder: 'What would you like to say?',
          required: true
        }
      }
    ]}
  ]
}

export default formSettings