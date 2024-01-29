// import { loginTable } from './loginTable.js'
import { loginTablePostgre } from '../database/loginTablePostgre.js'

// const login = new loginTable()
const login = new loginTablePostgre()

export const loginRoute = async (server)=>{
    server.post('/login',async (req, rep)=>{

        const {nm_login, cd_senha} = req.body
    
        await login.create({
            nm_login,
            cd_senha
        })
    
        return rep.status(201).send()
    })
    
    server.get('/login',async (req, rep)=>{
    
        const search = req.query.search
    
        const logins = await login.list(search)
    
        return logins
    })
    
    server.put('/login/:id', async (req, rep)=>{
        const id = req.params.id
    
        const {nm_login} = req.body
    
        await login.update(id, {
            nm_login,
        })
    
        return rep.status(204).send()
    })
    
    server.delete('/login/:id', async (req,rep)=>{
        const id = req.params.id
    
        await login.delete(id)
    
        return rep.status(204).send()
    })
}