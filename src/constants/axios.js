import axios from 'axios';

export const baseURL = 'https://gateway.marvel.com';
export default axios.create({ baseURL });
export const hash = 'ed007a9321750d29b2d2c7721a7f740c';
export const publicKey = 'e8f1680aa7c72ebcd49bb515a2ff3780';
export const auth = '?ts=1&apikey=' + publicKey + '&hash=' + hash;
export const searchAuth = '&ts=1&apikey=' + publicKey + '&hash=' + hash;

export const axiosURL = {
	characters: '/v1/public/characters' + auth,
	character: '/v1/public/characters/',
	searchCharacters: '/v1/public/characters'
};