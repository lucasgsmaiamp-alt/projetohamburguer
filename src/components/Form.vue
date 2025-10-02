<template>
    <div>
        <div>
            <form id="burger-form" @submit="createBurger">
                <div class="input-container">
                    <label for="nome">Nome do cliente:</label>
                    <input type="text" id="nome" name="nome" v-model="nome" placeholder="Digite seu nome">
                </div>
                 <div class="input-container">
                    <label for="pao">Escolha o pão:</label>
                    <select name="pao" id="pao" v-model="pao">
                        <option value="">Selecione o seu pão</option>
                        <option v-for="pao in paes" :key="pao.id" :value="pao.tipo">
                            {{ pao.tipo }}
                        </option>
                    </select>
                </div>
                <div class="input-container">
                    <label for="carne">Escolha a carne:</label>
                    <select name="carne" id="carne" v-model="carne">
                        <option value="">Escolha a carne do seu hambúrguer</option>
                        <option v-for="carne in carnes" :key="carne.id" :value="carne.tipo">
                            {{ carne.tipo }}
                        </option>
                    </select>
                </div>
                <div class="input-container">
                    <label for="queijo">Escolha um queijo:</label>
                    <select name="queijo" id="queijo" v-model="queijo">
                        <option value="">Escolha o seu queijo</option>
                        <option v-for="queijo in queijos" :key="queijo.id" :value="queijo.tipo">
                            {{ queijo.tipo }}
                        </option>
                    </select>
                </div>
                <div id="opcionais-container" class="input-container">
                    <label id="opcionais-title" for="opcionais">Selecione seus opcionais:</label>
                    <div class="checkbox-container" v-for="opcional in opcionaisdata" :key="opcional.id">
                        <input type="checkbox" name="opcionais" v-model="opcionais" :value="opcional.tipo">
                        <span>{{ opcional.tipo }}</span>
                    </div>
                </div>
                <div class="input-container">
                    <input type="submit" class="submit-btn" value="Criar meu hambúrguer">
                </div>
            </form>
        </div>
        <Message :msg="msg" v-show="msg" />
    </div>
</template>

<script>
    import Message from './Message.vue';
    export default {
        name: 'Form',
        data() {
            return {
                nome: "",
                pao: "",
                carne: "",
                queijo: "",
                opcionais: [],
                paes: [],
                carnes: [],
                queijos: [],
                opcionaisdata: [],
                msg: ""
            }
        },
        methods: {
            async getIngredientes() {
                const req = await fetch("/api/ingredientes");
                const data = await req.json();

                this.paes = data.paes;
                this.carnes = data.carnes;
                this.queijos = data.queijos;
                this.opcionaisdata = data.opcionais;
            },
            async createBurger(e){

                e.preventDefault();

                const data = {
                    nome: this.nome,
                    pao: this.pao,
                    carne: this.carne,
                    queijo: this.queijo,
                    opcionais: Array.from(this.opcionais),
                    status: "Solicitado"
                }

                const dataJson = JSON.stringify(data)

                const req = await fetch("/api/burgers", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: dataJson
                });
                const res = await req.json();

                this.msg = `Pedido Nº${res.id} foi realizado`

                setTimeout(()=> this.msg= "", 3000)

                this.nome = "";
                this.carne = "";
                this.queijo = "";
                this.pao = "";
                this.opcionais = [];
            }
        },
        mounted() {
            this.getIngredientes()
        },
        components: {
            Message
        }
    }
</script>

<style scoped>
    #burger-form{
        max-width: 400px;
        margin: 0 auto;
    }
    .input-container{
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
    }
    label{
        font-weight: bold;
        margin-bottom: 15px;
        color: #222;
        padding: 5px 10px;
        border-left: 4px solid #FBAC03;
    }
    input, select{
        padding: 5px 10px;
        width: 300px;
    }
    #opcionais-container{
        flex-direction: row;
        flex-wrap: wrap;
    }
    #opcionais-title{
        width: 100%;
    }
    .checkbox-container{
        display: flex;
        align-items: flex-start;
        width: 50%;
        margin-bottom: 20px;
    }
    .checkbox-container span,
    .checkbox-container input{
        width: auto;
    }
    .checkbox-container span{
        font-weight: bold;
        margin-left: 6px;
    }
    .submit-btn{
        background-color: #222;
        color: #FBAC03;
        font-weight: bold;
        border: 2px solid #222;
        padding: 10px;
        font-size: 16px;
        margin: 0 auto;
        cursor: pointer;
        transition: 0.5s;
    }
    .submit-btn:hover{
        background-color: transparent;
        color: #222;
    }
</style>