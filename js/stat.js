'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var XY_GAP = 10;
var MAX_BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var FONT_GAP = 15;
var chartBottomAlignOffset = CLOUD_Y + CLOUD_HEIGHT - 1 * XY_GAP - FONT_GAP;

var barLeftOffset;
var barHeight;
var numPlayers;
var chartLeftOffset;
var maxTime;


function createCloud(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
}

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

function renderTitle(ctx) {
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + XY_GAP, CLOUD_Y + 3 * XY_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + XY_GAP, CLOUD_Y + 3 * XY_GAP + FONT_GAP);
}

function renderCharts(ctx, names, times) {
  for (var i = 0; i < numPlayers; i++) {

    barLeftOffset = CLOUD_X + chartLeftOffset + i * (BAR_GAP + BAR_WIDTH);
    barHeight = MAX_BAR_HEIGHT * times[i] / maxTime;

    ctx.fillStyle = '#000';
    ctx.fillText(names[i], barLeftOffset + BAR_WIDTH / 2, chartBottomAlignOffset);
    ctx.fillText(Math.round(times[i]), barLeftOffset + BAR_WIDTH / 2, chartBottomAlignOffset - XY_GAP - barHeight - FONT_GAP);

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(240, ' + Math.round(Math.random() * 100) + '%, 50%)';
    }

    ctx.fillRect(barLeftOffset, chartBottomAlignOffset - XY_GAP - barHeight, BAR_WIDTH, barHeight);
  }
}


window.renderStatistics = function (ctx, names, times) {

  numPlayers = names.length;
  chartLeftOffset = (CLOUD_WIDTH - (numPlayers * BAR_WIDTH + (numPlayers - 1) * BAR_GAP)) / 2;

  createCloud(ctx, CLOUD_X + XY_GAP, CLOUD_Y + XY_GAP, 'rgba(0, 0, 0, 0.7)');
  createCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  renderTitle(ctx);

  maxTime = getMaxElement(times);

  ctx.textAlign = 'center';

  renderCharts(ctx, names, times);
};
