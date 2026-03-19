
import path from "node:path"
import fs from "node:fs"

export type CsvRow = Record<string, string>

export const readCsv = (relativeFilePath: string): CsvRow[] => {
    // B1: convert relativeFilePath to absoluteFilePath
    const absoluteFilePath = path.resolve(__dirname, "..", relativeFilePath)

    // B2: read CSV file
    const raw = fs.readFileSync(absoluteFilePath, "utf-8")
    const lines = raw
    .split(/\r?\n/)
    .map((l: any) => l.trim())
    .filter(Boolean);

    // Ignore header, read from line 2 of CSV file
    const dataLines = lines.slice(1)
    const rows: CsvRow[] = []

    for(const line of dataLines) {
        // tách thành cặp key-value
        const cell = line.split(",").map((c:string) => c.trim())


        const row: CsvRow = {
            username: cell[0],
            password: cell[1],
            expectedResult: cell[2]
        }
        console.log(`Data: ${row}`)

        rows.push(row)
    }

    return rows
}