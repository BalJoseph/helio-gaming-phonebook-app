import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Contact } from '../../model/contact';
import { ContactService } from '../../services/contact.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-phonebook',
  imports: [RouterModule],
  templateUrl: './phonebook.component.html',
  styleUrl: './phonebook.component.scss'
})
export class PhonebookComponent implements OnInit {
	contactList: Contact[] = [];
	contactService: ContactService = inject(ContactService);

	filteredContactList: Contact[] = []

	constructor(){}
	
	ngOnInit(): void {
		this.contactService.getAllContacts().pipe(
			catchError(err => {
				console.error(err);
				throw err;
			})
		).subscribe((contactList: Contact[]) => {

			contactList = contactList.sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase())? -1 : 1)

			this.contactList = contactList;
			this.filteredContactList = contactList;
		});
	}

	filterContacts(filter: string){
		filter = filter.trim();

		if(!filter){
			this.filteredContactList = this.contactList;
			return;
		}

		this.filteredContactList = this.contactList.filter(
			contact => contact?.name.toLowerCase().includes(filter.toLowerCase())
		)
	}
}
