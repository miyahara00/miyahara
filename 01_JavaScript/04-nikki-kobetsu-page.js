const container = document.getElementById("diary-content");

// ID取得
const params = new URLSearchParams(location.search);
const targetId = params.get("id");

// JSON取得
fetch('../03_JSON/nikki.json')
    .then(res => res.json())
    .then(files => {

        const data = files.find(f => String(f.id) === targetId);

        if (!data) {
            document.body.innerHTML = "<h1>該当データが存在しません</h1>";
            return;
        }

        // タイトル（あるなら）
        const titleEl = document.getElementById('diary-title');
        if (titleEl) {
            titleEl.textContent = data.title || "";
        }

        // content描画（ここが本体）
        data.content.forEach(item => {

            if (item.type === "text") {
                const p = document.createElement("div");
                p.className = "text";
                p.textContent = item.value; // ここは安全でおすすめ
                container.appendChild(p);
            }

            if (item.type === "images") {
                const wrap = document.createElement("div");
                wrap.id = "gazou";

                item.value.forEach(src => {
                    const img = document.createElement("img");
                    img.src = src;

                    img.addEventListener("dragstart", e => e.preventDefault());
                    img.addEventListener("contextmenu", e => e.preventDefault());

                    wrap.appendChild(img);
                });

                container.appendChild(wrap);
            }
        });

    })
    .catch(err => {
        document.body.innerHTML = "<h1>読み込みエラー</h1>";
        console.error(err);
    });