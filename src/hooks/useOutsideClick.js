import { useEffect } from 'react';

const useOutsideClick = (ref, callback) => {
	const handle = e => {
		if (ref?.current && !ref?.current.contains(e.target)) {
			callback();
		}
	};

	useEffect(() => {
		document.addEventListener('click', handle);

		return () => {
			document.removeEventListener('click', handle);
		};
	});
};

export default useOutsideClick;