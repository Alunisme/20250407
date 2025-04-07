let stars = [];

function setup() {
  // 產生一個全視窗的畫布
  createCanvas(windowWidth, windowHeight);
  // 設定背景顏色
  background("#00E3E3");

  // 產生60顆星星
  for (let i = 0; i < 60; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(10, 80),
      color: color(random(255), random(255), random(255)),
      angle: random(TWO_PI)
    });
  }
}

function draw() {
  // 清除畫布並重設背景
  background("#00E3E3");

  // 計算滑鼠影響的大小變化
  let sizeOffset = map(mouseX, 0, width, 20, 80);

  // 繪製每顆星星
  for (let i = 0; i < stars.length; i++) {
    let star = stars[i];

    // 動態更新顏色，使用 sin 函式讓顏色隨時間變化
    let r = map(sin(frameCount * 0.02 + i), -1, 1, 100, 255);
    let g = map(sin(frameCount * 0.03 + i), -1, 1, 100, 255);
    let b = map(sin(frameCount * 0.04 + i), -1, 1, 100, 255);
    star.color = color(r, g, b);

    push();
    translate(star.x, star.y);
    rotate(star.angle);
    fill(star.color);
    noStroke();
    let currentSize = star.size + sizeOffset;
    drawStar(0, 0, currentSize / 2, currentSize, 5);
    pop();

    // 讓星星順時鐘旋轉
    star.angle += 0.01;
  }
}

// 繪製星星的函式
function drawStar(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
