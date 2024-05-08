import { Content } from "../../../../_metronic/layout/components/content";
import clsx from "clsx";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { Fade } from "react-reveal";

const ProjectRS3: React.FC = () => {
  const [tab, setTab] = useState("List");
  const [submenuOpen, setSubmenuOpen] = useState({
    notStarted: false,
    active: false,
    finish: false,
  });

  const toggleSubmenu = (submenuName: string) => {
    setSubmenuOpen({
      ...submenuOpen,
      [submenuName]: !submenuOpen[submenuName],
    });
  };

  return (
    <Content>
      <div className="d-flex justify-content-between">
        <div className="">
          <div className="d-flex align-items-center mb-6">
            <ul
              className="nav nav-stretch nav-line-tabs
              fw-bold
              border-transparent
              flex-nowrap
            "
              role="tablist"
            >
              <li className="nav-item">
                <a className={clsx(`nav-link cursor-pointer fs-3`, { active: tab === "List" })} onClick={() => setTab("List")} role="tab">
                  <i class="bi bi-list-task me-2 fs-5"></i>
                  List
                </a>
              </li>
              <li className="nav-item">
                <a className={clsx(`nav-link cursor-pointer fs-3`, { active: tab === "Ganchart" })} onClick={() => setTab("Ganchart")} role="tab">
                  <i class="bi bi-bar-chart-steps me-2 fs-5"></i>
                  Ganchart
                </a>
              </li>
            </ul>
          </div>
          <h3 className="ms-5">Cihos CRT</h3>
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

      <div className="tab-content">
        <Fade left>
          <div className={clsx("tab-pane", { active: tab === "List" })}>
            <div className="tab-pane container-fluid my-5">
              <h3 className="pb-3" onClick={() => toggleSubmenu("notStarted")}>
                <i
                  className={clsx("bi", {
                    "bi-caret-right-fill": !submenuOpen.notStarted,
                    "bi-caret-down-fill": submenuOpen.notStarted,
                  })}
                ></i>
                <span className="bg-gray-300 fs-4 fw-bold px-5 py-2 cursor-pointer ms-3 rounded-pill" onClick={() => toggleSubmenu("notStarted")}>
                  Not Started
                </span>
              </h3>
              {submenuOpen.notStarted && (
                <Table striped hover>
                  <thead className="border-gray border-bottom">
                    <tr className="">
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
              )}
            </div>

            <div className="tab-pane container-fluid my-5">
              <h3 className="pb-3" onClick={() => toggleSubmenu("active")}>
                <i
                  className={clsx("bi", {
                    "bi-caret-right-fill": !submenuOpen.active,
                    "bi-caret-down-fill": submenuOpen.active,
                  })}
                ></i>
                <span className="bg-gray-300 fs-4 fw-bold px-5 py-2 cursor-pointer ms-3 rounded-pill" onClick={() => toggleSubmenu("active")}>
                  Active
                </span>
              </h3>
              {submenuOpen.active && (
                <Table striped hover>
                  <thead className="border-gray border-bottom">
                    <tr className="">
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
              )}
            </div>

            <div className="tab-pane container-fluid my-5">
              <h3 className="pb-3" onClick={() => toggleSubmenu("finish")}>
                <i
                  className={clsx("bi", {
                    "bi-caret-right-fill": !submenuOpen.finish,
                    "bi-caret-down-fill": submenuOpen.finish,
                  })}
                ></i>
                <span className="bg-gray-300 fs-4 fw-bold px-5 py-2 cursor-pointer ms-3 rounded-pill" onClick={() => toggleSubmenu("finish")}>
                  Finish
                </span>
              </h3>
              {submenuOpen.finish && (
                <Table striped hover>
                  <thead className="border-gray border-bottom">
                    <tr className="">
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
              )}
            </div>
          </div>
        </Fade>

        <Fade left>
          <div className={clsx("tab-pane", { active: tab === "Ganchart" })}>
            <h1>Ganchart</h1>
          </div>
        </Fade>
      </div>
    </Content>
  );
};

export { ProjectRS3 };
