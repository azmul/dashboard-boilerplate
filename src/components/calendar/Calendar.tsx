import * as React from "react";
import type { DatePickerProps, TimePickerProps } from "antd";
import { DatePicker, Select, Space, Dropdown, Menu } from "antd";
import { Link } from "react-router-dom";
import cx from "classnames";
import { DatePickerSelectionMode } from "@/constants/date";
import dayjs from "dayjs";
import type { MenuProps } from "antd";
import styles from "./Calendar.module.scss";

interface CalendarProps {
  title?: string;
  onValue: (date: dayjs.Dayjs | null, type: string) => void;
  url?: string;
}

const { Option } = Select;

type PickerType = "date";

const PickerWithType = ({
  type,
  onChange,
}: {
  type: PickerType;
  onChange: TimePickerProps["onChange"] | DatePickerProps["onChange"];
}) => {
  if (type === "date") return <DatePicker onChange={onChange} />;
  return <DatePicker picker={type} onChange={onChange} />;
};

export default function Calendar({ onValue, url }: CalendarProps) {
  const [selectedDate, setSelectedDate] = React.useState<dayjs.Dayjs | null>(
    dayjs()
  );
  const [selectionMode, setSelectionMode] = React.useState(
    DatePickerSelectionMode.DATE
  );
  const [type, setType] = React.useState<PickerType>("date");

  function showModal() {
    setSelectionMode(DatePickerSelectionMode.PICKER);
  }
  function handleOk() {
    onValue(selectedDate, type);
  }

  const items: MenuProps["items"] = [
    {
      label: (
        <Menu className={styles.calendar}>
          <Menu.ItemGroup key="1">
            <>
              <Space>
                <Select
                  optionFilterProp="children"
                  value={type}
                  onChange={setType}
                >
                  <Option value="date">Date</Option>
                  {/* <Option value="week">Week</Option> */}
                  <Option value="month">Month</Option>
                  {/* <Option value="year">Year</Option> */}
                </Select>
                <PickerWithType
                  type={type}
                  onChange={(value) => setSelectedDate(value)}
                />
              </Space>
              <div className={styles.selectBtn}>
                <Space>
                  <button
                    className="btn btn-primary btn-sm waves-effect waves-light"
                    onClick={handleOk}
                  >
                    Select
                  </button>
                </Space>
              </div>
            </>
          </Menu.ItemGroup>
        </Menu>
      ),
      key: "1",
    },
  ];

  return (
    <div
      className="btn-group float-end"
      role="group"
      aria-label="Basic example"
    >
      <button
        onClick={() => {
          onValue(dayjs(), DatePickerSelectionMode.MONTH);
          setSelectionMode(DatePickerSelectionMode.MONTH);
        }}
        type="button"
        className={cx("btn btn-secondary btn-sm", {
          active: selectionMode === DatePickerSelectionMode.MONTH,
        })}
      >
        <small>Month</small>
      </button>
      <button
        onClick={() => {
          onValue(dayjs(), DatePickerSelectionMode.DATE);
          setSelectionMode(DatePickerSelectionMode.DATE);
        }}
        type="button"
        className={cx("btn btn-secondary btn-sm", {
          active: selectionMode === DatePickerSelectionMode.DATE,
        })}
      >
        <small>Day</small>
      </button>

      <Dropdown trigger={["click"]} menu={{ items }}>
        <button
          onClick={showModal}
          type="button"
          className={cx("btn btn-secondary btn-sm", {
            active: selectionMode === DatePickerSelectionMode.PICKER,
          })}
        >
          <i className="mdi mdi-calendar"></i>
        </button>
      </Dropdown>

      <button type="button" className="btn btn-secondary btn-sm">
        <i className="mdi mdi-database-export-outline"></i>
      </button>
      <button type="button" className="btn btn-secondary btn-sm">
        <Link to={url ?? "/"}>
          <i className="mdi mdi-more"></i>
        </Link>
      </button>
    </div>
  );
}
