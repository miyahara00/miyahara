const container = document.body;

// JSON取得後
const data = files.find(f => String(f.id) === targetId);

if (!data) {
    document.body.innerHTML = "<h1>該当データが存在しません</h1>";
    return;
}

// ===== ここが重要（両対応） =====

// ① content形式
if (Array.isArray(data.content)) {

    data.content.forEach(item => {

        if (item.type === "text") {
            const p = document.createElement("div");
            p.className = "text";
            p.innerHTML = item.value.replace(/\n/g, "<br>");
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

// ② 旧形式（text/images）
} else {

    if (data.text) {
        const p = document.createElement("div");
        p.className = "text";
        p.innerHTML = data.text.replace(/\n/g, "<br>");
        container.appendChild(p);
    }

    if (data.images) {
        const wrap = document.createElement("div");
        wrap.id = "gazou";

        data.images.forEach(src => {
            const img = document.createElement("img");
            img.src = src;
            wrap.appendChild(img);
        });

        container.appendChild(wrap);
    }
}