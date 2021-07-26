import ToasterStyles from "./toast.module.css";

export default function Toast({ open, message }) {
  const openClass = open ? 'show' : '';
  return open ? <div className={`${ToasterStyles.toastContainer} ${openClass}`}>{message}</div>: '';
}
