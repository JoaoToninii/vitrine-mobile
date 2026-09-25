import { PRODUTOS } from '@/constants/produtos';
import { Produto } from '@/types/produto';

export function gerarProdutos(quantidade: number): Produto[] {
  const lista: Produto[] = [];

  for (let i = 0; i < quantidade; i += 1) {
    const base = PRODUTOS[i % PRODUTOS.length];
    lista.push({
      ...base,
      id: i + 1,
      title: `${base.title} #${i + 1}`,
    });
  }

  return lista;
}

export const PRODUTOS_TESTE = gerarProdutos(500);
