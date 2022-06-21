function* generateIdFunction() {
  let id = 1;
  while (true) {
    yield id;
    id++;
  }
}

let prevId = generateIdFunction();
let contacts = [];

const findAll = (name) => {
  if (name)
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(name.toLowerCase())
    );
  return contacts;
};

const findById = (id) => {
  return contacts.find((contact) => contact.id === id);
};

const create = (name, phone, email) => {
  let contact = contacts.find((contact) => contact.email === email);
  if (contact) throw new Error("Ya existe un contacto con ese Email!.");
  contact = {
    name,
    phone,
    email,
    id: prevId.next().value,
  };
  contacts.push(contact);
  return contact;
};

const update = (id, name, phone) => {
  const contact = findById(id);
  if (!contact)
    throw new Error(
      `No existe un contacto con el id ${id}, en nuestros registros.`
    );
  contact.name = name;
  contact.phone = phone;
  return contact;
};

const remove = (id) => {
  const contact = findById(id);
  if (!contact)
    throw new Error(
      `No existe un contacto con el id ${id}, en nuestros registros.`
    );
  contacts = contacts.filter((contact) => contact.id !== id);

  return contact;
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
