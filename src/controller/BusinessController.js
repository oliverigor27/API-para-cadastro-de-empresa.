const knex = require("../config/connection");
const axios = require("axios");

require("dotenv").config();

module.exports = {
    async listBusiness(req, res, next) {
        try {
            
            try {
                
                const { user_id, page = 1 } = req.query;

            const db = knex("business").limit(5).offset((page -1) * 5);
            
            const countObj = knex("business").count();

            if(user_id) {
                db.where({ user_id }).join("users", "users.id", "=", "business.user_id").select("business.*", "users.email");

                countObj.where({ user_id });
            }

            const [count] = await countObj;

            res.header("X-Total-Count", count["count"]);

            const result = await db;

            return res.json(result)

            } catch (error) {
                console.error(error)
            }

        } catch(error) {
            next(error)
        }
    },
    async registerBusiness(req, res, next) {
        try {              
                const { user_id, cnpj } = req.body;

                const result = await axios.get(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);

                if(!result.data) {
                    res.status(404);
                    res.json({
                        status: 404,
                        message: "CNPJ não cadastrado na base da dados do Brasil API"
                    })
                }
    
                await knex("business").insert({
                    user_id,
                    data: JSON.stringify(result.data)
                })


                await res.json({
                    status: 200,
                    message: "Nova empresa cadastrada",
                    nome: result.data.nome_fantasia,
                    "Situação cadastral": result.data.situacao_cadastral,
                    "Descrição da Situação cadastral": result.data.descricao_situacao_cadastral,
                    "Data da situação cadastral": result.data.data_situacao_cadastral
                })

        } catch (error) {
            next(error)
        }
    },
    async editBusiness(req, res, next) {
        try {
            
            const { user_id } = req.params;
            const { cnpj } = req.body;

            const result = await axios.get(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);


            await knex("business").insert("users").update({
                data: JSON.stringify(result.data)
            }).where({ user_id });

            res.json({
                status: 200,
                message: `Empresa cadastrada no id ${user_id} foi atualizada`
            })

        } catch (error) {
            next(error)
        }
    },
    async deleteBusiness(req, res, next) {
        try {
            const { businessId } = req.params;

            const { user_id } = await knex("business").select("user_id", "businessId").where({ businessId }).first();
        
            await knex("business").where({ businessId }).del();
    
            res.json({
                status: 200,
                message: `Empresa de id ${businessId} cadastrada no usuário com id ${user_id} foi deletada`,
            });
        } catch (error) {
            next(error)
        }
    }
}