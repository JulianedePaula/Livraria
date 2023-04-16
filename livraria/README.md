<h1 align="center"> Biblioteca da Maria </h1>
<p>Um projeto de cadastro de livros utilizando os verbos HTML para cadastro, listagem, atualização e exclusão.</p>

<h2 align="center"> Dependências </h2>
<h4 align="center"> 
    ## Instalar
    npm install
    npm run dev

<h2 align="center"> Rotas API </h2>
<h4 align="center"> 
    
    ## POST / api / catalogo
    Cadastrar um livro.

```json
{
    "titulo":"",
    "autor":"",
    "capa":"file"
}
```

    ## GET / api / catalogo
    Listar todos os livros cadastrados.
```json
{
    [
    {
        "_id": "6421d0b6aec5e239f401421b",
        "titulo": "A parte que falta",
        "autor": "Shel Silverstein",
        "capa": "https://cdn.cosmicjs.com/e2f92060-ccc3-11ed-a5c3-fb6dd2500767-a-parte-que-falta.png",
        "__v": 0
    }
]
}
``

    ## PUT / api / catalogo
    Atualizar os dados de um livro.

```json
{
    "titulo":"Ai meu Deus, ai Jesus.",
    "autor":"Fabricio Carpinejar"
}
``` 
    ## DELETE / api / catalogo?idLivro=id
    Deletar um livro.


<h2 align="center"> Status do projeto </h2>
<h4 align="center"> 
    :construction:  Projeto em construção  :construction:
</h4>

<h2 align="center"> Tecnologia utilizada </h2>
<li>Nodejs</li>
<li>Mongoose</li>
<li>Multer</li>

# Autores

(https://github.com/JulianedePaula)

