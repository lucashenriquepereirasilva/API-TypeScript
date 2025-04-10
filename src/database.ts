// importar a biblioteca do mysql/promise para estabelecer 
// a conexão com o banco de dados
import mysql from "mysql2/promise"
// A constante pool é uma conexão com o banco de dados.
// com ela iremos criar uma conexão com  o mysql  passando alguns 
//parâmetros, tais como :
// - host(local onde está no banco de dados)
// - User (usúario do banco de dados)
// - Password ( senha para acesso ao banco de dados)
// - Database ( nome do banco de dados)
// -  Port ( porta de comunicação do banco de dados)







const pool = mysql.createPool({
    host:"127.0.0.1",
    user:"root",
    password:"",
    database:"dbts",
    port:3306

});
export default pool