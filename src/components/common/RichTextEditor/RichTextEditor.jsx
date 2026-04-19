import { useRef, useMemo } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { api } from "@/api/client";

const DEFAULT_FORMATS = [
  "header", "bold", "italic", "underline", "strike",
  "color", "background", "list", "align",
  "blockquote", "code-block", "link", "image", "video",
];

const DEFAULT_TOOLBAR = [
  [{ header: [1, 2, 3, 4, false] }],
  ["bold", "italic", "underline", "strike"],
  [{ color: [] }, { background: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ align: [] }],
  ["blockquote", "code-block"],
  ["link", "image", "video"],
  ["clean"],
];

const COMPACT_TOOLBAR = [
  [{ header: [2, 3, 4, false] }],
  ["bold", "italic", "underline"],
  [{ list: "ordered" }, { list: "bullet" }],
  ["link", "clean"],
];

export default function RichTextEditor({
  value,
  onChange,
  placeholder,
  minHeight = 260,
  variant = "full",
}) {
  const quillRef = useRef(null);

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      try {
        const data = await api.upload("/media/upload", file);
        const editor = quillRef.current?.getEditor();
        if (editor) {
          const range = editor.getSelection(true);
          editor.insertEmbed(range.index, "image", data.url);
          editor.setSelection(range.index + 1);
        }
      } catch {}
    };
  };

  const modules = useMemo(() => ({
    toolbar: {
      container: variant === "compact" ? COMPACT_TOOLBAR : DEFAULT_TOOLBAR,
      handlers: { image: imageHandler },
    },
  }), [variant]);

  const formats = variant === "compact"
    ? ["header", "bold", "italic", "underline", "list", "link"]
    : DEFAULT_FORMATS;

  return (
    <div
      className="border border-gray-300 rounded-lg overflow-hidden [&_.ql-toolbar]:border-0 [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-gray-300 [&_.ql-container]:border-0 [&_.ql-editor]:text-sm"
      style={{ "--rte-min-h": `${minHeight}px` }}
    >
      <style>{`.ql-editor { min-height: var(--rte-min-h); }`}</style>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value || ""}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
      />
    </div>
  );
}
