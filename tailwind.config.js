/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'inherit',
            a: {
              color: 'inherit',
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            strong: {
              color: 'inherit',
              fontWeight: '600',
            },
            code: {
              color: 'inherit',
              backgroundColor: 'rgb(var(--code-background) / 0.1)',
              borderRadius: '0.25rem',
              padding: '0.25rem 0.5rem',
              fontSize: '0.875em',
              fontWeight: '500',
              '&::before': {
                content: 'none',
              },
              '&::after': {
                content: 'none',
              },
            },
            pre: {
              backgroundColor: 'rgb(var(--code-background))',
              borderRadius: '0.5rem',
              padding: '1rem',
              margin: '1.5rem 0',
              overflow: 'auto',
              fontSize: '0.875em',
              lineHeight: '1.7',
              '& code': {
                backgroundColor: 'transparent',
                padding: '0',
                fontSize: 'inherit',
                color: 'inherit',
                fontWeight: 'inherit',
              },
            },
            h1: {
              color: 'inherit',
              fontWeight: '700',
              fontSize: '2.25em',
              marginTop: '0',
              marginBottom: '0.8888889em',
              lineHeight: '1.1111111',
            },
            h2: {
              color: 'inherit',
              fontWeight: '600',
              fontSize: '1.5em',
              marginTop: '2em',
              marginBottom: '1em',
              lineHeight: '1.3333333',
            },
            h3: {
              color: 'inherit',
              fontWeight: '600',
              fontSize: '1.25em',
              marginTop: '1.6em',
              marginBottom: '0.6em',
              lineHeight: '1.6',
            },
            h4: {
              color: 'inherit',
              fontWeight: '600',
              marginTop: '1.5em',
              marginBottom: '0.5em',
              lineHeight: '1.5',
            },
            blockquote: {
              fontWeight: '500',
              fontStyle: 'italic',
              color: 'inherit',
              borderLeftWidth: '0.25rem',
              borderLeftColor: 'rgb(var(--code-background) / 0.3)',
              quotes: '"\\201C""\\201D""\\2018""\\2019"',
              marginTop: '1.6em',
              marginBottom: '1.6em',
              paddingLeft: '1em',
            },
            hr: {
              borderColor: 'rgb(var(--code-background) / 0.1)',
              borderTopWidth: 1,
              marginTop: '3em',
              marginBottom: '3em',
            },
            ol: {
              listStyleType: 'decimal',
              marginTop: '1.25em',
              marginBottom: '1.25em',
              paddingLeft: '1.625em',
            },
            ul: {
              listStyleType: 'disc',
              marginTop: '1.25em',
              marginBottom: '1.25em',
              paddingLeft: '1.625em',
            },
            li: {
              marginTop: '0.5em',
              marginBottom: '0.5em',
            },
            table: {
              width: '100%',
              tableLayout: 'auto',
              textAlign: 'left',
              marginTop: '2em',
              marginBottom: '2em',
              fontSize: '0.875em',
              lineHeight: '1.7142857',
            },
            thead: {
              color: 'inherit',
              fontWeight: '600',
              borderBottomWidth: '1px',
              borderBottomColor: 'rgb(var(--code-background) / 0.1)',
            },
            th: {
              padding: '0.5714286em',
              fontWeight: '600',
              verticalAlign: 'bottom',
              borderBottom: '1px solid rgb(var(--code-background) / 0.1)',
            },
            td: {
              padding: '0.5714286em',
              verticalAlign: 'top',
              borderBottom: '1px solid rgb(var(--code-background) / 0.1)',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
} 