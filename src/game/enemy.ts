import { LAYERS } from "./layers"
import { getDifficulty } from "./difficulty"

import {
  enemyDeathEffect,
  freezeFrame,
  playerStretch,
} from "./effects"

export function setupEnemies(
  k: any,
  {
    getScore,
    onHit,
    isPlaying,
  }: {
    getScore: () => number
    onHit: () => void
    isPlaying: () => boolean
  }
) {

  function spawnEnemy() {
    if (!isPlaying()) return

    const fromLeft = Math.random() > 0.5
    const dir = fromLeft ? 1 : -1

    const enemy = k.add([
      k.sprite(k.choose(["enemy1", "enemy2"])),
      k.pos(fromLeft ? -80 : 880, 590),
      k.anchor("bot"),
      k.scale(0.19),
      k.area({
        shape: new k.Rect(
          k.vec2(-25, -75),
          50,
          75
        ),
      }),
      k.z(LAYERS.ENEMY),
      "enemy",
    ])

    enemy.onUpdate(() => {
      const diff = getDifficulty(getScore())
      enemy.move(diff.enemySpeed * dir, 0)

      if (enemy.pos.x < -120 || enemy.pos.x > 920) {
        enemy.destroy()
      }
    })

    enemy.onCollide("player", (player: any) => {
      if (!isPlaying()) return

      // 🐶 Lo pisa desde arriba
   const isAbove =
  player.pos.y < enemy.pos.y - 10

if (isAbove && player.vel.y >= 0) {

        // ❄ Freeze frame (impacto)
        freezeFrame(k, 0.06)

        // 💥 Explosión
        enemyDeathEffect(k, enemy.pos, LAYERS.UI)

        // 🐶 Stretch rebote
        playerStretch(k, player)

        enemy.destroy()

        // Rebote
        player.jump(350)

        return
      }

      // 💢 Golpe lateral
      enemy.destroy()
      onHit()
    })
  }

  // Spawn loop
  k.loop(4, () => {
    if (!isPlaying()) return
    if (getScore() >= 20) {
      spawnEnemy()
    }
  })
}
