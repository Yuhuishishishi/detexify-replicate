import Latex from "react-latex";

function Result(props) {

    const {scores, symbols} = props;

    const results = Array.from(scores).map((s, idx) => {

        const displayScore = (s * 100).toFixed(2);

        return (
            <li key={idx}>
                <p>  {symbols[idx]} </p>
                <div className="progress">
                        <div className="progress-bar" role="progressbar" 
                            aria-valuenow={displayScore} aria-valuemin="0" aria-valuemax="100"
                            style={{width: `${displayScore}%`}}>{displayScore}%</div>
                </div>
            </li>
        );
    });

    console.log(results);

    return (
        <div>
            <ul>
                {results}
            </ul>
        </div>
    )
}

export default Result;