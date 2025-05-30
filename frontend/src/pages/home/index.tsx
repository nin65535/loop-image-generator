import { Card, InputGroup } from "react-bootstrap";
import { Prompt } from "./components/prompt";
import { GenerateButton } from "./components/generateButton";
import { Images } from "./components/images";
import { PromptMaker } from "./components/promptMaker";
import { ClearButton } from "./components/clearButton";
import { Screen } from "~/components/screen";
import { ImageSizes } from "./components/imageSizes";
import { ImageCount } from "./components/imageCount";
import { PreviewSizes } from "./components/previewSizes";
import { UploadButton } from "./components/uploadButton";
import { Styles } from "./components/styles";

export default function Home() {
    return <>
        <Card>
            <Card.Body className='py-2'>
                <Prompt />
                <div className='d-flex gap-1 mt-2'>
                    <InputGroup style={{ width: "auto" }}>
                        <Styles />
                        <ImageSizes />
                        <ImageCount />
                        <GenerateButton />
                    </InputGroup>
                    <div className='col' />
                </div>
            </Card.Body>
        </Card>
        <Card className='mt-2'>
            <Card.Body className='py-2'>
                <div className='d-flex gap-1'>
                    <PreviewSizes />
                    <div className='col' />
                    <UploadButton />
                    <ClearButton />
                </div>
                <Images />
            </Card.Body>
        </Card>
        <Screen />
        <PromptMaker />
    </>
}
