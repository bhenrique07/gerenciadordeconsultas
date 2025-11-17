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
const [projetoEmEdicao, setProjetoEmEdicao] = useState(null);
const [novaSituacaoSelecionada, setNovaSituacaoSelecionada] = useState("");
async function carregar() {
    const res = await axios.get("http://localhost:3001/projetos");
    setProjetos(res.data);
}
async function salvar() {

    if (!form.nome || !form.responsavel || !form.situacao || !form.dataEntrega) {
        alert("Por favor, preencha todos os campos obrigatórios: Nome do projeto, Responsável, Situação e Data de Entrega.");
        return;
    }
    
    await axios.post("http://localhost:3001/projetos", form);
    
    // Limpar o formulário após salvar com sucesso
    setForm({
        nome: "",
        responsavel: "",
        situacao: "",
        dataEntrega: ""
    });   
    carregar();
}
async function excluir(id) {
    // Confirmação para evitar exclusões acidentais
    if (window.confirm(`Tem certeza que deseja excluir o projeto ID ${id}?`)) {
        await axios.delete(`http://localhost:3001/projetos/${id}`);
        // Após excluir, recarrega a lista para atualizar a interface
        carregar();
    }
}
function abrirAtualizacaoSituacao(projetoId) {
    setProjetoEmEdicao(projetoId); // Define qual projeto será editado
    setNovaSituacaoSelecionada(""); // Limpa qualquer seleção anterior
}

// NOVA FUNÇÃO: Confirmar a Atualização (Substitui a lógica do prompt)
async function confirmarAtualizacao() {
    if (!novaSituacaoSelecionada) {
        alert("Por favor, selecione uma nova situação.");
        return;
    }

    // Faz a requisição PATCH para o backend
    await axios.patch(`http://localhost:3001/projetos/${projetoEmEdicao}/situacao`, {
        situacao: novaSituacaoSelecionada
    });
    
    // Fecha a interface de edição
    setProjetoEmEdicao(null);
    setNovaSituacaoSelecionada("");
    
    // Recarrega a lista para mostrar a alteração
    carregar();
}

return (
    <div>
        {/* Cabeçalho Azul */}
        <div className="header">
            <h1>Sistemas de Consultas e Envios de Projetos Acadêmicos</h1>
            <p>Cadastro • Controle • Visualização</p>
        </div>


        <div className="content-box">
            <h2>Cadastrar Novo Projeto</h2>
            <p>Preencha os dados do projeto para cadastrá-lo na base de dados.</p>

            <div style={{ margin: '20px 0' }}>
                <input style={{ padding: 8, margin: 5, width: '90%' }} 
                    placeholder="Nome do Projeto" 
                    onChange={e => setForm({ ...form, nome: e.target.value })} 
                /><br/>
                <input style={{ padding: 8, margin: 5, width: '90%' }} 
                    placeholder="Responsável" 
                    onChange={e => setForm({ ...form, responsavel: e.target.value })} 
                /><br/>
                <select style={{ padding: 8, margin: 5, width: '45%', height: 38 }}
                    value={form.situacao}
                    onChange={e => setForm({ ...form, situacao: e.target.value })} 
                >
                    <option value="">Selecione a Situação</option>
                    <option value="Aprovado">Aprovado</option>
                    <option value="Reprovado">Reprovado</option>
                    <option value="Com Pendências">Com Pendências</option>
                </select>

                <input style={{ padding: 8, margin: 5, width: '45%' }}
                    type="date"
                    placeholder="Data de Entrega" 
                    value={form.dataEntrega} 
                    onChange={e => setForm({ ...form, dataEntrega: e.target.value })} 
                />
                <button onClick={salvar}>Salvar Projeto</button>
            </div>
        </div>

        <div className="content-box">
        {projetoEmEdicao !== null && (
            <div style={{ border: '1px solid #ccc', padding: 15, margin: '20px auto', maxWidth: 400, borderRadius: 8, backgroundColor: '#f9f9f9' }}>
                <h3>Atualizar Situação do Projeto ID {projetoEmEdicao}</h3>
                
                <select 
                    style={{ padding: 8, margin: 5, width: '90%', height: 38 }}
                    value={novaSituacaoSelecionada}
                    onChange={e => setNovaSituacaoSelecionada(e.target.value)} 
                >
                    <option value="">-- Selecione a Situação --</option>
                    <option value="Aprovado">Aprovado</option>
                    <option value="Reprovado">Reprovado</option>
                    <option value="Com Pendências">Com Pendências</option>
                </select>

                <div style={{ marginTop: 10 }}>
                    <button 
                        onClick={confirmarAtualizacao} 
                        style={{ backgroundColor: '#28a745', marginRight: 10 }}
                    >
                        Confirmar
                    </button>
                    <button 
                        onClick={() => setProjetoEmEdicao(null)} // Cancela a edição
                        style={{ backgroundColor: '#6c757d' }}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        )}

        <h2>Projetos Cadastrados</h2>
            <h2>Projetos Enviados</h2>
            <button onClick={carregar}>Carregar Lista de Projetos</button>
            
            <ul style={{ listStyleType: 'none', padding: 0, marginTop: 20 }}>
                {projetos.map(p => (
                    <li key={p.id} style={{ 
                        borderBottom: '1px solid #eee', 
                        padding: '10px 0', 
                        textAlign: 'left',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        {/* Informação do Projeto */}
                        <span style={{flexGrow: 1}}>
                            <strong>{p.nome}</strong> - Responsável: {p.responsavel} - Situação: {p.situacao}
                        </span>
                        <button 
                            onClick={() => abrirAtualizacaoSituacao(p.id)}
                            style={{ 
                                backgroundColor: '#007bff',
                                padding: '5px 10px', 
                                fontSize: '0.8em',
                                marginTop: 0,
                                marginRight: 10 
                            }}
                        >
                            Atualizar Situação
                        </button>
                        
                        {/* EXCLUIR */}
                        <button 
                            onClick={() => excluir(p.id)}
                            style={{ 
                                backgroundColor: '#dc3545',
                                padding: '5px 10px', 
                                fontSize: '0.8em',
                                marginTop: 0
                            }}
                        >
                            Excluir
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);
}