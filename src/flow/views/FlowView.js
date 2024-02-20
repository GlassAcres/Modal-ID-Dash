import React, { useState, useCallback, createContext } from 'react'
import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from 'reactflow'
import nodeTypes from '../nodes/nodetypes'
import CustomEdge from '../edges/customedges'
import GateKeeper from '../nodes/proxy/gatekeeper'
import AgentNode from '../nodes/agents/agent'
import initialNodes from '../nodes/initialnodes'
import initialEdges from '../edges/edge'
import '../scss/agent.scss'
import '../scss/chatproxy.scss'
import '../scss/flowview.scss'

import NodeDataContext from 'src/flow/nodes/nodedatacontext'

const rfStyle = { backgroundColor: '#e6edf7' }
const initialZoom = 0.75
const edgeTypes = {
  custom: CustomEdge,
}

function Flow() {
  const [nodes, setNodes] = useState(initialNodes)
  const [edges, setEdges] = useState(initialEdges)

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  )
  const onEdgeClick = (event, edgeId) => {
    event.stopPropagation()
    setEdges((eds) => eds.filter((e) => e.id !== edgeId))
  }

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  )
  const updateNodeData = (id, newData) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...newData } } : node,
      ),
    )
  }
  const onConnect = useCallback((params) => setEdges((els) => addEdge(params, els)), [setEdges])

  const transferData = () => {
    console.log('Starting data transfer...')

    // Find the AgentNode and GateKeeperNode
    const agentNode = nodes.find((node) => node.type === 'agentCard')
    const gateKeeperNode = nodes.find((node) => node.type === 'GateKeeper')

    // Check if both nodes are found
    if (!agentNode || !gateKeeperNode) {
      console.error('Agent or GateKeeper node not found')
      return
    }

    // Check if the nodes are connected
    const isConnected = edges.some(
      (edge) => edge.source === agentNode.id && edge.target === gateKeeperNode.id,
    )
    if (!isConnected) {
      console.log('Nodes are not connected')
      return
    }

    // Update the GateKeeper node data with the Agent node data
    const updatedGateKeeperNodeData = {
      ...gateKeeperNode.data,
      name: agentNode.data.name,
      model: agentNode.data.model,
      instructions: agentNode.data.instructions, // Corrected parameter name
      tools: agentNode.data.tools,
      file_ids: agentNode.data.file_ids,
    }

    const updatedGateKeeperNode = {
      ...gateKeeperNode,
      data: updatedGateKeeperNodeData,
    }

    setNodes((currentNodes) =>
      currentNodes.map((node) => (node.id === gateKeeperNode.id ? updatedGateKeeperNode : node)),
    )
  }

  const handleRunClick = () => {
    if (edges.length === 0) {
      alert('There is a break in the flow. Please connect all nodes.')
    } else {
      transferData()
    }
  }

  return (
    <div className="flow-wrapper" style={rfStyle}>
      <NodeDataContext.Provider value={updateNodeData}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <Controls style={{ position: 'absolute', left: 10 }} />
          <Background />
          <MiniMap />
        </ReactFlow>
        <button
          className="run-button"
          onClick={handleRunClick}
          style={{ position: 'absolute', top: 60, right: 10 }}
        >
          RUN
        </button>
      </NodeDataContext.Provider>
    </div>
  )
}

export default Flow
