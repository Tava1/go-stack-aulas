import { Request, Response } from 'express'; // Podemos importar o tipos de dentro do express.
import createUser from './services/CreateUser'

export function helloWorld(request: Request, response: Response) {
  const user = createUser({
    email: 'user@example.com',
    password: '1231',
    techs: [
      'Node.js',
      'ReactJS',
      'ReactNative',
      { title: 'JavaScript', experience: 100 },
      { title: 'HTML', experience: 100 },
    ]
  });

  return response.json({ message: 'Hello World' });
}