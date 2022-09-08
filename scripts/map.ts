import { Position } from "./types";
import * as distance from "./distance";

/**
 * 地図に直接依存する関数の一覧
 */

const map: boolean[][] = [];

// 媒介変数の微小値
const dt = 1 / 128;
// 到達可能な最大距離
const maxDistance = 3;

// 到達可能なときに真
function isReachable(p: Position, q: Position): boolean {
  // 遠過ぎる場合は到達不可能と見なす
  if (distance.euclidean(p, q) > maxDistance) return false;
  return true;
}

// 障害物との距離をはかる
function distanceToObstacle(p: Position): number {
  for (let r = 0; r <= maxDistance; r++) {
    for (let t = 0; t <= 1; t += dt) {
      const lat = r * Math.cos(t * 2 * Math.PI) + p.lat;
      const lng = r * Math.sin(t * 2 * Math.PI) + p.lng;
      // マップの外側ならそれは障害物
      if (lat < 0 || lat >= map[0].length || lng < 0 || lng >= map.length)
        return r;
      // 壁にぶつかったら障害物
      if (map[Math.round(lng)][Math.round(lat)]) return r;
    }
  }
  return maxDistance;
}

export { map, maxDistance, isReachable, distanceToObstacle };
