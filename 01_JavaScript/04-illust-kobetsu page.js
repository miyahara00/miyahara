const params = new URLSearchParams(location.search);
const id = Number(params.get("id"));

const artType = window.location.pathname.includes('illust') ? 'illust' : 'RAKUGAKI';

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
        document.getElementById("title").textContent = art.title;

        // キャプション（改行対応）
        document.getElementById("caption").innerHTML =
            art.caption.replace(/\n/g, "<br>");

        // 画像（1枚・複数 両対応）
        const imageArea = document.getElementById("imageArea");
        imageArea.innerHTML = "";

        // 配列でなければ配列に変換
        const images = Array.isArray(art.image) ? art.image : [art.image];

        images.forEach(src => {
            const img = document.createElement("img");
            img.className = "illust";
            img.src = src;

            // 保存防止
            img.addEventListener("dragstart", e => e.preventDefault());
            img.addEventListener("contextmenu", e => e.preventDefault());

            imageArea.appendChild(img);
        });

        // タグ
        const tagBox = document.getElementById("tag");
        tagBox.innerHTML = "";

        art.tag.forEach(t => {
            if (t !== excludeTag) {
                const div = document.createElement("div");
                div.className = "illust-tag";
                div.textContent = t;

                div.addEventListener("click", () => {
                    const tagPage = encodeURI('../02_HTML/03-tag page.html');
                    location.href =
                        `${tagPage}?category=${artType}&tag=${encodeURIComponent(t)}`;
                });

                tagBox.appendChild(div);
            }
        });
    });
