import '../styles/Resistor.css';

const Resistor = ({ bandAColor, bandBColor, bandCColor, bandDColor }) => {
    return (
        <div className="resistor-container">
            <div className="resistor-cable"></div>
            <div className="resistor">
                <div className={`resistor-band long-band ${bandAColor}`}></div>
                <div className={`resistor-band ${bandBColor}`}></div>
                <div className={`resistor-band ${bandCColor}`}></div>
                <div className={`resistor-band long-band spaced-band ${bandDColor}`}></div>
            </div>
            <div className="resistor-cable"></div>
        </div>
    );
};

export default Resistor;