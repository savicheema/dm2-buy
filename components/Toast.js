import ToasterStyles from "./toast.module.css";

export default function Toast({ open, message, type }) {
  const openClass = open ? "show" : "";
  if (type === "success") {
    return open ? (
      <div
        className={`${ToasterStyles.toastContainer} ${openClass}`}
        style={{ backgroundColor: "#44c073" }}
      >
        {message}
      </div>
    ) : (
      ""
    );
  }
  if (type === "error") {
    return open ? (
      <div
        className={`${ToasterStyles.toastContainer} ${openClass}`}
        style={{ backgroundColor: "#ff3333" }}
      >
        {message}
      </div>
    ) : (
      ""
    );
  }
  return "";
}
