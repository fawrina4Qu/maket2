import { Link } from "react-router";
import { historyFigures } from "@/lib/history-figures";

const collageImages = [
  "https://cdn.builder.io/api/v1/image/assets%2F00a9bc1a46c643ac900551296cbc3a27%2Fe1f7e4f697e64bbb904c6829025892b9?format=webp&width=800&height=1200",
  "https://cdn.builder.io/api/v1/image/assets%2F00a9bc1a46c643ac900551296cbc3a27%2F2d37afa7ae40414b95caac575b7c1764?format=webp&width=800&height=1200",
  "https://cdn.builder.io/api/v1/image/assets%2F00a9bc1a46c643ac900551296cbc3a27%2Fceae985cd9f543bf8e982673ed3b5f4a?format=webp&width=800&height=1200",
  "https://cdn.builder.io/api/v1/image/assets%2F00a9bc1a46c643ac900551296cbc3a27%2Fe3998db7d3e04230b5f513ad49bfd32c?format=webp&width=800&height=1200",
  "https://cdn.builder.io/api/v1/image/assets%2F00a9bc1a46c643ac900551296cbc3a27%2F0cbb1b7069d242e58d0d90e669ec22c1?format=webp&width=800&height=1200",
];

export function HistoryTiles() {
  return (
    <div className="community-grid">
      {historyFigures.map((figure, index) => (
        <Link className="community-tile history-tile" to={`/history/${figure.id}`} aria-label={figure.name} key={figure.id}>
          <div className="history-tile-media">
            <img src={collageImages[index]} alt={figure.name} loading="lazy" />
            <span>✿</span>
          </div>
          <p className="history-tile-name">{figure.name}</p>
        </Link>
      ))}
    </div>
  );
}
