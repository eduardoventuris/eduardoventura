"use client";

import Image from "next/image";
import { useState, type ChangeEvent } from "react";
import { Controller, FieldErrors, Resolver, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IMaskInput } from "react-imask";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as yup from "yup";
import Header from "../../../../componentes/header";
import Footer from "../../../../componentes/footer";
import { Button } from "../../../../componentes/ui/button";
import { Input } from "../../../../componentes/ui/input";
import { Textarea } from "../../../../componentes/ui/textarea";
import { Curriculo, Formacao, Experiencia, loadCurriculos, saveCurriculos } from "../data";

type ResumeDraft = {
  nome: string;
  cargo: string;
  email: string;
  telefone: string;
  cpf: string;
  resumo: string;
  habilidades: string;
  avatar: FileList | null | undefined;
  experiencias: Experiencia[];
  formacoes: Formacao[];
};

const validationSchema = yup.object({
  nome: yup.string().required("Nome e obrigatorio").min(3, "Nome precisa ter ao menos 3 caracteres."),
  cargo: yup.string().required("Cargo e obrigatorio").min(3, "Cargo precisa ter ao menos 3 caracteres."),
  email: yup.string().required("E-mail e obrigatorio").email("Digite um e-mail valido."),
  telefone: yup.string().required("Telefone e obrigatorio").min(14, "Telefone incompleto."),
  cpf: yup.string().required("CPF e obrigatorio").min(14, "CPF incompleto."),
  resumo: yup.string().required("Resumo profissional e obrigatorio").min(30, "Resumo deve ter ao menos 30 caracteres."),
  habilidades: yup.string().required("Habilidades sao obrigatorias").min(5, "Liste ao menos uma habilidade."),
  avatar: yup.mixed().nullable(),
  experiencias: yup.array().of(yup.object({ empresa: yup.string().required("Empresa e obrigatoria."), cargo: yup.string().required("Cargo e obrigatorio."), periodo: yup.string().required("Periodo e obrigatorio."), descricao: yup.string().required("Descricao e obrigatoria.").min(20, "Descricao muito curta.") })).min(1, "Adicione ao menos uma experiencia profissional."),
  formacoes: yup.array().of(yup.object({ instituicao: yup.string().required("Instituicao e obrigatoria."), curso: yup.string().required("Curso e obrigatorio."), periodo: yup.string().required("Periodo e obrigatorio.") })).min(1, "Adicione ao menos uma formacao academica."),
});

const formSeed: ResumeDraft = {
  nome: "",
  cargo: "",
  email: "",
  telefone: "",
  cpf: "",
  resumo: "",
  habilidades: "",
  avatar: null,
  experiencias: [{ empresa: "", cargo: "", periodo: "", descricao: "" }],
  formacoes: [{ instituicao: "", curso: "", periodo: "" }],
};

function nextResumeId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `curr-${Math.random().toString(36).slice(2, 10)}`;
}

function extractFirstIssue(formIssues: FieldErrors<ResumeDraft>): string {
  if (!formIssues) return "Erro na validacao.";
  const firstValue = Object.values(formIssues)[0];
  if (!firstValue) return "Erro na validacao.";
  if (typeof firstValue === "string") return firstValue;
  if (Array.isArray(firstValue)) return extractFirstIssue(firstValue as unknown as FieldErrors<ResumeDraft>);
  return typeof firstValue.message === "string" ? firstValue.message : "Erro na validacao.";
}

