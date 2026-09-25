# Vitrine Mobile

Aplicativo mobile de catálogo de produtos desenvolvido com Expo + React Native + NativeWind.

## Descrição

Este projeto é uma vitrine de produtos com:

- catálogo de itens
- filtros por categoria
- favorito por produto
- navegação por abas
- tela de detalhe do produto
- suporte a tema claro e escuro
- interface estilizada com Tailwind via NativeWind

## Stack

- React Native
- Expo
- Expo Router
- NativeWind
- Tailwind CSS
- TypeScript

## Requisitos

- Node.js
- npm
- Expo Go ou emulador

## Instalação

```bash
npm install
```

## Execução

```bash
npx expo start
```

Depois, abra no Expo Go no celular ou use um emulador.

## Estrutura do projeto

```bash
vitrine-mobile/
├── app/
│   ├── (tabs)/
│   ├── produto/
│   ├── _layout.tsx
│   └── +not-found.tsx
├── src/
│   ├── components/
│   ├── constants/
│   ├── utils/
│   ├── types/
│   └── ...
├── App.tsx
├── app.json
├── babel.config.js
├── global.css
├── metro.config.js
├── nativewind-env.d.ts
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## Scripts

```bash
npm run start
npm run check
```

## Observações

O projeto foi configurado com Expo Router e NativeWind para seguir as aulas de desenvolvimento mobile com navegação por arquivos e classes utilitárias.
