import { useEffect, useState, useRef, useContext } from 'react'
import { motion } from 'framer-motion'

import { SectionWrapper } from '../hoc'
import { OnConfirmModal } from './modals'
import { fadeIn, textVariant } from '../utils/motion'
import { AlertsContext } from '../contexts/AlertsContext'
import { UserContext } from '../contexts/UserContext'
import { FormModal } from './modals'
import formSettings from './form/data/projects.form'
import ProjectCard from './ProjectCard'
import styles from '../styles'
import getBaseURL from '../utils/getBaseURL'
import getInitialUserId from '../utils/getInitialUser'

const Projects = ({ projects, setProjects }) => {
  const { addAlert } = useContext(AlertsContext)
  const {
    user: { userId, userToken },
    authRequest
  } = useContext(UserContext)
  const formRef = useRef(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isDeleteModalExpanded, setIsDeleteModalExpanded] = useState(false)
  const [indexToBeRemoved, setIndexToBeRemoved] = useState(null)

  useEffect(() => {
    if (projects[indexToBeRemoved]) setIsDeleteModalExpanded(true)
    else setIsDeleteModalExpanded(false)
  }, [indexToBeRemoved])

  const handleSubmit = async () => {
    const form = formRef.current.getFormState()
    const formData = new FormData()
    formData.append('image', form.image)
    formData.append('name', form.projectTitle)
    formData.append('description', form.description)
    formData.append('projectLinks', JSON.stringify(form.projectLinks))
    formData.append('projectTags', JSON.stringify(form.projectTags))
  
    const res = await authRequest.post(
      `${getBaseURL()}/project/create`,
      formData,
      { 
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    )

    const { type, msg } = res.data.alert
    addAlert({ type, msg })

    setProjects(prevState => [
      ...prevState,
      /*  - Spread the new project into a new object.
          - Append "recentlyAdded" property.
          
          Doing so will void the initial "hidden" CSS property that projects have to achieve the "fade in" effect.
      */
      { ...res.data.project, recentlyAdded: true}
    ])
  }

  formSettings.submit = {
    action: handleSubmit,
    btnText: {
      idle: 'Add Project',
      loading: 'Please wait...'
    }
  }

  const initialUserId = getInitialUserId()

  const removeAProject = async () => {
    try {
      const res = await authRequest.delete(
        `${getBaseURL()}/project/${projects[indexToBeRemoved]._id}`, 
        { headers: { Authorization: `Bearer ${userToken}` } }
      )
      
      const { alert: { type, msg }, projectId } = await res.data
      addAlert({ type, msg })

      setProjects(prevState =>
        prevState.filter(project =>
          project._id !== projectId
        )  
      )
    } catch (error) {
      console.error(error)
    }
  }

  const displayDeleteMessage = () => (
    <h2 className='my-4 font-extralight'>
      You are about to remove <span className='font-normal'>{projects[indexToBeRemoved].name}</span> from your projects.
    </h2>
  )

  return (
    <>
      { userId === initialUserId &&
        <FormModal
          ref={formRef}
          modal={{
            visibility: isModalVisible,
            close: () => setIsModalVisible(false)
          }}
          {...formSettings}
        />
      }
      { userId === projects[indexToBeRemoved]?.userId && 
        isDeleteModalExpanded &&
        <OnConfirmModal
          modal={{
            visibility: isDeleteModalExpanded,
            close: () => setIndexToBeRemoved(null)
          }}
          message={displayDeleteMessage}
          action={removeAProject}
        />
      }
      <div className='flex flex-col'>
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
        { userId === initialUserId &&
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
        { !!projects.length &&
          <div
            className='mt-20 grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,_360px)] gap-7 w-full justify-center'
            style={{ transform: 'translateZ(0)' }}
          >
            { projects.map((project, i) => (
              <ProjectCard
                key={`project-${i}`}
                index={i}
                currentUser={{ userId }}
                setIndexToBeRemoved={setIndexToBeRemoved}
                {...project}
              />
            ))}
          </div>
        }
      </div>
    </>
  )
}

export default SectionWrapper(Projects, 'projects')