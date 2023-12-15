var runLevels = function (window) {
  window.opspark = window.opspark || {};

  var draw = window.opspark.draw;
  var createjs = window.createjs;
  let currentLevel = 0;

  window.opspark.runLevelInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game
    var levelData = window.opspark.levelData;

    // set this to true or false depending on if you want to see hitzones
    game.setDebugMode(true);

    // TODOs 5 through 11 go here
    // BEGIN EDITING YOUR CODE HERE
    function createSawBlade(x, y) {
      var hitZoneSize = 25;
      var damageFromObstacle = 10;
      var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
      sawBladeHitZone.x = x;
      sawBladeHitZone.y = y;
      game.addGameItem(sawBladeHitZone);
      var obstacleImage = draw.bitmap("img/sawblade.png");
      sawBladeHitZone.addChild(obstacleImage);
      obstacleImage.x = -25
      obstacleImage.y = -25
    }
    createSawBlade(400, 400);
    createSawBlade(300, 300);
    createSawBlade(500, 500);

    function createEnemy(x, y) {
      var enemy = game.createGameItem("enemy", 25);
      var redSquare = draw.rect(50, 50, "red");
      redSquare.x = -25;
      redSquare.y = -25;
      enemy.addChild(redSquare);
      enemy.x = x;
      enemy.y = y;
      game.addGameItem(enemy);
      enemy.velocityX = -1;
      enemy.onPlayerCollision = function () { game.changeIntegrity(-10) };
      enemy.onProjectileCollision = function () {
        game.increaseScore(100);
        enemy.fadeOut();
      }
    }
    createEnemy(400, groundY - 10);
    createEnemy(800, groundY - 100);
    createEnemy(1200, groundY - 50);

    function createReward(x, y) {
      var reward = game.createGameItem("reward", 25);
      var blueCircle = draw.circle(28, "blue", 28, "blue");
      blueCircle.x = -2;
      blueCircle.y = -2;
      reward.addChild(blueCircle);
      reward.x = x;
      reward.y = y;
      game.addGameItem(reward);
      reward.velocityX = -2;
      reward.onPlayerCollision = function () {
        game.increaseScore(100);
        reward.fadeOut()
      };
      reward.onProjectileCollision = function () {
        game.increaseScore(100);
        reward.fadeOut();
      }

    }
    createReward(600, groundY - 60);
    function createMarker(x,y) {
      var endmarker = game.createGameItem("endmarker", 45)
      var rect = draw.rect(100, 100, "blue");
      rect.x = -50;
      rect.y = -50;
      endmarker.addChild(rect);
      endmarker.x = x;
      endmarker.y = y;
      game.addGameItem(endmarker);
      endmarker.velocityX = -1;
      endmarker.onPlayerCollision = function () {
        startLevel()
      };
      endmarker.onProjectileCollision = function () {
        startLevel()
      }


    }
    createMarker(1500, groundY - 60);

    function startLevel() {
      // TODO 13 goes below here



      //////////////////////////////////////////////
      // DO NOT EDIT CODE BELOW HERE
      //////////////////////////////////////////////
      if (++currentLevel === levelData.length) {
        startLevel = () => {
          console.log("Congratulations!");
        };
      }
    }
    startLevel();
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = runLevels;
}
