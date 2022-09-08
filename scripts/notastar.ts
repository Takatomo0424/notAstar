import { Position } from "./types";
import * as random from "./random";
import { distanceToObstacle, isReachable, maxDistance } from "./map";
import * as distance from "./distance";
import { calculateCost } from "./cost";

// ランダム点の試行回数
const maxAttenpts = 24;

// 距離を求める関数の代表
const calcDistance = distance.euclidean;
// ランダムな座標を求める関数の代表
const randomPosition = random.randomSquare;

function escapeFromDeadEnd(start: Position, goal: Position): Position {
  let result: Position = { lat: NaN, lng: NaN };
  let cost = Number.MAX_VALUE;
  for (const i in [...Array(maxAttenpts)]) {
    const p = randomPosition(start, goal);
    if (isReachable(start, p)) {
      const dob = maxDistance - distanceToObstacle(p);
      const dst = calcDistance(start, p);
      if (dob + dst < cost) {
        result = p;
        cost = dob + dst;
      }
    }
  }
  return result;
}

async function notAstar(start: Position, goal: Position): Promise<Position> {
  if (isReachable(start, goal)) return goal;
  let result: Position = { lat: NaN, lng: NaN };
  let minCost = Number.MAX_VALUE;
  for (const i in [...Array(maxAttenpts)]) {
    const p = randomPosition(start, goal);
    const c = calculateCost(p, start, goal);
    if (0 <= c && c < minCost) {
      result = p;
      minCost = c;
    }
  }
  if (minCost === Number.MAX_VALUE) result = goal;
  return result;
}

export { notAstar };
