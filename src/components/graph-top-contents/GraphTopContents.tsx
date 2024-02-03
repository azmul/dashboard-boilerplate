import * as React from "react";
import dayjs from "dayjs";
import { UtilDateHelper } from "@/utils";

const Calendar = React.lazy(() => import("@/components/calendar/Calendar"));

interface IProps {
  onHandleDate: (date: dayjs.Dayjs | null) => void;
  title: string;
  url?: string;
}

export default function GraphTopContents({ onHandleDate, title , url}: IProps) {
  const [selectedDate, setSelectedDate] = React.useState<dayjs.Dayjs | null>(
    dayjs()
  );
  const [type, setType] = React.useState<string>("");

  function handleValue(date: dayjs.Dayjs | null, type: string) {
    setSelectedDate(date);
    setType(type);
  }

  React.useEffect(() => {
    onHandleDate(selectedDate);
  }, [selectedDate]);

  return (
    <div className="row">
      <div className="col">
        <div className="fs-7 fw-bold">{title}</div>
        <small className="text-muted">
          {UtilDateHelper.dateFormatHandler(selectedDate, type)}
        </small>
      </div>
      <div className="col">
        <Calendar onValue={handleValue} url={url} />
      </div>
    </div>
  );
}
