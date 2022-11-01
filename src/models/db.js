import pg from "pg";
const {Pool}  = pg;

const poolconfig = process.env.DATABASE_URL ? {
    connectionString :process.env.DATABASE_URL,
    ssl:{
        rejectUnAuthorized:false
    }
}
: 
{
    user:'joy-12738',
    password:"password",
    host:"localhost",
    port:"5432",
    database:"emailserver"
}

const databasePool = new Pool(poolconfig);
export default databasePool;