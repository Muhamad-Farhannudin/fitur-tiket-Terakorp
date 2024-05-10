import React from "react";

export default function ButtonDelete({onClick}) {
  return (
    <div className="container d-flex justify-content-center align-items-center p-2 bg-danger rounded-circle cursor-pointer" onClick={onClick}>
      <i className="delete bi bi-trash fw-bold fs-5 text-white"></i>
    </div>
  );
}
