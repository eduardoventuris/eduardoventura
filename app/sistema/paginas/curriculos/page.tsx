"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import Header from "../../../componentes/header";
import Footer from "../../../componentes/footer";
import { Curriculo, loadCurriculos } from "./data";

export default function CurriculosPage() {
  const [storedRecords] = useState<Curriculo[]>(() => loadCurriculos());
  const [typedSearch, setTypedSearch] = useState("");
  const [committedSearch, setCommittedSearch] = useState("");

  useEffect(() => {
    const waitSearch = setTimeout(() => {
      setCommittedSearch(typedSearch.trim().toLowerCase());
    }, 200);

    return () => clearTimeout(waitSearch);
  }, [typedSearch]);

  const matchingItems = useMemo(() => {
    if (!committedSearch) return storedRecords;
    return storedRecords.filter((profile) => profile.nome.toLowerCase().includes(committedSearch) || profile.cargo.toLowerCase().includes(committedSearch));
  }, [storedRecords, committedSearch]);

  return (
    <div className="site-shell"><Header /><div className="main-pane"><main className="page-wrap">
      <section className="grid gap-4">
        <div className="grid gap-4 xl:grid-cols-[0.8fr_1.2fr]"><aside className="rounded-2xl bg-green-50 p-4"><p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Acesso</p><Link href="/sistema/paginas/curriculos/novo" className="mt-4 block rounded-md px-4 py-3 text-center text-sm font-semibold bg-green-700 hover:bg-green-800 text-white">Cadastrar perfil</Link></aside><div className="rounded-2xl border border-green-200 bg-white p-4"><h1 className="text-3xl font-black text-slate-900">Busca de registros</h1><p className="mt-3 text-sm text-slate-600">Localize rapidamente os candidatos cadastrados.</p></div></div>
        <div className="rounded-2xl border border-green-200 bg-white p-4">
          <label className="relative block">
            <FiSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input value={typedSearch} onChange={(event) => setTypedSearch(event.target.value)} placeholder="Buscar por nome ou cargo" className="input-shell pl-11" />
          </label>
        </div>
        {matchingItems.length === 0 ? (
          <div className="rounded-2xl border border-green-200 bg-white p-8 text-center text-sm text-slate-600">Nenhum curriculo encontrado. Tente outro termo de pesquisa.</div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {matchingItems.map((profile, index) => (
      <article key={profile.id} className={index % 2 === 0 ? "rounded-2xl border border-green-200 bg-white p-4" : "rounded-2xl bg-green-50 p-4"}>
        <span className="inline-flex rounded-full px-3 py-1 text-xs font-bold bg-green-100 text-green-900">{profile.cargo}</span>
        <h2 className="mt-4 text-xl font-bold text-slate-900">{profile.nome}</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">{profile.resumo}</p>
        <Link href={`/sistema/paginas/curriculos/${profile.id}`} className="mt-4 inline-block text-sm font-semibold text-slate-900">Abrir ficha</Link>
      </article>
    ))}
          </div>
        )}
      </section>
    </main><Footer /></div></div>
  );
}
