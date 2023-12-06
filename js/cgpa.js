const semcInp = Array.from(document.querySelectorAll(".sem-c-inp"));
const semcxgInp = Array.from(document.querySelectorAll(".sem-cxg-inp"));
const semsgpiInp = Array.from(document.querySelectorAll(".sem-sgpi-inp"));
const semsgpaInp = Array.from(document.querySelectorAll(".sem-sgpa-inp"));
const semcgpiInp = Array.from(document.querySelectorAll(".sem-cgpi-inp"));
const semcgpaInp = Array.from(document.querySelectorAll(".sem-cgpa-inp"));
const sempercentInp = Array.from(document.querySelectorAll(".sem-percent-inp"));

const selectcgper = document.getElementById('selectcgper');
const inpcgpi = document.getElementById('inpcgpi');
const resultpercentage = document.getElementById('resultpercentage');

const totalcredits = document.getElementById('totalcredits');
const totalcxg = document.getElementById('totalcxg');
const resultsgpi = document.getElementById('resultsgpi');

inpcgpi.addEventListener('keyup', () => {
    const value = inpcgpi.value;
    const choice = selectcgper.value;
    if (value == '') {
        resultpercentage.value = '';
        return
    }
    if (choice === 'cgpi') {
        if (value > 10 || value < 0) {
            resultpercentage.value = "Invalid CGPI";
            return
        }
        resultpercentage.value = calculatePercentage(value);
        return
    }
    if (choice === 'percentage') {
        if (value < 12 || value > 100) {
            resultpercentage.value = "Invalid Percentage";
            return
        }
        let cgpi = value - 12;
        resultpercentage.value = value >= 7 ? cgpi /= 7.4 : cgpi /= 7.1;
    }
})

totalcxg.addEventListener('keyup', () => {
    const tc = totalcredits.value;
    const tcxg = totalcxg.value;
    if (!isNaN(tc) && !isNaN(tcxg) )
        resultsgpi.value = calculateSGPI(tc, tcxg);
})

semcxgInp.forEach(col => {
    col.addEventListener("keyup", () => {
        const index = semcxgInp.indexOf(col);
        const tc = parseFloat(semcInp[index].value);
        const tcxg = parseFloat(semcxgInp[index].value);
        if (!isNaN(tc) && !isNaN(tcxg)) {
            semsgpiInp[index].value = calculateSGPI(tc, tcxg);
            semsgpaInp[index].value = calculateSGPA(index)
            semcgpaInp[index].value = calculateSGPA(index)
            const cgpi = calculateCGPI(index);
            semcgpiInp[index].value = `${cgpi} / 10`;
            const percentage = calculatePercentage(parseFloat(cgpi))
            sempercentInp[index].value = `${percentage.toFixed(2)}%`;
        }
    })
})

function calculatePercentage(cgpi) {
    return cgpi >= 7 ? cgpi * 7.4 + 12 : cgpi * 7.1 + 12;
}
function calculateSGPI(tc, tcxg) {
    const sgpi = tcxg / tc;
    return sgpi.toFixed(2)
}
function calculateSGPA(index) {
    if (index % 2 == 1) {
        let curr = parseFloat(semsgpiInp[index].value);
        let prev = parseFloat(semsgpiInp[index - 1].value);
        const result = (curr + prev) / 2
        return result;
    } else {
        const result = parseFloat(semsgpiInp[index].value);
        return result;
    }
}
function calculateCGPI(index) {
    let cgpi = 0;
    for (let i = 0; i <= index; i++) {
        cgpi += parseFloat(semsgpaInp[i].value);
    }
    cgpi /= 8;
    return cgpi.toFixed(2);
}