export default function NovoCurriculoPage() {
  const router = useRouter();
  const [previewImage, setPreviewImage] = useState("/next.svg");

  const { register, control, handleSubmit, setValue, formState: { errors, isSubmitting, isValid }, reset } = useForm<ResumeDraft>({
    mode: "onTouched",
    defaultValues: formSeed,
    resolver: yupResolver(validationSchema) as Resolver<ResumeDraft>,
  });

  const workCollection = useFieldArray({ control, name: "experiencias" });
  const studyCollection = useFieldArray({ control, name: "formacoes" });

  const syncAvatarPreview = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    setValue("avatar", files);
    if (files && files.length > 0) {
      setPreviewImage(URL.createObjectURL(files[0]));
      return;
    }
    setPreviewImage("/next.svg");
  };

  const saveResume: SubmitHandler<ResumeDraft> = (draft) => {
    const normalizedAbilities = draft.habilidades.split(",").map((entry) => entry.trim()).filter(Boolean);
    const createdProfile: Curriculo = { id: nextResumeId(), nome: draft.nome, cargo: draft.cargo, email: draft.email, telefone: draft.telefone, cpf: draft.cpf, resumo: draft.resumo, experiencias: draft.experiencias, formacoes: draft.formacoes, habilidades: normalizedAbilities, avatar: previewImage || "/next.svg" };
    saveCurriculos([createdProfile, ...loadCurriculos()]);
    toast.success("Curriculo salvo com sucesso.");
    reset(formSeed);
    router.push("/sistema/paginas/curriculos");
  };

  return (
    <div className="site-shell"><Header /><div className="main-pane"><main className="page-wrap">
      <section className="grid gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-green-200 bg-white p-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Novo curriculo</h1>
            <p className="mt-2 text-sm text-slate-600">Preencha os dados principais, experiencias, formacoes e habilidades.</p>
          </div>
          <Link href="/sistema/paginas/curriculos" className="rounded-md border border-green-300 text-green-800 px-4 py-3 text-sm font-semibold">Voltar para a lista</Link>
        </div>

        <form onSubmit={handleSubmit(saveResume, (formErrors) => toast.error(extractFirstIssue(formErrors)))} className="grid gap-4">
          <div className="grid gap-4 xl:grid-cols-[0.85fr_1.15fr]"><section className="rounded-2xl bg-green-50 p-4"><div className="flex items-center justify-between gap-3"><div><h2 className="text-lg font-bold text-slate-900">Imagem do candidato</h2><p className="mt-1 text-sm text-slate-600">Upload visual para compor a ficha.</p></div><span className="inline-flex rounded-full px-3 py-1 text-xs font-bold border border-green-200 text-slate-700">Opcional</span></div><div className="mt-5 grid gap-4 sm:grid-cols-[auto_1fr] sm:items-center"><div className="relative h-24 w-24 overflow-hidden rounded-2xl border border-green-200 bg-white"><Image src={previewImage} alt="Avatar" fill className="object-cover" /></div><div className="grid gap-2"><label className="text-sm font-semibold text-slate-800">Arquivo</label><Controller name="avatar" control={control} render={({ field }) => (<input type="file" accept="image/*" onChange={(event) => { field.onChange(event.target.files); syncAvatarPreview(event); }} className="input-shell file:mr-4 file:rounded-full file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white" />)} /></div></div></section><section className="rounded-2xl border border-green-200 bg-white p-4"><div className="flex items-center justify-between gap-3"><div><h2 className="text-lg font-bold text-slate-900">Informacoes principais</h2><p className="mt-1 text-sm text-slate-600">Dados de apresentacao do currículo.</p></div><span className="inline-flex rounded-full px-3 py-1 text-xs font-bold bg-green-100 text-green-900">Obrigatorio</span></div><div className="mt-5 grid gap-4 lg:grid-cols-2"><div className="grid gap-2"><label className="text-sm font-semibold text-slate-800">Nome</label><Input {...register("nome")} type="text" placeholder="Nome completo" />{errors.nome && <p className="error-text">{errors.nome.message?.toString()}</p>}</div><div className="grid gap-2"><label className="text-sm font-semibold text-slate-800">Cargo desejado</label><Input {...register("cargo")} type="text" placeholder="Cargo desejado" />{errors.cargo && <p className="error-text">{errors.cargo.message?.toString()}</p>}</div></div><div className="mt-4 grid gap-2"><label className="text-sm font-semibold text-slate-800">Resumo profissional</label><Textarea {...register("resumo")} placeholder="Descreva experiencia e competencias" />{errors.resumo && <p className="error-text">{errors.resumo.message?.toString()}</p>}</div></section></div><div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]"><section className="rounded-2xl bg-green-50 p-4"><h2 className="text-lg font-bold text-slate-900">Habilidades</h2><div className="mt-5 grid gap-2"><label className="text-sm font-semibold text-slate-800">Lista de habilidades</label><Input {...register("habilidades")} type="text" placeholder="React, Next.js, TypeScript" /><p className="text-xs text-slate-500">Separe por virgula.</p>{errors.habilidades && <p className="error-text">{errors.habilidades.message?.toString()}</p>}</div></section><section className="rounded-2xl border border-green-200 bg-white p-4"><h2 className="text-lg font-bold text-slate-900">Contato</h2><div className="mt-5 grid gap-4"><div className="grid gap-2"><label className="text-sm font-semibold text-slate-800">E-mail</label><Input {...register("email")} type="email" placeholder="nome@exemplo.com" />{errors.email && <p className="error-text">{errors.email.message?.toString()}</p>}</div><div className="grid gap-2"><label className="text-sm font-semibold text-slate-800">Telefone</label><Controller name="telefone" control={control} render={({ field }) => (<IMaskInput {...field} mask="(00) 00000-0000" placeholder="(99) 99999-9999" className="input-shell" />)} />{errors.telefone && <p className="error-text">{errors.telefone.message?.toString()}</p>}</div><div className="grid gap-2"><label className="text-sm font-semibold text-slate-800">CPF</label><Controller name="cpf" control={control} render={({ field }) => (<IMaskInput {...field} mask="000.000.000-00" placeholder="000.000.000-00" className="input-shell" />)} />{errors.cpf && <p className="error-text">{errors.cpf.message?.toString()}</p>}</div></div></section></div><div className="grid gap-4"><section className="rounded-2xl border border-green-200 bg-white p-4"><div className="flex items-center justify-between gap-3"><h2 className="text-lg font-bold text-slate-900">Formacao academica</h2><Button type="button" variant="secondary" onClick={() => studyCollection.append({ instituicao: "", curso: "", periodo: "" })}>Adicionar</Button></div><div className="mt-5 grid gap-4">{studyCollection.fields.map((field, index) => (<div key={field.id} className="rounded-xl border border-green-200 p-4"><div className="flex items-center justify-between gap-3"><span className="text-sm font-semibold text-slate-700">Formacao {index + 1}</span><Button type="button" variant="danger" onClick={() => studyCollection.remove(index)}>Remover</Button></div><div className="mt-4 grid gap-4"><Input {...register(`formacoes.${index}.instituicao` as const)} type="text" placeholder="Instituicao" /><div className="grid gap-4 lg:grid-cols-2"><Input {...register(`formacoes.${index}.curso` as const)} type="text" placeholder="Curso" /><Input {...register(`formacoes.${index}.periodo` as const)} type="text" placeholder="Periodo" /></div></div></div>))}{errors.formacoes && <p className="error-text">{extractFirstIssue(errors.formacoes)}</p>}</div></section><section className="rounded-2xl border border-green-200 bg-white p-4"><div className="flex items-center justify-between gap-3"><h2 className="text-lg font-bold text-slate-900">Experiencias profissionais</h2><Button type="button" variant="secondary" onClick={() => workCollection.append({ empresa: "", cargo: "", periodo: "", descricao: "" })}>Adicionar</Button></div><div className="mt-5 grid gap-4">{workCollection.fields.map((field, index) => (<div key={field.id} className="rounded-xl border border-green-200 p-4"><div className="flex items-center justify-between gap-3"><span className="text-sm font-semibold text-slate-700">Experiencia {index + 1}</span><Button type="button" variant="danger" onClick={() => workCollection.remove(index)}>Remover</Button></div><div className="mt-4 grid gap-4 lg:grid-cols-2"><Input {...register(`experiencias.${index}.empresa` as const)} type="text" placeholder="Empresa" /><Input {...register(`experiencias.${index}.cargo` as const)} type="text" placeholder="Cargo" /></div><div className="mt-4 grid gap-4 lg:grid-cols-2"><Input {...register(`experiencias.${index}.periodo` as const)} type="text" placeholder="2021 - 2024" /><Textarea {...register(`experiencias.${index}.descricao` as const)} placeholder="Descricao" /></div></div>))}{errors.experiencias && <p className="error-text">{extractFirstIssue(errors.experiencias)}</p>}</div></section></div>
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting || !isValid}>{isSubmitting ? "Salvando..." : "Salvar curriculo"}</Button>
          </div>
        </form>
      </section>
    </main><Footer /></div></div>
  );
}
