import { useEffect } from 'react'
import { useState } from 'react'
import Select from 'react-select'
import { useCollection } from '../../hooks/useCollection'
import { timestamp } from '../../firebase/config'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import { useHistory } from 'react-router-dom'

// Styles
import './Create.css'

const categories = [
  { value: 'public-services', label: 'Public Services' },
  { value: 'computers', label: 'Computers' },
  { value: 'commerce', label: 'Commerce' },
  { value: 'science', label: 'Science' },
  { value: 'miscellaneous', label: 'Miscellaneous' },
]

export default function Create() {
  const history = useHistory()
  const { addDocument, response } = useFirestore('projects')
  const { documents } = useCollection('users')
  const [users, setUsers] = useState([])
  const { user } = useAuthContext()

  // form field values
  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  const [assignedUsers, setAssignedUsers] = useState([])
  const [formError, setFormError] = useState(null)

  useEffect(() => {
    if(documents) {
      const options = documents.map(user => {
        return { value: user, label: user.displayName}
      })
      setUsers(options)
    }
  }, [documents])

  const handleSubmit = async (e) => {
    e.preventDefault()

    setFormError(null)

    if (!category) {
      setFormError('Please select a project category.')
      return
    }
    if (assignedUsers.length < 1) {
      setFormError('Please assign the project to at least 1 user')
      return
    }

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid
    }

    const assignedUsersList = assignedUsers.map((u) => {
      return {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id
      }
    })

    const project = {
      name,
      details,
      category : category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      assignedUsersList, 
      createdBy,
      comments: []
    }

    await addDocument(project)
    if(!response.error) {
      history.push('/')
    } 
  }

  return (
    <div className="create-form">
      <h2 className="page-title">Ask a question</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Title :</span>
          <p className='disc'>Be specific and imagine you’re asking a question to another person</p>
          <input
            required
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Describe in Details: </span>
          <p className='disc'>Include all the information someone would need to answer your question</p>
          <textarea
            required
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          ></textarea>
        </label>
        <label>
          <span>Set goal date:</span>
          <p className='disc'>You should specify your goal date as the time-frame helps to achieve your target</p>
          <input
            required
            type="date"
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          />
        </label>
        <label>
          <span>Career Category:</span>
          <p className='disc'>You should select a category related to your query for fast advice otherwise select miscellaneous. For Maths, Biology, Chemistry or any field related to science select Science.</p>
          <Select
            onChange={(option) => setCategory(option)}
            options={categories}
          />
        </label>
        <label>
          <span>Ask to Expert:</span>
          <p className='disc'>You should select your account and particual expert for your question if not sure about single expert then select multiple</p>
          <Select 
            onChange={(option) => setAssignedUsers(option)}
            options={users}
            isMulti
          />
        </label>
        

        <button className="btn">Add your question</button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

