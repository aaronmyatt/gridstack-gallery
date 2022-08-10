var S = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, et = {}, j = {}, E = {};
Object.defineProperty(E, "__esModule", { value: !0 });
E.Utils = E.obsoleteAttr = E.obsoleteOptsDel = E.obsoleteOpts = E.obsolete = void 0;
function at(d, t, e, i, s) {
  let l = (...o) => (console.warn("gridstack.js: Function `" + e + "` is deprecated in " + s + " and has been replaced with `" + i + "`. It will be **completely** removed in v1.0"), t.apply(d, o));
  return l.prototype = t.prototype, l;
}
E.obsolete = at;
function ht(d, t, e, i) {
  d[t] !== void 0 && (d[e] = d[t], console.warn("gridstack.js: Option `" + t + "` is deprecated in " + i + " and has been replaced with `" + e + "`. It will be **completely** removed in v1.0"));
}
E.obsoleteOpts = ht;
function dt(d, t, e, i) {
  d[t] !== void 0 && console.warn("gridstack.js: Option `" + t + "` is deprecated in " + e + i);
}
E.obsoleteOptsDel = dt;
function gt(d, t, e, i) {
  let s = d.getAttribute(t);
  s !== null && (d.setAttribute(e, s), console.warn("gridstack.js: attribute `" + t + "`=" + s + " is deprecated on this object in " + i + " and has been replaced with `" + e + "`. It will be **completely** removed in v1.0"));
}
E.obsoleteAttr = gt;
class I {
  static getElements(t) {
    if (typeof t == "string") {
      let e = document.querySelectorAll(t);
      return !e.length && t[0] !== "." && t[0] !== "#" && (e = document.querySelectorAll("." + t), e.length || (e = document.querySelectorAll("#" + t))), Array.from(e);
    }
    return [t];
  }
  static getElement(t) {
    if (typeof t == "string") {
      if (!t.length)
        return null;
      if (t[0] === "#")
        return document.getElementById(t.substring(1));
      if (t[0] === "." || t[0] === "[")
        return document.querySelector(t);
      if (!isNaN(+t[0]))
        return document.getElementById(t);
      let e = document.querySelector(t);
      return e || (e = document.getElementById(t)), e || (e = document.querySelector("." + t)), e;
    }
    return t;
  }
  static isIntercepted(t, e) {
    return !(t.y >= e.y + e.h || t.y + t.h <= e.y || t.x + t.w <= e.x || t.x >= e.x + e.w);
  }
  static isTouching(t, e) {
    return I.isIntercepted(t, { x: e.x - 0.5, y: e.y - 0.5, w: e.w + 1, h: e.h + 1 });
  }
  static sort(t, e, i) {
    return i = i || t.reduce((s, l) => Math.max(l.x + l.w, s), 0) || 12, e === -1 ? t.sort((s, l) => l.x + l.y * i - (s.x + s.y * i)) : t.sort((s, l) => s.x + s.y * i - (l.x + l.y * i));
  }
  static createStylesheet(t, e) {
    let i = document.createElement("style");
    return i.setAttribute("type", "text/css"), i.setAttribute("gs-style-id", t), i.styleSheet ? i.styleSheet.cssText = "" : i.appendChild(document.createTextNode("")), e ? e.insertBefore(i, e.firstChild) : (e = document.getElementsByTagName("head")[0], e.appendChild(i)), i.sheet;
  }
  static removeStylesheet(t) {
    let e = document.querySelector("STYLE[gs-style-id=" + t + "]");
    e && e.parentNode && e.remove();
  }
  static addCSSRule(t, e, i) {
    typeof t.addRule == "function" ? t.addRule(e, i) : typeof t.insertRule == "function" && t.insertRule(`${e}{${i}}`);
  }
  static toBool(t) {
    return typeof t == "boolean" ? t : typeof t == "string" ? (t = t.toLowerCase(), !(t === "" || t === "no" || t === "false" || t === "0")) : Boolean(t);
  }
  static toNumber(t) {
    return t === null || t.length === 0 ? void 0 : Number(t);
  }
  static parseHeight(t) {
    let e, i = "px";
    if (typeof t == "string") {
      let s = t.match(/^(-[0-9]+\.[0-9]+|[0-9]*\.[0-9]+|-[0-9]+|[0-9]+)(px|em|rem|vh|vw|%)?$/);
      if (!s)
        throw new Error("Invalid height");
      i = s[2] || "px", e = parseFloat(s[1]);
    } else
      e = t;
    return { h: e, unit: i };
  }
  static defaults(t, ...e) {
    return e.forEach((i) => {
      for (const s in i) {
        if (!i.hasOwnProperty(s))
          return;
        t[s] === null || t[s] === void 0 ? t[s] = i[s] : typeof i[s] == "object" && typeof t[s] == "object" && this.defaults(t[s], i[s]);
      }
    }), t;
  }
  static same(t, e) {
    if (typeof t != "object")
      return t == e;
    if (typeof t != typeof e || Object.keys(t).length !== Object.keys(e).length)
      return !1;
    for (const i in t)
      if (t[i] !== e[i])
        return !1;
    return !0;
  }
  static copyPos(t, e, i = !1) {
    return t.x = e.x, t.y = e.y, t.w = e.w, t.h = e.h, i && (e.minW && (t.minW = e.minW), e.minH && (t.minH = e.minH), e.maxW && (t.maxW = e.maxW), e.maxH && (t.maxH = e.maxH)), t;
  }
  static samePos(t, e) {
    return t && e && t.x === e.x && t.y === e.y && t.w === e.w && t.h === e.h;
  }
  static removeInternalAndSame(t, e) {
    if (!(typeof t != "object" || typeof e != "object"))
      for (let i in t) {
        let s = t[i];
        if (i[0] === "_" || s === e[i])
          delete t[i];
        else if (s && typeof s == "object" && e[i] !== void 0) {
          for (let l in s)
            (s[l] === e[i][l] || l[0] === "_") && delete s[l];
          Object.keys(s).length || delete t[i];
        }
      }
  }
  static closestByClass(t, e) {
    for (; t; ) {
      if (t.classList.contains(e))
        return t;
      t = t.parentElement;
    }
    return null;
  }
  static throttle(t, e) {
    let i = !1;
    return (...s) => {
      i || (i = !0, setTimeout(() => {
        t(...s), i = !1;
      }, e));
    };
  }
  static removePositioningStyles(t) {
    let e = t.style;
    e.position && e.removeProperty("position"), e.left && e.removeProperty("left"), e.top && e.removeProperty("top"), e.width && e.removeProperty("width"), e.height && e.removeProperty("height");
  }
  static getScrollElement(t) {
    if (!t)
      return document.scrollingElement || document.documentElement;
    const e = getComputedStyle(t);
    return /(auto|scroll)/.test(e.overflow + e.overflowY) ? t : this.getScrollElement(t.parentElement);
  }
  static updateScrollPosition(t, e, i) {
    let s = t.getBoundingClientRect(), l = window.innerHeight || document.documentElement.clientHeight;
    if (s.top < 0 || s.bottom > l) {
      let o = s.bottom - l, p = s.top, g = this.getScrollElement(t);
      if (g !== null) {
        let r = g.scrollTop;
        s.top < 0 && i < 0 ? t.offsetHeight > l ? g.scrollTop += i : g.scrollTop += Math.abs(p) > Math.abs(i) ? i : p : i > 0 && (t.offsetHeight > l ? g.scrollTop += i : g.scrollTop += o > i ? i : o), e.top += g.scrollTop - r;
      }
    }
  }
  static updateScrollResize(t, e, i) {
    const s = this.getScrollElement(e), l = s.clientHeight, o = s === this.getScrollElement() ? 0 : s.getBoundingClientRect().top, p = t.clientY - o, g = p < i, r = p > l - i;
    g ? s.scrollBy({ behavior: "smooth", top: p - i }) : r && s.scrollBy({ behavior: "smooth", top: i - (l - p) });
  }
  static clone(t) {
    return t == null || typeof t != "object" ? t : t instanceof Array ? [...t] : Object.assign({}, t);
  }
  static cloneDeep(t) {
    const e = I.clone(t);
    for (const i in e)
      e.hasOwnProperty(i) && typeof e[i] == "object" && i.substring(0, 2) !== "__" && !ut.find((s) => s === i) && (e[i] = I.cloneDeep(t[i]));
    return e;
  }
}
E.Utils = I;
const ut = ["_isNested", "el", "grid", "subGrid", "engine"];
Object.defineProperty(j, "__esModule", { value: !0 });
j.GridStackEngine = void 0;
const v = E;
class N {
  constructor(t = {}) {
    this.addedNodes = [], this.removedNodes = [], this.column = t.column || 12, this.maxRow = t.maxRow, this._float = t.float, this.nodes = t.nodes || [], this.onChange = t.onChange;
  }
  batchUpdate() {
    return this.batchMode ? this : (this.batchMode = !0, this._prevFloat = this._float, this._float = !0, this.saveInitial());
  }
  commit() {
    return this.batchMode ? (this.batchMode = !1, this._float = this._prevFloat, delete this._prevFloat, this._packNodes()._notify()) : this;
  }
  _useEntireRowArea(t, e) {
    return !this.float && !this._hasLocked && (!t._moving || t._skipDown || e.y <= t.y);
  }
  _fixCollisions(t, e = t, i, s = {}) {
    if (this.sortNodes(-1), i = i || this.collide(t, e), !i)
      return !1;
    if (t._moving && !s.nested && !this.float && this.swap(t, i))
      return !0;
    let l = e;
    this._useEntireRowArea(t, e) && (l = { x: 0, w: this.column, y: e.y, h: e.h }, i = this.collide(t, l, s.skip));
    let o = !1, p = { nested: !0, pack: !1 };
    for (; i = i || this.collide(t, l, s.skip); ) {
      let g;
      if (i.locked || t._moving && !t._skipDown && e.y > t.y && !this.float && (!this.collide(i, Object.assign(Object.assign({}, i), { y: t.y }), t) || !this.collide(i, Object.assign(Object.assign({}, i), { y: e.y - i.h }), t)) ? (t._skipDown = t._skipDown || e.y > t.y, g = this.moveNode(t, Object.assign(Object.assign(Object.assign({}, e), { y: i.y + i.h }), p)), i.locked && g ? v.Utils.copyPos(e, t) : !i.locked && g && s.pack && (this._packNodes(), e.y = i.y + i.h, v.Utils.copyPos(t, e)), o = o || g) : g = this.moveNode(i, Object.assign(Object.assign(Object.assign({}, i), { y: e.y + e.h, skip: t }), p)), !g)
        return o;
      i = void 0;
    }
    return o;
  }
  collide(t, e = t, i) {
    return this.nodes.find((s) => s !== t && s !== i && v.Utils.isIntercepted(s, e));
  }
  collideAll(t, e = t, i) {
    return this.nodes.filter((s) => s !== t && s !== i && v.Utils.isIntercepted(s, e));
  }
  collideCoverage(t, e, i) {
    if (!e.rect || !t._rect)
      return;
    let s = t._rect, l = Object.assign({}, e.rect);
    l.y > s.y ? (l.h += l.y - s.y, l.y = s.y) : l.h += s.y - l.y, l.x > s.x ? (l.w += l.x - s.x, l.x = s.x) : l.w += s.x - l.x;
    let o;
    return i.forEach((p) => {
      if (p.locked || !p._rect)
        return;
      let g = p._rect, r = Number.MAX_VALUE, n = Number.MAX_VALUE, a = 0.5;
      s.y < g.y ? r = (l.y + l.h - g.y) / g.h : s.y + s.h > g.y + g.h && (r = (g.y + g.h - l.y) / g.h), s.x < g.x ? n = (l.x + l.w - g.x) / g.w : s.x + s.w > g.x + g.w && (n = (g.x + g.w - l.x) / g.w);
      let h = Math.min(n, r);
      h > a && (a = h, o = p);
    }), o;
  }
  cacheRects(t, e, i, s, l, o) {
    return this.nodes.forEach((p) => p._rect = {
      y: p.y * e + i,
      x: p.x * t + o,
      w: p.w * t - o - s,
      h: p.h * e - i - l
    }), this;
  }
  swap(t, e) {
    if (!e || e.locked || !t || t.locked)
      return !1;
    function i() {
      let l = e.x, o = e.y;
      return e.x = t.x, e.y = t.y, t.h != e.h ? (t.x = l, t.y = e.y + e.h) : t.w != e.w ? (t.x = e.x + e.w, t.y = o) : (t.x = l, t.y = o), t._dirty = e._dirty = !0, !0;
    }
    let s;
    if (t.w === e.w && t.h === e.h && (t.x === e.x || t.y === e.y) && (s = v.Utils.isTouching(t, e)))
      return i();
    if (s !== !1) {
      if (t.w === e.w && t.x === e.x && (s || (s = v.Utils.isTouching(t, e)))) {
        if (e.y < t.y) {
          let l = t;
          t = e, e = l;
        }
        return i();
      }
      if (s !== !1) {
        if (t.h === e.h && t.y === e.y && (s || (s = v.Utils.isTouching(t, e)))) {
          if (e.x < t.x) {
            let l = t;
            t = e, e = l;
          }
          return i();
        }
        return !1;
      }
    }
  }
  isAreaEmpty(t, e, i, s) {
    let l = { x: t || 0, y: e || 0, w: i || 1, h: s || 1 };
    return !this.collide(l);
  }
  compact() {
    if (this.nodes.length === 0)
      return this;
    this.batchUpdate().sortNodes();
    let t = this.nodes;
    return this.nodes = [], t.forEach((e) => {
      e.locked || (e.autoPosition = !0), this.addNode(e, !1), e._dirty = !0;
    }), this.commit();
  }
  set float(t) {
    this._float !== t && (this._float = t || !1, t || this._packNodes()._notify());
  }
  get float() {
    return this._float || !1;
  }
  sortNodes(t) {
    return this.nodes = v.Utils.sort(this.nodes, t, this.column), this;
  }
  _packNodes() {
    return this.batchMode ? this : (this.sortNodes(), this.float ? this.nodes.forEach((t) => {
      if (t._updating || t._orig === void 0 || t.y === t._orig.y)
        return;
      let e = t.y;
      for (; e > t._orig.y; )
        --e, this.collide(t, { x: t.x, y: e, w: t.w, h: t.h }) || (t._dirty = !0, t.y = e);
    }) : this.nodes.forEach((t, e) => {
      if (!t.locked)
        for (; t.y > 0; ) {
          let i = e === 0 ? 0 : t.y - 1;
          if (!(e === 0 || !this.collide(t, { x: t.x, y: i, w: t.w, h: t.h })))
            break;
          t._dirty = t.y !== i, t.y = i;
        }
    }), this);
  }
  prepareNode(t, e) {
    t = t || {}, t._id = t._id || N._idSeq++, (t.x === void 0 || t.y === void 0 || t.x === null || t.y === null) && (t.autoPosition = !0);
    let i = { x: 0, y: 0, w: 1, h: 1 };
    return v.Utils.defaults(t, i), t.autoPosition || delete t.autoPosition, t.noResize || delete t.noResize, t.noMove || delete t.noMove, typeof t.x == "string" && (t.x = Number(t.x)), typeof t.y == "string" && (t.y = Number(t.y)), typeof t.w == "string" && (t.w = Number(t.w)), typeof t.h == "string" && (t.h = Number(t.h)), isNaN(t.x) && (t.x = i.x, t.autoPosition = !0), isNaN(t.y) && (t.y = i.y, t.autoPosition = !0), isNaN(t.w) && (t.w = i.w), isNaN(t.h) && (t.h = i.h), this.nodeBoundFix(t, e);
  }
  nodeBoundFix(t, e) {
    let i = t._orig || v.Utils.copyPos({}, t);
    return t.maxW && (t.w = Math.min(t.w, t.maxW)), t.maxH && (t.h = Math.min(t.h, t.maxH)), t.minW && t.minW <= this.column && (t.w = Math.max(t.w, t.minW)), t.minH && (t.h = Math.max(t.h, t.minH)), t.w > this.column ? (this.column < 12 && !this._inColumnResize && (t.w = Math.min(12, t.w), this.cacheOneLayout(t, 12)), t.w = this.column) : t.w < 1 && (t.w = 1), this.maxRow && t.h > this.maxRow ? t.h = this.maxRow : t.h < 1 && (t.h = 1), t.x < 0 && (t.x = 0), t.y < 0 && (t.y = 0), t.x + t.w > this.column && (e ? t.w = this.column - t.x : t.x = this.column - t.w), this.maxRow && t.y + t.h > this.maxRow && (e ? t.h = this.maxRow - t.y : t.y = this.maxRow - t.h), v.Utils.samePos(t, i) || (t._dirty = !0), t;
  }
  getDirtyNodes(t) {
    return t ? this.nodes.filter((e) => e._dirty && !v.Utils.samePos(e, e._orig)) : this.nodes.filter((e) => e._dirty);
  }
  _notify(t) {
    if (this.batchMode || !this.onChange)
      return this;
    let e = (t || []).concat(this.getDirtyNodes());
    return this.onChange(e), this;
  }
  cleanNodes() {
    return this.batchMode ? this : (this.nodes.forEach((t) => {
      delete t._dirty, delete t._lastTried;
    }), this);
  }
  saveInitial() {
    return this.nodes.forEach((t) => {
      t._orig = v.Utils.copyPos({}, t), delete t._dirty;
    }), this._hasLocked = this.nodes.some((t) => t.locked), this;
  }
  restoreInitial() {
    return this.nodes.forEach((t) => {
      v.Utils.samePos(t, t._orig) || (v.Utils.copyPos(t, t._orig), t._dirty = !0);
    }), this._notify(), this;
  }
  addNode(t, e = !1) {
    let i = this.nodes.find((s) => s._id === t._id);
    if (i)
      return i;
    if (t = this._inColumnResize ? this.nodeBoundFix(t) : this.prepareNode(t), delete t._temporaryRemoved, delete t._removeDOM, t.autoPosition) {
      this.sortNodes();
      for (let s = 0; ; ++s) {
        let l = s % this.column, o = Math.floor(s / this.column);
        if (l + t.w > this.column)
          continue;
        let p = { x: l, y: o, w: t.w, h: t.h };
        if (!this.nodes.find((g) => v.Utils.isIntercepted(p, g))) {
          t.x = l, t.y = o, delete t.autoPosition;
          break;
        }
      }
    }
    return this.nodes.push(t), e && this.addedNodes.push(t), this._fixCollisions(t), this.batchMode || this._packNodes()._notify(), t;
  }
  removeNode(t, e = !0, i = !1) {
    return this.nodes.find((s) => s === t) ? (i && this.removedNodes.push(t), e && (t._removeDOM = !0), this.nodes = this.nodes.filter((s) => s !== t), this._packNodes()._notify([t])) : this;
  }
  removeAll(t = !0) {
    return delete this._layouts, this.nodes.length === 0 ? this : (t && this.nodes.forEach((e) => e._removeDOM = !0), this.removedNodes = this.nodes, this.nodes = [], this._notify(this.removedNodes));
  }
  moveNodeCheck(t, e) {
    if (!this.changedPosConstrain(t, e))
      return !1;
    if (e.pack = !0, !this.maxRow)
      return this.moveNode(t, e);
    let i, s = new N({
      column: this.column,
      float: this.float,
      nodes: this.nodes.map((o) => o === t ? (i = Object.assign({}, o), i) : Object.assign({}, o))
    });
    if (!i)
      return !1;
    let l = s.moveNode(i, e) && s.getRow() <= this.maxRow;
    if (!l && !e.resizing) {
      let o = this.collide(t, e);
      if (o && this.swap(t, o))
        return this._notify(), !0;
    }
    return l ? (s.nodes.filter((o) => o._dirty).forEach((o) => {
      let p = this.nodes.find((g) => g._id === o._id);
      !p || (v.Utils.copyPos(p, o), p._dirty = !0);
    }), this._notify(), !0) : !1;
  }
  willItFit(t) {
    if (delete t._willFitPos, !this.maxRow)
      return !0;
    let e = new N({
      column: this.column,
      float: this.float,
      nodes: this.nodes.map((s) => Object.assign({}, s))
    }), i = Object.assign({}, t);
    return this.cleanupNode(i), delete i.el, delete i._id, delete i.content, delete i.grid, e.addNode(i), e.getRow() <= this.maxRow ? (t._willFitPos = v.Utils.copyPos({}, i), !0) : !1;
  }
  changedPosConstrain(t, e) {
    return e.w = e.w || t.w, e.h = e.h || t.h, t.x !== e.x || t.y !== e.y ? !0 : (t.maxW && (e.w = Math.min(e.w, t.maxW)), t.maxH && (e.h = Math.min(e.h, t.maxH)), t.minW && (e.w = Math.max(e.w, t.minW)), t.minH && (e.h = Math.max(e.h, t.minH)), t.w !== e.w || t.h !== e.h);
  }
  moveNode(t, e) {
    if (!t || !e)
      return !1;
    e.pack === void 0 && (e.pack = !0), typeof e.x != "number" && (e.x = t.x), typeof e.y != "number" && (e.y = t.y), typeof e.w != "number" && (e.w = t.w), typeof e.h != "number" && (e.h = t.h);
    let i = t.w !== e.w || t.h !== e.h, s = v.Utils.copyPos({}, t, !0);
    if (v.Utils.copyPos(s, e), s = this.nodeBoundFix(s, i), v.Utils.copyPos(e, s), v.Utils.samePos(t, e))
      return !1;
    let l = v.Utils.copyPos({}, t), o = this.collideAll(t, s, e.skip), p = !0;
    if (o.length) {
      let g = t._moving && !e.nested ? this.collideCoverage(t, e, o) : o[0];
      g ? p = !this._fixCollisions(t, s, g, e) : p = !1;
    }
    return p && (t._dirty = !0, v.Utils.copyPos(t, s)), e.pack && this._packNodes()._notify(), !v.Utils.samePos(t, l);
  }
  getRow() {
    return this.nodes.reduce((t, e) => Math.max(t, e.y + e.h), 0);
  }
  beginUpdate(t) {
    return t._updating || (t._updating = !0, delete t._skipDown, this.batchMode || this.saveInitial()), this;
  }
  endUpdate() {
    let t = this.nodes.find((e) => e._updating);
    return t && (delete t._updating, delete t._skipDown), this;
  }
  save(t = !0) {
    var e;
    let i = (e = this._layouts) === null || e === void 0 ? void 0 : e.length, s = i && this.column !== i - 1 ? this._layouts[i - 1] : null, l = [];
    return this.sortNodes(), this.nodes.forEach((o) => {
      let p = s == null ? void 0 : s.find((r) => r._id === o._id), g = Object.assign({}, o);
      p && (g.x = p.x, g.y = p.y, g.w = p.w);
      for (let r in g)
        (r[0] === "_" || g[r] === null || g[r] === void 0) && delete g[r];
      delete g.grid, t || delete g.el, g.autoPosition || delete g.autoPosition, g.noResize || delete g.noResize, g.noMove || delete g.noMove, g.locked || delete g.locked, l.push(g);
    }), l;
  }
  layoutsNodesChange(t) {
    return !this._layouts || this._inColumnResize ? this : (this._layouts.forEach((e, i) => {
      if (!e || i === this.column)
        return this;
      if (i < this.column)
        this._layouts[i] = void 0;
      else {
        let s = i / this.column;
        t.forEach((l) => {
          if (!l._orig)
            return;
          let o = e.find((p) => p._id === l._id);
          !o || (l.y !== l._orig.y && (o.y += l.y - l._orig.y), l.x !== l._orig.x && (o.x = Math.round(l.x * s)), l.w !== l._orig.w && (o.w = Math.round(l.w * s)));
        });
      }
    }), this);
  }
  updateNodeWidths(t, e, i, s = "moveScale") {
    var l;
    if (!this.nodes.length || !e || t === e)
      return this;
    this.cacheLayout(this.nodes, t), this.batchUpdate();
    let o = [], p = !1;
    if (e === 1 && (i == null ? void 0 : i.length)) {
      p = !0;
      let r = 0;
      i.forEach((n) => {
        n.x = 0, n.w = 1, n.y = Math.max(n.y, r), r = n.y + n.h;
      }), o = i, i = [];
    } else
      i = v.Utils.sort(this.nodes, -1, t);
    let g = [];
    if (e > t) {
      g = this._layouts[e] || [];
      let r = this._layouts.length - 1;
      !g.length && t !== r && ((l = this._layouts[r]) === null || l === void 0 ? void 0 : l.length) && (t = r, this._layouts[r].forEach((n) => {
        let a = i.find((h) => h._id === n._id);
        a && (a.x = n.x, a.y = n.y, a.w = n.w);
      }));
    }
    if (g.forEach((r) => {
      let n = i.findIndex((a) => a._id === r._id);
      n !== -1 && (i[n].x = r.x, i[n].y = r.y, i[n].w = r.w, o.push(i[n]), i.splice(n, 1));
    }), i.length) {
      if (typeof s == "function")
        s(e, t, o, i);
      else if (!p) {
        let r = e / t, n = s === "move" || s === "moveScale", a = s === "scale" || s === "moveScale";
        i.forEach((h) => {
          h.x = e === 1 ? 0 : n ? Math.round(h.x * r) : Math.min(h.x, e - 1), h.w = e === 1 || t === 1 ? 1 : a ? Math.round(h.w * r) || 1 : Math.min(h.w, e), o.push(h);
        }), i = [];
      }
    }
    return o = v.Utils.sort(o, -1, e), this._inColumnResize = !0, this.nodes = [], o.forEach((r) => {
      this.addNode(r, !1), delete r._orig;
    }), this.commit(), delete this._inColumnResize, this;
  }
  cacheLayout(t, e, i = !1) {
    let s = [];
    return t.forEach((l, o) => {
      l._id = l._id || N._idSeq++, s[o] = { x: l.x, y: l.y, w: l.w, _id: l._id };
    }), this._layouts = i ? [] : this._layouts || [], this._layouts[e] = s, this;
  }
  cacheOneLayout(t, e) {
    t._id = t._id || N._idSeq++;
    let i = { x: t.x, y: t.y, w: t.w, _id: t._id };
    this._layouts = this._layouts || [], this._layouts[e] = this._layouts[e] || [];
    let s = this._layouts[e].findIndex((l) => l._id === t._id);
    return s === -1 ? this._layouts[e].push(i) : this._layouts[e][s] = i, this;
  }
  cleanupNode(t) {
    for (let e in t)
      e[0] === "_" && e !== "_id" && delete t[e];
    return this;
  }
}
j.GridStackEngine = N;
N._idSeq = 1;
var A = {};
Object.defineProperty(A, "__esModule", { value: !0 });
A.GridStackDDI = void 0;
class z {
  static registerPlugin(t) {
    return z.ddi = new t(), z.ddi;
  }
  static get() {
    return z.ddi || z.registerPlugin(z);
  }
  remove(t) {
    return this;
  }
}
A.GridStackDDI = z;
var nt = {};
Object.defineProperty(nt, "__esModule", { value: !0 });
(function(d) {
  var t = S && S.__createBinding || (Object.create ? function(g, r, n, a) {
    a === void 0 && (a = n), Object.defineProperty(g, a, { enumerable: !0, get: function() {
      return r[n];
    } });
  } : function(g, r, n, a) {
    a === void 0 && (a = n), g[a] = r[n];
  }), e = S && S.__exportStar || function(g, r) {
    for (var n in g)
      n !== "default" && !r.hasOwnProperty(n) && t(r, g, n);
  };
  Object.defineProperty(d, "__esModule", { value: !0 }), d.GridStack = void 0;
  /*!
   * GridStack 5.1.1
   * https://gridstackjs.com/
   *
   * Copyright (c) 2021-2022 Alain Dumesny
   * see root license https://github.com/gridstack/gridstack.js/tree/master/LICENSE
   */
  const i = j, s = E, l = A;
  e(nt, d), e(E, d), e(j, d), e(A, d);
  const o = {
    column: 12,
    minRow: 0,
    maxRow: 0,
    itemClass: "grid-stack-item",
    placeholderClass: "grid-stack-placeholder",
    placeholderText: "",
    handle: ".grid-stack-item-content",
    handleClass: null,
    styleInHead: !1,
    cellHeight: "auto",
    cellHeightThrottle: 100,
    margin: 10,
    auto: !0,
    oneColumnSize: 768,
    float: !1,
    staticGrid: !1,
    animate: !0,
    alwaysShowResizeHandle: !1,
    resizable: {
      autoHide: !0,
      handles: "se"
    },
    draggable: {
      handle: ".grid-stack-item-content",
      scroll: !1,
      appendTo: "body"
    },
    disableDrag: !1,
    disableResize: !1,
    rtl: "auto",
    removable: !1,
    removableOptions: {
      accept: ".grid-stack-item"
    },
    marginUnit: "px",
    cellHeightUnit: "px",
    disableOneColumnMode: !1,
    oneColumnModeDomSort: !1
  };
  class p {
    constructor(r, n = {}) {
      this._gsEventHandler = {}, this._extraDragRow = 0, this.el = r, n = n || {}, n.row && (n.minRow = n.maxRow = n.row, delete n.row);
      let a = s.Utils.toNumber(r.getAttribute("gs-row"));
      n.column === "auto" && delete n.column;
      let h = n;
      h.minWidth !== void 0 && (n.oneColumnSize = n.oneColumnSize || h.minWidth, delete h.minWidth);
      let c = Object.assign(Object.assign({}, s.Utils.cloneDeep(o)), { column: s.Utils.toNumber(r.getAttribute("gs-column")) || 12, minRow: a || s.Utils.toNumber(r.getAttribute("gs-min-row")) || 0, maxRow: a || s.Utils.toNumber(r.getAttribute("gs-max-row")) || 0, staticGrid: s.Utils.toBool(r.getAttribute("gs-static")) || !1, _styleSheetClass: "grid-stack-instance-" + (Math.random() * 1e4).toFixed(0), alwaysShowResizeHandle: n.alwaysShowResizeHandle || !1, resizable: {
        autoHide: !n.alwaysShowResizeHandle,
        handles: "se"
      }, draggable: {
        handle: (n.handleClass ? "." + n.handleClass : n.handle ? n.handle : "") || ".grid-stack-item-content",
        scroll: !1,
        appendTo: "body"
      }, removableOptions: {
        accept: "." + (n.itemClass || "grid-stack-item")
      } });
      r.getAttribute("gs-animate") && (c.animate = s.Utils.toBool(r.getAttribute("gs-animate"))), this.opts = s.Utils.defaults(n, c), n = null, this._initMargin(), this.opts.column !== 1 && !this.opts.disableOneColumnMode && this._widthOrContainer() <= this.opts.oneColumnSize && (this._prevColumn = this.getColumn(), this.opts.column = 1), this.opts.rtl === "auto" && (this.opts.rtl = r.style.direction === "rtl"), this.opts.rtl && this.el.classList.add("grid-stack-rtl");
      let y = s.Utils.closestByClass(this.el, o.itemClass);
      y && y.gridstackNode && (this.opts._isNested = y.gridstackNode, this.opts._isNested.subGrid = this, y.classList.add("grid-stack-nested"), this.el.classList.add("grid-stack-nested")), this._isAutoCellHeight = this.opts.cellHeight === "auto", this._isAutoCellHeight || this.opts.cellHeight === "initial" ? this.cellHeight(void 0, !1) : (typeof this.opts.cellHeight == "number" && this.opts.cellHeightUnit && this.opts.cellHeightUnit !== o.cellHeightUnit && (this.opts.cellHeight = this.opts.cellHeight + this.opts.cellHeightUnit, delete this.opts.cellHeightUnit), this.cellHeight(this.opts.cellHeight, !1)), this.el.classList.add(this.opts._styleSheetClass), this._setStaticClass();
      let u = this.opts.engineClass || p.engineClass || i.GridStackEngine;
      if (this.engine = new u({
        column: this.getColumn(),
        float: this.opts.float,
        maxRow: this.opts.maxRow,
        onChange: (f) => {
          let m = 0;
          this.engine.nodes.forEach((_) => {
            m = Math.max(m, _.y + _.h);
          }), f.forEach((_) => {
            let b = _.el;
            !b || (_._removeDOM ? (b && b.remove(), delete _._removeDOM) : this._writePosAttr(b, _));
          }), this._updateStyles(!1, m);
        }
      }), this.opts.auto) {
        this.batchUpdate();
        let f = [];
        this.getGridItems().forEach((m) => {
          let _ = parseInt(m.getAttribute("gs-x")), b = parseInt(m.getAttribute("gs-y"));
          f.push({
            el: m,
            i: (Number.isNaN(_) ? 1e3 : _) + (Number.isNaN(b) ? 1e3 : b) * this.getColumn()
          });
        }), f.sort((m, _) => m.i - _.i).forEach((m) => this._prepareElement(m.el)), this.commit();
      }
      this.setAnimation(this.opts.animate), this._updateStyles(), this.opts.column != 12 && this.el.classList.add("grid-stack-" + this.opts.column), this.opts.dragIn && p.setupDragIn(this.opts.dragIn, this.opts.dragInOptions), delete this.opts.dragIn, delete this.opts.dragInOptions, this._setupRemoveDrop(), this._setupAcceptWidget(), this._updateWindowResizeEvent();
    }
    static init(r = {}, n = ".grid-stack") {
      let a = p.getGridElement(n);
      return a ? (a.gridstack || (a.gridstack = new p(a, s.Utils.cloneDeep(r))), a.gridstack) : (console.error(typeof n == "string" ? 'GridStack.initAll() no grid was found with selector "' + n + `" - element missing or wrong selector ?
Note: ".grid-stack" is required for proper CSS styling and drag/drop, and is the default selector.` : "GridStack.init() no grid element was passed."), null);
    }
    static initAll(r = {}, n = ".grid-stack") {
      let a = [];
      return p.getGridElements(n).forEach((h) => {
        h.gridstack || (h.gridstack = new p(h, s.Utils.cloneDeep(r)), delete r.dragIn, delete r.dragInOptions), a.push(h.gridstack);
      }), a.length === 0 && console.error('GridStack.initAll() no grid was found with selector "' + n + `" - element missing or wrong selector ?
Note: ".grid-stack" is required for proper CSS styling and drag/drop, and is the default selector.`), a;
    }
    static addGrid(r, n = {}) {
      if (!r)
        return null;
      let a = r;
      if (!r.classList.contains("grid-stack")) {
        let c = document.implementation.createHTMLDocument("");
        c.body.innerHTML = `<div class="grid-stack ${n.class || ""}"></div>`, a = c.body.children[0], r.appendChild(a);
      }
      let h = p.init(n, a);
      if (h.opts.children) {
        let c = h.opts.children;
        delete h.opts.children, h.load(c);
      }
      return h;
    }
    static registerEngine(r) {
      p.engineClass = r;
    }
    get placeholder() {
      if (!this._placeholder) {
        let r = document.createElement("div");
        r.className = "placeholder-content", this.opts.placeholderText && (r.innerHTML = this.opts.placeholderText), this._placeholder = document.createElement("div"), this._placeholder.classList.add(this.opts.placeholderClass, o.itemClass, this.opts.itemClass), this.placeholder.appendChild(r);
      }
      return this._placeholder;
    }
    addWidget(r, n) {
      if (arguments.length > 2) {
        console.warn("gridstack.ts: `addWidget(el, x, y, width...)` is deprecated. Use `addWidget({x, y, w, content, ...})`. It will be removed soon");
        let u = arguments, f = 1, m = {
          x: u[f++],
          y: u[f++],
          w: u[f++],
          h: u[f++],
          autoPosition: u[f++],
          minW: u[f++],
          maxW: u[f++],
          minH: u[f++],
          maxH: u[f++],
          id: u[f++]
        };
        return this.addWidget(r, m);
      }
      function a(u) {
        return u.x !== void 0 || u.y !== void 0 || u.w !== void 0 || u.h !== void 0 || u.content !== void 0;
      }
      let h;
      if (typeof r == "string") {
        let u = document.implementation.createHTMLDocument("");
        u.body.innerHTML = r, h = u.body.children[0];
      } else if (arguments.length === 0 || arguments.length === 1 && a(r)) {
        let u = r && r.content || "";
        n = r;
        let f = document.implementation.createHTMLDocument("");
        f.body.innerHTML = `<div class="grid-stack-item ${this.opts.itemClass || ""}"><div class="grid-stack-item-content">${u}</div></div>`, h = f.body.children[0];
      } else
        h = r;
      let c = this._readAttr(h);
      n = s.Utils.cloneDeep(n) || {}, s.Utils.defaults(n, c);
      let y = this.engine.prepareNode(n);
      if (this._writeAttr(h, n), this._insertNotAppend ? this.el.prepend(h) : this.el.appendChild(h), this._prepareElement(h, !0, n), this._updateContainerHeight(), y.subGrid && !y.subGrid.el) {
        let u, f = y.subGrid;
        f.column === "auto" && (f.column = y.w, f.disableOneColumnMode = !0, u = !0);
        let m = y.el.querySelector(".grid-stack-item-content");
        y.subGrid = p.addGrid(m, y.subGrid), u && (y.subGrid._autoColumn = !0);
      }
      return this._triggerAddEvent(), this._triggerChangeEvent(), h;
    }
    save(r = !0, n = !1) {
      let a = this.engine.save(r);
      if (a.forEach((h) => {
        if (r && h.el && !h.subGrid) {
          let c = h.el.querySelector(".grid-stack-item-content");
          h.content = c ? c.innerHTML : void 0, h.content || delete h.content;
        } else
          r || delete h.content, h.subGrid && (h.subGrid = h.subGrid.save(r, !0));
        delete h.el;
      }), n) {
        let h = s.Utils.cloneDeep(this.opts);
        return h.marginBottom === h.marginTop && h.marginRight === h.marginLeft && h.marginTop === h.marginRight && (h.margin = h.marginTop, delete h.marginTop, delete h.marginRight, delete h.marginBottom, delete h.marginLeft), h.rtl === (this.el.style.direction === "rtl") && (h.rtl = "auto"), this._isAutoCellHeight && (h.cellHeight = "auto"), this._autoColumn && (h.column = "auto", delete h.disableOneColumnMode), s.Utils.removeInternalAndSame(h, o), h.children = a, h;
      }
      return a;
    }
    load(r, n = !0) {
      let a = p.Utils.sort([...r], -1, this._prevColumn || this.getColumn());
      this._insertNotAppend = !0, this._prevColumn && this._prevColumn !== this.opts.column && a.some((c) => c.x + c.w > this.opts.column) && (this._ignoreLayoutsNodeChange = !0, this.engine.cacheLayout(a, this._prevColumn, !0));
      let h = [];
      return this.batchUpdate(), n && [...this.engine.nodes].forEach((y) => {
        a.find((f) => y.id === f.id) || (typeof n == "function" ? n(this, y, !1) : (h.push(y), this.removeWidget(y.el, !0, !1)));
      }), a.forEach((c) => {
        let y = c.id || c.id === 0 ? this.engine.nodes.find((u) => u.id === c.id) : void 0;
        if (y) {
          if (this.update(y.el, c), c.subGrid && c.subGrid.children) {
            let u = y.el.querySelector(".grid-stack");
            u && u.gridstack && (u.gridstack.load(c.subGrid.children), this._insertNotAppend = !0);
          }
        } else
          n && (typeof n == "function" ? c = n(this, c, !0).gridstackNode : c = this.addWidget(c).gridstackNode);
      }), this.engine.removedNodes = h, this.commit(), delete this._ignoreLayoutsNodeChange, delete this._insertNotAppend, this;
    }
    batchUpdate() {
      return this.engine.batchUpdate(), this;
    }
    getCellHeight(r = !1) {
      if (this.opts.cellHeight && this.opts.cellHeight !== "auto" && (!r || !this.opts.cellHeightUnit || this.opts.cellHeightUnit === "px"))
        return this.opts.cellHeight;
      let n = this.el.querySelector("." + this.opts.itemClass);
      if (n) {
        let h = s.Utils.toNumber(n.getAttribute("gs-h"));
        return Math.round(n.offsetHeight / h);
      }
      let a = parseInt(this.el.getAttribute("gs-current-row"));
      return a ? Math.round(this.el.getBoundingClientRect().height / a) : this.opts.cellHeight;
    }
    cellHeight(r, n = !0) {
      if (n && r !== void 0 && this._isAutoCellHeight !== (r === "auto") && (this._isAutoCellHeight = r === "auto", this._updateWindowResizeEvent()), (r === "initial" || r === "auto") && (r = void 0), r === void 0) {
        let h = -this.opts.marginRight - this.opts.marginLeft + this.opts.marginTop + this.opts.marginBottom;
        r = this.cellWidth() + h;
      }
      let a = s.Utils.parseHeight(r);
      return this.opts.cellHeightUnit === a.unit && this.opts.cellHeight === a.h ? this : (this.opts.cellHeightUnit = a.unit, this.opts.cellHeight = a.h, n && this._updateStyles(!0, this.getRow()), this);
    }
    cellWidth() {
      return this._widthOrContainer() / this.getColumn();
    }
    _widthOrContainer() {
      return this.el.clientWidth || this.el.parentElement.clientWidth || window.innerWidth;
    }
    commit() {
      return this.engine.commit(), this._triggerRemoveEvent(), this._triggerAddEvent(), this._triggerChangeEvent(), this;
    }
    compact() {
      return this.engine.compact(), this._triggerChangeEvent(), this;
    }
    column(r, n = "moveScale") {
      if (r < 1 || this.opts.column === r)
        return this;
      let a = this.getColumn();
      r === 1 ? this._prevColumn = a : delete this._prevColumn, this.el.classList.remove("grid-stack-" + a), this.el.classList.add("grid-stack-" + r), this.opts.column = this.engine.column = r;
      let h;
      return r === 1 && this.opts.oneColumnModeDomSort && (h = [], this.getGridItems().forEach((c) => {
        c.gridstackNode && h.push(c.gridstackNode);
      }), h.length || (h = void 0)), this.engine.updateNodeWidths(a, r, h, n), this._isAutoCellHeight && this.cellHeight(), this._ignoreLayoutsNodeChange = !0, this._triggerChangeEvent(), delete this._ignoreLayoutsNodeChange, this;
    }
    getColumn() {
      return this.opts.column;
    }
    getGridItems() {
      return Array.from(this.el.children).filter((r) => r.matches("." + this.opts.itemClass) && !r.matches("." + this.opts.placeholderClass));
    }
    destroy(r = !0) {
      if (!!this.el)
        return this._updateWindowResizeEvent(!0), this.setStatic(!0, !1), this.setAnimation(!1), r ? this.el.parentNode.removeChild(this.el) : (this.removeAll(r), this.el.classList.remove(this.opts._styleSheetClass)), this._removeStylesheet(), this.el.removeAttribute("gs-current-row"), delete this.opts._isNested, delete this.opts, delete this._placeholder, delete this.engine, delete this.el.gridstack, delete this.el, this;
    }
    float(r) {
      return this.engine.float = r, this._triggerChangeEvent(), this;
    }
    getFloat() {
      return this.engine.float;
    }
    getCellFromPixel(r, n = !1) {
      let a = this.el.getBoundingClientRect(), h;
      n ? h = { top: a.top + document.documentElement.scrollTop, left: a.left } : h = { top: this.el.offsetTop, left: this.el.offsetLeft };
      let c = r.left - h.left, y = r.top - h.top, u = a.width / this.getColumn(), f = a.height / parseInt(this.el.getAttribute("gs-current-row"));
      return { x: Math.floor(c / u), y: Math.floor(y / f) };
    }
    getRow() {
      return Math.max(this.engine.getRow(), this.opts.minRow);
    }
    isAreaEmpty(r, n, a, h) {
      return this.engine.isAreaEmpty(r, n, a, h);
    }
    makeWidget(r) {
      let n = p.getElement(r);
      return this._prepareElement(n, !0), this._updateContainerHeight(), this._triggerAddEvent(), this._triggerChangeEvent(), n;
    }
    on(r, n) {
      return r.indexOf(" ") !== -1 ? (r.split(" ").forEach((h) => this.on(h, n)), this) : (r === "change" || r === "added" || r === "removed" || r === "enable" || r === "disable" ? (r === "enable" || r === "disable" ? this._gsEventHandler[r] = (h) => n(h) : this._gsEventHandler[r] = (h) => n(h, h.detail), this.el.addEventListener(r, this._gsEventHandler[r])) : r === "drag" || r === "dragstart" || r === "dragstop" || r === "resizestart" || r === "resize" || r === "resizestop" || r === "dropped" ? this._gsEventHandler[r] = n : console.log("GridStack.on(" + r + ') event not supported, but you can still use $(".grid-stack").on(...) while jquery-ui is still used internally.'), this);
    }
    off(r) {
      return r.indexOf(" ") !== -1 ? (r.split(" ").forEach((a) => this.off(a)), this) : ((r === "change" || r === "added" || r === "removed" || r === "enable" || r === "disable") && this._gsEventHandler[r] && this.el.removeEventListener(r, this._gsEventHandler[r]), delete this._gsEventHandler[r], this);
    }
    removeWidget(r, n = !0, a = !0) {
      return p.getElements(r).forEach((h) => {
        if (h.parentElement !== this.el)
          return;
        let c = h.gridstackNode;
        c || (c = this.engine.nodes.find((y) => h === y.el)), c && (delete h.gridstackNode, l.GridStackDDI.get().remove(h), this.engine.removeNode(c, n, a), n && h.parentElement && h.remove());
      }), a && (this._triggerRemoveEvent(), this._triggerChangeEvent()), this;
    }
    removeAll(r = !0) {
      return this.engine.nodes.forEach((n) => {
        delete n.el.gridstackNode, l.GridStackDDI.get().remove(n.el);
      }), this.engine.removeAll(r), this._triggerRemoveEvent(), this;
    }
    setAnimation(r) {
      return r ? this.el.classList.add("grid-stack-animate") : this.el.classList.remove("grid-stack-animate"), this;
    }
    setStatic(r, n = !0) {
      return this.opts.staticGrid === r ? this : (this.opts.staticGrid = r, this._setupRemoveDrop(), this._setupAcceptWidget(), this.engine.nodes.forEach((a) => this._prepareDragDropByNode(a)), n && this._setStaticClass(), this);
    }
    update(r, n) {
      if (arguments.length > 2) {
        console.warn("gridstack.ts: `update(el, x, y, w, h)` is deprecated. Use `update(el, {x, w, content, ...})`. It will be removed soon");
        let a = arguments, h = 1;
        return n = { x: a[h++], y: a[h++], w: a[h++], h: a[h++] }, this.update(r, n);
      }
      return p.getElements(r).forEach((a) => {
        if (!a || !a.gridstackNode)
          return;
        let h = a.gridstackNode, c = s.Utils.cloneDeep(n);
        delete c.autoPosition;
        let y = ["x", "y", "w", "h"], u;
        if (y.some((_) => c[_] !== void 0 && c[_] !== h[_]) && (u = {}, y.forEach((_) => {
          u[_] = c[_] !== void 0 ? c[_] : h[_], delete c[_];
        })), !u && (c.minW || c.minH || c.maxW || c.maxH) && (u = {}), c.content) {
          let _ = a.querySelector(".grid-stack-item-content");
          _ && _.innerHTML !== c.content && (_.innerHTML = c.content), delete c.content;
        }
        let f = !1, m = !1;
        for (const _ in c)
          _[0] !== "_" && h[_] !== c[_] && (h[_] = c[_], f = !0, m = m || !this.opts.staticGrid && (_ === "noResize" || _ === "noMove" || _ === "locked"));
        u && (this.engine.cleanNodes().beginUpdate(h).moveNode(h, u), this._updateContainerHeight(), this._triggerChangeEvent(), this.engine.endUpdate()), f && this._writeAttr(a, h), m && this._prepareDragDropByNode(h);
      }), this;
    }
    margin(r) {
      if (!(typeof r == "string" && r.split(" ").length > 1)) {
        let a = s.Utils.parseHeight(r);
        if (this.opts.marginUnit === a.unit && this.opts.margin === a.h)
          return;
      }
      return this.opts.margin = r, this.opts.marginTop = this.opts.marginBottom = this.opts.marginLeft = this.opts.marginRight = void 0, this._initMargin(), this._updateStyles(!0), this;
    }
    getMargin() {
      return this.opts.margin;
    }
    willItFit(r) {
      if (arguments.length > 1) {
        console.warn("gridstack.ts: `willItFit(x,y,w,h,autoPosition)` is deprecated. Use `willItFit({x, y,...})`. It will be removed soon");
        let n = arguments, a = 0, h = { x: n[a++], y: n[a++], w: n[a++], h: n[a++], autoPosition: n[a++] };
        return this.willItFit(h);
      }
      return this.engine.willItFit(r);
    }
    _triggerChangeEvent() {
      if (this.engine.batchMode)
        return this;
      let r = this.engine.getDirtyNodes(!0);
      return r && r.length && (this._ignoreLayoutsNodeChange || this.engine.layoutsNodesChange(r), this._triggerEvent("change", r)), this.engine.saveInitial(), this;
    }
    _triggerAddEvent() {
      return this.engine.batchMode ? this : (this.engine.addedNodes && this.engine.addedNodes.length > 0 && (this._ignoreLayoutsNodeChange || this.engine.layoutsNodesChange(this.engine.addedNodes), this.engine.addedNodes.forEach((r) => {
        delete r._dirty;
      }), this._triggerEvent("added", this.engine.addedNodes), this.engine.addedNodes = []), this);
    }
    _triggerRemoveEvent() {
      return this.engine.batchMode ? this : (this.engine.removedNodes && this.engine.removedNodes.length > 0 && (this._triggerEvent("removed", this.engine.removedNodes), this.engine.removedNodes = []), this);
    }
    _triggerEvent(r, n) {
      let a = n ? new CustomEvent(r, { bubbles: !1, detail: n }) : new Event(r);
      return this.el.dispatchEvent(a), this;
    }
    _removeStylesheet() {
      return this._styles && (s.Utils.removeStylesheet(this._styles._id), delete this._styles), this;
    }
    _updateStyles(r = !1, n) {
      if (r && this._removeStylesheet(), this._updateContainerHeight(), this.opts.cellHeight === 0)
        return this;
      let a = this.opts.cellHeight, h = this.opts.cellHeightUnit, c = `.${this.opts._styleSheetClass} > .${this.opts.itemClass}`;
      if (!this._styles) {
        let y = "gridstack-style-" + (Math.random() * 1e5).toFixed(), u = this.opts.styleInHead ? void 0 : this.el.parentNode;
        if (this._styles = s.Utils.createStylesheet(y, u), !this._styles)
          return this;
        this._styles._id = y, this._styles._max = 0, s.Utils.addCSSRule(this._styles, c, `min-height: ${a}${h}`);
        let f = this.opts.marginTop + this.opts.marginUnit, m = this.opts.marginBottom + this.opts.marginUnit, _ = this.opts.marginRight + this.opts.marginUnit, b = this.opts.marginLeft + this.opts.marginUnit, w = `${c} > .grid-stack-item-content`, R = `.${this.opts._styleSheetClass} > .grid-stack-placeholder > .placeholder-content`;
        s.Utils.addCSSRule(this._styles, w, `top: ${f}; right: ${_}; bottom: ${m}; left: ${b};`), s.Utils.addCSSRule(this._styles, R, `top: ${f}; right: ${_}; bottom: ${m}; left: ${b};`), s.Utils.addCSSRule(this._styles, `${c} > .ui-resizable-ne`, `right: ${_}`), s.Utils.addCSSRule(this._styles, `${c} > .ui-resizable-e`, `right: ${_}`), s.Utils.addCSSRule(this._styles, `${c} > .ui-resizable-se`, `right: ${_}; bottom: ${m}`), s.Utils.addCSSRule(this._styles, `${c} > .ui-resizable-nw`, `left: ${b}`), s.Utils.addCSSRule(this._styles, `${c} > .ui-resizable-w`, `left: ${b}`), s.Utils.addCSSRule(this._styles, `${c} > .ui-resizable-sw`, `left: ${b}; bottom: ${m}`);
      }
      if (n = n || this._styles._max, n > this._styles._max) {
        let y = (u) => a * u + h;
        for (let u = this._styles._max + 1; u <= n; u++) {
          let f = y(u);
          s.Utils.addCSSRule(this._styles, `${c}[gs-y="${u - 1}"]`, `top: ${y(u - 1)}`), s.Utils.addCSSRule(this._styles, `${c}[gs-h="${u}"]`, `height: ${f}`), s.Utils.addCSSRule(this._styles, `${c}[gs-min-h="${u}"]`, `min-height: ${f}`), s.Utils.addCSSRule(this._styles, `${c}[gs-max-h="${u}"]`, `max-height: ${f}`);
        }
        this._styles._max = n;
      }
      return this;
    }
    _updateContainerHeight() {
      if (!this.engine || this.engine.batchMode)
        return this;
      let r = this.getRow() + this._extraDragRow;
      if (this.el.setAttribute("gs-current-row", String(r)), r === 0)
        return this.el.style.removeProperty("height"), this;
      let n = this.opts.cellHeight, a = this.opts.cellHeightUnit;
      return n ? (this.el.style.height = r * n + a, this) : this;
    }
    _prepareElement(r, n = !1, a) {
      a || (r.classList.add(this.opts.itemClass), a = this._readAttr(r)), r.gridstackNode = a, a.el = r, a.grid = this;
      let h = Object.assign({}, a);
      return a = this.engine.addNode(a, n), s.Utils.same(a, h) || this._writeAttr(r, a), this._prepareDragDropByNode(a), this;
    }
    _writePosAttr(r, n) {
      return n.x !== void 0 && n.x !== null && r.setAttribute("gs-x", String(n.x)), n.y !== void 0 && n.y !== null && r.setAttribute("gs-y", String(n.y)), n.w && r.setAttribute("gs-w", String(n.w)), n.h && r.setAttribute("gs-h", String(n.h)), this;
    }
    _writeAttr(r, n) {
      if (!n)
        return this;
      this._writePosAttr(r, n);
      let a = {
        autoPosition: "gs-auto-position",
        minW: "gs-min-w",
        minH: "gs-min-h",
        maxW: "gs-max-w",
        maxH: "gs-max-h",
        noResize: "gs-no-resize",
        noMove: "gs-no-move",
        locked: "gs-locked",
        id: "gs-id",
        resizeHandles: "gs-resize-handles"
      };
      for (const h in a)
        n[h] ? r.setAttribute(a[h], String(n[h])) : r.removeAttribute(a[h]);
      return this;
    }
    _readAttr(r) {
      let n = {};
      n.x = s.Utils.toNumber(r.getAttribute("gs-x")), n.y = s.Utils.toNumber(r.getAttribute("gs-y")), n.w = s.Utils.toNumber(r.getAttribute("gs-w")), n.h = s.Utils.toNumber(r.getAttribute("gs-h")), n.maxW = s.Utils.toNumber(r.getAttribute("gs-max-w")), n.minW = s.Utils.toNumber(r.getAttribute("gs-min-w")), n.maxH = s.Utils.toNumber(r.getAttribute("gs-max-h")), n.minH = s.Utils.toNumber(r.getAttribute("gs-min-h")), n.autoPosition = s.Utils.toBool(r.getAttribute("gs-auto-position")), n.noResize = s.Utils.toBool(r.getAttribute("gs-no-resize")), n.noMove = s.Utils.toBool(r.getAttribute("gs-no-move")), n.locked = s.Utils.toBool(r.getAttribute("gs-locked")), n.resizeHandles = r.getAttribute("gs-resize-handles"), n.id = r.getAttribute("gs-id");
      for (const a in n) {
        if (!n.hasOwnProperty(a))
          return;
        !n[a] && n[a] !== 0 && delete n[a];
      }
      return n;
    }
    _setStaticClass() {
      let r = ["grid-stack-static"];
      return this.opts.staticGrid ? (this.el.classList.add(...r), this.el.setAttribute("gs-static", "true")) : (this.el.classList.remove(...r), this.el.removeAttribute("gs-static")), this;
    }
    onParentResize() {
      if (!this.el || !this.el.clientWidth)
        return;
      let r = !1;
      if (this._autoColumn && this.opts._isNested)
        this.opts.column !== this.opts._isNested.w && (r = !0, this.column(this.opts._isNested.w, "none"));
      else {
        let n = !this.opts.disableOneColumnMode && this.el.clientWidth <= this.opts.oneColumnSize;
        this.opts.column === 1 !== n && (r = !0, this.opts.animate && this.setAnimation(!1), this.column(n ? 1 : this._prevColumn), this.opts.animate && this.setAnimation(!0));
      }
      return this._isAutoCellHeight && (!r && this.opts.cellHeightThrottle ? (this._cellHeightThrottle || (this._cellHeightThrottle = s.Utils.throttle(() => this.cellHeight(), this.opts.cellHeightThrottle)), this._cellHeightThrottle()) : this.cellHeight()), this.engine.nodes.forEach((n) => {
        n.subGrid && n.subGrid.onParentResize();
      }), this;
    }
    _updateWindowResizeEvent(r = !1) {
      const n = (this._isAutoCellHeight || !this.opts.disableOneColumnMode) && !this.opts._isNested;
      return !r && n && !this._windowResizeBind ? (this._windowResizeBind = this.onParentResize.bind(this), window.addEventListener("resize", this._windowResizeBind)) : (r || !n) && this._windowResizeBind && (window.removeEventListener("resize", this._windowResizeBind), delete this._windowResizeBind), this;
    }
    static getElement(r = ".grid-stack-item") {
      return s.Utils.getElement(r);
    }
    static getElements(r = ".grid-stack-item") {
      return s.Utils.getElements(r);
    }
    static getGridElement(r) {
      return p.getElement(r);
    }
    static getGridElements(r) {
      return s.Utils.getElements(r);
    }
    _initMargin() {
      let r, n = 0, a = [];
      return typeof this.opts.margin == "string" && (a = this.opts.margin.split(" ")), a.length === 2 ? (this.opts.marginTop = this.opts.marginBottom = a[0], this.opts.marginLeft = this.opts.marginRight = a[1]) : a.length === 4 ? (this.opts.marginTop = a[0], this.opts.marginRight = a[1], this.opts.marginBottom = a[2], this.opts.marginLeft = a[3]) : (r = s.Utils.parseHeight(this.opts.margin), this.opts.marginUnit = r.unit, n = this.opts.margin = r.h), this.opts.marginTop === void 0 ? this.opts.marginTop = n : (r = s.Utils.parseHeight(this.opts.marginTop), this.opts.marginTop = r.h, delete this.opts.margin), this.opts.marginBottom === void 0 ? this.opts.marginBottom = n : (r = s.Utils.parseHeight(this.opts.marginBottom), this.opts.marginBottom = r.h, delete this.opts.margin), this.opts.marginRight === void 0 ? this.opts.marginRight = n : (r = s.Utils.parseHeight(this.opts.marginRight), this.opts.marginRight = r.h, delete this.opts.margin), this.opts.marginLeft === void 0 ? this.opts.marginLeft = n : (r = s.Utils.parseHeight(this.opts.marginLeft), this.opts.marginLeft = r.h, delete this.opts.margin), this.opts.marginUnit = r.unit, this.opts.marginTop === this.opts.marginBottom && this.opts.marginLeft === this.opts.marginRight && this.opts.marginTop === this.opts.marginRight && (this.opts.margin = this.opts.marginTop), this;
    }
    static setupDragIn(r, n) {
    }
    movable(r, n) {
      return this;
    }
    resizable(r, n) {
      return this;
    }
    disable() {
      return this;
    }
    enable() {
      return this;
    }
    enableMove(r) {
      return this;
    }
    enableResize(r) {
      return this;
    }
    _setupAcceptWidget() {
      return this;
    }
    _setupRemoveDrop() {
      return this;
    }
    _prepareDragDropByNode(r) {
      return this;
    }
    _onStartMoving(r, n, a, h, c, y) {
    }
    _dragOrResize(r, n, a, h, c, y) {
    }
    _leave(r, n) {
    }
  }
  d.GridStack = p, p.Utils = s.Utils, p.Engine = i.GridStackEngine;
})(et);
var ct = {}, L = {};
Object.defineProperty(L, "__esModule", { value: !0 });
L.DDManager = void 0;
class pt {
}
L.DDManager = pt;
var Y = {}, X = {}, V = {};
Object.defineProperty(V, "__esModule", { value: !0 });
V.DDResizableHandle = void 0;
class K {
  constructor(t, e, i) {
    this.moving = !1, this.host = t, this.dir = e, this.option = i, this._mouseDown = this._mouseDown.bind(this), this._mouseMove = this._mouseMove.bind(this), this._mouseUp = this._mouseUp.bind(this), this._init();
  }
  _init() {
    const t = document.createElement("div");
    return t.classList.add("ui-resizable-handle"), t.classList.add(`${K.prefix}${this.dir}`), t.style.zIndex = "100", t.style.userSelect = "none", this.el = t, this.host.appendChild(this.el), this.el.addEventListener("mousedown", this._mouseDown), this;
  }
  destroy() {
    return this.moving && this._mouseUp(this.mouseDownEvent), this.el.removeEventListener("mousedown", this._mouseDown), this.host.removeChild(this.el), delete this.el, delete this.host, this;
  }
  _mouseDown(t) {
    t.preventDefault(), this.mouseDownEvent = t, document.addEventListener("mousemove", this._mouseMove, !0), document.addEventListener("mouseup", this._mouseUp);
  }
  _mouseMove(t) {
    let e = this.mouseDownEvent;
    !this.moving && Math.abs(t.x - e.x) + Math.abs(t.y - e.y) > 2 ? (this.moving = !0, this._triggerEvent("start", this.mouseDownEvent)) : this.moving && this._triggerEvent("move", t);
  }
  _mouseUp(t) {
    this.moving && this._triggerEvent("stop", t), document.removeEventListener("mousemove", this._mouseMove, !0), document.removeEventListener("mouseup", this._mouseUp), delete this.moving, delete this.mouseDownEvent;
  }
  _triggerEvent(t, e) {
    return this.option[t] && this.option[t](e), this;
  }
}
V.DDResizableHandle = K;
K.prefix = "ui-resizable-";
var P = {};
Object.defineProperty(P, "__esModule", { value: !0 });
P.DDBaseImplement = void 0;
class ft {
  constructor() {
    this._disabled = !1, this._eventRegister = {};
  }
  get disabled() {
    return this._disabled;
  }
  on(t, e) {
    this._eventRegister[t] = e;
  }
  off(t) {
    delete this._eventRegister[t];
  }
  enable() {
    this._disabled = !1;
  }
  disable() {
    this._disabled = !0;
  }
  destroy() {
    delete this._eventRegister;
  }
  triggerEvent(t, e) {
    if (!this.disabled && this._eventRegister && this._eventRegister[t])
      return this._eventRegister[t](e);
  }
}
P.DDBaseImplement = ft;
var T = {};
Object.defineProperty(T, "__esModule", { value: !0 });
T.DDUtils = void 0;
class ot {
  static clone(t) {
    const e = t.cloneNode(!0);
    return e.removeAttribute("id"), e;
  }
  static appendTo(t, e) {
    let i;
    typeof e == "string" ? i = document.querySelector(e) : i = e, i && i.appendChild(t);
  }
  static setPositionRelative(t) {
    /^(?:r|a|f)/.test(window.getComputedStyle(t).position) || (t.style.position = "relative");
  }
  static addElStyles(t, e) {
    if (e instanceof Object)
      for (const i in e)
        e.hasOwnProperty(i) && (Array.isArray(e[i]) ? e[i].forEach((s) => {
          t.style[i] = s;
        }) : t.style[i] = e[i]);
  }
  static initEvent(t, e) {
    const i = { type: e.type }, s = {
      button: 0,
      which: 0,
      buttons: 1,
      bubbles: !0,
      cancelable: !0,
      target: e.target ? e.target : t.target
    };
    return t.dataTransfer && (i.dataTransfer = t.dataTransfer), ["altKey", "ctrlKey", "metaKey", "shiftKey"].forEach((l) => i[l] = t[l]), ["pageX", "pageY", "clientX", "clientY", "screenX", "screenY"].forEach((l) => i[l] = t[l]), Object.assign(Object.assign({}, i), s);
  }
  static inside(t, e) {
    let i = t.relatedTarget || t.fromElement;
    if (!i) {
      const { bottom: s, left: l, right: o, top: p } = e.getBoundingClientRect();
      return t.x < o && t.x > l && t.y < s && t.y > p;
    }
    return e.contains(i);
  }
}
T.DDUtils = ot;
ot.isEventSupportPassiveOption = (() => {
  let d = !1, t = () => {
  };
  return document.addEventListener("test", t, {
    get passive() {
      return d = !0, !0;
    }
  }), document.removeEventListener("test", t), d;
})();
Object.defineProperty(X, "__esModule", { value: !0 });
X.DDResizable = void 0;
const mt = V, _t = P, tt = T, yt = E;
class B extends _t.DDBaseImplement {
  constructor(t, e = {}) {
    super(), this._showHandlers = () => {
      this.el.classList.remove("ui-resizable-autohide");
    }, this._hideHandlers = () => {
      this.el.classList.add("ui-resizable-autohide");
    }, this._ui = () => {
      const s = this.el.parentElement.getBoundingClientRect(), l = {
        width: this.originalRect.width,
        height: this.originalRect.height + this.scrolled,
        left: this.originalRect.left,
        top: this.originalRect.top - this.scrolled
      }, o = this.temporalRect || l;
      return {
        position: {
          left: o.left - s.left,
          top: o.top - s.top
        },
        size: {
          width: o.width,
          height: o.height
        }
      };
    }, this.el = t, this.option = e, this.enable(), this._setupAutoHide(), this._setupHandlers();
  }
  on(t, e) {
    super.on(t, e);
  }
  off(t) {
    super.off(t);
  }
  enable() {
    super.enable(), this.el.classList.add("ui-resizable"), this.el.classList.remove("ui-resizable-disabled");
  }
  disable() {
    super.disable(), this.el.classList.add("ui-resizable-disabled"), this.el.classList.remove("ui-resizable");
  }
  destroy() {
    this._removeHandlers(), this.option.autoHide && (this.el.removeEventListener("mouseover", this._showHandlers), this.el.removeEventListener("mouseout", this._hideHandlers)), this.el.classList.remove("ui-resizable"), delete this.el, super.destroy();
  }
  updateOption(t) {
    let e = t.handles && t.handles !== this.option.handles, i = t.autoHide && t.autoHide !== this.option.autoHide;
    return Object.keys(t).forEach((s) => this.option[s] = t[s]), e && (this._removeHandlers(), this._setupHandlers()), i && this._setupAutoHide(), this;
  }
  _setupAutoHide() {
    return this.option.autoHide ? (this.el.classList.add("ui-resizable-autohide"), this.el.addEventListener("mouseover", this._showHandlers), this.el.addEventListener("mouseout", this._hideHandlers)) : (this.el.classList.remove("ui-resizable-autohide"), this.el.removeEventListener("mouseover", this._showHandlers), this.el.removeEventListener("mouseout", this._hideHandlers)), this;
  }
  _setupHandlers() {
    let t = this.option.handles || "e,s,se";
    return t === "all" && (t = "n,e,s,w,se,sw,ne,nw"), this.handlers = t.split(",").map((e) => e.trim()).map((e) => new mt.DDResizableHandle(this.el, e, {
      start: (i) => {
        this._resizeStart(i);
      },
      stop: (i) => {
        this._resizeStop(i);
      },
      move: (i) => {
        this._resizing(i, e);
      }
    })), this;
  }
  _resizeStart(t) {
    this.originalRect = this.el.getBoundingClientRect(), this.scrollEl = yt.Utils.getScrollElement(this.el), this.scrollY = this.scrollEl.scrollTop, this.scrolled = 0, this.startEvent = t, this._setupHelper(), this._applyChange();
    const e = tt.DDUtils.initEvent(t, { type: "resizestart", target: this.el });
    return this.option.start && this.option.start(e, this._ui()), this.el.classList.add("ui-resizable-resizing"), this.triggerEvent("resizestart", e), this;
  }
  _resizing(t, e) {
    this.scrolled = this.scrollEl.scrollTop - this.scrollY, this.temporalRect = this._getChange(t, e), this._applyChange();
    const i = tt.DDUtils.initEvent(t, { type: "resize", target: this.el });
    return this.option.resize && this.option.resize(i, this._ui()), this.triggerEvent("resize", i), this;
  }
  _resizeStop(t) {
    const e = tt.DDUtils.initEvent(t, { type: "resizestop", target: this.el });
    return this.option.stop && this.option.stop(e), this.el.classList.remove("ui-resizable-resizing"), this.triggerEvent("resizestop", e), this._cleanHelper(), delete this.startEvent, delete this.originalRect, delete this.temporalRect, delete this.scrollY, delete this.scrolled, this;
  }
  _setupHelper() {
    return this.elOriginStyleVal = B._originStyleProp.map((t) => this.el.style[t]), this.parentOriginStylePosition = this.el.parentElement.style.position, window.getComputedStyle(this.el.parentElement).position.match(/static/) && (this.el.parentElement.style.position = "relative"), this.el.style.position = "absolute", this.el.style.opacity = "0.8", this;
  }
  _cleanHelper() {
    return B._originStyleProp.forEach((t, e) => {
      this.el.style[t] = this.elOriginStyleVal[e] || null;
    }), this.el.parentElement.style.position = this.parentOriginStylePosition || null, this;
  }
  _getChange(t, e) {
    const i = this.startEvent, s = {
      width: this.originalRect.width,
      height: this.originalRect.height + this.scrolled,
      left: this.originalRect.left,
      top: this.originalRect.top - this.scrolled
    }, l = t.clientX - i.clientX, o = t.clientY - i.clientY;
    e.indexOf("e") > -1 ? s.width += l : e.indexOf("w") > -1 && (s.width -= l, s.left += l), e.indexOf("s") > -1 ? s.height += o : e.indexOf("n") > -1 && (s.height -= o, s.top += o);
    const p = this._constrainSize(s.width, s.height);
    return Math.round(s.width) !== Math.round(p.width) && (e.indexOf("w") > -1 && (s.left += s.width - p.width), s.width = p.width), Math.round(s.height) !== Math.round(p.height) && (e.indexOf("n") > -1 && (s.top += s.height - p.height), s.height = p.height), s;
  }
  _constrainSize(t, e) {
    const i = this.option.maxWidth || Number.MAX_SAFE_INTEGER, s = this.option.minWidth || t, l = this.option.maxHeight || Number.MAX_SAFE_INTEGER, o = this.option.minHeight || e, p = Math.min(i, Math.max(s, t)), g = Math.min(l, Math.max(o, e));
    return { width: p, height: g };
  }
  _applyChange() {
    let t = { left: 0, top: 0, width: 0, height: 0 };
    if (this.el.style.position === "absolute") {
      const e = this.el.parentElement, { left: i, top: s } = e.getBoundingClientRect();
      t = { left: i, top: s, width: 0, height: 0 };
    }
    return this.temporalRect ? (Object.keys(this.temporalRect).forEach((e) => {
      const i = this.temporalRect[e];
      this.el.style[e] = i - t[e] + "px";
    }), this) : this;
  }
  _removeHandlers() {
    return this.handlers.forEach((t) => t.destroy()), delete this.handlers, this;
  }
}
X.DDResizable = B;
B._originStyleProp = ["width", "height", "position", "left", "top", "opacity", "zIndex"];
var J = {};
Object.defineProperty(J, "__esModule", { value: !0 });
J.DDDraggable = void 0;
const st = L, U = T, bt = P;
class H extends bt.DDBaseImplement {
  constructor(t, e = {}) {
    super(), this.dragging = !1, this.ui = () => {
      const l = this.el.parentElement.getBoundingClientRect(), o = this.helper.getBoundingClientRect();
      return {
        position: {
          top: o.top - l.top,
          left: o.left - l.left
        }
      };
    }, this.el = t, this.option = e;
    let i = e.handle.substring(1);
    this.dragEl = t.classList.contains(i) ? t : t.querySelector(e.handle) || t, this._dragStart = this._dragStart.bind(this), this._drag = this._drag.bind(this), this._dragEnd = this._dragEnd.bind(this), this.enable();
  }
  on(t, e) {
    super.on(t, e);
  }
  off(t) {
    super.off(t);
  }
  enable() {
    super.enable(), this.dragEl.draggable = !0, this.dragEl.addEventListener("dragstart", this._dragStart), this.el.classList.remove("ui-draggable-disabled"), this.el.classList.add("ui-draggable");
  }
  disable(t = !1) {
    super.disable(), this.dragEl.removeAttribute("draggable"), this.dragEl.removeEventListener("dragstart", this._dragStart), this.el.classList.remove("ui-draggable"), t || this.el.classList.add("ui-draggable-disabled");
  }
  destroy() {
    this.dragging && this._dragEnd({}), this.disable(!0), delete this.el, delete this.helper, delete this.option, super.destroy();
  }
  updateOption(t) {
    return Object.keys(t).forEach((e) => this.option[e] = t[e]), this;
  }
  _dragStart(t) {
    st.DDManager.dragElement = this, this.helper = this._createHelper(t), this._setupHelperContainmentStyle(), this.dragOffset = this._getDragOffset(t, this.el, this.helperContainment);
    const e = U.DDUtils.initEvent(t, { target: this.el, type: "dragstart" });
    this.helper !== this.el ? (this._setupDragFollowNodeNotifyStart(e), this._dragFollow(t)) : this.dragFollowTimer = window.setTimeout(() => {
      delete this.dragFollowTimer, this._setupDragFollowNodeNotifyStart(e);
    }, 0), this._cancelDragGhost(t);
  }
  _setupDragFollowNodeNotifyStart(t) {
    return this._setupHelperStyle(), document.addEventListener("dragover", this._drag, H.dragEventListenerOption), this.dragEl.addEventListener("dragend", this._dragEnd), this.option.start && this.option.start(t, this.ui()), this.dragging = !0, this.helper.classList.add("ui-draggable-dragging"), this.triggerEvent("dragstart", t), this;
  }
  _drag(t) {
    t.preventDefault(), this._dragFollow(t);
    const e = U.DDUtils.initEvent(t, { target: this.el, type: "drag" });
    this.option.drag && this.option.drag(e, this.ui()), this.triggerEvent("drag", e);
  }
  _dragEnd(t) {
    if (this.dragFollowTimer) {
      clearTimeout(this.dragFollowTimer), delete this.dragFollowTimer;
      return;
    } else
      this.paintTimer && cancelAnimationFrame(this.paintTimer), document.removeEventListener("dragover", this._drag, H.dragEventListenerOption), this.dragEl.removeEventListener("dragend", this._dragEnd);
    this.dragging = !1, this.helper.classList.remove("ui-draggable-dragging"), this.helperContainment.style.position = this.parentOriginStylePosition || null, this.helper === this.el ? this._removeHelperStyle() : this.helper.remove();
    const e = U.DDUtils.initEvent(t, { target: this.el, type: "dragstop" });
    this.option.stop && this.option.stop(e), this.triggerEvent("dragstop", e), delete st.DDManager.dragElement, delete this.helper;
  }
  _createHelper(t) {
    let e = this.el;
    return typeof this.option.helper == "function" ? e = this.option.helper(t) : this.option.helper === "clone" && (e = U.DDUtils.clone(this.el)), document.body.contains(e) || U.DDUtils.appendTo(e, this.option.appendTo === "parent" ? this.el.parentNode : this.option.appendTo), e === this.el && (this.dragElementOriginStyle = H.originStyleProp.map((i) => this.el.style[i])), e;
  }
  _setupHelperStyle() {
    const t = this.helper.getBoundingClientRect(), e = this.helper.style;
    return e.pointerEvents = "none", e["min-width"] = 0, e.width = this.dragOffset.width + "px", e.height = this.dragOffset.height + "px", e.willChange = "left, top", e.position = "fixed", e.left = t.left + "px", e.top = t.top + "px", e.transition = "none", setTimeout(() => {
      this.helper && (e.transition = null);
    }, 0), this;
  }
  _removeHelperStyle() {
    var t;
    let e = (t = this.helper) === null || t === void 0 ? void 0 : t.gridstackNode;
    if (this.dragElementOriginStyle && (!e || !e._isAboutToRemove)) {
      let i = this.helper, s = this.dragElementOriginStyle.transition || null;
      i.style.transition = this.dragElementOriginStyle.transition = "none", H.originStyleProp.forEach((l) => i.style[l] = this.dragElementOriginStyle[l] || null), setTimeout(() => i.style.transition = s, 50);
    }
    return delete this.dragElementOriginStyle, this;
  }
  _dragFollow(t) {
    this.paintTimer && cancelAnimationFrame(this.paintTimer), this.paintTimer = requestAnimationFrame(() => {
      delete this.paintTimer;
      const e = this.dragOffset;
      let i = { left: 0, top: 0 };
      if (this.helper.style.position === "absolute") {
        const { left: s, top: l } = this.helperContainment.getBoundingClientRect();
        i = { left: s, top: l };
      }
      this.helper.style.left = t.clientX + e.offsetLeft - i.left + "px", this.helper.style.top = t.clientY + e.offsetTop - i.top + "px";
    });
  }
  _setupHelperContainmentStyle() {
    return this.helperContainment = this.helper.parentElement, this.helper.style.position !== "fixed" && (this.parentOriginStylePosition = this.helperContainment.style.position, window.getComputedStyle(this.helperContainment).position.match(/static/) && (this.helperContainment.style.position = "relative")), this;
  }
  _cancelDragGhost(t) {
    let e = document.createElement("div");
    return e.style.width = "1px", e.style.height = "1px", e.style.position = "fixed", document.body.appendChild(e), t.dataTransfer.setDragImage(e, 0, 0), setTimeout(() => document.body.removeChild(e)), t.stopPropagation(), this;
  }
  _getDragOffset(t, e, i) {
    let s = 0, l = 0;
    if (i) {
      const p = document.createElement("div");
      U.DDUtils.addElStyles(p, {
        opacity: "0",
        position: "fixed",
        top: 0 + "px",
        left: 0 + "px",
        width: "1px",
        height: "1px",
        zIndex: "-999999"
      }), i.appendChild(p);
      const g = p.getBoundingClientRect();
      i.removeChild(p), s = g.left, l = g.top;
    }
    const o = e.getBoundingClientRect();
    return {
      left: o.left,
      top: o.top,
      offsetLeft: -t.clientX + o.left - s,
      offsetTop: -t.clientY + o.top - l,
      width: o.width,
      height: o.height
    };
  }
}
J.DDDraggable = H;
H.dragEventListenerOption = !0;
H.originStyleProp = [
  "transition",
  "pointerEvents",
  "position",
  "left",
  "top",
  "opacity",
  "zIndex",
  "width",
  "height",
  "willChange",
  "min-width"
];
var Q = {};
Object.defineProperty(Q, "__esModule", { value: !0 });
Q.DDDroppable = void 0;
const M = L, vt = P, G = T;
class C extends vt.DDBaseImplement {
  constructor(t, e = {}) {
    super(), this.el = t, this.option = e, this._dragEnter = this._dragEnter.bind(this), this._dragOver = this._dragOver.bind(this), this._dragLeave = this._dragLeave.bind(this), this._drop = this._drop.bind(this), this.el.classList.add("ui-droppable"), this.el.addEventListener("dragenter", this._dragEnter), this._setupAccept();
  }
  on(t, e) {
    super.on(t, e);
  }
  off(t) {
    super.off(t);
  }
  enable() {
    !this.disabled || (super.enable(), this.el.classList.remove("ui-droppable-disabled"), this.el.addEventListener("dragenter", this._dragEnter));
  }
  disable(t = !1) {
    this.disabled || (super.disable(), t || this.el.classList.add("ui-droppable-disabled"), this.el.removeEventListener("dragenter", this._dragEnter));
  }
  destroy() {
    this._removeLeaveCallbacks(), this.disable(!0), this.el.classList.remove("ui-droppable"), this.el.classList.remove("ui-droppable-disabled"), super.destroy();
  }
  updateOption(t) {
    return Object.keys(t).forEach((e) => this.option[e] = t[e]), this._setupAccept(), this;
  }
  _dragEnter(t) {
    if (!this._canDrop() || (t.preventDefault(), t.stopPropagation(), this.moving))
      return;
    this.moving = !0;
    const e = G.DDUtils.initEvent(t, { target: this.el, type: "dropover" });
    this.option.over && this.option.over(e, this._ui(M.DDManager.dragElement)), this.triggerEvent("dropover", e), this.el.addEventListener("dragover", this._dragOver), this.el.addEventListener("drop", this._drop), this.el.addEventListener("dragleave", this._dragLeave), C.lastActive && C.lastActive !== this && C.lastActive._dragLeave(t, !0), C.lastActive = this;
  }
  _dragOver(t) {
    t.preventDefault(), t.stopPropagation();
  }
  _dragLeave(t, e) {
    var i;
    if (t.preventDefault(), t.stopPropagation(), !e) {
      let s = G.DDUtils.inside(t, this.el), l = M.DDManager.dragElement.el;
      if (s && !(!((i = l.gridstackNode) === null || i === void 0) && i.subGrid) && (s = !this.el.gridstack.engine.nodes.filter((p) => p.subGrid).map((p) => p.subGrid.el).some((p) => G.DDUtils.inside(t, p))), s)
        return;
    }
    if (this.moving) {
      const s = G.DDUtils.initEvent(t, { target: this.el, type: "dropout" });
      this.option.out && this.option.out(s, this._ui(M.DDManager.dragElement)), this.triggerEvent("dropout", s);
    }
    this._removeLeaveCallbacks(), C.lastActive === this && delete C.lastActive;
  }
  _drop(t) {
    if (!this.moving)
      return;
    t.preventDefault();
    const e = G.DDUtils.initEvent(t, { target: this.el, type: "drop" });
    this.option.drop && this.option.drop(e, this._ui(M.DDManager.dragElement)), this.triggerEvent("drop", e), this._removeLeaveCallbacks();
  }
  _removeLeaveCallbacks() {
    !this.moving || (delete this.moving, this.el.removeEventListener("dragover", this._dragOver), this.el.removeEventListener("drop", this._drop), this.el.removeEventListener("dragleave", this._dragLeave));
  }
  _canDrop() {
    return M.DDManager.dragElement && (!this.accept || this.accept(M.DDManager.dragElement.el));
  }
  _setupAccept() {
    return this.option.accept && typeof this.option.accept == "string" ? this.accept = (t) => t.matches(this.option.accept) : this.accept = this.option.accept, this;
  }
  _ui(t) {
    return Object.assign({ draggable: t.el }, t.ui());
  }
}
Q.DDDroppable = C;
Object.defineProperty(Y, "__esModule", { value: !0 });
Y.DDElement = void 0;
const wt = X, Et = J, xt = Q;
class it {
  constructor(t) {
    this.el = t;
  }
  static init(t) {
    return t.ddElement || (t.ddElement = new it(t)), t.ddElement;
  }
  on(t, e) {
    return this.ddDraggable && ["drag", "dragstart", "dragstop"].indexOf(t) > -1 ? this.ddDraggable.on(t, e) : this.ddDroppable && ["drop", "dropover", "dropout"].indexOf(t) > -1 ? this.ddDroppable.on(t, e) : this.ddResizable && ["resizestart", "resize", "resizestop"].indexOf(t) > -1 && this.ddResizable.on(t, e), this;
  }
  off(t) {
    return this.ddDraggable && ["drag", "dragstart", "dragstop"].indexOf(t) > -1 ? this.ddDraggable.off(t) : this.ddDroppable && ["drop", "dropover", "dropout"].indexOf(t) > -1 ? this.ddDroppable.off(t) : this.ddResizable && ["resizestart", "resize", "resizestop"].indexOf(t) > -1 && this.ddResizable.off(t), this;
  }
  setupDraggable(t) {
    return this.ddDraggable ? this.ddDraggable.updateOption(t) : this.ddDraggable = new Et.DDDraggable(this.el, t), this;
  }
  cleanDraggable() {
    return this.ddDraggable && (this.ddDraggable.destroy(), delete this.ddDraggable), this;
  }
  setupResizable(t) {
    return this.ddResizable ? this.ddResizable.updateOption(t) : this.ddResizable = new wt.DDResizable(this.el, t), this;
  }
  cleanResizable() {
    return this.ddResizable && (this.ddResizable.destroy(), delete this.ddResizable), this;
  }
  setupDroppable(t) {
    return this.ddDroppable ? this.ddDroppable.updateOption(t) : this.ddDroppable = new xt.DDDroppable(this.el, t), this;
  }
  cleanDroppable() {
    return this.ddDroppable && (this.ddDroppable.destroy(), delete this.ddDroppable), this;
  }
}
Y.DDElement = it;
var W = {};
Object.defineProperty(W, "__esModule", { value: !0 });
W.GridStackDD = void 0;
const rt = A, x = et, O = E;
class D extends rt.GridStackDDI {
  static get() {
    return rt.GridStackDDI.get();
  }
  remove(t) {
    return this.draggable(t, "destroy").resizable(t, "destroy"), t.gridstackNode && delete t.gridstackNode._initDD, this;
  }
}
W.GridStackDD = D;
x.GridStack.prototype._setupAcceptWidget = function() {
  if (this.opts.staticGrid || !this.opts.acceptWidgets && !this.opts.removable)
    return D.get().droppable(this.el, "destroy"), this;
  let d, t, e = (i, s, l) => {
    let o = s.gridstackNode;
    if (!o)
      return;
    l = l || s;
    let p = this.el.getBoundingClientRect(), { top: g, left: r } = l.getBoundingClientRect();
    r -= p.left, g -= p.top;
    let n = { position: { top: g, left: r } };
    if (o._temporaryRemoved) {
      if (o.x = Math.max(0, Math.round(r / t)), o.y = Math.max(0, Math.round(g / d)), delete o.autoPosition, this.engine.nodeBoundFix(o), !this.engine.willItFit(o)) {
        if (o.autoPosition = !0, !this.engine.willItFit(o)) {
          D.get().off(s, "drag");
          return;
        }
        o._willFitPos && (O.Utils.copyPos(o, o._willFitPos), delete o._willFitPos);
      }
      this._onStartMoving(l, i, n, o, t, d);
    } else
      this._dragOrResize(l, i, n, o, t, d);
  };
  return D.get().droppable(this.el, {
    accept: (i) => {
      let s = i.gridstackNode;
      if ((s == null ? void 0 : s.grid) === this)
        return !0;
      if (!this.opts.acceptWidgets || s != null && s.subGrid)
        return !1;
      let l = !0;
      if (typeof this.opts.acceptWidgets == "function")
        l = this.opts.acceptWidgets(i);
      else {
        let o = this.opts.acceptWidgets === !0 ? ".grid-stack-item" : this.opts.acceptWidgets;
        l = i.matches(o);
      }
      if (l && s && this.opts.maxRow) {
        let o = { w: s.w, h: s.h, minW: s.minW, minH: s.minH };
        l = this.engine.willItFit(o);
      }
      return l;
    }
  }).on(this.el, "dropover", (i, s, l) => {
    let o = s.gridstackNode;
    if ((o == null ? void 0 : o.grid) === this && !o._temporaryRemoved)
      return !1;
    (o == null ? void 0 : o.grid) && o.grid !== this && !o._temporaryRemoved && o.grid._leave(s, l), t = this.cellWidth(), d = this.getCellHeight(!0), o || (o = this._readAttr(s)), o.grid || (o._isExternal = !0, s.gridstackNode = o), l = l || s;
    let p = o.w || Math.round(l.offsetWidth / t) || 1, g = o.h || Math.round(l.offsetHeight / d) || 1;
    return o.grid && o.grid !== this ? (s._gridstackNodeOrig || (s._gridstackNodeOrig = o), s.gridstackNode = o = Object.assign(Object.assign({}, o), { w: p, h: g, grid: this }), this.engine.cleanupNode(o).nodeBoundFix(o), o._initDD = o._isExternal = o._temporaryRemoved = !0) : (o.w = p, o.h = g, o._temporaryRemoved = !0), F(o.el, !1), D.get().on(s, "drag", e), e(i, s, l), !1;
  }).on(this.el, "dropout", (i, s, l) => {
    let o = s.gridstackNode;
    return o && (!o.grid || o.grid === this) && this._leave(s, l), !1;
  }).on(this.el, "drop", (i, s, l) => {
    let o = s.gridstackNode;
    if ((o == null ? void 0 : o.grid) === this && !o._isExternal)
      return !1;
    let p = !!this.placeholder.parentElement;
    this.placeholder.remove();
    let g = s._gridstackNodeOrig;
    if (delete s._gridstackNodeOrig, p && g && g.grid && g.grid !== this) {
      let r = g.grid;
      r.engine.removedNodes.push(g), r._triggerRemoveEvent();
    }
    return !o || (p && (this.engine.cleanupNode(o), o.grid = this), D.get().off(s, "drag"), l !== s ? (l.remove(), s.gridstackNode = g, p && (s = s.cloneNode(!0))) : (s.remove(), D.get().remove(s)), !p) || (s.gridstackNode = o, o.el = s, O.Utils.copyPos(o, this._readAttr(this.placeholder)), O.Utils.removePositioningStyles(s), this._writeAttr(s, o), this.el.appendChild(s), this._updateContainerHeight(), this.engine.addedNodes.push(o), this._triggerAddEvent(), this._triggerChangeEvent(), this.engine.endUpdate(), this._gsEventHandler.dropped && this._gsEventHandler.dropped(Object.assign(Object.assign({}, i), { type: "dropped" }), g && g.grid ? g : void 0, o), window.setTimeout(() => {
      o.el && o.el.parentElement ? this._prepareDragDropByNode(o) : this.engine.removeNode(o);
    })), !1;
  }), this;
};
function F(d, t) {
  let e = d ? d.gridstackNode : void 0;
  !e || !e.grid || (t ? e._isAboutToRemove = !0 : delete e._isAboutToRemove, t ? d.classList.add("grid-stack-item-removing") : d.classList.remove("grid-stack-item-removing"));
}
x.GridStack.prototype._setupRemoveDrop = function() {
  if (!this.opts.staticGrid && typeof this.opts.removable == "string") {
    let d = document.querySelector(this.opts.removable);
    if (!d)
      return this;
    D.get().isDroppable(d) || D.get().droppable(d, this.opts.removableOptions).on(d, "dropover", (t, e) => F(e, !0)).on(d, "dropout", (t, e) => F(e, !1));
  }
  return this;
};
x.GridStack.setupDragIn = function(d, t) {
  let e, i;
  const s = {
    revert: "invalid",
    handle: ".grid-stack-item-content",
    scroll: !1,
    appendTo: "body"
  };
  if (d && (e = d, i = Object.assign(Object.assign({}, s), t || {})), typeof e != "string")
    return;
  let l = D.get();
  O.Utils.getElements(e).forEach((o) => {
    l.isDraggable(o) || l.dragIn(o, i);
  });
};
x.GridStack.prototype._prepareDragDropByNode = function(d) {
  let t = d.el, e = D.get();
  if (this.opts.staticGrid || (d.noMove || this.opts.disableDrag) && (d.noResize || this.opts.disableResize))
    return d._initDD && (e.remove(t), delete d._initDD), t.classList.add("ui-draggable-disabled", "ui-resizable-disabled"), this;
  if (!d._initDD) {
    let i, s, l = (g, r) => {
      this._gsEventHandler[g.type] && this._gsEventHandler[g.type](g, g.target), i = this.cellWidth(), s = this.getCellHeight(!0), this._onStartMoving(t, g, r, d, i, s);
    }, o = (g, r) => {
      this._dragOrResize(t, g, r, d, i, s);
    }, p = (g) => {
      this.placeholder.remove(), delete d._moving, delete d._lastTried;
      let r = g.target;
      if (!(!r.gridstackNode || r.gridstackNode.grid !== this)) {
        if (d.el = r, d._isAboutToRemove) {
          let n = t.gridstackNode.grid;
          n._gsEventHandler[g.type] && n._gsEventHandler[g.type](g, r), e.remove(t), n.engine.removedNodes.push(d), n._triggerRemoveEvent(), delete t.gridstackNode, delete d.el, t.remove();
        } else
          d._temporaryRemoved ? (O.Utils.removePositioningStyles(r), O.Utils.copyPos(d, d._orig), this._writePosAttr(r, d), this.engine.addNode(d)) : (O.Utils.removePositioningStyles(r), this._writePosAttr(r, d)), this._gsEventHandler[g.type] && this._gsEventHandler[g.type](g, r);
        this._extraDragRow = 0, this._updateContainerHeight(), this._triggerChangeEvent(), this.engine.endUpdate();
      }
    };
    e.draggable(t, {
      start: l,
      stop: p,
      drag: o
    }).resizable(t, {
      start: l,
      stop: p,
      resize: o
    }), d._initDD = !0;
  }
  return d.noMove || this.opts.disableDrag ? (e.draggable(t, "disable"), t.classList.add("ui-draggable-disabled")) : (e.draggable(t, "enable"), t.classList.remove("ui-draggable-disabled")), d.noResize || this.opts.disableResize ? (e.resizable(t, "disable"), t.classList.add("ui-resizable-disabled")) : (e.resizable(t, "enable"), t.classList.remove("ui-resizable-disabled")), this;
};
x.GridStack.prototype._onStartMoving = function(d, t, e, i, s, l) {
  if (this.engine.cleanNodes().beginUpdate(i), this._writePosAttr(this.placeholder, i), this.el.appendChild(this.placeholder), i.el = this.placeholder, i._lastUiPosition = e.position, i._prevYPix = e.position.top, i._moving = t.type === "dragstart", delete i._lastTried, t.type === "dropover" && i._temporaryRemoved && (this.engine.addNode(i), i._moving = !0), this.engine.cacheRects(s, l, this.opts.marginTop, this.opts.marginRight, this.opts.marginBottom, this.opts.marginLeft), t.type === "resizestart") {
    let o = D.get().resizable(d, "option", "minWidth", s * (i.minW || 1)).resizable(d, "option", "minHeight", l * (i.minH || 1));
    i.maxW && o.resizable(d, "option", "maxWidth", s * i.maxW), i.maxH && o.resizable(d, "option", "maxHeight", l * i.maxH);
  }
};
x.GridStack.prototype._leave = function(d, t) {
  let e = d.gridstackNode;
  !e || (D.get().off(d, "drag"), !e._temporaryRemoved && (e._temporaryRemoved = !0, this.engine.removeNode(e), e.el = e._isExternal && t ? t : d, this.opts.removable === !0 && F(d, !0), d._gridstackNodeOrig ? (d.gridstackNode = d._gridstackNodeOrig, delete d._gridstackNodeOrig) : e._isExternal && (delete e.el, delete d.gridstackNode, this.engine.restoreInitial())));
};
x.GridStack.prototype._dragOrResize = function(d, t, e, i, s, l) {
  let o = Object.assign({}, i._orig), p, g = this.opts.marginLeft, r = this.opts.marginRight, n = this.opts.marginTop, a = this.opts.marginBottom, h = Math.round(l * 0.1), c = Math.round(s * 0.1);
  if (g = Math.min(g, c), r = Math.min(r, c), n = Math.min(n, h), a = Math.min(a, h), t.type === "drag") {
    if (i._temporaryRemoved)
      return;
    let u = e.position.top - i._prevYPix;
    i._prevYPix = e.position.top, O.Utils.updateScrollPosition(d, e.position, u);
    let f = e.position.left + (e.position.left > i._lastUiPosition.left ? -r : g), m = e.position.top + (e.position.top > i._lastUiPosition.top ? -a : n);
    o.x = Math.round(f / s), o.y = Math.round(m / l);
    let _ = this._extraDragRow;
    if (this.engine.collide(i, o)) {
      let b = this.getRow(), w = Math.max(0, o.y + i.h - b);
      this.opts.maxRow && b + w > this.opts.maxRow && (w = Math.max(0, this.opts.maxRow - b)), this._extraDragRow = w;
    } else
      this._extraDragRow = 0;
    if (this._extraDragRow !== _ && this._updateContainerHeight(), i.x === o.x && i.y === o.y)
      return;
  } else if (t.type === "resize") {
    if (o.x < 0 || (O.Utils.updateScrollResize(t, d, l), o.w = Math.round((e.size.width - g) / s), o.h = Math.round((e.size.height - n) / l), i.w === o.w && i.h === o.h) || i._lastTried && i._lastTried.w === o.w && i._lastTried.h === o.h)
      return;
    let u = e.position.left + g, f = e.position.top + n;
    o.x = Math.round(u / s), o.y = Math.round(f / l), p = !0;
  }
  i._lastTried = o;
  let y = {
    x: e.position.left + g,
    y: e.position.top + n,
    w: (e.size ? e.size.width : i.w * s) - g - r,
    h: (e.size ? e.size.height : i.h * l) - n - a
  };
  if (this.engine.moveNodeCheck(i, Object.assign(Object.assign({}, o), { cellWidth: s, cellHeight: l, rect: y, resizing: p }))) {
    i._lastUiPosition = e.position, this.engine.cacheRects(s, l, n, r, a, g), delete i._skipDown, p && i.subGrid && i.subGrid.onParentResize(), this._extraDragRow = 0, this._updateContainerHeight();
    let u = t.target;
    this._writePosAttr(u, i), this._gsEventHandler[t.type] && this._gsEventHandler[t.type](t, u);
  }
};
x.GridStack.prototype.movable = function(d, t) {
  return this.opts.staticGrid ? this : (x.GridStack.getElements(d).forEach((e) => {
    let i = e.gridstackNode;
    !i || (t ? delete i.noMove : i.noMove = !0, this._prepareDragDropByNode(i));
  }), this);
};
x.GridStack.prototype.resizable = function(d, t) {
  return this.opts.staticGrid ? this : (x.GridStack.getElements(d).forEach((e) => {
    let i = e.gridstackNode;
    !i || (t ? delete i.noResize : i.noResize = !0, this._prepareDragDropByNode(i));
  }), this);
};
x.GridStack.prototype.disable = function() {
  if (!this.opts.staticGrid)
    return this.enableMove(!1), this.enableResize(!1), this._triggerEvent("disable"), this;
};
x.GridStack.prototype.enable = function() {
  if (!this.opts.staticGrid)
    return this.enableMove(!0), this.enableResize(!0), this._triggerEvent("enable"), this;
};
x.GridStack.prototype.enableMove = function(d) {
  return this.opts.staticGrid ? this : (this.opts.disableDrag = !d, this.engine.nodes.forEach((t) => this.movable(t.el, d)), this);
};
x.GridStack.prototype.enableResize = function(d) {
  return this.opts.staticGrid ? this : (this.opts.disableResize = !d, this.engine.nodes.forEach((t) => this.resizable(t.el, d)), this);
};
(function(d) {
  var t = S && S.__createBinding || (Object.create ? function(g, r, n, a) {
    a === void 0 && (a = n), Object.defineProperty(g, a, { enumerable: !0, get: function() {
      return r[n];
    } });
  } : function(g, r, n, a) {
    a === void 0 && (a = n), g[a] = r[n];
  }), e = S && S.__exportStar || function(g, r) {
    for (var n in g)
      n !== "default" && !r.hasOwnProperty(n) && t(r, g, n);
  };
  Object.defineProperty(d, "__esModule", { value: !0 }), d.GridStackDDNative = void 0;
  const i = L, s = Y, l = W, o = E;
  e(W, d);
  class p extends l.GridStackDD {
    resizable(r, n, a, h) {
      return this._getDDElements(r).forEach((c) => {
        if (n === "disable" || n === "enable")
          c.ddResizable && c.ddResizable[n]();
        else if (n === "destroy")
          c.ddResizable && c.cleanResizable();
        else if (n === "option")
          c.setupResizable({ [a]: h });
        else {
          const y = c.el.gridstackNode.grid;
          let u = c.el.getAttribute("gs-resize-handles") ? c.el.getAttribute("gs-resize-handles") : y.opts.resizable.handles;
          c.setupResizable(Object.assign(Object.assign(Object.assign({}, y.opts.resizable), { handles: u }), {
            start: n.start,
            stop: n.stop,
            resize: n.resize
          }));
        }
      }), this;
    }
    draggable(r, n, a, h) {
      return this._getDDElements(r).forEach((c) => {
        if (n === "disable" || n === "enable")
          c.ddDraggable && c.ddDraggable[n]();
        else if (n === "destroy")
          c.ddDraggable && c.cleanDraggable();
        else if (n === "option")
          c.setupDraggable({ [a]: h });
        else {
          const y = c.el.gridstackNode.grid;
          c.setupDraggable(Object.assign(Object.assign({}, y.opts.draggable), {
            containment: y.opts._isNested && !y.opts.dragOut ? y.el.parentElement : y.opts.draggable.containment || null,
            start: n.start,
            stop: n.stop,
            drag: n.drag
          }));
        }
      }), this;
    }
    dragIn(r, n) {
      return this._getDDElements(r).forEach((a) => a.setupDraggable(n)), this;
    }
    droppable(r, n, a, h) {
      return typeof n.accept == "function" && !n._accept && (n._accept = n.accept, n.accept = (c) => n._accept(c)), this._getDDElements(r).forEach((c) => {
        n === "disable" || n === "enable" ? c.ddDroppable && c.ddDroppable[n]() : n === "destroy" ? c.ddDroppable && c.cleanDroppable() : n === "option" ? c.setupDroppable({ [a]: h }) : c.setupDroppable(n);
      }), this;
    }
    isDroppable(r) {
      return !!(r && r.ddElement && r.ddElement.ddDroppable && !r.ddElement.ddDroppable.disabled);
    }
    isDraggable(r) {
      return !!(r && r.ddElement && r.ddElement.ddDraggable && !r.ddElement.ddDraggable.disabled);
    }
    isResizable(r) {
      return !!(r && r.ddElement && r.ddElement.ddResizable && !r.ddElement.ddResizable.disabled);
    }
    on(r, n, a) {
      return this._getDDElements(r).forEach((h) => h.on(n, (c) => {
        a(c, i.DDManager.dragElement ? i.DDManager.dragElement.el : c.target, i.DDManager.dragElement ? i.DDManager.dragElement.helper : null);
      })), this;
    }
    off(r, n) {
      return this._getDDElements(r).forEach((a) => a.off(n)), this;
    }
    _getDDElements(r, n = !0) {
      let a = o.Utils.getElements(r);
      if (!a.length)
        return [];
      let h = a.map((c) => c.ddElement || (n ? s.DDElement.init(c) : null));
      return n || h.filter((c) => c), h;
    }
  }
  d.GridStackDDNative = p, l.GridStackDD.registerPlugin(p);
})(ct);
var q = { exports: {} };
(function(d, t) {
  (function(e, i) {
    var s = {};
    e.PubSub ? (s = e.PubSub, console.warn("PubSub already loaded, using existing version")) : (e.PubSub = s, i(s)), d !== void 0 && d.exports && (t = d.exports = s), t.PubSub = s, d.exports = t = s;
  })(typeof window == "object" && window || S, function(e) {
    var i = {}, s = -1, l = "*";
    function o(u) {
      var f;
      for (f in u)
        if (Object.prototype.hasOwnProperty.call(u, f))
          return !0;
      return !1;
    }
    function p(u) {
      return function() {
        throw u;
      };
    }
    function g(u, f, m) {
      try {
        u(f, m);
      } catch (_) {
        setTimeout(p(_), 0);
      }
    }
    function r(u, f, m) {
      u(f, m);
    }
    function n(u, f, m, _) {
      var b = i[f], w = _ ? r : g, R;
      if (!!Object.prototype.hasOwnProperty.call(i, f))
        for (R in b)
          Object.prototype.hasOwnProperty.call(b, R) && w(b[R], u, m);
    }
    function a(u, f, m) {
      return function() {
        var b = String(u), w = b.lastIndexOf(".");
        for (n(u, u, f, m); w !== -1; )
          b = b.substr(0, w), w = b.lastIndexOf("."), n(u, b, f, m);
        n(u, l, f, m);
      };
    }
    function h(u) {
      var f = String(u), m = Boolean(Object.prototype.hasOwnProperty.call(i, f) && o(i[f]));
      return m;
    }
    function c(u) {
      for (var f = String(u), m = h(f) || h(l), _ = f.lastIndexOf("."); !m && _ !== -1; )
        f = f.substr(0, _), _ = f.lastIndexOf("."), m = h(f);
      return m;
    }
    function y(u, f, m, _) {
      u = typeof u == "symbol" ? u.toString() : u;
      var b = a(u, f, _), w = c(u);
      return w ? (m === !0 ? b() : setTimeout(b, 0), !0) : !1;
    }
    e.publish = function(u, f) {
      return y(u, f, !1, e.immediateExceptions);
    }, e.publishSync = function(u, f) {
      return y(u, f, !0, e.immediateExceptions);
    }, e.subscribe = function(u, f) {
      if (typeof f != "function")
        return !1;
      u = typeof u == "symbol" ? u.toString() : u, Object.prototype.hasOwnProperty.call(i, u) || (i[u] = {});
      var m = "uid_" + String(++s);
      return i[u][m] = f, m;
    }, e.subscribeAll = function(u) {
      return e.subscribe(l, u);
    }, e.subscribeOnce = function(u, f) {
      var m = e.subscribe(u, function() {
        e.unsubscribe(m), f.apply(this, arguments);
      });
      return e;
    }, e.clearAllSubscriptions = function() {
      i = {};
    }, e.clearSubscriptions = function(f) {
      var m;
      for (m in i)
        Object.prototype.hasOwnProperty.call(i, m) && m.indexOf(f) === 0 && delete i[m];
    }, e.countSubscriptions = function(f) {
      var m, _, b = 0;
      for (m in i)
        if (Object.prototype.hasOwnProperty.call(i, m) && m.indexOf(f) === 0) {
          for (_ in i[m])
            b++;
          break;
        }
      return b;
    }, e.getSubscriptions = function(f) {
      var m, _ = [];
      for (m in i)
        Object.prototype.hasOwnProperty.call(i, m) && m.indexOf(f) === 0 && _.push(m);
      return _;
    }, e.unsubscribe = function(u) {
      var f = function(lt) {
        var Z;
        for (Z in i)
          if (Object.prototype.hasOwnProperty.call(i, Z) && Z.indexOf(lt) === 0)
            return !0;
        return !1;
      }, m = typeof u == "string" && (Object.prototype.hasOwnProperty.call(i, u) || f(u)), _ = !m && typeof u == "string", b = typeof u == "function", w = !1, R, k, $;
      if (m) {
        e.clearSubscriptions(u);
        return;
      }
      for (R in i)
        if (Object.prototype.hasOwnProperty.call(i, R)) {
          if (k = i[R], _ && k[u]) {
            delete k[u], w = u;
            break;
          }
          if (b)
            for ($ in k)
              Object.prototype.hasOwnProperty.call(k, $) && k[$] === u && (delete k[$], w = !0);
        }
      return w;
    };
  });
})(q, q.exports);
const Dt = {
  first(d, t) {
    return d.reduce(function(e, i, s, l) {
      return l[0];
    }, t);
  }
}, Rt = ".gsg", St = "#gsg-images";
function Ot(d = {
  selector: Rt,
  images: [],
  gridItemTemplate: (t) => `<img class="cursor-pointer rounded-lg object-cover" src="${t}" />`
}) {
  d = Ct(d);
  let t = Nt(d);
  return t = Ht(t, d), t.compact(), t = kt(t), t;
}
function Ct(d) {
  if (!(d.images.length > 0)) {
    const t = document.querySelector(St);
    t && t.textContent && (d.images = JSON.parse(t.textContent));
  }
  return d;
}
function Nt(d) {
  return et.GridStack.init(
    {
      disableOneColumnMode: !0,
      margin: "1px"
    },
    d.selector
  );
}
function Ht(d, t) {
  const e = d.batchUpdate();
  for (let s of t.images)
    console.log(s), d.addWidget({
      content: t.gridItemTemplate(s),
      h: 2,
      w: 2
    });
  const i = Dt.first(e.getGridItems());
  return i && e.update(i, { h: 8, w: 8 }), e.commit(), d;
}
function kt(d) {
  return d.getGridItems().forEach(function(t) {
    zt(t);
  }), q.exports.subscribe("gsg.swap.image", function(t, e) {
    var s;
    const i = d.batchUpdate();
    for (const l of d.getGridItems())
      l === e.el ? (i.update(l, { w: 8, h: 8 }), (((s = l.gridstackNode) == null ? void 0 : s.w) || 0) < 8 && d.update(l, { x: 2, y: 2, w: 8, h: 8 })) : i.update(l, { w: 2, h: 2 });
    i.commit(), d.compact();
  }), d;
}
function zt(d) {
  d.addEventListener("click", function() {
    d.querySelectorAll("img").forEach(() => {
      q.exports.publish("gsg.swap.image", {
        el: d
      });
    });
  });
}
typeof window !== void 0 && (window.GridStackGallery = Ot);
export {
  Ot as default
};
