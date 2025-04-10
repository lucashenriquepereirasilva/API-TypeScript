/*
O controlador  de dados lida com as requisições do ususario e, Também faz as respostas ao usuário
Portanto , iremos importar as bibliotecas: 
request e Response do framework Express
*/




import { Request, Response } from "express";


import { getAllUsers } from "../models/userModels";
import { json } from "stream/consumers";

export async function getUsers(req:Request, res:Response): Promise<void> {
    try{
        const users = await getAllUsers();
        res.status(200).json(users);
    }
    catch(error){
        res.status(500).json(`Erro ao listar os usuarios -> ${error}`)
    }

}