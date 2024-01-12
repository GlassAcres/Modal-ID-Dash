import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { CForm, CFormInput, CFormLabel, CFormTextarea, CButton, CFormSelect } from '@coreui/react'
import { fetchAssistantDetails, updateAssistant, fetchAssistants } from 'src/services/assistant_api' // Adjust the import path

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
          {assistants.map((assistant, index) => (
            <option key={index} value={assistant.assistant_id}>
              {assistant.name}
            </option>
          ))}
        </CFormSelect>
      </div>
      <div>
        <CFormLabel htmlFor="name">Name</CFormLabel>
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
        <CFormLabel htmlFor="model">Model</CFormLabel>
        <CFormInput
          type="text"
          id="model"
          name="model"
          value={assistantDetails.model}
          onChange={handleChange}
        />
      </div>
      <div>
        <CFormLabel htmlFor="files">Files</CFormLabel>
        <CFormInput
          type="text"
          id="files"
          name="files"
          value={assistantDetails.files}
          onChange={handleChange}
        />
      </div>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <CButton color="secondary" onClick={handleSave}>
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
