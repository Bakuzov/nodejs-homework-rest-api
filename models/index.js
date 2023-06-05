const fs = require("fs/promises");
const path = require("path");

const { v4: uuidv4 } = require("uuid");

const contactspath = path.join(__dirname, "contacts.json");

const updateBooks = async (books) =>
  await fs.writeFile(contactspath, JSON.stringify(books, null, 2));

const getAll = async () => {
  const data = await fs.readFile(contactspath);
  return JSON.parse(data);
};

const getById = async (id) => {
  const books = await getAll();
  const result = books.find((item) => item.id === id);
  return result || null;
};

const add = async (data) => {
  const books = await getAll();
  const newBook = {
    id: uuidv4(),
    ...data,
  };
  books.push(newBook);
  // await fs.writeFile(contactspath, JSON.stringify(books, null, 2), "utf8");
  await updateBooks(books);
  return newBook;
};

const updateById = async (id, body) => {
  const books = await getAll();
  const index = books.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  books[index] = { id, ...body };
  await updateBooks(books);
  return books[index];
};

const removeById = async (id) => {
  const books = await getAll();
  const index = books.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = books.splice(index, 1);
  await updateBooks(books);
  return result;
};

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  removeById,
};

// const fs = require("fs").promises;
// const { log } = require("console");
// const path = require("path");
// const { v4: uuidv4 } = require("uuid");

// const contactsPath = path.join(__dirname, "./contacts.json");

// async function listContacts() {
//   const data = await fs.readFile(contactsPath, "utf-8");
//   return JSON.parse(data);
// }

// const getAll = async () => {
//   const data = await fs.readFile(contactsPath);
//   return JSON.parse(data);
// };

// async function getContactById(contactId) {
//   try {
//     const data = await fs.readFile(contactsPath, "utf8");
//     let list = JSON.parse(data);

//     const getContact = list.find(
//       (contact) => contact.id.toString() === contactId
//     );
//     // if (!getContact) {
//     //   return { message: "Not found" };
//     // }
//     return getContact;
//   } catch (error) {
//     console.error(`Got an error trying to get the file: ${error}`);
//   }
// }

// async function removeContact(contactId) {
//   try {
//     const data = await fs.readFile(contactsPath, "utf8");
//     const prevList = JSON.parse(data);
//     const newList = prevList.filter(
//       (contact) => contact.id.toString() !== contactId
//     );
//     if (prevList.length !== newList.length) {
//       await fs.writeFile(contactsPath, JSON.stringify(newList), "utf8");
//       return newList;
//     }
//   } catch (error) {
//     console.error(`Got an error trying to remove the file: ${error}`);
//   }
// }

// async function addContact(name, email, phone) {
//   try {
//     const data = await fs.readFile(contactsPath, "utf8");

//     let list = JSON.parse(data);
//     const newContact = {
//       id: uuidv4(),
//       name,
//       email,
//       phone,
//     };
//     list.push(newContact);
//     await fs.writeFile(contactsPath, JSON.stringify(list, null, 2), "utf8");
//     return lists;
//   } catch (error) {
//     console.error(`Got an error trying to add the file: ${error}`);
//   }
// }

// const updateContact = async (contactId, body) => {
//   const data = await fs.readFile(contactsPath, "utf8");
//   let list = JSON.parse(data);
//   const index = list.findIndex((el) => el.id.toString() === contactId);
//   if (index === -1) {
//     return null;
//   }
//   list[index] = { ...list[index], ...body };
//   await fs.writeFile(contactsPath, JSON.stringify(list));
//   return list;
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };

// module.exports = {
//   getAll,
//   getById,
//   add,
//   updateById,
//   removeById,
// };
