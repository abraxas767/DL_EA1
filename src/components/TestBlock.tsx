import { CodeBlock, dracula } from "react-code-blocks";

function TestBlock(props: any){
    return (
        <CodeBlock
            text={props.code}
            language={props.language}
            showLineNumbers={props.showLineNumbers}
            codeblock
        />
    );
}

export default TestBlock;
