//importar a biblioteca do Row(Linha)Data(Dados)(Pacote)
//Guardar todos os dados que retorna da consulta Select
//O comando ResultSetHeader é utilizado para executar as consultas de modificação das tabelas.(INSERT, UPDATE, DELETE)
import { RowDataPacket, ResultSetHeader } from "mysql2";
//importando a conexao(pool) com o banco de dados para 
//fazer uma consulta nas tabelas do banco
import pool from "../database";

//A interface User faz uma descricao da estrutura
//de dados da tabela Usuario.
export interface User extends RowDataPacket {
    id: number;
    name: string;
    email: string;
}
/*
Exportar a função getAllUsers(pegarTodosOsUsuarios)
do banco de dados.
Esta função é do tipo ascíncrona e, portanto, aguarda
um processamento interno para realizar a exportação. 
o processamento será feito pela linha do await(aguardar)
*/
export async function getAllUsers(): Promise<User[]> {
    const [rows] = await pool.query<User[]>("Select * from users", []);
    return rows;

}

// Função para criar um novo usuário
// Aguarda o usuário ser cadastrado. Portanto, estamos usando a função  como async... await
/*
Para cadastrar um usuário será necessário passar o usuário por parâmetro e ele será gerenciado pelo id
*/
export async function createUser(user: Omit<User, 'id'>): Promise<ResultSetHeader> {
    try {
        /*
        Vamos usar o comando insert para cadastrar o usuário no banco de dados. Estamos usando também o comando await que irá esperar pelo cadastro completo do usuário. Na consulta do insert está sendo passada 2 parametros com o simbolo de ?. Consultas parametrizadas evitam a injeção de sql */
        const [result] = await pool.execute<ResultSetHeader>(
            'INSERT INTO users (nomealuno, cpf, idade, telefone) VALUES (?, ?, ?, ?)',
            [user.name, user.email]
        );
        return result;
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        throw error;
    }
}

// Função para atualizar um usuário existente
export async function updateUser(id: number, user: Omit<User, 'id'>): Promise<ResultSetHeader> {
    try {
        const [result] = await pool.execute<ResultSetHeader>(
            'UPDATE users SET name = ?, email = ? WHERE id = ?',
            [user.name, user.email, id]
        );
        return result;
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        throw error;
    }
}

// Função para deletar um usuário
export async function deleteUser(id: number): Promise<ResultSetHeader> {
    try {
        const [result] = await pool.execute<ResultSetHeader>('DELETE FROM users WHERE id = ?', [id]);
        return result;
    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        throw error;
    }
}