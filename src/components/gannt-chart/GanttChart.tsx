import { DatePicker } from "antd";
import cx from "classnames";
import styles from "./GanttChart.module.scss";

interface IProps {
  length: number;
  children: React.ReactNode;
}

export default function GanttChart({ length = 24, children }: IProps) {
  return (
    <>
      <div className={cx("row", { [styles.item]: true })}>
        <section className="col-md-2">
          <div className="text-start">
            <DatePicker />
          </div>
        </section>
        <section className={cx("col-md-10", { [styles.daysBlocker]: true })}>
          {Array.from({ length }).map((_, index) => (
            <div className={styles.day}>{index + 1}</div>
          ))}
        </section>
      </div>
      {children}
    </>
  );
}
