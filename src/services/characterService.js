import axios, { searchAuth,auth, axiosURL } from '../constants/axios';

export const getCharacters = async (offset) => {
	try {
		let adding = '';
    
		if (offset) {
			adding += '&offset=' + offset;
		}

		const res = await axios.get(axiosURL.characters + adding).then(res => res);

		return {
			data : res.data.data,
			status: res.statusText
		};
	}
	catch (error) {
		return {
			status: false,
			error: error
		};
	}
};

export const getCharacterDetail = async id => {
	try {
		const res = await axios.get(axiosURL.character + id + auth).then(res => res);

		return {
			data : res.data.data,
			status: res.statusText
		};
	}
	catch (error) {
		return {
			status: false,
			error: error
		};
	}
};

export const getSearchCharacters = async word => {
	try {
		const res = await axios.get(axiosURL.searchCharacters + "?nameStartsWith="+ word +"&orderBy=name&limit=5" + searchAuth).then(res => res);

		return {
			data : res.data.data,
			status: res.statusText
		};
	}
	catch (error) {
		return {
			status: false,
			error: error
		};
	}
}