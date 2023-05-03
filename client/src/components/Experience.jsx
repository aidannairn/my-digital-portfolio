import { useContext, useRef, useState } from 'react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import { motion } from 'framer-motion'
import axios from 'axios'

import { styles } from '../styles'
import { experiences } from '../constants'
import { SectionWrapper } from '../hoc'
import { fadeIn, textVariant } from '../utils/motion'
import { UserContext } from '../contexts/UserContext'
import Form from './form/Form'
import Modal from '../hoc/Modal'

import 'react-vertical-timeline-component/style.min.css'

const ExperienceCard = ({ experience }) => (
  <VerticalTimelineElement
    contentStyle={{ background: '#00143a', color: '#FFF' }}
    contentArrowStyle={{ borderRight: '7px solid #232631' }}
    date={experience.period}
    iconStyle={{ background: experience.iconBg || 'rgb(0, 20, 58)' }}
    icon={
      <div className='flex justify-center items-center w-full h-full'>
        <img
          src={experience.icon}
          alt={experience.company_name}
          className='w-[60%] h-[60%] object-contain'
        />
      </div>
    }
  >
    <div>
      <h3 className='text-white whitespace-pre-line text-[24px] font-bold'>{experience.title}</h3>
      <p className='text-secondary text-[16px] font-semibold' style={{ margin: 0 }}>{experience.company_name}</p>
    </div>
    <ul className='mt-5 list-disc ml-5 space-y-2'>
      {experience.points.map((point, i) => (
        <li
          key={`experience-point-${i}`}
          className='text-white-100 text-[14px] pl-1 tracking-wider'
        >
          {point}
        </li>
      ))}
    </ul>
  </VerticalTimelineElement>
)

const Experience = () => {
  const formRef = useRef(null)
  const { user: { id: userId } } = useContext(UserContext)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const form = formRef.current.getFormState()
      setLoading(true)

      const bullets = await form.bullets.map(bullet => bullet.skill)

      const formData = new FormData()
      formData.append('provider', form.provider)
      formData.append('logo', form.logo)
      formData.append('qualification', form.qualification)
      formData.append('certificate', form.certificate)
      formData.append('dateFrom', form.dateFrom)
      formData.append('dateTo', form.activelyLearning ? '' : form.dateTo)
      formData.append('bullets', JSON.stringify(bullets))
      formData.append('userId', userId)
    
      await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/education/create`,
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
    ],
    submit: {
      action: handleSubmit,
      text: loading ? 'Submitting Experience...' : 'Submit Experience'
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
        <p className={styles.sectionSubText}>What I have done so far</p>
        <h2 className={styles.sectionHeadText}>Experience.</h2>
      </motion.div>
      { userId &&
        <motion.div
          variants={fadeIn('', '', 1, 1)}
          className='flex gap-5 mt-5'
        >
          <div className='green-blue-gradient hover:green-blue-gradient--hover rounded-lg p-px'>
            <button className='bg-primary hover:bg-tertiary rounded-lg p-2' onClick={() => setIsModalVisible(true)}>Add Experience</button>
          </div>
        </motion.div>
      }
      <div className="mt-20 flex flex-col">
        <VerticalTimeline>
          {experiences.map((experience, i) => (
            <ExperienceCard key={i} experience={experience} />
          ))}
        </VerticalTimeline>
      </div>
    </>
  )
}

export default SectionWrapper(Experience, 'experience')