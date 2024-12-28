/// <reference types="vite/client" />

// vite-env.d.ts
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<_, _, any>;
  export default component;
}