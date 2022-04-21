import React, { useContext, useState } from "react";
import { getCharacters,getCharacterDetail,getSearchCharacters } from "./../services/characterService";

const CharactersContext = React.createContext();

const CharactersProvider = ({ children }) => {
  const [characters, setCharacters] = useState({});
  const [pages, setPages] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [character, setCharacter] = useState({});
  const [searchCharacters,setSearchCharacters]=useState({});

  const getAllCharacters = async () => {
    const localCharacters = JSON.parse(sessionStorage.getItem(`${activePage}`));
    if (localCharacters) {
      const totalCharacters = await JSON.parse(sessionStorage.getItem("total"));
      setCharacters({
        status: "OK",
        data: localCharacters,
      });
      getPages(activePage, Math.ceil(totalCharacters / 20));
    } else {
      let allCharacters = await getCharacters(activePage * 20 - 20);
      if (allCharacters.status === "OK") {
        setCharacters({
          status: "OK",
          data: allCharacters.data.results,
        });
        sessionStorage.setItem(
          `${activePage}`,
          JSON.stringify(allCharacters.data.results)
        );
        sessionStorage.setItem(
          "total",
          JSON.stringify(allCharacters.data.total)
        );
        getPages(activePage, Math.ceil(allCharacters.data.total / 20));
      } else {
        setCharacters({
          status: "ERROR",
          data: [],
        });
      }
    }
  };

  const getPages = (activePage, totalNumber) => {
    //The pagination section are assigned to the pages state according to the selected page number and the total page.
    var readypage = [];
    switch (true) {
      case activePage < 4:
        readypage.push(...[1, 2, 3, 4, "...", totalNumber]);
        break;
      case 3 < activePage && activePage < totalNumber - 3:
        readypage.push(
          ...[
            1,
            "...",
            activePage - 1,
            activePage,
            activePage + 1,
            "...",
            totalNumber,
          ]
        );
        break;
      case activePage === totalNumber - 3:
        readypage.push(
          ...[
            1,
            "...",
            activePage - 1,
            activePage,
            activePage + 1,
            activePage + 2,
            totalNumber,
          ]
        );
        break;
      case activePage === totalNumber - 2:
        readypage.push(
          ...[1, "...", activePage - 1, activePage, activePage + 1, totalNumber]
        );
        break;
      case activePage === totalNumber - 1:
        readypage.push(...[1, "...", activePage - 1, activePage, totalNumber]);
        break;
      default:
        readypage.push(...[1, "...", activePage - 1, activePage]);
    }
    setPages(readypage);
  };

  const skipPage = (skippedPage) => {
    //Here the selected page is switched and the scrollbar is moved up according to the width of the page.
    switch (true) {
      case window.innerWidth > 1400:
        window.scrollTo(0, 1000);
        break;
      case 1400 > window.innerWidth && window.innerWidth > 1024:
        window.scrollTo(0, 700);
        break;
      case 1024 > window.innerWidth && window.innerWidth > 768:
        window.scrollTo(0, 400);
        break;
      default:
        window.scrollTo(0, 150);
        break;
    }
    setActivePage(skippedPage);
  };

  const getCharacter= async(id)=>{
    let detailCharacter = await getCharacterDetail(id);
      if (detailCharacter.status === "OK") {
        setCharacter({
          status: "OK",
          data: detailCharacter.data.results,
        });
      } else {
        setCharacter({
          status: "ERROR",
          data: [],
        });
      }
  }

  const getSearchingCharacters= async (word)=>{
    let searchCharacters= await getSearchCharacters(word);
    if (searchCharacters.status === "OK") {
      setSearchCharacters({
        status: "OK",
        data: searchCharacters.data.results,
      });
    } else {
      setSearchCharacters({
        status: "ERROR",
        data: [],
      });
    }
  }

  return (
    <CharactersContext.Provider
      value={{
        characters,
        pages,
        activePage,
        character,
        getAllCharacters,
        getCharacter,
        skipPage,
        searchCharacters,
        getSearchingCharacters
      }}
    >
      {children}
    </CharactersContext.Provider>
  );
};

function useCharacters() {
  return useContext(CharactersContext);
}

export { CharactersProvider, CharactersContext, useCharacters };
