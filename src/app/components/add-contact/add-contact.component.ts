import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-add-contact',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.scss'
})
export class AddContactComponent {

	errorMessage = signal("");

	addForm = new FormGroup({
		name: new FormControl(''),
		mobile: new FormControl(''),
		email: new FormControl(''),
		address: new FormControl(''),
		notes: new FormControl('')
	});

	contactService: ContactService = inject(ContactService);
	router: Router = inject(Router);

	saveContact(){
		let message = "";

		let name = this.addForm.value.name ?? "";
		if(!name){
			message += "Name not set.\n"
		}

		let mobileNo = Number(this.addForm.value.mobile);
		if(mobileNo === 0 || mobileNo > 9999_9999 || mobileNo < 1000_0000){
			message += "Phone number needs to be 8 digits.\n"
		}

		if(message){
			this.errorMessage.set(message);
			return;
		}

		this.errorMessage.set("");

		this.contactService.saveContact(
			name,
			mobileNo,
			this.addForm.value.email ?? "",
			this.addForm.value.address ?? "",
			this.addForm.value.notes ?? ""
		)
		.pipe(catchError(err => {
			throw err;
		}))
		.subscribe(response => {
			console.log("Response:",response);
			this.router.navigate([""]);
			return
		})

	}
}
