import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';

const contactsPath = path.resolve('db', 'contacts.json');

export const listContacts = async () => {         // Возвращает массив контактов.
  try {
    const users = JSON.parse(await fs.readFile(contactsPath, 'utf8'));
                                //const result = await fs.readFile(filePath);
                                //const users = result.toString()
    console.log(users);
    return users
  } catch (error) {
    console.log(error.stack)
    return error.stack
  }
}

export const getContactById = async (contactId) => {      //Возвращает объект контакта с таким id. Возвращает null, если объект с таким id не найден.
  try {
    const users = JSON.parse(await fs.readFile(contactsPath, 'utf8'));
    const userId = users.filter(item => item.id === contactId);
    if (userId.length) {
      console.log(userId[0]);
      return userId[0]
    } else {
      console.log(null);
      return null
    }
  } catch (error) {
    console.log(error.stack);
    return error.stack
  }
}

export const removeContact = async (contactId) => {       //Возвращает объект удаленного контакта. Возвращает null, если объект с таким id не найден.
  try {
    const users = JSON.parse(await fs.readFile(contactsPath, 'utf8'));
    const userId = users.filter(item => item.id === contactId);
    if (userId.length) {
      const usersUpdate = users.filter(item => item.id !== contactId);
      await fs.writeFile(contactsPath, JSON.stringify(usersUpdate));
      console.log(userId[0]);
      return userId[0]
    } else {
      console.log(null);
      return null
    }
  } catch (error) {
    console.log(error.stack);
    return error.stack
  }
}

export const addContact = async (name, email, phone) => {         //Возвращает объект добавленного контакта.
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

