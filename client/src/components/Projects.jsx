import { useState, useRef, useContext } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import Tilt from 'react-parallax-tilt'

import { styles } from '../styles'
import { SectionWrapper } from '../hoc'
import { chainLink, projects } from '../constants'
import { fadeIn, textVariant } from '../utils/motion'
import { UserContext } from '../contexts/UserContext'
import Form from './form/Form'
import Modal from '../hoc/Modal'

const ProjectCard = ({ index, name, description, tags, image, links }) => {
  const [isSrcListVisible, setIsSrcListVisible] = useState(false) 

  return (
    <Tilt className='sm:w-[360px] w-full'>
      <motion.div
        className='bg-tertiary p-5 rounded-2xl'
        variants={fadeIn('up', 'spring', (index * 0.5) + 1, 0.75)}
      >
        <div options={{
          max: 45,
          scale: 1,
          speed: 450
        }}>
          <div 
            className={`relative w-full max-h-[180px] h-[180px] p-px rounded-2xl 
            ${isSrcListVisible ? 'green-blue-gradient' : ''}`}
          >
            <div className='bg-tertiary rounded-2xl h-[178px]'>
              <img
                src={image}
                alt={name}
                className={`w-full h-full object-cover rounded-2xl ${isSrcListVisible ? 'invisible' : 'visible'}`}
              />
              <div
                className='absolute inset-0 h-full flex justify-end card-img_hover w-full'
              >
                <div
                  onMouseLeave={() => setIsSrcListVisible(false)}
                  className='w-full flex flex-col items-end'
                >
                  { links && (
                      <div className={`w-10 h-10 p-2 m-2 rounded-full cursor-pointer blue-dark-gradient ${isSrcListVisible ? 'border-2 border-[#000D26]' : ''}`}>
                        <img
                          onClick={() => setIsSrcListVisible(true)}
                          className='invert'
                          src={chainLink} alt='GitHub logo'
                        />
                      </div>
                  )}
                  { isSrcListVisible && (
                    <div className='w-full flex flex-col mb-2 scrollbar items-end overflow-y-auto'>
                      { links?.map((link, i) => (
                        <a
                          key={i}
                          href={link.url}
                          target='_blank'
                          className='text-right py-1 mr-2 capitalize w-fit'
                        >
                          { link.title }
                        </a>
                      ))}
                    </div>
                  )} 
                </div>
              </div>

            </div>
          </div>
          <div className='mt-5'>
            <h3 className='text-white font-bold text-[24px]'>{name}</h3>
            <p className='mt-2 text-secondary text-[14px]'>{description}</p>
          </div>
          <div className='mt-4 flex flex-wrap gap-2'>
            {tags.map((tag) => (
              <p key={tag.name} className={`text-[14px] ${tag.color || 'blue-text-gradient'}`}>
                {tag.name}
              </p>
            ))}
          </div>
        </div>
      </motion.div>
    </Tilt>
  )
}

const Projects = () => {
  const formRef = useRef(null)
  const { user: { id: userId } } = useContext(UserContext)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const form = formRef.current.getFormState()
      setLoading(true)

      const formData = new FormData()
      formData.append('image', form.image)
      formData.append('name', form.projectTitle)
      formData.append('description', form.description)
      formData.append('projectLinks', JSON.stringify(form.projectLinks))
      formData.append('projectTags', JSON.stringify(form.projectTags))
      formData.append('userId', userId)
    
      await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/project/create`,
        formData,
        { 
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

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
      },
    ],
    submit: {
      action: handleSubmit,
      text: loading ? 'Submitting Project...' : 'Submit Project'
    }
  }

  const FormModal = Modal(Form)

  return (
    <>
      { userId &&
        <FormModal
          ref={formRef}
          modal={{
            visibility: isModalVisible,
            close: () => setIsModalVisible(false)
          }}
          {...formSettings}
        />
      }
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Things that I have created</p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
      </motion.div>
      <motion.p
        variants={fadeIn('', '', 1, 1)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
        The following projects showcase my skills and experience through real-world examples of my work. They reflect my ability to solve complex problems, work with different technologies and manage projects efficiently and effectively.
      </motion.p>
      { userId &&
        <motion.div
          variants={fadeIn('', '', 1, 1)}
          className='flex gap-5 mt-5'
        >
          <div className='green-blue-gradient hover:green-blue-gradient--hover rounded-lg p-px'>
            <button className='bg-primary hover:bg-tertiary rounded-lg p-2' onClick={() => setIsModalVisible(true)}>Add Project</button>
          </div>
        </motion.div>
      }
      <div className='mt-20 flex flex-wrap gap-7'>
        { projects.map((project, i) => (
          <ProjectCard key={`project-${i}`} index={i} {...project} />
        ))}
      </div>
    </>
  )
}

export default SectionWrapper(Projects, 'projects')