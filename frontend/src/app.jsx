import { useState } from "react";
import axios from "axios";
export default function App() {
const [projetos, setProjetos] = useState([]);
const [form, setForm] = useState({
    nome: "",
    responsavel: "",
    situacao: "",
    dataEntrega: ""
});
  async function carregar() {
    const res = await axios.get("http://localhost:3001/projetos");
    setProjetos(res.data);
}
async function salvar() {
    await axios.post("http://localhost:3001/projetos", form);
    carregar();
}
return (
    <div style={{ padding: 20 }}>
      <h1>Sistema de Projetos – PIT / Extensão</h1>
      <h2>Cadastrar Projeto</h2>
      <input placeholder="Nome" onChange={e => setForm({ ...form, nome: e.target.value })} /><br/>
      <input placeholder="Responsável" onChange={e => setForm({ ...form, responsavel: e.target.value })} /><br/>
      <input placeholder="Situação" onChange={e => setForm({ ...form, situacao: e.target.value })} /><br/>
      <input placeholder="Data de Entrega" onChange={e => setForm({ ...form, dataEntrega: e.target.value })} /><br/>
      <button onClick={salvar}>Salvar</button>
      <h2>Projetos cadastrados</h2>
      <button onClick={carregar}>Carregar lista</button>
      <ul>
        {projetos.map(p => (
          <li key={p.id}>{p.nome} – {p.situacao}</li>
        ))}
      </ul>
    </div>
);
}