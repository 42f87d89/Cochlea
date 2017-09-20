import kotlin.browser.window

fun main(args: Array<String>) {
    window.onload = { UI(width = 800.0, height = 500.0, timeScaling = 1.0 / 440) }
}

fun ForcedOscillation(t: Double, step: Double, h: HairCell, f: (Double) -> Double) {
    h.Acc += f(t) - h.k * h.k * h.Pos - h.c * h.Vel
    h.Vel += h.Acc * step
    h.Pos += h.Vel * step
}
