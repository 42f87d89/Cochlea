if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'Cochlea'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'Cochlea'.");
}
var Cochlea = function (_, Kotlin) {
  'use strict';
  var IntRange = Kotlin.kotlin.ranges.IntRange;
  function Graph(width, height, step, horizontalScale, min, max) {
    if (min === void 0)
      min = 0.0;
    if (max === void 0)
      max = 0.0;
    this.width = width;
    this.height = height;
    this.step = step;
    this.horizontalScale = horizontalScale;
    this.min = min;
    this.max = max;
    var size = this.size;
    var array = Array(size);
    var tmp$;
    tmp$ = array.length - 1 | 0;
    for (var i = 0; i <= tmp$; i++) {
      array[i] = 0.0;
    }
    this.ringBuffer_0 = array;
    this.ringBufferStart_0 = 0;
  }
  Object.defineProperty(Graph.prototype, 'verticalScale', {
    get: function () {
      return this.height / (Math.abs(this.min) + Math.abs(this.max));
    }
  });
  Object.defineProperty(Graph.prototype, 'middle', {
    get: function () {
      return (this.min + this.max) / 2;
    }
  });
  Object.defineProperty(Graph.prototype, 'size', {
    get: function () {
      return this.horizontalScale / this.step | 0;
    }
  });
  Graph.prototype.push_14dthe$ = function (value) {
    if (this.max < value) {
      this.max = value;
    }
     else if (this.min > value) {
      this.min = value;
    }
    if (this.ringBufferStart_0 === this.ringBuffer_0.length) {
      this.ringBufferStart_0 = 0;
    }
    this.ringBuffer_0[this.ringBufferStart_0] = value;
    this.ringBufferStart_0 = this.ringBufferStart_0 + 1 | 0;
  };
  Graph.prototype.get_za3lpa$ = function (index) {
    return this.ringBuffer_0[(index + this.ringBufferStart_0 | 0) % this.ringBuffer_0.length];
  };
  Graph.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Graph',
    interfaces: []
  };
  function HairCell(k, c, Acc, Vel, Pos) {
    if (k === void 0)
      k = 1.0;
    if (c === void 0)
      c = 0.0;
    if (Acc === void 0)
      Acc = 0.0;
    if (Vel === void 0)
      Vel = 0.0;
    if (Pos === void 0)
      Pos = 0.0;
    this.k = k;
    this.c = c;
    this.Acc = Acc;
    this.Vel = Vel;
    this.Pos = Pos;
  }
  HairCell.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'HairCell',
    interfaces: []
  };
  HairCell.prototype.component1 = function () {
    return this.k;
  };
  HairCell.prototype.component2 = function () {
    return this.c;
  };
  HairCell.prototype.component3 = function () {
    return this.Acc;
  };
  HairCell.prototype.component4 = function () {
    return this.Vel;
  };
  HairCell.prototype.component5 = function () {
    return this.Pos;
  };
  HairCell.prototype.copy_1lq62i$ = function (k, c, Acc, Vel, Pos) {
    return new HairCell(k === void 0 ? this.k : k, c === void 0 ? this.c : c, Acc === void 0 ? this.Acc : Acc, Vel === void 0 ? this.Vel : Vel, Pos === void 0 ? this.Pos : Pos);
  };
  HairCell.prototype.toString = function () {
    return 'HairCell(k=' + Kotlin.toString(this.k) + (', c=' + Kotlin.toString(this.c)) + (', Acc=' + Kotlin.toString(this.Acc)) + (', Vel=' + Kotlin.toString(this.Vel)) + (', Pos=' + Kotlin.toString(this.Pos)) + ')';
  };
  HairCell.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.k) | 0;
    result = result * 31 + Kotlin.hashCode(this.c) | 0;
    result = result * 31 + Kotlin.hashCode(this.Acc) | 0;
    result = result * 31 + Kotlin.hashCode(this.Vel) | 0;
    result = result * 31 + Kotlin.hashCode(this.Pos) | 0;
    return result;
  };
  HairCell.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.k, other.k) && Kotlin.equals(this.c, other.c) && Kotlin.equals(this.Acc, other.Acc) && Kotlin.equals(this.Vel, other.Vel) && Kotlin.equals(this.Pos, other.Pos)))));
  };
  function main$lambda(it) {
    return new UI(void 0, 800.0, 500.0, void 0, 1.0 / 440);
  }
  function main(args) {
    window.onload = main$lambda;
  }
  function ForcedOscillation(t, step, h, f) {
    h.Acc = h.Acc + (f(t) - h.k * h.k * h.Pos - h.c * h.Vel);
    h.Vel = h.Vel + h.Acc * step;
    h.Pos = h.Pos + h.Vel * step;
  }
  function UI(t, width, height, frameRate, timeScaling) {
    if (t === void 0)
      t = 0.0;
    if (frameRate === void 0)
      frameRate = 1000.0 / 60;
    this.t = t;
    this.width = width;
    this.height = height;
    this.frameRate = frameRate;
    this.timeScaling = timeScaling;
    this.context_0 = null;
    this.graph1_0 = new Graph(800.0, 100.0, this.frameRate * this.timeScaling, 100.0);
    this.graph2_0 = new Graph(800.0, 100.0, this.frameRate * this.timeScaling, 100.0);
    var tmp$, tmp$_0, tmp$_1;
    var canvas = Kotlin.isType(tmp$ = document.createElement('canvas'), HTMLCanvasElement) ? tmp$ : Kotlin.throwCCE();
    this.context_0 = Kotlin.isType(tmp$_0 = canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$_0 : Kotlin.throwCCE();
    this.context_0.canvas.width = this.width | 0;
    this.context_0.canvas.height = this.height | 0;
    ((tmp$_1 = document.body) != null ? tmp$_1 : Kotlin.throwNPE()).appendChild(canvas);
    var hairCell = new HairCell(1.5, 0.9);
    window.setInterval(UI_init$lambda(hairCell, this), this.frameRate | 0);
  }
  UI.prototype.animate_2wjigo$ = function (hairCell, oscForce) {
    this.context_0.clearRect(0.0, 0.0, this.width, this.height);
    this.graph1_0.push_14dthe$(hairCell.Pos);
    this.graph2_0.push_14dthe$(oscForce(this.t));
    this.context_0.strokeStyle = '#000';
    this.drawGraph_hios42$(this.graph1_0, 0.0, 0.0);
    this.context_0.strokeStyle = '#f00';
    this.drawGraph_hios42$(this.graph2_0, 0.0, 0.0);
    ForcedOscillation(this.t, this.frameRate * this.timeScaling, hairCell, oscForce);
    this.t += this.frameRate * this.timeScaling;
  };
  UI.prototype.drawGraph_hios42$ = function (graph, x, y) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2;
    var path = new Path2D();
    path.moveTo(x, y + graph.get_za3lpa$(0) * graph.verticalScale + graph.height / 2 - graph.middle);
    tmp$ = new IntRange(1, graph.size - 1 | 0);
    tmp$_0 = tmp$.first;
    tmp$_1 = tmp$.last;
    tmp$_2 = tmp$.step;
    for (var i = tmp$_0; i <= tmp$_1; i += tmp$_2) {
      path.lineTo(x + i * graph.width / graph.size, y + (graph.get_za3lpa$(i) - graph.middle) * graph.verticalScale + graph.height / 2);
    }
    this.context_0.stroke(path);
  };
  function UI_init$lambda$lambda(x) {
    return Math.sin(x) / 5;
  }
  function UI_init$lambda(closure$hairCell, this$UI) {
    return function () {
      this$UI.animate_2wjigo$(closure$hairCell, UI_init$lambda$lambda);
    };
  }
  UI.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'UI',
    interfaces: []
  };
  _.Graph = Graph;
  _.HairCell = HairCell;
  _.main_kand9s$ = main;
  _.ForcedOscillation_y6y9nw$ = ForcedOscillation;
  _.UI = UI;
  main([]);
  Kotlin.defineModule('Cochlea', _);
  return _;
}(typeof Cochlea === 'undefined' ? {} : Cochlea, kotlin);
