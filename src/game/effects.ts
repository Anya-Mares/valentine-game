// effects.ts


// ======================================
// 💥 EFECTO: Muerte de enemigo
// ======================================
export function enemyDeathEffect(
  k: any,
  pos: any,
  z: number = 100
) {

  // Flash
  k.add([
    k.rect(40, 40),
    k.pos(pos),
    k.anchor("center"),
    k.color(255, 255, 255),
    k.opacity(0.8),
    k.z(z),
    k.lifespan(0.08),
  ])

  // Partículas
  for (let i = 0; i < 8; i++) {

    const p = k.add([
      k.circle(4),
      k.pos(pos),
      k.color(255, 200, 0),
      k.move(
        k.rand(0, 360),
        k.rand(200, 400)
      ),
      k.opacity(1),
      k.z(z),
    ])

    // Fade
    k.tween(
      1,
      0,
      0.4,
      (o: number) => (p.opacity = o)
    )

    k.wait(0.4, () => p.destroy())
  }

  // Texto
  const text = k.add([
    k.text("💥 K.O.", { size: 18 }),
    k.pos(pos),
    k.anchor("center"),
    k.move(0, -120),
    k.opacity(1),
    k.z(z),
  ])

  k.tween(
    1,
    0,
    0.5,
    (o: number) => (text.opacity = o)
  )

  k.wait(0.5, () => text.destroy())

  k.shake(4)
}






// ======================================
// 🐱 EFECTO: Atrapar gato
// ======================================
export function catCatchEffect(
  k: any,
  pos: any,
  z: number
) {

  // Texto +5
  const text = k.add([
    k.text("+5", { size: 20 }),
    k.pos(pos),
    k.anchor("center"),
    k.color(255, 200, 255),
    k.move(0, -60),
    k.opacity(1),
    k.z(z),
  ])

  k.tween(
    1,
    0,
    0.6,
    (o: number) => (text.opacity = o)
  )

  k.wait(0.6, () => text.destroy())

  // Partículas
  for (let i = 0; i < 6; i++) {

    const p = k.add([
      k.circle(3),
      k.pos(pos),
      k.color(255, 150, 255),
      k.move(
        k.rand(0, 360),
        k.rand(120, 250)
      ),
      k.opacity(1),
      k.z(z),
    ])

    k.tween(
      1,
      0,
      0.35,
      (o: number) => (p.opacity = o)
    )

    k.wait(0.35, () => p.destroy())
  }

  k.shake(2)
}






// ======================================
// ❄️ EFECTO: Freeze frame
// ======================================
export function freezeFrame(
  k: any,
  duration = 0.04
) {
  k.paused = true
  k.shake(2)

  k.wait(duration, () => {
    k.paused = false
  })
}








// ======================================
// 📊 EFECTO: Texto Score
// ======================================
export function showScoreEffect(
  k: any,
  value: number,
  pos: any,
  z: number
) {

  const color =
    value > 0
      ? k.rgb(0, 255, 0)
      : k.rgb(255, 80, 80)

  const sign = value > 0 ? "+" : ""

  const text = k.add([
    k.text(`${sign}${value}`, { size: 18 }),
    k.pos(pos),
    k.anchor("center"),
    k.color(color),
    k.move(0, -80),
    k.opacity(1),
    k.z(z),
  ])

  k.tween(
    1,
    0,
    0.6,
    (o: number) => (text.opacity = o)
  )

  k.wait(0.6, () => text.destroy())
}






// ======================================
// 🐶 Squash & Stretch
// ======================================
export function playerSquash(
  k: any,
  player: any
) {

  if (!player.baseScale) return

  player.scale = k.vec2(
    player.baseScale.x * 1.2,
    player.baseScale.y * 0.8
  )

  k.wait(0.1, () => {
    player.scale = player.baseScale.clone()
  })
}


export function playerStretch(
  k: any,
  player: any
) {

  if (!player.baseScale) return

  player.scale = k.vec2(
    player.baseScale.x * 0.8,
    player.baseScale.y * 1.2
  )

  k.wait(0.1, () => {
    player.scale = player.baseScale.clone()
  })
}


