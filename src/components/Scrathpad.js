import CanvasDraw from "react-canvas-draw";
import { useRef } from "react";
import * as tf from "@tensorflow/tfjs";

function Scratchpad(props) {


    
    const canvasStyle = {
        border: "1px solid #b9bfc9",
        marginTop: "25px",
    };

    const canvasRef = useRef(null);

    const tfModel = props.model;


    const canvasToTensor = canvasDOM => {
        let imageTensor = tf.browser
            .fromPixels(canvasDOM, 3)
            .resizeBilinear([32, 32])
            .toFloat()
            .expandDims()
            .div(255.0);

        // invert
        imageTensor = tf.scalar(1.0).sub(imageTensor);
        // // binarize
        imageTensor = tf.greaterEqual(imageTensor, tf.scalar(0.99)).toFloat();

        return imageTensor;
    }

    const makePredictions = imageTensor => {

        async function inference(imageTensor) {

            const scoreTensor = await tfModel.predict(imageTensor);
            const {values, indices} = tf.topk(tf.squeeze(scoreTensor), 5, true)

            props.setScores(await values.data());
            props.setClassIdx(await indices.data());

            return [values.data(), indices.data()];
        }

        const predictions = inference(imageTensor);

        return predictions;
    }

    const handleChange = canvasObj => {
        const canvasDOM = canvasObj.ctx.drawing.getImageData(0,0,400,400);
        const imageTensor = tf.tidy(() => {
            return canvasToTensor(canvasDOM);
        });
        makePredictions(imageTensor);
    }

    return (
        <div>
            { tfModel !== null ? <h4>Model loaded</h4>  : <h4>Loading model</h4> }

            <CanvasDraw 
                canvasWidth={400}
                canvasHeight={400}
                brushRadius={8}
                style={canvasStyle}
                ref={canvasRef}
                onChange={(e) => handleChange(e)}
                />

            <button type="button" 
                className="btn btn-outline-primary" 
                style ={{marginLeft: "10px", marginTop: "10px"}}
                onClick={() => {
                    canvasRef.current.clear();
                    props.setScores([]);
                    props.setClassIdx([]);
                }}
                >Clear</button>
        </div>
    )
}

export default Scratchpad;