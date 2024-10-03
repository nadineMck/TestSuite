import { useEffect, useState } from "react";
import "./Home.scss";

interface ResponseData {
  code: string;
  "testing code": string[];
  docstring: string[];
}

function Home() {
  const [response, setResponse] = useState<ResponseData | null>(null);
  const [question, setQuestion] = useState<string>('What is the capital of France?'); // Initialize with a default value

  const sendRequest = async () => {
    const url = 'https://testsuite.onrender.com/get_response/'; // Replace with your URL
    console.log(question);
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          code: question, // Use the question from state
        }),
      });

      const data: ResponseData = await res.json(); // Expect JSON response
      console.log(data);
      setResponse(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    sendRequest(); // Call the function to send the request on component mount
  }, [question]); // Re-run the request whenever the question changes

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "./script.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  const handleParseHtml = () => {
    const parseHtmlContent = (): void => {
      const lines = document.querySelectorAll<HTMLDivElement>(".ace_line");
      var str = "";
      lines.forEach((line) => {
        console.log(line.textContent?.trim());
        str += line.textContent?.trim() + "\n";
      });
      const output = document.querySelector<HTMLDivElement>("#result");
      const outputText = output?.textContent?.trim();
      console.log(outputText);

      if (outputText) {
        setQuestion(str +"\nExpected Output:\n"+  outputText); // Update the question state with the parsed output
      }
    };
    parseHtmlContent();
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const button = document.querySelector<HTMLButtonElement>(".ck-button.run-button");
      if (button) {
        button.addEventListener("click", handleParseHtml);
        clearInterval(intervalId); // Stop polling once the button is found
      }
    }, 1000); // Check every second

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, []);

  return (
    <div className="Wrapper">
      <code-runner
        language="python"
        style={{
          display: "block",
          width: "50%",
          marginLeft: "25%",
          marginTop: "4%",
        }}
      ></code-runner>
      <div className="OutputWrapper">
        <div className="table">

        {response ? (
          <div className="response-content">
            <div className="testing-code">
              <h3>Testing Code</h3>
              {response["testing code"].map((code, index) => (
                <pre key={index}>
                  <code>{code}</code>
                </pre>
              ))}
            </div>

          </div>
        ) : (
          <div>Loading...</div>
        )}
        </div>
        <div className="table">

        {response ? (
            <div className="docstring">
            <h3>Docstring</h3>
            {response.docstring.map((doc, index) => (
              <pre key={index}>
                <code>{doc}</code>
              </pre>
            ))}
          </div>
        ) : (
          <div>Loading...</div>
        )}
        </div>
      </div>
    </div>
  );
}

export default Home;
