let Validator = {
	monitorSubmit:(e)=> {
		e.preventDefault();
		send = true;

		setTimeout(Validator.removeError, 3000)
		
		let inputs = form.querySelectorAll('input');

		for(let i=0;i<inputs.length;i++) {
			let input = inputs[i];
			let rules = Validator.checkRules(input);
			if(rules != true) {
				send = false;
				Validator.showError(input, rules)			
			};
		}

		if(send) {
			let html = ''
			html += '<div>Cadastro Concluído</div>';
			let txt = html;

			form.querySelector('.send--button').innerHTML = txt;
		}

	},

	checkRules:(input, check)=> {

		let rules = input.getAttribute('input-rules');

		if(rules !== null) {
		rules = rules.split('|');
		for(let n in rules){
			let rulesDetail = rules[n].split('=');
			switch(rulesDetail[0]) {
				case 'required':
					if(input.value == '') {
						return `Esse campo precisa ser preenchido!`.toUpperCase();
					}
				break;

				case 'min':
					if(input.value.length < rulesDetail[1]) {
						return `No mínimo ${rulesDetail[1]} caracteres`.toUpperCase();	
					}
				break;

				case 'email':
					if(input.value != '') {
					let regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
					if(!regex.test(input.value.toLowerCase()))
						return `E-mail inválido`.toUpperCase();
					}
				break;
			}
		 }
	   }
	   return true;
	},

	showError:(input, error)=> {
		
		let errorElement = document.createElement('div');
		errorElement.classList.add('error');
		errorElement.innerHTML = error;
		input.closest('.input-area').parentElement.insertBefore(errorElement, input.ElementSibling);
		
	},

	removeError:()=> {
		let input = form.querySelectorAll('input');

		for (let i=0;i<input.length;i++){
			input[i].style = '';
		}

		let errorElement = document.querySelectorAll('.error');
		for (let i=0;i<errorElement.length;i++){
			errorElement[i].remove();
		}
	}
};	

let form = document.querySelector('.validator');
form.addEventListener('submit', Validator.monitorSubmit)
