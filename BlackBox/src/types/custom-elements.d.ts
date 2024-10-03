declare global {
    namespace JSX {
      interface IntrinsicElements {
        'code-runner': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
          language?: string;
        };
      }
    }
  }

  export {};