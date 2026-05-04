const params = new URLSearchParams(location.search);
const targetId = params.get("id");

fetch('../03_JSON/nikki.json')
    .then(res => res.json())
    .then(files => {

        // IDがない場合
        if (!targetId) {
            document.body.innerHTML = "<h1>IDが指定されていません</h1>";
            return;
        }

        // データ取得
        const data = files.find(f => String(f.id) === targetId);

        if (!data) {
            document.body.innerHTML = "<h1>該当データが存在しません</h1>";
            return;
        }

        // タイトル
        document.getElementById('diary-title').textContent = data.title || "";

        // 本文（改行対応）
        document.getElementById('diary-text').innerHTML =
            (data.text || "").replace(/\n/g, "<br>");

        // 画像表示
        const imageRow = document.getElementById('gazou');
        imageRow.innerHTML = "";

        (data.images || []).forEach(src => {
            if (!src) return;

            const img = document.createElement('img');
            img.src = src;

            // 保存・ドラッグ対策
            img.addEventListener("dragstart", e => e.preventDefault());
            img.addEventListener("contextmenu", e => e.preventDefault());

            imageRow.appendChild(img);
        });

    })
    .catch(err => {
        document.body.innerHTML = "<h1>読み込みエラー</h1>";
        console.error(err);
    });