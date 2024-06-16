function calculateInstallments() {
    const itemPrice = parseFloat(document.getElementById("itemPrice").value);
    const installmentMonths = parseInt(document.getElementById("installmentMonths").value);
    const adminFeePercent = parseFloat(document.getElementById("adminFee").value) / 100;

    const baseInstallment = itemPrice / installmentMonths;
    let remainingPayment = itemPrice;
    let totalInstallment = 0;

    const table = document.getElementById("installmentTable");
    table.innerHTML = "<tr><th>Month</th><th>Installment</th><th>Remaining Payment</th></tr>";
    
    for (let i = 1; i <= installmentMonths; i++) {
        let installment = baseInstallment; 
        if (remainingPayment > 0) {
            const adminFee = (remainingPayment - baseInstallment) * adminFeePercent; 
            installment += adminFee; 
        }
        remainingPayment -= baseInstallment;
        totalInstallment += installment;

        const row = table.insertRow();
        row.insertCell().textContent = i;
        row.insertCell().textContent = installment.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }); 
        row.insertCell().textContent = remainingPayment.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }); 
    }

    const priceDifference = totalInstallment - itemPrice;

    document.getElementById("results").classList.remove("hidden");
    document.getElementById("originalPrice").textContent = itemPrice.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }); 
    document.getElementById("installmentPrice").textContent = totalInstallment.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }); 
    document.getElementById("priceDifference").textContent = priceDifference.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }); 
    document.getElementById("percentageDifference").textContent = ((priceDifference / itemPrice) * 100).toFixed(2) + "%";
}
