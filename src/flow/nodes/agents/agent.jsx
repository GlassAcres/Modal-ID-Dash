import React, { useState, useEffect, memo, useContext } from 'react'
import PropTypes from 'prop-types'
import NodeDataContext from 'src/flow/nodes/nodedatacontext'
import { Handle, Position } from 'reactflow'
import { CForm, CFormInput, CFormLabel, CFormTextarea, CFormSelect } from '@coreui/react'
import { fetchAssistantDetails, fetchAssistants } from 'src/services/assistant_api'

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

function AgentNode({ id, data, isConnectable }) {
  const [assistants, setAssistants] = useState([])
  const [selectedAssistantId, setSelectedAssistantId] = useState('')
  const [assistantDetails, setAssistantDetails] = useState({
    name: '',
    instructions: '',
    model: '',
    tools: '',
    file_ids: [],
  })

  useEffect(() => {
    fetchAssistants().then(setAssistants)
  }, [])

  useEffect(() => {
    if (selectedAssistantId) {
      fetchAssistantDetails(selectedAssistantId).then(setAssistantDetails)
    }
  }, [selectedAssistantId])

  const updateNodeData = useContext(NodeDataContext)
  useEffect(() => {
    // Make sure to only update if updateNodeData is available
    if (updateNodeData) {
      // Ensuring `file_ids` is treated as an array before updating
      const updatedData = {
        ...assistantDetails,
        // Convert back to array if it's not one already; this should ideally never revert to a string here
        file_ids: Array.isArray(assistantDetails.file_ids) ? assistantDetails.file_ids : [],
      }
      updateNodeData(id, updatedData)
    }
  }, [assistantDetails, id, updateNodeData])

  const fileIdsString = Array.isArray(assistantDetails.file_ids)
    ? assistantDetails.file_ids.join(', ')
    : ''
  const toolString = Array.isArray(assistantDetails.tools) ? assistantDetails.tools.join(', ') : ''

  const handleChange = (e) => {
    const { name, value } = e.target
    setAssistantDetails((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (event) => {
    const newSelectedId = event.target.value
    setSelectedAssistantId(newSelectedId)
    if (newSelectedId) {
      fetchAssistantDetails(newSelectedId).then((details) => {
        setAssistantDetails(details)
      })
    } else {
      // Reset assistant details if "Choose..." option is selected
      setAssistantDetails({
        name: '',
        instructions: '',
        model: '',
        tools: [],
        file_ids: [],
      })
    }
  }
  const handleFileIdsChange = (e) => {
    const { value } = e.target
    const fileIds = value.split(',').map((fileId) => fileId.trim())
    setAssistantDetails((prev) => ({ ...prev, file_ids: fileIds }))
  }

  const handleSkillChange = (e) => {
    const { value } = e.target
    const tools = value.split(',').map((tools) => tools.trim())
    setAssistantDetails((prev) => ({ ...prev, tools: tools }))
  }

  return (
    <div className="agent-card">
      <header className="agent-card-header">
        <strong>{data.label}</strong>
      </header>
      <Handle type="source" position={Position.Right} isConnectable={isConnectable} />
      <div className="agent-card-content">
        <CForm>
          <div>
            <CFormLabel className="agent-field-label" htmlFor="assistantSelect">
              Select Assistant
            </CFormLabel>
            <CFormSelect id="assistantSelect" onChange={handleSelectChange}>
              <option className="select-field-value" value="">
                Choose...
              </option>
              {assistants.map((assistant, index) => (
                <option key={index} className="select-field-value" value={assistant.assistant_id}>
                  {assistant.name}
                </option>
              ))}
            </CFormSelect>
          </div>
          <div>
            <CFormLabel className="agent-field-label" htmlFor="name">
              Assistant Name<span style={{ color: 'red' }}>*</span>
            </CFormLabel>
            <CFormInput
              className="agent-field-value"
              type="text"
              id="name"
              name="name"
              value={assistantDetails.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <CFormLabel className="agent-field-label" htmlFor="instructions">
              Instructions
            </CFormLabel>
            <CFormTextarea
              className="agent-field-value"
              id="instructions"
              name="instructions"
              rows="4"
              value={assistantDetails.instructions}
              onChange={handleChange}
            />
          </div>
          <div>
            <CFormLabel className="agent-field-label" htmlFor="model">
              Model <span style={{ color: 'red' }}>*</span>
            </CFormLabel>
            <CFormSelect
              className="agent-field-value"
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
            <CFormLabel className="agent-field-label" htmlFor="tools">
              Skills
            </CFormLabel>
            <CFormInput
              className="agent-field-value"
              type="text"
              id="tools"
              name="tools"
              value={toolString}
              onChange={handleSkillChange}
            />
          </div>
          <div>
            <CFormLabel className="agent-field-label" htmlFor="file_ids">
              Files
            </CFormLabel>
            <CFormInput
              className="agent-field-value"
              type="text"
              id="file_ids"
              name="file_ids"
              value={fileIdsString}
              onChange={handleFileIdsChange}
            />
          </div>
        </CForm>
      </div>
    </div>
  )
}

AgentNode.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.shape({
    label: PropTypes.string,
    name: PropTypes.string,
    model: PropTypes.string,
    instructions: PropTypes.string,
    tools: PropTypes.arrayOf(PropTypes.string),
    file_ids: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  isConnectable: PropTypes.bool,
}

export default memo(AgentNode)
