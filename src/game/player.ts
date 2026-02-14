import {LAYERS} from "./layers"

export function createPlayer(k: any, isPlaying: () => boolean) {
  const player = k.add([
    k.sprite("pug"),
    k.pos(400, 560),
    k.anchor("bot"),
    k.scale(0.22),
   
    k.area({ scale:0.6}),
    k.body(),
    "player",
  ])
   player.baseScale = k.vec2(0.22, 0.22)

  k.setGravity(2000)

  const SPEED = 420

  k.onKeyDown("left", () => {
    if (!isPlaying()) return
    player.move(-SPEED, 0)
  })

  k.onKeyDown("right", () => {
    if (!isPlaying()) return
    player.move(SPEED, 0)
  })

  k.onKeyPress("space", () => {
    if (!isPlaying()) return
    if (player.isGrounded()) {
      player.jump(850)
    }
  })

  player.onUpdate(() => {
    const halfWidth = player.width * player.scale.x / 2
    player.pos.x = k.clamp(player.pos.x, halfWidth, 800 - halfWidth)
  })

  return player
}


