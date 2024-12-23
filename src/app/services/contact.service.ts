import { inject, Injectable } from '@angular/core';
import { Contact } from '../model/contact';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ContactService {
	http = inject(HttpClient);

	url = "http://localhost:3000/contacts";


	constructor() { }

	getAllContacts() : Observable<Contact[]> {

		return this.http.get<Contact[]>(this.url);
	}

	getContactById(id: string): Observable<Contact | undefined> {

		return this.http.get<Contact>(`${this.url}/${id}`);
	}

	saveContact(name: string, mobile: number, email: string, address: string, notes: string) : Observable<Contact>{

		let newContact: Contact = {
			name: name,
			mobile: mobile,
			email: email,
			address: address,
			notes: notes,
		}

		const headers = new HttpHeaders({"Content-Type": "application/json"})
		return this.http.post<Contact>(this.url, newContact, {headers});
	}

	deleteContact(id: string): Observable<Contact | undefined> {

		return this.http.delete<Contact>(`${this.url}/${id}`);
	}

	updateContact(contact: Contact) : Observable<Contact | undefined>{
		const headers = new HttpHeaders({"Content-Type": "application/json"})
		return this.http.put<Contact>(`${this.url}/${contact.id}`, contact, {headers});
	}
}
