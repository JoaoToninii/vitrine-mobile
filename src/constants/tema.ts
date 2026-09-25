export const CORES = {
  fundo: '#0F1B33',
  superficie: '#1D3B73',
  destaque: '#61DAFB',
  texto: '#FFFFFF',
  textoSuave: '#CBD5E1',
} as const;

export const CORES_NAVEGACAO = {
  light: {
    fundo: '#FFFFFF',
    borda: '#E2E8F0',
    texto: '#0F172A',
    destaque: '#0369A1',
    inativo: '#64748B',
  },
  dark: {
    fundo: CORES.fundo,
    borda: CORES.superficie,
    texto: CORES.texto,
    destaque: CORES.destaque,
    inativo: CORES.textoSuave,
  },
} as const;

export const API_BASE_URL = 'https://dummyjson.com';
