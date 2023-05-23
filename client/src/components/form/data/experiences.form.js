const formSettings = {
  title: 'Add A Learning Experience',
  subtitle: 'Where did you get qualified?',
  inputGroups: [
    {
      settings: {
        heading: 'General'
      },
      inputs: [
        {
          component: 'LabelTextInput',
          properties: {
            label: 'Education Provider',
            name: 'provider',
            placeholder: 'Where did/do you study?',
            required: true
          }
        },
        {
          component: 'LabelImageInput',
          properties: {
            label: 'Logo',
            name: 'logo',
          }
        },
        {
          component: 'LabelColorInput',
          properties: {
            label: 'Logo Background Colour',
            name: 'logoBgColor'
          }
        },
        {
          component: 'LabelTextInput',
          properties: {
            label: 'Qualification',
            name: 'qualification',
            placeholder: 'What is the name of your qualification?',
            required: true
          },
        },
        {
          component: 'LabelImageInput',
          properties: {
            label: 'Certificate',
            name: 'certificate',
          }
        }
      ]
    },
    {
      settings: {
        heading: 'Dates',
      },
      inputs: [
        {
          component: 'LabelCalendar',
          properties: {
            label: 'From',
            name: 'dateFrom',
            required: true,
            untilNow: true
          },
        },
        {
          component: 'LabelCalendar',
          properties: {
            label: 'To',
            name: 'dateTo'
          },
        },
        {
          component: 'LabelMultiChoice',
          properties: {
            label: 'Are you still working towards this qualification?',
            name: 'activelyLearning',
            options: [
              { name: 'No', value: false },
              { name: 'Yes', value: true }
            ],
            required: true
          },
        },
      ]
    },
    {
      settings: {
        heading: 'Add your skills',
        array: {
          name: 'bullets',
          dependencies: []
        }
      },
      inputs: [
        {
          component: 'LabelTextArea',
          properties: {
            label: 'Skill',
            rows: 5,
            name: 'skill',
            placeholder: 'What did this course teach you?'
          }
        }
      ]
    }
  ]
}

export default formSettings