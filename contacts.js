import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';

const contactsPath = path.resolve('db', 'contacts.json');

export const listContacts = async () => { 
  try {
    const users = JSON.parse(await fs.readFile(contactsPath, 'utf8'));
    console.log(users);
    return users
  } catch (error) {
    console.log(error.stack)
    return error.stack
  }
}

export const getContactById = async (contactId) => { 
  try {
    const users = JSON.parse(await fs.readFile(contactsPath, 'utf8'));
    const userById = users.filter(item => item.id === contactId);
    if (!userById.length) {
      console.log(null);
      return null
    }
    console.log(userById[0]);
    return userById[0]
  } catch (error) {
    console.log(error.stack);
    return error.stack
  }
}

export const removeContact = async (contactId) => { 
  try {
    const users = JSON.parse(await fs.readFile(contactsPath, 'utf8'));
    const userById = users.filter(item => item.id === contactId);
    if (!userById.length) {
      console.log(null);
      return null
    }
    const usersUpdate = users.filter(item => item.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(usersUpdate));
    console.log(userById[0]);
    return userById[0]
  } catch (error) {
    console.log(error.stack);
    return error.stack
  }
}

export const addContact = async (name, email, phone) => { 
  try {
    const item = {
      id: nanoid(),
      name: name,
      email: email,
      phone: phone
    };
    const users = JSON.parse(await fs.readFile(contactsPath, 'utf8'));
    users.push(item);
    await fs.writeFile(contactsPath, JSON.stringify(users));
    console.log(item);
    return item
  } catch (error) {
    console.log(error.stack);
    return error.stack
  }
}

