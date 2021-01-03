import Result from "./Result";
import Scratchpad from "./Scrathpad";
import { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";


function DrawContainer() {

    const [scores, setScores] = useState([]);
    const [classIdx, setClassIdx] = useState([]);
    const [labels, setLabels] = useState([]);
    const [tfModel, setModel] = useState(null);

    // read the labels
    useEffect(() => {
        async function loadLabels() {
            const resp = await fetch(process.env.PUBLIC_URL + '/labels/labels.txt');
            const labelString = await resp.text();
            const labelArr = labelString.split("\n");

            setLabels(labelArr);
            console.log(labelArr);
        }

        loadLabels();
        
    }, []);

    // load the model during init 
    useEffect(() => {
        async function loadmodel() {
            // load the model
            const model = await tf.loadLayersModel(
                process.env.PUBLIC_URL + '/model/model.json'
            );

            setModel(model)

            return model;
        }

        loadmodel();
        console.log('Model loaded')

    }, []);


    const symbols = Array.from(classIdx).map(idx => labels[idx]);


    return (
        <div className="row">
            <div className="col" style={{marginLeft: "100px"}}>
                <Scratchpad 
                    setScores={setScores}
                    setClassIdx={setClassIdx}
                    model={tfModel}/>

            </div>

            <div className="col" style={{marginTop: "120px"}}>
                <Result scores={scores} symbols={symbols} />
            </div>

        </div>
    );
}

export default DrawContainer;