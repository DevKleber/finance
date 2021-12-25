import { EventEmitter } from '@angular/core';
import swal from 'sweetalert2';

export class NotificationService {
	constructor() {}

	notifier = new EventEmitter<string>();

	notifySweet(message: string) {
		swal.fire(`${message}`, '', 'success');
	}
	notifyError(message: string) {
		swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: `${message}`,
		});
	}
	notifyAlert(message: string) {
		swal.fire(`${message}`, '', 'info');
	}
}
