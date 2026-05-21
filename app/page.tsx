import Link from "next/link";
import Header from "./componentes/header";
import Footer from "./componentes/footer";

export default function Home() {
  return (
    <div className="site-shell"><Header /><div className="main-pane"><main className="page-wrap">
      <section className="grid gap-4 lg:grid-cols-3"><article className="rounded-3xl border border-green-200 bg-white p-5 lg:col-span-2"><span className="inline-flex rounded-sm px-2 py-1 text-xs font-bold bg-green-100 text-green-900">PaperLane</span><h1 className="mt-4 text-3xl font-extrabold text-slate-900">Cadastro e consulta de registros.</h1><p className="mt-3 text-sm leading-7 text-slate-600">Use o sistema para registrar candidatos e acessar cada currículo com rapidez.</p></article><article className="rounded-3xl bg-green-50 p-5"><p className="text-sm font-semibold text-slate-800">Acesso rápido</p><div className="mt-4 grid gap-2"><Link href="/sistema/paginas/curriculos" className="rounded-lg px-4 py-3 text-center text-sm font-semibold bg-green-700 hover:bg-green-800 text-white">Abrir lista</Link><Link href="/sistema/paginas/curriculos/novo" className="rounded-lg border px-4 py-3 text-center text-sm font-semibold border-green-300 text-green-800">Cadastrar</Link></div></article><article className="rounded-3xl border border-green-200 bg-white p-5"><p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Funcionalidades</p><ul className="mt-4 grid gap-2 text-sm text-slate-700"><li>Busca imediata</li><li>Detalhes dinâmicos</li><li>Validação completa</li></ul></article><article className="rounded-3xl border border-green-200 bg-white p-5"><p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Persistência</p><p className="mt-3 text-sm text-slate-700">Os dados ficam armazenados localmente.</p></article></section>
    </main><Footer /></div></div>
  );
}
