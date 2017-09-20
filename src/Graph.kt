import kotlin.js.Math

class Graph(
        val width: Double,
        val height: Double,
        val step: Double,
        val horizontalScale: Double,
        var min: Double = 0.0,
        var max: Double = 0.0) {

    val verticalScale get() = height / (Math.abs(min) + Math.abs(max))
    val middle get() = (min + max) / 2
    val size get() = (horizontalScale / step).toInt()

    private val ringBuffer = Array<Double>(size, { 0.0 })
    private var ringBufferStart = 0

    fun push(value: Double) {
        if (max < value) {
            max = value
        } else if (min > value) {
            min = value
        }

        if (ringBufferStart == ringBuffer.size) {
            ringBufferStart = 0
        }
        ringBuffer[ringBufferStart] = value
        ringBufferStart++
    }

    fun get(index: Int): Double {
        return ringBuffer[(index + ringBufferStart) % ringBuffer.size]
    }
}