let Validator = {
	monitorSubmit:(e)=> {
		e.preventDefault();

	}
};	






let form = document.querySelector('.validator');
form.addEventListener('submit', Validator.monitorSubmit)