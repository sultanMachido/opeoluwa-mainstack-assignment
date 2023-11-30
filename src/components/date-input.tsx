/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import dropdownIcon from "../assets/icons/expand_more.svg";
import showLessIcon from "../assets/icons/expand_less.svg";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { createPortal } from "react-dom";

type DateInputProps = {
  calendarSectionId: any;
  addTimeRangeToQuery: (value: string, type: string, option: string) => void;
  option: string;
  startDate: string;
};
const DateInput = ({
  calendarSectionId,
  addTimeRangeToQuery,
  option,
  startDate,
}: DateInputProps) => {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <>
      <div
        className={`cursor-pointer relative w-[203px] bg-[${
          showCalendar
            ? "#FFFFFF border-solid border-2  border-black"
            : "#EFF1F6"
        }] px-[16px] py-[14px] rounded-[12px] flex justify-between w-5/12`}
        onClick={() => {
          setShowCalendar(!showCalendar);
        }}
      >
        <p className="text-sm">{startDate}</p>
        {showCalendar ? <img src={showLessIcon} /> : <img src={dropdownIcon} />}
      </div>
      {showCalendar &&
        createPortal(
          <div className="absolute z-[30] w-full top-[58px] left-[0px]">
            <Calendar
              value={new Date(startDate)}
              next2Label={null}
              showNeighboringMonth={false}
              prev2Label={null}
              onChange={(value) => {
                if (value) {
                  addTimeRangeToQuery(
                    value.toLocaleString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }),
                    "timeRange",
                    option
                  );
                }
              }}
            />
          </div>,
          calendarSectionId.current
        )}
    </>
  );
};

export default DateInput;
