import { useState, ReactElement, useEffect } from "react";
import clsx from "clsx";
import Table from "react-bootstrap/Table";
import { Fade } from "react-reveal";
import Select from "react-select";
import Flatpickr from "react-flatpickr";
import ButtonDelete from "../buttonDelete/ButtonDelete";
import { v4 as uuidv4 } from "uuid";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

export default function TableList({ children }) {
  let myuuid = uuidv4();

  console.log("Your UUID is: " + myuuid);

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

  const [isDataAdded, setIsDataAdded] = useState(false);
  const [data, setData] = useState([
    {
      id: uuidv4(),
      checked: false,
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

  useEffect(() => {
    handleAdd(); // Tambahkan baris baru saat komponen pertama kali dimuat
  }, []);

  const handleAdd = () => {
    const newItemId = uuidv4();
    const newItem = {
      id: newItemId,
      checked: false,
      Priority: (
        <Select
          className="react-select-styled z-index-5 priority"
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
          className="form-control inputDate"
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
    if (!isDataAdded) {
      // Tambahkan kondisi untuk menentukan apakah data sudah ditambahkan atau belum
      setData([newItem]);
      setIsDataAdded(true);
    } else {
      setData([...data, newItem]);
    }
  };

  const handleCheckboxChange = (id: string) => {
    const newData = data.map((item) => {
      if (item.id === id) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    setData(newData);
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleDelete = () => {
    const newData = data.filter((item) => !item.checked);
    setData(newData);
  };

  const handleHeaderCheckboxChange = () => {
    const newData = data.map((item) => ({ ...item, checked: !selectAllChecked }));
    setData(newData);
  };

  const selectAllChecked = data.every((item) => item.checked);

  return (
    <div className="tab-content card my-11">
      <Fade left>
        <div>
          <div className="tab-pane container-fluid my-5">
            <div className="pb-3">
              <div className="d-flex justify-content-start align-items-center gap-3 ">
                <OverlayTrigger overlay={<Tooltip className="mb-3" id={`tooltip-top`}>Collpase group</Tooltip>}>
                  <div className="cursor-pointer" onClick={() => toggleSubmenu("notStarted")}>
                  <i
                    className={clsx("bi cursor-pointer", {
                      "bi-caret-right-fill": !submenuOpen.notStarted,
                      "bi-caret-down-fill": submenuOpen.notStarted,
                    })}
                    onClick={() => toggleSubmenu("notStarted")}
                  ></i>
                  </div>
                </OverlayTrigger>

                <span className="bg-gray-300 fs-4 fw-bold px-5 py-2 cursor-pointer ms-3 rounded-pill" onClick={() => toggleSubmenu("notStarted")}>
                  {children}
                </span>
                <OverlayTrigger overlay={<Tooltip className="mb-3"  id={`tooltip-top`}>Jumlah Task</Tooltip>}>
                <span className="text-dark-emphasis ms-3 cursor-pointer">{data.length}</span>
                </OverlayTrigger>

                <div className="d-flex justify-content-center gap-2 align-items-center py-2 px-2 task" onClick={handleAdd}>
                  <i class="bi bi-plus-lg fs-3 fw-bold"></i>
                  <span className="fs-4 fw-normal text-dark-emphasis z-index-3">Add Task</span>
                </div>
                <OverlayTrigger overlay={<Tooltip className="mb-3" id={`tooltip-top`}>Delete</Tooltip>}>
                <div>
                  <ButtonDelete onClick={handleDelete} />
                </div>
                </OverlayTrigger>
              </div>
            </div>
            {submenuOpen.notStarted && (
              <div style={{ maxWidth: "1800px", overflowX: "auto", minHeight: "380px", height: "auto", display: "flex" }}>
                <Table responsive>
                  <thead className="border-gray border-bottom fs-5 fw-bold head">
                    <tr>
                      <th>
                        <input className="form-check-input cursor-pointer" type="checkbox" checked={selectAllChecked} id="flexRadioLg" onChange={handleHeaderCheckboxChange} style={{ width: "17px", height: "17px" }} />
                      </th>
                      <th style={{ minWidth: "100px", backgroundColor: "white" }} className="thPriority">
                        Priority
                      </th>
                      <th style={{ minWidth: "150px" }} className={"thDate"}>
                        Create Date
                      </th>
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
                    {data.map((item) => {
                      return (
                        <tr key={item.id}>
                          <td className="d-flex justify-content-center mt-3">
                            <input className="form-check-input cursor-pointer" type="checkbox" id="flexRadioLg" checked={item.checked} onChange={() => handleCheckboxChange(item.id)} style={{ width: "17px", height: "17px" }} />
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
