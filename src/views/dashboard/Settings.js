import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { CForm, CFormInput, CFormLabel, CFormTextarea, CButton, CFormSelect } from '@coreui/react'
import {
  fetchAssistantDetails,
  updateAssistant,
  fetchAssistants,
  createAssistant,
  deleteAssistant,
} from 'src/services/assistant_api' // Adjust the import path
const openAiModels = [
  'gpt-4-1106-preview',
  'gpt-4-0613',
  'gpt-4',
  'gpt-3.5-turbo-16k-0613',
  'gpt-3.5-turbo-16k',
  'gpt-3.5-turbo-1106',
  'gpt-3.5-turbo-0613',
  'gpt-3.5-turbo',
]

const AssistantDetailsForm = ({ onSave, onSync }) => {
  const [assistants, setAssistants] = useState([])
  const [selectedAssistantId, setSelectedAssistantId] = useState('')
  const [assistantDetails, setAssistantDetails] = useState({
    name: '',
    instructions: '',
    model: '',
    files: [],
  })

  useEffect(() => {
    fetchAssistants().then((data) => {
      setAssistants(data)
    })
  }, [])

  useEffect(() => {
    if (selectedAssistantId) {
      fetchAssistantDetails(selectedAssistantId).then((details) => {
        setAssistantDetails(details)
      })
    }
  }, [selectedAssistantId])

  const handleCreateNewAssistant = async () => {
    try {
      const newAssistant = await createAssistant(assistantDetails)
      alert('New assistant created successfully')
      setAssistants([...assistants, newAssistant])
      setSelectedAssistantId(newAssistant.assistant_id)
      setAssistantDetails(newAssistant)
      if (onSave) onSave()
    } catch (error) {
      alert('Error creating new assistant: ' + error.message)
    }
  }
  const handleFileIdsChange = (e) => {
    const fileIdsString = e.target.value
    const fileIdsArray = fileIdsString
      .split(',')
      .map((id) => id.trim())
      .filter((id) => id !== '')
    setAssistantDetails((prevDetails) => ({
      ...prevDetails,
      file_ids: fileIdsArray,
    }))
  }

  const handleDeleteAssistant = async () => {
    if (!selectedAssistantId) {
      alert('Please select an assistant to delete')
      return
    }

    // Confirmation dialog
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this assistant? This is a destructive action. ' +
        'Assistant configurations will be stored for a time, so you can recreate them, ' +
        'however, the ID will change and will break any function that relies upon that particular assistant. ' +
        'It is recommended that Assistants are only deleted by administrators or after clearing all dependent functions.',
    )

    if (confirmDelete) {
      try {
        await deleteAssistant(selectedAssistantId)
        alert('Assistant deleted successfully')
        setAssistants(
          assistants.filter((assistant) => assistant.assistant_id !== selectedAssistantId),
        )
        setSelectedAssistantId('')
        setAssistantDetails({
          name: '',
          instructions: '',
          model: '',
          files: [],
        })
        if (onSave) onSave()
      } catch (error) {
        alert('Error deleting assistant: ' + error.message)
      }
    }
  }

  const handleSelectChange = (e) => {
    const newSelectedId = e.target.value
    setSelectedAssistantId(newSelectedId) // Update the selected ID state
    if (typeof onSync === 'function') {
      onSync(newSelectedId)
    }
  }
  const handleSave = () => {
    // Create a new object with only the keys you want to update
    const detailsToUpdate = {
      name: assistantDetails.name,
      instructions: assistantDetails.instructions,
      model: assistantDetails.model,
      // include any other keys you want to update
    }

    updateAssistant(selectedAssistantId, detailsToUpdate)
      .then(() => {
        alert('Assistant updated successfully')
        if (onSave) {
          onSave()
        }
      })
      .catch((error) => {
        alert('Error updating assistant: ' + error.message)
      })
  }

  const fileIdsString = Array.isArray(assistantDetails.file_ids)
    ? assistantDetails.file_ids.join(', ')
    : ''

  // Handlers for form input changes
  const handleChange = (e) => {
    const { name, value } = e.target

    setAssistantDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }))
  }

  return (
    <CForm>
      <div>
        <CFormLabel htmlFor="assistantSelect">Select Assistant</CFormLabel>
        <CFormSelect id="assistantSelect" onChange={handleSelectChange}>
          <option value="">Choose...</option>
          <option value="">Create a New Assistant</option>
          {assistants.map((assistant, index) => (
            <option key={index} value={assistant.assistant_id}>
              {assistant.name}
            </option>
          ))}
        </CFormSelect>
      </div>
      <div>
        <CFormLabel htmlFor="name">
          Assistant Name<span style={{ color: 'red' }}>*</span>
        </CFormLabel>
        <CFormInput
          type="text"
          id="name"
          name="name"
          value={assistantDetails.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <CFormLabel htmlFor="instructions">Instructions</CFormLabel>
        <CFormTextarea
          id="instructions"
          name="instructions"
          rows="4"
          value={assistantDetails.instructions}
          onChange={handleChange}
        />
      </div>
      <div>
        <CFormLabel htmlFor="model">
          Model <span style={{ color: 'red' }}>*</span>
        </CFormLabel>
        <CFormSelect
          id="model"
          name="model"
          value={assistantDetails.model}
          onChange={handleChange}
          required
        >
          <option value="">Select a model</option>
          {openAiModels.map((model, index) => (
            <option key={index} value={model}>
              {model}
            </option>
          ))}
        </CFormSelect>
      </div>
      <div>
        <CFormLabel htmlFor="file_ids">File IDs</CFormLabel>
        <CFormInput
          type="text"
          id="file_ids"
          name="file_ids"
          value={fileIdsString} // Use the checked fileIdsString
          onChange={handleFileIdsChange}
        />
      </div>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <CButton color="danger" onClick={handleDeleteAssistant}>
          Delete
        </CButton>
        <CButton
          color="secondary"
          onClick={selectedAssistantId ? handleSave : handleCreateNewAssistant}
        >
          Save
        </CButton>
      </div>
    </CForm>
  )
}

AssistantDetailsForm.propTypes = {
  selectedAssistantId: PropTypes.string,
  onSave: PropTypes.func,
  onSync: PropTypes.func,
}
export default AssistantDetailsForm
