"use client";
import { useState } from "react";

export default function SeletorDeCidade() {
  const [cidadeSelecionada, setCidadeSelecionada] = useState("");
  const [search, setSearch] = useState("");
  const [dropdownAberto, setDropdownAberto] = useState(false);

  const cidades = ["Piracaia - SP"];

  const cidadesFiltradas = cidades.filter((cidade) =>
    cidade.toLowerCase().includes(search.toLowerCase())
  );

  function selecionarCidade(cidade) {
    setCidadeSelecionada(cidade);
    setDropdownAberto(false);
    setSearch("");
  }

  return (
    <div className="relative w-full max-w-[700px] mx-auto">
      <button
        onClick={() => setDropdownAberto(!dropdownAberto)}
        className="w-full border px-4 py-4 rounded-lg text-left bg-white shadow focus:outline-none flex justify-between items-center"
      >
        <span>{cidadeSelecionada || "Selecione sua cidade"}</span>
        <span className="ml-2">&#x25BC;</span>
      </button>

      {dropdownAberto && (
        <div className="absolute z-10 w-full bg-white border mt-2 rounded-md shadow-md max-h-64 overflow-y-auto">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar cidade..."
            className="w-full px-4 py-3 border-b outline-none"
          />
          <ul>
            {cidadesFiltradas.length > 0 ? (
              cidadesFiltradas.map((cidade) => (
                <li
                  key={cidade}
                  onClick={() => selecionarCidade(cidade)}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                >
                  {cidade}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500">Nenhuma cidade encontrada</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
