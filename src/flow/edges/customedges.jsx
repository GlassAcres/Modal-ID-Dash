import React from 'react'
import { getBezierPath, getMarkerEnd, getEdgeCenter } from 'react-flow-renderer'
import PropTypes from 'prop-types'

const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
  onEdgeClick,
}) => {
  const edgePath = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  })

  const markerEndId = getMarkerEnd(markerEnd, 'target')

  const [edgeCenterX, edgeCenterY] = getEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY,
  })

  return (
    <>
      <path style={style} className="react-flow__edge-path" d={edgePath} markerEnd={markerEndId} />
      <circle
        className="edge-button"
        cx={edgeCenterX}
        cy={edgeCenterY}
        r={12}
        onMouseDown={(event) => {
          onEdgeClick(event, id)
        }}
      />
    </>
  )
}

CustomEdge.propTypes = {
  id: PropTypes.string.isRequired,
  sourceX: PropTypes.number.isRequired,
  sourceY: PropTypes.number.isRequired,
  targetX: PropTypes.number.isRequired,
  targetY: PropTypes.number.isRequired,
  sourcePosition: PropTypes.oneOf(['top', 'right', 'bottom', 'left']).isRequired,
  targetPosition: PropTypes.oneOf(['top', 'right', 'bottom', 'left']).isRequired,
  style: PropTypes.object,
  markerEnd: PropTypes.string,
  data: PropTypes.any,
  onEdgeClick: PropTypes.func,
}

export default CustomEdge
