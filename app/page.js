"use client";

import { useEffect, useState } from "react";
import { useMemo } from 'react';

export default function App() {
    //Variáveis de estado
    const [input, setInput] = useState("");
    const [tarefas, setTarefas] = useState([])
    const [error, setError] = useState("");

    //Carrega as tarefas do localStorage
    useEffect(() => {
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
    }, [tarefas]);

    //Adiciona uma tarefa
    function handleAddTarefa() {

        //Erro caso a tarefa seja vazia
        if (input.trim() === "") {
           setError("Por favor, digite uma tarefa valida");

        } else {
            setError("");
        }

        setTarefas([...tarefas, input]);
        setInput("");

    }
    
    //Remove uma tarefa
    function handleRemoveTarefa(index) {

        const updatedTarefas = [...tarefas];
        updatedTarefas.splice(index, 1);
        setTarefas(updatedTarefas);

    }

    //Remove todas as tarefas de uma vez
    function handleRemoveAllTarefas() {

        setTarefas([]);  

    }

    const totalTarefas = useMemo(() => tarefas.length, [tarefas]);
    
    //Conteúdo da pagina
    return (
        <div className="App">
            <h1>Lista de Tarefas</h1>
            <h1 className="ErrorMsg">{error}</h1>
            <ul>

                {tarefas.map((tarefa, index) => (
                    <li
                       key={index}>{tarefa}
                       <button onClick={handleRemoveTarefa} className="RemoveButton"></button>
                    </li>
                ))}

            </ul>

            <strong>{totalTarefas} Tarefas </strong>
                
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="nova tarefa"
            />

               <button onClick={handleAddTarefa} className="Button1">
                  Adicionar Tarefa
               </button>

               <button onClick={handleRemoveAllTarefas} className="Button2">
                  Remover tudo
               </button>
               
        </div>
    );
}
