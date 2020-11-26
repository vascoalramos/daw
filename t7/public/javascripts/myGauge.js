let tpcsGauge = (tpcsList) => {
    const numOfTpcs = 8;
    let tpcSum = tpcsList.length ? tpcsList.reduce((cumulative, val) => cumulative + val) : 0;
    let value = tpcSum / numOfTpcs;

    Gauge(document.getElementById("tpc-gauge"), {
        max: 1,
        value: value,
        color: (value) => {
            return percentageToColor(value);
        },
        label: () => {
            return `${tpcSum} / ${numOfTpcs}`;
        },
    });
};

let percentageToColor = (percentage) => {
    let hue = (percentage * 120).toString(10);
    return `hsl(${hue}, 100%, 50%)`;
};
