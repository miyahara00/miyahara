// ===== 設定 =====
const PATH_A = "../03_JSON/nikki.json"
const PATH_B = "../03_JSON/nikki-kaku.json"

// ===== 実データ =====
let currentJson = []
let newJson = []

// ===== 読み込み =====
async function loadJson() {
    const resA = await fetch(PATH_A)
    currentJson = await resA.json()

    const resB = await fetch(PATH_B)
    newJson = await resB.json()
}

// ===== Bに書く =====
function addToB(data) {
    newJson.push(data)
}

// ===== 条件付き転記 =====
function moveBtoAIf(conditionFunc) {
    if (newJson.length === 0) return

    const lastItem = newJson[newJson.length - 1]

    if (conditionFunc(lastItem)) {
        newJson.forEach(item => {
            currentJson.push({
                ...item
            })
        })

        newJson.length = 0
    }
}
