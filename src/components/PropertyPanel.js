import React,{ useState , useRef} from "react";
import i18n from 'i18next';
import {useTranslation} from 'react-i18next';
import { useNavigate } from "react-router-dom";

import useOutsideClick from "../hooks/useOutsideClick";
import { useCharacters } from "../contexts/character";

function PropertyPanel({isDetail}) {
  const [activeLang,setActiveLang]=useState("TR");
  const [open,setOpen]=useState(true);
  const [wordEntered, setWordEntered] = useState("");
  const { searchCharacters,getSearchingCharacters } = useCharacters();
  const {t} = useTranslation();
  let navigate = useNavigate();
  const searchRef = useRef();

  useOutsideClick(searchRef, () => {
    setOpen(false);
  });

  const changeLanguage=(lang)=>{
    i18n.changeLanguage(lang);
    setActiveLang(lang.toUpperCase());
  }

  const handleFilter = async (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    await getSearchingCharacters(searchWord);
  };

  const searchClick=(id)=>{
    navigate("/detail/"+id);
    setWordEntered("");
    setOpen(false);
  }

  return (
    <div className="dp-flex propertyPanel">
        {isDetail ? 
          <div className="backButtonContainer">
            <button className="backButton" onClick={()=>navigate(-1)}>{t("backButton")}</button>
          </div>
          :
          <div className="searchContainer">
            <div className="searchBar">
                <label className="searchLabel">{t("searchTitle")}</label>
                <input ref={searchRef} className="searchInput" onClick={() => setOpen(true)} type="text" placeholder={t("searchPlaceholder")} value={wordEntered} onChange={handleFilter}/>
            </div>
            {searchCharacters?.data?.length > 0 && open &&(
              <div className="searchResult">
                {searchCharacters?.data?.map((item,index) => {
                  return (
                    <span key={index} className="searchItem" onClick={()=>searchClick(item.id)}>
                      <p>{t("characterName")+" "+item.name}</p>
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        }
        <div className="langBar">
            <span className={activeLang==="FR"?"dp-flex-row activeLang":"dp-flex-row lang"} onClick={()=>changeLanguage("fr")}>FR</span>
            <span className={activeLang==="EN"?"dp-flex-row activeLang":"dp-flex-row lang"} onClick={()=>changeLanguage("en")}>EN</span>
            <span className={activeLang==="TR"?"dp-flex-row activeLang":"dp-flex-row lang"} onClick={()=>changeLanguage("tr")}>TR</span>
        </div>
    </div>
  );
}

export default PropertyPanel;