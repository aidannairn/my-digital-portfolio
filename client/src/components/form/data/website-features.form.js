const formSettings = {
  title: 'Add A Feature',
  subtitle: 'What feature would you like to showcase?',
  inputGroups: [
    {
      inputs: [
        {
          component: 'LabelTextInput',
          properties: {
            label: 'Title',
            name: 'title',
            placeholder: 'The name of the feature',
            required: true
          }
        },
        {
          component: 'LabelTextInput',
          properties: {
            label: 'Subtitle',
            name: 'subtitle',
            placeholder: 'A brief description',
            required: true
          }
        },
        {
          component: 'LabelImageInput',
          properties: {
            label: 'Demonstration Image',
            name: 'demo',
            required: true
          }
        },
      ]
    },
    {
      settings: {
        array: {
          name: 'bullets',
          max: 3,
          dependencies: []
        }
      },
      inputs: [
        {
          component: 'LabelTextArea',
          properties: {
            label: 'Add some key points',
            rows: 5,
            name: 'point',
            placeholder: 'What does this feature do? How?'
          }
        }
      ]
    }
  ]
}

export default formSettings