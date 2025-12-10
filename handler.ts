import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';

const loginSchema = z.object({
  cpf: z.string().min(11).max(14), 
  password: z.string().optional() 
});

let connection: mysql.Connection | null = null;

async function getConnection() {
  if (connection) return connection;
  
  connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectTimeout: 10000
  });
  return connection;
}

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) {
      return { statusCode: 400, body: JSON.stringify({ message: 'Body is required' }) };
    }
    const body = JSON.parse(event.body);

    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return { 
        statusCode: 400, 
        body: JSON.stringify({ message: 'Validation failed', errors: parsed.error.format() }) 
      };
    }
    
    const cleanCpf = parsed.data.cpf.replace(/\D/g, ''); 

    const db = await getConnection();
    
    const [rows] = await db.execute(
      'SELECT id, cpf, password, nome FROM clientes WHERE cpf = ? LIMIT 1', 
      [cleanCpf]
    );
    
    const users = rows as any[];
    const user = users[0];

    if (!user) {
      return { statusCode: 401, body: JSON.stringify({ message: 'Cliente não encontrado' }) };
    }

    if (parsed.data.password && user.password) {
      const isValid = await bcrypt.compare(parsed.data.password, user.password);
      if (!isValid) {
        return { statusCode: 401, body: JSON.stringify({ message: 'Credenciais inválidas' }) };
      }
    }

    const secret = process.env.JWT_SECRET || 'segredo_padrao_dev';
    const token = jwt.sign(
      { sub: user.id, cpf: user.cpf, nome: user.nome },
      secret,
      { expiresIn: '1h' }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ token })
    };

  } catch (error) {
    console.error('Erro na Lambda:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' })
    };
  }
};