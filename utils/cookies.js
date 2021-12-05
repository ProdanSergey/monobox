const COOKIES = (() => {
	const getCookie = (name) => {

		for (const cookie of document.cookie.split(';')) {
			const [key, value] = cookie.split('='); 
			
			if (decodeURIComponent(key).trim() === name) {
				return decodeURIComponent(value);
			}
		}

		return null;
	};

	const hasCookie = (name) => {
		return Boolean(getCookie(name));
	};
	
	const setCookie = (name, value, options) => {
		options = {
			path: '/',
			...options
		};

		if (options.expires instanceof Date) {
			options.expires = options.expires.toUTCString();
		}
	
		let cookie = [name, value].map(encodeURIComponent).join('=');
	
		for (const key of Object.keys(options)) {
			cookie += '; ' + key;

			if (typeof options[key] !== 'boolean') {
				cookie += "=" + options[key];
			}
		}
	
		document.cookie = cookie;
	};

	const removeCookie = (name) => {
		if (hasCookie(name)) {
			setCookie(name, '', {
				'max-age': -1
			});
		}
	};
	
	const count = () => {
		return document.cookie.split(';').length;
	};
	
	return {
		getCookie,
		hasCookie,
		setCookie,
		removeCookie,
		count
	};
})();