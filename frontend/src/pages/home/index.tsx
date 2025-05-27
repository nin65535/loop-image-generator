import { Card, InputGroup } from "react-bootstrap";
import { Prompt } from "./components/prompt";
import { GenerateButton } from "./components/generateButton";
import { Debug } from "./components/debug";
import { Images } from "./components/images";
import { PromptMaker } from "./components/promptMaker";
import { ClearButton } from "./components/clearButton";
import { Sizes } from "./components/sizes";

export default function Home() {
    return <>

        <Card>
            <Card.Body>
                <Prompt />
                <div className='d-flex gap-1 py-2'>
                    <InputGroup style={{ width: "auto" }}>
                        <Sizes />
                        <GenerateButton />
                    </InputGroup>
                    <div className='col' />
                    <ClearButton />
                </div>
            </Card.Body>
        </Card>
        <PromptMaker />
        <Images />
        <Debug />
    </>
}
