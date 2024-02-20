// src/AgentCardNode.js
import React, { memo } from 'react'
import { Handle, Position } from 'reactflow'
import PropTypes from 'prop-types'

function AgentNode({ id, data, isConnectable }) {
  // Update the node's data when the input fields change
  const onChange = (event) => {
    const { name, value } = event.target
    data[name] = value // This is a simplified way to handle the state. Consider using a state management solution for a production environment.
    console.log(`Node ${id} data:`, data) // Log the updated data
  }

  return (
    <div className="agent-card">
      <header className="agent-card-header">
        <strong>{data.label}</strong>
      </header>
      <Handle type="source" position={Position.Right} isConnectable={isConnectable} />
      <div className="agent-card-content">
        <input type="text" name="name" placeholder="Name" onChange={onChange} className="nodrag" />
        <input
          type="text"
          name="model"
          placeholder="Model"
          onChange={onChange}
          className="nodrag"
        />
        <input
          type="text"
          name="instruction"
          placeholder="Instruction"
          onChange={onChange}
          className="nodrag"
        />
        <input
          type="text"
          name="parameter1"
          placeholder="Parameter 1"
          onChange={onChange}
          className="nodrag"
        />
        <input
          type="text"
          name="parameter2"
          placeholder="Parameter 2"
          onChange={onChange}
          className="nodrag"
        />
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
    instruction: PropTypes.string,
    parameter1: PropTypes.string,
    parameter2: PropTypes.string,
  }).isRequired,
  isConnectable: PropTypes.bool,
}

export default memo(AgentNode)
