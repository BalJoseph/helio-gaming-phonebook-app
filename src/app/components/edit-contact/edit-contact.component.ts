import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { catchError } from 'rxjs';
import { Contact } from '../../model/contact';

@Component({
  selector: 'app-edit-contact',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './edit-contact.component.html',
  styleUrl: './edit-contact.component.scss'
})
export class EditContactComponent implements OnInit {
  

  errorMessage = signal("");
  
    editForm = new FormGroup({
      name: new FormControl(''),
      mobile: new FormControl(''),
      email: new FormControl(''),
      address: new FormControl(''),
      notes: new FormControl('')
    });
  
    route: ActivatedRoute = inject(ActivatedRoute);
    contactService: ContactService = inject(ContactService);
    router: Router = inject(Router);

	contact!:Contact;

    ngOnInit(): void {
		const contactId: string = this.route.snapshot.params["id"]
		this.contactService.getContactById(contactId).pipe(
			catchError(err => {
			console.error(err);
			throw err;
			})
		).subscribe(contact => {
			if(!contact){
				this.router.navigate([""]);
				return;
			}

			this.contact = contact;
			this.editForm.setValue(
				{
					name: contact.name, 
					mobile: contact.mobile.toString(),
					email: contact.email ?? "",
					address: contact.address ?? "",
					notes: contact.notes ?? ""
				});
		});
    }
  
    editContact(){
		let message = "";

		let name = this.editForm.value.name ?? "";
		if(!name){
		message += "Name not set.\n"
		}

		let mobileNo = Number(this.editForm.value.mobile);
		if(mobileNo === 0 || mobileNo > 9999_9999 || mobileNo < 1000_0000){
		message += "Phone number needs to be 8 digits.\n"
		}

		if(message){
		this.errorMessage.set(message);
		return;
		}

		this.errorMessage.set("");

		this.contact.name = name;
		this.contact.mobile = mobileNo;
		this.contact.email = this.editForm.value.email ?? "";
		this.contact.address = this.editForm.value.address ?? "";
		this.contact.notes = this.editForm.value.notes ?? "";

		this.contactService.updateContact(this.contact)
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
