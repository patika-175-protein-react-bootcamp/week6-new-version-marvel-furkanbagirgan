import React,{ useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {useTranslation} from 'react-i18next';

import { useCharacters } from "../contexts/character";

function Characters() {
  //Here are the states holding the data.
  const [loading, setLoading] = useState(false);
  const { characters,activePage,getAllCharacters } = useCharacters();
  let navigate = useNavigate();
  const {t} = useTranslation();

  //This function works every time the application is opened and the active page changes.
  useEffect(() => {
    getCharacters();
  }, [activePage]);

  const getCharacters = async () => {
    setLoading(true);
    await getAllCharacters();
    setLoading(false);
  };

  return (
    <div className="dp-flex-wrap wd-100 main">
      <ul className="dp-flex-wrap content">
        {
          /* Here the characters are printed on the screen. */
          characters?.data?.length > 0 &&
          characters?.data.map((item, index) => (
              <li key={index} className="dp-flex-col ch-container" onClick={()=>navigate("/detail/"+item.id)}>
                <img
                  className="character"
                  src={
                    item.thumbnail.path +
                    "/portrait_incredible." +
                    item.thumbnail.extension
                  }
                  alt=""
                />
                <span className="block-font ch-con-span">{item.name}</span>
              </li>
            ))
        }
      </ul>
      {loading && (
        <div className="dp-flex loading">
          <span className="block-font">{t("multipleLoading")}</span>
        </div>
      )}
    </div>
  );
}

export default Characters;
