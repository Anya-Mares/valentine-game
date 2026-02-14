import kaboom from "kaboom"

import { createPlayer } from "./player"
import { setupCats } from "./cat"
import { setupEnemies } from "./enemy"
import { LAYERS } from "./layers"

export function initGame(
  canvas: HTMLCanvasElement,
  onGameEnd: () => void
) {

  const k = kaboom({
    canvas,
    width: 800,
    height: 600,
    background: [30, 30, 30],
    crisp: true,
  })

  k.setGravity(2000)

  let score = 0
  let gameState: "playing" | "win" = "playing"

  const MAX_SCORE = 100

  // =============================
  // 📦 Load assets
  // =============================
  async function loadAssets() {
    await Promise.all([
      k.loadSprite("pug", "/assets/pug.png"),
      k.loadSprite("pug2", "/assets/pug2.png"),

      k.loadSprite("cat1", "/assets/catr1.png"),
      k.loadSprite("cat2", "/assets/catc2.png"),
      k.loadSprite("cat3", "/assets/catr3.png"),
      k.loadSprite("cat4", "/assets/catc4.png"),

      k.loadSprite("enemy1", "/assets/enemyChat.png"),
      k.loadSprite("enemy2", "/assets/enemyMune.png"),
    ])
  }

  // =============================
  // 🚀 Start game
  // =============================
  loadAssets().then(() => {

    // Score UI
    const scoreText = k.add([
      k.text("Score: 0", { size: 26 }),
      k.pos(20, 20),
      k.fixed(),
      k.z(LAYERS.UI),
    ])

    // Invisible floor
    k.add([
      k.rect(800, 10),
      k.pos(400, 600),
      k.anchor("bot"),
      k.area(),
      k.body({ isStatic: true }),
      k.opacity(0),
      "floor",
    ])

    // Player
    const player = createPlayer(
      k,
      () => gameState === "playing"
    )

    // Cats
    setupCats(k, {
      getScore: () => score,

      onCatch: () => {
        if (gameState !== "playing") return

        score += 5
        scoreText.text = `Score: ${score}`

        if (score >= MAX_SCORE) {
          win(player)
        }
      },

      isPlaying: () => gameState === "playing",
    })

    // Enemies
    setupEnemies(k, {
      getScore: () => score,

      onHit: () => {
        if (gameState !== "playing") return

        score = Math.max(0, score - 15)
        scoreText.text = `Score: ${score}`
      },

      isPlaying: () => gameState === "playing",
    })
  })

  // =============================
  // 🏆 WIN STATE
  // =============================
  function win(player: any) {

    if (gameState === "win") return

    gameState = "win"

    // 🧹 Limpiar entidades
    k.destroyAll("cat")
    k.destroyAll("enemy")

    // 🐶 Cambiar sprite
    player.use(k.sprite("pug2"))
    // Reset scale al ganar
  const base =
  player.baseScale
    ? player.baseScale.clone()
    : player.scale.clone()

player.scale = base.clone()

// ✨ Mini animación victoria (RELATIVA)
player.scale = k.vec2(
  base.x * 1.2,
  base.y * 1.2
)

k.tween(
  player.scale,
  base,
  0.3,
  (p) => (player.scale = p),
  k.easings.easeOutElastic
)

    // 🏆 Texto win
    const winText = k.add([
      k.text("Guau Guau YOU WIN ❤️", { size: 40 }),
      k.pos(400, 200),
      k.anchor("center"),
      k.z(LAYERS.UI),
      k.opacity(0),
    ])

    // Fade in
    k.tween(
      0,
      1,
      0.6,
      (o) => (winText.opacity = o),
      k.easings.easeOutQuad
    )

    // 🎬 End callback
    k.wait(1.8, () => {
      onGameEnd()
    })
  }

  // =============================
  // 🧹 Cleanup
  // =============================
  return () => {
    k.destroyAll("cat")
    k.destroyAll("enemy")
    k.destroyAll("player")
    k.destroyAll("floor")
  }
}


