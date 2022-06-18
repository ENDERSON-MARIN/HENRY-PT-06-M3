let users = [
    {
      id: 1,
      name: "Enderson",
    },
    {
      id: 2,
      name: "Mati",
    },
    {
      id: 3,
      name: "Diego",
    },
  ];
  
  let prevId = 3;
  
  const getAllUsers = (req, res, next) => {
    try{
      //throw new Error("Lo rompí a propósito para ensayar")
      res.json(users);
    }catch(error){
      next(error)
    }


  };
  
  const getUserById = (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
  
    if (!user) return res.status(404).send(`User with id ${id} not found`);
    res.json(user);
  };
  
  const createUser = (req, res) => {
    const { name } = req.body; //buscamos el nombre en el body
  
    //creamos un objeto con el nombre y el id
    const user = {
      id: ++prevId,
      name,
    };
  
    users.push(user); //agragamo el objeto al array
    res.json(user);
  };
  
  const updateUser = (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
  
    if (!user) return res.status(404).send(`User with id ${id} not found`);
  
    const { lastName } = req.body;
  
    user.lastName = lastName;
  
    res.json(user);
  };
  
  const deleteUser = (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
  
    if (!user) return res.status(404).send(`User with id ${id} not found`);
  
    users = users.filter((user) => user.id !== id);
  
    res.json(user);
  };
  
  module.exports = {
      getAllUsers,
      getUserById,
      createUser,
      updateUser,
      deleteUser
  }
  
  