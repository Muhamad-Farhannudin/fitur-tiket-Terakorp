import { useState, ReactElement, useEffect } from "react";
import clsx from "clsx";
import Table from "react-bootstrap/Table";
import { Fade } from "react-reveal";
import Select from "react-select";
import Flatpickr from "react-flatpickr";
import ButtonDelete from "../buttonDelete/ButtonDelete";
import { v4 as uuidv4 } from "uuid";

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
    { value: "low", label: "Low", className: " " },
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

  const [data, setData] = useState([
    {
      id: uuidv4(),
      Delete: null,
      Priority: null,
      CreateDate: null,
      IdTiket: null,
      NamaProject: null,
      JudulTiket: null,
      Type: null,
      Kategori: null,
      AssignForm: null,
      AssignTo: null,
      StartDate: null,
      DueDate: null,
      Mondays: null,
      Comments: null,
    },
  ]);

  const handleDelete = (id) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
    console.log(`deleted ${id}`);
  };

  const handleAdd = () => {
    const newItemId = uuidv4();
    const newItem = {
      id: newItemId,
      Delete: <ButtonDelete onClick={() => handleDelete(newItem.id)} />,
      Priority: (
        <Select
          className="react-select-styled z-index-5"
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
      ),
      CreateDate: (
        <Flatpickr
          value={dateState.date}
          onChange={([date1]) => {
            setDateState({ date1 });
          }}
          className="form-control"
          placeholder="Pick date"
        />
      ),
      IdTiket: <input type="text" className="form-control form-control-white" placeholder="Id tiket" />,
      NamaProject: <input type="text" className="form-control form-control-white" placeholder="Nama project" />,
      JudulTiket: <input type="text" className="form-control form-control-white" placeholder="Judul tiket" />,
      Type: <input type="text" className="form-control form-control-white" placeholder="Type" />,
      Kategori: <input type="text" className="form-control form-control-white" placeholder="Kategori" />,
      AssignForm: (
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
      ),
      AssignTo: (
        <Select
          className="react-select-styled bg-white z-index-5 cursor-pointer"
          classNamePrefix="react-select z-index-5 bg-primary"
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
      ),
      StartDate: (
        <Flatpickr
          value={dateState.date}
          onChange={([date1]) => {
            setDateState({ date1 });
          }}
          className="form-control"
          placeholder="Pick date"
        />
      ),
      DueDate: (
        <Flatpickr
          value={dateState.date}
          onChange={([date1]) => {
            setDateState({ date1 });
          }}
          className="form-control"
          placeholder="Pick date"
        />
      ),
      Mondays: <input type="number" className="form-control form-control-white" placeholder="" />,
      Comments: <input type="text" className="form-control form-control-white" placeholder="Comments" />,
    };
    setData([...data, newItem]);
  };

  return (
    <div className="tab-content card my-11">
      <Fade left>
        <div>
          <div className="tab-pane container-fluid my-5">
            <div className="pb-3">
              <div className="d-flex justify-content-start align-items-center">
                <i
                  className={clsx("bi", {
                    "bi-caret-right-fill": !submenuOpen.notStarted,
                    "bi-caret-down-fill": submenuOpen.notStarted,
                  })}
                  onClick={() => toggleSubmenu("notStarted")}
                ></i>

                <span className="bg-gray-300 fs-4 fw-bold px-5 py-2 cursor-pointer ms-3 rounded-pill" onClick={() => toggleSubmenu("notStarted")}>
                  {children}
                </span>

                <div className="d-flex justify-content-center gap-2 align-items-center py-2 px-2 ms-5 task" onClick={handleAdd}>
                  <i class="bi bi-plus-lg fs-3 fw-bold"></i>
                  <span className="fs-4 fw-normal text-dark-emphasis z-index-3">Add Task</span>
                </div>
              </div>
            </div>
            {submenuOpen.notStarted && (
              <div style={{ maxWidth: "1800px", overflowX: "auto", minHeight: "380px", height: "auto", display: "flex" }}>
                <Table striped hover responsive>
                  <thead className="border-gray border-bottom fs-5 fw-bold head">
                    <tr>
                      <th></th>
                      <th style={{ minWidth: "100px", backgroundColor: "white" }} className="thHead">
                        Priority
                      </th>
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
                    {/* <tr>
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
                    </tr> */}
                    {data.map((item) => {
                      return (
                        <tr key={item.id}>
                          <td>
                            {/* <ButtonDelete onClick={() => handleDelete(item.id)} /> */}
                            {item.Delete}
                          </td>
                          <td style={{ minWidth: "150px", zIndex: "111", height: "auto" }} className="tdRow">
                            {item.Priority}
                          </td>
                          <td style={{ minWidth: "150px" }}>{item.CreateDate}</td>
                          <td style={{ minWidth: "150px" }}>{item.IdTiket}</td>
                          <td style={{ minWidth: "150px" }}>{item.NamaProject}</td>
                          <td style={{ minWidth: "150px" }}>{item.JudulTiket}</td>
                          <td style={{ minWidth: "150px" }}>{item.Type}</td>
                          <td style={{ minWidth: "150px" }}>{item.Kategori}</td>
                          <td style={{ minWidth: "150px" }}>{item.AssignForm}</td>
                          <td style={{ minWidth: "150px" }}>{item.AssignTo}</td>
                          <td style={{ minWidth: "150px" }}>{item.StartDate}</td>
                          <td style={{ minWidth: "150px" }}>{item.DueDate}</td>
                          <td style={{ minWidth: "100px" }}>{item.Mondays}</td>
                          <td style={{ minWidth: "150px" }}>{item.Comments}</td>
                        </tr>
                      );
                    })}
                    {/* data kosong */}
                    {/* <tr>
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
                    </tr> */}
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
