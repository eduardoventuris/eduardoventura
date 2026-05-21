"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FiBriefcase, FiMail, FiPhone, FiTrash2 } from "react-icons/fi";
import { toast } from "sonner";
import Header from "../../../../componentes/header";
import Footer from "../../../../componentes/footer";
import { findCurriculo, loadCurriculos, saveCurriculos } from "../data";
import { Button } from "../../../../componentes/ui/button";

export default function CurriculoDetalhesPage() {
  const [selected, setSelected] = useState(() => null as null | ReturnType<typeof findCurriculo>);
  const [loading, setLoading] = useState(true);
  const routeParams = useParams();
  const router = useRouter();
  const id = Array.isArray(routeParams.id) ? routeParams.id[0] : routeParams.id;

  useEffect(() => {
    const task = setTimeout(() => {
      if (!id) {
        setSelected(null);
        setLoading(false);
        return;
      }
      setSelected(findCurriculo(id) ?? null);
      setLoading(false);
    }, 0);
    return () => clearTimeout(task);
  }, [id]);

  const handleDelete = () => {
    if (!selected) return;
    saveCurriculos(loadCurriculos().filter((item) => item.id !== selected.id));
    toast.success("Curriculo excluido com sucesso.");
    router.push("/sistema/paginas/curriculos");
  };

  return (
    <div className="site-shell"><Header /><div className="main-pane"><main className="page-wrap">
      <section className="grid gap-4">
        <div className="flex flex-wrap gap-3">
          <Link href="/sistema/paginas/curriculos" className="rounded-md border border-green-300 text-green-800 px-4 py-3 text-sm font-semibold">Voltar para a lista</Link>
          <Button type="button" variant="danger" onClick={handleDelete}><FiTrash2 /> Excluir curriculo</Button>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-green-200 bg-white p-8 text-center text-sm text-slate-600">Carregando curriculo...</div>
        ) : selected ? (
          <>
            <section className="grid gap-4 lg:grid-cols-[auto_1fr] rounded-3xl border border-green-200 bg-white p-5">
              <div className="relative h-28 w-28 overflow-hidden rounded-3xl border border-green-200 bg-slate-100"><Image src={selected.avatar} alt={selected.nome} fill className="object-cover" /></div>
              <div>
                <span className="inline-flex rounded-full px-3 py-1 text-xs font-bold bg-green-100 text-green-900">{selected.cargo}</span>
                <h1 className="mt-4 text-3xl font-black text-slate-900">{selected.nome}</h1>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-green-200 px-3 py-1 text-xs font-semibold text-slate-700"><FiMail /> {selected.email}</span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-green-200 px-3 py-1 text-xs font-semibold text-slate-700"><FiBriefcase /> {selected.cargo}</span>
                </div>
              </div>
            </section>
            <div className="grid gap-4 xl:grid-cols-3"><article className="rounded-2xl border border-green-200 bg-white p-4"><h3 className="text-lg font-bold text-slate-900">Resumo profissional</h3><p className="mt-3 text-sm leading-7 text-slate-600">{selected.resumo}</p></article><article className="rounded-2xl bg-green-50 p-4"><h3 className="text-lg font-bold text-slate-900">Contato</h3><div className="mt-4 grid gap-3 text-sm text-slate-700"><p className="flex items-center gap-2"><FiMail /> {selected.email}</p><p className="flex items-center gap-2"><FiPhone /> {selected.telefone}</p><p><strong>CPF:</strong> {selected.cpf}</p></div></article><article className="rounded-2xl bg-green-50 p-4"><h3 className="text-lg font-bold text-slate-900">Habilidades</h3><div className="mt-4 flex flex-wrap gap-2">{selected.habilidades.map((skill) => (<span key={skill} className="rounded-full border border-green-200 px-3 py-1 text-xs font-semibold text-slate-700">{skill}</span>))}</div></article></div><div className="grid gap-4"><article className="rounded-2xl border border-green-200 bg-white p-4"><h3 className="text-lg font-bold text-slate-900">Experiencias</h3><div className="mt-4 grid gap-3">{selected.experiencias.map((item, index) => (<div key={index} className="rounded-xl border border-green-200 p-3"><strong>{item.empresa}</strong><p className="mt-1 text-sm text-slate-600">{item.cargo} | {item.periodo}</p><p className="mt-2 text-sm leading-6 text-slate-600">{item.descricao}</p></div>))}</div></article><article className="rounded-2xl border border-green-200 bg-white p-4"><h3 className="text-lg font-bold text-slate-900">Formacao</h3><div className="mt-4 grid gap-3">{selected.formacoes.map((item, index) => (<div key={index} className="rounded-xl border border-green-200 p-3"><strong>{item.instituicao}</strong><p className="mt-1 text-sm text-slate-600">{item.curso}</p><p className="mt-2 text-sm text-slate-600">{item.periodo}</p></div>))}</div></article></div>
          </>
        ) : (
          <div className="rounded-2xl border border-green-200 bg-white p-8 text-center text-sm text-slate-600">Curriculo nao encontrado. Verifique se o ID esta correto.</div>
        )}
      </section>
    </main><Footer /></div></div>
  );
}
