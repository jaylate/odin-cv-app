import { useMemo, useState } from "react";
import { Form } from "./components/Form.jsx";
import { CVRender } from "./CVRender.jsx";

function CVEdit({ data, onDataChange }) {
  const generalData = useMemo(() => data.general, [data]);

  // TODO: add support for profile photo
  // TODO: add support for profile description
  // TODO: add skills and awards sections

  const generalFields = [
    { name: "name", label: "Your name: ", value: generalData.name },
    {
      name: "jobTitle",
      label: "Desired job title: ",
      value: generalData.jobTitle,
    },
    {
      name: "email",
      label: "Your email: ",
      type: "email",
      value: generalData.email,
    },
    {
      name: "phone",
      label: "Your phone number: ",
      type: "tel",
      value: generalData.phone,
    },
    { name: "portfolio", label: "Portfolio: ", value: generalData.portfolio },
    { name: "github", label: "Github: ", value: generalData.github },
    { name: "linkedin", label: "Linkedin: ", value: generalData.linkedin },
  ];

  const educationData = useMemo(() => data.education, [data]);
  function generateEducationFields(name, entry) {
    return [
      { name: "school", label: "Name of school/Course: ", value: name },
      { name: "degree", label: "Degree (if school): ", value: entry.degree },
      {
        name: "experience",
        label: "Gained experience (optional): ",
        value: entry.experience,
      },
      {
        name: "startDate",
        label: "Start of studies: ",
        type: "date",
        value: entry.startDate,
      },
      {
        name: "endDate",
        label: "End of studies: ",
        type: "date",
        value: entry.endDate,
      },
    ];
  }

  const experienceData = useMemo(() => data.experience, [data]);
  function generateExperienceFields(name, entry) {
    return [
      { name: "company", label: "Company: ", value: name },
      { name: "role", label: "Role: ", value: entry.role },
      {
        name: "description",
        label: "Description: ",
        type: "textarea",
        value: entry.description,
      },
      {
        name: "startDate",
        label: "Start Date: ",
        type: "date",
        value: entry.startDate,
      },
      {
        name: "endDate",
        label: "End Date: ",
        type: "date",
        value: entry.endDate,
      },
    ];
  }

  return (
    <div id="edit" className="hidden-on-mobile">
      <div className="general">
        <h2>General information</h2>
        <label htmlFor="gdprCheckbox">
          Include GDPR Clause?
          <input
            type="checkbox"
            name="gdprCheckbox"
            onClick={(e) => {
              var gdprDiv = document.getElementById("GDPRClause");
              gdprDiv.style.display = e.target.checked ? "block" : "none";
            }}
          />
        </label>
        <Form
          defaultData={generalData}
          onSubmit={(d) => {
            onDataChange({ ...data, general: d });
          }}
          fields={generalFields}
        />
      </div>

      <div className="education">
        <h2>Education</h2>
        {Object.entries(educationData).map(([key, entry]) => (
          <div key={key}>
            <Form
              defaultData={entry}
              onSubmit={(d) => {
                onDataChange({
                  ...data,
                  education: { ...educationData, [key]: d },
                });
              }}
              fields={generateEducationFields(key, entry)}
            />
            <button
              className="delete"
              onClick={() => {
                delete educationData[key];
                onDataChange({
                  ...data,
                  education: { ...educationData },
                });
              }}
            >
              Delete item
            </button>
          </div>
        ))}
        <button
          className="add"
          onClick={() => {
            onDataChange({
              ...data,
              education: { ...educationData, [""]: {} },
            });
          }}
        >
          Add item
        </button>
      </div>

      <div className="experience">
        <h2>Experience</h2>
        {Object.entries(experienceData).map(([key, entry]) => (
          <div key={key}>
            <Form
              key={key}
              formKey={key}
              defaultData={entry}
              onSubmit={(d) => {
                onDataChange({
                  ...data,
                  experience: { ...experienceData, [key]: d },
                });
              }}
              fields={generateExperienceFields(key, entry)}
            />
            <button
              className="delete"
              onClick={() => {
                delete experienceData[key];
                onDataChange({
                  ...data,
                  experience: { ...experienceData },
                });
              }}
            >
              Delete item
            </button>
          </div>
        ))}
        <button
          className="add"
          onClick={() => {
            onDataChange({
              ...data,
              experience: { ...experienceData, [""]: {} },
            });
          }}
        >
          Add item
        </button>
      </div>
    </div>
  );
}

function CVApp({ data }) {
  const [d, setData] = useState(data);
  return (
    <>
      <div id="control-buttons">
        <button
          id="toggleEdit"
          onClick={() => {
            // FIXME: rewrite this in cleaner way
            var editDiv = document.getElementById("edit");
            var renderDiv = document.getElementById("render");
            var contentDiv = document.getElementById("content");
            var mediaIsSmall = window.matchMedia("(max-width: 1200px)").matches;

            if (window.getComputedStyle(editDiv).display == "none") {
              editDiv.style.display = "block";
              if (!mediaIsSmall) contentDiv.style.display = "grid";
              else {
                renderDiv.classList.add("hidden-on-mobile");
                editDiv.classList.remove("hidden-on-mobile");
              }
            } else {
              if (mediaIsSmall) {
                editDiv.classList.add("hidden-on-mobile");
                renderDiv.classList.remove("hidden-on-mobile");
              } else editDiv.style.display = "none";

              contentDiv.style.display = "block";
              renderDiv.style.display = "block";
            }
          }}
        >
          Enable/Disable Edit
        </button>
        <button
          id="exportToPDF"
          onClick={() => {
            // FIXME: styles are loaded only on second button click
            var renderDiv = document.getElementById("render");
            var styles = document.querySelectorAll(
              "style, link[rel='stylesheet']",
            );
            const printWindow = window.open(" ", "PRINT");

            printWindow.document.write("<head>");
            styles.forEach((style) => {
              printWindow.document.write(style.outerHTML);
            });
            printWindow.document.write("</head>");
            printWindow.document.write(
              "<body>" + renderDiv.outerHTML + "</body>",
            );

            printWindow.print();
            printWindow.close();
          }}
        >
          Export to PDF
        </button>
      </div>
      <div id="content">
        <CVEdit data={d} onDataChange={(newData) => setData(newData)} />
        <CVRender data={d} />
      </div>
    </>
  );
}

export default CVApp;
