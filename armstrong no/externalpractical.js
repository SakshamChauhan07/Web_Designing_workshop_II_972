function checkArmstrong() {
    let num = document.getElementById("number").value;
    let originalNum = num;
    let digits = num.length;
    let sum = 0;

    while (num > 0) {
        let digit = num % 10;
        sum += Math.pow(digit, digits);
        num = Math.floor(num / 10);
    }

    if (sum == originalNum) {
        document.getElementById("result").innerHTML =
            originalNum + " is an Armstrong Number";
    } else {
        document.getElementById("result").innerHTML =
            originalNum + " is NOT an Armstrong Number";
    }
}