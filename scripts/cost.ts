import { Position } from "./types";
import { isReachable } from "./map";
import * as distance from "./distance";
import * as random from "./random";

/**
 * コスト計算に関する関数の一覧
 */

// 再帰回数の限界
const maxRecursion = 3;
// 多段点の試行回数限界
const maxRecPoints = 24;

// 距離を求める関数の代表
const calcDistance = distance.euclidean;
// ランダムな座標を求める関数の代表
const randamPosition = random.randomSquare;

// コストとして距離を返す関数の代表
function distanceCost(p: Position, q: Position): number {
  if (isReachable(p, q)) return calcDistance(p, q);
  return -1;
}

// 多段中継点で到達できるときにその距離を返す関数の代表
function recursiveCost(p: Position, q: Position, r = 0): number {
  // 多段点の取り過ぎなら到達不可能と判断
  if (r > maxRecursion) return -1;
  // 直接到達可能ならその距離
  if (isReachable(p, q)) return calcDistance(p, q);
  // 多段点を利用して到達できるか確かめる
  for (const i in [...Array(maxRecPoints)]) {
    const t = randamPosition(p, q);
    const rg = recursiveCost(p, t, r + 1);
    const rh = recursiveCost(t, q, r + 1);
    // どうやら到達できそうなときは距離を返す
    if (rg >= 0 && rh >= 0) return rg + rh;
  }
  return -1;
}

const g = distanceCost;
const h = recursiveCost;

function calculateCost(p: Position, start: Position, goal: Position): number {
  const gcost = g(start, p);
  const hcost = h(p, goal);
  // 到達できませんでした
  if (gcost < 0 || hcost < 0) return -1;
  return gcost + hcost;
}

export { calculateCost };
