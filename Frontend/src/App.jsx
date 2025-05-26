import { useState,useEffect } from 'react'
import './App.css'
import "prismjs/themes/prism-tomorrow.css"
import prism from "prismjs"
import Editor from "react-simple-code-editor"
import axios from "axios"
import Markdown from "react-markdown"

function App() {
  const [count, setCount] = useState(0)
  const [code,setCode] = useState(`function sum(){
                return 1+1
                }
                `) 
  const [review,setReview] = useState(``)
  const [loading, setLoading] = useState(false);


  useEffect(()=>{
    prism.highlightAll()
  })

  async function reviewCode(){
    setLoading(true);         // show loading
    setReview("Generating..."); // temporary text
    try {
      const response = await axios.post('http://localhost:3000/ai/get-review', { code });
      setReview(response.data);
    } catch (err) {
      setReview("❌ Error: Unable to generate review.");
    }

    setLoading(false);

  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
           <Editor
            value={code}
            onValueChange={code => setCode(code)}
            highlight={code=>prism.highlight(code,prism.languages.javascript,"javascript")}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 16,
              border: "1px solid #ddd",
              borderRadius: "5px",
              width: "100%"
            }}
           /> 
          </div>
          <div onClick={reviewCode} className="review">Review</div>
        </div>
        <div className="right">
        {loading ? (
          <p className="loading">Generating...</p>
        ) : (
          <Markdown>{review}</Markdown>
        )}
        </div>      
      </main>
    </>
  )
}

export default App
