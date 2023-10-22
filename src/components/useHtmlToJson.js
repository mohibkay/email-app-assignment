import { useEffect, useState } from "react";

function parseNode(node) {
  const obj = {
    tagName: node.tagName,
  };

  if (node.childNodes.length) {
    obj.children = Array.from(node.childNodes)
      .filter((child) => child.nodeType === Node.ELEMENT_NODE)
      .map((child) => parseNode(child));
  } else {
    obj.text = node.textContent.trim();
  }

  return obj;
}

function useHTMLToJSON(htmlContent) {
  const [jsonContent, setJsonContent] = useState(null);

  useEffect(() => {
    const tempElement = document.createElement("div");
    if (!htmlContent) return;
    tempElement.innerHTML = htmlContent;

    const parser = new DOMParser();

    const parsedDocument = parser.parseFromString(
      tempElement.innerHTML,
      "text/html"
    );

    const jsObject = parseNode(parsedDocument);
    const jsonString = JSON.stringify(jsObject, null, 2);

    setJsonContent(jsonString);
  }, [htmlContent]);

  return jsonContent;
}

export default useHTMLToJSON;
