import { Content } from "../../../../../_metronic/layout/components/content/Content";
import clsx from "clsx";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { Fade } from "react-reveal";
import TableList from "../tableList/TablesList";
import axios from "axios";

const ProjectFinal: React.FC = ({ children }) => {
  const [tab, setTab] = useState("List");
  // const [post, setPost] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get("https://jsonplaceholder.typicode.com/posts/")
  //     .then((res) => {
  //       console.log(res.data);
  //       setPost(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <Fade up>
      <Content>
        <div className="d-flex justify-content-between bg-white border-2 rounded border border-secondary pt-10 px-10" style={{ marginTop: "50px" }}>
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
            <h3 className="ms-5 fs-3 fw-bold font-monospace">{children}</h3>
          </div>

          <ul className="list-unstyled me-20 list-overview">
            <li>
              <Form>
                {["checkbox"].map((type) => (
                  <div key={`default-${type}`} className="mb-3" style={{width: "auto"}}>
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
                  <div key={`default-${type}`} className="mb-3" style={{width: "auto"}}>
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
                  <div key={`default-${type}`} className="mb-3" style={{width: "auto"}}>
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
                  <div key={`default-${type}`} className="mb-3" style={{width: "auto"}}>
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
          {/* Table List */}
          <Fade left>
            <div className={clsx("tab-pane", { active: tab === "List" })}>
              {/* not stardted */}
              <TableList children={"Not Started"} />

              {/* active */}
              <TableList children={"Active"} />

              {/* finish */}
              <TableList children={"Finish"} />
            </div>
          </Fade>

          <Fade left>
            <div className={clsx("tab-pane", { active: tab === "Ganchart" })}>
              <h1>Ganchart</h1>
              {/* {post.slice(0, 5).map((item) => (
                <div key={item?.id}>
                  <h1>{item?.title}</h1>
                  <p>{item?.body}</p>
                </div>
              ))}  */}
            </div>
          </Fade>
        </div>
      </Content>
    </Fade>
  );
};

export { ProjectFinal };
