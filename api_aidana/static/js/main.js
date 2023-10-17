<script>
function convertExcelToJson() {
    const input = document.getElementById('excelFile');
    const file = input.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0]; // assuming the first sheet is the one you want to convert

            const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
            const jsonOutput = document.getElementById('jsonOutput');
            jsonOutput.textContent = JSON.stringify(jsonData, null, 2);
        };
        reader.readAsArrayBuffer(file);
    } else {
        alert('Please select an Excel file.');
    }
}
</script>
