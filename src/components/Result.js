import MathJax from 'react-mathjax-preview'

function Result(props) {

    const {scores, symbols} = props;

    const results = Array.from(scores).map((s, idx) => {

        const displayScore = (s * 100).toFixed(2);

        const latexSymbol = symbols[idx];
        const latextRepr = `$$ ${latexSymbol} $$`;

        console.log(latextRepr)

        return (
            <li key={idx}>
                {latexSymbol}: <MathJax math={latextRepr} />
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
            <ul>
                {results}
            </ul>
    )
}

export default Result;