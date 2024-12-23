import { Component, inject} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Contact } from '../../model/contact';
import { ContactService } from '../../services/contact.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-contact-item',
  imports: [RouterModule],
  templateUrl: './contact-item.component.html',
  styleUrl: './contact-item.component.scss'
})

export class ContactItemComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  contactService:ContactService = inject(ContactService);
  router: Router = inject(Router);

  contact: Contact | undefined;

  constructor(){
    const contactId: string = this.route.snapshot.params["id"]
    this.contactService.getContactById(contactId).pipe(
          catchError(err => {
            console.error(err);
            throw err;
          })
        ).subscribe(contact => {
          this.contact = contact;
        });
  }

  deleteContact(id: string | undefined){
    if(!id){
      console.error("Id is not valid", id)
      return;
    }
    this.contactService.deleteContact(id).pipe(
      catchError(err => {
        console.error(err);
        throw err;
      })
    ).subscribe(response => {
      console.log("delete response: ",response);
      this.router.navigate([""]);
    });
  }

  editContact(id: string | undefined){
    if(!id){
      console.error("Id is not valid", id)
      return;
    }

    this.router.navigate(["/edit", id])
    
  }
}
