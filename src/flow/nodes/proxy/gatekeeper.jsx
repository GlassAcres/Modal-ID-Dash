import React, { useState, useEffect, memo } from 'react'
import PropTypes from 'prop-types'
import { Handle, Position } from 'reactflow'
import '../../scss/gatekeeper.scss'

import flowPost from '../../../services/hooks/flowPost.jsx' // Path to your custom hook

function GateKeeper({ id, data, isConnectable }) {
  const [message, setMessage] = useState('')
  const webhookUrl =
    'https://6bd39da7-7453-4b4c-b387-2873db5df647-00-1k40c71dhdmfw.janeway.replit.dev/webhook'

  // This effect will run whenever `message` or any part of `data` changes.
  useEffect(() => {
    // Prepare data for the webhook
    const webhookData = {
      threadId: id,
      message: message,
      overrides: {
        name: data.name,
        instructions: data.instructions,
        model: data.model,
        tools: data.tools,
        file_ids: data.file_ids,
      },
    }

    // Send data to webhook
    flowPost(webhookUrl, webhookData)
  }, [id, message, data, webhookUrl]) // Dependencies array

  const handleSubmit = async () => {
    // Prepare overrides for the assistant's run parameters
    const overrides = {
      name: data.name,
      instructions: data.instructions,
      model: data.model,
      tools: data.tools,
      file_ids: data.file_ids,
    }

    try {
      // Send the message to the assistant with overrides
      const response = await handleSubmit(id, message, overrides)
      console.log('Response from assistant:', response)
      // Handle the response as needed
    } catch (error) {
      // Handle any errors that occur during the chat
      console.error('Error in communication with assistant', error)
    }
  }

  return (
    <div className="gatekeeper-card">
      <header className="gatekeeper-card-header">
        <strong>{data.label}</strong>
      </header>
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} />
      <div className="gatekeeper-card-content">
        <div className="gatekeeper-field">
          <label>Assistant Name:</label>
          <div className="gatekeeper-field-value">{data.name}</div>
        </div>
        <div className="gatekeeper-field">
          <label>Instructions:</label>
          <div className="gatekeeper-field-value">{data.instructions}</div>
        </div>
        <div className="gatekeeper-field">
          <label>Model:</label>
          <div className="gatekeeper-field-value">{data.model}</div>
        </div>
        <div className="gatekeeper-field">
          <label>Skills:</label>
          <div className="gatekeeper-field-value">{data.tools?.join(', ')}</div>
        </div>
        <div className="gatekeeper-field">
          <label>File IDs:</label>
          <div className="gatekeeper-field-value">{data.file_ids?.join(', ')}</div>
        </div>
        <div className="gatekeeper-field">
          <label>Message:</label>
          <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
        </div>
        <button onClick={handleSubmit}>Send Message</button>
      </div>
    </div>
  )
}

GateKeeper.propTypes = {
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

export default memo(GateKeeper)
