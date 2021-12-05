const basic = document.forms.basic;

const validations = {
	login: (value) => value.length < 5 || value.length > 20,
	email: (value) => !value.includes('@'),
	consent: (value, checked) => !checked 
};

basic.addEventListener('focusout', (event) => {
	const { name, value, checked } = event.target;

	event.target.setAttribute('aria-invalid', name in validations ? validations[name](value, checked) : false);
});

basic.addEventListener('focusin', (event) => {
	event.target.setAttribute('aria-invalid', false);
});

basic.addEventListener('input', (event) => {
	event.preventDefault();

	switch (event.target.type) {
	case 'checkbox':
		console.log(event.target.name, event.target.checked);
		break;
	
	default:
		console.log(event.target.value);
		break;
	}	
});

basic.addEventListener('submit', (event) => {
	event.preventDefault();

	const errors = event.currentTarget.querySelectorAll('[aria-invalid="true"]');

	if (errors.length) {
		return alert(`${Array.from(errors).map(error => error.name).join(',')} invalid`);
	}

	const data = new FormData(event.currentTarget);

	const serialized = Array.from(new Set(Array.from(data.keys()))).reduce((serialized, key) => {		
		return {
			...serialized,
			[key]: data.getAll(key).join(',')
		};
	}, {});

	console.log(serialized);
});

// basic.login.addEventListener('mousedown', (event) => {
// 	event.preventDefault();

// 	console.log('down');
// });

// basic.login.addEventListener('mouseup', (event) => {
// 	event.preventDefault();

// 	console.log('up');
// });

// basic.login.addEventListener('click', () => {
// 	console.log('click');
// });

// basic.theme.addEventListener('mousedown', (event) => {
// 	event.preventDefault();
// });