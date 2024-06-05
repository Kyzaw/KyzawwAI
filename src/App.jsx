import { useState } from "react";
import { requestToGroqAI } from "./utils/groq";
import { Light as SyntaxHighlight } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import './App.css';

function App() {
  const [data, setData] = useState("");

  const handleSubmit = async () => {
    const ai = await requestToGroqAI(content.value);
    setData(ai);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Copied to clipboard!");
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  const renderResponse = () => {
    const parts = data.split('```');
    if (parts.length > 1) {
      return (
        <div>
          <div className="html-code">
            <SyntaxHighlight language="html" style={darcula} wrapLongLines={true}>
              {parts[1]}
            </SyntaxHighlight>
            <button
              onClick={() => copyToClipboard(parts[1])}
              className="bg-red-600 text-white px-2 py-1 rounded-md mt-1"
            >
              Copy
            </button>
          </div>
          <div className="explanation mt-3">
            <SyntaxHighlight language="markdown" style={darcula} wrapLongLines={true}>
              {parts[2]}
            </SyntaxHighlight>
            <button
              onClick={() => copyToClipboard(parts[2])}
              className="bg-red-600 text-white px-2 py-1 rounded-md mt-2"
            >
              Copy
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <SyntaxHighlight language="html" style={darcula} wrapLongLines={true}>
            {data}
          </SyntaxHighlight>
          <button
            onClick={() => copyToClipboard(data)}
            className="bg-red-600 text-white px-2 py-1 rounded-md mt-2"
          >
            Copy
          </button>
        </div>
      );
    }
  };

  return (
    <main className="flex flex-col min-h-[80vh] items-center justify-center max-w-xl w-full mx-auto ">
      <h1 className="text-4xl font-bold text-red-600">Kyzaww|AI</h1>
      <form className="flex flex-col gap-4 py-4 w-full">
        <input
          type="text"
          className="border-2 border-red-600 rounded-md p-2"
          placeholder="Masukkan Pertanyaan"
          id="content"
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              handleSubmit();
            }
          }}
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-red-600 text-white px-4 py-2 rounded-md"
        >
          Kirim
        </button>
      </form>
      <div className="max-w-xl w-full mx-auto">
        {data ? renderResponse() : null}
      </div>
    </main>
  );
}

export default App;
