import { Tooltip } from "antd";
import cx from "classnames";
import styles from "./GanttChart.module.scss";

interface IProps {
  length: number;
  title: string;
  icon: string;
  color: string;
  start: number;
  end: number;
}

export default function GanntChart({
  length = 24,
  title = "default",
  icon,
  color = "red",
  start = 1,
  end = 24,
}: IProps) {
  const blocks = Array.from({ length });

  function isBetween(num: number, lower: number, upper: number) {
    return num >= lower && num <= upper;
  }

  return (
    <div className={cx("row", { [styles.item]: true })}>
      <section className={cx("col-md-2", { [styles.itemTitle]: true })}>
        <i className={icon}></i>&nbsp; {title}
      </section>
      <section className={cx("col-md-10", { [styles.daysBlocker]: true })}>
        {blocks.map((_, index) =>
          isBetween(index + 1, start, end) ? (
            <Tooltip
              title={
                <span>
                  {title}: {start}-{end}
                </span>
              }
            >
              <div
                className={styles.day}
                style={{
                  backgroundColor: color,
                }}
              />
            </Tooltip>
          ) : (
            <div className={styles.day} />
          )
        )}
      </section>
    </div>
  );
}
