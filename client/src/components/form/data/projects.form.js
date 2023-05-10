const formSettings = {
  title: 'Add A Project',
  subtitle: 'Share examples of your work',
  inputGroups: [
    {
      settings: {
        heading: 'General'
      },
      inputs: [
        {
          component: 'LabelTextInput',
          properties: {
            label: 'Project Name',
            name: 'projectTitle',
            placeholder: 'What is your project called?',
            required: true
          }
        },
        {
          component: 'LabelImageInput',
          properties: {
            label: 'Image',
            name: 'image',
            required: true
          }
        },
        {
          component: 'LabelTextArea',
          properties: {
            label: 'Description',
            rows: 5,
            name: 'description',
            placeholder: 'Tell everyone a little bit about your project.',
            required: true
          }
        }
      ]
    },
    {
      settings: {
        heading: 'Project Links',
        array: {
          name: 'projectLinks',
          dependencies: ['linkName', 'linkURL']
        }
      },
      inputs: [
        {
          component: 'LabelTextInput',
          properties: {
            label: 'Title',
            name: 'linkName',
            placeholder: 'Where does this link go?'
          },
        },
        {
          component: 'LabelTextInput',
          properties: {
            label: 'URL',
            name: 'linkURL',
            placeholder: 'Enter the URL to the webpage.'
          },
        }
      ]
    },
    {
      settings: {
        heading: 'Project Tags',
        array: {
          name: 'projectTags',
          max: 5,
          dependencies: ['tagName']
        }
      },
      inputs: [
        {
          component: 'LabelTextInput',
          properties: {
            label: 'Tag',
            name: 'tagName',
            placeholder: 'Status, tech stack, etc.',
          },
        },
        {
          component: 'LabelColorInput',
          properties: {
            label: 'Colour',
            name: 'tagColor'
          }
        }
      ]
    }
  ]
}

export default formSettings