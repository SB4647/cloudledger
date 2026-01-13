import slugify from "slugify";
import type { MDXComponents } from "mdx/types";

const divider = (
  <div
    style={{
      height: "1px",
      background: "#222",
      margin: "0.75rem 0 1.25rem 0",
    }}
  />
);

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    p: (props) => (
      <p style={{ marginTop: "1.1rem", opacity: 0.9 }}>{props.children}</p>
    ),

    h2: (props) => {
      const text = typeof props.children === "string" ? props.children : "";
      const id = slugify(text || "section", { lower: true, strict: true });

      return (
        <div style={{ marginTop: "3rem" }}>
          <h2
            id={id}
            style={{
              marginTop: 0,
              paddingLeft: "0.75rem",
              borderLeft: "3px solid #222",
              letterSpacing: "0.3px",
            }}
          >
            {props.children}
          </h2>
          {divider}
        </div>
      );
    },

    ul: (props) => (
      <ul style={{ paddingLeft: "1rem", marginTop: "0.75rem" }}>
        {props.children}
      </ul>
    ),

    ol: (props) => (
      <ol style={{ paddingLeft: "1rem", marginTop: "0.75rem" }}>
        {props.children}
      </ol>
    ),

    a: (props) => (
      <a
        {...props}
        style={{
          fontWeight: 600,
          textDecoration: "underline",
          color: "inherit",
        }}
      />
    ),

    blockquote: (props) => (
      <div
        style={{
          background: "#0e0e0e",
          borderLeft: "3px solid #444",
          padding: "0.75rem 1rem",
          margin: "1.5rem 0",
          fontStyle: "italic",
          borderRadius: 8,
          opacity: 0.95,
        }}
      >
        {props.children}
      </div>
    ),

    ...components,
  };
}
