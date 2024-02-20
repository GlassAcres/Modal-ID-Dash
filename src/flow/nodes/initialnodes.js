const initialNodes = [
  {
    id: 'agent-1',
    type: 'agentCard',
    position: { x: 0, y: 0 },
    data: {
      label: 'Agent Name',
      name: '',
      model: '',
      instruction: '',
      parameter1: '',
      parameter2: '',
    },
  },
  {
    id: 'output',
    type: 'GateKeeper',
    position: { x: 300, y: 0 },
    data: {
      label: 'JanusProxy',
      name: '',
      model: '',
      instruction: '',
      parameter1: '',
      parameter2: '',
    },
  },
]

export default initialNodes
