import { Routes } from '@angular/router';
import { PhonebookComponent } from './components/phonebook/phonebook.component';
import { ContactItemComponent } from './components/contact-item/contact-item.component';
import { AddContactComponent } from './components/add-contact/add-contact.component';
import { EditContactComponent } from './components/edit-contact/edit-contact.component';

export const routes: Routes = [
    {
        path: '',
        component: PhonebookComponent,
        title: 'Phonebook'
    },
    {
        path: 'details/:id',
        component: ContactItemComponent,
        title: 'Details - Phonebook'
    },
    {
        path: 'add',
        component: AddContactComponent,
        title: 'Add - Phonebook'
    },
    {
        path: 'edit/:id',
        component: EditContactComponent,
        title: 'Edit - Phonebook'
    }
];
