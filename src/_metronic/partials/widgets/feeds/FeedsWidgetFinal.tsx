import React, { useState } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";

type Props = {
  className: string;
  children: string;
  link1: string;
};

const FeedsWidgetFinal: React.FC<Props> = ({ className, children, link1, }) => {
  const [tab, setTab] = useState("Overview");
  return (
    <>
      <div className={`card ${className}`}>
        <div className="d-flex align-items-center mb-6">
          <ul
            className="nav nav-stretch nav-line-tabs
              border-transparent
              fw-normal
              flex-nowrap
              ms-6
              mt-2
            "
            role="tablist"
          >
            <li className="nav-item">
              <a className={clsx(`nav-link cursor-pointer fs-3`, { active: tab === "Overview" })} onClick={() => setTab("Overview")} role="tab">
                <i class="bi bi-list-task me-2 fs-3 text-gray-900"></i>
                Overview
              </a>
            </li>
            <li className="nav-item">
              <a className={clsx(`nav-link cursor-pointer fs-3`, { active: tab === "List" })} onClick={() => setTab("List")} role="tab">
                <i class="bi bi-bar-chart-steps me-2 fs-3 text-gray-900"></i>
                List
              </a>
            </li>
            <li className="nav-item">
              <a className={clsx(`nav-link cursor-pointer fs-3`, { active: tab === "Board" })} onClick={() => setTab("Board")} role="tab">
                <i class="bi bi-clipboard me-2 fs-3 text-gray-900"></i>
                Board
              </a>
            </li>
          </ul>
        </div>
        <div className="tab-content">
          <div className={clsx("tab-pane", {active: tab === 'Overview'})}>
            <div className="card-body pb-0">
              <h1 className="fs-2 fw-bold">Recent</h1>
              <ul>
                <li className="border-bottom border-2 border-gray fs-3 fw-normal font-monospace">{children}</li>
              </ul>
            </div>

            <div className={`${className}`}>
              <div className="card-body pb-0">
                <h1 className="fs-2 fw-bold">Lists</h1>
                <p className="p-3 fs-3">Name</p>
                <ul className="fs-4 fw-semibold">
                  <Link to={link1} style={{ color: '#000000' }}>
                    <li className="border-bottom border-2 border-gray list-unstyled py-3 fw-normal font-monospace">{children}</li>
                  </Link>
                </ul>
              </div>
            </div>
          </div>

          <div className={clsx("tab-pane", {active: tab === 'List'})}>
            <h2 className="ms-4">List</h2>
          </div>

          <div className={clsx("tab-pane", {active: tab === 'Board'})}>
            <h2 className="ms-4">Board</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export { FeedsWidgetFinal };
