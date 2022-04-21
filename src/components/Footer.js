import React from "react";

import { useCharacters } from "../contexts/character";

function Footer(){
	const { pages,activePage,skipPage } = useCharacters();

	return(
		<div className="dp-flex-row wd-100 footer">
		<div className="dp-flex transition">
			{/* Here the back button, next button and the page items are printed on the screen. */}
			{activePage>3 && <span><i className="fa-solid fa-angle-left fa-2xl grey-color trans-button" onClick={()=>skipPage(activePage-1)}></i></span>}
			{
				pages.map( (item,index) =>
					<span key={index} className={activePage===item ? 'block-font active-page' : 'block-font foot-tran-span grey-color'} onClick={item!=='...' ? ()=>skipPage(item) : null}>{item}</span>
				)
			}
			{activePage<pages[pages.length - 1]-3 && <span><i className="fa-solid fa-angle-right fa-2xl grey-color trans-button" onClick={()=>skipPage(activePage+1)}></i></span>}
		</div>
	</div>
	);
}
export default Footer;