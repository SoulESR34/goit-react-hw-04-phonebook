import React, { useEffect, useState } from 'react';
import NewContact from '../NewContact/NewContact';
import { ContactsList } from '../ContactsList/ContactsList';
import { ContactFilter } from '../ContactFilter/ContactFilter';
import { nanoid } from 'nanoid';
import { NewContactContainer, Container } from './App.style';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');

  const createNewContact = e => {
    e.preventDefault();
    const nameContact = e.target.name.value;
    const numberContact = e.target.numberPhone.value;

    const newContact = {
      id: nanoid(),
      name: nameContact,
      number: numberContact,
    };
    console.log(newContact);

    if (
      !contacts.some(
        contact => contact.name.toLowerCase() === nameContact.toLowerCase()
      )
    ) {
      setContacts([...contacts, newContact]);
    } else {
      alert(`${nameContact} is already in contacts`);
    }
  };

  const searchContact = e => {
    setFilter(e.target.value);
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  useEffect(() => {
    let saveContacts = JSON.parse(localStorage.getItem('contacts'));
    if (saveContacts) {
      setContacts(saveContacts);
    }
  }, []);

  useEffect(() => {
  const timeoutId = setTimeout(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, 1000);

  return () => clearTimeout(timeoutId);
  }, [contacts]);

  return (
    <main>
      <Container>
        <NewContactContainer>
          <h2>Phonebook</h2>
          <NewContact createContact={createNewContact}></NewContact>
        </NewContactContainer>
        <h2>Contacts</h2>
        <ContactFilter validator={searchContact}></ContactFilter>
        <ContactsList
          contacts={contacts}
          search={filter}
          delContact={deleteContact}
        ></ContactsList>
      </Container>
    </main>
  );
};
