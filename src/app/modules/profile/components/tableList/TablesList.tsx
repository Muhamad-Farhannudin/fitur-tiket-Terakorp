import { useState, ReactElement, useEffect } from "react";
import clsx from "clsx";
import Table from "react-bootstrap/Table";
import { Fade } from "react-reveal";
import Select from "react-select";
import Flatpickr from "react-flatpickr";

export default function TableList({ children }) {
  const [dateState, setDateState] = useState<any>({
    date1: new Date(),
  });
  const [submenuOpen, setSubmenuOpen] = useState({
    notStarted: true,
    active: true,
    finish: true,
  });

  type TypePriority = {
    value: string;
    label: string | ReactElement;
    className: string;
  };
  type TypeAssignFrom = {
    value: string;
    label: string | ReactElement;
    className: string;
  };
  type TypeAssignTo = {
    value: string;
    label: string | ReactElement;
    className: string;
  };

  const Priority: Array<TypePriority> = [
    { value: "urgent", label: "Urgent", className: "text-danger" },
    { value: "high", label: "High", className: "text-warning" },
    { value: "normal", label: "Normal", className: "text-primary" },
    { value: "low", label: "Low" },
  ];

  const AssignFrom: Array<TypeAssignFrom> = [
    { value: "augy", label: "Augy", className: "bg-danger text-white" },
    { value: "farhan", label: "Farhan", className: "bg-primary text-white" },
    { value: "mario", label: "Mario", className: "bg-success text-white" },
    { value: "jaka", label: "Jaka", className: "bg-warning text-white" },
  ];
  const AssignTo: Array<TypeAssignTo> = [
    { value: "augy", label: "Augy", className: "bg-danger text-white" },
    { value: "farhan", label: "Farhan", className: "bg-primary text-white" },
    { value: "mario", label: "Mario", className: "bg-success text-white" },
    { value: "jaka", label: "Jaka", className: "bg-warning text-white" },
  ];

  const toggleSubmenu = (submenuName: string) => {
    setSubmenuOpen({
      ...submenuOpen,
      [submenuName]: !submenuOpen[submenuName],
    });
  };

  return (
    <div className="tab-content card my-11">
      <Fade left>
        <div>
          <div className="tab-pane container-fluid my-5">
            <h3 className="pb-3" onClick={() => toggleSubmenu("notStarted")}>
              <i
                className={clsx("bi", {
                  "bi-caret-right-fill": !submenuOpen.notStarted,
                  "bi-caret-down-fill": submenuOpen.notStarted,
                })}
              ></i>

              <span className="bg-gray-300 fs-4 fw-bold px-5 py-2 cursor-pointer ms-3 rounded-pill" onClick={() => toggleSubmenu("notStarted")}>
                {children}
              </span>
            </h3>
            {submenuOpen.notStarted && (
              <div style={{ maxWidth: "1800px", overflowX: "auto", minHeight: "350px", display: "flex", }}>
                <Table striped hover responsive>
                  <thead className="border-gray border-bottom fs-5 fw-bold">
                    <tr>
                      <th style={{ minWidth: "100px", position: "sticky", left: "0px", backgroundColor: "white" }}>Priority</th>
                      <th style={{ minWidth: "150px" }}>Create Date</th>
                      <th style={{ minWidth: "100px" }}>Id Tiket</th>
                      <th style={{ minWidth: "100px" }}>Nama Project</th>
                      <th style={{ minWidth: "100px" }}>Judul Tiket</th>
                      <th>Type</th>
                      <th>Kategori</th>
                      <th style={{ minWidth: "100px" }}>Assign From</th>
                      <th style={{ minWidth: "100px" }}>Assign to</th>
                      <th style={{ minWidth: "150px" }}>Start Date</th>
                      <th style={{ minWidth: "150px" }}>Due Date</th>
                      <th>Mondays</th>
                      <th>Comments</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* ada datanya */}
                    <tr>
                      <td style={{ minWidth: "150px", position: "sticky", left: "0px", zIndex: "9999" }}>
                        <Select
                          className="react-select-styled z-index-5 bg-white"
                          classNamePrefix="react-select z-index-5"
                          options={Priority.map((item) => {
                            item.label = (
                              <div className="label cursor-pointer">
                                <i class={`bi bi-flag-fill me-3 ${item.className}`}></i>
                                <span>{item.label}</span>
                              </div>
                            );
                            return item;
                          })}
                          placeholder="Select an option"
                          defaultValue={Priority[0]}
                        />
                      </td>
                      <td style={{ minWidth: "150px" }}>
                        <Flatpickr
                          value={dateState.date}
                          onChange={([date1]) => {
                            setDateState({ date1 });
                          }}
                          className="form-control"
                          placeholder="Pick date"
                        />
                      </td>
                      <td style={{ minWidth: "150px" }}>
                        <input type="text" className="form-control form-control-white" placeholder="Id tiket" />
                      </td>
                      <td style={{ minWidth: "150px" }}>
                        <input type="text" className="form-control form-control-white" placeholder="Nama project" />
                      </td>
                      <td style={{ minWidth: "150px" }}>
                        <input type="text" className="form-control form-control-white" placeholder="Judul tiket" />
                      </td>
                      <td style={{ minWidth: "150px" }}>
                        <input type="text" className="form-control form-control-white" placeholder="Type" />
                      </td>
                      <td style={{ minWidth: "150px" }}>
                        <input type="text" className="form-control form-control-white" placeholder="Kategori" />
                      </td>
                      <td style={{ minWidth: "150px" }}>
                        <Select
                          className="react-select-styled z-index-5 bg-white cursor-pointer"
                          classNamePrefix="react-select z-index-5"
                          options={AssignFrom.map((item) => {
                            item.label = (
                              <div className="label cursor-pointer">
                                <div className={`d-flex justify-content-center align-items-center rounded-circle ${item.className}`} style={{ width: "20px", height: "20px" }}>
                                  <span>{item.label[0]}</span>
                                </div>
                                <span>{item.label}</span>
                              </div>
                            );
                            return item;
                          })}
                          defaultValue={AssignFrom[0]}
                        />
                      </td>
                      <td style={{ minWidth: "150px" }}>
                        <Select
                          className="react-select-styled z-index-5 bg-white cursor-pointer"
                          classNamePrefix="react-select z-index-5"
                          options={AssignTo.map((item) => {
                            item.label = (
                              <div className="label cursor-pointer">
                                <div className={`d-flex justify-content-center align-items-center rounded-circle ${item.className}`} style={{ width: "20px", height: "20px" }}>
                                  <span>{item.label[0]}</span>
                                </div>
                                <span>{item.label}</span>
                              </div>
                            );
                            return item;
                          })}
                          defaultValue={AssignTo[1]}
                        />
                      </td>

                      <td style={{ minWidth: "150px" }}>
                        <Flatpickr
                          value={dateState.date}
                          onChange={([date1]) => {
                            setDateState({ date1 });
                          }}
                          className="form-control"
                          placeholder="Pick date"
                        />
                      </td>
                      <td style={{ minWidth: "150px" }}>
                        <Flatpickr
                          value={dateState.date}
                          onChange={([date1]) => {
                            setDateState({ date1 });
                          }}
                          className="form-control"
                          placeholder="Pick date"
                        />
                      </td>
                      <td style={{ minWidth: "100px" }}>
                        <input type="number" className="form-control form-control-white" placeholder="" />
                      </td>
                      <td style={{ minWidth: "150px" }}>
                      <input type="text" className="form-control form-control-white" placeholder="Comments" />
                      </td>
                    </tr>
                    {/* data kosong */}
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
            )}
          </div>
        </div>
      </Fade>
    </div>
  );
}
