import { LAYERS } from "./layers"
import { getDifficulty } from "./difficulty"
import { catCatchEffect, playerSquash } from "./effects"

export function setupCats(
  k: any,
  {
    getScore,
    onCatch,
    isPlaying,
  }: {
    getScore: () => number
    onCatch: () => void
    isPlaying: () => boolean
  }
) {

  const cats = ["cat1", "cat2", "cat3", "cat4"]

  function spawnCat() {
    if (!isPlaying()) return

    const cat = k.add([
      k.sprite(k.choose(cats)),
      k.pos(k.rand(80, 720), -40),
      k.anchor("bot"),
      k.scale(0.12),
      k.area({
        shape: new k.Rect(
          k.vec2(-18, -50),
          36,
          50
        ),
      }),
      k.z(LAYERS.CAT),
      "cat",
    ])

    cat.onUpdate(() => {
      const diff = getDifficulty(getScore())
      cat.move(0, diff.catSpeed)

      if (cat.pos.y > 640) {
        cat.destroy()
      }
    })

    cat.onCollide("player", (player: any) => {
      if (!isPlaying()) return

      // ✨ Efecto visual centralizado
      catCatchEffect(k, cat.pos, LAYERS.UI)

      // 🐶 Micro squash del pug (game feel)
      playerSquash(k, player)

      cat.destroy()
      onCatch()
    })
  }

  // Spawn loop
  k.loop(1, () => {
    if (!isPlaying()) return
    spawnCat()
  })
}
