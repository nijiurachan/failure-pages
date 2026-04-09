import { readFileSync, writeFileSync, readdirSync } from "node:fs";

// public/assets/illust ディレクトリから画像ファイルを取得
const illustDir = "./public/assets/illust";
const imageFiles = readdirSync(illustDir)
    .filter((file) => /\.(webp|png|jpg|jpeg|gif)$/i.test(file))
    .sort();

console.log(`Found ${imageFiles.length} images`);

// template.html を読み込む
const template = readFileSync("./template.html", "utf-8");

// ランダム画像表示コードを生成
const randomImageCode = `<script type="text/javascript">
  const images = ${JSON.stringify(imageFiles)};
  const randomImage = images[Math.floor(Math.random() * images.length)];
  const imageUrl = 'https://failure.nijiurachan.net/assets/illust/' + randomImage;
  document.write('<img src="' + imageUrl + '" alt="random image"">');
</script>`;

// template.html のコメント部分を置き換える
const output = template.replace(
    /<!--\s*\/\/ランダムに画像を表示するためのコード\s*-->/,
    randomImageCode
);

// public/index.html に出力
writeFileSync("./public/index.html", output);

console.log("✓ Generated public/index.html successfully!");
