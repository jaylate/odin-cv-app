import { useState, useEffect } from "react";
import MailIcon from "./assets/mail.svg";
import PhoneIcon from "./assets/phone.svg";
import GlobeIcon from "./assets/globe.svg";
import GithubIcon from "./assets/github.svg";
import LinkedinIcon from "./assets/linkedin.svg";

function CVRender({ data }) {
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  function renderDate(startDate, endDate) {
    var startDateObject = new Date(startDate);
    var endDateObject = new Date(endDate);
    function generateDateString(dateObject) {
      return month[dateObject.getMonth()] + " " + dateObject.getFullYear();
    }
    return (
      <p className="date">
        {(startDate ? generateDateString(startDateObject) : "") +
          " - " +
          (endDate
            ? generateDateString(endDateObject)
            : startDate
              ? "now"
              : "")}
      </p>
    );
  }

  return (
    <div id="render">
      <div className="general">
        <h1>{data.general.name}</h1>
        {data.general.jobTitle ? <h2>{data.general.jobTitle}</h2> : ""}
        <div>
          <div>
            {data.general.email ? (
              <p>
                <a href={"mailto:" + data.general.email}>
                  <MailIcon />
                  {data.general.email}
                </a>
              </p>
            ) : (
              ""
            )}
            {data.general.phone ? (
              <p>
                <a href={"tel:" + data.general.phone}>
                  <PhoneIcon />
                  {data.general.phone}
                </a>
              </p>
            ) : (
              ""
            )}
          </div>
          <div>
            {data.general.portfolio ? (
              <p>
                <a href={data.general.portfolio}>
                  <GlobeIcon />
                  {data.general.portfolio.replace(/^https?\:\/\//i, "")}
                </a>
              </p>
            ) : (
              ""
            )}
            {data.general.github ? (
              <p>
                <a href={data.general.github}>
                  <GithubIcon />
                  {data.general.github.replace(/^https?\:\/\//i, "")}
                </a>
              </p>
            ) : (
              ""
            )}
            {data.general.linkedin ? (
              <p>
                <a href={data.general.linkedin}>
                  <LinkedinIcon />
                  {data.general.linkedin.replace(/^https?\:\/\//i, "")}
                </a>
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      {Object.keys(data.education).length ? (
        <>
          <hr />
          <div className="education">
            <h2>Education</h2>
            <div>
              {Object.entries(data.education).map(([key, entry]) => (
                <div key={key}>
                  {renderDate(entry.startDate, entry.endDate)}
                  <div>
                    <h3>{entry.school}</h3>
                    {entry.degree ? <p>{entry.degree}</p> : ""}
                    {entry.experience ? <p>{entry.experience}</p> : ""}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        ""
      )}

      {Object.keys(data.experience).length ? (
        <>
          <hr />
          <div className="experience">
            <h2>Experience</h2>
            <div>
              {Object.entries(data.experience).map(([key, entry]) => (
                <div key={key}>
                  {renderDate(entry.startDate, entry.endDate)}
                  <div>
                    <h3>{entry.company}</h3>
                    {entry.role ? <p>{entry.role}</p> : ""}
                    {entry.description ? <p>{entry.description}</p> : ""}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        ""
      )}

      <hr />
      <div id="GDPRClause">
        I hereby give consent for my personal data to be processed and stored
        for recruitment purposes. This is in accordance with the General Data
        Protection Regulation (EU) 2016/679.
      </div>
    </div>
  );
}

export { CVRender };
