import React, { useMemo } from 'react'
import { CContainer, CRow, CCol, CCard, CCardBody } from '@coreui/react'
import { useTable, useSortBy, useFilters } from 'react-table'
import '../../scss/support_requests.scss'

const SupportRequests = () => {
  // Sample data for support tickets
  const data = useMemo(
    () => [
      {
        id: 1,
        email: 'user1@example.com',
        thread_id: '123',
        timestamp: '2023-12-10 10:00',
        assistant: 'Assistant A',
        description: 'Issue description here',
        ticketNumber: 'T001',
      },
      {
        id: 2,
        email: 'user2@example.com',
        thread_id: '456',
        timestamp: '2023-12-10 11:00',
        assistant: 'Assistant B',
        description: 'Another issue description',
        ticketNumber: 'T002',
      },
      // ... more sample tickets
    ],
    [],
  )

  // Columns for the table
  const columns = useMemo(
    () => [
      { Header: 'Email', accessor: 'email' },
      { Header: 'Thread ID', accessor: 'thread_id' },
      { Header: 'Timestamp', accessor: 'timestamp' },
      { Header: 'Assistant', accessor: 'assistant' },
      { Header: 'Description', accessor: 'description' },
      { Header: 'Ticket Number', accessor: 'ticketNumber' },
    ],
    [],
  )

  // Table instance
  const tableInstance = useTable({ columns, data }, useFilters, useSortBy)
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance

  return (
    <CContainer>
      <CRow>
        <CCol>
          <CCard>
            <CCardBody className="table-responsive">
              <table {...getTableProps()}>
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(column.getSortByToggleProps())}
                          key={column.id}
                        >
                          {column.render('Header')}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map((row) => {
                    prepareRow(row)
                    return (
                      <tr {...row.getRowProps()} key={row.id}>
                        {row.cells.map((cell) => (
                          <td {...cell.getCellProps()} key={cell.column.id}>
                            {cell.render('Cell')}
                          </td>
                        ))}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default SupportRequests
