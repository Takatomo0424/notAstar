import { Position } from "./types";
import { euclidean } from "./distance";

/**
 * ランダムな座標を算出する関数の一覧
 */

// 対角の頂点から得られる矩形内
function randomSquare(p: Position, q: Position): Position {
  return {
    lat: (q.lat - p.lat) * Math.random() + p.lat,
    lng: (q.lng - p.lng) * Math.random() + p.lng,
  };
}

// 直径から得られる円内
function randomCircle(p: Position, q: Position): Position {
  const r = euclidean(p, q) * Math.random();
  const th = 2 * Math.PI * Math.random();
  return {
    lat: r * Math.cos(th) + (q.lat - p.lat) / 2 + p.lat,
    lng: r * Math.sin(th) + (q.lng - p.lng) / 2 + p.lng,
  };
}

export { randomSquare, randomCircle };
