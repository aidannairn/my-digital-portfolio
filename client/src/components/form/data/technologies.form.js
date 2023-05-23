const formSettings = {
  title: 'Add A Technology',
  subtitle: "List some of the technologies you're confident with",
  inputGroups: [
    {
      inputs: [
        {
          component: 'LabelTextInput',
          properties: {
            label: 'Name',
            name: 'name',
            placeholder: 'The name of the technology',
            required: true
          }
        },
        {
          component: 'LabelImageInput',
          properties: {
            label: 'Logo',
            name: 'logo',
            required: true
          }
        },
        {
          component: 'LabelTextInput',
          properties: {
            label: 'Documentation Link',
            name: 'docsURL',
            placeholder: "Link to this technology's documentation",
          }
        }
      ]
    }
  ]
}

export default formSettings