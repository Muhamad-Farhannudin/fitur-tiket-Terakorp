import React from 'react'

type DetailProps = {
  title : string,
}

export default function detailProject({title}: DetailProps) {
  return (
    <div className="container-fluid border border-black rounded">
        <h3 className="p-2">{title}</h3>
        {/* <Table striped bordered hover>
          <thead className="border-black">
            <tr>
              <th>Priority</th>
              <th>Create Date</th>
              <th>Id Tiket</th>
              <th>Nama Project</th>
              <th>Judul Tiket</th>
              <th>Type</th>
              <th>Kategori</th>
              <th>Assign From</th>
              <th>Assign to</th>
              <th>Start Date</th>
              <th>Due Date</th>
              <th>Mondays</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
            <tr>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
            <tr>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
          </tbody>
        </Table> */}
      </div>
  )
}
