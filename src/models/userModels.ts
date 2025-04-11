// importar a biblioteca do Row(Linha)Data(Dados)(Pacote)
// Guardar todos os dados que retorna da consulta Select

// o comando  ResultSetHeader é ultilizado para executar
// as consultas de modificação das tabelas
// insert , Update , Delete

import { RowDataPacket, ResultSetHeader } from "mysql2";


import pool from "../database";

import { promises } from "dns";
//importando a conexão (pool) com o banco de dados para
// fazer uma consulta nas tabelas do banco


// a interface User faz uma descriçaõ da estrutura 
// de dados da tabela usuario
export interface User extends RowDataPacket {
    id: number;
    name: string;
    email: string
}
/*
Exportar a função getAllUsers(pegar todos os usuarios)
do banco de dados
Estã função é dp tipo ascíncrona e,  portanto , aguarda
um processamento será  feito pela linha do await(agurdar)
*/

export async function getAllUsers(): Promise<User[]> {
    const [rows] = await pool.query<User[]>('SELECT * FROM users', [])
    return rows
}

// Função para criar um novo usuário

// agurda   o usuário  ser cadastrado. Portanto, estamos,
// usando a função como async ...await

// Para cadastrar um usúario será necessario passar  o usúario por parametro
// e ele será gerenciado pelo seu id
export async function createUser(user: Omit<User, 'id'>): Promise<ResultSetHeader> {
    try {
        /*
        Vamos usar o comando insert para cadastrar o usuario
        no banco de dados estamos  usando tambem o comando no await 
        que irá esperar  pelo cadastro  completo do usuario
        na consulta  do insert está sendo passada 2 parametros com o simbolo de ? consultas
        paramerizadas evitam a injeção de sql
        */
        const [result] = await pool.execute<ResultSetHeader>(
            'INSERT INTO users (name, email) VALUES (?, ?)',
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
