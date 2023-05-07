import { useState, useRef, useContext } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import Tilt from 'react-parallax-tilt'

import { styles } from '../styles'
import { SectionWrapper } from '../hoc'
import { chainLink } from '../constants'
import { fadeIn, textVariant } from '../utils/motion'
import { UserContext } from '../contexts/UserContext'
import { FormModal, OnConfirmModal } from './modals'

const ProjectCard = ({ index, _id, name, description, tags, imageURL, links, userId: author, currentUser }) => {
  const [isSrcListVisible, setIsSrcListVisible] = useState(false) 
  const [isDeleteModalExpanded, setIsDeleteModalExpanded] = useState(false)

  const removeAProject = async () => {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_SERVER_BASE_URL}/api/project/${_id}`)
    } catch (error) {
      console.error(error)
    }
  }

  const displayDeleteMessage = () => (
    <h2 className='my-4 font-extralight'>
      You are about to remove <span className='italic'>{name}</span> from your projects.
    </h2>
  )

  return (
    <>
      { author === currentUser && 
        isDeleteModalExpanded &&
        <OnConfirmModal
          modal={{
            visibility: isDeleteModalExpanded,
            close: () => setIsDeleteModalExpanded(false)
          }}
          message={displayDeleteMessage}
          action={removeAProject}
        />
      }
      <Tilt className='sm:w-[360px] max-w-[90vw]'>
        <motion.div
          className='bg-tertiary h-full p-5 rounded-2xl'
          variants={fadeIn('up', 'spring', (index * 0.5) + 1, 0.75)}
        >
          <div 
            options={{
              max: 45,
              scale: 1,
              speed: 450
            }}
            className='flex flex-col justify-content-stretch h-full'
          >
            <div 
              className={`relative w-full p-px rounded-2xl 
              ${isSrcListVisible ? 'green-blue-gradient' : ''}`}
            >
              <div className='bg-tertiary rounded-2xl h-[178px]'>
                <img
                  src={`${import.meta.env.VITE_MEDIA_BUCKET}/${imageURL}`}
                  alt={name}
                  className={`w-full h-full object-cover rounded-2xl ${isSrcListVisible ? 'invisible' : 'visible'}`}
                />
                <div
                  className='absolute inset-0 flex justify-end card-img_hover w-full'
                >
                  <div
                    onMouseLeave={() => setIsSrcListVisible(false)}
                    className='w-full flex flex-col items-end'
                  >
                    <div className='flex gap-2 mr-2 mt-2'>
                      { author === currentUser &&
                        <button
                          className='w-10 h-10 p-2 flex items-center justify-center rounded-full  blue-dark-gradient'
                          onClick={() => setIsDeleteModalExpanded(true)}
                        >
                          <i className='fa fa-trash-o text-lg' aria-hidden='true'></i>
                        </button>
                      }
                      { !!links.length && (
                        <button
                          className={`w-10 h-10 p-2 ml-0 rounded-full  blue-dark-gradient ${isSrcListVisible ? 'border-2 border-[#000D26]' : ''}`}
                          onClick={() => setIsSrcListVisible(true)}
                        >
                          <img
                            className='invert'
                            src={chainLink} alt='Show links icon'
                          />
                        </button>
                      )}
                    </div>
                    { isSrcListVisible && (
                      <div className='w-full flex flex-col mb-2 scrollbar items-end overflow-y-auto'>
                        { links?.map((link, i) => (
                          <a
                            key={i}
                            href={link.linkURL}
                            target='_blank'
                            className='text-right py-1 mr-2 capitalize w-fit'
                          >
                            { link.linkName }
                          </a>
                        ))}
                      </div>
                    )} 
                  </div>
                </div>

              </div>
            </div>
            <div className='flex-grow mt-5'>
              <h3 className='text-white font-bold text-[24px]'>{name}</h3>
              <p className='mt-2 text-secondary text-[14px] whitespace-pre-line'>{description}</p>
            </div>
            <div className='mt-4 flex flex-wrap gap-2'>
              {tags.map((tag) => (
                <p
                  key={tag.tagName}
                  className='text-[14px]'
                  style={{ color: tag.tagColor || '#0088FE' }}
                >
                  {tag.tagName}
                </p>
              ))}
            </div>
          </div>
        </motion.div>
      </Tilt>
    </>
  )
}

const Projects = ({ projects }) => {
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

  return (
    <div className='flex flex-col'>
      { userId === import.meta.env.VITE_INITIAL_USER_ID &&
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
      { userId === import.meta.env.VITE_INITIAL_USER_ID &&
        <motion.div
          variants={fadeIn('', '', 1, 1)}
          className='flex gap-5 mt-5'
        >
          <div className='green-blue-gradient hover:green-blue-gradient--hover rounded-lg p-px'>
            <button className='bg-primary hover:bg-tertiary rounded-lg p-2' onClick={() => setIsModalVisible(true)}>
              Add A Project
            </button>
          </div>
        </motion.div>
      }
      <div
        className='mt-20 grid gap-7 w-full justify-center'
        style={{ gridTemplateColumns: 'repeat(auto-fill, 360px)' }}
      >
        { projects.map((project, i) => (
          <ProjectCard key={`project-${i}`} index={i} {...project} currentUser={userId || null} />
        ))}
      </div>
    </div>
  )
}

export default SectionWrapper(Projects, 'projects')