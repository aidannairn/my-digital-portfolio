const formSettings = {
  inputGroups: [{
    inputs: [{
      component: 'LabelTextInput',
      properties: {
        label: 'Email',
        name: 'email',
        placeholder: 'What is your email?',
      }
    },
    {
      component: 'LabelTextInput',
      properties: {
        label: 'Password',
        type: 'password',
        name: 'password',
        placeholder: '********',
      }
    }]
  }] 
}

export default formSettings