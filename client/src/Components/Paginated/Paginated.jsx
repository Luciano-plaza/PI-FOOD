import React from "react";
import style from "./Paginated.module.css";
export const Paginated = ({ recipes, pageLimit, paginated }) => {
  const arrPages = [];
  for (let i = 1; i <= Math.ceil(recipes / pageLimit); i++) {
    arrPages.push(i);
  }

  return (
    <div className={style.pagesContainer}>
      <ul className={style.ULButtons}>
        {arrPages &&
          arrPages.map((index) => (
            <button
              className={style.page}
              key={index}
              onClick={() => paginated(index)}
            >
              {index}
            </button>
          ))}
      </ul>
    </div>
  );
};
