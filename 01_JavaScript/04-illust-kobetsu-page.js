const params = new URLSearchParams(location.search);
const id = Number(params.get("id"));

const artType = location.pathname.includes('illust') ? 'illust' : 'RAKUGAKI';
const jsonPath = `../03_JSON/${artType}.json`;

const excludeTag = artType;

fetch(jsonPath)
    .then(res => res.json())
    .then(data => {

        const art = data.arts.find(a => a.id === id);

        if (!art) {
            document.body.textContent = "作品が見つかりません";
            return;
        }

        // タイトル
        document.getElementById("title").textContent = art.title || "";

        // キャプション（改行対応）
        document.getElementById("caption").innerHTML =
            (art.caption || "").replace(/\n/g, "<br>");

        // 画像
        const imageArea = document.getElementById("imageArea");
        imageArea.innerHTML = "";

        const images = Array.isArray(art.image) ? art.image : [art.image];

        images.forEach(src => {
            if (!src) return;

            const img = document.createElement("img");
            img.className = "illust";
            img.src = src;

            // 保存対策
            img.addEventListener("dragstart", e => e.preventDefault());
            img.addEventListener("contextmenu", e => e.preventDefault());

            imageArea.appendChild(img);
        });

        // タグ
        const tagBox = document.getElementById("tag");
        tagBox.innerHTML = "";

        (art.tag || []).forEach(t => {
            if (t === excludeTag) return;

            const div = document.createElement("div");
            div.className = "illust-tag";
            div.textContent = t;

            div.addEventListener("click", () => {
                location.href =
                    `../02_HTML/03-tag-page.html?category=${artType}&tag=${encodeURIComponent(t)}`;
            });

            tagBox.appendChild(div);
        });
    })
    .catch(err => {
        document.body.textContent = "読み込みエラー";
        console.error(err);
    });