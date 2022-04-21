import React, { useEffect, useState } from "react";
import {useTranslation} from 'react-i18next';

import { useCharacters } from "../contexts/character";

function CharacterDetail({characterId}){
  const [loading, setLoading] = useState(false);
  const { character,getCharacter } = useCharacters();
  const {t} = useTranslation();

  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = async () => {
    setLoading(true);
    await getCharacter(characterId);
    setLoading(false);
  };

  return(
    <div className="dp-flex-wrap wd-100">
      {
        character?.data?.length>0 &&
        <div className="dp-flex-row detail">
          <img
            className="detailImg"
            src={
              character.data[0].thumbnail.path +
              "/portrait_uncanny." +
              character.data[0].thumbnail.extension
            }
            alt=""
          />
          <div className="detailCharacter">
            <div className="characterName"><span>{t("characterName")}</span><strong>{" "+character.data[0].name}</strong></div>
            <div className="characterComics">
              <span>{t("characterComics")}</span>
              <ul className="comics">
                {character.data[0].comics.items.slice(0,10).map((item,index)=>
                  <li key={index}>{item.name}</li>
                )}
              </ul>
            </div>
            <div className="characterDesc"><span>{t("characterDesc")}</span><strong>{" "+(character.data[0].description?character.data[0].description :t("descNone"))}</strong></div>
          </div>
        </div>
      }
      {loading && (
        <div className="dp-flex loading">
          <span className="block-font">{t("singleLoading")}</span>
        </div>
      )}
    </div>
  );
}
export default CharacterDetail;