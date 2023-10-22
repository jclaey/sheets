const buildTable = (ws, results) => {
    let output = ''

    if (Object.keys(ws).length) {
        output += `
                <table>
            `

        if (ws.A1) {
            output += `
                <thead>
                    <tr>
                        <th colspan='2'>${ws.A1.w}</th>
                    </tr>
                </thead>
            `
        }

        output += '<tbody>'

        let arr = []

        for (let prop in ws) {
            arr.push({ prop, value: ws[prop].w })
        }

        arr.sort((a, b) => {
            if (a < b) {
                return -1
            }

            if (a > b) {
                return 1
            }

            return 0
        })

        arr.forEach(obj => {
            if (obj.prop === '!ref') {
                output += ''
            }

            if (obj.prop === '!margins') {
                output += ''
            }

            if (obj.prop.includes('A') && obj.prop !== 'A1') {
                output += `
                    <tr>
                        <td>${obj.value}</td>
                `
            }

            if (arr[arr.indexOf(obj) + 1] && arr[arr.indexOf(obj) + 1].prop.includes('A') && obj.prop !== 'A1' && obj.prop !== '!ref' && obj.prop !== '!margins') {
                output += `
                        <td>${obj.value}</td>
                    </tr>
                `
            }

            if (!obj.prop.includes('A') && arr[arr.indexOf(obj) + 1] && !arr[arr.indexOf(obj) + 1].prop.includes('A') && obj.prop !== '!ref' && obj.prop !== '!margins') {
                output += `
                    <td>${obj.value}</td>
                `
            }
        })

        output += `
                </tbody>
            </table>
        `
    }

    results.innerHTML = output
}

export { buildTable }