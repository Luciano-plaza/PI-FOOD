import React from "react";
import style from "./Paginado.module.css";
export const Paginado = ({ recipes, pageLimit, paginado }) => {
  const arrPages = [];
  for (let i = 1; i <= Math.ceil(recipes / pageLimit); i++) {
    arrPages.push(i);
  }

  return (
    <div>
      <ul>
        {arrPages &&
          arrPages.map((index) => (
            <button
              className={style.pages}
              key={index}
              onClick={() => paginado(index)}
            >
              {index}
            </button>
          ))}
      </ul>
    </div>
  );
};
