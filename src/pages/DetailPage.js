import React, {useEffect} from "react";
import { useParams } from "react-router-dom";
import "../App.css";

import PropertyPanel from "./../components/PropertyPanel";
import CharacterDetail from './../components/CharacterDetail';

function DetailPage() {
  let params = useParams();

  useEffect(()=>{
    window.scrollTo(0,500);
  },[]);

  //Here, the components of the first opened page are printed on the screen.
  return (
    <>
      <PropertyPanel isDetail={true}/>
      <CharacterDetail characterId={params.characterId} />
    </>
  );
}

export default DetailPage;
