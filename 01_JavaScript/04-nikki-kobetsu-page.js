const params = new URLSearchParams(location.search);
const targetId = params.get("id");

fetch('../03_JSON/nikki.json')
    .then(res => res.json())
    .then(files => {

        const list = document.getElementById('daylist');

        // =========================
        // ① 詳細表示（ID指定あり）
        // =========================
        if (targetId) {
            const data = files.find(f => String(f.id) === targetId);

            if (!data) {
                document.body.innerHTML = "<h1>該当データが存在しません</h1>";
                return;
            }

            document.getElementById('diary-title').textContent = data.title || "";

            document.getElementById('diary-text').innerHTML =
                (data.text || "").replace(/\n/g, "<br>");

            const imageRow = document.getElementById('gazou');
            imageRow.innerHTML = "";

            (data.images || []).forEach(src => {
                const img = document.createElement('img');
                img.src = src;
                imageRow.appendChild(img);
            });

            return; // ← 詳細表示したら終了
        }

        // =========================
        // ② 一覧表示（IDなし）
        // =========================
        files.forEach(fileObj => {
            const li = document.createElement('li');
            li.textContent = `${fileObj.date || '日付不明'}：${fileObj.title || ''}`;
            list.appendChild(li);
        });

                // 画像
        const gazou = document.getElementById("gazou");
        imageArea.innerHTML = "";

        const images = Array.isArray(art.image) ? art.image : [art.image];

        images.forEach(src => {
            if (!src) return;

            const img = document.createElement("img");
            img.className = "nikki";
            img.src = src;

            // 保存対策
            img.addEventListener("dragstart", e => e.preventDefault());
            img.addEventListener("contextmenu", e => e.preventDefault());

            gazou.appendChild(img);
        });
        
    })
    .catch(err => {
        document.body.innerHTML = "<h1>読み込みエラー</h1>";
        console.error(err);
    });
