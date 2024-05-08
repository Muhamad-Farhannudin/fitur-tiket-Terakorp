import { Content } from "../../../../_metronic/layout/components/content";
import Table from 'react-bootstrap/Table';
import Form from "react-bootstrap/Form";

export function Projects() {
  return (
    <Content>
      <div className="d-flex justify-content-between">
        <div className="">
          <div className="d-flex align-items-center mb-6">
            <div className="px-7 py-2 border border-primary">list</div>
            <div className="px-3 py-2 border border-primary">Ganchart</div>
          </div>
          <h3 className="ms-5">RS Al Islam Group</h3>
        </div>

        <ul className="list-unstyled me-20">
          <li>
            <Form>
              {["checkbox"].map((type) => (
                <div key={`default-${type}`} className="mb-3">
                  <Form.Check // prettier-ignore
                    type={type}
                    id={`default-${type}`}
                    label={`not selected`}
                  />
                </div>
              ))}
            </Form>
          </li>
          <li>
            <Form>
              {["checkbox"].map((type) => (
                <div key={`default-${type}`} className="mb-3">
                  <Form.Check // prettier-ignore
                    type={type}
                    id={`default-${type}`}
                    label={`Raafi`}
                  />
                </div>
              ))}
            </Form>
          </li>
          <li>
            <Form>
              {["checkbox"].map((type) => (
                <div key={`default-${type}`} className="mb-3">
                  <Form.Check // prettier-ignore
                    type={type}
                    id={`default-${type}`}
                    label={`Andi`}
                  />
                </div>
              ))}
            </Form>
          </li>
          <li>
            <Form>
              {["checkbox"].map((type) => (
                <div key={`default-${type}`} className="mb-3">
                  <Form.Check // prettier-ignore
                    type={type}
                    id={`default-${type}`}
                    label={`Mario`}
                  />
                </div>
              ))}
            </Form>
          </li>
        </ul>
      </div>

      <div className="container-fluid border border-black rounded my-5">
        <h3 className="p-2">Not Started</h3>
        <Table striped bordered hover>
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
        </Table>
      </div>

      <div className="container-fluid border border-black rounded my-5">
        <h3 className="p-2">Active</h3>
        <Table striped bordered hover>
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
        </Table>
      </div>

      <div className="container-fluid border border-black rounded my-5">
        <h3 className="p-2">Finish</h3>
        <Table striped bordered hover>
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
        </Table>
      </div>

    </Content>
  );
}
