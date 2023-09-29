const fileInput = document.querySelector('#file-input')
const results = document.querySelector('#results-section')
import { buildTable } from './table.mjs'

fileInput.addEventListener('change', async e => {
    const [file] = fileInput.files

    if (file) {
        const reader = new FileReader()
        reader.onload = e => {
            const workbook = XLSX.read(e.target.result)
            const worksheet = workbook.Sheets[workbook.SheetNames[0]]
            console.log(worksheet)
            
            buildTable(worksheet, results)

            // const table = XLSX.utils.sheet_to_html(worksheet)
            // results.innerHTML = table
        }

        reader.readAsArrayBuffer(file)
    }
})