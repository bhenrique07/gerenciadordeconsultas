export default function routes (app, db) {
    // Rota GET: Listar todos os projetos
    app.get("/projetos", async (req, res) => {
        const data = await db.all("SELECT * FROM projetos");
        res.json(data);
    });

    // Rota POST: Cadastrar um novo projeto
    app.post("/projetos", async (req, res) => {
        const { nome, responsavel, situacao, dataEntrega } = req.body;
        await db.run(
            "INSERT INTO projetos (nome, responsavel, situacao, dataEntrega) VALUES (?,?,?,?)",
            [nome, responsavel, situacao, dataEntrega]
        );
        res.json({ message: "Projeto cadastrado com sucesso!" });
    });

    // Rota DELETE: Excluir um projeto pelo ID
    app.delete("/projetos/:id", async (req, res) => {
        const { id } = req.params;
        await db.run("DELETE FROM projetos WHERE id = ?", [id]);
        res.json({ message: `Projeto com ID ${id} excluído com sucesso!` });
    });

    app.patch("/projetos/:id/situacao", async (req, res) => {
        const { id } = req.params;
        const { situacao } = req.body;
        
        await db.run("UPDATE projetos SET situacao = ? WHERE id = ?", [situacao, id]);
        res.json({ message: `Situação do projeto ${id} atualizada para ${situacao}!` });
    });
}