import org.w3c.dom.CanvasFillStrokeStyles
import org.w3c.dom.HTMLCanvasElement
import kotlin.browser.document
import org.w3c.dom.CanvasRenderingContext2D
import org.w3c.dom.Path2D
import kotlin.browser.window
import kotlin.js.Math

class UI(var t: Double = 0.0, val width: Double, val height: Double, val frameRate: Double = 1000.0 / 60, val timeScaling: Double) {
    private val context: CanvasRenderingContext2D
    private val graph1 = Graph(800.0, 100.0, frameRate * timeScaling, 100.0)
    private val graph2 = Graph(800.0, 100.0, frameRate * timeScaling, 100.0)

    init {
        val canvas = document.createElement("canvas") as HTMLCanvasElement
        context = canvas.getContext("2d") as CanvasRenderingContext2D
        context.canvas.width = width.toInt()
        context.canvas.height = height.toInt()
        document.body!!.appendChild(canvas)
        val hairCell = HairCell(k = 1.5, c = 0.9)
        window.setInterval({ animate(hairCell) { x -> Math.sin(x) / 5 } }, frameRate.toInt())
    }

    fun animate(hairCell: HairCell, oscForce: (Double) -> Double) {
        context.clearRect(0.0, 0.0, width, height)
        graph1.push(hairCell.Pos)
        graph2.push(oscForce(t))
        context.strokeStyle = "#000"
        drawGraph(graph1, 0.0, 0.0)
        context.strokeStyle = "#f00"
        drawGraph(graph2, 0.0, 0.0)
        ForcedOscillation(t, frameRate * timeScaling, hairCell, oscForce)
        t += frameRate * timeScaling
    }

    fun drawGraph(graph: Graph, x: Double, y: Double) {
        val path = Path2D()
        path.moveTo(x, y + graph.get(0) * graph.verticalScale + graph.height / 2 - graph.middle)
        for (i in IntRange(1, graph.size - 1)) {
            path.lineTo(
                    x + i.toDouble() * graph.width / graph.size,
                    y + (graph.get(i) - graph.middle) * graph.verticalScale + graph.height / 2)
        }
        context.stroke(path)
    }
}

