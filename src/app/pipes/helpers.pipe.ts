import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'helpers',
})
export class HelpersPipe implements PipeTransform {
	transform(value: any, args?: any, args1?: any): any {
		return this.oquefazer(value, args, args1);
	}

	oquefazer(value: string, args: string, args1: string) {
		let texto = '';
		switch (args) {
			case 'currencyToBr': {
				return this.currencyToBr(value, args1);
				break;
			}
			case 'currencyToDB': {
				return this.currencyToDB(value, args1);
				break;
			}
			case 'stringToNumber': {
				return this.stringToNumber(value, args1);
				break;
			}
			case 'formatDate2BR': {
				return this.formatDate2BR(value, args1);
				break;
			}
			case 'firstName': {
				return this.firstName(value, args1);
				break;
			}
			case 'random': {
				return this.random(value, args1);
				break;
			}
			case 'statusMeusAmigos': {
				return this.statusMeusAmigos(value, args1);
				break;
			}
			case 'getFileExtension': {
				return this.getFileExtension(value, args1);
				break;
			}

			case 'ifTimeIsNull': {
				return this.ifTimeIsNull(value, args1);
				break;
			}
			case 'checkVencimento': {
				return this.checkVencimento(value, args1);
				break;
			}
			case 'imgIsDevMode': {
				return this.imgIsDevMode(value, args1);
				break;
			}
			default: {
				break;
			}
		}
		return texto;
	}
	currencyToBr(value, palavra) {
		const formato = {
			minimumFractionDigits: 2,
			style: 'currency',
			currency: 'BRL',
		};
		if (Number(value) > 0) {
			return Number(value).toLocaleString('pt-BR', formato);
		}
		return value;
	}
	currencyToDB(value, palavra) {
		let valorDaDespesa = value;
		const valorTemVirgula = valorDaDespesa.toString().split(',');
		if (valorTemVirgula.length > 1) {
			valorDaDespesa = valorDaDespesa.replace('.', '').replace(',', '.');
		}

		return Number(valorDaDespesa);
	}
	stringToNumber(value, palavra) {
		return Number(value);
	}
	firstName(value, palavra) {
		let name = value;
		return name.toString().split(' ')[0];
	}
	random(value, arg) {
		var max = 16;
		var min = 1;
		let img = 'animals/';
		if (value.sexo != undefined) {
			max = 5;
			min = 1;
			return (
				value.sexo +
				'-' +
				Math.floor(Math.random() * (max - min + 1) + min) +
				'.png'
			);
		}
		return img + Math.floor(Math.random() * (max - min + 1) + min) + '.png';
	}
	statusMeusAmigos(value, palavra) {
		switch (value) {
			case 'a':
				return '<div class="text-xs text-uppercase">Desfazer amizade</div>';
				break;
			case 'p':
				return '<div class="text-xs font-weight-bold text-warning text-uppercase mb-1">Aguardando aprovação</div>';
				// return '<div class="text-xs font-weight-bold text-warning text-uppercase mb-1">Aguardando aprovação</div>';
				break;

			default:
				break;
		}
		if (value == true) {
		} else if (value != null) {
		}
	}
	formatDate2BR(value, palavra) {
		if (value) {
			const arDate = value.split('-');
			if (arDate.length == 3) {
				return arDate[2] + '/' + arDate[1] + '/' + arDate[0];
			}
		}
		return '';
	}

	imgIsDevMode(value, palavra) {
		let url = value.replace(/public\//g, '');
		return url;
	}
	checkSorteado(value, palavra) {
		var UserDate = value;
		if (value.length == 10) {
			UserDate = value + ' 23:59:59';
		}
		var ToDate = new Date();

		var retorno = null;
		if (new Date(UserDate).getTime() < ToDate.getTime()) {
			retorno =
				"<div class='label label-table label-info'>Sorteado</div>";
		}
		return retorno;
	}
	checkVencimento(value, palavra) {
		var UserDate = value;
		if (value.length == 10) {
			UserDate = value + ' 23:59:59';
		}
		var ToDate = new Date();

		var retorno = null;
		if (new Date(UserDate).getTime() < ToDate.getTime()) {
			retorno =
				"<div class='label label-table label-danger'>Sorteado</div>";
		}
		return retorno;
	}
	ifTimeIsNull(value, palavra) {
		if (value) {
			return value;
		}
		return '--:--';
	}
	getFileExtension(value, palavra) {
		if (value) {
			return value.split('.').pop() + '.svg';
		}
		return 'file.svg';
	}
}
