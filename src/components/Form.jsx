import { useState } from "react";

function Form({ defaultData, onSubmit, fields }) {
  const [data, setData] = useState(defaultData);

  const handleChange = (e) => {
    e.preventDefault();

    if (e.target.type === "file") {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setData({
        ...data,
        [e.target.name]: url,
      });
    } else {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    }

    onSubmit(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(data);
  };

  // FIXME: better handling for input: user shouldn't need to hit keys twice for change to appear

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name}>
          <label htmlFor={field.name}>{field.label}</label>
          {field.type === "textarea" ? (
            <textarea
              name={field.name}
              value={data[field.name] || ""}
              onChange={handleChange}
            />
          ) : (
            <input
              type={field.type || "text"}
              name={field.name}
              value={data[field.name] || ""}
              onChange={handleChange}
            />
          )}
        </div>
      ))}

      <button type="submit" className="save">
        Save
      </button>
    </form>
  );
}

export { Form };
