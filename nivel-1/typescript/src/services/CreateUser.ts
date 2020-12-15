// Para criar: name, email, password

//Sempre que devemos definir o formato de um objeto criamos uma interfaces
interface TechObject {
  title: string,
  experience: number,
}

// Define os tipos de um conjunto de informacoes
interface CreateUserDate {
  name?: string; //opcional
  email: string;
  password: string;
  //techs: string[]; // endetede que o tipo é um array de Strings ou seja, tipo único
  //techs: Array<string>; // ou Array somente com strings : outra forma de declarar um tipo array de strings
  techs: Array<string | TechObject>; // Strings ou TechObject
}

//export default function createUser(name = '', email: string, password: string) {
export default function createUser({ name = '', email, password }: CreateUserDate) {

  const user = {
    name,
    email,
    password
  }

  return user;
}