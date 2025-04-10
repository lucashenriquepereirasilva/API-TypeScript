// importar a biblioteca do Row(Linha)Data(Dados)(Pacote)
// Guardar todos os dados que retorna da consulta Select
import { RowDataPacket } from "mysql2";

import pool from "../database";
import { promises } from "dns";
//importando a conexão (pool) com o banco de dados para
// fazer uma consulta nas tabelas do banco


// a interface User faz uma descriçaõ da estrutura 
// de dados da tabela usuario
export interface User extends RowDataPacket{
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
    const [rows] = await pool.query<User[]>('SELECT * FROM user',[])
    return rows
}