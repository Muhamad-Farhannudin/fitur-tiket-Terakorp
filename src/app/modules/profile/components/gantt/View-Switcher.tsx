import React from "react";
import "gantt-task-react/dist/index.css";
import { ViewMode } from "gantt-task-react";
import Button from "../button/Button";
type ViewSwitcherProps = {
  isChecked: boolean;
  onViewListChange: (isChecked: boolean) => void;
  onViewModeChange: (viewMode: ViewMode) => void;
};
export const ViewSwitcher: React.FC<ViewSwitcherProps> = ({
  onViewModeChange,
  onViewListChange,
  isChecked,
}) => {
  return (
    <div className="ViewContainer d-flex justify-content-start align-items-center gap-5 my-5">

      <Button children={"Hour"} className  onClick={() => onViewModeChange(ViewMode.Hour)}/>
      <Button children={"Quarter of Day"} className  onClick={() => onViewModeChange(ViewMode.QuarterDay)}/>
      <Button children={"Half of Day"} className  onClick={() => onViewModeChange(ViewMode.HalfDay)}/>
      <Button children={"Day"} className  onClick={() => onViewModeChange(ViewMode.Day)}/>
      <Button children={"Week"} className  onClick={() => onViewModeChange(ViewMode.Week)}/>
      <Button children={"Month"} className  onClick={() => onViewModeChange(ViewMode.Month)}/>
      <Button children={"Year"} className  onClick={() => onViewModeChange(ViewMode.Year)}/>

      <div className="Switch">
        <label className="Switch_Toggle">
          <input
            type="checkbox"
            defaultChecked={isChecked}
            onClick={() => onViewListChange(!isChecked)}
          />
          <span className="Slider" />
        </label>
        Show Task List
      </div>
    </div>
  );
};