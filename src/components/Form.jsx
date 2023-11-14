import { useState } from "react";
import "./formStyle.css";

export default function Form() {
  const [dateOnScreen, setDateOnScreen] = useState({
    dayOnScreen: "- -",
    monthOnScreen: "- -",
    yearOnScreen: "- -",
  });

  const longMonth = [1, 3, 5, 7, 8, 10, 12];

  let currentDay = new Date().getDate();
  let currentMonth = new Date().getMonth() + 1;
  let currentYear = new Date().getFullYear();

  const [date, setDate] = useState({ day: "", month: "", year: "" });
  const [click, setClick] = useState(false);

  const [error, setError] = useState({
    errorDay: false,
    errorMonth: false,
    errorYear: false,
    errorDate: false,
  });

  const [errorMessage, setErrorMessage] = useState({
    day: "This field is required",
    month: "This field is required",
    year: "This field is required",
  });

  function handleOutput() {
    setError({
      errorDay: false,
      errorMonth: false,
      errorYear: false,
      errorDate: false,
    });

    setErrorMessage({
      day: "This field is required",
      month: "This field is required",
      year: "This field is required",
    });

    if (currentDay - date.day < 1) {
      currentMonth = currentMonth - 1;
      setDateOnScreen((prevDate) => ({
        ...prevDate,
        dayOnScreen: currentDay - date.day + 30,
      }));
    } else {
      setDateOnScreen((prevDate) => ({
        ...prevDate,
        dayOnScreen: currentDay - date.day,
      }));
    }

    if (currentMonth - date.month < 1) {
      setDateOnScreen((prevDate) => ({
        ...prevDate,
        monthOnScreen: currentMonth - date.month + 12,
      }));
      currentYear = currentYear - 1;
    } else {
      setDateOnScreen((prevDate) => ({
        ...prevDate,
        monthOnScreen: currentMonth - date.month,
      }));
    }

    setDateOnScreen((prevDate) => ({
      ...prevDate,
      yearOnScreen: currentYear - date.year,
    }));
    setClick(true);
    handleError();
  }

  function handleError() {
    // isLeapYear();

    if (date.day == 31 && date.month < 12) {
      if (!longMonth.includes(date.month)) {
        setErrorMessage((prevMes) => ({
          prevMes,
          day: "Must be a valid date",
        }));

        setError((prevError) => ({
          ...prevError,
          errorDay: true,
          errorDate: true,
        }));
      }
    }

    if (date.day >= 29 && date.month == 2) {
      console.log("feb");
      if (date.day == 29 && isLeapYear() == false) {
        setErrorMessage((prevMes) => ({
          ...prevMes,
          day: "Must be a valid date",
        }));
        setError((prevError) => ({
          ...prevError,
          errorDay: true,
          errorDate: true,
        }));
      } else if (date.day == 29 && isLeapYear()) {
        setError((prevError) => ({
          ...prevError,
          errorDay: false,
          errorDate: false,
        }));
      } else {
        setErrorMessage((prevMes) => ({
          ...prevMes,
          day: "Must be a valid day",
        }));
        setError((prevError) => ({
          ...prevError,
          errorDay: true,
          errorDate: true,
        }));
      }
    }

    if (date.day > 31 || date.day === "" || date.day < 1) {
      if (date.day > 31) {
        setErrorMessage((prevMes) => ({
          ...prevMes,
          day: "Must be a valid day",
        }));
      }
      setError((prevDate) => ({
        ...prevDate,
        errorDay: true,
        errorDate: true,
      }));
    }
    if (date.month > 12 || date.month === "" || date.month < 1) {
      if (date.month > 12) {
        setErrorMessage((prevMes) => ({
          ...prevMes,
          month: "Must be a valid month",
        }));
      }
      setError((prevDate) => ({
        ...prevDate,
        errorMonth: true,
        errorDate: true,
      }));
    }
    if (date.year > currentYear || date.year === "" || date.year < 1900) {
      if (date.year > currentYear) {
        setErrorMessage((prevMes) => ({
          ...prevMes,
          year: "Must be in the past",
        }));
      }
      setError((prevDate) => ({
        ...prevDate,
        errorYear: true,
        errorDate: true,
      }));
    }
  }

  function clearInput() {
    setDate({ day: "", month: "", year: "" });
  }

  function isLeapYear() {
    if (date.year % 4 == 0 && date.year % 100 != 0) {
      console.log("first condition and it a leap year");
      return true;
    } else if (date.year % 400 == 0 && date.year % 100 == 0) {
      console.log("second condition and it a leap year");
      return true;
    } else {
      console.log("therd condition and it not a leap year");
      return false;
    }
  }

  if (!error.errorDate && click) {
    setClick(false);
    clearInput();
  }

  return (
    <div>
      <form action="">
        <div className="date__cell">
          <label
            htmlFor="day"
            className={error.errorDate ? "red-color-label" : " "}
          >
            DAY
          </label>
          <input
            className={error.errorDate ? "red-color-input" : " "}
            type="number"
            maxLength={2}
            id="day"
            name="day"
            placeholder="DD"
            value={date.day}
            onChange={(e) => {
              setDate((prevDate) => {
                return { ...prevDate, [e.target.name]: e.target.value };
              });
            }}
          />
          {error.errorDay && <p className="error">{errorMessage.day}</p>}
        </div>

        <div className="date__cell">
          <label
            htmlFor="month"
            className={error.errorDate ? "red-color-label" : " "}
          >
            MONTH
          </label>
          <input
            className={error.errorDate ? "red-color-input" : " "}
            type="number"
            maxLength={2}
            id="month"
            name="month"
            placeholder="MM"
            value={date.month}
            onChange={(e) => {
              setDate((prevDate) => {
                return { ...prevDate, [e.target.name]: e.target.value };
              });
            }}
          />
          {error.errorMonth && <p className="error">{errorMessage.month}</p>}
        </div>
        <div className="date__cell">
          <label
            htmlFor="year"
            className={error.errorDate ? "red-color-label" : " "}
          >
            YEAR
          </label>
          <input
            className={error.errorDate ? "red-color-input" : " "}
            type="nubmer"
            maxLength={4}
            id="year"
            name="year"
            placeholder="YYYY"
            value={date.year}
            onChange={(e) => {
              setDate((prevDate) => {
                return { ...prevDate, [e.target.name]: e.target.value };
              });
            }}
          />
          {error.errorYear && <p className="error">{errorMessage.year}</p>}
        </div>
      </form>
      <div className="wrapper">
        <button onClick={handleOutput}>
          <img src="/images/icon-arrow.svg" alt="arrow-img" />
        </button>
      </div>

      <div className="output">
        <h1>
          <span>{!error.errorDate ? dateOnScreen.yearOnScreen : "- -"}</span>
          {dateOnScreen.dayOnScreen == 1 ? "year" : "years"}
        </h1>
        <h1>
          <span>{!error.errorDate ? dateOnScreen.monthOnScreen : "- -"}</span>
          {dateOnScreen.monthOnScreen == 1 ? "month" : "months"}
        </h1>
        <h1>
          <span>{!error.errorDate ? dateOnScreen.dayOnScreen : "- -"}</span>
          {dateOnScreen.yearOnScreen == 1 ? "day" : "days"}
        </h1>
      </div>
    </div>
  );
}
