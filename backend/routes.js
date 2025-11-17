 export default function routes(app, db) {
  app.get("/projetos", async (req, res) => {
    const data = await db.all("SELECT * FROM projetos");
    res.json(data);
  });
  app.post("/projetos", async (req, res) => {
    const { nome, responsavel, situacao, dataEntrega } = req.body;
    await db.run(
      "INSERT INTO projetos (nome, responsavel, situacao, dataEntrega) VALUES (?,?,?,?)",
      [nome, responsavel, situacao, dataEntrega]
    );
    res.json({ message: "Projeto cadastrado com sucesso!" });
  });
 }