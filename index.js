function Yu(vt) {
  return vt && vt.__esModule && Object.prototype.hasOwnProperty.call(vt, "default") ? vt.default : vt
}
var Wu = Object.defineProperty;
var Ca = t => {
  throw TypeError(t)
}
  ;
var Gu = (t, e, s) => e in t ? Wu(t, e, {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: s
}) : t[e] = s;
var tn = (t, e, s) => Gu(t, typeof e != "symbol" ? e + "" : e, s)
  , Da = (t, e, s) => e.has(t) || Ca("Cannot " + s);
var i = (t, e, s) => (Da(t, e, "read from private field"),
  s ? s.call(t) : e.get(t))
  , p = (t, e, s) => e.has(t) ? Ca("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s)
  , g = (t, e, s, r) => (Da(t, e, "write to private field"),
    r ? r.call(t, s) : e.set(t, s),
    s);

(function () {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload"))
    return;
  for (const n of document.querySelectorAll('link[rel="modulepreload"]'))
    r(n);
  new MutationObserver(n => {
    for (const o of n)
      if (o.type === "childList")
        for (const a of o.addedNodes)
          a.tagName === "LINK" && a.rel === "modulepreload" && r(a)
  }
  ).observe(document, {
    childList: !0,
    subtree: !0
  });
  function s(n) {
    const o = {};
    return n.integrity && (o.integrity = n.integrity),
      n.referrerPolicy && (o.referrerPolicy = n.referrerPolicy),
      n.crossOrigin === "use-credentials" ? o.credentials = "include" : n.crossOrigin === "anonymous" ? o.credentials = "omit" : o.credentials = "same-origin",
      o
  }
  function r(n) {
    if (n.ep)
      return;
    n.ep = !0;
    const o = s(n);
    fetch(n.href, o)
  }
}
)();
var As, hi;
class Zu {
  constructor(e) {
    p(this, As);
    p(this, hi, new Set);
    g(this, As, e)
  }
  get current() {
    return i(this, As)
  }
  set current(e) {
    i(this, As) != e && (g(this, As, e),
      i(this, hi).forEach(s => s(e)))
  }
  on(e) {
    return i(this, hi).add(e),
      () => i(this, hi).delete(e)
  }
}
As = new WeakMap,
  hi = new WeakMap;
const xc = t => new Zu(t)
  , Mo = Symbol.for("atomico.hooks");
globalThis[Mo] = globalThis[Mo] || {};
let Ai = globalThis[Mo];
const Ju = Symbol.for("Atomico.suspense")
  , Sc = Symbol.for("Atomico.effect")
  , Qu = Symbol.for("Atomico.layoutEffect")
  , _c = Symbol.for("Atomico.insertionEffect")
  , _i = (t, e, s) => {
    const { i: r, hooks: n } = Ai.c
      , o = n[r] = n[r] || {};
    return o.value = t(o.value),
      o.effect = e,
      o.tag = s,
      Ai.c.i++,
      n[r].value
  }
  , Xu = t => _i((e = xc(t)) => e)
  , ur = () => _i((t = xc(Ai.c.host)) => t)
  , Ec = () => Ai.c.update
  , td = (t, e, s = 0) => {
    let r = {}
      , n = !1;
    const o = () => n
      , a = (l, h) => {
        for (const u in r) {
          const c = r[u];
          c.effect && c.tag === l && (c.value = c.effect(c.value, h))
        }
      }
      ;
    return {
      load: l => {
        Ai.c = {
          host: e,
          hooks: r,
          update: t,
          i: 0,
          id: s
        };
        let h;
        try {
          n = !1,
            h = l()
        } catch (u) {
          if (u !== Ju)
            throw u;
          n = !0
        } finally {
          Ai.c = null
        }
        return h
      }
      ,
      cleanEffects: l => (a(_c, l),
        () => (a(Qu, l),
          () => {
            a(Sc, l)
          }
        )),
      isSuspense: o
    }
  }
  , Ei = Symbol.for;
function kc(t, e) {
  const s = t.length;
  if (s !== e.length)
    return !1;
  for (let r = 0; r < s; r++) {
    let n = t[r]
      , o = e[r];
    if (n !== o)
      return !1
  }
  return !0
}
const Ce = t => typeof t == "function"
  , Wi = t => typeof t == "object"
  , { isArray: ed } = Array
  , Io = (t, e) => (e ? t instanceof HTMLStyleElement : !0) && "hydrate" in ((t == null ? void 0 : t.dataset) || {});
function zc(t, e) {
  let s;
  const r = n => {
    let { length: o } = n;
    for (let a = 0; a < o; a++) {
      const l = n[a];
      if (l && Array.isArray(l))
        r(l);
      else {
        const h = typeof l;
        if (l == null || h === "function" || h === "boolean")
          continue;
        h === "string" || h === "number" ? (s == null && (s = ""),
          s += l) : (s != null && (e(s),
            s = null),
            e(l))
      }
    }
  }
    ;
  r(t),
    s != null && e(s)
}
const $c = (t, e, s) => (t.addEventListener(e, s),
  () => t.removeEventListener(e, s));
class Cc {
  constructor(e, s, r) {
    this.message = s,
      this.target = e,
      this.value = r
  }
}
class Dc extends Cc {
}
class sd extends Cc {
}
const Lr = "Custom"
  , id = null
  , rd = {
    true: 1,
    "": 1,
    1: 1
  };
function nd(t, e, s, r, n) {
  const { type: o, reflect: a, event: l, value: h, attr: u = od(e) } = (s == null ? void 0 : s.name) != Lr && Wi(s) && s != id ? s : {
    type: s
  }
    , c = (o == null ? void 0 : o.name) === Lr && o.map
    , d = h != null ? o == Function || !Ce(h) ? () => h : h : null;
  Object.defineProperty(t, e, {
    configurable: !0,
    set(f) {
      const y = this[e];
      d && o != Boolean && f == null && (f = d());
      const { error: b, value: w } = (c ? hd : cd)(o, f);
      if (b && w != null)
        throw new Dc(this, `The value defined for prop '${e}' must be of type '${o.name}'`, w);
      y != w && (this._props[e] = w ?? void 0,
        this.update(),
        l && Lc(this, l),
        this.updated.then(() => {
          a && (this._ignoreAttr = u,
            ad(this, o, u, this[e]),
            this._ignoreAttr = null)
        }
        ))
    },
    get() {
      return this._props[e]
    }
  }),
    d && (n[e] = d()),
    r[u] = {
      prop: e,
      type: o
    }
}
const Lc = (t, { type: e, base: s = CustomEvent, ...r }) => t.dispatchEvent(new s(e, r))
  , od = t => t.replace(/([A-Z])/g, "-$1").toLowerCase()
  , ad = (t, e, s, r) => r == null || e == Boolean && !r ? t.removeAttribute(s) : t.setAttribute(s, (e == null ? void 0 : e.name) === Lr && (e != null && e.serialize) ? e == null ? void 0 : e.serialize(r) : Wi(r) ? JSON.stringify(r) : e == Boolean ? "" : r)
  , ld = (t, e) => t == Boolean ? !!rd[e] : t == Number ? Number(e) : t == String ? e : t == Array || t == Object ? JSON.parse(e) : t.name == Lr ? e : new t(e)
  , hd = ({ map: t }, e) => {
    try {
      return {
        value: t(e),
        error: !1
      }
    } catch {
      return {
        value: e,
        error: !0
      }
    }
  }
  , cd = (t, e) => t == null || e == null ? {
    value: e,
    error: !1
  } : t != String && e === "" ? {
    value: void 0,
    error: !1
  } : t == Object || t == Array || t == Symbol ? {
    value: e,
    error: {}.toString.call(e) !== `[object ${t.name}]`
  } : e instanceof t ? {
    value: e,
    error: t == Number && Number.isNaN(e.valueOf())
  } : t == String || t == Number || t == Boolean ? {
    value: e,
    error: t == Number ? typeof e != "number" ? !0 : Number.isNaN(e) : t == String ? typeof e != "string" : typeof e != "boolean"
  } : {
    value: e,
    error: !0
  };
let ud = 0;
const dd = t => {
  var s;
  return ((s = (t == null ? void 0 : t.dataset) || {}) == null ? void 0 : s.hydrate) || "" || "c" + ud++
}
  , dr = (t, e = HTMLElement) => {
    const s = {}
      , r = {}
      , n = "prototype" in e && e.prototype instanceof Element
      , o = n ? e : "base" in e ? e.base : HTMLElement
      , { props: a, styles: l } = n ? t : e;
    class h extends o {
      constructor() {
        super(),
          this._setup(),
          this._render = () => t({
            ...this._props
          });
        for (const c in r)
          this[c] = r[c]
      }
      static get styles() {
        return [super.styles, l]
      }
      async _setup() {
        if (this._props)
          return;
        this._props = {};
        let c, d;
        this.mounted = new Promise(v => this.mount = () => {
          v(),
            c != this.parentNode && (d != c ? this.unmounted.then(this.update) : this.update()),
            c = this.parentNode
        }
        ),
          this.unmounted = new Promise(v => this.unmount = () => {
            v(),
              (c != this.parentNode || !this.isConnected) && (f.cleanEffects(!0)()(),
                d = this.parentNode,
                c = null)
          }
          ),
          this.symbolId = this.symbolId || Symbol(),
          this.symbolIdParent = Symbol();
        const f = td(() => this.update(), this, dd(this));
        let y, b = !0;
        const w = Io(this);
        this.update = () => (y || (y = !0,
          this.updated = (this.updated || this.mounted).then(() => {
            try {
              const v = f.load(this._render)
                , E = f.cleanEffects();
              return v && v.render(this, this.symbolId, w),
                y = !1,
                b && !f.isSuspense() && (b = !1,
                  !w && fd(this)),
                E()
            } finally {
              y = !1
            }
          }
          ).then(v => {
            v && v()
          }
          )),
          this.updated),
          this.update()
      }
      connectedCallback() {
        this.mount(),
          super.connectedCallback && super.connectedCallback()
      }
      disconnectedCallback() {
        super.disconnectedCallback && super.disconnectedCallback(),
          this.unmount()
      }
      attributeChangedCallback(c, d, f) {
        if (s[c]) {
          if (c === this._ignoreAttr || d === f)
            return;
          const { prop: y, type: b } = s[c];
          try {
            this[y] = ld(b, f)
          } catch {
            throw new sd(this, `The value defined as attr '${c}' cannot be parsed by type '${b.name}'`, f)
          }
        } else
          super.attributeChangedCallback(c, d, f)
      }
      static get props() {
        return {
          ...super.props,
          ...a
        }
      }
      static get observedAttributes() {
        const c = super.observedAttributes || [];
        for (const d in a)
          nd(this.prototype, d, a[d], s, r);
        return Object.keys(s).concat(c)
      }
    }
    return h
  }
  ;
function fd(t) {
  const { styles: e } = t.constructor
    , { shadowRoot: s } = t;
  if (s && e.length) {
    const r = [];
    zc(e, n => {
      n && (n instanceof Element ? s.appendChild(n.cloneNode(!0)) : r.push(n))
    }
    ),
      r.length && (s.adoptedStyleSheets = r)
  }
}
const Pc = t => (e, s) => {
  _i(([r, n] = []) => ((n || !n) && (n && kc(n, s) ? r = r || !0 : (Ce(r) && r(),
    r = null)),
    [r, s]), ([r, n], o) => o ? (Ce(r) && r(),
      []) : [r || e(), n], t)
}
  , sr = Pc(Sc)
  , gd = Pc(_c);
class Tc extends Array {
  constructor(e, s) {
    let r = !0;
    const n = o => {
      try {
        s(o, this, r)
      } finally {
        r = !1
      }
    }
      ;
    super(void 0, n, s),
      n(e)
  }
}
const Xo = t => {
  const e = Ec();
  return _i((s = new Tc(t, (r, n, o) => {
    r = Ce(r) ? r(n[0]) : r,
      r !== n[0] && (n[0] = r,
        o || e())
  }
  )) => s)
}
  , fs = (t, e) => {
    const [s] = _i(([r, n, o = 0] = []) => ((!n || n && !kc(n, e)) && (r = t()),
      [r, e, o]));
    return s
  }
  , ta = t => {
    const { current: e } = ur();
    if (!(t in e))
      throw new Dc(e, `For useProp("${t}"), the prop does not exist on the host.`, t);
    return _i((s = new Tc(e[t], (r, n) => {
      r = Ce(r) ? r(e[t]) : r,
        e[t] = r
    }
    )) => (s[0] = e[t],
      s))
  }
  , cs = (t, e = {}) => {
    const s = ur();
    return s[t] || (s[t] = (r = e.detail) => Lc(s.current, {
      type: t,
      ...e,
      detail: r
    })),
      s[t]
  }
  , Fo = Ei("atomico/options");
globalThis[Fo] = globalThis[Fo] || {
  sheet: !!document.adoptedStyleSheets
};
const jc = globalThis[Fo]
  , pd = {
    checked: 1,
    value: 1,
    selected: 1
  }
  , yd = {
    list: 1,
    type: 1,
    size: 1,
    form: 1,
    width: 1,
    height: 1,
    src: 1,
    href: 1,
    slot: 1
  }
  , md = {
    shadowDom: 1,
    staticNode: 1,
    cloneNode: 1,
    children: 1,
    key: 1
  }
  , Er = {}
  , Ro = [];
class Uo extends Text {
}
const bd = Ei("atomico/id")
  , Gi = Ei("atomico/type")
  , en = Ei("atomico/ref")
  , Mc = Ei("atomico/vnode")
  , wd = () => { }
  ;
function vd(t, e, s) {
  return Fc(this, t, e, s)
}
const Ic = (t, e, ...s) => {
  const r = e || Er;
  let { children: n } = r;
  if (n = n ?? (s.length ? s : Ro),
    t === wd)
    return n;
  const o = t ? t instanceof Node ? 1 : t.prototype instanceof HTMLElement && 2 : 0;
  if (o === !1 && t instanceof Function)
    return t(n != Ro ? {
      children: n,
      ...r
    } : r);
  const a = jc.render || vd;
  return {
    [Gi]: Mc,
    type: t,
    props: r,
    children: n,
    key: r.key,
    shadow: r.shadowDom,
    static: r.staticNode,
    raw: o,
    is: r.is,
    clone: r.cloneNode,
    render: a
  }
}
  ;
function Fc(t, e, s = bd, r, n) {
  let o;
  if (e && e[s] && e[s].vnode == t || t[Gi] != Mc)
    return e;
  (t || !e) && (n = n || t.type == "svg",
    o = t.type != "host" && (t.raw == 1 ? (e && t.clone ? e[en] : e) != t.type : t.raw == 2 ? !(e instanceof t.type) : e ? e[en] || e.localName != t.type : !e),
    o && t.type != null && (t.raw == 1 && t.clone ? (r = !0,
      e = t.type.cloneNode(!0),
      e[en] = t.type) : e = t.raw == 1 ? t.type : t.raw == 2 ? new t.type : n ? document.createElementNS("http://www.w3.org/2000/svg", t.type) : document.createElement(t.type, t.is ? {
        is: t.is
      } : void 0)));
  const a = e[s] ? e[s] : Er
    , { vnode: l = Er, cycle: h = 0 } = a;
  let { fragment: u, handlers: c } = a;
  const { children: d = Ro, props: f = Er } = l;
  if (c = o ? {} : c || {},
    t.static && !o)
    return e;
  if (t.shadow && !e.shadowRoot && e.attachShadow({
    mode: "open",
    ...t.shadow
  }),
    t.props != f && xd(e, f, t.props, c, n),
    t.children !== d) {
    const y = t.shadow ? e.shadowRoot : e;
    u = Od(t.children, u, y, s, !h && r, n && t.type == "foreignObject" ? !1 : n)
  }
  return e[s] = {
    vnode: t,
    handlers: c,
    fragment: u,
    cycle: h + 1
  },
    e
}
function Ad(t, e) {
  const s = new Uo("")
    , r = new Uo("");
  let n;
  if (t[e ? "prepend" : "append"](s),
    e) {
    let { lastElementChild: o } = t;
    for (; o;) {
      const { previousElementSibling: a } = o;
      if (Io(o, !0) && !Io(a, !0)) {
        n = o;
        break
      }
      o = a
    }
  }
  return n ? n.before(r) : t.append(r),
  {
    markStart: s,
    markEnd: r
  }
}
function Od(t, e, s, r, n, o) {
  t = t == null ? null : ed(t) ? t : [t];
  const a = e || Ad(s, n)
    , { markStart: l, markEnd: h, keyes: u } = a;
  let c;
  const d = u && new Set;
  let f = l;
  if (t && zc(t, y => {
    if (typeof y == "object" && !y[Gi])
      return;
    const b = y[Gi] && y.key
      , w = u && b != null && u.get(b);
    f != h && f === w ? d.delete(f) : f = f == h ? h : f.nextSibling;
    const v = u ? w : f;
    let E = v;
    if (y[Gi])
      E = Fc(y, v, r, n, o);
    else {
      const P = y + "";
      !(E instanceof Text) || E instanceof Uo ? E = new Text(P) : E.data != P && (E.data = P)
    }
    E != f && (u && d.delete(E),
      !v || u ? (s.insertBefore(E, f),
        u && f != h && d.add(f)) : v == h ? s.insertBefore(E, h) : (s.replaceChild(E, v),
          f = E)),
      b != null && (c = c || new Map,
        c.set(b, E))
  }
  ),
    f = f == h ? h : f.nextSibling,
    e && f != h)
    for (; f != h;) {
      const y = f;
      f = f.nextSibling,
        y.remove()
    }
  return d && d.forEach(y => y.remove()),
    a.keyes = c,
    a
}
function xd(t, e, s, r, n) {
  for (const o in e)
    !(o in s) && La(t, o, e[o], null, n, r);
  for (const o in s)
    La(t, o, e[o], s[o], n, r)
}
function La(t, e, s, r, n, o) {
  if (e = e == "class" && !n ? "className" : e,
    s = s ?? null,
    r = r ?? null,
    e in t && pd[e] && (s = t[e]),
    !(r === s || md[e] || e[0] == "_"))
    if (e[0] == "o" && e[1] == "n" && (Ce(r) || Ce(s)))
      Sd(t, e.slice(2), r, o);
    else if (e == "ref")
      r && (Ce(r) ? r(t) : r.current = t);
    else if (e == "style") {
      const { style: a } = t;
      s = s || "",
        r = r || "";
      const l = Wi(s)
        , h = Wi(r);
      if (l)
        for (const u in s)
          if (h)
            !(u in r) && Pa(a, u, null);
          else
            break;
      if (h)
        for (const u in r) {
          const c = r[u];
          l && s[u] === c || Pa(a, u, c)
        }
      else
        a.cssText = r
    } else {
      const a = e[0] == "$" ? e.slice(1) : e;
      a === e && (!n && !yd[e] && e in t || Ce(r) || Ce(s)) ? t[e] = r ?? "" : r == null ? t.removeAttribute(a) : t.setAttribute(a, Wi(r) ? JSON.stringify(r) : r)
    }
}
function Sd(t, e, s, r) {
  if (r.handleEvent || (r.handleEvent = n => r[n.type].call(t, n)),
    s) {
    if (!r[e]) {
      const n = s.capture || s.once || s.passive ? Object.assign({}, s) : null;
      t.addEventListener(e, r, n)
    }
    r[e] = s
  } else
    r[e] && (t.removeEventListener(e, r),
      delete r[e])
}
function Pa(t, e, s) {
  let r = "setProperty";
  s == null && (r = "removeProperty",
    s = null),
    ~e.indexOf("-") ? t[r](e, s) : t[e] = s
}
const Ta = {};
function Br(t, ...e) {
  const s = (t.raw || t).reduce((r, n, o) => r + n + (e[o] || ""), "");
  return Ta[s] = Ta[s] || _d(s)
}
function _d(t) {
  if (jc.sheet) {
    const e = new CSSStyleSheet;
    return e.replaceSync(t),
      e
  } else {
    const e = document.createElement("style");
    return e.textContent = t,
      e
  }
}
const Ed = Ic("host", {
  style: "display: contents"
})
  , sn = Ei("atomico/context")
  , kd = (t, e) => {
    const s = ur();
    gd(() => $c(s.current, "ConnectContext", r => {
      t === r.detail.id && (r.stopPropagation(),
        r.detail.connect(e))
    }
    ), [t])
  }
  , zd = t => {
    const e = cs("ConnectContext", {
      bubbles: !0,
      composed: !0
    })
      , s = () => {
        let o;
        return e({
          id: t,
          connect(a) {
            o = a
          }
        }),
          o
      }
      , [r, n] = Xo(s);
    return sr(() => {
      r || (t[sn] || (t[sn] = customElements.whenDefined(new t().localName)),
        t[sn].then(() => n(s)))
    }
      , [t]),
      r
  }
  , $d = t => {
    const e = zd(t)
      , s = Ec();
    return sr(() => {
      if (e)
        return $c(e, "UpdatedValue", s)
    }
      , [e]),
      (e || t).value
  }
  , Cd = t => {
    const e = dr(() => (kd(e, ur().current),
      Ed), {
      props: {
        value: {
          type: Object,
          event: {
            type: "UpdatedValue"
          },
          value: () => t
        }
      }
    });
    return e.value = t,
      e
  }
  , I = (t, e, s) => (e == null ? e = {
    key: s
  } : e.key = s,
    Ic(t, e))
  , Yi = I
  , Rc = Br`*,*:before,*:after{box-sizing:border-box}button{padding:0;touch-action:manipulation;cursor:pointer;user-select:none}`
  , Uc = Br`.vh{position:absolute;transform:scale(0)}`;
function ea() {
  return ye.from(new Date)
}
function sa(t, e = 0) {
  const s = xe(t)
    , r = s.getUTCDay()
    , n = (r < e ? 7 : 0) + r - e;
  return s.setUTCDate(s.getUTCDate() - n),
    ye.from(s)
}
function Bc(t, e = 0) {
  return sa(t, e).add({
    days: 6
  })
}
function Nc(t) {
  return ye.from(new Date(Date.UTC(t.year, t.month, 0)))
}
function Nr(t, e, s) {
  return e && ye.compare(t, e) < 0 ? e : s && ye.compare(t, s) > 0 ? s : t
}
const Dd = {
  days: 1
};
function Ld(t, e = 0) {
  let s = sa(t.toPlainDate(), e);
  const r = Bc(Nc(t), e)
    , n = [];
  for (; ye.compare(s, r) < 0;) {
    const o = [];
    for (let a = 0; a < 7; a++)
      o.push(s),
        s = s.add(Dd);
    n.push(o)
  }
  return n
}
function xe(t) {
  return new Date(Date.UTC(t.year, t.month - 1, t.day ?? 1))
}
const Pd = /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[0-1])$/
  , rn = (t, e) => t.toString().padStart(e, "0");
let ye = class ms {
  constructor(e, s, r) {
    this.year = e,
      this.month = s,
      this.day = r
  }
  add(e) {
    const s = xe(this);
    if ("days" in e)
      return s.setUTCDate(this.day + e.days),
        ms.from(s);
    let { year: r, month: n } = this;
    "months" in e ? (n = this.month + e.months,
      s.setUTCMonth(n - 1)) : (r = this.year + e.years,
        s.setUTCFullYear(r));
    const o = ms.from(xe({
      year: r,
      month: n,
      day: 1
    }));
    return Nr(ms.from(s), o, Nc(o))
  }
  toString() {
    return `${rn(this.year, 4)}-${rn(this.month, 2)}-${rn(this.day, 2)}`
  }
  toPlainYearMonth() {
    return new Vr(this.year, this.month)
  }
  equals(e) {
    return ms.compare(this, e) === 0
  }
  static compare(e, s) {
    return e.year < s.year ? -1 : e.year > s.year ? 1 : e.month < s.month ? -1 : e.month > s.month ? 1 : e.day < s.day ? -1 : e.day > s.day ? 1 : 0
  }
  static from(e) {
    if (typeof e == "string") {
      const s = e.match(Pd);
      if (!s)
        throw new TypeError(e);
      const [, r, n, o] = s;
      return new ms(parseInt(r, 10), parseInt(n, 10), parseInt(o, 10))
    }
    return new ms(e.getUTCFullYear(), e.getUTCMonth() + 1, e.getUTCDate())
  }
}
  ;
class Vr {
  constructor(e, s) {
    this.year = e,
      this.month = s
  }
  add(e) {
    const s = xe(this)
      , r = (e.months ?? 0) + (e.years ?? 0) * 12;
    return s.setUTCMonth(s.getUTCMonth() + r),
      new Vr(s.getUTCFullYear(), s.getUTCMonth() + 1)
  }
  equals(e) {
    return this.year === e.year && this.month === e.month
  }
  toPlainDate() {
    return new ye(this.year, this.month, 1)
  }
}
function Pr(t, e) {
  if (e)
    try {
      return t.from(e)
    } catch { }
}
function xs(t) {
  const [e, s] = ta(t);
  return [fs(() => Pr(ye, e), [e]), r => s(r == null ? void 0 : r.toString())]
}
function Td(t) {
  const [e = "", s] = ta(t);
  return [fs(() => {
    const [r, n] = e.split("/")
      , o = Pr(ye, r)
      , a = Pr(ye, n);
    return o && a ? [o, a] : []
  }
    , [e]), r => s(`${r[0]}/${r[1]}`)]
}
function jd(t) {
  const [e = "", s] = ta(t);
  return [fs(() => {
    const r = [];
    for (const n of e.trim().split(/\s+/)) {
      const o = Pr(ye, n);
      o && r.push(o)
    }
    return r
  }
    , [e]), r => s(r.join(" "))]
}
function ir(t, e) {
  return fs(() => new Intl.DateTimeFormat(e, {
    timeZone: "UTC",
    ...t
  }), [e, t])
}
function ja(t, e, s) {
  const r = ir(t, s);
  return fs(() => {
    const n = []
      , o = new Date;
    for (var a = 0; a < 7; a++) {
      const l = (o.getUTCDay() - e + 7) % 7;
      n[l] = r.format(o),
        o.setUTCDate(o.getUTCDate() + 1)
    }
    return n
  }
    , [e, r])
}
const Ma = (t, e, s) => Nr(t, e, s) === t
  , Ia = t => t.target.matches(":dir(ltr)")
  , Md = {
    month: "long",
    day: "numeric"
  }
  , Id = {
    month: "long"
  }
  , Fd = {
    weekday: "narrow"
  }
  , Rd = {
    weekday: "long"
  }
  , nn = {
    bubbles: !0
  };
function Ud({ props: t, context: e }) {
  const { offset: s } = t
    , { firstDayOfWeek: r, isDateDisallowed: n, min: o, max: a, page: l, locale: h, focusedDate: u } = e
    , c = ea()
    , d = ja(Rd, r, h)
    , f = ja(Fd, r, h)
    , y = ir(Md, h)
    , b = ir(Id, h)
    , w = fs(() => l.start.add({
      months: s
    }), [l, s])
    , v = fs(() => Ld(w, r), [w, r])
    , E = cs("focusday", nn)
    , P = cs("selectday", nn)
    , $i = cs("hoverday", nn);
  function Cs(M) {
    E(Nr(M, o, a))
  }
  function Ci(M) {
    let N;
    switch (M.key) {
      case "ArrowRight":
        N = u.add({
          days: Ia(M) ? 1 : -1
        });
        break;
      case "ArrowLeft":
        N = u.add({
          days: Ia(M) ? -1 : 1
        });
        break;
      case "ArrowDown":
        N = u.add({
          days: 7
        });
        break;
      case "ArrowUp":
        N = u.add({
          days: -7
        });
        break;
      case "PageUp":
        N = u.add(M.shiftKey ? {
          years: -1
        } : {
          months: -1
        });
        break;
      case "PageDown":
        N = u.add(M.shiftKey ? {
          years: 1
        } : {
          months: 1
        });
        break;
      case "Home":
        N = sa(u, r);
        break;
      case "End":
        N = Bc(u, r);
        break;
      default:
        return
    }
    Cs(N),
      M.preventDefault()
  }
  function yr(M) {
    var ps;
    const N = w.equals(M);
    if (!e.showOutsideDays && !N)
      return;
    const Di = M.equals(u)
      , ct = M.equals(c)
      , Li = xe(M)
      , Ds = n == null ? void 0 : n(Li)
      , mr = !Ma(M, o, a);
    let Pi = "", kt;
    if (e.type === "range") {
      const [ke, it] = e.value
        , br = ke == null ? void 0 : ke.equals(M)
        , wr = it == null ? void 0 : it.equals(M);
      kt = ke && it && Ma(M, ke, it),
        Pi = `${br ? "range-start" : ""} ${wr ? "range-end" : ""} ${kt && !br && !wr ? "range-inner" : ""}`
    } else
      e.type === "multi" ? kt = e.value.some(ke => ke.equals(M)) : kt = (ps = e.value) == null ? void 0 : ps.equals(M);
    return {
      part: `${`button day ${N ? kt ? "selected" : "" : "outside"} ${Ds ? "disallowed" : ""} ${ct ? "today" : ""}`} ${Pi}`,
      tabindex: N && Di ? 0 : -1,
      disabled: mr,
      "aria-disabled": Ds ? "true" : void 0,
      "aria-pressed": N && kt,
      "aria-current": ct ? "date" : void 0,
      "aria-label": y.format(Li),
      onkeydown: Ci,
      onclick() {
        Ds || P(M),
          Cs(M)
      },
      onmouseover() {
        !Ds && !mr && $i(M)
      }
    }
  }
  return {
    weeks: v,
    yearMonth: w,
    daysLong: d,
    daysShort: f,
    formatter: b,
    getDayProps: yr
  }
}
const on = ea()
  , ia = Cd({
    type: "date",
    firstDayOfWeek: 1,
    isDateDisallowed: () => !1,
    focusedDate: on,
    page: {
      start: on.toPlainYearMonth(),
      end: on.toPlainYearMonth()
    }
  });
customElements.define("calendar-month-ctx", ia);
const Bd = dr(t => {
  const e = $d(ia)
    , s = Xu()
    , r = Ud({
      props: t,
      context: e
    });
  function n() {
    var o;
    (o = s.current.querySelector("button[tabindex='0']")) == null || o.focus()
  }
  return Yi("host", {
    shadowDom: !0,
    focus: n,
    children: [I("div", {
      id: "h",
      part: "heading",
      children: r.formatter.format(xe(r.yearMonth))
    }), Yi("table", {
      ref: s,
      "aria-labelledby": "h",
      part: "table",
      children: [I("thead", {
        children: I("tr", {
          part: "tr head",
          children: r.daysLong.map((o, a) => Yi("th", {
            part: "th",
            scope: "col",
            children: [I("span", {
              class: "vh",
              children: o
            }), I("span", {
              "aria-hidden": "true",
              children: r.daysShort[a]
            })]
          }))
        })
      }), I("tbody", {
        children: r.weeks.map((o, a) => I("tr", {
          part: "tr week",
          children: o.map((l, h) => {
            const u = r.getDayProps(l);
            return I("td", {
              part: "td",
              children: u && I("button", {
                ...u,
                children: l.day
              })
            }, h)
          }
          )
        }, a))
      })]
    })]
  })
}
  , {
    props: {
      offset: {
        type: Number,
        value: 0
      }
    },
    styles: [Rc, Uc, Br`:host{--color-accent: black;--color-text-on-accent: white;display:flex;flex-direction:column;gap:.25rem;text-align:center;inline-size:fit-content}table{border-collapse:collapse;font-size:.875rem}th{font-weight:700;block-size:2.25rem}td{padding-inline:0}button{color:inherit;font-size:inherit;background:transparent;border:0;font-variant-numeric:tabular-nums;block-size:2.25rem;inline-size:2.25rem}button:hover:where(:not(:disabled,[aria-disabled])){background:#0000000d}button:is([aria-pressed=true],:focus-visible){background:var(--color-accent);color:var(--color-text-on-accent)}button:focus-visible{outline:1px solid var(--color-text-on-accent);outline-offset:-2px}button:disabled,:host::part(outside),:host::part(disallowed){cursor:default;opacity:.5}`]
  });
customElements.define("calendar-month", Bd);
function Fa(t) {
  return I("button", {
    part: `button ${t.name} ${t.onclick ? "" : "disabled"}`,
    onclick: t.onclick,
    "aria-disabled": t.onclick ? null : "true",
    children: I("slot", {
      name: t.name,
      children: t.children
    })
  })
}
function ra(t) {
  const e = xe(t.page.start)
    , s = xe(t.page.end);
  return Yi("div", {
    role: "group",
    "aria-labelledby": "h",
    part: "container",
    children: [I("div", {
      id: "h",
      class: "vh",
      "aria-live": "polite",
      "aria-atomic": "true",
      children: t.formatVerbose.formatRange(e, s)
    }), Yi("div", {
      part: "header",
      children: [I(Fa, {
        name: "previous",
        onclick: t.previous,
        children: "Previous"
      }), I("slot", {
        part: "heading",
        name: "heading",
        children: I("div", {
          "aria-hidden": "true",
          children: t.format.formatRange(e, s)
        })
      }), I(Fa, {
        name: "next",
        onclick: t.next,
        children: "Next"
      })]
    }), I(ia, {
      value: t,
      onselectday: t.onSelect,
      onfocusday: t.onFocus,
      onhoverday: t.onHover,
      children: I("slot", {})
    })]
  })
}
const na = {
  value: {
    type: String,
    value: ""
  },
  min: {
    type: String,
    value: ""
  },
  max: {
    type: String,
    value: ""
  },
  isDateDisallowed: {
    type: Function,
    value: t => !1
  },
  firstDayOfWeek: {
    type: Number,
    value: () => 1
  },
  showOutsideDays: {
    type: Boolean,
    value: !1
  },
  locale: {
    type: String,
    value: () => { }
  },
  months: {
    type: Number,
    value: 1
  },
  focusedDate: {
    type: String,
    value: () => { }
  },
  pageBy: {
    type: String,
    value: () => "months"
  }
}
  , oa = [Rc, Uc, Br`:host{display:block;inline-size:fit-content}[role=group]{display:flex;flex-direction:column;gap:1em}:host::part(header){display:flex;align-items:center;justify-content:space-between}:host::part(heading){font-weight:700;font-size:1.25em}button{display:flex;align-items:center;justify-content:center}button[aria-disabled]{cursor:default;opacity:.5}`]
  , Nd = {
    year: "numeric"
  }
  , Vd = {
    year: "numeric",
    month: "long"
  };
function an(t, e) {
  return (e.year - t.year) * 12 + e.month - t.month
}
const Ra = (t, e) => (t = e === 12 ? new Vr(t.year, 1) : t,
{
  start: t,
  end: t.add({
    months: e - 1
  })
});
function qd({ pageBy: t, focusedDate: e, months: s, max: r, min: n, goto: o }) {
  const a = t === "single" ? 1 : s
    , [l, h] = Xo(() => Ra(e.toPlainYearMonth(), s))
    , u = d => h(Ra(l.start.add({
      months: d
    }), s))
    , c = d => {
      const f = an(l.start, d.toPlainYearMonth());
      return f >= 0 && f < s
    }
    ;
  return sr(() => {
    if (c(e))
      return;
    const d = an(e.toPlainYearMonth(), l.start);
    o(e.add({
      months: d
    }))
  }
    , [l.start]),
    sr(() => {
      if (c(e))
        return;
      const d = an(l.start, e.toPlainYearMonth());
      u(d === -1 ? -a : d === s ? a : Math.floor(d / s) * s)
    }
      , [e, a, s]),
  {
    page: l,
    previous: !n || !c(n) ? () => u(-a) : void 0,
    next: !r || !c(r) ? () => u(a) : void 0
  }
}
function aa({ months: t, pageBy: e, locale: s, focusedDate: r, setFocusedDate: n }) {
  const [o] = xs("min")
    , [a] = xs("max")
    , l = cs("focusday")
    , h = cs("change")
    , u = fs(() => Nr(r ?? ea(), o, a), [r, o, a]);
  function c(v) {
    n(v),
      l(xe(v))
  }
  const { next: d, previous: f, page: y } = qd({
    pageBy: e,
    focusedDate: u,
    months: t,
    min: o,
    max: a,
    goto: c
  })
    , b = ur();
  function w() {
    b.current.querySelectorAll("calendar-month").forEach(v => v.focus())
  }
  return {
    format: ir(Nd, s),
    formatVerbose: ir(Vd, s),
    page: y,
    focusedDate: u,
    dispatch: h,
    onFocus(v) {
      v.stopPropagation(),
        c(v.detail),
        setTimeout(w)
    },
    min: o,
    max: a,
    next: d,
    previous: f,
    focus: w
  }
}
const Hd = dr(t => {
  const [e, s] = xs("value")
    , [r = e, n] = xs("focusedDate")
    , o = aa({
      ...t,
      focusedDate: r,
      setFocusedDate: n
    });
  function a(l) {
    s(l.detail),
      o.dispatch()
  }
  return I("host", {
    shadowDom: !0,
    focus: o.focus,
    children: I(ra, {
      ...t,
      ...o,
      type: "date",
      value: e,
      onSelect: a
    })
  })
}
  , {
    props: na,
    styles: oa
  });
customElements.define("calendar-date", Hd);
const Ua = (t, e) => ye.compare(t, e) < 0 ? [t, e] : [e, t]
  , Kd = dr(t => {
    const [e, s] = Td("value")
      , [r = e[0], n] = xs("focusedDate")
      , o = aa({
        ...t,
        focusedDate: r,
        setFocusedDate: n
      })
      , a = cs("rangestart")
      , l = cs("rangeend")
      , [h, u] = xs("tentative")
      , [c, d] = Xo();
    sr(() => d(void 0), [h]);
    function f(v) {
      o.onFocus(v),
        y(v)
    }
    function y(v) {
      v.stopPropagation(),
        h && d(v.detail)
    }
    function b(v) {
      const E = v.detail;
      v.stopPropagation(),
        h ? (s(Ua(h, E)),
          u(void 0),
          l(xe(E)),
          o.dispatch()) : (u(E),
            a(xe(E)))
    }
    const w = h ? Ua(h, c ?? h) : e;
    return I("host", {
      shadowDom: !0,
      focus: o.focus,
      children: I(ra, {
        ...t,
        ...o,
        type: "range",
        value: w,
        onFocus: f,
        onHover: y,
        onSelect: b
      })
    })
  }
    , {
      props: {
        ...na,
        tentative: {
          type: String,
          value: ""
        }
      },
      styles: oa
    });
customElements.define("calendar-range", Kd);
const Wd = dr(t => {
  const [e, s] = jd("value")
    , [r = e[0], n] = xs("focusedDate")
    , o = aa({
      ...t,
      focusedDate: r,
      setFocusedDate: n
    });
  function a(l) {
    const h = [...e]
      , u = e.findIndex(c => c.equals(l.detail));
    u < 0 ? h.push(l.detail) : h.splice(u, 1),
      s(h),
      o.dispatch()
  }
  return I("host", {
    shadowDom: !0,
    focus: o.focus,
    children: I(ra, {
      ...t,
      ...o,
      type: "multi",
      value: e,
      onSelect: a
    })
  })
}
  , {
    props: na,
    styles: oa
  });
customElements.define("calendar-multi", Wd);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const kr = globalThis
  , la = kr.ShadowRoot && (kr.ShadyCSS === void 0 || kr.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype
  , ha = Symbol()
  , Ba = new WeakMap;
let Vc = class {
  constructor(e, s, r) {
    if (this._$cssResult$ = !0,
      r !== ha)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e,
      this.t = s
  }
  get styleSheet() {
    let e = this.o;
    const s = this.t;
    if (la && e === void 0) {
      const r = s !== void 0 && s.length === 1;
      r && (e = Ba.get(s)),
        e === void 0 && ((this.o = e = new CSSStyleSheet).replaceSync(this.cssText),
          r && Ba.set(s, e))
    }
    return e
  }
  toString() {
    return this.cssText
  }
}
  ;
const Gd = t => new Vc(typeof t == "string" ? t : t + "", void 0, ha)
  , as = (t, ...e) => {
    const s = t.length === 1 ? t[0] : e.reduce((r, n, o) => r + (a => {
      if (a._$cssResult$ === !0)
        return a.cssText;
      if (typeof a == "number")
        return a;
      throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")
    }
    )(n) + t[o + 1], t[0]);
    return new Vc(s, t, ha)
  }
  , Yd = (t, e) => {
    if (la)
      t.adoptedStyleSheets = e.map(s => s instanceof CSSStyleSheet ? s : s.styleSheet);
    else
      for (const s of e) {
        const r = document.createElement("style")
          , n = kr.litNonce;
        n !== void 0 && r.setAttribute("nonce", n),
          r.textContent = s.cssText,
          t.appendChild(r)
      }
  }
  , Na = la ? t => t : t => t instanceof CSSStyleSheet ? (e => {
    let s = "";
    for (const r of e.cssRules)
      s += r.cssText;
    return Gd(s)
  }
  )(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Zd, defineProperty: Jd, getOwnPropertyDescriptor: Qd, getOwnPropertyNames: Xd, getOwnPropertySymbols: tf, getPrototypeOf: ef } = Object
  , us = globalThis
  , Va = us.trustedTypes
  , sf = Va ? Va.emptyScript : ""
  , ln = us.reactiveElementPolyfillSupport
  , Zi = (t, e) => t
  , Oi = {
    toAttribute(t, e) {
      switch (e) {
        case Boolean:
          t = t ? sf : null;
          break;
        case Object:
        case Array:
          t = t == null ? t : JSON.stringify(t)
      }
      return t
    },
    fromAttribute(t, e) {
      let s = t;
      switch (e) {
        case Boolean:
          s = t !== null;
          break;
        case Number:
          s = t === null ? null : Number(t);
          break;
        case Object:
        case Array:
          try {
            s = JSON.parse(t)
          } catch {
            s = null
          }
      }
      return s
    }
  }
  , ca = (t, e) => !Zd(t, e)
  , qa = {
    attribute: !0,
    type: String,
    converter: Oi,
    reflect: !1,
    hasChanged: ca
  };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")),
  us.litPropertyMetadata ?? (us.litPropertyMetadata = new WeakMap);
class Fs extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(),
      (this.l ?? (this.l = [])).push(e)
  }
  static get observedAttributes() {
    return this.finalize(),
      this._$Eh && [...this._$Eh.keys()]
  }
  static createProperty(e, s = qa) {
    if (s.state && (s.attribute = !1),
      this._$Ei(),
      this.elementProperties.set(e, s),
      !s.noAccessor) {
      const r = Symbol()
        , n = this.getPropertyDescriptor(e, r, s);
      n !== void 0 && Jd(this.prototype, e, n)
    }
  }
  static getPropertyDescriptor(e, s, r) {
    const { get: n, set: o } = Qd(this.prototype, e) ?? {
      get() {
        return this[s]
      },
      set(a) {
        this[s] = a
      }
    };
    return {
      get() {
        return n == null ? void 0 : n.call(this)
      },
      set(a) {
        const l = n == null ? void 0 : n.call(this);
        o.call(this, a),
          this.requestUpdate(e, l, r)
      },
      configurable: !0,
      enumerable: !0
    }
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? qa
  }
  static _$Ei() {
    if (this.hasOwnProperty(Zi("elementProperties")))
      return;
    const e = ef(this);
    e.finalize(),
      e.l !== void 0 && (this.l = [...e.l]),
      this.elementProperties = new Map(e.elementProperties)
  }
  static finalize() {
    if (this.hasOwnProperty(Zi("finalized")))
      return;
    if (this.finalized = !0,
      this._$Ei(),
      this.hasOwnProperty(Zi("properties"))) {
      const s = this.properties
        , r = [...Xd(s), ...tf(s)];
      for (const n of r)
        this.createProperty(n, s[n])
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const s = litPropertyMetadata.get(e);
      if (s !== void 0)
        for (const [r, n] of s)
          this.elementProperties.set(r, n)
    }
    this._$Eh = new Map;
    for (const [s, r] of this.elementProperties) {
      const n = this._$Eu(s, r);
      n !== void 0 && this._$Eh.set(n, s)
    }
    this.elementStyles = this.finalizeStyles(this.styles)
  }
  static finalizeStyles(e) {
    const s = [];
    if (Array.isArray(e)) {
      const r = new Set(e.flat(1 / 0).reverse());
      for (const n of r)
        s.unshift(Na(n))
    } else
      e !== void 0 && s.push(Na(e));
    return s
  }
  static _$Eu(e, s) {
    const r = s.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof e == "string" ? e.toLowerCase() : void 0
  }
  constructor() {
    super(),
      this._$Ep = void 0,
      this.isUpdatePending = !1,
      this.hasUpdated = !1,
      this._$Em = null,
      this._$Ev()
  }
  _$Ev() {
    var e;
    this._$ES = new Promise(s => this.enableUpdating = s),
      this._$AL = new Map,
      this._$E_(),
      this.requestUpdate(),
      (e = this.constructor.l) == null || e.forEach(s => s(this))
  }
  addController(e) {
    var s;
    (this._$EO ?? (this._$EO = new Set)).add(e),
      this.renderRoot !== void 0 && this.isConnected && ((s = e.hostConnected) == null || s.call(e))
  }
  removeController(e) {
    var s;
    (s = this._$EO) == null || s.delete(e)
  }
  _$E_() {
    const e = new Map
      , s = this.constructor.elementProperties;
    for (const r of s.keys())
      this.hasOwnProperty(r) && (e.set(r, this[r]),
        delete this[r]);
    e.size > 0 && (this._$Ep = e)
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Yd(e, this.constructor.elementStyles),
      e
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()),
      this.enableUpdating(!0),
      (e = this._$EO) == null || e.forEach(s => {
        var r;
        return (r = s.hostConnected) == null ? void 0 : r.call(s)
      }
      )
  }
  enableUpdating(e) { }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach(s => {
      var r;
      return (r = s.hostDisconnected) == null ? void 0 : r.call(s)
    }
    )
  }
  attributeChangedCallback(e, s, r) {
    this._$AK(e, r)
  }
  _$EC(e, s) {
    var o;
    const r = this.constructor.elementProperties.get(e)
      , n = this.constructor._$Eu(e, r);
    if (n !== void 0 && r.reflect === !0) {
      const a = (((o = r.converter) == null ? void 0 : o.toAttribute) !== void 0 ? r.converter : Oi).toAttribute(s, r.type);
      this._$Em = e,
        a == null ? this.removeAttribute(n) : this.setAttribute(n, a),
        this._$Em = null
    }
  }
  _$AK(e, s) {
    var o;
    const r = this.constructor
      , n = r._$Eh.get(e);
    if (n !== void 0 && this._$Em !== n) {
      const a = r.getPropertyOptions(n)
        , l = typeof a.converter == "function" ? {
          fromAttribute: a.converter
        } : ((o = a.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? a.converter : Oi;
      this._$Em = n,
        this[n] = l.fromAttribute(s, a.type),
        this._$Em = null
    }
  }
  requestUpdate(e, s, r) {
    if (e !== void 0) {
      if (r ?? (r = this.constructor.getPropertyOptions(e)),
        !(r.hasChanged ?? ca)(this[e], s))
        return;
      this.P(e, s, r)
    }
    this.isUpdatePending === !1 && (this._$ES = this._$ET())
  }
  P(e, s, r) {
    this._$AL.has(e) || this._$AL.set(e, s),
      r.reflect === !0 && this._$Em !== e && (this._$Ej ?? (this._$Ej = new Set)).add(e)
  }
  async _$ET() {
    this.isUpdatePending = !0;
    try {
      await this._$ES
    } catch (s) {
      Promise.reject(s)
    }
    const e = this.scheduleUpdate();
    return e != null && await e,
      !this.isUpdatePending
  }
  scheduleUpdate() {
    return this.performUpdate()
  }
  performUpdate() {
    var r;
    if (!this.isUpdatePending)
      return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()),
        this._$Ep) {
        for (const [o, a] of this._$Ep)
          this[o] = a;
        this._$Ep = void 0
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0)
        for (const [o, a] of n)
          a.wrapped !== !0 || this._$AL.has(o) || this[o] === void 0 || this.P(o, this[o], a)
    }
    let e = !1;
    const s = this._$AL;
    try {
      e = this.shouldUpdate(s),
        e ? (this.willUpdate(s),
          (r = this._$EO) == null || r.forEach(n => {
            var o;
            return (o = n.hostUpdate) == null ? void 0 : o.call(n)
          }
          ),
          this.update(s)) : this._$EU()
    } catch (n) {
      throw e = !1,
      this._$EU(),
      n
    }
    e && this._$AE(s)
  }
  willUpdate(e) { }
  _$AE(e) {
    var s;
    (s = this._$EO) == null || s.forEach(r => {
      var n;
      return (n = r.hostUpdated) == null ? void 0 : n.call(r)
    }
    ),
      this.hasUpdated || (this.hasUpdated = !0,
        this.firstUpdated(e)),
      this.updated(e)
  }
  _$EU() {
    this._$AL = new Map,
      this.isUpdatePending = !1
  }
  get updateComplete() {
    return this.getUpdateComplete()
  }
  getUpdateComplete() {
    return this._$ES
  }
  shouldUpdate(e) {
    return !0
  }
  update(e) {
    this._$Ej && (this._$Ej = this._$Ej.forEach(s => this._$EC(s, this[s]))),
      this._$EU()
  }
  updated(e) { }
  firstUpdated(e) { }
}
Fs.elementStyles = [],
  Fs.shadowRootOptions = {
    mode: "open"
  },
  Fs[Zi("elementProperties")] = new Map,
  Fs[Zi("finalized")] = new Map,
  ln == null || ln({
    ReactiveElement: Fs
  }),
  (us.reactiveElementVersions ?? (us.reactiveElementVersions = [])).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ji = globalThis
  , Tr = Ji.trustedTypes
  , Ha = Tr ? Tr.createPolicy("lit-html", {
    createHTML: t => t
  }) : void 0
  , qc = "$lit$"
  , ls = `lit$${Math.random().toFixed(9).slice(2)}$`
  , Hc = "?" + ls
  , rf = `<${Hc}>`
  , Ss = document
  , rr = () => Ss.createComment("")
  , nr = t => t === null || typeof t != "object" && typeof t != "function"
  , ua = Array.isArray
  , nf = t => ua(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function"
  , hn = `[ 	
\f\r]`
  , ji = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g
  , Ka = /-->/g
  , Wa = />/g
  , ys = RegExp(`>|${hn}(?:([^\\s"'>=/]+)(${hn}*=${hn}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g")
  , Ga = /'/g
  , Ya = /"/g
  , Kc = /^(?:script|style|textarea|title)$/i
  , of = t => (e, ...s) => ({
    _$litType$: t,
    strings: e,
    values: s
  })
  , Et = of(1)
  , Oe = Symbol.for("lit-noChange")
  , V = Symbol.for("lit-nothing")
  , Za = new WeakMap
  , vs = Ss.createTreeWalker(Ss, 129);
function Wc(t, e) {
  if (!ua(t) || !t.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return Ha !== void 0 ? Ha.createHTML(e) : e
}
const af = (t, e) => {
  const s = t.length - 1
    , r = [];
  let n, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = ji;
  for (let l = 0; l < s; l++) {
    const h = t[l];
    let u, c, d = -1, f = 0;
    for (; f < h.length && (a.lastIndex = f,
      c = a.exec(h),
      c !== null);)
      f = a.lastIndex,
        a === ji ? c[1] === "!--" ? a = Ka : c[1] !== void 0 ? a = Wa : c[2] !== void 0 ? (Kc.test(c[2]) && (n = RegExp("</" + c[2], "g")),
          a = ys) : c[3] !== void 0 && (a = ys) : a === ys ? c[0] === ">" ? (a = n ?? ji,
            d = -1) : c[1] === void 0 ? d = -2 : (d = a.lastIndex - c[2].length,
              u = c[1],
              a = c[3] === void 0 ? ys : c[3] === '"' ? Ya : Ga) : a === Ya || a === Ga ? a = ys : a === Ka || a === Wa ? a = ji : (a = ys,
                n = void 0);
    const y = a === ys && t[l + 1].startsWith("/>") ? " " : "";
    o += a === ji ? h + rf : d >= 0 ? (r.push(u),
      h.slice(0, d) + qc + h.slice(d) + ls + y) : h + ls + (d === -2 ? l : y)
  }
  return [Wc(t, o + (t[s] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), r]
}
  ;
class or {
  constructor({ strings: e, _$litType$: s }, r) {
    let n;
    this.parts = [];
    let o = 0
      , a = 0;
    const l = e.length - 1
      , h = this.parts
      , [u, c] = af(e, s);
    if (this.el = or.createElement(u, r),
      vs.currentNode = this.el.content,
      s === 2 || s === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes)
    }
    for (; (n = vs.nextNode()) !== null && h.length < l;) {
      if (n.nodeType === 1) {
        if (n.hasAttributes())
          for (const d of n.getAttributeNames())
            if (d.endsWith(qc)) {
              const f = c[a++]
                , y = n.getAttribute(d).split(ls)
                , b = /([.?@])?(.*)/.exec(f);
              h.push({
                type: 1,
                index: o,
                name: b[2],
                strings: y,
                ctor: b[1] === "." ? hf : b[1] === "?" ? cf : b[1] === "@" ? uf : qr
              }),
                n.removeAttribute(d)
            } else
              d.startsWith(ls) && (h.push({
                type: 6,
                index: o
              }),
                n.removeAttribute(d));
        if (Kc.test(n.tagName)) {
          const d = n.textContent.split(ls)
            , f = d.length - 1;
          if (f > 0) {
            n.textContent = Tr ? Tr.emptyScript : "";
            for (let y = 0; y < f; y++)
              n.append(d[y], rr()),
                vs.nextNode(),
                h.push({
                  type: 2,
                  index: ++o
                });
            n.append(d[f], rr())
          }
        }
      } else if (n.nodeType === 8)
        if (n.data === Hc)
          h.push({
            type: 2,
            index: o
          });
        else {
          let d = -1;
          for (; (d = n.data.indexOf(ls, d + 1)) !== -1;)
            h.push({
              type: 7,
              index: o
            }),
              d += ls.length - 1
        }
      o++
    }
  }
  static createElement(e, s) {
    const r = Ss.createElement("template");
    return r.innerHTML = e,
      r
  }
}
function xi(t, e, s = t, r) {
  var a, l;
  if (e === Oe)
    return e;
  let n = r !== void 0 ? (a = s._$Co) == null ? void 0 : a[r] : s._$Cl;
  const o = nr(e) ? void 0 : e._$litDirective$;
  return (n == null ? void 0 : n.constructor) !== o && ((l = n == null ? void 0 : n._$AO) == null || l.call(n, !1),
    o === void 0 ? n = void 0 : (n = new o(t),
      n._$AT(t, s, r)),
    r !== void 0 ? (s._$Co ?? (s._$Co = []))[r] = n : s._$Cl = n),
    n !== void 0 && (e = xi(t, n._$AS(t, e.values), n, r)),
    e
}
let lf = class {
  constructor(e, s) {
    this._$AV = [],
      this._$AN = void 0,
      this._$AD = e,
      this._$AM = s
  }
  get parentNode() {
    return this._$AM.parentNode
  }
  get _$AU() {
    return this._$AM._$AU
  }
  u(e) {
    const { el: { content: s }, parts: r } = this._$AD
      , n = ((e == null ? void 0 : e.creationScope) ?? Ss).importNode(s, !0);
    vs.currentNode = n;
    let o = vs.nextNode()
      , a = 0
      , l = 0
      , h = r[0];
    for (; h !== void 0;) {
      if (a === h.index) {
        let u;
        h.type === 2 ? u = new fr(o, o.nextSibling, this, e) : h.type === 1 ? u = new h.ctor(o, h.name, h.strings, this, e) : h.type === 6 && (u = new df(o, this, e)),
          this._$AV.push(u),
          h = r[++l]
      }
      a !== (h == null ? void 0 : h.index) && (o = vs.nextNode(),
        a++)
    }
    return vs.currentNode = Ss,
      n
  }
  p(e) {
    let s = 0;
    for (const r of this._$AV)
      r !== void 0 && (r.strings !== void 0 ? (r._$AI(e, r, s),
        s += r.strings.length - 2) : r._$AI(e[s])),
        s++
  }
}
  ;
class fr {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv
  }
  constructor(e, s, r, n) {
    this.type = 2,
      this._$AH = V,
      this._$AN = void 0,
      this._$AA = e,
      this._$AB = s,
      this._$AM = r,
      this.options = n,
      this._$Cv = (n == null ? void 0 : n.isConnected) ?? !0
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const s = this._$AM;
    return s !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = s.parentNode),
      e
  }
  get startNode() {
    return this._$AA
  }
  get endNode() {
    return this._$AB
  }
  _$AI(e, s = this) {
    e = xi(this, e, s),
      nr(e) ? e === V || e == null || e === "" ? (this._$AH !== V && this._$AR(),
        this._$AH = V) : e !== this._$AH && e !== Oe && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : nf(e) ? this.k(e) : this._(e)
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB)
  }
  T(e) {
    this._$AH !== e && (this._$AR(),
      this._$AH = this.O(e))
  }
  _(e) {
    this._$AH !== V && nr(this._$AH) ? this._$AA.nextSibling.data = e : this.T(Ss.createTextNode(e)),
      this._$AH = e
  }
  $(e) {
    var o;
    const { values: s, _$litType$: r } = e
      , n = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = or.createElement(Wc(r.h, r.h[0]), this.options)),
        r);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === n)
      this._$AH.p(s);
    else {
      const a = new lf(n, this)
        , l = a.u(this.options);
      a.p(s),
        this.T(l),
        this._$AH = a
    }
  }
  _$AC(e) {
    let s = Za.get(e.strings);
    return s === void 0 && Za.set(e.strings, s = new or(e)),
      s
  }
  k(e) {
    ua(this._$AH) || (this._$AH = [],
      this._$AR());
    const s = this._$AH;
    let r, n = 0;
    for (const o of e)
      n === s.length ? s.push(r = new fr(this.O(rr()), this.O(rr()), this, this.options)) : r = s[n],
        r._$AI(o),
        n++;
    n < s.length && (this._$AR(r && r._$AB.nextSibling, n),
      s.length = n)
  }
  _$AR(e = this._$AA.nextSibling, s) {
    var r;
    for ((r = this._$AP) == null ? void 0 : r.call(this, !1, !0, s); e && e !== this._$AB;) {
      const n = e.nextSibling;
      e.remove(),
        e = n
    }
  }
  setConnected(e) {
    var s;
    this._$AM === void 0 && (this._$Cv = e,
      (s = this._$AP) == null || s.call(this, e))
  }
}
class qr {
  get tagName() {
    return this.element.tagName
  }
  get _$AU() {
    return this._$AM._$AU
  }
  constructor(e, s, r, n, o) {
    this.type = 1,
      this._$AH = V,
      this._$AN = void 0,
      this.element = e,
      this.name = s,
      this._$AM = n,
      this.options = o,
      r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String),
        this.strings = r) : this._$AH = V
  }
  _$AI(e, s = this, r, n) {
    const o = this.strings;
    let a = !1;
    if (o === void 0)
      e = xi(this, e, s, 0),
        a = !nr(e) || e !== this._$AH && e !== Oe,
        a && (this._$AH = e);
    else {
      const l = e;
      let h, u;
      for (e = o[0],
        h = 0; h < o.length - 1; h++)
        u = xi(this, l[r + h], s, h),
          u === Oe && (u = this._$AH[h]),
          a || (a = !nr(u) || u !== this._$AH[h]),
          u === V ? e = V : e !== V && (e += (u ?? "") + o[h + 1]),
          this._$AH[h] = u
    }
    a && !n && this.j(e)
  }
  j(e) {
    e === V ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "")
  }
}
class hf extends qr {
  constructor() {
    super(...arguments),
      this.type = 3
  }
  j(e) {
    this.element[this.name] = e === V ? void 0 : e
  }
}
class cf extends qr {
  constructor() {
    super(...arguments),
      this.type = 4
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== V)
  }
}
let uf = class extends qr {
  constructor(e, s, r, n, o) {
    super(e, s, r, n, o),
      this.type = 5
  }
  _$AI(e, s = this) {
    if ((e = xi(this, e, s, 0) ?? V) === Oe)
      return;
    const r = this._$AH
      , n = e === V && r !== V || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive
      , o = e !== V && (r === V || n);
    n && this.element.removeEventListener(this.name, this, r),
      o && this.element.addEventListener(this.name, this, e),
      this._$AH = e
  }
  handleEvent(e) {
    var s;
    typeof this._$AH == "function" ? this._$AH.call(((s = this.options) == null ? void 0 : s.host) ?? this.element, e) : this._$AH.handleEvent(e)
  }
}
  ;
class df {
  constructor(e, s, r) {
    this.element = e,
      this.type = 6,
      this._$AN = void 0,
      this._$AM = s,
      this.options = r
  }
  get _$AU() {
    return this._$AM._$AU
  }
  _$AI(e) {
    xi(this, e)
  }
}
const cn = Ji.litHtmlPolyfillSupport;
cn == null || cn(or, fr),
  (Ji.litHtmlVersions ?? (Ji.litHtmlVersions = [])).push("3.2.1");
const ff = (t, e, s) => {
  const r = (s == null ? void 0 : s.renderBefore) ?? e;
  let n = r._$litPart$;
  if (n === void 0) {
    const o = (s == null ? void 0 : s.renderBefore) ?? null;
    r._$litPart$ = n = new fr(e.insertBefore(rr(), o), o, void 0, s ?? {})
  }
  return n._$AI(t),
    n
}
  ;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let Qi = class extends Fs {
  constructor() {
    super(...arguments),
      this.renderOptions = {
        host: this
      },
      this._$Do = void 0
  }
  createRenderRoot() {
    var s;
    const e = super.createRenderRoot();
    return (s = this.renderOptions).renderBefore ?? (s.renderBefore = e.firstChild),
      e
  }
  update(e) {
    const s = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected),
      super.update(e),
      this._$Do = ff(s, this.renderRoot, this.renderOptions)
  }
  connectedCallback() {
    var e;
    super.connectedCallback(),
      (e = this._$Do) == null || e.setConnected(!0)
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(),
      (e = this._$Do) == null || e.setConnected(!1)
  }
  render() {
    return Oe
  }
}
  ;
var zl;
Qi._$litElement$ = !0,
  Qi.finalized = !0,
  (zl = globalThis.litElementHydrateSupport) == null || zl.call(globalThis, {
    LitElement: Qi
  });
const un = globalThis.litElementPolyfillSupport;
un == null || un({
  LitElement: Qi
});
(globalThis.litElementVersions ?? (globalThis.litElementVersions = [])).push("4.1.1");
var gf = as`
  :host {
    display: inline-block;
    color: var(--sl-color-neutral-600);
  }

  .icon-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    font-size: inherit;
    color: inherit;
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-x-fast) color;
    -webkit-appearance: none;
  }

  .icon-button:hover:not(.icon-button--disabled),
  .icon-button:focus-visible:not(.icon-button--disabled) {
    color: var(--sl-color-primary-600);
  }

  .icon-button:active:not(.icon-button--disabled) {
    color: var(--sl-color-primary-700);
  }

  .icon-button:focus {
    outline: none;
  }

  .icon-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .icon-button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .icon-button__icon {
    pointer-events: none;
  }
`
  , Bo = "";
function Ja(t) {
  Bo = t
}
function pf(t = "") {
  if (!Bo) {
    const e = [...document.getElementsByTagName("script")]
      , s = e.find(r => r.hasAttribute("data-shoelace"));
    if (s)
      Ja(s.getAttribute("data-shoelace"));
    else {
      const r = e.find(o => /shoelace(\.min)?\.js($|\?)/.test(o.src) || /shoelace-autoloader(\.min)?\.js($|\?)/.test(o.src));
      let n = "";
      r && (n = r.getAttribute("src")),
        Ja(n.split("/").slice(0, -1).join("/"))
    }
  }
  return Bo.replace(/\/$/, "") + (t ? `/${t.replace(/^\//, "")}` : "")
}
var yf = {
  name: "default",
  resolver: t => pf(`assets/icons/${t}.svg`)
}
  , mf = yf
  , Qa = {
    caret: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  `,
    check: `
    <svg part="checked-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor">
          <g transform="translate(3.428571, 3.428571)">
            <path d="M0,5.71428571 L3.42857143,9.14285714"></path>
            <path d="M9.14285714,0 L3.42857143,9.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,
    "chevron-down": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,
    "chevron-left": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
    </svg>
  `,
    "chevron-right": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,
    copy: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6ZM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2Z"/>
    </svg>
  `,
    eye: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
    </svg>
  `,
    "eye-slash": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
    </svg>
  `,
    eyedropper: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">
      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>
    </svg>
  `,
    "grip-vertical": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">
      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
    </svg>
  `,
    indeterminate: `
    <svg part="indeterminate-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor" stroke-width="2">
          <g transform="translate(2.285714, 6.857143)">
            <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,
    "person-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    </svg>
  `,
    "play-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
    </svg>
  `,
    "pause-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>
    </svg>
  `,
    radio: `
    <svg part="checked-icon" class="radio__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g fill="currentColor">
          <circle cx="8" cy="8" r="3.42857143"></circle>
        </g>
      </g>
    </svg>
  `,
    "star-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>
  `,
    "x-lg": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
    </svg>
  `,
    "x-circle-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
    </svg>
  `
  }
  , bf = {
    name: "system",
    resolver: t => t in Qa ? `data:image/svg+xml,${encodeURIComponent(Qa[t])}` : ""
  }
  , wf = bf
  , vf = [mf, wf]
  , No = [];
function Af(t) {
  No.push(t)
}
function Of(t) {
  No = No.filter(e => e !== t)
}
function Xa(t) {
  return vf.find(e => e.name === t)
}
var xf = as`
  :host {
    display: inline-block;
    width: 1em;
    height: 1em;
    box-sizing: content-box !important;
  }

  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`
  , Gc = Object.defineProperty
  , Sf = Object.defineProperties
  , _f = Object.getOwnPropertyDescriptor
  , Ef = Object.getOwnPropertyDescriptors
  , tl = Object.getOwnPropertySymbols
  , kf = Object.prototype.hasOwnProperty
  , zf = Object.prototype.propertyIsEnumerable
  , el = (t, e, s) => e in t ? Gc(t, e, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: s
  }) : t[e] = s
  , ki = (t, e) => {
    for (var s in e || (e = {}))
      kf.call(e, s) && el(t, s, e[s]);
    if (tl)
      for (var s of tl(e))
        zf.call(e, s) && el(t, s, e[s]);
    return t
  }
  , da = (t, e) => Sf(t, Ef(e))
  , m = (t, e, s, r) => {
    for (var n = r > 1 ? void 0 : r ? _f(e, s) : e, o = t.length - 1, a; o >= 0; o--)
      (a = t[o]) && (n = (r ? a(e, s, n) : a(n)) || n);
    return r && n && Gc(e, s, n),
      n
  }
  , Yc = (t, e, s) => {
    if (!e.has(t))
      throw TypeError("Cannot " + s)
  }
  , $f = (t, e, s) => (Yc(t, e, "read from private field"),
    e.get(t))
  , Cf = (t, e, s) => {
    if (e.has(t))
      throw TypeError("Cannot add the same private member more than once");
    e instanceof WeakSet ? e.add(t) : e.set(t, s)
  }
  , Df = (t, e, s, r) => (Yc(t, e, "write to private field"),
    e.set(t, s),
    s);
function Le(t, e) {
  const s = ki({
    waitUntilFirstUpdate: !1
  }, e);
  return (r, n) => {
    const { update: o } = r
      , a = Array.isArray(t) ? t : [t];
    r.update = function (l) {
      a.forEach(h => {
        const u = h;
        if (l.has(u)) {
          const c = l.get(u)
            , d = this[u];
          c !== d && (!s.waitUntilFirstUpdate || this.hasUpdated) && this[n](c, d)
        }
      }
      ),
        o.call(this, l)
    }
  }
}
var zs = as`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Lf = {
  attribute: !0,
  type: String,
  converter: Oi,
  reflect: !1,
  hasChanged: ca
}
  , Pf = (t = Lf, e, s) => {
    const { kind: r, metadata: n } = s;
    let o = globalThis.litPropertyMetadata.get(n);
    if (o === void 0 && globalThis.litPropertyMetadata.set(n, o = new Map),
      o.set(s.name, t),
      r === "accessor") {
      const { name: a } = s;
      return {
        set(l) {
          const h = e.get.call(this);
          e.set.call(this, l),
            this.requestUpdate(a, h, t)
        },
        init(l) {
          return l !== void 0 && this.P(a, void 0, t),
            l
        }
      }
    }
    if (r === "setter") {
      const { name: a } = s;
      return function (l) {
        const h = this[a];
        e.call(this, l),
          this.requestUpdate(a, h, t)
      }
    }
    throw Error("Unsupported decorator location: " + r)
  }
  ;
function _(t) {
  return (e, s) => typeof s == "object" ? Pf(t, e, s) : ((r, n, o) => {
    const a = n.hasOwnProperty(o);
    return n.constructor.createProperty(o, a ? {
      ...r,
      wrapped: !0
    } : r),
      a ? Object.getOwnPropertyDescriptor(n, o) : void 0
  }
  )(t, e, s)
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Pe(t) {
  return _({
    ...t,
    state: !0,
    attribute: !1
  })
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Tf = (t, e, s) => (s.configurable = !0,
  s.enumerable = !0,
  Reflect.decorate && typeof e != "object" && Object.defineProperty(t, e, s),
  s);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function $s(t, e) {
  return (s, r, n) => {
    const o = a => {
      var l;
      return ((l = a.renderRoot) == null ? void 0 : l.querySelector(t)) ?? null
    }
      ;
    return Tf(s, r, {
      get() {
        return o(this)
      }
    })
  }
}
var zr, _e = class extends Qi {
  constructor() {
    super(),
      Cf(this, zr, !1),
      this.initialReflectedProperties = new Map,
      Object.entries(this.constructor.dependencies).forEach(([t, e]) => {
        this.constructor.define(t, e)
      }
      )
  }
  emit(t, e) {
    const s = new CustomEvent(t, ki({
      bubbles: !0,
      cancelable: !1,
      composed: !0,
      detail: {}
    }, e));
    return this.dispatchEvent(s),
      s
  }
  static define(t, e = this, s = {}) {
    const r = customElements.get(t);
    if (!r) {
      try {
        customElements.define(t, e, s)
      } catch {
        customElements.define(t, class extends e {
        }
          , s)
      }
      return
    }
    let n = " (unknown version)"
      , o = n;
    "version" in e && e.version && (n = " v" + e.version),
      "version" in r && r.version && (o = " v" + r.version),
      !(n && o && n === o) && console.warn(`Attempted to register <${t}>${n}, but <${t}>${o} has already been registered.`)
  }
  attributeChangedCallback(t, e, s) {
    $f(this, zr) || (this.constructor.elementProperties.forEach((r, n) => {
      r.reflect && this[n] != null && this.initialReflectedProperties.set(n, this[n])
    }
    ),
      Df(this, zr, !0)),
      super.attributeChangedCallback(t, e, s)
  }
  willUpdate(t) {
    super.willUpdate(t),
      this.initialReflectedProperties.forEach((e, s) => {
        t.has(s) && this[s] == null && (this[s] = e)
      }
      )
  }
}
  ;
zr = new WeakMap;
_e.version = "2.17.1";
_e.dependencies = {};
m([_()], _e.prototype, "dir", 2);
m([_()], _e.prototype, "lang", 2);
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const jf = (t, e) => (t == null ? void 0 : t._$litType$) !== void 0
  , Mf = t => t.strings === void 0
  , If = {}
  , Ff = (t, e = If) => t._$AH = e;
var Mi = Symbol(), vr = Symbol(), dn, fn = new Map, Ee = class extends _e {
  constructor() {
    super(...arguments),
      this.initialRender = !1,
      this.svg = null,
      this.label = "",
      this.library = "default"
  }
  async resolveIcon(t, e) {
    var s;
    let r;
    if (e != null && e.spriteSheet)
      return this.svg = Et`<svg part="svg">
        <use part="use" href="${t}"></use>
      </svg>`,
        this.svg;
    try {
      if (r = await fetch(t, {
        mode: "cors"
      }),
        !r.ok)
        return r.status === 410 ? Mi : vr
    } catch {
      return vr
    }
    try {
      const n = document.createElement("div");
      n.innerHTML = await r.text();
      const o = n.firstElementChild;
      if (((s = o == null ? void 0 : o.tagName) == null ? void 0 : s.toLowerCase()) !== "svg")
        return Mi;
      dn || (dn = new DOMParser);
      const l = dn.parseFromString(o.outerHTML, "text/html").body.querySelector("svg");
      return l ? (l.part.add("svg"),
        document.adoptNode(l)) : Mi
    } catch {
      return Mi
    }
  }
  connectedCallback() {
    super.connectedCallback(),
      Af(this)
  }
  firstUpdated() {
    this.initialRender = !0,
      this.setIcon()
  }
  disconnectedCallback() {
    super.disconnectedCallback(),
      Of(this)
  }
  getIconSource() {
    const t = Xa(this.library);
    return this.name && t ? {
      url: t.resolver(this.name),
      fromLibrary: !0
    } : {
      url: this.src,
      fromLibrary: !1
    }
  }
  handleLabelChange() {
    typeof this.label == "string" && this.label.length > 0 ? (this.setAttribute("role", "img"),
      this.setAttribute("aria-label", this.label),
      this.removeAttribute("aria-hidden")) : (this.removeAttribute("role"),
        this.removeAttribute("aria-label"),
        this.setAttribute("aria-hidden", "true"))
  }
  async setIcon() {
    var t;
    const { url: e, fromLibrary: s } = this.getIconSource()
      , r = s ? Xa(this.library) : void 0;
    if (!e) {
      this.svg = null;
      return
    }
    let n = fn.get(e);
    if (n || (n = this.resolveIcon(e, r),
      fn.set(e, n)),
      !this.initialRender)
      return;
    const o = await n;
    if (o === vr && fn.delete(e),
      e === this.getIconSource().url) {
      if (jf(o)) {
        if (this.svg = o,
          r) {
          await this.updateComplete;
          const a = this.shadowRoot.querySelector("[part='svg']");
          typeof r.mutator == "function" && a && r.mutator(a)
        }
        return
      }
      switch (o) {
        case vr:
        case Mi:
          this.svg = null,
            this.emit("sl-error");
          break;
        default:
          this.svg = o.cloneNode(!0),
            (t = r == null ? void 0 : r.mutator) == null || t.call(r, this.svg),
            this.emit("sl-load")
      }
    }
  }
  render() {
    return this.svg
  }
}
  ;
Ee.styles = [zs, xf];
m([Pe()], Ee.prototype, "svg", 2);
m([_({
  reflect: !0
})], Ee.prototype, "name", 2);
m([_()], Ee.prototype, "src", 2);
m([_()], Ee.prototype, "label", 2);
m([_({
  reflect: !0
})], Ee.prototype, "library", 2);
m([Le("label")], Ee.prototype, "handleLabelChange", 1);
m([Le(["name", "src", "library"])], Ee.prototype, "setIcon", 1);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const bs = {
  ATTRIBUTE: 1,
  CHILD: 2,
  PROPERTY: 3,
  BOOLEAN_ATTRIBUTE: 4,
  EVENT: 5,
  ELEMENT: 6
}
  , Zc = t => (...e) => ({
    _$litDirective$: t,
    values: e
  });
let Jc = class {
  constructor(e) { }
  get _$AU() {
    return this._$AM._$AU
  }
  _$AT(e, s, r) {
    this._$Ct = e,
      this._$AM = s,
      this._$Ci = r
  }
  _$AS(e, s) {
    return this.update(e, s)
  }
  update(e, s) {
    return this.render(...s)
  }
}
  ;
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _s = Zc(class extends Jc {
  constructor(t) {
    var e;
    if (super(t),
      t.type !== bs.ATTRIBUTE || t.name !== "class" || ((e = t.strings) == null ? void 0 : e.length) > 2)
      throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")
  }
  render(t) {
    return " " + Object.keys(t).filter(e => t[e]).join(" ") + " "
  }
  update(t, [e]) {
    var r, n;
    if (this.st === void 0) {
      this.st = new Set,
        t.strings !== void 0 && (this.nt = new Set(t.strings.join(" ").split(/\s/).filter(o => o !== "")));
      for (const o in e)
        e[o] && !((r = this.nt) != null && r.has(o)) && this.st.add(o);
      return this.render(e)
    }
    const s = t.element.classList;
    for (const o of this.st)
      o in e || (s.remove(o),
        this.st.delete(o));
    for (const o in e) {
      const a = !!e[o];
      a === this.st.has(o) || (n = this.nt) != null && n.has(o) || (a ? (s.add(o),
        this.st.add(o)) : (s.remove(o),
          this.st.delete(o)))
    }
    return Oe
  }
}
);
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Qc = Symbol.for("")
  , Rf = t => {
    if ((t == null ? void 0 : t.r) === Qc)
      return t == null ? void 0 : t._$litStatic$
  }
  , sl = (t, ...e) => ({
    _$litStatic$: e.reduce((s, r, n) => s + (o => {
      if (o._$litStatic$ !== void 0)
        return o._$litStatic$;
      throw Error(`Value passed to 'literal' function must be a 'literal' result: ${o}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)
    }
    )(r) + t[n + 1], t[0]),
    r: Qc
  })
  , il = new Map
  , Uf = t => (e, ...s) => {
    const r = s.length;
    let n, o;
    const a = []
      , l = [];
    let h, u = 0, c = !1;
    for (; u < r;) {
      for (h = e[u]; u < r && (o = s[u],
        (n = Rf(o)) !== void 0);)
        h += n + e[++u],
          c = !0;
      u !== r && l.push(o),
        a.push(h),
        u++
    }
    if (u === r && a.push(e[r]),
      c) {
      const d = a.join("$$lit$$");
      (e = il.get(d)) === void 0 && (a.raw = a,
        il.set(d, e = a)),
        s = l
    }
    return t(e, ...s)
  }
  , Bf = Uf(Et);
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const we = t => t ?? V;
var Lt = class extends _e {
  constructor() {
    super(...arguments),
      this.hasFocus = !1,
      this.label = "",
      this.disabled = !1
  }
  handleBlur() {
    this.hasFocus = !1,
      this.emit("sl-blur")
  }
  handleFocus() {
    this.hasFocus = !0,
      this.emit("sl-focus")
  }
  handleClick(t) {
    this.disabled && (t.preventDefault(),
      t.stopPropagation())
  }
  click() {
    this.button.click()
  }
  focus(t) {
    this.button.focus(t)
  }
  blur() {
    this.button.blur()
  }
  render() {
    const t = !!this.href
      , e = t ? sl`a` : sl`button`;
    return Bf`
      <${e}
        part="base"
        class=${_s({
      "icon-button": !0,
      "icon-button--disabled": !t && this.disabled,
      "icon-button--focused": this.hasFocus
    })}
        ?disabled=${we(t ? void 0 : this.disabled)}
        type=${we(t ? void 0 : "button")}
        href=${we(t ? this.href : void 0)}
        target=${we(t ? this.target : void 0)}
        download=${we(t ? this.download : void 0)}
        rel=${we(t && this.target ? "noreferrer noopener" : void 0)}
        role=${we(t ? void 0 : "button")}
        aria-disabled=${this.disabled ? "true" : "false"}
        aria-label="${this.label}"
        tabindex=${this.disabled ? "-1" : "0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <sl-icon
          class="icon-button__icon"
          name=${we(this.name)}
          library=${we(this.library)}
          src=${we(this.src)}
          aria-hidden="true"
        ></sl-icon>
      </${e}>
    `
  }
}
  ;
Lt.styles = [zs, gf];
Lt.dependencies = {
  "sl-icon": Ee
};
m([$s(".icon-button")], Lt.prototype, "button", 2);
m([Pe()], Lt.prototype, "hasFocus", 2);
m([_()], Lt.prototype, "name", 2);
m([_()], Lt.prototype, "library", 2);
m([_()], Lt.prototype, "src", 2);
m([_()], Lt.prototype, "href", 2);
m([_()], Lt.prototype, "target", 2);
m([_()], Lt.prototype, "download", 2);
m([_()], Lt.prototype, "label", 2);
m([_({
  type: Boolean,
  reflect: !0
})], Lt.prototype, "disabled", 2);
var Xc = new Map
  , Nf = new WeakMap;
function Vf(t) {
  return t ?? {
    keyframes: [],
    options: {
      duration: 0
    }
  }
}
function rl(t, e) {
  return e.toLowerCase() === "rtl" ? {
    keyframes: t.rtlKeyframes || t.keyframes,
    options: t.options
  } : t
}
function tu(t, e) {
  Xc.set(t, Vf(e))
}
function nl(t, e, s) {
  const r = Nf.get(t);
  if (r != null && r[e])
    return rl(r[e], s.dir);
  const n = Xc.get(e);
  return n ? rl(n, s.dir) : {
    keyframes: [],
    options: {
      duration: 0
    }
  }
}
function ol(t, e) {
  return new Promise(s => {
    function r(n) {
      n.target === t && (t.removeEventListener(e, r),
        s())
    }
    t.addEventListener(e, r)
  }
  )
}
function al(t, e, s) {
  return new Promise(r => {
    if ((s == null ? void 0 : s.duration) === 1 / 0)
      throw new Error("Promise-based animations must be finite.");
    const n = t.animate(e, da(ki({}, s), {
      duration: qf() ? 0 : s.duration
    }));
    n.addEventListener("cancel", r, {
      once: !0
    }),
      n.addEventListener("finish", r, {
        once: !0
      })
  }
  )
}
function qf() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}
function ll(t) {
  return Promise.all(t.getAnimations().map(e => new Promise(s => {
    e.cancel(),
      requestAnimationFrame(s)
  }
  )))
}
var fa = class {
  constructor(t, ...e) {
    this.slotNames = [],
      this.handleSlotChange = s => {
        const r = s.target;
        (this.slotNames.includes("[default]") && !r.name || r.name && this.slotNames.includes(r.name)) && this.host.requestUpdate()
      }
      ,
      (this.host = t).addController(this),
      this.slotNames = e
  }
  hasDefaultSlot() {
    return [...this.host.childNodes].some(t => {
      if (t.nodeType === t.TEXT_NODE && t.textContent.trim() !== "")
        return !0;
      if (t.nodeType === t.ELEMENT_NODE) {
        const e = t;
        if (e.tagName.toLowerCase() === "sl-visually-hidden")
          return !1;
        if (!e.hasAttribute("slot"))
          return !0
      }
      return !1
    }
    )
  }
  hasNamedSlot(t) {
    return this.host.querySelector(`:scope > [slot="${t}"]`) !== null
  }
  test(t) {
    return t === "[default]" ? this.hasDefaultSlot() : this.hasNamedSlot(t)
  }
  hostConnected() {
    this.host.shadowRoot.addEventListener("slotchange", this.handleSlotChange)
  }
  hostDisconnected() {
    this.host.shadowRoot.removeEventListener("slotchange", this.handleSlotChange)
  }
}
  ;
const Vo = new Set
  , Rs = new Map;
let ws, ga = "ltr", pa = "en";
const eu = typeof MutationObserver < "u" && typeof document < "u" && typeof document.documentElement < "u";
if (eu) {
  const t = new MutationObserver(iu);
  ga = document.documentElement.dir || "ltr",
    pa = document.documentElement.lang || navigator.language,
    t.observe(document.documentElement, {
      attributes: !0,
      attributeFilter: ["dir", "lang"]
    })
}
function su(...t) {
  t.map(e => {
    const s = e.$code.toLowerCase();
    Rs.has(s) ? Rs.set(s, Object.assign(Object.assign({}, Rs.get(s)), e)) : Rs.set(s, e),
      ws || (ws = e)
  }
  ),
    iu()
}
function iu() {
  eu && (ga = document.documentElement.dir || "ltr",
    pa = document.documentElement.lang || navigator.language),
    [...Vo.keys()].map(t => {
      typeof t.requestUpdate == "function" && t.requestUpdate()
    }
    )
}
let Hf = class {
  constructor(e) {
    this.host = e,
      this.host.addController(this)
  }
  hostConnected() {
    Vo.add(this.host)
  }
  hostDisconnected() {
    Vo.delete(this.host)
  }
  dir() {
    return `${this.host.dir || ga}`.toLowerCase()
  }
  lang() {
    return `${this.host.lang || pa}`.toLowerCase()
  }
  getTranslationData(e) {
    var s, r;
    const n = new Intl.Locale(e.replace(/_/g, "-"))
      , o = n == null ? void 0 : n.language.toLowerCase()
      , a = (r = (s = n == null ? void 0 : n.region) === null || s === void 0 ? void 0 : s.toLowerCase()) !== null && r !== void 0 ? r : ""
      , l = Rs.get(`${o}-${a}`)
      , h = Rs.get(o);
    return {
      locale: n,
      language: o,
      region: a,
      primary: l,
      secondary: h
    }
  }
  exists(e, s) {
    var r;
    const { primary: n, secondary: o } = this.getTranslationData((r = s.lang) !== null && r !== void 0 ? r : this.lang());
    return s = Object.assign({
      includeFallback: !1
    }, s),
      !!(n && n[e] || o && o[e] || s.includeFallback && ws && ws[e])
  }
  term(e, ...s) {
    const { primary: r, secondary: n } = this.getTranslationData(this.lang());
    let o;
    if (r && r[e])
      o = r[e];
    else if (n && n[e])
      o = n[e];
    else if (ws && ws[e])
      o = ws[e];
    else
      return console.error(`No translation found for: ${String(e)}`),
        String(e);
    return typeof o == "function" ? o(...s) : o
  }
  date(e, s) {
    return e = new Date(e),
      new Intl.DateTimeFormat(this.lang(), s).format(e)
  }
  number(e, s) {
    return e = Number(e),
      isNaN(e) ? "" : new Intl.NumberFormat(this.lang(), s).format(e)
  }
  relativeTime(e, s, r) {
    return new Intl.RelativeTimeFormat(this.lang(), r).format(e, s)
  }
}
  ;
var ru = {
  $code: "en",
  $name: "English",
  $dir: "ltr",
  carousel: "Carousel",
  clearEntry: "Clear entry",
  close: "Close",
  copied: "Copied",
  copy: "Copy",
  currentValue: "Current value",
  error: "Error",
  goToSlide: (t, e) => `Go to slide ${t} of ${e}`,
  hidePassword: "Hide password",
  loading: "Loading",
  nextSlide: "Next slide",
  numOptionsSelected: t => t === 0 ? "No options selected" : t === 1 ? "1 option selected" : `${t} options selected`,
  previousSlide: "Previous slide",
  progress: "Progress",
  remove: "Remove",
  resize: "Resize",
  scrollToEnd: "Scroll to end",
  scrollToStart: "Scroll to start",
  selectAColorFromTheScreen: "Select a color from the screen",
  showPassword: "Show password",
  slideNum: t => `Slide ${t}`,
  toggleColorFormat: "Toggle color format"
};
su(ru);
var Kf = ru
  , Wf = class extends Hf {
  }
  ;
su(Kf);
var Gf = as`
  :host {
    display: contents;

    /* For better DX, we'll reset the margin here so the base part can inherit it */
    margin: 0;
  }

  .alert {
    position: relative;
    display: flex;
    align-items: stretch;
    background-color: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-top-width: calc(var(--sl-panel-border-width) * 3);
    border-radius: var(--sl-border-radius-medium);
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-normal);
    line-height: 1.6;
    color: var(--sl-color-neutral-700);
    margin: inherit;
    overflow: hidden;
  }

  .alert:not(.alert--has-icon) .alert__icon,
  .alert:not(.alert--closable) .alert__close-button {
    display: none;
  }

  .alert__icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-large);
    padding-inline-start: var(--sl-spacing-large);
  }

  .alert--has-countdown {
    border-bottom: none;
  }

  .alert--primary {
    border-top-color: var(--sl-color-primary-600);
  }

  .alert--primary .alert__icon {
    color: var(--sl-color-primary-600);
  }

  .alert--success {
    border-top-color: var(--sl-color-success-600);
  }

  .alert--success .alert__icon {
    color: var(--sl-color-success-600);
  }

  .alert--neutral {
    border-top-color: var(--sl-color-neutral-600);
  }

  .alert--neutral .alert__icon {
    color: var(--sl-color-neutral-600);
  }

  .alert--warning {
    border-top-color: var(--sl-color-warning-600);
  }

  .alert--warning .alert__icon {
    color: var(--sl-color-warning-600);
  }

  .alert--danger {
    border-top-color: var(--sl-color-danger-600);
  }

  .alert--danger .alert__icon {
    color: var(--sl-color-danger-600);
  }

  .alert__message {
    flex: 1 1 auto;
    display: block;
    padding: var(--sl-spacing-large);
    overflow: hidden;
  }

  .alert__close-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-medium);
    padding-inline-end: var(--sl-spacing-medium);
  }

  .alert__countdown {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: calc(var(--sl-panel-border-width) * 3);
    background-color: var(--sl-panel-border-color);
    display: flex;
  }

  .alert__countdown--ltr {
    justify-content: flex-end;
  }

  .alert__countdown .alert__countdown-elapsed {
    height: 100%;
    width: 0;
  }

  .alert--primary .alert__countdown-elapsed {
    background-color: var(--sl-color-primary-600);
  }

  .alert--success .alert__countdown-elapsed {
    background-color: var(--sl-color-success-600);
  }

  .alert--neutral .alert__countdown-elapsed {
    background-color: var(--sl-color-neutral-600);
  }

  .alert--warning .alert__countdown-elapsed {
    background-color: var(--sl-color-warning-600);
  }

  .alert--danger .alert__countdown-elapsed {
    background-color: var(--sl-color-danger-600);
  }

  .alert__timer {
    display: none;
  }
`
  , Ps = Object.assign(document.createElement("div"), {
    className: "sl-toast-stack"
  })
  , Pt = class extends _e {
    constructor() {
      super(...arguments),
        this.hasSlotController = new fa(this, "icon", "suffix"),
        this.localize = new Wf(this),
        this.open = !1,
        this.closable = !1,
        this.variant = "primary",
        this.duration = 1 / 0,
        this.remainingTime = this.duration
    }
    firstUpdated() {
      this.base.hidden = !this.open
    }
    restartAutoHide() {
      this.handleCountdownChange(),
        clearTimeout(this.autoHideTimeout),
        clearInterval(this.remainingTimeInterval),
        this.open && this.duration < 1 / 0 && (this.autoHideTimeout = window.setTimeout(() => this.hide(), this.duration),
          this.remainingTime = this.duration,
          this.remainingTimeInterval = window.setInterval(() => {
            this.remainingTime -= 100
          }
            , 100))
    }
    pauseAutoHide() {
      var t;
      (t = this.countdownAnimation) == null || t.pause(),
        clearTimeout(this.autoHideTimeout),
        clearInterval(this.remainingTimeInterval)
    }
    resumeAutoHide() {
      var t;
      this.duration < 1 / 0 && (this.autoHideTimeout = window.setTimeout(() => this.hide(), this.remainingTime),
        this.remainingTimeInterval = window.setInterval(() => {
          this.remainingTime -= 100
        }
          , 100),
        (t = this.countdownAnimation) == null || t.play())
    }
    handleCountdownChange() {
      if (this.open && this.duration < 1 / 0 && this.countdown) {
        const { countdownElement: t } = this
          , e = "100%"
          , s = "0";
        this.countdownAnimation = t.animate([{
          width: e
        }, {
          width: s
        }], {
          duration: this.duration,
          easing: "linear"
        })
      }
    }
    handleCloseClick() {
      this.hide()
    }
    async handleOpenChange() {
      if (this.open) {
        this.emit("sl-show"),
          this.duration < 1 / 0 && this.restartAutoHide(),
          await ll(this.base),
          this.base.hidden = !1;
        const { keyframes: t, options: e } = nl(this, "alert.show", {
          dir: this.localize.dir()
        });
        await al(this.base, t, e),
          this.emit("sl-after-show")
      } else {
        this.emit("sl-hide"),
          clearTimeout(this.autoHideTimeout),
          clearInterval(this.remainingTimeInterval),
          await ll(this.base);
        const { keyframes: t, options: e } = nl(this, "alert.hide", {
          dir: this.localize.dir()
        });
        await al(this.base, t, e),
          this.base.hidden = !0,
          this.emit("sl-after-hide")
      }
    }
    handleDurationChange() {
      this.restartAutoHide()
    }
    async show() {
      if (!this.open)
        return this.open = !0,
          ol(this, "sl-after-show")
    }
    async hide() {
      if (this.open)
        return this.open = !1,
          ol(this, "sl-after-hide")
    }
    async toast() {
      return new Promise(t => {
        this.handleCountdownChange(),
          Ps.parentElement === null && document.body.append(Ps),
          Ps.appendChild(this),
          requestAnimationFrame(() => {
            this.clientWidth,
              this.show()
          }
          ),
          this.addEventListener("sl-after-hide", () => {
            Ps.removeChild(this),
              t(),
              Ps.querySelector("sl-alert") === null && Ps.remove()
          }
            , {
              once: !0
            })
      }
      )
    }
    render() {
      return Et`
      <div
        part="base"
        class=${_s({
        alert: !0,
        "alert--open": this.open,
        "alert--closable": this.closable,
        "alert--has-countdown": !!this.countdown,
        "alert--has-icon": this.hasSlotController.test("icon"),
        "alert--primary": this.variant === "primary",
        "alert--success": this.variant === "success",
        "alert--neutral": this.variant === "neutral",
        "alert--warning": this.variant === "warning",
        "alert--danger": this.variant === "danger"
      })}
        role="alert"
        aria-hidden=${this.open ? "false" : "true"}
        @mouseenter=${this.pauseAutoHide}
        @mouseleave=${this.resumeAutoHide}
      >
        <div part="icon" class="alert__icon">
          <slot name="icon"></slot>
        </div>

        <div part="message" class="alert__message" aria-live="polite">
          <slot></slot>
        </div>

        ${this.closable ? Et`
              <sl-icon-button
                part="close-button"
                exportparts="base:close-button__base"
                class="alert__close-button"
                name="x-lg"
                library="system"
                label=${this.localize.term("close")}
                @click=${this.handleCloseClick}
              ></sl-icon-button>
            ` : ""}

        <div role="timer" class="alert__timer">${this.remainingTime}</div>

        ${this.countdown ? Et`
              <div
                class=${_s({
        alert__countdown: !0,
        "alert__countdown--ltr": this.countdown === "ltr"
      })}
              >
                <div class="alert__countdown-elapsed"></div>
              </div>
            ` : ""}
      </div>
    `
    }
  }
  ;
Pt.styles = [zs, Gf];
Pt.dependencies = {
  "sl-icon-button": Lt
};
m([$s('[part~="base"]')], Pt.prototype, "base", 2);
m([$s(".alert__countdown-elapsed")], Pt.prototype, "countdownElement", 2);
m([_({
  type: Boolean,
  reflect: !0
})], Pt.prototype, "open", 2);
m([_({
  type: Boolean,
  reflect: !0
})], Pt.prototype, "closable", 2);
m([_({
  reflect: !0
})], Pt.prototype, "variant", 2);
m([_({
  type: Number
})], Pt.prototype, "duration", 2);
m([_({
  type: String,
  reflect: !0
})], Pt.prototype, "countdown", 2);
m([Pe()], Pt.prototype, "remainingTime", 2);
m([Le("open", {
  waitUntilFirstUpdate: !0
})], Pt.prototype, "handleOpenChange", 1);
m([Le("duration")], Pt.prototype, "handleDurationChange", 1);
tu("alert.show", {
  keyframes: [{
    opacity: 0,
    scale: .8
  }, {
    opacity: 1,
    scale: 1
  }],
  options: {
    duration: 250,
    easing: "ease"
  }
});
tu("alert.hide", {
  keyframes: [{
    opacity: 1,
    scale: 1
  }, {
    opacity: 0,
    scale: .8
  }],
  options: {
    duration: 250,
    easing: "ease"
  }
});
Pt.define("sl-alert");
var Yf = as`
  :host {
    display: inline-block;
  }

  .checkbox {
    position: relative;
    display: inline-flex;
    align-items: flex-start;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-label-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .checkbox--small {
    --toggle-size: var(--sl-toggle-size-small);
    font-size: var(--sl-input-font-size-small);
  }

  .checkbox--medium {
    --toggle-size: var(--sl-toggle-size-medium);
    font-size: var(--sl-input-font-size-medium);
  }

  .checkbox--large {
    --toggle-size: var(--sl-toggle-size-large);
    font-size: var(--sl-input-font-size-large);
  }

  .checkbox__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--toggle-size);
    height: var(--toggle-size);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
    border-radius: 2px;
    background-color: var(--sl-input-background-color);
    color: var(--sl-color-neutral-0);
    transition:
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) box-shadow;
  }

  .checkbox__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  .checkbox__checked-icon,
  .checkbox__indeterminate-icon {
    display: inline-flex;
    width: var(--toggle-size);
    height: var(--toggle-size);
  }

  /* Hover */
  .checkbox:not(.checkbox--checked):not(.checkbox--disabled) .checkbox__control:hover {
    border-color: var(--sl-input-border-color-hover);
    background-color: var(--sl-input-background-color-hover);
  }

  /* Focus */
  .checkbox:not(.checkbox--checked):not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Checked/indeterminate */
  .checkbox--checked .checkbox__control,
  .checkbox--indeterminate .checkbox__control {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
  }

  /* Checked/indeterminate + hover */
  .checkbox.checkbox--checked:not(.checkbox--disabled) .checkbox__control:hover,
  .checkbox.checkbox--indeterminate:not(.checkbox--disabled) .checkbox__control:hover {
    border-color: var(--sl-color-primary-500);
    background-color: var(--sl-color-primary-500);
  }

  /* Checked/indeterminate + focus */
  .checkbox.checkbox--checked:not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control,
  .checkbox.checkbox--indeterminate:not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Disabled */
  .checkbox--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .checkbox__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    line-height: var(--toggle-size);
    margin-inline-start: 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }

  :host([required]) .checkbox__label::after {
    content: var(--sl-input-required-content);
    color: var(--sl-input-required-content-color);
    margin-inline-start: var(--sl-input-required-content-offset);
  }
`
  , Zf = (t = "value") => (e, s) => {
    const r = e.constructor
      , n = r.prototype.attributeChangedCallback;
    r.prototype.attributeChangedCallback = function (o, a, l) {
      var h;
      const u = r.getPropertyOptions(t)
        , c = typeof u.attribute == "string" ? u.attribute : t;
      if (o === c) {
        const d = u.converter || Oi
          , y = (typeof d == "function" ? d : (h = d == null ? void 0 : d.fromAttribute) != null ? h : Oi.fromAttribute)(l, u.type);
        this[t] !== y && (this[s] = y)
      }
      n.call(this, o, a, l)
    }
  }
  , nu = as`
  .form-control .form-control__label {
    display: none;
  }

  .form-control .form-control__help-text {
    display: none;
  }

  /* Label */
  .form-control--has-label .form-control__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    margin-bottom: var(--sl-spacing-3x-small);
  }

  .form-control--has-label.form-control--small .form-control__label {
    font-size: var(--sl-input-label-font-size-small);
  }

  .form-control--has-label.form-control--medium .form-control__label {
    font-size: var(--sl-input-label-font-size-medium);
  }

  .form-control--has-label.form-control--large .form-control__label {
    font-size: var(--sl-input-label-font-size-large);
  }

  :host([required]) .form-control--has-label .form-control__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
    color: var(--sl-input-required-content-color);
  }

  /* Help text */
  .form-control--has-help-text .form-control__help-text {
    display: block;
    color: var(--sl-input-help-text-color);
    margin-top: var(--sl-spacing-3x-small);
  }

  .form-control--has-help-text.form-control--small .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-small);
  }

  .form-control--has-help-text.form-control--medium .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-medium);
  }

  .form-control--has-help-text.form-control--large .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-large);
  }

  .form-control--has-help-text.form-control--radio-group .form-control__help-text {
    margin-top: var(--sl-spacing-2x-small);
  }
`
  , Ii = new WeakMap
  , Fi = new WeakMap
  , Ri = new WeakMap
  , gn = new WeakSet
  , Ar = new WeakMap
  , ou = class {
    constructor(t, e) {
      this.handleFormData = s => {
        const r = this.options.disabled(this.host)
          , n = this.options.name(this.host)
          , o = this.options.value(this.host)
          , a = this.host.tagName.toLowerCase() === "sl-button";
        this.host.isConnected && !r && !a && typeof n == "string" && n.length > 0 && typeof o < "u" && (Array.isArray(o) ? o.forEach(l => {
          s.formData.append(n, l.toString())
        }
        ) : s.formData.append(n, o.toString()))
      }
        ,
        this.handleFormSubmit = s => {
          var r;
          const n = this.options.disabled(this.host)
            , o = this.options.reportValidity;
          this.form && !this.form.noValidate && ((r = Ii.get(this.form)) == null || r.forEach(a => {
            this.setUserInteracted(a, !0)
          }
          )),
            this.form && !this.form.noValidate && !n && !o(this.host) && (s.preventDefault(),
              s.stopImmediatePropagation())
        }
        ,
        this.handleFormReset = () => {
          this.options.setValue(this.host, this.options.defaultValue(this.host)),
            this.setUserInteracted(this.host, !1),
            Ar.set(this.host, [])
        }
        ,
        this.handleInteraction = s => {
          const r = Ar.get(this.host);
          r.includes(s.type) || r.push(s.type),
            r.length === this.options.assumeInteractionOn.length && this.setUserInteracted(this.host, !0)
        }
        ,
        this.checkFormValidity = () => {
          if (this.form && !this.form.noValidate) {
            const s = this.form.querySelectorAll("*");
            for (const r of s)
              if (typeof r.checkValidity == "function" && !r.checkValidity())
                return !1
          }
          return !0
        }
        ,
        this.reportFormValidity = () => {
          if (this.form && !this.form.noValidate) {
            const s = this.form.querySelectorAll("*");
            for (const r of s)
              if (typeof r.reportValidity == "function" && !r.reportValidity())
                return !1
          }
          return !0
        }
        ,
        (this.host = t).addController(this),
        this.options = ki({
          form: s => {
            const r = s.form;
            if (r) {
              const o = s.getRootNode().querySelector(`#${r}`);
              if (o)
                return o
            }
            return s.closest("form")
          }
          ,
          name: s => s.name,
          value: s => s.value,
          defaultValue: s => s.defaultValue,
          disabled: s => {
            var r;
            return (r = s.disabled) != null ? r : !1
          }
          ,
          reportValidity: s => typeof s.reportValidity == "function" ? s.reportValidity() : !0,
          checkValidity: s => typeof s.checkValidity == "function" ? s.checkValidity() : !0,
          setValue: (s, r) => s.value = r,
          assumeInteractionOn: ["sl-input"]
        }, e)
    }
    hostConnected() {
      const t = this.options.form(this.host);
      t && this.attachForm(t),
        Ar.set(this.host, []),
        this.options.assumeInteractionOn.forEach(e => {
          this.host.addEventListener(e, this.handleInteraction)
        }
        )
    }
    hostDisconnected() {
      this.detachForm(),
        Ar.delete(this.host),
        this.options.assumeInteractionOn.forEach(t => {
          this.host.removeEventListener(t, this.handleInteraction)
        }
        )
    }
    hostUpdated() {
      const t = this.options.form(this.host);
      t || this.detachForm(),
        t && this.form !== t && (this.detachForm(),
          this.attachForm(t)),
        this.host.hasUpdated && this.setValidity(this.host.validity.valid)
    }
    attachForm(t) {
      t ? (this.form = t,
        Ii.has(this.form) ? Ii.get(this.form).add(this.host) : Ii.set(this.form, new Set([this.host])),
        this.form.addEventListener("formdata", this.handleFormData),
        this.form.addEventListener("submit", this.handleFormSubmit),
        this.form.addEventListener("reset", this.handleFormReset),
        Fi.has(this.form) || (Fi.set(this.form, this.form.reportValidity),
          this.form.reportValidity = () => this.reportFormValidity()),
        Ri.has(this.form) || (Ri.set(this.form, this.form.checkValidity),
          this.form.checkValidity = () => this.checkFormValidity())) : this.form = void 0
    }
    detachForm() {
      if (!this.form)
        return;
      const t = Ii.get(this.form);
      t && (t.delete(this.host),
        t.size <= 0 && (this.form.removeEventListener("formdata", this.handleFormData),
          this.form.removeEventListener("submit", this.handleFormSubmit),
          this.form.removeEventListener("reset", this.handleFormReset),
          Fi.has(this.form) && (this.form.reportValidity = Fi.get(this.form),
            Fi.delete(this.form)),
          Ri.has(this.form) && (this.form.checkValidity = Ri.get(this.form),
            Ri.delete(this.form)),
          this.form = void 0))
    }
    setUserInteracted(t, e) {
      e ? gn.add(t) : gn.delete(t),
        t.requestUpdate()
    }
    doAction(t, e) {
      if (this.form) {
        const s = document.createElement("button");
        s.type = t,
          s.style.position = "absolute",
          s.style.width = "0",
          s.style.height = "0",
          s.style.clipPath = "inset(50%)",
          s.style.overflow = "hidden",
          s.style.whiteSpace = "nowrap",
          e && (s.name = e.name,
            s.value = e.value,
            ["formaction", "formenctype", "formmethod", "formnovalidate", "formtarget"].forEach(r => {
              e.hasAttribute(r) && s.setAttribute(r, e.getAttribute(r))
            }
            )),
          this.form.append(s),
          s.click(),
          s.remove()
      }
    }
    getForm() {
      var t;
      return (t = this.form) != null ? t : null
    }
    reset(t) {
      this.doAction("reset", t)
    }
    submit(t) {
      this.doAction("submit", t)
    }
    setValidity(t) {
      const e = this.host
        , s = !!gn.has(e)
        , r = !!e.required;
      e.toggleAttribute("data-required", r),
        e.toggleAttribute("data-optional", !r),
        e.toggleAttribute("data-invalid", !t),
        e.toggleAttribute("data-valid", t),
        e.toggleAttribute("data-user-invalid", !t && s),
        e.toggleAttribute("data-user-valid", t && s)
    }
    updateValidity() {
      const t = this.host;
      this.setValidity(t.validity.valid)
    }
    emitInvalidEvent(t) {
      const e = new CustomEvent("sl-invalid", {
        bubbles: !1,
        composed: !1,
        cancelable: !0,
        detail: {}
      });
      t || e.preventDefault(),
        this.host.dispatchEvent(e) || t == null || t.preventDefault()
    }
  }
  , ya = Object.freeze({
    badInput: !1,
    customError: !1,
    patternMismatch: !1,
    rangeOverflow: !1,
    rangeUnderflow: !1,
    stepMismatch: !1,
    tooLong: !1,
    tooShort: !1,
    typeMismatch: !1,
    valid: !0,
    valueMissing: !1
  })
  , Jf = Object.freeze(da(ki({}, ya), {
    valid: !1,
    valueMissing: !0
  }))
  , Qf = Object.freeze(da(ki({}, ya), {
    valid: !1,
    customError: !0
  }));
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const hl = Zc(class extends Jc {
  constructor(t) {
    if (super(t),
      t.type !== bs.PROPERTY && t.type !== bs.ATTRIBUTE && t.type !== bs.BOOLEAN_ATTRIBUTE)
      throw Error("The `live` directive is not allowed on child or event bindings");
    if (!Mf(t))
      throw Error("`live` bindings can only contain a single expression")
  }
  render(t) {
    return t
  }
  update(t, [e]) {
    if (e === Oe || e === V)
      return e;
    const s = t.element
      , r = t.name;
    if (t.type === bs.PROPERTY) {
      if (e === s[r])
        return Oe
    } else if (t.type === bs.BOOLEAN_ATTRIBUTE) {
      if (!!e === s.hasAttribute(r))
        return Oe
    } else if (t.type === bs.ATTRIBUTE && s.getAttribute(r) === e + "")
      return Oe;
    return Ff(t),
      e
  }
}
);
var st = class extends _e {
  constructor() {
    super(...arguments),
      this.formControlController = new ou(this, {
        value: t => t.checked ? t.value || "on" : void 0,
        defaultValue: t => t.defaultChecked,
        setValue: (t, e) => t.checked = e
      }),
      this.hasSlotController = new fa(this, "help-text"),
      this.hasFocus = !1,
      this.title = "",
      this.name = "",
      this.size = "medium",
      this.disabled = !1,
      this.checked = !1,
      this.indeterminate = !1,
      this.defaultChecked = !1,
      this.form = "",
      this.required = !1,
      this.helpText = ""
  }
  get validity() {
    return this.input.validity
  }
  get validationMessage() {
    return this.input.validationMessage
  }
  firstUpdated() {
    this.formControlController.updateValidity()
  }
  handleClick() {
    this.checked = !this.checked,
      this.indeterminate = !1,
      this.emit("sl-change")
  }
  handleBlur() {
    this.hasFocus = !1,
      this.emit("sl-blur")
  }
  handleInput() {
    this.emit("sl-input")
  }
  handleInvalid(t) {
    this.formControlController.setValidity(!1),
      this.formControlController.emitInvalidEvent(t)
  }
  handleFocus() {
    this.hasFocus = !0,
      this.emit("sl-focus")
  }
  handleDisabledChange() {
    this.formControlController.setValidity(this.disabled)
  }
  handleStateChange() {
    this.input.checked = this.checked,
      this.input.indeterminate = this.indeterminate,
      this.formControlController.updateValidity()
  }
  click() {
    this.input.click()
  }
  focus(t) {
    this.input.focus(t)
  }
  blur() {
    this.input.blur()
  }
  checkValidity() {
    return this.input.checkValidity()
  }
  getForm() {
    return this.formControlController.getForm()
  }
  reportValidity() {
    return this.input.reportValidity()
  }
  setCustomValidity(t) {
    this.input.setCustomValidity(t),
      this.formControlController.updateValidity()
  }
  render() {
    const t = this.hasSlotController.test("help-text")
      , e = this.helpText ? !0 : !!t;
    return Et`
      <div
        class=${_s({
      "form-control": !0,
      "form-control--small": this.size === "small",
      "form-control--medium": this.size === "medium",
      "form-control--large": this.size === "large",
      "form-control--has-help-text": e
    })}
      >
        <label
          part="base"
          class=${_s({
      checkbox: !0,
      "checkbox--checked": this.checked,
      "checkbox--disabled": this.disabled,
      "checkbox--focused": this.hasFocus,
      "checkbox--indeterminate": this.indeterminate,
      "checkbox--small": this.size === "small",
      "checkbox--medium": this.size === "medium",
      "checkbox--large": this.size === "large"
    })}
        >
          <input
            class="checkbox__input"
            type="checkbox"
            title=${this.title}
            name=${this.name}
            value=${we(this.value)}
            .indeterminate=${hl(this.indeterminate)}
            .checked=${hl(this.checked)}
            .disabled=${this.disabled}
            .required=${this.required}
            aria-checked=${this.checked ? "true" : "false"}
            aria-describedby="help-text"
            @click=${this.handleClick}
            @input=${this.handleInput}
            @invalid=${this.handleInvalid}
            @blur=${this.handleBlur}
            @focus=${this.handleFocus}
          />

          <span
            part="control${this.checked ? " control--checked" : ""}${this.indeterminate ? " control--indeterminate" : ""}"
            class="checkbox__control"
          >
            ${this.checked ? Et`
                  <sl-icon part="checked-icon" class="checkbox__checked-icon" library="system" name="check"></sl-icon>
                ` : ""}
            ${!this.checked && this.indeterminate ? Et`
                  <sl-icon
                    part="indeterminate-icon"
                    class="checkbox__indeterminate-icon"
                    library="system"
                    name="indeterminate"
                  ></sl-icon>
                ` : ""}
          </span>

          <div part="label" class="checkbox__label">
            <slot></slot>
          </div>
        </label>

        <div
          aria-hidden=${e ? "false" : "true"}
          class="form-control__help-text"
          id="help-text"
          part="form-control-help-text"
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `
  }
}
  ;
st.styles = [zs, nu, Yf];
st.dependencies = {
  "sl-icon": Ee
};
m([$s('input[type="checkbox"]')], st.prototype, "input", 2);
m([Pe()], st.prototype, "hasFocus", 2);
m([_()], st.prototype, "title", 2);
m([_()], st.prototype, "name", 2);
m([_()], st.prototype, "value", 2);
m([_({
  reflect: !0
})], st.prototype, "size", 2);
m([_({
  type: Boolean,
  reflect: !0
})], st.prototype, "disabled", 2);
m([_({
  type: Boolean,
  reflect: !0
})], st.prototype, "checked", 2);
m([_({
  type: Boolean,
  reflect: !0
})], st.prototype, "indeterminate", 2);
m([Zf("checked")], st.prototype, "defaultChecked", 2);
m([_({
  reflect: !0
})], st.prototype, "form", 2);
m([_({
  type: Boolean,
  reflect: !0
})], st.prototype, "required", 2);
m([_({
  attribute: "help-text"
})], st.prototype, "helpText", 2);
m([Le("disabled", {
  waitUntilFirstUpdate: !0
})], st.prototype, "handleDisabledChange", 1);
m([Le(["checked", "indeterminate"], {
  waitUntilFirstUpdate: !0
})], st.prototype, "handleStateChange", 1);
st.define("sl-checkbox");
var Xf = as`
  :host {
    display: block;
  }

  :host(:focus-visible) {
    outline: 0px;
  }

  .radio {
    display: inline-flex;
    align-items: top;
    font-family: var(--sl-input-font-family);
    font-size: var(--sl-input-font-size-medium);
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-label-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .radio--small {
    --toggle-size: var(--sl-toggle-size-small);
    font-size: var(--sl-input-font-size-small);
  }

  .radio--medium {
    --toggle-size: var(--sl-toggle-size-medium);
    font-size: var(--sl-input-font-size-medium);
  }

  .radio--large {
    --toggle-size: var(--sl-toggle-size-large);
    font-size: var(--sl-input-font-size-large);
  }

  .radio__checked-icon {
    display: inline-flex;
    width: var(--toggle-size);
    height: var(--toggle-size);
  }

  .radio__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--toggle-size);
    height: var(--toggle-size);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
    border-radius: 50%;
    background-color: var(--sl-input-background-color);
    color: transparent;
    transition:
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) box-shadow;
  }

  .radio__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  /* Hover */
  .radio:not(.radio--checked):not(.radio--disabled) .radio__control:hover {
    border-color: var(--sl-input-border-color-hover);
    background-color: var(--sl-input-background-color-hover);
  }

  /* Checked */
  .radio--checked .radio__control {
    color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
  }

  /* Checked + hover */
  .radio.radio--checked:not(.radio--disabled) .radio__control:hover {
    border-color: var(--sl-color-primary-500);
    background-color: var(--sl-color-primary-500);
  }

  /* Checked + focus */
  :host(:focus-visible) .radio__control {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Disabled */
  .radio--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When the control isn't checked, hide the circle for Windows High Contrast mode a11y */
  .radio:not(.radio--checked) svg circle {
    opacity: 0;
  }

  .radio__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    line-height: var(--toggle-size);
    margin-inline-start: 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }
`
  , Te = class extends _e {
    constructor() {
      super(),
        this.checked = !1,
        this.hasFocus = !1,
        this.size = "medium",
        this.disabled = !1,
        this.handleBlur = () => {
          this.hasFocus = !1,
            this.emit("sl-blur")
        }
        ,
        this.handleClick = () => {
          this.disabled || (this.checked = !0)
        }
        ,
        this.handleFocus = () => {
          this.hasFocus = !0,
            this.emit("sl-focus")
        }
        ,
        this.addEventListener("blur", this.handleBlur),
        this.addEventListener("click", this.handleClick),
        this.addEventListener("focus", this.handleFocus)
    }
    connectedCallback() {
      super.connectedCallback(),
        this.setInitialAttributes()
    }
    setInitialAttributes() {
      this.setAttribute("role", "radio"),
        this.setAttribute("tabindex", "-1"),
        this.setAttribute("aria-disabled", this.disabled ? "true" : "false")
    }
    handleCheckedChange() {
      this.setAttribute("aria-checked", this.checked ? "true" : "false"),
        this.setAttribute("tabindex", this.checked ? "0" : "-1")
    }
    handleDisabledChange() {
      this.setAttribute("aria-disabled", this.disabled ? "true" : "false")
    }
    render() {
      return Et`
      <span
        part="base"
        class=${_s({
        radio: !0,
        "radio--checked": this.checked,
        "radio--disabled": this.disabled,
        "radio--focused": this.hasFocus,
        "radio--small": this.size === "small",
        "radio--medium": this.size === "medium",
        "radio--large": this.size === "large"
      })}
      >
        <span part="${`control${this.checked ? " control--checked" : ""}`}" class="radio__control">
          ${this.checked ? Et` <sl-icon part="checked-icon" class="radio__checked-icon" library="system" name="radio"></sl-icon> ` : ""}
        </span>

        <slot part="label" class="radio__label"></slot>
      </span>
    `
    }
  }
  ;
Te.styles = [zs, Xf];
Te.dependencies = {
  "sl-icon": Ee
};
m([Pe()], Te.prototype, "checked", 2);
m([Pe()], Te.prototype, "hasFocus", 2);
m([_()], Te.prototype, "value", 2);
m([_({
  reflect: !0
})], Te.prototype, "size", 2);
m([_({
  type: Boolean,
  reflect: !0
})], Te.prototype, "disabled", 2);
m([Le("checked")], Te.prototype, "handleCheckedChange", 1);
m([Le("disabled", {
  waitUntilFirstUpdate: !0
})], Te.prototype, "handleDisabledChange", 1);
Te.define("sl-radio");
var tg = as`
  :host {
    display: block;
  }

  .form-control {
    position: relative;
    border: none;
    padding: 0;
    margin: 0;
  }

  .form-control__label {
    padding: 0;
  }

  .radio-group--required .radio-group__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`
  , eg = as`
  :host {
    display: inline-block;
  }

  .button-group {
    display: flex;
    flex-wrap: nowrap;
  }
`
  , gr = class extends _e {
    constructor() {
      super(...arguments),
        this.disableRole = !1,
        this.label = ""
    }
    handleFocus(t) {
      const e = Ui(t.target);
      e == null || e.toggleAttribute("data-sl-button-group__button--focus", !0)
    }
    handleBlur(t) {
      const e = Ui(t.target);
      e == null || e.toggleAttribute("data-sl-button-group__button--focus", !1)
    }
    handleMouseOver(t) {
      const e = Ui(t.target);
      e == null || e.toggleAttribute("data-sl-button-group__button--hover", !0)
    }
    handleMouseOut(t) {
      const e = Ui(t.target);
      e == null || e.toggleAttribute("data-sl-button-group__button--hover", !1)
    }
    handleSlotChange() {
      const t = [...this.defaultSlot.assignedElements({
        flatten: !0
      })];
      t.forEach(e => {
        const s = t.indexOf(e)
          , r = Ui(e);
        r && (r.toggleAttribute("data-sl-button-group__button", !0),
          r.toggleAttribute("data-sl-button-group__button--first", s === 0),
          r.toggleAttribute("data-sl-button-group__button--inner", s > 0 && s < t.length - 1),
          r.toggleAttribute("data-sl-button-group__button--last", s === t.length - 1),
          r.toggleAttribute("data-sl-button-group__button--radio", r.tagName.toLowerCase() === "sl-radio-button"))
      }
      )
    }
    render() {
      return Et`
      <div
        part="base"
        class="button-group"
        role="${this.disableRole ? "presentation" : "group"}"
        aria-label=${this.label}
        @focusout=${this.handleBlur}
        @focusin=${this.handleFocus}
        @mouseover=${this.handleMouseOver}
        @mouseout=${this.handleMouseOut}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `
    }
  }
  ;
gr.styles = [zs, eg];
m([$s("slot")], gr.prototype, "defaultSlot", 2);
m([Pe()], gr.prototype, "disableRole", 2);
m([_()], gr.prototype, "label", 2);
function Ui(t) {
  var e;
  const s = "sl-button, sl-radio-button";
  return (e = t.closest(s)) != null ? e : t.querySelector(s)
}
var rt = class extends _e {
  constructor() {
    super(...arguments),
      this.formControlController = new ou(this),
      this.hasSlotController = new fa(this, "help-text", "label"),
      this.customValidityMessage = "",
      this.hasButtonGroup = !1,
      this.errorMessage = "",
      this.defaultValue = "",
      this.label = "",
      this.helpText = "",
      this.name = "option",
      this.value = "",
      this.size = "medium",
      this.form = "",
      this.required = !1
  }
  get validity() {
    const t = this.required && !this.value;
    return this.customValidityMessage !== "" ? Qf : t ? Jf : ya
  }
  get validationMessage() {
    const t = this.required && !this.value;
    return this.customValidityMessage !== "" ? this.customValidityMessage : t ? this.validationInput.validationMessage : ""
  }
  connectedCallback() {
    super.connectedCallback(),
      this.defaultValue = this.value
  }
  firstUpdated() {
    this.formControlController.updateValidity()
  }
  getAllRadios() {
    return [...this.querySelectorAll("sl-radio, sl-radio-button")]
  }
  handleRadioClick(t) {
    const e = t.target.closest("sl-radio, sl-radio-button")
      , s = this.getAllRadios()
      , r = this.value;
    !e || e.disabled || (this.value = e.value,
      s.forEach(n => n.checked = n === e),
      this.value !== r && (this.emit("sl-change"),
        this.emit("sl-input")))
  }
  handleKeyDown(t) {
    var e;
    if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(t.key))
      return;
    const s = this.getAllRadios().filter(l => !l.disabled)
      , r = (e = s.find(l => l.checked)) != null ? e : s[0]
      , n = t.key === " " ? 0 : ["ArrowUp", "ArrowLeft"].includes(t.key) ? -1 : 1
      , o = this.value;
    let a = s.indexOf(r) + n;
    a < 0 && (a = s.length - 1),
      a > s.length - 1 && (a = 0),
      this.getAllRadios().forEach(l => {
        l.checked = !1,
          this.hasButtonGroup || l.setAttribute("tabindex", "-1")
      }
      ),
      this.value = s[a].value,
      s[a].checked = !0,
      this.hasButtonGroup ? s[a].shadowRoot.querySelector("button").focus() : (s[a].setAttribute("tabindex", "0"),
        s[a].focus()),
      this.value !== o && (this.emit("sl-change"),
        this.emit("sl-input")),
      t.preventDefault()
  }
  handleLabelClick() {
    const t = this.getAllRadios()
      , s = t.find(r => r.checked) || t[0];
    s && s.focus()
  }
  handleInvalid(t) {
    this.formControlController.setValidity(!1),
      this.formControlController.emitInvalidEvent(t)
  }
  async syncRadioElements() {
    var t, e;
    const s = this.getAllRadios();
    if (await Promise.all(s.map(async r => {
      await r.updateComplete,
        r.checked = r.value === this.value,
        r.size = this.size
    }
    )),
      this.hasButtonGroup = s.some(r => r.tagName.toLowerCase() === "sl-radio-button"),
      s.length > 0 && !s.some(r => r.checked))
      if (this.hasButtonGroup) {
        const r = (t = s[0].shadowRoot) == null ? void 0 : t.querySelector("button");
        r && r.setAttribute("tabindex", "0")
      } else
        s[0].setAttribute("tabindex", "0");
    if (this.hasButtonGroup) {
      const r = (e = this.shadowRoot) == null ? void 0 : e.querySelector("sl-button-group");
      r && (r.disableRole = !0)
    }
  }
  syncRadios() {
    if (customElements.get("sl-radio") && customElements.get("sl-radio-button")) {
      this.syncRadioElements();
      return
    }
    customElements.get("sl-radio") ? this.syncRadioElements() : customElements.whenDefined("sl-radio").then(() => this.syncRadios()),
      customElements.get("sl-radio-button") ? this.syncRadioElements() : customElements.whenDefined("sl-radio-button").then(() => this.syncRadios())
  }
  updateCheckedRadio() {
    this.getAllRadios().forEach(e => e.checked = e.value === this.value),
      this.formControlController.setValidity(this.validity.valid)
  }
  handleSizeChange() {
    this.syncRadios()
  }
  handleValueChange() {
    this.hasUpdated && this.updateCheckedRadio()
  }
  checkValidity() {
    const t = this.required && !this.value
      , e = this.customValidityMessage !== "";
    return t || e ? (this.formControlController.emitInvalidEvent(),
      !1) : !0
  }
  getForm() {
    return this.formControlController.getForm()
  }
  reportValidity() {
    const t = this.validity.valid;
    return this.errorMessage = this.customValidityMessage || t ? "" : this.validationInput.validationMessage,
      this.formControlController.setValidity(t),
      this.validationInput.hidden = !0,
      clearTimeout(this.validationTimeout),
      t || (this.validationInput.hidden = !1,
        this.validationInput.reportValidity(),
        this.validationTimeout = setTimeout(() => this.validationInput.hidden = !0, 1e4)),
      t
  }
  setCustomValidity(t = "") {
    this.customValidityMessage = t,
      this.errorMessage = t,
      this.validationInput.setCustomValidity(t),
      this.formControlController.updateValidity()
  }
  render() {
    const t = this.hasSlotController.test("label")
      , e = this.hasSlotController.test("help-text")
      , s = this.label ? !0 : !!t
      , r = this.helpText ? !0 : !!e
      , n = Et`
      <slot @slotchange=${this.syncRadios} @click=${this.handleRadioClick} @keydown=${this.handleKeyDown}></slot>
    `;
    return Et`
      <fieldset
        part="form-control"
        class=${_s({
      "form-control": !0,
      "form-control--small": this.size === "small",
      "form-control--medium": this.size === "medium",
      "form-control--large": this.size === "large",
      "form-control--radio-group": !0,
      "form-control--has-label": s,
      "form-control--has-help-text": r
    })}
        role="radiogroup"
        aria-labelledby="label"
        aria-describedby="help-text"
        aria-errormessage="error-message"
      >
        <label
          part="form-control-label"
          id="label"
          class="form-control__label"
          aria-hidden=${s ? "false" : "true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div class="visually-hidden">
            <div id="error-message" aria-live="assertive">${this.errorMessage}</div>
            <label class="radio-group__validation">
              <input
                type="text"
                class="radio-group__validation-input"
                ?required=${this.required}
                tabindex="-1"
                hidden
                @invalid=${this.handleInvalid}
              />
            </label>
          </div>

          ${this.hasButtonGroup ? Et`
                <sl-button-group part="button-group" exportparts="base:button-group__base" role="presentation">
                  ${n}
                </sl-button-group>
              ` : n}
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${r ? "false" : "true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </fieldset>
    `
  }
}
  ;
rt.styles = [zs, nu, tg];
rt.dependencies = {
  "sl-button-group": gr
};
m([$s("slot:not([name])")], rt.prototype, "defaultSlot", 2);
m([$s(".radio-group__validation-input")], rt.prototype, "validationInput", 2);
m([Pe()], rt.prototype, "hasButtonGroup", 2);
m([Pe()], rt.prototype, "errorMessage", 2);
m([Pe()], rt.prototype, "defaultValue", 2);
m([_()], rt.prototype, "label", 2);
m([_({
  attribute: "help-text"
})], rt.prototype, "helpText", 2);
m([_()], rt.prototype, "name", 2);
m([_({
  reflect: !0
})], rt.prototype, "value", 2);
m([_({
  reflect: !0
})], rt.prototype, "size", 2);
m([_({
  reflect: !0
})], rt.prototype, "form", 2);
m([_({
  type: Boolean,
  reflect: !0
})], rt.prototype, "required", 2);
m([Le("size", {
  waitUntilFirstUpdate: !0
})], rt.prototype, "handleSizeChange", 1);
m([Le("value")], rt.prototype, "handleValueChange", 1);
rt.define("sl-radio-group");
class au extends Date {
  constructor() {
    super(),
      this.setTime(arguments.length === 0 ? Date.now() : arguments.length === 1 ? typeof arguments[0] == "string" ? +new Date(arguments[0]) : arguments[0] : Date.UTC(...arguments))
  }
  getTimezoneOffset() {
    return 0
  }
}
const cl = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach(t => {
  if (cl.test(t)) {
    const e = Date.prototype[t.replace(cl, "$1UTC")];
    e && (au.prototype[t] = e)
  }
}
);
class fe extends au {
  toString() {
    const e = this.toDateString()
      , s = this.toTimeString();
    return `${e} ${s}`
  }
  toDateString() {
    const e = sg.format(this)
      , s = ig.format(this)
      , r = this.getFullYear();
    return `${e} ${s} ${r}`
  }
  toTimeString() {
    return `${rg.format(this)} GMT+0000 (Coordinated Universal Time)`
  }
  toLocaleString(e, s) {
    return Date.prototype.toLocaleString.call(this, e, {
      timeZone: "UTC",
      ...s
    })
  }
  toLocaleDateString(e, s) {
    return Date.prototype.toLocaleDateString.call(this, e, {
      timeZone: "UTC",
      ...s
    })
  }
  toLocaleTimeString(e, s) {
    return Date.prototype.toLocaleTimeString.call(this, e, {
      timeZone: "UTC",
      ...s
    })
  }
}
var sg = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  timeZone: "UTC"
})
  , ig = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC"
  })
  , rg = new Intl.DateTimeFormat("en-GB", {
    hour12: !1,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "UTC"
  });
function lt(t, e, s, r) {
  const n = r.length;
  r.push(""),
    e(s, r);
  const o = r.length - n - 1;
  return o !== 0 ? r[n] = `${t}m${o}` : r.pop(),
    r
}
function Hr(t, e) {
  const s = [];
  return t(e, s),
    `!${s.join("!")}`
}
function De(t) {
  return t.replace(/[!*]/g, e => `*${e.charCodeAt(0).toString(16).toUpperCase()}`)
}
var $r = (t => (t[t.NULL = 0] = "NULL",
  t[t.OFFICIAL = 2] = "OFFICIAL",
  t[t.USER_PHOTO = 3] = "USER_PHOTO",
  t[t.USER_PHOTO_2 = 8] = "USER_PHOTO_2",
  t[t.USER_UPLOADED = 10] = "USER_UPLOADED",
  t))($r || {}), Cr = (t => (t[t.NULL = 0] = "NULL",
    t[t.UNKNOWN1 = 1] = "UNKNOWN1",
    t[t.PHOTOSPHERE = 2] = "PHOTOSPHERE",
    t[t.PHOTO = 3] = "PHOTO",
    t[t.VIDEO = 4] = "VIDEO",
    t))(Cr || {}), Bs = (t => (t[t.ROADMAP = 0] = "ROADMAP",
      t[t.SATELLITE = 1] = "SATELLITE",
      t[t.OVERLAY = 2] = "OVERLAY",
      t[t.UNKNOWN = 3] = "UNKNOWN",
      t[t.TERRAIN = 4] = "TERRAIN",
      t[t.TERRAIN_RELIEF = 5] = "TERRAIN_RELIEF",
      t[t.TERRAIN_CONTOURS = 6] = "TERRAIN_CONTOURS",
      t))(Bs || {}), et = (t => (t[t.NULL = 0] = "NULL",
        t[t.NORMAL = 1] = "NORMAL",
        t[t.HIGH_DPI = 2] = "HIGH_DPI",
        t[t.NO_LABELS = 3] = "NO_LABELS",
        t[t.SATELLITE = 4] = "SATELLITE",
        t[t.BIG_ROAD_ICONS = 13] = "BIG_ROAD_ICONS",
        t[t.LABELS_ONLY = 15] = "LABELS_ONLY",
        t[t.LABELS_ONLY_ROADMAP = 18] = "LABELS_ONLY_ROADMAP",
        t[t.WHITE_ROADS = 21] = "WHITE_ROADS",
        t[t.STYLERS = 26] = "STYLERS",
        t[t.SMARTMAPS = 37] = "SMARTMAPS",
        t[t.STREET_VIEW_DARK = 40] = "STREET_VIEW_DARK",
        t[t.TERRAIN_ROADS = 63] = "TERRAIN_ROADS",
        t[t.NO_LAND_USE = 64] = "NO_LAND_USE",
        t[t.TERRAIN = 67] = "TERRAIN",
        t[t.BASEMAP = 68] = "BASEMAP",
        t))(et || {}), lu = (t => (t[t.OVERLAY_NULL = 0] = "OVERLAY_NULL",
          t[t.HYBRID_OVERLAY = 18] = "HYBRID_OVERLAY",
          t))(lu || {}), ci, $l, pn = ($l = class {
            constructor(e) {
              p(this, ci, []);
              Array.isArray(e) ? g(this, ci, e) : e && Object.assign(this, e)
            }
            toArray() {
              return i(this, ci)
            }
            toObject() {
              return {}
            }
            serialize(e) {
              i(this, ci).length
            }
          }
            ,
            ci = new WeakMap,
            $l);
function ng(t, e) { }
var ui, Cl, yn = (Cl = class {
  constructor(e) {
    p(this, ui, []);
    Array.isArray(e) ? g(this, ui, e) : e && Object.assign(this, e)
  }
  toArray() {
    return i(this, ui)
  }
  toObject() {
    return {}
  }
  serialize(e) {
    i(this, ui).length
  }
}
  ,
  ui = new WeakMap,
  Cl);
function og(t, e) { }
var di, Dl, mn = (Dl = class {
  constructor(e) {
    p(this, di, []);
    Array.isArray(e) ? g(this, di, e) : e && Object.assign(this, e)
  }
  toArray() {
    return i(this, di)
  }
  toObject() {
    return {}
  }
  serialize(e) {
    i(this, di).length
  }
}
  ,
  di = new WeakMap,
  Dl);
function ag(t, e) { }
var O, Ll, bn = (Ll = class {
  constructor(e) {
    p(this, O, []);
    Array.isArray(e) ? g(this, O, e) : e && Object.assign(this, e)
  }
  get client() {
    return i(this, O)[0] ?? ""
  }
  set client(e) {
    i(this, O)[0] = e
  }
  get source() {
    return i(this, O)[1] ?? 0
  }
  set source(e) {
    i(this, O)[1] = e
  }
  get clientId() {
    return i(this, O)[2] ?? 0
  }
  set clientId(e) {
    i(this, O)[2] = e
  }
  get cacheBehavior() {
    return i(this, O)[3] ?? 0
  }
  set cacheBehavior(e) {
    i(this, O)[3] = e
  }
  get language() {
    return i(this, O)[4] ?? ""
  }
  set language(e) {
    i(this, O)[4] = e
  }
  get gpsDebugLevel() {
    return i(this, O)[5] ?? 0
  }
  set gpsDebugLevel(e) {
    i(this, O)[5] = e
  }
  get httpResponseFormat() {
    return i(this, O)[6] ?? 0
  }
  set httpResponseFormat(e) {
    i(this, O)[6] = e
  }
  get inlineExtraDataSpec() {
    return i(this, O)[7] ?? !1
  }
  set inlineExtraDataSpec(e) {
    i(this, O)[7] = e
  }
  get queryOrigin() {
    return i(this, O)[8] ?? ""
  }
  set queryOrigin(e) {
    i(this, O)[8] = e
  }
  get superrootParams() {
    var e;
    return new pn((e = i(this, O))[9] ?? (e[9] = []))
  }
  set superrootParams(e) {
    i(this, O)[9] = e != null ? (e instanceof pn ? e : new pn(e)).toArray() : []
  }
  get productSpecialCaseOptions() {
    var e;
    return new yn((e = i(this, O))[10] ?? (e[10] = []))
  }
  set productSpecialCaseOptions(e) {
    i(this, O)[10] = e != null ? (e instanceof yn ? e : new yn(e)).toArray() : []
  }
  get experimentalOptions() {
    var e;
    return new mn((e = i(this, O))[11] ?? (e[11] = []))
  }
  set experimentalOptions(e) {
    i(this, O)[11] = e != null ? (e instanceof mn ? e : new mn(e)).toArray() : []
  }
  toArray() {
    return i(this, O)
  }
  toObject() {
    return {
      client: this.client,
      source: this.source,
      clientId: this.clientId,
      cacheBehavior: this.cacheBehavior,
      language: this.language,
      gpsDebugLevel: this.gpsDebugLevel,
      httpResponseFormat: this.httpResponseFormat,
      inlineExtraDataSpec: this.inlineExtraDataSpec,
      queryOrigin: this.queryOrigin,
      superrootParams: this.superrootParams.toObject(),
      productSpecialCaseOptions: this.productSpecialCaseOptions.toObject(),
      experimentalOptions: this.experimentalOptions.toObject()
    }
  }
  serialize(e) {
    i(this, O).length !== 0 && (i(this, O)[0] != null && e.writeString(1, this.client),
      i(this, O)[1] != null && e.writeEnum(2, this.source),
      i(this, O)[2] != null && e.writeInt32(3, this.clientId),
      i(this, O)[3] != null && e.writeEnum(4, this.cacheBehavior),
      i(this, O)[4] != null && e.writeString(5, this.language),
      i(this, O)[5] != null && e.writeEnum(6, this.gpsDebugLevel),
      i(this, O)[6] != null && e.writeEnum(7, this.httpResponseFormat),
      i(this, O)[7] != null && e.writeBool(8, this.inlineExtraDataSpec),
      i(this, O)[8] != null && e.writeString(9, this.queryOrigin),
      i(this, O)[9] != null && e.writeMessage(10, this.superrootParams, s => s.serialize(e)),
      i(this, O)[10] != null && e.writeMessage(11, this.productSpecialCaseOptions, s => s.serialize(e)),
      i(this, O)[11] != null && e.writeMessage(12, this.experimentalOptions, s => s.serialize(e)))
  }
}
  ,
  O = new WeakMap,
  Ll);
function lg(t, e) {
  t[0] != null && t[0] != "" && e.push(`1s${De(t[0])}`),
    t[1] != null && t[1] != 0 && e.push(`2e${t[1]}`),
    t[2] != null && t[2] != 0 && e.push(`3i${t[2]}`),
    t[3] != null && t[3] != 0 && e.push(`4e${t[3]}`),
    t[4] != null && t[4] != "" && e.push(`5s${De(t[4])}`),
    t[5] != null && t[5] != 0 && e.push(`6e${t[5]}`),
    t[6] != null && t[6] != 0 && e.push(`7e${t[6]}`),
    t[7] && e.push("8b1"),
    t[8] != null && t[8] != "" && e.push(`9s${De(t[8])}`),
    t[9] != null && lt(10, ng, t[9], e),
    t[10] != null && lt(11, og, t[10], e),
    t[11] != null && lt(12, ag, t[11], e)
}
var Tt, Pl, Me = (Pl = class {
  constructor(e) {
    p(this, Tt, []);
    Array.isArray(e) ? g(this, Tt, e) : e && Object.assign(this, e)
  }
  get lat() {
    return i(this, Tt)[2] ?? 0
  }
  set lat(e) {
    i(this, Tt)[2] = e
  }
  get lng() {
    return i(this, Tt)[3] ?? 0
  }
  set lng(e) {
    i(this, Tt)[3] = e
  }
  toArray() {
    return i(this, Tt)
  }
  toObject() {
    return {
      lat: this.lat,
      lng: this.lng
    }
  }
  serialize(e) {
    i(this, Tt).length !== 0 && (i(this, Tt)[2] != null && e.writeDouble(3, this.lat),
      i(this, Tt)[3] != null && e.writeDouble(4, this.lng))
  }
}
  ,
  Tt = new WeakMap,
  Pl), jt, Tl, wn = (Tl = class {
    constructor(e) {
      p(this, jt, []);
      Array.isArray(e) ? g(this, jt, e) : e && Object.assign(this, e)
    }
    get type() {
      return i(this, jt)[0] ?? 0
    }
    set type(e) {
      i(this, jt)[0] = e
    }
    get id() {
      return i(this, jt)[1] ?? ""
    }
    set id(e) {
      i(this, jt)[1] = e
    }
    toArray() {
      return i(this, jt)
    }
    toObject() {
      return {
        type: this.type,
        id: this.id
      }
    }
    serialize(e) {
      i(this, jt).length !== 0 && (i(this, jt)[0] != null && e.writeInt32(1, this.type),
        i(this, jt)[1] != null && e.writeString(2, this.id))
    }
  }
    ,
    jt = new WeakMap,
    Tl), ut, jl, vn = (jl = class {
      constructor(e) {
        p(this, ut, []);
        Array.isArray(e) ? g(this, ut, e) : e && Object.assign(this, e)
      }
      get heading() {
        return i(this, ut)[0] ?? 0
      }
      set heading(e) {
        i(this, ut)[0] = e
      }
      get tilt() {
        return i(this, ut)[1] ?? 0
      }
      set tilt(e) {
        i(this, ut)[1] = e
      }
      get roll() {
        return i(this, ut)[2] ?? 0
      }
      set roll(e) {
        i(this, ut)[2] = e
      }
      toArray() {
        return i(this, ut)
      }
      toObject() {
        return {
          heading: this.heading,
          tilt: this.tilt,
          roll: this.roll
        }
      }
      serialize(e) {
        i(this, ut).length !== 0 && (i(this, ut)[0] != null && e.writeDouble(1, this.heading),
          i(this, ut)[1] != null && e.writeDouble(2, this.tilt),
          i(this, ut)[2] != null && e.writeDouble(3, this.roll))
      }
    }
      ,
      ut = new WeakMap,
      jl), Mt, Ml, An = (Ml = class {
        constructor(t) {
          p(this, Mt, []);
          Array.isArray(t) ? g(this, Mt, t) : t && Object.assign(this, t)
        }
        get position() {
          var t;
          return new Me((t = i(this, Mt))[0] ?? (t[0] = []))
        }
        set position(t) {
          i(this, Mt)[0] = t != null ? (t instanceof Me ? t : new Me(t)).toArray() : []
        }
        get pov() {
          var t;
          return new vn((t = i(this, Mt))[1] ?? (t[1] = []))
        }
        set pov(t) {
          i(this, Mt)[1] = t != null ? (t instanceof vn ? t : new vn(t)).toArray() : []
        }
        toArray() {
          return i(this, Mt)
        }
        toObject() {
          return {
            position: this.position.toObject(),
            pov: this.pov.toObject()
          }
        }
        serialize(t) {
          i(this, Mt).length !== 0 && (i(this, Mt)[0] != null && t.writeMessage(1, this.position, e => e.serialize(t)),
            i(this, Mt)[1] != null && t.writeMessage(2, this.pov, e => e.serialize(t)))
        }
      }
        ,
        Mt = new WeakMap,
        Ml), It, Il, On = (Il = class {
          constructor(t) {
            p(this, It, []);
            Array.isArray(t) ? g(this, It, t) : t && Object.assign(this, t)
          }
          get id() {
            var t;
            return new wn((t = i(this, It))[0] ?? (t[0] = []))
          }
          set id(t) {
            i(this, It)[0] = t != null ? (t instanceof wn ? t : new wn(t)).toArray() : []
          }
          get viewpoint() {
            var t;
            return new An((t = i(this, It))[2] ?? (t[2] = []))
          }
          set viewpoint(t) {
            i(this, It)[2] = t != null ? (t instanceof An ? t : new An(t)).toArray() : []
          }
          toArray() {
            return i(this, It)
          }
          toObject() {
            return {
              id: this.id.toObject(),
              viewpoint: this.viewpoint.toObject()
            }
          }
          serialize(t) {
            i(this, It).length !== 0 && (i(this, It)[0] != null && t.writeMessage(1, this.id, e => e.serialize(t)),
              i(this, It)[2] != null && t.writeMessage(3, this.viewpoint, e => e.serialize(t)))
          }
        }
          ,
          It = new WeakMap,
          Il), Ft, Fl, xn = (Fl = class {
            constructor(t) {
              p(this, Ft, []);
              Array.isArray(t) ? g(this, Ft, t) : t && Object.assign(this, t)
            }
            get pano() {
              var t;
              return new On((t = i(this, Ft))[0] ?? (t[0] = []))
            }
            set pano(t) {
              i(this, Ft)[0] = t != null ? (t instanceof On ? t : new On(t)).toArray() : []
            }
            get links() {
              return i(this, Ft)[1] ?? 0
            }
            set links(t) {
              i(this, Ft)[1] = (t ?? []).map(e => e)
            }
            toArray() {
              return i(this, Ft)
            }
            toObject() {
              return {
                pano: this.pano.toObject(),
                links: this.links
              }
            }
            serialize(t) {
              i(this, Ft).length !== 0 && (i(this, Ft)[0] != null && t.writeMessage(1, this.pano, e => e.serialize(t)),
                i(this, Ft)[1] != null && t.writeRepeatedInt32(2, this.links))
            }
          }
            ,
            Ft = new WeakMap,
            Fl), Rt, Rl, Sn = (Rl = class {
              constructor(t) {
                p(this, Rt, []);
                Array.isArray(t) ? g(this, Rt, t) : t && Object.assign(this, t)
              }
              get status() {
                return i(this, Rt)[0] ?? 0
              }
              set status(t) {
                i(this, Rt)[0] = t
              }
              get panoramas() {
                var t;
                return ((t = i(this, Rt))[1] ?? (t[1] = [])).map(e => new xn(e))
              }
              set panoramas(t) {
                i(this, Rt)[1] = (t ?? []).map(e => (e instanceof xn ? e : new xn(e)).toArray())
              }
              toArray() {
                return i(this, Rt)
              }
              toObject() {
                return {
                  status: this.status,
                  panoramas: (this.panoramas ?? []).map(t => t.toObject())
                }
              }
              serialize(t) {
                i(this, Rt).length !== 0 && (i(this, Rt)[0] != null && t.writeInt32(1, this.status),
                  i(this, Rt)[1] != null && t.writeRepeatedMessage(2, this.panoramas, e => e.serialize(t)))
              }
            }
              ,
              Rt = new WeakMap,
              Rl), Ut, Ul, _n = (Ul = class {
                constructor(t) {
                  p(this, Ut, []);
                  Array.isArray(t) ? g(this, Ut, t) : t && Object.assign(this, t)
                }
                get a() {
                  var t;
                  return new Me((t = i(this, Ut))[2] ?? (t[2] = []))
                }
                set a(t) {
                  i(this, Ut)[2] = t != null ? (t instanceof Me ? t : new Me(t)).toArray() : []
                }
                get b() {
                  var t;
                  return new Me((t = i(this, Ut))[3] ?? (t[3] = []))
                }
                set b(t) {
                  i(this, Ut)[3] = t != null ? (t instanceof Me ? t : new Me(t)).toArray() : []
                }
                toArray() {
                  return i(this, Ut)
                }
                toObject() {
                  return {
                    a: this.a.toObject(),
                    b: this.b.toObject()
                  }
                }
                serialize(t) {
                  i(this, Ut).length !== 0 && (i(this, Ut)[2] != null && t.writeMessage(3, this.a, e => e.serialize(t)),
                    i(this, Ut)[3] != null && t.writeMessage(4, this.b, e => e.serialize(t)))
                }
              }
                ,
                Ut = new WeakMap,
                Ul), Bt, Bl, En = (Bl = class {
                  constructor(t) {
                    p(this, Bt, []);
                    Array.isArray(t) ? g(this, Bt, t) : t && Object.assign(this, t)
                  }
                  get unknownId() {
                    return i(this, Bt)[0] ?? ""
                  }
                  set unknownId(t) {
                    i(this, Bt)[0] = t
                  }
                  get latLng() {
                    var t;
                    return new _n((t = i(this, Bt))[1] ?? (t[1] = []))
                  }
                  set latLng(t) {
                    i(this, Bt)[1] = t != null ? (t instanceof _n ? t : new _n(t)).toArray() : []
                  }
                  toArray() {
                    return i(this, Bt)
                  }
                  toObject() {
                    return {
                      unknownId: this.unknownId,
                      latLng: this.latLng.toObject()
                    }
                  }
                  serialize(t) {
                    i(this, Bt).length !== 0 && (i(this, Bt)[0] != null && t.writeString(1, this.unknownId),
                      i(this, Bt)[1] != null && t.writeMessage(2, this.latLng, e => e.serialize(t)))
                  }
                }
                  ,
                  Bt = new WeakMap,
                  Bl), dt, Nl, kn = (Nl = class {
                    constructor(t) {
                      p(this, dt, []);
                      Array.isArray(t) ? g(this, dt, t) : t && Object.assign(this, t)
                    }
                    get x() {
                      return i(this, dt)[0] ?? 0
                    }
                    set x(t) {
                      i(this, dt)[0] = t
                    }
                    get y() {
                      return i(this, dt)[1] ?? 0
                    }
                    set y(t) {
                      i(this, dt)[1] = t
                    }
                    get zoom() {
                      return i(this, dt)[2] ?? 0
                    }
                    set zoom(t) {
                      i(this, dt)[2] = t
                    }
                    toArray() {
                      return i(this, dt)
                    }
                    toObject() {
                      return {
                        x: this.x,
                        y: this.y,
                        zoom: this.zoom
                      }
                    }
                    serialize(t) {
                      i(this, dt).length !== 0 && (i(this, dt)[0] != null && t.writeInt32(1, this.x),
                        i(this, dt)[1] != null && t.writeInt32(2, this.y),
                        i(this, dt)[2] != null && t.writeInt32(3, this.zoom))
                    }
                  }
                    ,
                    dt = new WeakMap,
                    Nl);
function hg(t, e) {
  t[0] != null && t[0] != 0 && e.push(`1i${t[0]}`),
    t[1] != null && t[1] != 0 && e.push(`2i${t[1]}`),
    t[2] != null && t[2] != 0 && e.push(`3i${t[2]}`)
}
var Nt, Vl, cg = (Vl = class {
  constructor(t) {
    p(this, Nt, []);
    Array.isArray(t) ? g(this, Nt, t) : t && Object.assign(this, t)
  }
  get context() {
    var t;
    return new bn((t = i(this, Nt))[0] ?? (t[0] = []))
  }
  set context(t) {
    i(this, Nt)[0] = t != null ? (t instanceof bn ? t : new bn(t)).toArray() : []
  }
  get tile() {
    var t;
    return new kn((t = i(this, Nt))[5] ?? (t[5] = []))
  }
  set tile(t) {
    i(this, Nt)[5] = t != null ? (t instanceof kn ? t : new kn(t)).toArray() : []
  }
  toArray() {
    return i(this, Nt)
  }
  toObject() {
    return {
      context: this.context.toObject(),
      tile: this.tile.toObject()
    }
  }
  serialize(t) {
    i(this, Nt).length !== 0 && (i(this, Nt)[0] != null && t.writeMessage(1, this.context, e => e.serialize(t)),
      i(this, Nt)[5] != null && t.writeMessage(6, this.tile, e => e.serialize(t)))
  }
}
  ,
  Nt = new WeakMap,
  Vl);
function ug(t, e) {
  t[0] != null && lt(1, lg, t[0], e),
    t[5] != null && lt(6, hg, t[5], e)
}
function dg(t) {
  return Hr(ug, t.toArray())
}
var ft, ql, fg = (ql = class {
  constructor(t) {
    p(this, ft, []);
    Array.isArray(t) ? g(this, ft, t) : t && Object.assign(this, t)
  }
  get status() {
    return i(this, ft)[0] ?? 0
  }
  set status(t) {
    i(this, ft)[0] = t
  }
  get panoramas() {
    var t;
    return new Sn((t = i(this, ft))[1] ?? (t[1] = []))
  }
  set panoramas(t) {
    i(this, ft)[1] = t != null ? (t instanceof Sn ? t : new Sn(t)).toArray() : []
  }
  get unknown() {
    var t;
    return ((t = i(this, ft))[2] ?? (t[2] = [])).map(e => new En(e))
  }
  set unknown(t) {
    i(this, ft)[2] = (t ?? []).map(e => (e instanceof En ? e : new En(e)).toArray())
  }
  toArray() {
    return i(this, ft)
  }
  toObject() {
    return {
      status: this.status,
      panoramas: this.panoramas.toObject(),
      unknown: (this.unknown ?? []).map(t => t.toObject())
    }
  }
  serialize(t) {
    i(this, ft).length !== 0 && (i(this, ft)[0] != null && t.writeInt32(1, this.status),
      i(this, ft)[1] != null && t.writeMessage(2, this.panoramas, e => e.serialize(t)),
      i(this, ft)[2] != null && t.writeRepeatedMessage(3, this.unknown, e => e.serialize(t)))
  }
}
  ,
  ft = new WeakMap,
  ql), H, Hl, zn = (Hl = class {
    constructor(e) {
      p(this, H, []);
      Array.isArray(e) ? g(this, H, e) : e && Object.assign(this, e)
    }
    get frontend() {
      return i(this, H)[0] ?? 0
    }
    set frontend(e) {
      i(this, H)[0] = e
    }
    get tiled() {
      return i(this, H)[1] ?? !1
    }
    set tiled(e) {
      i(this, H)[1] = e
    }
    get imageFormat() {
      return i(this, H)[2] ?? 0
    }
    set imageFormat(e) {
      i(this, H)[2] = e
    }
    get tourFormat() {
      return i(this, H)[3] ?? 0
    }
    set tourFormat(e) {
      i(this, H)[3] = e
    }
    toArray() {
      return i(this, H)
    }
    toObject() {
      return {
        frontend: this.frontend,
        tiled: this.tiled,
        imageFormat: this.imageFormat,
        tourFormat: this.tourFormat
      }
    }
    serialize(e) {
      i(this, H).length !== 0 && (i(this, H)[0] != null && e.writeEnum(1, this.frontend),
        i(this, H)[1] != null && e.writeBool(2, this.tiled),
        i(this, H)[2] != null && e.writeEnum(3, this.imageFormat),
        i(this, H)[3] != null && e.writeEnum(4, this.tourFormat))
    }
  }
    ,
    H = new WeakMap,
    Hl);
function gg(t, e) {
  t[0] != null && t[0] != 0 && e.push(`1e${t[0]}`),
    t[1] && e.push("2b1"),
    t[2] != null && t[2] != 0 && e.push(`3e${t[2]}`),
    t[3] != null && t[3] != 0 && e.push(`4e${t[3]}`)
}
var gt, Kl, pg = (Kl = class {
  constructor(t) {
    p(this, gt, []);
    Array.isArray(t) ? g(this, gt, t) : t && Object.assign(this, t)
  }
  get strategies() {
    var t;
    return ((t = i(this, gt))[0] ?? (t[0] = [])).map(e => new zn(e))
  }
  set strategies(t) {
    i(this, gt)[0] = (t ?? []).map(e => (e instanceof zn ? e : new zn(e)).toArray())
  }
  get unknownBool() {
    return i(this, gt)[1] ?? !1
  }
  set unknownBool(t) {
    i(this, gt)[1] = t
  }
  get unknownBool2() {
    return i(this, gt)[3] ?? !1
  }
  set unknownBool2(t) {
    i(this, gt)[3] = t
  }
  toArray() {
    return i(this, gt)
  }
  toObject() {
    return {
      strategies: (this.strategies ?? []).map(t => t.toObject()),
      unknownBool: this.unknownBool,
      unknownBool2: this.unknownBool2
    }
  }
  serialize(t) {
    i(this, gt).length !== 0 && (i(this, gt)[0] != null && t.writeRepeatedMessage(1, this.strategies, e => e.serialize(t)),
      i(this, gt)[1] != null && t.writeBool(2, this.unknownBool),
      i(this, gt)[3] != null && t.writeBool(4, this.unknownBool2))
  }
}
  ,
  gt = new WeakMap,
  Kl);
function yg(t, e) {
  var s;
  (s = t[0]) == null || s.forEach(r => {
    lt(1, gg, r, e)
  }
  ),
    t[1] && e.push("2b1"),
    t[3] && e.push("4b1")
}
function mg(t) {
  return Hr(yg, t.toArray())
}
var Vt, Wl, bg = (Wl = class {
  constructor(t) {
    p(this, Vt, []);
    Array.isArray(t) ? g(this, Vt, t) : t && Object.assign(this, t)
  }
  get showUserContent() {
    return i(this, Vt)[0] ?? !1
  }
  set showUserContent(t) {
    i(this, Vt)[0] = t
  }
  get useDetailedLines() {
    return i(this, Vt)[1] ?? !1
  }
  set useDetailedLines(t) {
    i(this, Vt)[1] = t
  }
  toArray() {
    return i(this, Vt)
  }
  toObject() {
    return {
      showUserContent: this.showUserContent,
      useDetailedLines: this.useDetailedLines
    }
  }
  serialize(t) {
    i(this, Vt).length !== 0 && (i(this, Vt)[0] != null && t.writeBool(1, this.showUserContent),
      i(this, Vt)[1] != null && t.writeBool(2, this.useDetailedLines))
  }
}
  ,
  Vt = new WeakMap,
  Wl);
function wg(t, e) {
  t[0] && e.push("1b1"),
    t[1] && e.push("2b1")
}
function vg(t) {
  return Hr(wg, t.toArray())
}
var K, Gl, $n = (Gl = class {
  constructor(t) {
    p(this, K, []);
    Array.isArray(t) ? g(this, K, t) : t && Object.assign(this, t)
  }
  get zoom() {
    return i(this, K)[0] ?? 0
  }
  set zoom(t) {
    i(this, K)[0] = t
  }
  get x() {
    return i(this, K)[1] ?? 0
  }
  set x(t) {
    i(this, K)[1] = t
  }
  get y() {
    return i(this, K)[2] ?? 0
  }
  set y(t) {
    i(this, K)[2] = t
  }
  get size() {
    return i(this, K)[3] ?? 0
  }
  set size(t) {
    i(this, K)[3] = t
  }
  toArray() {
    return i(this, K)
  }
  toObject() {
    return {
      zoom: this.zoom,
      x: this.x,
      y: this.y,
      size: this.size
    }
  }
  serialize(t) {
    i(this, K).length !== 0 && (i(this, K)[0] != null && t.writeInt32(1, this.zoom),
      i(this, K)[1] != null && t.writeInt32(2, this.x),
      i(this, K)[2] != null && t.writeInt32(3, this.y),
      i(this, K)[3] != null && t.writeInt32(4, this.size))
  }
}
  ,
  K = new WeakMap,
  Gl);
function Ag(t, e) {
  t[0] != null && t[0] != 0 && e.push(`1i${t[0]}`),
    t[1] != null && t[1] != 0 && e.push(`2i${t[1]}`),
    t[2] != null && t[2] != 0 && e.push(`3i${t[2]}`),
    t[3] != null && t[3] != 0 && e.push(`4i${t[3]}`)
}
var Fe, Yl, Cn = (Yl = class {
  constructor(t) {
    p(this, Fe, []);
    Array.isArray(t) ? g(this, Fe, t) : t && Object.assign(this, t)
  }
  get tile() {
    var t;
    return new $n((t = i(this, Fe))[0] ?? (t[0] = []))
  }
  set tile(t) {
    i(this, Fe)[0] = t != null ? (t instanceof $n ? t : new $n(t)).toArray() : []
  }
  toArray() {
    return i(this, Fe)
  }
  toObject() {
    return {
      tile: this.tile.toObject()
    }
  }
  serialize(t) {
    i(this, Fe).length !== 0 && i(this, Fe)[0] != null && t.writeMessage(1, this.tile, e => e.serialize(t))
  }
}
  ,
  Fe = new WeakMap,
  Yl);
function Og(t, e) {
  t[0] != null && lt(1, Ag, t[0], e)
}
var Re, Zl, Dn = (Zl = class {
  constructor(t) {
    p(this, Re, []);
    Array.isArray(t) ? g(this, Re, t) : t && Object.assign(this, t)
  }
  get elements() {
    return i(this, Re)[2] ?? 0
  }
  set elements(t) {
    i(this, Re)[2] = (t ?? []).map(e => e)
  }
  toArray() {
    return i(this, Re)
  }
  toObject() {
    return {
      elements: this.elements
    }
  }
  serialize(t) {
    i(this, Re).length !== 0 && i(this, Re)[2] != null && t.writeRepeatedEnum(3, this.elements)
  }
}
  ,
  Re = new WeakMap,
  Zl);
function xg(t, e) {
  var s;
  (s = t[2]) == null || s.forEach(r => {
    e.push(`3e${r}`)
  }
  )
}
var fi, Jl, Ln = (Jl = class {
  constructor(t) {
    p(this, fi, []);
    Array.isArray(t) ? g(this, fi, t) : t && Object.assign(this, t)
  }
  toArray() {
    return i(this, fi)
  }
  toObject() {
    return {}
  }
  serialize(t) {
    i(this, fi).length
  }
}
  ,
  fi = new WeakMap,
  Jl);
function Sg(t, e) { }
var F, Ql, Pn = (Ql = class {
  constructor(t) {
    p(this, F, []);
    Array.isArray(t) ? g(this, F, t) : t && Object.assign(this, t)
  }
  get type() {
    return i(this, F)[0] ?? 0
  }
  set type(t) {
    i(this, F)[0] = t
  }
  get layerName() {
    return i(this, F)[1] ?? ""
  }
  set layerName(t) {
    i(this, F)[1] = t
  }
  get unknownField() {
    return i(this, F)[2] ?? 0
  }
  set unknownField(t) {
    i(this, F)[2] = t
  }
  get layerOptions() {
    var t;
    return ((t = i(this, F))[3] ?? (t[3] = [])).map(e => new Tn(e))
  }
  set layerOptions(t) {
    i(this, F)[3] = (t ?? []).map(e => (e instanceof Tn ? e : new Tn(e)).toArray())
  }
  get overlayLayer() {
    var t;
    return new Dn((t = i(this, F))[5] ?? (t[5] = []))
  }
  set overlayLayer(t) {
    i(this, F)[5] = t != null ? (t instanceof Dn ? t : new Dn(t)).toArray() : []
  }
  get darkLaunch() {
    var t;
    return new Ln((t = i(this, F))[10] ?? (t[10] = []))
  }
  set darkLaunch(t) {
    i(this, F)[10] = t != null ? (t instanceof Ln ? t : new Ln(t)).toArray() : []
  }
  toArray() {
    return i(this, F)
  }
  toObject() {
    return {
      type: this.type,
      layerName: this.layerName,
      unknownField: this.unknownField,
      layerOptions: (this.layerOptions ?? []).map(t => t.toObject()),
      overlayLayer: this.overlayLayer.toObject(),
      darkLaunch: this.darkLaunch.toObject()
    }
  }
  serialize(t) {
    i(this, F).length !== 0 && (i(this, F)[0] != null && t.writeEnum(1, this.type),
      i(this, F)[1] != null && t.writeString(2, this.layerName),
      i(this, F)[2] != null && t.writeInt32(3, this.unknownField),
      i(this, F)[3] != null && t.writeRepeatedMessage(4, this.layerOptions, e => e.serialize(t)),
      i(this, F)[5] != null && t.writeMessage(6, this.overlayLayer, e => e.serialize(t)),
      i(this, F)[10] != null && t.writeMessage(11, this.darkLaunch, e => e.serialize(t)))
  }
}
  ,
  F = new WeakMap,
  Ql);
function _g(t, e) {
  var s;
  t[0] != null && t[0] != 0 && e.push(`1e${t[0]}`),
    t[1] != null && t[1] != "" && e.push(`2s${De(t[1])}`),
    t[2] != null && t[2] != 0 && e.push(`3i${t[2]}`),
    (s = t[3]) == null || s.forEach(r => {
      lt(4, Eg, r, e)
    }
    ),
    t[5] != null && lt(6, xg, t[5], e),
    t[10] != null && lt(11, Sg, t[10], e)
}
var qt, Xl, Tn = (Xl = class {
  constructor(t) {
    p(this, qt, []);
    Array.isArray(t) ? g(this, qt, t) : t && Object.assign(this, t)
  }
  get key() {
    return i(this, qt)[0] ?? ""
  }
  set key(t) {
    i(this, qt)[0] = t
  }
  get value() {
    return i(this, qt)[1] ?? ""
  }
  set value(t) {
    i(this, qt)[1] = t
  }
  toArray() {
    return i(this, qt)
  }
  toObject() {
    return {
      key: this.key,
      value: this.value
    }
  }
  serialize(t) {
    i(this, qt).length !== 0 && (i(this, qt)[0] != null && t.writeString(1, this.key),
      i(this, qt)[1] != null && t.writeString(2, this.value))
  }
}
  ,
  qt = new WeakMap,
  Xl);
function Eg(t, e) {
  t[0] != null && t[0] != "" && e.push(`1s${De(t[0])}`),
    t[1] != null && t[1] != "" && e.push(`2s${De(t[1])}`)
}
var Ht, th, Os = (th = class {
  constructor(t) {
    p(this, Ht, []);
    Array.isArray(t) ? g(this, Ht, t) : t && Object.assign(this, t)
  }
  get type() {
    return i(this, Ht)[0] ?? 0
  }
  set type(t) {
    i(this, Ht)[0] = t
  }
  get params() {
    var t;
    return ((t = i(this, Ht))[1] ?? (t[1] = [])).map(e => new jn(e))
  }
  set params(t) {
    i(this, Ht)[1] = (t ?? []).map(e => (e instanceof jn ? e : new jn(e)).toArray())
  }
  toArray() {
    return i(this, Ht)
  }
  toObject() {
    return {
      type: this.type,
      params: (this.params ?? []).map(t => t.toObject())
    }
  }
  serialize(t) {
    i(this, Ht).length !== 0 && (i(this, Ht)[0] != null && t.writeEnum(1, this.type),
      i(this, Ht)[1] != null && t.writeRepeatedMessage(2, this.params, e => e.serialize(t)))
  }
}
  ,
  Ht = new WeakMap,
  th);
function kg(t, e) {
  var s;
  t[0] != null && t[0] != 0 && e.push(`1e${t[0]}`),
    (s = t[1]) == null || s.forEach(r => {
      lt(2, zg, r, e)
    }
    )
}
var Kt, eh, jn = (eh = class {
  constructor(t) {
    p(this, Kt, []);
    Array.isArray(t) ? g(this, Kt, t) : t && Object.assign(this, t)
  }
  get key() {
    return i(this, Kt)[0] ?? ""
  }
  set key(t) {
    i(this, Kt)[0] = t
  }
  get value() {
    return i(this, Kt)[1] ?? ""
  }
  set value(t) {
    i(this, Kt)[1] = t
  }
  toArray() {
    return i(this, Kt)
  }
  toObject() {
    return {
      key: this.key,
      value: this.value
    }
  }
  serialize(t) {
    i(this, Kt).length !== 0 && (i(this, Kt)[0] != null && t.writeString(1, this.key),
      i(this, Kt)[1] != null && t.writeString(2, this.value))
  }
}
  ,
  Kt = new WeakMap,
  eh);
function zg(t, e) {
  t[0] != null && t[0] != "" && e.push(`1s${De(t[0])}`),
    t[1] != null && t[1] != "" && e.push(`2s${De(t[1])}`)
}
var U, sh, Mn = (sh = class {
  constructor(t) {
    p(this, U, []);
    Array.isArray(t) ? g(this, U, t) : t && Object.assign(this, t)
  }
  get language() {
    return i(this, U)[1] ?? ""
  }
  set language(t) {
    i(this, U)[1] = t
  }
  get region() {
    return i(this, U)[2] ?? ""
  }
  set region(t) {
    i(this, U)[2] = t
  }
  get unknown() {
    return i(this, U)[3] ?? 0
  }
  set unknown(t) {
    i(this, U)[3] = t
  }
  get hybridOverlay() {
    return i(this, U)[4] ?? 0
  }
  set hybridOverlay(t) {
    i(this, U)[4] = t
  }
  get styles() {
    var t;
    return ((t = i(this, U))[11] ?? (t[11] = [])).map(e => new Os(e))
  }
  set styles(t) {
    i(this, U)[11] = (t ?? []).map(e => (e instanceof Os ? e : new Os(e)).toArray())
  }
  toArray() {
    return i(this, U)
  }
  toObject() {
    return {
      language: this.language,
      region: this.region,
      unknown: this.unknown,
      hybridOverlay: this.hybridOverlay,
      styles: (this.styles ?? []).map(t => t.toObject())
    }
  }
  serialize(t) {
    i(this, U).length !== 0 && (i(this, U)[1] != null && t.writeString(2, this.language),
      i(this, U)[2] != null && t.writeString(3, this.region),
      i(this, U)[3] != null && t.writeInt32(4, this.unknown),
      i(this, U)[4] != null && t.writeEnum(5, this.hybridOverlay),
      i(this, U)[11] != null && t.writeRepeatedMessage(12, this.styles, e => e.serialize(t)))
  }
}
  ,
  U = new WeakMap,
  sh);
function $g(t, e) {
  var s;
  t[1] != null && t[1] != "" && e.push(`2s${De(t[1])}`),
    t[2] != null && t[2] != "" && e.push(`3s${De(t[2])}`),
    t[3] != null && t[3] != 0 && e.push(`4i${t[3]}`),
    t[4] != null && t[4] != 0 && e.push(`5e${t[4]}`),
    (s = t[11]) == null || s.forEach(r => {
      lt(12, kg, r, e)
    }
    )
}
var pt, ih, In = (ih = class {
  constructor(t) {
    p(this, pt, []);
    Array.isArray(t) ? g(this, pt, t) : t && Object.assign(this, t)
  }
  get rasterType() {
    return i(this, pt)[0] ?? 0
  }
  set rasterType(t) {
    i(this, pt)[0] = t
  }
  get scale() {
    return i(this, pt)[4] ?? 0
  }
  set scale(t) {
    i(this, pt)[4] = t
  }
  get unknown() {
    return i(this, pt)[5] ?? !1
  }
  set unknown(t) {
    i(this, pt)[5] = t
  }
  toArray() {
    return i(this, pt)
  }
  toObject() {
    return {
      rasterType: this.rasterType,
      scale: this.scale,
      unknown: this.unknown
    }
  }
  serialize(t) {
    i(this, pt).length !== 0 && (i(this, pt)[0] != null && t.writeEnum(1, this.rasterType),
      i(this, pt)[4] != null && t.writeFloat(5, this.scale),
      i(this, pt)[5] != null && t.writeBool(6, this.unknown))
  }
}
  ,
  pt = new WeakMap,
  ih);
function Cg(t, e) {
  t[0] != null && t[0] != 0 && e.push(`1e${t[0]}`),
    t[4] != null && t[4] != 0 && e.push(`5f${t[4]}`),
    t[5] && e.push("6b1")
}
var k, rh, ul = (rh = class {
  constructor(t) {
    p(this, k, []);
    Array.isArray(t) ? g(this, k, t) : t && Object.assign(this, t)
  }
  get query() {
    var t;
    return new Cn((t = i(this, k))[0] ?? (t[0] = []))
  }
  set query(t) {
    i(this, k)[0] = t != null ? (t instanceof Cn ? t : new Cn(t)).toArray() : []
  }
  get layers() {
    var t;
    return ((t = i(this, k))[1] ?? (t[1] = [])).map(e => new Pn(e))
  }
  set layers(t) {
    i(this, k)[1] = (t ?? []).map(e => (e instanceof Pn ? e : new Pn(e)).toArray())
  }
  get options() {
    var t;
    return new Mn((t = i(this, k))[2] ?? (t[2] = []))
  }
  set options(t) {
    i(this, k)[2] = t != null ? (t instanceof Mn ? t : new Mn(t)).toArray() : []
  }
  get outputFormat() {
    return i(this, k)[3] ?? 0
  }
  set outputFormat(t) {
    i(this, k)[3] = t
  }
  get renderOptions() {
    var t;
    return new In((t = i(this, k))[4] ?? (t[4] = []))
  }
  set renderOptions(t) {
    i(this, k)[4] = t != null ? (t instanceof In ? t : new In(t)).toArray() : []
  }
  get heading() {
    return i(this, k)[12] ?? 0
  }
  set heading(t) {
    i(this, k)[12] = t
  }
  get tiltEnabled() {
    return i(this, k)[13] ?? !1
  }
  set tiltEnabled(t) {
    i(this, k)[13] = t
  }
  get paintExperimentIds() {
    return i(this, k)[22] ?? 0
  }
  set paintExperimentIds(t) {
    i(this, k)[22] = (t ?? []).map(e => e)
  }
  get mapFeatures() {
    return i(this, k)[25] ?? 0
  }
  set mapFeatures(t) {
    i(this, k)[25] = (t ?? []).map(e => e)
  }
  get majorEpoch() {
    return i(this, k)[27] ?? 0
  }
  set majorEpoch(t) {
    i(this, k)[27] = t
  }
  toArray() {
    return i(this, k)
  }
  toObject() {
    return {
      query: this.query.toObject(),
      layers: (this.layers ?? []).map(t => t.toObject()),
      options: this.options.toObject(),
      outputFormat: this.outputFormat,
      renderOptions: this.renderOptions.toObject(),
      heading: this.heading,
      tiltEnabled: this.tiltEnabled,
      paintExperimentIds: this.paintExperimentIds,
      mapFeatures: this.mapFeatures,
      majorEpoch: this.majorEpoch
    }
  }
  serialize(t) {
    i(this, k).length !== 0 && (i(this, k)[0] != null && t.writeMessage(1, this.query, e => e.serialize(t)),
      i(this, k)[1] != null && t.writeRepeatedMessage(2, this.layers, e => e.serialize(t)),
      i(this, k)[2] != null && t.writeMessage(3, this.options, e => e.serialize(t)),
      i(this, k)[3] != null && t.writeInt32(4, this.outputFormat),
      i(this, k)[4] != null && t.writeMessage(5, this.renderOptions, e => e.serialize(t)),
      i(this, k)[12] != null && t.writeFloat(13, this.heading),
      i(this, k)[13] != null && t.writeBool(14, this.tiltEnabled),
      i(this, k)[22] != null && t.writeRepeatedInt32(23, this.paintExperimentIds),
      i(this, k)[25] != null && t.writeRepeatedInt32(26, this.mapFeatures),
      i(this, k)[27] != null && t.writeInt32(28, this.majorEpoch))
  }
}
  ,
  k = new WeakMap,
  rh);
function Dg(t, e) {
  var s, r, n;
  t[0] != null && lt(1, Og, t[0], e),
    (s = t[1]) == null || s.forEach(o => {
      lt(2, _g, o, e)
    }
    ),
    t[2] != null && lt(3, $g, t[2], e),
    t[3] != null && t[3] != 0 && e.push(`4i${t[3]}`),
    t[4] != null && lt(5, Cg, t[4], e),
    t[12] != null && t[12] != 0 && e.push(`13f${t[12]}`),
    t[13] && e.push("14b1"),
    (r = t[22]) == null || r.forEach(o => {
      e.push(`23i${o}`)
    }
    ),
    (n = t[25]) == null || n.forEach(o => {
      e.push(`26i${o}`)
    }
    ),
    t[27] != null && t[27] != 0 && e.push(`28i${t[27]}`)
}
function Lg(t) {
  return Hr(Dg, t.toArray())
}
var ma = {}
  , Kr = {}
  , Es = {};
Object.defineProperty(Es, "__esModule", {
  value: !0
});
Es.hasBuffer = Es.alphabet = void 0;
Es.alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
Es.hasBuffer = typeof Buffer == "function" && typeof Buffer.from == "function";
Object.defineProperty(Kr, "__esModule", {
  value: !0
});
Kr.createFromBase64 = void 0;
const Pg = Es
  , Fn = "="
  , Tg = (t = Pg.alphabet, e = !1) => {
    if (t.length !== 64)
      throw new Error("chars must be 64 characters long");
    let s = 0;
    for (let n = 0; n < t.length; n++)
      s = Math.max(s, t.charCodeAt(n));
    const r = [];
    for (let n = 0; n <= s; n += 1)
      r[n] = -1;
    for (let n = 0; n < t.length; n++)
      r[t.charCodeAt(n)] = n;
    return n => {
      if (!n)
        return new Uint8Array(0);
      let o = n.length;
      if (e) {
        const f = o % 4;
        f === 2 ? (n += "==",
          o += 2) : f === 3 && (n += "=",
            o += 1)
      }
      if (o % 4 !== 0)
        throw new Error("Base64 string length must be a multiple of 4");
      const a = n[o - 1] !== Fn ? o : o - 4;
      let l = (o >> 2) * 3
        , h = 0;
      n[o - 2] === Fn ? (h = 2,
        l -= 2) : n[o - 1] === Fn && (h = 1,
          l -= 1);
      const u = new Uint8Array(l);
      let c = 0
        , d = 0;
      for (; d < a; d += 4) {
        const f = r[n.charCodeAt(d)]
          , y = r[n.charCodeAt(d + 1)]
          , b = r[n.charCodeAt(d + 2)]
          , w = r[n.charCodeAt(d + 3)];
        if (f < 0 || y < 0 || b < 0 || w < 0)
          throw new Error("INVALID_BASE64_STRING");
        u[c] = f << 2 | y >> 4,
          u[c + 1] = y << 4 | b >> 2,
          u[c + 2] = b << 6 | w,
          c += 3
      }
      if (h === 2) {
        const f = r[n.charCodeAt(a)]
          , y = r[n.charCodeAt(a + 1)];
        if (f < 0 || y < 0)
          throw new Error("INVALID_BASE64_STRING");
        u[c] = f << 2 | y >> 4
      } else if (h === 1) {
        const f = r[n.charCodeAt(a)]
          , y = r[n.charCodeAt(a + 1)]
          , b = r[n.charCodeAt(a + 2)];
        if (f < 0 || y < 0 || b < 0)
          throw new Error("INVALID_BASE64_STRING");
        u[c] = f << 2 | y >> 4,
          u[c + 1] = y << 4 | b >> 2
      }
      return u
    }
  }
  ;
Kr.createFromBase64 = Tg;
Object.defineProperty(ma, "__esModule", {
  value: !0
});
var hu = ma.fromBase64Url = void 0;
const jg = Kr;
hu = ma.fromBase64Url = (0,
  jg.createFromBase64)("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", !0);
var ba = {}
  , Wr = {}
  , Gr = {};
Object.defineProperty(Gr, "__esModule", {
  value: !0
});
Gr.flatstr = void 0;
const Mg = t => t;
Gr.flatstr = Mg;
Object.defineProperty(Wr, "__esModule", {
  value: !0
});
Wr.createToBase64 = void 0;
const dl = Gr
  , Ig = Es
  , Fg = (t = Ig.alphabet, e = "=") => {
    if (t.length !== 64)
      throw new Error("chars must be 64 characters long");
    const s = t.split("")
      , r = [];
    for (const a of s)
      for (const l of s) {
        const h = (0,
          dl.flatstr)(a + l);
        r.push(h)
      }
    const n = e
      , o = (0,
        dl.flatstr)(e + e);
    return (a, l) => {
      let h = "";
      const u = l % 3
        , c = l - u;
      for (let d = 0; d < c; d += 3) {
        const f = a[d]
          , y = a[d + 1]
          , b = a[d + 2]
          , w = f << 4 | y >> 4
          , v = (y & 15) << 8 | b;
        h += r[w] + r[v]
      }
      if (!u)
        return h;
      if (u === 1) {
        const d = a[c];
        h += r[d << 4] + o
      } else {
        const d = a[c]
          , f = a[c + 1]
          , y = d << 4 | f >> 4
          , b = (f & 15) << 2;
        h += r[y] + s[b] + n
      }
      return h
    }
  }
  ;
Wr.createToBase64 = Fg;
Object.defineProperty(ba, "__esModule", {
  value: !0
});
var cu = ba.toBase64Url = void 0;
const Rg = Wr;
cu = ba.toBase64Url = (0,
  Rg.createToBase64)("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", "");
const qo = 65536 * 65536
  , fl = 1 / qo
  , Ug = 12
  , gl = typeof TextDecoder > "u" ? null : new TextDecoder("utf-8")
  , Rn = 0
  , Or = 1
  , Bi = 2
  , xr = 5;
class uu {
  constructor(e = new Uint8Array(16)) {
    this.buf = ArrayBuffer.isView(e) ? e : new Uint8Array(e),
      this.dataView = new DataView(this.buf.buffer),
      this.pos = 0,
      this.type = 0,
      this.length = this.buf.length
  }
  readFields(e, s, r = this.length) {
    for (; this.pos < r;) {
      const n = this.readVarint()
        , o = n >> 3
        , a = this.pos;
      this.type = n & 7,
        e(o, s, this),
        this.pos === a && this.skip(n)
    }
    return s
  }
  readMessage(e, s) {
    return this.readFields(e, s, this.readVarint() + this.pos)
  }
  readFixed32() {
    const e = this.dataView.getUint32(this.pos, !0);
    return this.pos += 4,
      e
  }
  readSFixed32() {
    const e = this.dataView.getInt32(this.pos, !0);
    return this.pos += 4,
      e
  }
  readFixed64() {
    const e = this.dataView.getUint32(this.pos, !0) + this.dataView.getUint32(this.pos + 4, !0) * qo;
    return this.pos += 8,
      e
  }
  readSFixed64() {
    const e = this.dataView.getUint32(this.pos, !0) + this.dataView.getInt32(this.pos + 4, !0) * qo;
    return this.pos += 8,
      e
  }
  readFloat() {
    const e = this.dataView.getFloat32(this.pos, !0);
    return this.pos += 4,
      e
  }
  readDouble() {
    const e = this.dataView.getFloat64(this.pos, !0);
    return this.pos += 8,
      e
  }
  readVarint(e) {
    const s = this.buf;
    let r, n;
    return n = s[this.pos++],
      r = n & 127,
      n < 128 || (n = s[this.pos++],
        r |= (n & 127) << 7,
        n < 128) || (n = s[this.pos++],
          r |= (n & 127) << 14,
          n < 128) || (n = s[this.pos++],
            r |= (n & 127) << 21,
            n < 128) ? r : (n = s[this.pos],
              r |= (n & 15) << 28,
              Bg(r, e, this))
  }
  readVarint64() {
    return this.readVarint(!0)
  }
  readSVarint() {
    const e = this.readVarint();
    return e % 2 === 1 ? (e + 1) / -2 : e / 2
  }
  readBoolean() {
    return !!this.readVarint()
  }
  readString() {
    const e = this.readVarint() + this.pos
      , s = this.pos;
    return this.pos = e,
      e - s >= Ug && gl ? gl.decode(this.buf.subarray(s, e)) : tp(this.buf, s, e)
  }
  readBytes() {
    const e = this.readVarint() + this.pos
      , s = this.buf.subarray(this.pos, e);
    return this.pos = e,
      s
  }
  readPackedVarint(e = [], s) {
    const r = this.readPackedEnd();
    for (; this.pos < r;)
      e.push(this.readVarint(s));
    return e
  }
  readPackedSVarint(e = []) {
    const s = this.readPackedEnd();
    for (; this.pos < s;)
      e.push(this.readSVarint());
    return e
  }
  readPackedBoolean(e = []) {
    const s = this.readPackedEnd();
    for (; this.pos < s;)
      e.push(this.readBoolean());
    return e
  }
  readPackedFloat(e = []) {
    const s = this.readPackedEnd();
    for (; this.pos < s;)
      e.push(this.readFloat());
    return e
  }
  readPackedDouble(e = []) {
    const s = this.readPackedEnd();
    for (; this.pos < s;)
      e.push(this.readDouble());
    return e
  }
  readPackedFixed32(e = []) {
    const s = this.readPackedEnd();
    for (; this.pos < s;)
      e.push(this.readFixed32());
    return e
  }
  readPackedSFixed32(e = []) {
    const s = this.readPackedEnd();
    for (; this.pos < s;)
      e.push(this.readSFixed32());
    return e
  }
  readPackedFixed64(e = []) {
    const s = this.readPackedEnd();
    for (; this.pos < s;)
      e.push(this.readFixed64());
    return e
  }
  readPackedSFixed64(e = []) {
    const s = this.readPackedEnd();
    for (; this.pos < s;)
      e.push(this.readSFixed64());
    return e
  }
  readPackedEnd() {
    return this.type === Bi ? this.readVarint() + this.pos : this.pos + 1
  }
  skip(e) {
    const s = e & 7;
    if (s === Rn)
      for (; this.buf[this.pos++] > 127;)
        ;
    else if (s === Bi)
      this.pos = this.readVarint() + this.pos;
    else if (s === xr)
      this.pos += 4;
    else if (s === Or)
      this.pos += 8;
    else
      throw new Error(`Unimplemented type: ${s}`)
  }
  writeTag(e, s) {
    this.writeVarint(e << 3 | s)
  }
  realloc(e) {
    let s = this.length || 16;
    for (; s < this.pos + e;)
      s *= 2;
    if (s !== this.length) {
      const r = new Uint8Array(s);
      r.set(this.buf),
        this.buf = r,
        this.dataView = new DataView(r.buffer),
        this.length = s
    }
  }
  finish() {
    return this.length = this.pos,
      this.pos = 0,
      this.buf.subarray(0, this.length)
  }
  writeFixed32(e) {
    this.realloc(4),
      this.dataView.setInt32(this.pos, e, !0),
      this.pos += 4
  }
  writeSFixed32(e) {
    this.realloc(4),
      this.dataView.setInt32(this.pos, e, !0),
      this.pos += 4
  }
  writeFixed64(e) {
    this.realloc(8),
      this.dataView.setInt32(this.pos, e & -1, !0),
      this.dataView.setInt32(this.pos + 4, Math.floor(e * fl), !0),
      this.pos += 8
  }
  writeSFixed64(e) {
    this.realloc(8),
      this.dataView.setInt32(this.pos, e & -1, !0),
      this.dataView.setInt32(this.pos + 4, Math.floor(e * fl), !0),
      this.pos += 8
  }
  writeVarint(e) {
    if (e = +e || 0,
      e > 268435455 || e < 0) {
      Ng(e, this);
      return
    }
    this.realloc(4),
      this.buf[this.pos++] = e & 127 | (e > 127 ? 128 : 0),
      !(e <= 127) && (this.buf[this.pos++] = (e >>>= 7) & 127 | (e > 127 ? 128 : 0),
        !(e <= 127) && (this.buf[this.pos++] = (e >>>= 7) & 127 | (e > 127 ? 128 : 0),
          !(e <= 127) && (this.buf[this.pos++] = e >>> 7 & 127)))
  }
  writeSVarint(e) {
    this.writeVarint(e < 0 ? -e * 2 - 1 : e * 2)
  }
  writeBoolean(e) {
    this.writeVarint(+e)
  }
  writeString(e) {
    e = String(e),
      this.realloc(e.length * 4),
      this.pos++;
    const s = this.pos;
    this.pos = ep(this.buf, e, this.pos);
    const r = this.pos - s;
    r >= 128 && pl(s, r, this),
      this.pos = s - 1,
      this.writeVarint(r),
      this.pos += r
  }
  writeFloat(e) {
    this.realloc(4),
      this.dataView.setFloat32(this.pos, e, !0),
      this.pos += 4
  }
  writeDouble(e) {
    this.realloc(8),
      this.dataView.setFloat64(this.pos, e, !0),
      this.pos += 8
  }
  writeBytes(e) {
    const s = e.length;
    this.writeVarint(s),
      this.realloc(s);
    for (let r = 0; r < s; r++)
      this.buf[this.pos++] = e[r]
  }
  writeRawMessage(e, s) {
    this.pos++;
    const r = this.pos;
    e(s, this);
    const n = this.pos - r;
    n >= 128 && pl(r, n, this),
      this.pos = r - 1,
      this.writeVarint(n),
      this.pos += n
  }
  writeMessage(e, s, r) {
    this.writeTag(e, Bi),
      this.writeRawMessage(s, r)
  }
  writePackedVarint(e, s) {
    s.length && this.writeMessage(e, Hg, s)
  }
  writePackedSVarint(e, s) {
    s.length && this.writeMessage(e, Kg, s)
  }
  writePackedBoolean(e, s) {
    s.length && this.writeMessage(e, Yg, s)
  }
  writePackedFloat(e, s) {
    s.length && this.writeMessage(e, Wg, s)
  }
  writePackedDouble(e, s) {
    s.length && this.writeMessage(e, Gg, s)
  }
  writePackedFixed32(e, s) {
    s.length && this.writeMessage(e, Zg, s)
  }
  writePackedSFixed32(e, s) {
    s.length && this.writeMessage(e, Jg, s)
  }
  writePackedFixed64(e, s) {
    s.length && this.writeMessage(e, Qg, s)
  }
  writePackedSFixed64(e, s) {
    s.length && this.writeMessage(e, Xg, s)
  }
  writeBytesField(e, s) {
    this.writeTag(e, Bi),
      this.writeBytes(s)
  }
  writeFixed32Field(e, s) {
    this.writeTag(e, xr),
      this.writeFixed32(s)
  }
  writeSFixed32Field(e, s) {
    this.writeTag(e, xr),
      this.writeSFixed32(s)
  }
  writeFixed64Field(e, s) {
    this.writeTag(e, Or),
      this.writeFixed64(s)
  }
  writeSFixed64Field(e, s) {
    this.writeTag(e, Or),
      this.writeSFixed64(s)
  }
  writeVarintField(e, s) {
    this.writeTag(e, Rn),
      this.writeVarint(s)
  }
  writeSVarintField(e, s) {
    this.writeTag(e, Rn),
      this.writeSVarint(s)
  }
  writeStringField(e, s) {
    this.writeTag(e, Bi),
      this.writeString(s)
  }
  writeFloatField(e, s) {
    this.writeTag(e, xr),
      this.writeFloat(s)
  }
  writeDoubleField(e, s) {
    this.writeTag(e, Or),
      this.writeDouble(s)
  }
  writeBooleanField(e, s) {
    this.writeVarintField(e, +s)
  }
}
function Bg(t, e, s) {
  const r = s.buf;
  let n, o;
  if (o = r[s.pos++],
    n = (o & 112) >> 4,
    o < 128 || (o = r[s.pos++],
      n |= (o & 127) << 3,
      o < 128) || (o = r[s.pos++],
        n |= (o & 127) << 10,
        o < 128) || (o = r[s.pos++],
          n |= (o & 127) << 17,
          o < 128) || (o = r[s.pos++],
            n |= (o & 127) << 24,
            o < 128) || (o = r[s.pos++],
              n |= (o & 1) << 31,
              o < 128))
    return Ts(t, n, e);
  throw new Error("Expected varint not more than 10 bytes")
}
function Ts(t, e, s) {
  return s ? e * 4294967296 + (t >>> 0) : (e >>> 0) * 4294967296 + (t >>> 0)
}
function Ng(t, e) {
  let s, r;
  if (t >= 0 ? (s = t % 4294967296 | 0,
    r = t / 4294967296 | 0) : (s = ~(-t % 4294967296),
      r = ~(-t / 4294967296),
      s ^ 4294967295 ? s = s + 1 | 0 : (s = 0,
        r = r + 1 | 0)),
    t >= 18446744073709552e3 || t < -18446744073709552e3)
    throw new Error("Given varint doesn't fit into 10 bytes");
  e.realloc(10),
    Vg(s, r, e),
    qg(r, e)
}
function Vg(t, e, s) {
  s.buf[s.pos++] = t & 127 | 128,
    t >>>= 7,
    s.buf[s.pos++] = t & 127 | 128,
    t >>>= 7,
    s.buf[s.pos++] = t & 127 | 128,
    t >>>= 7,
    s.buf[s.pos++] = t & 127 | 128,
    t >>>= 7,
    s.buf[s.pos] = t & 127
}
function qg(t, e) {
  const s = (t & 7) << 4;
  e.buf[e.pos++] |= s | ((t >>>= 3) ? 128 : 0),
    t && (e.buf[e.pos++] = t & 127 | ((t >>>= 7) ? 128 : 0),
      t && (e.buf[e.pos++] = t & 127 | ((t >>>= 7) ? 128 : 0),
        t && (e.buf[e.pos++] = t & 127 | ((t >>>= 7) ? 128 : 0),
          t && (e.buf[e.pos++] = t & 127 | ((t >>>= 7) ? 128 : 0),
            t && (e.buf[e.pos++] = t & 127)))))
}
function pl(t, e, s) {
  const r = e <= 16383 ? 1 : e <= 2097151 ? 2 : e <= 268435455 ? 3 : Math.floor(Math.log(e) / (Math.LN2 * 7));
  s.realloc(r);
  for (let n = s.pos - 1; n >= t; n--)
    s.buf[n + r] = s.buf[n]
}
function Hg(t, e) {
  for (let s = 0; s < t.length; s++)
    e.writeVarint(t[s])
}
function Kg(t, e) {
  for (let s = 0; s < t.length; s++)
    e.writeSVarint(t[s])
}
function Wg(t, e) {
  for (let s = 0; s < t.length; s++)
    e.writeFloat(t[s])
}
function Gg(t, e) {
  for (let s = 0; s < t.length; s++)
    e.writeDouble(t[s])
}
function Yg(t, e) {
  for (let s = 0; s < t.length; s++)
    e.writeBoolean(t[s])
}
function Zg(t, e) {
  for (let s = 0; s < t.length; s++)
    e.writeFixed32(t[s])
}
function Jg(t, e) {
  for (let s = 0; s < t.length; s++)
    e.writeSFixed32(t[s])
}
function Qg(t, e) {
  for (let s = 0; s < t.length; s++)
    e.writeFixed64(t[s])
}
function Xg(t, e) {
  for (let s = 0; s < t.length; s++)
    e.writeSFixed64(t[s])
}
function tp(t, e, s) {
  let r = ""
    , n = e;
  for (; n < s;) {
    const o = t[n];
    let a = null
      , l = o > 239 ? 4 : o > 223 ? 3 : o > 191 ? 2 : 1;
    if (n + l > s)
      break;
    let h, u, c;
    l === 1 ? o < 128 && (a = o) : l === 2 ? (h = t[n + 1],
      (h & 192) === 128 && (a = (o & 31) << 6 | h & 63,
        a <= 127 && (a = null))) : l === 3 ? (h = t[n + 1],
          u = t[n + 2],
          (h & 192) === 128 && (u & 192) === 128 && (a = (o & 15) << 12 | (h & 63) << 6 | u & 63,
            (a <= 2047 || a >= 55296 && a <= 57343) && (a = null))) : l === 4 && (h = t[n + 1],
              u = t[n + 2],
              c = t[n + 3],
              (h & 192) === 128 && (u & 192) === 128 && (c & 192) === 128 && (a = (o & 15) << 18 | (h & 63) << 12 | (u & 63) << 6 | c & 63,
                (a <= 65535 || a >= 1114112) && (a = null))),
      a === null ? (a = 65533,
        l = 1) : a > 65535 && (a -= 65536,
          r += String.fromCharCode(a >>> 10 & 1023 | 55296),
          a = 56320 | a & 1023),
      r += String.fromCharCode(a),
      n += l
  }
  return r
}
function ep(t, e, s) {
  for (let r = 0, n, o; r < e.length; r++) {
    if (n = e.charCodeAt(r),
      n > 55295 && n < 57344)
      if (o)
        if (n < 56320) {
          t[s++] = 239,
            t[s++] = 191,
            t[s++] = 189,
            o = n;
          continue
        } else
          n = o - 55296 << 10 | n - 56320 | 65536,
            o = null;
      else {
        n > 56319 || r + 1 === e.length ? (t[s++] = 239,
          t[s++] = 191,
          t[s++] = 189) : o = n;
        continue
      }
    else
      o && (t[s++] = 239,
        t[s++] = 191,
        t[s++] = 189,
        o = null);
    n < 128 ? t[s++] = n : (n < 2048 ? t[s++] = n >> 6 | 192 : (n < 65536 ? t[s++] = n >> 12 | 224 : (t[s++] = n >> 18 | 240,
      t[s++] = n >> 12 & 63 | 128),
      t[s++] = n >> 6 & 63 | 128),
      t[s++] = n & 63 | 128)
  }
  return s
}
var sp = function () {
  function t(s, r) {
    if (typeof s != "function")
      throw new TypeError("DataLoader must be constructed with a function which accepts " + ("Array<key> and returns Promise<Array<value>>, but got: " + s + "."));
    this._batchLoadFn = s,
      this._maxBatchSize = op(r),
      this._batchScheduleFn = ap(r),
      this._cacheKeyFn = lp(r),
      this._cacheMap = hp(r),
      this._batch = null,
      this.name = cp(r)
  }
  var e = t.prototype;
  return e.load = function (r) {
    if (r == null)
      throw new TypeError("The loader.load() function must be called with a value, " + ("but got: " + String(r) + "."));
    var n = rp(this)
      , o = this._cacheMap
      , a = this._cacheKeyFn(r);
    if (o) {
      var l = o.get(a);
      if (l) {
        var h = n.cacheHits || (n.cacheHits = []);
        return new Promise(function (c) {
          h.push(function () {
            c(l)
          })
        }
        )
      }
    }
    n.keys.push(r);
    var u = new Promise(function (c, d) {
      n.callbacks.push({
        resolve: c,
        reject: d
      })
    }
    );
    return o && o.set(a, u),
      u
  }
    ,
    e.loadMany = function (r) {
      if (!du(r))
        throw new TypeError("The loader.loadMany() function must be called with Array<key> " + ("but got: " + r + "."));
      for (var n = [], o = 0; o < r.length; o++)
        n.push(this.load(r[o]).catch(function (a) {
          return a
        }));
      return Promise.all(n)
    }
    ,
    e.clear = function (r) {
      var n = this._cacheMap;
      if (n) {
        var o = this._cacheKeyFn(r);
        n.delete(o)
      }
      return this
    }
    ,
    e.clearAll = function () {
      var r = this._cacheMap;
      return r && r.clear(),
        this
    }
    ,
    e.prime = function (r, n) {
      var o = this._cacheMap;
      if (o) {
        var a = this._cacheKeyFn(r);
        if (o.get(a) === void 0) {
          var l;
          n instanceof Error ? (l = Promise.reject(n),
            l.catch(function () { })) : l = Promise.resolve(n),
            o.set(a, l)
        }
      }
      return this
    }
    ,
    t
}(), ip = typeof process == "object" && typeof process.nextTick == "function" ? function (t) {
  Un || (Un = Promise.resolve()),
    Un.then(function () {
      process.nextTick(t)
    })
}
  : typeof setImmediate == "function" ? function (t) {
    setImmediate(t)
  }
    : function (t) {
      setTimeout(t)
    }
  , Un;
function rp(t) {
  var e = t._batch;
  if (e !== null && !e.hasDispatched && e.keys.length < t._maxBatchSize)
    return e;
  var s = {
    hasDispatched: !1,
    keys: [],
    callbacks: []
  };
  return t._batch = s,
    t._batchScheduleFn(function () {
      np(t, s)
    }),
    s
}
function np(t, e) {
  if (e.hasDispatched = !0,
    e.keys.length === 0) {
    Ho(e);
    return
  }
  var s;
  try {
    s = t._batchLoadFn(e.keys)
  } catch (r) {
    return Bn(t, e, new TypeError("DataLoader must be constructed with a function which accepts Array<key> and returns Promise<Array<value>>, but the function " + ("errored synchronously: " + String(r) + ".")))
  }
  if (!s || typeof s.then != "function")
    return Bn(t, e, new TypeError("DataLoader must be constructed with a function which accepts Array<key> and returns Promise<Array<value>>, but the function did " + ("not return a Promise: " + String(s) + ".")));
  s.then(function (r) {
    if (!du(r))
      throw new TypeError("DataLoader must be constructed with a function which accepts Array<key> and returns Promise<Array<value>>, but the function did " + ("not return a Promise of an Array: " + String(r) + "."));
    if (r.length !== e.keys.length)
      throw new TypeError("DataLoader must be constructed with a function which accepts Array<key> and returns Promise<Array<value>>, but the function did not return a Promise of an Array of the same length as the Array of keys." + (`

Keys:
` + String(e.keys)) + (`

Values:
` + String(r)));
    Ho(e);
    for (var n = 0; n < e.callbacks.length; n++) {
      var o = r[n];
      o instanceof Error ? e.callbacks[n].reject(o) : e.callbacks[n].resolve(o)
    }
  }).catch(function (r) {
    Bn(t, e, r)
  })
}
function Bn(t, e, s) {
  Ho(e);
  for (var r = 0; r < e.keys.length; r++)
    t.clear(e.keys[r]),
      e.callbacks[r].reject(s)
}
function Ho(t) {
  if (t.cacheHits)
    for (var e = 0; e < t.cacheHits.length; e++)
      t.cacheHits[e]()
}
function op(t) {
  var e = !t || t.batch !== !1;
  if (!e)
    return 1;
  var s = t && t.maxBatchSize;
  if (s === void 0)
    return 1 / 0;
  if (typeof s != "number" || s < 1)
    throw new TypeError("maxBatchSize must be a positive number: " + s);
  return s
}
function ap(t) {
  var e = t && t.batchScheduleFn;
  if (e === void 0)
    return ip;
  if (typeof e != "function")
    throw new TypeError("batchScheduleFn must be a function: " + e);
  return e
}
function lp(t) {
  var e = t && t.cacheKeyFn;
  if (e === void 0)
    return function (s) {
      return s
    }
      ;
  if (typeof e != "function")
    throw new TypeError("cacheKeyFn must be a function: " + e);
  return e
}
function hp(t) {
  var e = !t || t.cache !== !1;
  if (!e)
    return null;
  var s = t && t.cacheMap;
  if (s === void 0)
    return new Map;
  if (s !== null) {
    var r = ["get", "set", "delete", "clear"]
      , n = r.filter(function (o) {
        return s && typeof s[o] != "function"
      });
    if (n.length !== 0)
      throw new TypeError("Custom cacheMap missing methods: " + n.join(", "))
  }
  return s
}
function cp(t) {
  return t && t.name ? t.name : null
}
function du(t) {
  return typeof t == "object" && t !== null && typeof t.length == "number" && (t.length === 0 || t.length > 0 && Object.prototype.hasOwnProperty.call(t, t.length - 1))
}
var up = sp;
const dp = Yu(up);
var rs = (t => (t[t.NULL = 0] = "NULL",
  t[t.OFFICIAL = 2] = "OFFICIAL",
  t[t.USER_PHOTO = 3] = "USER_PHOTO",
  t[t.USER_PHOTO_2 = 8] = "USER_PHOTO_2",
  t[t.USER_UPLOADED = 10] = "USER_UPLOADED",
  t))(rs || {}), Dr = (t => (t[t.NULL = 0] = "NULL",
    t[t.UNKNOWN1 = 1] = "UNKNOWN1",
    t[t.PHOTOSPHERE = 2] = "PHOTOSPHERE",
    t[t.PHOTO = 3] = "PHOTO",
    t[t.VIDEO = 4] = "VIDEO",
    t))(Dr || {}), Ko = (t => (t[t.NULL = 0] = "NULL",
      t[t.BEST = 1] = "BEST",
      t[t.CLOSEST = 2] = "CLOSEST",
      t))(Ko || {}), Ae = (t => (t[t.NULL = 0] = "NULL",
        t[t.IncludeTileData = 1] = "IncludeTileData",
        t[t.IncludeDescription = 2] = "IncludeDescription",
        t[t.IncludeCopyright = 3] = "IncludeCopyright",
        t[t.D = 4] = "D",
        t[t.E = 5] = "E",
        t[t.IncludeLinkedPanoramas = 6] = "IncludeLinkedPanoramas",
        t[t.G = 7] = "G",
        t[t.AddressControl = 8] = "AddressControl",
        t[t.I = 9] = "I",
        t[t.J = 10] = "J",
        t[t.K = 11] = "K",
        t[t.L = 12] = "L",
        t[t.M = 13] = "M",
        t))(Ae || {}), Wt, nh, Ns = (nh = class {
          constructor(t) {
            p(this, Wt, []);
            Array.isArray(t) ? g(this, Wt, t) : t && Object.assign(this, t)
          }
          get cellId() {
            return i(this, Wt)[0] ?? 0
          }
          set cellId(t) {
            i(this, Wt)[0] = t
          }
          get fprint() {
            return i(this, Wt)[1] ?? 0
          }
          set fprint(t) {
            i(this, Wt)[1] = t
          }
          toArray() {
            return i(this, Wt)
          }
          toObject() {
            return {
              cellId: this.cellId,
              fprint: this.fprint
            }
          }
          serialize(t) {
            i(this, Wt).length !== 0 && (i(this, Wt)[0] != null && t.writeFixed64(1, this.cellId),
              i(this, Wt)[1] != null && t.writeFixed64(2, this.fprint))
          }
        }
          ,
          Wt = new WeakMap,
          nh), W, oh, Vs = (oh = class {
            constructor(t) {
              p(this, W, []);
              Array.isArray(t) ? g(this, W, t) : t && Object.assign(this, t)
            }
            get featureId() {
              var t;
              return new Ns((t = i(this, W))[0] ?? (t[0] = []))
            }
            set featureId(t) {
              i(this, W)[0] = t != null ? (t instanceof Ns ? t : new Ns(t)).toArray() : []
            }
            get knowledgeGraphId() {
              return i(this, W)[1] ?? ""
            }
            set knowledgeGraphId(t) {
              i(this, W)[1] = t
            }
            get clusterDocId() {
              return i(this, W)[2] ?? 0
            }
            set clusterDocId(t) {
              i(this, W)[2] = t
            }
            get panoSelectionSignal() {
              return i(this, W)[3] ?? 0
            }
            set panoSelectionSignal(t) {
              i(this, W)[3] = t
            }
            toArray() {
              return i(this, W)
            }
            toObject() {
              return {
                featureId: this.featureId.toObject(),
                knowledgeGraphId: this.knowledgeGraphId,
                clusterDocId: this.clusterDocId,
                panoSelectionSignal: this.panoSelectionSignal
              }
            }
            serialize(t) {
              i(this, W).length !== 0 && (i(this, W)[0] != null && t.writeMessage(1, this.featureId, e => e.serialize(t)),
                i(this, W)[1] != null && t.writeString(2, this.knowledgeGraphId),
                i(this, W)[2] != null && t.writeUint64(3, this.clusterDocId),
                i(this, W)[3] != null && t.writeEnum(4, this.panoSelectionSignal))
            }
          }
            ,
            W = new WeakMap,
            oh), gi, ah, Nn = (ah = class {
              constructor(t) {
                p(this, gi, []);
                Array.isArray(t) ? g(this, gi, t) : t && Object.assign(this, t)
              }
              toArray() {
                return i(this, gi)
              }
              toObject() {
                return {}
              }
              serialize(t) {
                i(this, gi).length
              }
            }
              ,
              gi = new WeakMap,
              ah), pi, lh, Vn = (lh = class {
                constructor(t) {
                  p(this, pi, []);
                  Array.isArray(t) ? g(this, pi, t) : t && Object.assign(this, t)
                }
                toArray() {
                  return i(this, pi)
                }
                toObject() {
                  return {}
                }
                serialize(t) {
                  i(this, pi).length
                }
              }
                ,
                pi = new WeakMap,
                lh), yi, hh, qn = (hh = class {
                  constructor(t) {
                    p(this, yi, []);
                    Array.isArray(t) ? g(this, yi, t) : t && Object.assign(this, t)
                  }
                  toArray() {
                    return i(this, yi)
                  }
                  toObject() {
                    return {}
                  }
                  serialize(t) {
                    i(this, yi).length
                  }
                }
                  ,
                  yi = new WeakMap,
                  hh), x, ch, qs = (ch = class {
                    constructor(t) {
                      p(this, x, []);
                      Array.isArray(t) ? g(this, x, t) : t && Object.assign(this, t)
                    }
                    get client() {
                      return i(this, x)[0] ?? ""
                    }
                    set client(t) {
                      i(this, x)[0] = t
                    }
                    get source() {
                      return i(this, x)[1] ?? 0
                    }
                    set source(t) {
                      i(this, x)[1] = t
                    }
                    get clientId() {
                      return i(this, x)[2] ?? 0
                    }
                    set clientId(t) {
                      i(this, x)[2] = t
                    }
                    get cacheBehavior() {
                      return i(this, x)[3] ?? 0
                    }
                    set cacheBehavior(t) {
                      i(this, x)[3] = t
                    }
                    get language() {
                      return i(this, x)[4] ?? ""
                    }
                    set language(t) {
                      i(this, x)[4] = t
                    }
                    get gpsDebugLevel() {
                      return i(this, x)[5] ?? 0
                    }
                    set gpsDebugLevel(t) {
                      i(this, x)[5] = t
                    }
                    get httpResponseFormat() {
                      return i(this, x)[6] ?? 0
                    }
                    set httpResponseFormat(t) {
                      i(this, x)[6] = t
                    }
                    get inlineExtraDataSpec() {
                      return i(this, x)[7] ?? !1
                    }
                    set inlineExtraDataSpec(t) {
                      i(this, x)[7] = t
                    }
                    get queryOrigin() {
                      return i(this, x)[8] ?? ""
                    }
                    set queryOrigin(t) {
                      i(this, x)[8] = t
                    }
                    get superrootParams() {
                      var t;
                      return new Nn((t = i(this, x))[9] ?? (t[9] = []))
                    }
                    set superrootParams(t) {
                      i(this, x)[9] = t != null ? (t instanceof Nn ? t : new Nn(t)).toArray() : []
                    }
                    get productSpecialCaseOptions() {
                      var t;
                      return new Vn((t = i(this, x))[10] ?? (t[10] = []))
                    }
                    set productSpecialCaseOptions(t) {
                      i(this, x)[10] = t != null ? (t instanceof Vn ? t : new Vn(t)).toArray() : []
                    }
                    get experimentalOptions() {
                      var t;
                      return new qn((t = i(this, x))[11] ?? (t[11] = []))
                    }
                    set experimentalOptions(t) {
                      i(this, x)[11] = t != null ? (t instanceof qn ? t : new qn(t)).toArray() : []
                    }
                    toArray() {
                      return i(this, x)
                    }
                    toObject() {
                      return {
                        client: this.client,
                        source: this.source,
                        clientId: this.clientId,
                        cacheBehavior: this.cacheBehavior,
                        language: this.language,
                        gpsDebugLevel: this.gpsDebugLevel,
                        httpResponseFormat: this.httpResponseFormat,
                        inlineExtraDataSpec: this.inlineExtraDataSpec,
                        queryOrigin: this.queryOrigin,
                        superrootParams: this.superrootParams.toObject(),
                        productSpecialCaseOptions: this.productSpecialCaseOptions.toObject(),
                        experimentalOptions: this.experimentalOptions.toObject()
                      }
                    }
                    serialize(t) {
                      i(this, x).length !== 0 && (i(this, x)[0] != null && t.writeString(1, this.client),
                        i(this, x)[1] != null && t.writeEnum(2, this.source),
                        i(this, x)[2] != null && t.writeInt32(3, this.clientId),
                        i(this, x)[3] != null && t.writeEnum(4, this.cacheBehavior),
                        i(this, x)[4] != null && t.writeString(5, this.language),
                        i(this, x)[5] != null && t.writeEnum(6, this.gpsDebugLevel),
                        i(this, x)[6] != null && t.writeEnum(7, this.httpResponseFormat),
                        i(this, x)[7] != null && t.writeBool(8, this.inlineExtraDataSpec),
                        i(this, x)[8] != null && t.writeString(9, this.queryOrigin),
                        i(this, x)[9] != null && t.writeMessage(10, this.superrootParams, e => e.serialize(t)),
                        i(this, x)[10] != null && t.writeMessage(11, this.productSpecialCaseOptions, e => e.serialize(t)),
                        i(this, x)[11] != null && t.writeMessage(12, this.experimentalOptions, e => e.serialize(t)))
                    }
                  }
                    ,
                    x = new WeakMap,
                    ch), Gt, uh, ns = (uh = class {
                      constructor(t) {
                        p(this, Gt, []);
                        Array.isArray(t) ? g(this, Gt, t) : t && Object.assign(this, t)
                      }
                      get language() {
                        return i(this, Gt)[0] ?? ""
                      }
                      set language(t) {
                        i(this, Gt)[0] = t
                      }
                      get regionCode() {
                        return i(this, Gt)[1] ?? ""
                      }
                      set regionCode(t) {
                        i(this, Gt)[1] = t
                      }
                      toArray() {
                        return i(this, Gt)
                      }
                      toObject() {
                        return {
                          language: this.language,
                          regionCode: this.regionCode
                        }
                      }
                      serialize(t) {
                        i(this, Gt).length !== 0 && (i(this, Gt)[0] != null && t.writeString(1, this.language),
                          i(this, Gt)[1] != null && t.writeString(2, this.regionCode))
                      }
                    }
                      ,
                      Gt = new WeakMap,
                      uh), yt, dh, Hs = (dh = class {
                        constructor(t) {
                          p(this, yt, []);
                          Array.isArray(t) ? g(this, yt, t) : t && Object.assign(this, t)
                        }
                        get code() {
                          return i(this, yt)[0] ?? 0
                        }
                        set code(t) {
                          i(this, yt)[0] = t
                        }
                        get errorCode() {
                          return i(this, yt)[1] ?? ""
                        }
                        set errorCode(t) {
                          i(this, yt)[1] = t
                        }
                        get errorMessage() {
                          return i(this, yt)[2] ?? ""
                        }
                        set errorMessage(t) {
                          i(this, yt)[2] = t
                        }
                        toArray() {
                          return i(this, yt)
                        }
                        toObject() {
                          return {
                            code: this.code,
                            errorCode: this.errorCode,
                            errorMessage: this.errorMessage
                          }
                        }
                        serialize(t) {
                          i(this, yt).length !== 0 && (i(this, yt)[0] != null && t.writeEnum(1, this.code),
                            i(this, yt)[1] != null && t.writeString(2, this.errorCode),
                            i(this, yt)[2] != null && t.writeString(3, this.errorMessage))
                        }
                      }
                        ,
                        yt = new WeakMap,
                        dh), Yt, fh, Ie = (fh = class {
                          constructor(t) {
                            p(this, Yt, []);
                            Array.isArray(t) ? g(this, Yt, t) : t && Object.assign(this, t)
                          }
                          get lat() {
                            return i(this, Yt)[2] ?? 0
                          }
                          set lat(t) {
                            i(this, Yt)[2] = t
                          }
                          get lng() {
                            return i(this, Yt)[3] ?? 0
                          }
                          set lng(t) {
                            i(this, Yt)[3] = t
                          }
                          toArray() {
                            return i(this, Yt)
                          }
                          toObject() {
                            return {
                              lat: this.lat,
                              lng: this.lng
                            }
                          }
                          serialize(t) {
                            i(this, Yt).length !== 0 && (i(this, Yt)[2] != null && t.writeDouble(3, this.lat),
                              i(this, Yt)[3] != null && t.writeDouble(4, this.lng))
                          }
                        }
                          ,
                          Yt = new WeakMap,
                          fh), Zt, gh, q = (gh = class {
                            constructor(t) {
                              p(this, Zt, []);
                              Array.isArray(t) ? g(this, Zt, t) : t && Object.assign(this, t)
                            }
                            get type() {
                              return i(this, Zt)[0] ?? 0
                            }
                            set type(t) {
                              i(this, Zt)[0] = t
                            }
                            get id() {
                              return i(this, Zt)[1] ?? ""
                            }
                            set id(t) {
                              i(this, Zt)[1] = t
                            }
                            toArray() {
                              return i(this, Zt)
                            }
                            toObject() {
                              return {
                                type: this.type,
                                id: this.id
                              }
                            }
                            serialize(t) {
                              i(this, Zt).length !== 0 && (i(this, Zt)[0] != null && t.writeInt32(1, this.type),
                                i(this, Zt)[1] != null && t.writeString(2, this.id))
                            }
                          }
                            ,
                            Zt = new WeakMap,
                            gh), mt, ph, Hn = (ph = class {
                              constructor(t) {
                                p(this, mt, []);
                                Array.isArray(t) ? g(this, mt, t) : t && Object.assign(this, t)
                              }
                              get heading() {
                                return i(this, mt)[0] ?? 0
                              }
                              set heading(t) {
                                i(this, mt)[0] = t
                              }
                              get tilt() {
                                return i(this, mt)[1] ?? 0
                              }
                              set tilt(t) {
                                i(this, mt)[1] = t
                              }
                              get roll() {
                                return i(this, mt)[2] ?? 0
                              }
                              set roll(t) {
                                i(this, mt)[2] = t
                              }
                              toArray() {
                                return i(this, mt)
                              }
                              toObject() {
                                return {
                                  heading: this.heading,
                                  tilt: this.tilt,
                                  roll: this.roll
                                }
                              }
                              serialize(t) {
                                i(this, mt).length !== 0 && (i(this, mt)[0] != null && t.writeDouble(1, this.heading),
                                  i(this, mt)[1] != null && t.writeDouble(2, this.tilt),
                                  i(this, mt)[2] != null && t.writeDouble(3, this.roll))
                              }
                            }
                              ,
                              mt = new WeakMap,
                              ph), G, yh, Kn = (yh = class {
                                constructor(t) {
                                  p(this, G, []);
                                  Array.isArray(t) ? g(this, G, t) : t && Object.assign(this, t)
                                }
                                get frontend() {
                                  return i(this, G)[0] ?? 0
                                }
                                set frontend(t) {
                                  i(this, G)[0] = t
                                }
                                get tiled() {
                                  return i(this, G)[1] ?? !1
                                }
                                set tiled(t) {
                                  i(this, G)[1] = t
                                }
                                get imageFormat() {
                                  return i(this, G)[2] ?? 0
                                }
                                set imageFormat(t) {
                                  i(this, G)[2] = t
                                }
                                get tourFormat() {
                                  return i(this, G)[3] ?? 0
                                }
                                set tourFormat(t) {
                                  i(this, G)[3] = t
                                }
                                toArray() {
                                  return i(this, G)
                                }
                                toObject() {
                                  return {
                                    frontend: this.frontend,
                                    tiled: this.tiled,
                                    imageFormat: this.imageFormat,
                                    tourFormat: this.tourFormat
                                  }
                                }
                                serialize(t) {
                                  i(this, G).length !== 0 && (i(this, G)[0] != null && t.writeEnum(1, this.frontend),
                                    i(this, G)[1] != null && t.writeBool(2, this.tiled),
                                    i(this, G)[2] != null && t.writeEnum(3, this.imageFormat),
                                    i(this, G)[3] != null && t.writeEnum(4, this.tourFormat))
                                }
                              }
                                ,
                                G = new WeakMap,
                                yh), Jt, mh, _t = (mh = class {
                                  constructor(t) {
                                    p(this, Jt, []);
                                    Array.isArray(t) ? g(this, Jt, t) : t && Object.assign(this, t)
                                  }
                                  get height() {
                                    return i(this, Jt)[0] ?? 0
                                  }
                                  set height(t) {
                                    i(this, Jt)[0] = t
                                  }
                                  get width() {
                                    return i(this, Jt)[1] ?? 0
                                  }
                                  set width(t) {
                                    i(this, Jt)[1] = t
                                  }
                                  toArray() {
                                    return i(this, Jt)
                                  }
                                  toObject() {
                                    return {
                                      height: this.height,
                                      width: this.width
                                    }
                                  }
                                  serialize(t) {
                                    i(this, Jt).length !== 0 && (i(this, Jt)[0] != null && t.writeInt32(1, this.height),
                                      i(this, Jt)[1] != null && t.writeInt32(2, this.width))
                                  }
                                }
                                  ,
                                  Jt = new WeakMap,
                                  mh), Qt, bh, Wn = (bh = class {
                                    constructor(t) {
                                      p(this, Qt, []);
                                      Array.isArray(t) ? g(this, Qt, t) : t && Object.assign(this, t)
                                    }
                                    get size() {
                                      var t;
                                      return ((t = i(this, Qt))[0] ?? (t[0] = [])).map(e => new _t(e))
                                    }
                                    set size(t) {
                                      i(this, Qt)[0] = (t ?? []).map(e => (e instanceof _t ? e : new _t(e)).toArray())
                                    }
                                    get tileSize() {
                                      var t;
                                      return new _t((t = i(this, Qt))[1] ?? (t[1] = []))
                                    }
                                    set tileSize(t) {
                                      i(this, Qt)[1] = t != null ? (t instanceof _t ? t : new _t(t)).toArray() : []
                                    }
                                    toArray() {
                                      return i(this, Qt)
                                    }
                                    toObject() {
                                      return {
                                        size: (this.size ?? []).map(t => t.toObject()),
                                        tileSize: this.tileSize.toObject()
                                      }
                                    }
                                    serialize(t) {
                                      i(this, Qt).length !== 0 && (i(this, Qt)[0] != null && t.writeRepeatedMessage(1, this.size, e => e.serialize(t)),
                                        i(this, Qt)[1] != null && t.writeMessage(2, this.tileSize, e => e.serialize(t)))
                                    }
                                  }
                                    ,
                                    Qt = new WeakMap,
                                    bh), B, wh, Gn = (wh = class {
                                      constructor(t) {
                                        p(this, B, []);
                                        Array.isArray(t) ? g(this, B, t) : t && Object.assign(this, t)
                                      }
                                      get imageType() {
                                        return i(this, B)[0] ?? 0
                                      }
                                      set imageType(t) {
                                        i(this, B)[0] = t
                                      }
                                      get imageFormat() {
                                        return i(this, B)[1] ?? 0
                                      }
                                      set imageFormat(t) {
                                        i(this, B)[1] = t
                                      }
                                      get worldSize() {
                                        var t;
                                        return new _t((t = i(this, B))[2] ?? (t[2] = []))
                                      }
                                      set worldSize(t) {
                                        i(this, B)[2] = t != null ? (t instanceof _t ? t : new _t(t)).toArray() : []
                                      }
                                      get tileSize() {
                                        var t;
                                        return new Wn((t = i(this, B))[3] ?? (t[3] = []))
                                      }
                                      set tileSize(t) {
                                        i(this, B)[3] = t != null ? (t instanceof Wn ? t : new Wn(t)).toArray() : []
                                      }
                                      get panoId() {
                                        return i(this, B)[9] ?? ""
                                      }
                                      set panoId(t) {
                                        i(this, B)[9] = t
                                      }
                                      toArray() {
                                        return i(this, B)
                                      }
                                      toObject() {
                                        return {
                                          imageType: this.imageType,
                                          imageFormat: this.imageFormat,
                                          worldSize: this.worldSize.toObject(),
                                          tileSize: this.tileSize.toObject(),
                                          panoId: this.panoId
                                        }
                                      }
                                      serialize(t) {
                                        i(this, B).length !== 0 && (i(this, B)[0] != null && t.writeEnum(1, this.imageType),
                                          i(this, B)[1] != null && t.writeEnum(2, this.imageFormat),
                                          i(this, B)[2] != null && t.writeMessage(3, this.worldSize, e => e.serialize(t)),
                                          i(this, B)[3] != null && t.writeMessage(4, this.tileSize, e => e.serialize(t)),
                                          i(this, B)[9] != null && t.writeString(10, this.panoId))
                                      }
                                    }
                                      ,
                                      B = new WeakMap,
                                      wh), Xt, vh, ge = (vh = class {
                                        constructor(t) {
                                          p(this, Xt, []);
                                          Array.isArray(t) ? g(this, Xt, t) : t && Object.assign(this, t)
                                        }
                                        get text() {
                                          return i(this, Xt)[0] ?? ""
                                        }
                                        set text(t) {
                                          i(this, Xt)[0] = t
                                        }
                                        get languageCode() {
                                          return i(this, Xt)[1] ?? ""
                                        }
                                        set languageCode(t) {
                                          i(this, Xt)[1] = t
                                        }
                                        toArray() {
                                          return i(this, Xt)
                                        }
                                        toObject() {
                                          return {
                                            text: this.text,
                                            languageCode: this.languageCode
                                          }
                                        }
                                        serialize(t) {
                                          i(this, Xt).length !== 0 && (i(this, Xt)[0] != null && t.writeString(1, this.text),
                                            i(this, Xt)[1] != null && t.writeString(2, this.languageCode))
                                        }
                                      }
                                        ,
                                        Xt = new WeakMap,
                                        vh), Ue, Ah, Ks = (Ah = class {
                                          constructor(t) {
                                            p(this, Ue, []);
                                            Array.isArray(t) ? g(this, Ue, t) : t && Object.assign(this, t)
                                          }
                                          get part() {
                                            var t;
                                            return ((t = i(this, Ue))[2] ?? (t[2] = [])).map(e => new ge(e))
                                          }
                                          set part(t) {
                                            i(this, Ue)[2] = (t ?? []).map(e => (e instanceof ge ? e : new ge(e)).toArray())
                                          }
                                          toArray() {
                                            return i(this, Ue)
                                          }
                                          toObject() {
                                            return {
                                              part: (this.part ?? []).map(t => t.toObject())
                                            }
                                          }
                                          serialize(t) {
                                            i(this, Ue).length !== 0 && i(this, Ue)[2] != null && t.writeRepeatedMessage(3, this.part, e => e.serialize(t))
                                          }
                                        }
                                          ,
                                          Ue = new WeakMap,
                                          Ah), Be, Oh, Yn = (Oh = class {
                                            constructor(t) {
                                              p(this, Be, []);
                                              Array.isArray(t) ? g(this, Be, t) : t && Object.assign(this, t)
                                            }
                                            get takedownUrl() {
                                              return i(this, Be)[0] ?? ""
                                            }
                                            set takedownUrl(t) {
                                              i(this, Be)[0] = t
                                            }
                                            toArray() {
                                              return i(this, Be)
                                            }
                                            toObject() {
                                              return {
                                                takedownUrl: this.takedownUrl
                                              }
                                            }
                                            serialize(t) {
                                              i(this, Be).length !== 0 && i(this, Be)[0] != null && t.writeString(1, this.takedownUrl)
                                            }
                                          }
                                            ,
                                            Be = new WeakMap,
                                            Oh), Y, xh, Ws = (xh = class {
                                              constructor(t) {
                                                p(this, Y, []);
                                                Array.isArray(t) ? g(this, Y, t) : t && Object.assign(this, t)
                                              }
                                              get position() {
                                                var t;
                                                return new Ie((t = i(this, Y))[0] ?? (t[0] = []))
                                              }
                                              set position(t) {
                                                i(this, Y)[0] = t != null ? (t instanceof Ie ? t : new Ie(t)).toArray() : []
                                              }
                                              get pov() {
                                                var t;
                                                return new Hn((t = i(this, Y))[2] ?? (t[2] = []))
                                              }
                                              set pov(t) {
                                                i(this, Y)[2] = t != null ? (t instanceof Hn ? t : new Hn(t)).toArray() : []
                                              }
                                              get levels() {
                                                var t;
                                                return new ni((t = i(this, Y))[3] ?? (t[3] = []))
                                              }
                                              set levels(t) {
                                                i(this, Y)[3] = t != null ? (t instanceof ni ? t : new ni(t)).toArray() : []
                                              }
                                              get countryCode() {
                                                return i(this, Y)[4] ?? ""
                                              }
                                              set countryCode(t) {
                                                i(this, Y)[4] = t
                                              }
                                              toArray() {
                                                return i(this, Y)
                                              }
                                              toObject() {
                                                return {
                                                  position: this.position.toObject(),
                                                  pov: this.pov.toObject(),
                                                  levels: this.levels.toObject(),
                                                  countryCode: this.countryCode
                                                }
                                              }
                                              serialize(t) {
                                                i(this, Y).length !== 0 && (i(this, Y)[0] != null && t.writeMessage(1, this.position, e => e.serialize(t)),
                                                  i(this, Y)[2] != null && t.writeMessage(3, this.pov, e => e.serialize(t)),
                                                  i(this, Y)[3] != null && t.writeMessage(4, this.levels, e => e.serialize(t)),
                                                  i(this, Y)[4] != null && t.writeString(5, this.countryCode))
                                              }
                                            }
                                              ,
                                              Y = new WeakMap,
                                              xh), bt, Sh, Zn = (Sh = class {
                                                constructor(t) {
                                                  p(this, bt, []);
                                                  Array.isArray(t) ? g(this, bt, t) : t && Object.assign(this, t)
                                                }
                                                get panoId() {
                                                  var t;
                                                  return new q((t = i(this, bt))[0] ?? (t[0] = []))
                                                }
                                                set panoId(t) {
                                                  i(this, bt)[0] = t != null ? (t instanceof q ? t : new q(t)).toArray() : []
                                                }
                                                get location() {
                                                  var t;
                                                  return new Ws((t = i(this, bt))[2] ?? (t[2] = []))
                                                }
                                                set location(t) {
                                                  i(this, bt)[2] = t != null ? (t instanceof Ws ? t : new Ws(t)).toArray() : []
                                                }
                                                get description() {
                                                  var t;
                                                  return new Ks((t = i(this, bt))[3] ?? (t[3] = []))
                                                }
                                                set description(t) {
                                                  i(this, bt)[3] = t != null ? (t instanceof Ks ? t : new Ks(t)).toArray() : []
                                                }
                                                toArray() {
                                                  return i(this, bt)
                                                }
                                                toObject() {
                                                  return {
                                                    panoId: this.panoId.toObject(),
                                                    location: this.location.toObject(),
                                                    description: this.description.toObject()
                                                  }
                                                }
                                                serialize(t) {
                                                  i(this, bt).length !== 0 && (i(this, bt)[0] != null && t.writeMessage(1, this.panoId, e => e.serialize(t)),
                                                    i(this, bt)[2] != null && t.writeMessage(3, this.location, e => e.serialize(t)),
                                                    i(this, bt)[3] != null && t.writeMessage(4, this.description, e => e.serialize(t)))
                                                }
                                              }
                                                ,
                                                bt = new WeakMap,
                                                Sh), te, _h, Jn = (_h = class {
                                                  constructor(t) {
                                                    p(this, te, []);
                                                    Array.isArray(t) ? g(this, te, t) : t && Object.assign(this, t)
                                                  }
                                                  get target() {
                                                    return i(this, te)[0] ?? 0
                                                  }
                                                  set target(t) {
                                                    i(this, te)[0] = t
                                                  }
                                                  get date() {
                                                    var t;
                                                    return new Ys((t = i(this, te))[1] ?? (t[1] = []))
                                                  }
                                                  set date(t) {
                                                    i(this, te)[1] = t != null ? (t instanceof Ys ? t : new Ys(t)).toArray() : []
                                                  }
                                                  toArray() {
                                                    return i(this, te)
                                                  }
                                                  toObject() {
                                                    return {
                                                      target: this.target,
                                                      date: this.date.toObject()
                                                    }
                                                  }
                                                  serialize(t) {
                                                    i(this, te).length !== 0 && (i(this, te)[0] != null && t.writeInt32(1, this.target),
                                                      i(this, te)[1] != null && t.writeMessage(2, this.date, e => e.serialize(t)))
                                                  }
                                                }
                                                  ,
                                                  te = new WeakMap,
                                                  _h), Ne, Eh, Qn = (Eh = class {
                                                    constructor(t) {
                                                      p(this, Ne, []);
                                                      Array.isArray(t) ? g(this, Ne, t) : t && Object.assign(this, t)
                                                    }
                                                    get panorama() {
                                                      var t;
                                                      return ((t = i(this, Ne))[0] ?? (t[0] = [])).map(e => new Zn(e))
                                                    }
                                                    set panorama(t) {
                                                      i(this, Ne)[0] = (t ?? []).map(e => (e instanceof Zn ? e : new Zn(e)).toArray())
                                                    }
                                                    toArray() {
                                                      return i(this, Ne)
                                                    }
                                                    toObject() {
                                                      return {
                                                        panorama: (this.panorama ?? []).map(t => t.toObject())
                                                      }
                                                    }
                                                    serialize(t) {
                                                      i(this, Ne).length !== 0 && i(this, Ne)[0] != null && t.writeRepeatedMessage(1, this.panorama, e => e.serialize(t))
                                                    }
                                                  }
                                                    ,
                                                    Ne = new WeakMap,
                                                    Eh), Ve, kh, Gs = (kh = class {
                                                      constructor(t) {
                                                        p(this, Ve, []);
                                                        Array.isArray(t) ? g(this, Ve, t) : t && Object.assign(this, t)
                                                      }
                                                      get code() {
                                                        return i(this, Ve)[0] ?? 0
                                                      }
                                                      set code(t) {
                                                        i(this, Ve)[0] = t
                                                      }
                                                      toArray() {
                                                        return i(this, Ve)
                                                      }
                                                      toObject() {
                                                        return {
                                                          code: this.code
                                                        }
                                                      }
                                                      serialize(t) {
                                                        i(this, Ve).length !== 0 && i(this, Ve)[0] != null && t.writeEnum(1, this.code)
                                                      }
                                                    }
                                                      ,
                                                      Ve = new WeakMap,
                                                      kh), wt, zh, Ys = (zh = class {
                                                        constructor(t) {
                                                          p(this, wt, []);
                                                          Array.isArray(t) ? g(this, wt, t) : t && Object.assign(this, t)
                                                        }
                                                        get year() {
                                                          return i(this, wt)[0] ?? 0
                                                        }
                                                        set year(t) {
                                                          i(this, wt)[0] = t
                                                        }
                                                        get month() {
                                                          return i(this, wt)[1] ?? 0
                                                        }
                                                        set month(t) {
                                                          i(this, wt)[1] = t
                                                        }
                                                        get day() {
                                                          return i(this, wt)[2] ?? 0
                                                        }
                                                        set day(t) {
                                                          i(this, wt)[2] = t
                                                        }
                                                        toArray() {
                                                          return i(this, wt)
                                                        }
                                                        toObject() {
                                                          return {
                                                            year: this.year,
                                                            month: this.month,
                                                            day: this.day
                                                          }
                                                        }
                                                        serialize(t) {
                                                          i(this, wt).length !== 0 && (i(this, wt)[0] != null && t.writeInt32(1, this.year),
                                                            i(this, wt)[1] != null && t.writeInt32(2, this.month),
                                                            i(this, wt)[2] != null && t.writeInt32(3, this.day))
                                                        }
                                                      }
                                                        ,
                                                        wt = new WeakMap,
                                                        zh), qe, $h, Xn = ($h = class {
                                                          constructor(t) {
                                                            p(this, qe, []);
                                                            Array.isArray(t) ? g(this, qe, t) : t && Object.assign(this, t)
                                                          }
                                                          get heading() {
                                                            return i(this, qe)[3] ?? 0
                                                          }
                                                          set heading(t) {
                                                            i(this, qe)[3] = t
                                                          }
                                                          toArray() {
                                                            return i(this, qe)
                                                          }
                                                          toObject() {
                                                            return {
                                                              heading: this.heading
                                                            }
                                                          }
                                                          serialize(t) {
                                                            i(this, qe).length !== 0 && i(this, qe)[3] != null && t.writeDouble(4, this.heading)
                                                          }
                                                        }
                                                          ,
                                                          qe = new WeakMap,
                                                          $h), ee, Ch, to = (Ch = class {
                                                            constructor(t) {
                                                              p(this, ee, []);
                                                              Array.isArray(t) ? g(this, ee, t) : t && Object.assign(this, t)
                                                            }
                                                            get target() {
                                                              return i(this, ee)[0] ?? 0
                                                            }
                                                            set target(t) {
                                                              i(this, ee)[0] = t
                                                            }
                                                            get properties() {
                                                              var t;
                                                              return new Xn((t = i(this, ee))[1] ?? (t[1] = []))
                                                            }
                                                            set properties(t) {
                                                              i(this, ee)[1] = t != null ? (t instanceof Xn ? t : new Xn(t)).toArray() : []
                                                            }
                                                            toArray() {
                                                              return i(this, ee)
                                                            }
                                                            toObject() {
                                                              return {
                                                                target: this.target,
                                                                properties: this.properties.toObject()
                                                              }
                                                            }
                                                            serialize(t) {
                                                              i(this, ee).length !== 0 && (i(this, ee)[0] != null && t.writeInt32(1, this.target),
                                                                i(this, ee)[1] != null && t.writeMessage(2, this.properties, e => e.serialize(t)))
                                                            }
                                                          }
                                                            ,
                                                            ee = new WeakMap,
                                                            Ch), He, Dh, eo = (Dh = class {
                                                              constructor(t) {
                                                                p(this, He, []);
                                                                Array.isArray(t) ? g(this, He, t) : t && Object.assign(this, t)
                                                              }
                                                              get target() {
                                                                return i(this, He)[0] ?? 0
                                                              }
                                                              set target(t) {
                                                                i(this, He)[0] = t
                                                              }
                                                              toArray() {
                                                                return i(this, He)
                                                              }
                                                              toObject() {
                                                                return {
                                                                  target: this.target
                                                                }
                                                              }
                                                              serialize(t) {
                                                                i(this, He).length !== 0 && i(this, He)[0] != null && t.writeInt32(1, this.target)
                                                              }
                                                            }
                                                              ,
                                                              He = new WeakMap,
                                                              Dh), vt, Lh, js = (Lh = class {
                                                                constructor(t) {
                                                                  p(this, vt, []);
                                                                  Array.isArray(t) ? g(this, vt, t) : t && Object.assign(this, t)
                                                                }
                                                                get size() {
                                                                  var t;
                                                                  return new _t((t = i(this, vt))[0] ?? (t[0] = []))
                                                                }
                                                                set size(t) {
                                                                  i(this, vt)[0] = t != null ? (t instanceof _t ? t : new _t(t)).toArray() : []
                                                                }
                                                                get unknown() {
                                                                  return i(this, vt)[1] ?? 0
                                                                }
                                                                set unknown(t) {
                                                                  i(this, vt)[1] = t
                                                                }
                                                                get data() {
                                                                  return i(this, vt)[2] ?? ""
                                                                }
                                                                set data(t) {
                                                                  i(this, vt)[2] = t
                                                                }
                                                                toArray() {
                                                                  return i(this, vt)
                                                                }
                                                                toObject() {
                                                                  return {
                                                                    size: this.size.toObject(),
                                                                    unknown: this.unknown,
                                                                    data: this.data
                                                                  }
                                                                }
                                                                serialize(t) {
                                                                  i(this, vt).length !== 0 && (i(this, vt)[0] != null && t.writeMessage(1, this.size, e => e.serialize(t)),
                                                                    i(this, vt)[1] != null && t.writeInt32(2, this.unknown),
                                                                    i(this, vt)[2] != null && t.writeString(3, this.data))
                                                                }
                                                              }
                                                                ,
                                                                vt = new WeakMap,
                                                                Lh), Z, Ph, so = (Ph = class {
                                                                  constructor(t) {
                                                                    p(this, Z, []);
                                                                    Array.isArray(t) ? g(this, Z, t) : t && Object.assign(this, t)
                                                                  }
                                                                  get cursorFormat() {
                                                                    var t;
                                                                    return new si((t = i(this, Z))[0] ?? (t[0] = []))
                                                                  }
                                                                  set cursorFormat(t) {
                                                                    i(this, Z)[0] = t != null ? (t instanceof si ? t : new si(t)).toArray() : []
                                                                  }
                                                                  get cursorOverlay() {
                                                                    var t;
                                                                    return new js((t = i(this, Z))[1] ?? (t[1] = []))
                                                                  }
                                                                  set cursorOverlay(t) {
                                                                    i(this, Z)[1] = t != null ? (t instanceof js ? t : new js(t)).toArray() : []
                                                                  }
                                                                  get targetFormat() {
                                                                    var t;
                                                                    return new ii((t = i(this, Z))[2] ?? (t[2] = []))
                                                                  }
                                                                  set targetFormat(t) {
                                                                    i(this, Z)[2] = t != null ? (t instanceof ii ? t : new ii(t)).toArray() : []
                                                                  }
                                                                  get targetOverlay() {
                                                                    var t;
                                                                    return new js((t = i(this, Z))[3] ?? (t[3] = []))
                                                                  }
                                                                  set targetOverlay(t) {
                                                                    i(this, Z)[3] = t != null ? (t instanceof js ? t : new js(t)).toArray() : []
                                                                  }
                                                                  toArray() {
                                                                    return i(this, Z)
                                                                  }
                                                                  toObject() {
                                                                    return {
                                                                      cursorFormat: this.cursorFormat.toObject(),
                                                                      cursorOverlay: this.cursorOverlay.toObject(),
                                                                      targetFormat: this.targetFormat.toObject(),
                                                                      targetOverlay: this.targetOverlay.toObject()
                                                                    }
                                                                  }
                                                                  serialize(t) {
                                                                    i(this, Z).length !== 0 && (i(this, Z)[0] != null && t.writeMessage(1, this.cursorFormat, e => e.serialize(t)),
                                                                      i(this, Z)[1] != null && t.writeMessage(2, this.cursorOverlay, e => e.serialize(t)),
                                                                      i(this, Z)[2] != null && t.writeMessage(3, this.targetFormat, e => e.serialize(t)),
                                                                      i(this, Z)[3] != null && t.writeMessage(4, this.targetOverlay, e => e.serialize(t)))
                                                                  }
                                                                }
                                                                  ,
                                                                  Z = new WeakMap,
                                                                  Ph), T, Th, io = (Th = class {
                                                                    constructor(t) {
                                                                      p(this, T, []);
                                                                      Array.isArray(t) ? g(this, T, t) : t && Object.assign(this, t)
                                                                    }
                                                                    get status() {
                                                                      var t;
                                                                      return new Gs((t = i(this, T))[0] ?? (t[0] = []))
                                                                    }
                                                                    set status(t) {
                                                                      i(this, T)[0] = t != null ? (t instanceof Gs ? t : new Gs(t)).toArray() : []
                                                                    }
                                                                    get location() {
                                                                      var t;
                                                                      return new Ws((t = i(this, T))[1] ?? (t[1] = []))
                                                                    }
                                                                    set location(t) {
                                                                      i(this, T)[1] = t != null ? (t instanceof Ws ? t : new Ws(t)).toArray() : []
                                                                    }
                                                                    get panoramaRefs() {
                                                                      var t;
                                                                      return new Qn((t = i(this, T))[3] ?? (t[3] = []))
                                                                    }
                                                                    set panoramaRefs(t) {
                                                                      i(this, T)[3] = t != null ? (t instanceof Qn ? t : new Qn(t)).toArray() : []
                                                                    }
                                                                    get overlays() {
                                                                      var t;
                                                                      return new so((t = i(this, T))[5] ?? (t[5] = []))
                                                                    }
                                                                    set overlays(t) {
                                                                      i(this, T)[5] = t != null ? (t instanceof so ? t : new so(t)).toArray() : []
                                                                    }
                                                                    get link() {
                                                                      var t;
                                                                      return ((t = i(this, T))[6] ?? (t[6] = [])).map(e => new to(e))
                                                                    }
                                                                    set link(t) {
                                                                      i(this, T)[6] = (t ?? []).map(e => (e instanceof to ? e : new to(e)).toArray())
                                                                    }
                                                                    get floors() {
                                                                      var t;
                                                                      return ((t = i(this, T))[7] ?? (t[7] = [])).map(e => new eo(e))
                                                                    }
                                                                    set floors(t) {
                                                                      i(this, T)[7] = (t ?? []).map(e => (e instanceof eo ? e : new eo(e)).toArray())
                                                                    }
                                                                    get time() {
                                                                      var t;
                                                                      return ((t = i(this, T))[8] ?? (t[8] = [])).map(e => new Jn(e))
                                                                    }
                                                                    set time(t) {
                                                                      i(this, T)[8] = (t ?? []).map(e => (e instanceof Jn ? e : new Jn(e)).toArray())
                                                                    }
                                                                    toArray() {
                                                                      return i(this, T)
                                                                    }
                                                                    toObject() {
                                                                      return {
                                                                        status: this.status.toObject(),
                                                                        location: this.location.toObject(),
                                                                        panoramaRefs: this.panoramaRefs.toObject(),
                                                                        overlays: this.overlays.toObject(),
                                                                        link: (this.link ?? []).map(t => t.toObject()),
                                                                        floors: (this.floors ?? []).map(t => t.toObject()),
                                                                        time: (this.time ?? []).map(t => t.toObject())
                                                                      }
                                                                    }
                                                                    serialize(t) {
                                                                      i(this, T).length !== 0 && (i(this, T)[0] != null && t.writeMessage(1, this.status, e => e.serialize(t)),
                                                                        i(this, T)[1] != null && t.writeMessage(2, this.location, e => e.serialize(t)),
                                                                        i(this, T)[3] != null && t.writeMessage(4, this.panoramaRefs, e => e.serialize(t)),
                                                                        i(this, T)[5] != null && t.writeMessage(6, this.overlays, e => e.serialize(t)),
                                                                        i(this, T)[6] != null && t.writeRepeatedMessage(7, this.link, e => e.serialize(t)),
                                                                        i(this, T)[7] != null && t.writeRepeatedMessage(8, this.floors, e => e.serialize(t)),
                                                                        i(this, T)[8] != null && t.writeRepeatedMessage(9, this.time, e => e.serialize(t)))
                                                                    }
                                                                  }
                                                                    ,
                                                                    T = new WeakMap,
                                                                    Th), Ke, jh, ro = (jh = class {
                                                                      constructor(t) {
                                                                        p(this, Ke, []);
                                                                        Array.isArray(t) ? g(this, Ke, t) : t && Object.assign(this, t)
                                                                      }
                                                                      get text() {
                                                                        return i(this, Ke)[0] ?? ""
                                                                      }
                                                                      set text(t) {
                                                                        i(this, Ke)[0] = t
                                                                      }
                                                                      toArray() {
                                                                        return i(this, Ke)
                                                                      }
                                                                      toObject() {
                                                                        return {
                                                                          text: this.text
                                                                        }
                                                                      }
                                                                      serialize(t) {
                                                                        i(this, Ke).length !== 0 && i(this, Ke)[0] != null && t.writeString(1, this.text)
                                                                      }
                                                                    }
                                                                      ,
                                                                      Ke = new WeakMap,
                                                                      jh), se, Mh, no = (Mh = class {
                                                                        constructor(t) {
                                                                          p(this, se, []);
                                                                          Array.isArray(t) ? g(this, se, t) : t && Object.assign(this, t)
                                                                        }
                                                                        get name() {
                                                                          var t;
                                                                          return new ro((t = i(this, se))[0] ?? (t[0] = []))
                                                                        }
                                                                        set name(t) {
                                                                          i(this, se)[0] = t != null ? (t instanceof ro ? t : new ro(t)).toArray() : []
                                                                        }
                                                                        get url() {
                                                                          return i(this, se)[1] ?? ""
                                                                        }
                                                                        set url(t) {
                                                                          i(this, se)[1] = t
                                                                        }
                                                                        toArray() {
                                                                          return i(this, se)
                                                                        }
                                                                        toObject() {
                                                                          return {
                                                                            name: this.name.toObject(),
                                                                            url: this.url
                                                                          }
                                                                        }
                                                                        serialize(t) {
                                                                          i(this, se).length !== 0 && (i(this, se)[0] != null && t.writeMessage(1, this.name, e => e.serialize(t)),
                                                                            i(this, se)[1] != null && t.writeString(2, this.url))
                                                                        }
                                                                      }
                                                                        ,
                                                                        se = new WeakMap,
                                                                        Mh), J, Ih, oo = (Ih = class {
                                                                          constructor(t) {
                                                                            p(this, J, []);
                                                                            Array.isArray(t) ? g(this, J, t) : t && Object.assign(this, t)
                                                                          }
                                                                          get name() {
                                                                            var t;
                                                                            return new ge((t = i(this, J))[0] ?? (t[0] = []))
                                                                          }
                                                                          set name(t) {
                                                                            i(this, J)[0] = t != null ? (t instanceof ge ? t : new ge(t)).toArray() : []
                                                                          }
                                                                          get profileUrl() {
                                                                            return i(this, J)[1] ?? ""
                                                                          }
                                                                          set profileUrl(t) {
                                                                            i(this, J)[1] = t
                                                                          }
                                                                          get imageUrl() {
                                                                            return i(this, J)[2] ?? ""
                                                                          }
                                                                          set imageUrl(t) {
                                                                            i(this, J)[2] = t
                                                                          }
                                                                          get profileId() {
                                                                            return i(this, J)[5] ?? ""
                                                                          }
                                                                          set profileId(t) {
                                                                            i(this, J)[5] = t
                                                                          }
                                                                          toArray() {
                                                                            return i(this, J)
                                                                          }
                                                                          toObject() {
                                                                            return {
                                                                              name: this.name.toObject(),
                                                                              profileUrl: this.profileUrl,
                                                                              imageUrl: this.imageUrl,
                                                                              profileId: this.profileId
                                                                            }
                                                                          }
                                                                          serialize(t) {
                                                                            i(this, J).length !== 0 && (i(this, J)[0] != null && t.writeMessage(1, this.name, e => e.serialize(t)),
                                                                              i(this, J)[1] != null && t.writeString(2, this.profileUrl),
                                                                              i(this, J)[2] != null && t.writeString(3, this.imageUrl),
                                                                              i(this, J)[5] != null && t.writeString(6, this.profileId))
                                                                          }
                                                                        }
                                                                          ,
                                                                          J = new WeakMap,
                                                                          Ih), ie, Fh, ao = (Fh = class {
                                                                            constructor(t) {
                                                                              p(this, ie, []);
                                                                              Array.isArray(t) ? g(this, ie, t) : t && Object.assign(this, t)
                                                                            }
                                                                            get item() {
                                                                              var t;
                                                                              return ((t = i(this, ie))[0] ?? (t[0] = [])).map(e => new no(e))
                                                                            }
                                                                            set item(t) {
                                                                              i(this, ie)[0] = (t ?? []).map(e => (e instanceof no ? e : new no(e)).toArray())
                                                                            }
                                                                            get author() {
                                                                              var t;
                                                                              return ((t = i(this, ie))[1] ?? (t[1] = [])).map(e => new oo(e))
                                                                            }
                                                                            set author(t) {
                                                                              i(this, ie)[1] = (t ?? []).map(e => (e instanceof oo ? e : new oo(e)).toArray())
                                                                            }
                                                                            toArray() {
                                                                              return i(this, ie)
                                                                            }
                                                                            toObject() {
                                                                              return {
                                                                                item: (this.item ?? []).map(t => t.toObject()),
                                                                                author: (this.author ?? []).map(t => t.toObject())
                                                                              }
                                                                            }
                                                                            serialize(t) {
                                                                              i(this, ie).length !== 0 && (i(this, ie)[0] != null && t.writeRepeatedMessage(1, this.item, e => e.serialize(t)),
                                                                                i(this, ie)[1] != null && t.writeRepeatedMessage(2, this.author, e => e.serialize(t)))
                                                                            }
                                                                          }
                                                                            ,
                                                                            ie = new WeakMap,
                                                                            Fh), We, Rh, lo = (Rh = class {
                                                                              constructor(t) {
                                                                                p(this, We, []);
                                                                                Array.isArray(t) ? g(this, We, t) : t && Object.assign(this, t)
                                                                              }
                                                                              get date() {
                                                                                var t;
                                                                                return new Ys((t = i(this, We))[7] ?? (t[7] = []))
                                                                              }
                                                                              set date(t) {
                                                                                i(this, We)[7] = t != null ? (t instanceof Ys ? t : new Ys(t)).toArray() : []
                                                                              }
                                                                              toArray() {
                                                                                return i(this, We)
                                                                              }
                                                                              toObject() {
                                                                                return {
                                                                                  date: this.date.toObject()
                                                                                }
                                                                              }
                                                                              serialize(t) {
                                                                                i(this, We).length !== 0 && i(this, We)[7] != null && t.writeMessage(8, this.date, e => e.serialize(t))
                                                                              }
                                                                            }
                                                                              ,
                                                                              We = new WeakMap,
                                                                              Rh), $, Uh, Zs = (Uh = class {
                                                                                constructor(t) {
                                                                                  p(this, $, []);
                                                                                  Array.isArray(t) ? g(this, $, t) : t && Object.assign(this, t)
                                                                                }
                                                                                get status() {
                                                                                  var t;
                                                                                  return new Gs((t = i(this, $))[0] ?? (t[0] = []))
                                                                                }
                                                                                set status(t) {
                                                                                  i(this, $)[0] = t != null ? (t instanceof Gs ? t : new Gs(t)).toArray() : []
                                                                                }
                                                                                get panoId() {
                                                                                  var t;
                                                                                  return new q((t = i(this, $))[1] ?? (t[1] = []))
                                                                                }
                                                                                set panoId(t) {
                                                                                  i(this, $)[1] = t != null ? (t instanceof q ? t : new q(t)).toArray() : []
                                                                                }
                                                                                get tiles() {
                                                                                  var t;
                                                                                  return new Gn((t = i(this, $))[2] ?? (t[2] = []))
                                                                                }
                                                                                set tiles(t) {
                                                                                  i(this, $)[2] = t != null ? (t instanceof Gn ? t : new Gn(t)).toArray() : []
                                                                                }
                                                                                get description() {
                                                                                  var t;
                                                                                  return new Ks((t = i(this, $))[3] ?? (t[3] = []))
                                                                                }
                                                                                set description(t) {
                                                                                  i(this, $)[3] = t != null ? (t instanceof Ks ? t : new Ks(t)).toArray() : []
                                                                                }
                                                                                get attribution() {
                                                                                  var t;
                                                                                  return new ao((t = i(this, $))[4] ?? (t[4] = []))
                                                                                }
                                                                                set attribution(t) {
                                                                                  i(this, $)[4] = t != null ? (t instanceof ao ? t : new ao(t)).toArray() : []
                                                                                }
                                                                                get location() {
                                                                                  var t;
                                                                                  return ((t = i(this, $))[5] ?? (t[5] = [])).map(e => new io(e))
                                                                                }
                                                                                set location(t) {
                                                                                  i(this, $)[5] = (t ?? []).map(e => (e instanceof io ? e : new io(e)).toArray())
                                                                                }
                                                                                get includesDate() {
                                                                                  var t;
                                                                                  return new lo((t = i(this, $))[6] ?? (t[6] = []))
                                                                                }
                                                                                set includesDate(t) {
                                                                                  i(this, $)[6] = t != null ? (t instanceof lo ? t : new lo(t)).toArray() : []
                                                                                }
                                                                                get legal() {
                                                                                  var t;
                                                                                  return new Yn((t = i(this, $))[7] ?? (t[7] = []))
                                                                                }
                                                                                set legal(t) {
                                                                                  i(this, $)[7] = t != null ? (t instanceof Yn ? t : new Yn(t)).toArray() : []
                                                                                }
                                                                                toArray() {
                                                                                  return i(this, $)
                                                                                }
                                                                                toObject() {
                                                                                  return {
                                                                                    status: this.status.toObject(),
                                                                                    panoId: this.panoId.toObject(),
                                                                                    tiles: this.tiles.toObject(),
                                                                                    description: this.description.toObject(),
                                                                                    attribution: this.attribution.toObject(),
                                                                                    location: (this.location ?? []).map(t => t.toObject()),
                                                                                    includesDate: this.includesDate.toObject(),
                                                                                    legal: this.legal.toObject()
                                                                                  }
                                                                                }
                                                                                serialize(t) {
                                                                                  i(this, $).length !== 0 && (i(this, $)[0] != null && t.writeMessage(1, this.status, e => e.serialize(t)),
                                                                                    i(this, $)[1] != null && t.writeMessage(2, this.panoId, e => e.serialize(t)),
                                                                                    i(this, $)[2] != null && t.writeMessage(3, this.tiles, e => e.serialize(t)),
                                                                                    i(this, $)[3] != null && t.writeMessage(4, this.description, e => e.serialize(t)),
                                                                                    i(this, $)[4] != null && t.writeMessage(5, this.attribution, e => e.serialize(t)),
                                                                                    i(this, $)[5] != null && t.writeRepeatedMessage(6, this.location, e => e.serialize(t)),
                                                                                    i(this, $)[6] != null && t.writeMessage(7, this.includesDate, e => e.serialize(t)),
                                                                                    i(this, $)[7] != null && t.writeMessage(8, this.legal, e => e.serialize(t)))
                                                                                }
                                                                              }
                                                                                ,
                                                                                $ = new WeakMap,
                                                                                Uh), re, Bh, Js = (Bh = class {
                                                                                  constructor(t) {
                                                                                    p(this, re, []);
                                                                                    Array.isArray(t) ? g(this, re, t) : t && Object.assign(this, t)
                                                                                  }
                                                                                  get supportedRenderStrategy() {
                                                                                    var t;
                                                                                    return ((t = i(this, re))[0] ?? (t[0] = [])).map(e => new Kn(e))
                                                                                  }
                                                                                  set supportedRenderStrategy(t) {
                                                                                    i(this, re)[0] = (t ?? []).map(e => (e instanceof Kn ? e : new Kn(e)).toArray())
                                                                                  }
                                                                                  get maxDimension() {
                                                                                    var t;
                                                                                    return new _t((t = i(this, re))[1] ?? (t[1] = []))
                                                                                  }
                                                                                  set maxDimension(t) {
                                                                                    i(this, re)[1] = t != null ? (t instanceof _t ? t : new _t(t)).toArray() : []
                                                                                  }
                                                                                  toArray() {
                                                                                    return i(this, re)
                                                                                  }
                                                                                  toObject() {
                                                                                    return {
                                                                                      supportedRenderStrategy: (this.supportedRenderStrategy ?? []).map(t => t.toObject()),
                                                                                      maxDimension: this.maxDimension.toObject()
                                                                                    }
                                                                                  }
                                                                                  serialize(t) {
                                                                                    i(this, re).length !== 0 && (i(this, re)[0] != null && t.writeRepeatedMessage(1, this.supportedRenderStrategy, e => e.serialize(t)),
                                                                                      i(this, re)[1] != null && t.writeMessage(2, this.maxDimension, e => e.serialize(t)))
                                                                                  }
                                                                                }
                                                                                  ,
                                                                                  re = new WeakMap,
                                                                                  Bh), Ge, Nh, ho = (Nh = class {
                                                                                    constructor(t) {
                                                                                      p(this, Ge, []);
                                                                                      Array.isArray(t) ? g(this, Ge, t) : t && Object.assign(this, t)
                                                                                    }
                                                                                    get imageFormat() {
                                                                                      return i(this, Ge)[2] ?? 0
                                                                                    }
                                                                                    set imageFormat(t) {
                                                                                      i(this, Ge)[2] = t
                                                                                    }
                                                                                    toArray() {
                                                                                      return i(this, Ge)
                                                                                    }
                                                                                    toObject() {
                                                                                      return {
                                                                                        imageFormat: this.imageFormat
                                                                                      }
                                                                                    }
                                                                                    serialize(t) {
                                                                                      i(this, Ge).length !== 0 && i(this, Ge)[2] != null && t.writeEnum(3, this.imageFormat)
                                                                                    }
                                                                                  }
                                                                                    ,
                                                                                    Ge = new WeakMap,
                                                                                    Nh), mi, Vh, co = (Vh = class {
                                                                                      constructor(t) {
                                                                                        p(this, mi, []);
                                                                                        Array.isArray(t) ? g(this, mi, t) : t && Object.assign(this, t)
                                                                                      }
                                                                                      toArray() {
                                                                                        return i(this, mi)
                                                                                      }
                                                                                      toObject() {
                                                                                        return {}
                                                                                      }
                                                                                      serialize(t) {
                                                                                        i(this, mi).length
                                                                                      }
                                                                                    }
                                                                                      ,
                                                                                      mi = new WeakMap,
                                                                                      Vh), ne, qh, uo = (qh = class {
                                                                                        constructor(t) {
                                                                                          p(this, ne, []);
                                                                                          Array.isArray(t) ? g(this, ne, t) : t && Object.assign(this, t)
                                                                                        }
                                                                                        get providerIdsWhitelist() {
                                                                                          return i(this, ne)[0] ?? ""
                                                                                        }
                                                                                        set providerIdsWhitelist(t) {
                                                                                          i(this, ne)[0] = t
                                                                                        }
                                                                                        get providerIdsBlacklist() {
                                                                                          return i(this, ne)[1] ?? ""
                                                                                        }
                                                                                        set providerIdsBlacklist(t) {
                                                                                          i(this, ne)[1] = t
                                                                                        }
                                                                                        toArray() {
                                                                                          return i(this, ne)
                                                                                        }
                                                                                        toObject() {
                                                                                          return {
                                                                                            providerIdsWhitelist: this.providerIdsWhitelist,
                                                                                            providerIdsBlacklist: this.providerIdsBlacklist
                                                                                          }
                                                                                        }
                                                                                        serialize(t) {
                                                                                          i(this, ne).length !== 0 && (i(this, ne)[0] != null && t.writeString(1, this.providerIdsWhitelist),
                                                                                            i(this, ne)[1] != null && t.writeString(2, this.providerIdsBlacklist))
                                                                                        }
                                                                                      }
                                                                                        ,
                                                                                        ne = new WeakMap,
                                                                                        qh), A, Hh, Qs = (Hh = class {
                                                                                          constructor(t) {
                                                                                            p(this, A, []);
                                                                                            Array.isArray(t) ? g(this, A, t) : t && Object.assign(this, t)
                                                                                          }
                                                                                          get formatRestrictions() {
                                                                                            var t;
                                                                                            return new ho((t = i(this, A))[0] ?? (t[0] = []))
                                                                                          }
                                                                                          set formatRestrictions(t) {
                                                                                            i(this, A)[0] = t != null ? (t instanceof ho ? t : new ho(t)).toArray() : []
                                                                                          }
                                                                                          get restrictToAdsEligible() {
                                                                                            return i(this, A)[1] ?? !1
                                                                                          }
                                                                                          set restrictToAdsEligible(t) {
                                                                                            i(this, A)[1] = t
                                                                                          }
                                                                                          get restrictToDirectionsAppropriate() {
                                                                                            return i(this, A)[2] ?? !1
                                                                                          }
                                                                                          set restrictToDirectionsAppropriate(t) {
                                                                                            i(this, A)[2] = t
                                                                                          }
                                                                                          get c() {
                                                                                            return i(this, A)[3] ?? !1
                                                                                          }
                                                                                          set c(t) {
                                                                                            i(this, A)[3] = t
                                                                                          }
                                                                                          get restrictToPhotosWithFocusAttribution() {
                                                                                            return i(this, A)[4] ?? !1
                                                                                          }
                                                                                          set restrictToPhotosWithFocusAttribution(t) {
                                                                                            i(this, A)[4] = t
                                                                                          }
                                                                                          get restrictToSyndicationEligible() {
                                                                                            return i(this, A)[5] ?? !1
                                                                                          }
                                                                                          set restrictToSyndicationEligible(t) {
                                                                                            i(this, A)[5] = t
                                                                                          }
                                                                                          get semanticRestrictions() {
                                                                                            var t;
                                                                                            return new co((t = i(this, A))[6] ?? (t[6] = []))
                                                                                          }
                                                                                          set semanticRestrictions(t) {
                                                                                            i(this, A)[6] = t != null ? (t instanceof co ? t : new co(t)).toArray() : []
                                                                                          }
                                                                                          get restrictToOwnerAttributedPhotos() {
                                                                                            return i(this, A)[7] ?? !1
                                                                                          }
                                                                                          set restrictToOwnerAttributedPhotos(t) {
                                                                                            i(this, A)[7] = t
                                                                                          }
                                                                                          get restrictToVisitorAttributedPhotos() {
                                                                                            return i(this, A)[8] ?? !1
                                                                                          }
                                                                                          set restrictToVisitorAttributedPhotos(t) {
                                                                                            i(this, A)[8] = t
                                                                                          }
                                                                                          get providerIdRestrictions() {
                                                                                            var t;
                                                                                            return new uo((t = i(this, A))[9] ?? (t[9] = []))
                                                                                          }
                                                                                          set providerIdRestrictions(t) {
                                                                                            i(this, A)[9] = t != null ? (t instanceof uo ? t : new uo(t)).toArray() : []
                                                                                          }
                                                                                          get photoAge() {
                                                                                            var t;
                                                                                            return new ti((t = i(this, A))[10] ?? (t[10] = []))
                                                                                          }
                                                                                          set photoAge(t) {
                                                                                            i(this, A)[10] = t != null ? (t instanceof ti ? t : new ti(t)).toArray() : []
                                                                                          }
                                                                                          get allowExactDuplicatePhoto() {
                                                                                            return i(this, A)[11] ?? !1
                                                                                          }
                                                                                          set allowExactDuplicatePhoto(t) {
                                                                                            i(this, A)[11] = t
                                                                                          }
                                                                                          get allowNearDuplicatePhoto() {
                                                                                            return i(this, A)[12] ?? !1
                                                                                          }
                                                                                          set allowNearDuplicatePhoto(t) {
                                                                                            i(this, A)[12] = t
                                                                                          }
                                                                                          get restrictToVpsPhotos() {
                                                                                            return i(this, A)[13] ?? !1
                                                                                          }
                                                                                          set restrictToVpsPhotos(t) {
                                                                                            i(this, A)[13] = t
                                                                                          }
                                                                                          toArray() {
                                                                                            return i(this, A)
                                                                                          }
                                                                                          toObject() {
                                                                                            return {
                                                                                              formatRestrictions: this.formatRestrictions.toObject(),
                                                                                              restrictToAdsEligible: this.restrictToAdsEligible,
                                                                                              restrictToDirectionsAppropriate: this.restrictToDirectionsAppropriate,
                                                                                              c: this.c,
                                                                                              restrictToPhotosWithFocusAttribution: this.restrictToPhotosWithFocusAttribution,
                                                                                              restrictToSyndicationEligible: this.restrictToSyndicationEligible,
                                                                                              semanticRestrictions: this.semanticRestrictions.toObject(),
                                                                                              restrictToOwnerAttributedPhotos: this.restrictToOwnerAttributedPhotos,
                                                                                              restrictToVisitorAttributedPhotos: this.restrictToVisitorAttributedPhotos,
                                                                                              providerIdRestrictions: this.providerIdRestrictions.toObject(),
                                                                                              photoAge: this.photoAge.toObject(),
                                                                                              allowExactDuplicatePhoto: this.allowExactDuplicatePhoto,
                                                                                              allowNearDuplicatePhoto: this.allowNearDuplicatePhoto,
                                                                                              restrictToVpsPhotos: this.restrictToVpsPhotos
                                                                                            }
                                                                                          }
                                                                                          serialize(t) {
                                                                                            i(this, A).length !== 0 && (i(this, A)[0] != null && t.writeMessage(1, this.formatRestrictions, e => e.serialize(t)),
                                                                                              i(this, A)[1] != null && t.writeBool(2, this.restrictToAdsEligible),
                                                                                              i(this, A)[2] != null && t.writeBool(3, this.restrictToDirectionsAppropriate),
                                                                                              i(this, A)[3] != null && t.writeBool(4, this.c),
                                                                                              i(this, A)[4] != null && t.writeBool(5, this.restrictToPhotosWithFocusAttribution),
                                                                                              i(this, A)[5] != null && t.writeBool(6, this.restrictToSyndicationEligible),
                                                                                              i(this, A)[6] != null && t.writeMessage(7, this.semanticRestrictions, e => e.serialize(t)),
                                                                                              i(this, A)[7] != null && t.writeBool(8, this.restrictToOwnerAttributedPhotos),
                                                                                              i(this, A)[8] != null && t.writeBool(9, this.restrictToVisitorAttributedPhotos),
                                                                                              i(this, A)[9] != null && t.writeMessage(10, this.providerIdRestrictions, e => e.serialize(t)),
                                                                                              i(this, A)[10] != null && t.writeMessage(11, this.photoAge, e => e.serialize(t)),
                                                                                              i(this, A)[11] != null && t.writeBool(12, this.allowExactDuplicatePhoto),
                                                                                              i(this, A)[12] != null && t.writeBool(13, this.allowNearDuplicatePhoto),
                                                                                              i(this, A)[13] != null && t.writeBool(14, this.restrictToVpsPhotos))
                                                                                          }
                                                                                        }
                                                                                          ,
                                                                                          A = new WeakMap,
                                                                                          Hh), bi, Kh, fo = (Kh = class {
                                                                                            constructor(t) {
                                                                                              p(this, bi, []);
                                                                                              Array.isArray(t) ? g(this, bi, t) : t && Object.assign(this, t)
                                                                                            }
                                                                                            toArray() {
                                                                                              return i(this, bi)
                                                                                            }
                                                                                            toObject() {
                                                                                              return {}
                                                                                            }
                                                                                            serialize(t) {
                                                                                              i(this, bi).length
                                                                                            }
                                                                                          }
                                                                                            ,
                                                                                            bi = new WeakMap,
                                                                                            Kh), wi, Wh, Xs = (Wh = class {
                                                                                              constructor(t) {
                                                                                                p(this, wi, []);
                                                                                                Array.isArray(t) ? g(this, wi, t) : t && Object.assign(this, t)
                                                                                              }
                                                                                              toArray() {
                                                                                                return i(this, wi)
                                                                                              }
                                                                                              toObject() {
                                                                                                return {}
                                                                                              }
                                                                                              serialize(t) {
                                                                                                i(this, wi).length
                                                                                              }
                                                                                            }
                                                                                              ,
                                                                                              wi = new WeakMap,
                                                                                              Wh), vi, Gh, go = (Gh = class {
                                                                                                constructor(t) {
                                                                                                  p(this, vi, []);
                                                                                                  Array.isArray(t) ? g(this, vi, t) : t && Object.assign(this, t)
                                                                                                }
                                                                                                toArray() {
                                                                                                  return i(this, vi)
                                                                                                }
                                                                                                toObject() {
                                                                                                  return {}
                                                                                                }
                                                                                                serialize(t) {
                                                                                                  i(this, vi).length
                                                                                                }
                                                                                              }
                                                                                                ,
                                                                                                vi = new WeakMap,
                                                                                                Gh), C, Yh, po = (Yh = class {
                                                                                                  constructor(t) {
                                                                                                    p(this, C, []);
                                                                                                    Array.isArray(t) ? g(this, C, t) : t && Object.assign(this, t)
                                                                                                  }
                                                                                                  get rankingStrategy() {
                                                                                                    return i(this, C)[0] ?? 0
                                                                                                  }
                                                                                                  set rankingStrategy(t) {
                                                                                                    i(this, C)[0] = t
                                                                                                  }
                                                                                                  get logisticCurvature() {
                                                                                                    return i(this, C)[1] ?? 0
                                                                                                  }
                                                                                                  set logisticCurvature(t) {
                                                                                                    i(this, C)[1] = t
                                                                                                  }
                                                                                                  get logisticOffset() {
                                                                                                    return i(this, C)[2] ?? 0
                                                                                                  }
                                                                                                  set logisticOffset(t) {
                                                                                                    i(this, C)[2] = t
                                                                                                  }
                                                                                                  get distanceRatio() {
                                                                                                    return i(this, C)[3] ?? 0
                                                                                                  }
                                                                                                  set distanceRatio(t) {
                                                                                                    i(this, C)[3] = t
                                                                                                  }
                                                                                                  get timestampOptions() {
                                                                                                    var t;
                                                                                                    return new fo((t = i(this, C))[4] ?? (t[4] = []))
                                                                                                  }
                                                                                                  set timestampOptions(t) {
                                                                                                    i(this, C)[4] = t != null ? (t instanceof fo ? t : new fo(t)).toArray() : []
                                                                                                  }
                                                                                                  get qbica() {
                                                                                                    var t;
                                                                                                    return new Xs((t = i(this, C))[5] ?? (t[5] = []))
                                                                                                  }
                                                                                                  set qbica(t) {
                                                                                                    i(this, C)[5] = t != null ? (t instanceof Xs ? t : new Xs(t)).toArray() : []
                                                                                                  }
                                                                                                  get descriptor() {
                                                                                                    return i(this, C)[6] ?? ""
                                                                                                  }
                                                                                                  set descriptor(t) {
                                                                                                    i(this, C)[6] = t
                                                                                                  }
                                                                                                  get similarityOptions() {
                                                                                                    var t;
                                                                                                    return new go((t = i(this, C))[7] ?? (t[7] = []))
                                                                                                  }
                                                                                                  set similarityOptions(t) {
                                                                                                    i(this, C)[7] = t != null ? (t instanceof go ? t : new go(t)).toArray() : []
                                                                                                  }
                                                                                                  toArray() {
                                                                                                    return i(this, C)
                                                                                                  }
                                                                                                  toObject() {
                                                                                                    return {
                                                                                                      rankingStrategy: this.rankingStrategy,
                                                                                                      logisticCurvature: this.logisticCurvature,
                                                                                                      logisticOffset: this.logisticOffset,
                                                                                                      distanceRatio: this.distanceRatio,
                                                                                                      timestampOptions: this.timestampOptions.toObject(),
                                                                                                      qbica: this.qbica.toObject(),
                                                                                                      descriptor: this.descriptor,
                                                                                                      similarityOptions: this.similarityOptions.toObject()
                                                                                                    }
                                                                                                  }
                                                                                                  serialize(t) {
                                                                                                    i(this, C).length !== 0 && (i(this, C)[0] != null && t.writeEnum(1, this.rankingStrategy),
                                                                                                      i(this, C)[1] != null && t.writeDouble(2, this.logisticCurvature),
                                                                                                      i(this, C)[2] != null && t.writeDouble(3, this.logisticOffset),
                                                                                                      i(this, C)[3] != null && t.writeDouble(4, this.distanceRatio),
                                                                                                      i(this, C)[4] != null && t.writeMessage(5, this.timestampOptions, e => e.serialize(t)),
                                                                                                      i(this, C)[5] != null && t.writeMessage(6, this.qbica, e => e.serialize(t)),
                                                                                                      i(this, C)[6] != null && t.writeString(7, this.descriptor),
                                                                                                      i(this, C)[7] != null && t.writeMessage(8, this.similarityOptions, e => e.serialize(t)))
                                                                                                  }
                                                                                                }
                                                                                                  ,
                                                                                                  C = new WeakMap,
                                                                                                  Yh), oe, Zh, ti = (Zh = class {
                                                                                                    constructor(t) {
                                                                                                      p(this, oe, []);
                                                                                                      Array.isArray(t) ? g(this, oe, t) : t && Object.assign(this, t)
                                                                                                    }
                                                                                                    get startSeconds() {
                                                                                                      return i(this, oe)[0] ?? 0
                                                                                                    }
                                                                                                    set startSeconds(t) {
                                                                                                      i(this, oe)[0] = t
                                                                                                    }
                                                                                                    get endSeconds() {
                                                                                                      return i(this, oe)[1] ?? 0
                                                                                                    }
                                                                                                    set endSeconds(t) {
                                                                                                      i(this, oe)[1] = t
                                                                                                    }
                                                                                                    toArray() {
                                                                                                      return i(this, oe)
                                                                                                    }
                                                                                                    toObject() {
                                                                                                      return {
                                                                                                        startSeconds: this.startSeconds,
                                                                                                        endSeconds: this.endSeconds
                                                                                                      }
                                                                                                    }
                                                                                                    serialize(t) {
                                                                                                      i(this, oe).length !== 0 && (i(this, oe)[0] != null && t.writeDouble(1, this.startSeconds),
                                                                                                        i(this, oe)[1] != null && t.writeDouble(2, this.endSeconds))
                                                                                                    }
                                                                                                  }
                                                                                                    ,
                                                                                                    oe = new WeakMap,
                                                                                                    Zh), S, Jh, ei = (Jh = class {
                                                                                                      constructor(t) {
                                                                                                        p(this, S, []);
                                                                                                        Array.isArray(t) ? g(this, S, t) : t && Object.assign(this, t)
                                                                                                      }
                                                                                                      get zipitAnnotationId() {
                                                                                                        return i(this, S)[3] ?? ""
                                                                                                      }
                                                                                                      set zipitAnnotationId(t) {
                                                                                                        i(this, S)[3] = t
                                                                                                      }
                                                                                                      get ugcOfferingId() {
                                                                                                        return i(this, S)[4] ?? ""
                                                                                                      }
                                                                                                      set ugcOfferingId(t) {
                                                                                                        i(this, S)[4] = t
                                                                                                      }
                                                                                                      get format() {
                                                                                                        return i(this, S)[6] ?? 0
                                                                                                      }
                                                                                                      set format(t) {
                                                                                                        i(this, S)[6] = t
                                                                                                      }
                                                                                                      get photoAge() {
                                                                                                        var t;
                                                                                                        return new ti((t = i(this, S))[7] ?? (t[7] = []))
                                                                                                      }
                                                                                                      set photoAge(t) {
                                                                                                        i(this, S)[7] = t != null ? (t instanceof ti ? t : new ti(t)).toArray() : []
                                                                                                      }
                                                                                                      get hashtag() {
                                                                                                        return i(this, S)[9] ?? ""
                                                                                                      }
                                                                                                      set hashtag(t) {
                                                                                                        i(this, S)[9] = t
                                                                                                      }
                                                                                                      get usvSequenceId() {
                                                                                                        return i(this, S)[10] ?? ""
                                                                                                      }
                                                                                                      set usvSequenceId(t) {
                                                                                                        i(this, S)[10] = t
                                                                                                      }
                                                                                                      get gaiaId() {
                                                                                                        return i(this, S)[11] ?? ""
                                                                                                      }
                                                                                                      set gaiaId(t) {
                                                                                                        i(this, S)[11] = t
                                                                                                      }
                                                                                                      get canonicalOfferingId() {
                                                                                                        return i(this, S)[12] ?? ""
                                                                                                      }
                                                                                                      set canonicalOfferingId(t) {
                                                                                                        i(this, S)[12] = t
                                                                                                      }
                                                                                                      get imageKey() {
                                                                                                        var t;
                                                                                                        return new q((t = i(this, S))[13] ?? (t[13] = []))
                                                                                                      }
                                                                                                      set imageKey(t) {
                                                                                                        i(this, S)[13] = t != null ? (t instanceof q ? t : new q(t)).toArray() : []
                                                                                                      }
                                                                                                      get providerIdRegexAllowlist() {
                                                                                                        return i(this, S)[15] ?? ""
                                                                                                      }
                                                                                                      set providerIdRegexAllowlist(t) {
                                                                                                        i(this, S)[15] = t
                                                                                                      }
                                                                                                      get providerIdRegexDenylist() {
                                                                                                        return i(this, S)[16] ?? ""
                                                                                                      }
                                                                                                      set providerIdRegexDenylist(t) {
                                                                                                        i(this, S)[16] = t
                                                                                                      }
                                                                                                      get queryText() {
                                                                                                        return i(this, S)[17] ?? ""
                                                                                                      }
                                                                                                      set queryText(t) {
                                                                                                        i(this, S)[17] = t
                                                                                                      }
                                                                                                      toArray() {
                                                                                                        return i(this, S)
                                                                                                      }
                                                                                                      toObject() {
                                                                                                        return {
                                                                                                          zipitAnnotationId: this.zipitAnnotationId,
                                                                                                          ugcOfferingId: this.ugcOfferingId,
                                                                                                          format: this.format,
                                                                                                          photoAge: this.photoAge.toObject(),
                                                                                                          hashtag: this.hashtag,
                                                                                                          usvSequenceId: this.usvSequenceId,
                                                                                                          gaiaId: this.gaiaId,
                                                                                                          canonicalOfferingId: this.canonicalOfferingId,
                                                                                                          imageKey: this.imageKey.toObject(),
                                                                                                          providerIdRegexAllowlist: this.providerIdRegexAllowlist,
                                                                                                          providerIdRegexDenylist: this.providerIdRegexDenylist,
                                                                                                          queryText: this.queryText
                                                                                                        }
                                                                                                      }
                                                                                                      serialize(t) {
                                                                                                        i(this, S).length !== 0 && (i(this, S)[3] != null && t.writeString(4, this.zipitAnnotationId),
                                                                                                          i(this, S)[4] != null && t.writeString(5, this.ugcOfferingId),
                                                                                                          i(this, S)[6] != null && t.writeEnum(7, this.format),
                                                                                                          i(this, S)[7] != null && t.writeMessage(8, this.photoAge, e => e.serialize(t)),
                                                                                                          i(this, S)[9] != null && t.writeString(10, this.hashtag),
                                                                                                          i(this, S)[10] != null && t.writeString(11, this.usvSequenceId),
                                                                                                          i(this, S)[11] != null && t.writeString(12, this.gaiaId),
                                                                                                          i(this, S)[12] != null && t.writeString(13, this.canonicalOfferingId),
                                                                                                          i(this, S)[13] != null && t.writeMessage(14, this.imageKey, e => e.serialize(t)),
                                                                                                          i(this, S)[15] != null && t.writeString(16, this.providerIdRegexAllowlist),
                                                                                                          i(this, S)[16] != null && t.writeString(17, this.providerIdRegexDenylist),
                                                                                                          i(this, S)[17] != null && t.writeString(18, this.queryText))
                                                                                                      }
                                                                                                    }
                                                                                                      ,
                                                                                                      S = new WeakMap,
                                                                                                      Jh), ae, ds, yo = (ds = class {
                                                                                                        constructor(e) {
                                                                                                          p(this, ae, []);
                                                                                                          Array.isArray(e) ? g(this, ae, e) : e && Object.assign(this, e)
                                                                                                        }
                                                                                                        get criterion() {
                                                                                                          var e;
                                                                                                          return new ei((e = i(this, ae))[1] ?? (e[1] = []))
                                                                                                        }
                                                                                                        set criterion(e) {
                                                                                                          i(this, ae)[1] = e != null ? (e instanceof ei ? e : new ei(e)).toArray() : []
                                                                                                        }
                                                                                                        get compositeCriterion() {
                                                                                                          var e;
                                                                                                          return new ds((e = i(this, ae))[2] ?? (e[2] = []))
                                                                                                        }
                                                                                                        set compositeCriterion(e) {
                                                                                                          i(this, ae)[2] = e != null ? (e instanceof ds ? e : new ds(e)).toArray() : []
                                                                                                        }
                                                                                                        toArray() {
                                                                                                          return i(this, ae)
                                                                                                        }
                                                                                                        toObject() {
                                                                                                          return {
                                                                                                            criterion: this.criterion.toObject(),
                                                                                                            compositeCriterion: this.compositeCriterion.toObject()
                                                                                                          }
                                                                                                        }
                                                                                                        serialize(e) {
                                                                                                          i(this, ae).length !== 0 && (i(this, ae)[1] != null && e.writeMessage(2, this.criterion, s => s.serialize(e)),
                                                                                                            i(this, ae)[2] != null && e.writeMessage(3, this.compositeCriterion, s => s.serialize(e)))
                                                                                                        }
                                                                                                      }
                                                                                                        ,
                                                                                                        ae = new WeakMap,
                                                                                                        ds), At, Qh, mo = (Qh = class {
                                                                                                          constructor(t) {
                                                                                                            p(this, At, []);
                                                                                                            Array.isArray(t) ? g(this, At, t) : t && Object.assign(this, t)
                                                                                                          }
                                                                                                          get criterion() {
                                                                                                            var t;
                                                                                                            return new ei((t = i(this, At))[0] ?? (t[0] = []))
                                                                                                          }
                                                                                                          set criterion(t) {
                                                                                                            i(this, At)[0] = t != null ? (t instanceof ei ? t : new ei(t)).toArray() : []
                                                                                                          }
                                                                                                          get tag() {
                                                                                                            return i(this, At)[1] ?? ""
                                                                                                          }
                                                                                                          set tag(t) {
                                                                                                            i(this, At)[1] = t
                                                                                                          }
                                                                                                          get continuationToken() {
                                                                                                            return i(this, At)[2] ?? ""
                                                                                                          }
                                                                                                          set continuationToken(t) {
                                                                                                            i(this, At)[2] = t
                                                                                                          }
                                                                                                          toArray() {
                                                                                                            return i(this, At)
                                                                                                          }
                                                                                                          toObject() {
                                                                                                            return {
                                                                                                              criterion: this.criterion.toObject(),
                                                                                                              tag: this.tag,
                                                                                                              continuationToken: this.continuationToken
                                                                                                            }
                                                                                                          }
                                                                                                          serialize(t) {
                                                                                                            i(this, At).length !== 0 && (i(this, At)[0] != null && t.writeMessage(1, this.criterion, e => e.serialize(t)),
                                                                                                              i(this, At)[1] != null && t.writeString(2, this.tag),
                                                                                                              i(this, At)[2] != null && t.writeString(3, this.continuationToken))
                                                                                                          }
                                                                                                        }
                                                                                                          ,
                                                                                                          At = new WeakMap,
                                                                                                          Qh), le, Xh, bo = (Xh = class {
                                                                                                            constructor(t) {
                                                                                                              p(this, le, []);
                                                                                                              Array.isArray(t) ? g(this, le, t) : t && Object.assign(this, t)
                                                                                                            }
                                                                                                            get commonCriterion() {
                                                                                                              var t;
                                                                                                              return new yo((t = i(this, le))[0] ?? (t[0] = []))
                                                                                                            }
                                                                                                            set commonCriterion(t) {
                                                                                                              i(this, le)[0] = t != null ? (t instanceof yo ? t : new yo(t)).toArray() : []
                                                                                                            }
                                                                                                            get forEach() {
                                                                                                              var t;
                                                                                                              return ((t = i(this, le))[1] ?? (t[1] = [])).map(e => new mo(e))
                                                                                                            }
                                                                                                            set forEach(t) {
                                                                                                              i(this, le)[1] = (t ?? []).map(e => (e instanceof mo ? e : new mo(e)).toArray())
                                                                                                            }
                                                                                                            toArray() {
                                                                                                              return i(this, le)
                                                                                                            }
                                                                                                            toObject() {
                                                                                                              return {
                                                                                                                commonCriterion: this.commonCriterion.toObject(),
                                                                                                                forEach: (this.forEach ?? []).map(t => t.toObject())
                                                                                                              }
                                                                                                            }
                                                                                                            serialize(t) {
                                                                                                              i(this, le).length !== 0 && (i(this, le)[0] != null && t.writeMessage(1, this.commonCriterion, e => e.serialize(t)),
                                                                                                                i(this, le)[1] != null && t.writeRepeatedMessage(2, this.forEach, e => e.serialize(t)))
                                                                                                            }
                                                                                                          }
                                                                                                            ,
                                                                                                            le = new WeakMap,
                                                                                                            Xh), Ot, tc, wo = (tc = class {
                                                                                                              constructor(t) {
                                                                                                                p(this, Ot, []);
                                                                                                                Array.isArray(t) ? g(this, Ot, t) : t && Object.assign(this, t)
                                                                                                              }
                                                                                                              get mid() {
                                                                                                                return i(this, Ot)[0] ?? ""
                                                                                                              }
                                                                                                              set mid(t) {
                                                                                                                i(this, Ot)[0] = t
                                                                                                              }
                                                                                                              get unusedMids() {
                                                                                                                return i(this, Ot)[3] ?? ""
                                                                                                              }
                                                                                                              set unusedMids(t) {
                                                                                                                i(this, Ot)[3] = t
                                                                                                              }
                                                                                                              get qbica() {
                                                                                                                var t;
                                                                                                                return new Xs((t = i(this, Ot))[4] ?? (t[4] = []))
                                                                                                              }
                                                                                                              set qbica(t) {
                                                                                                                i(this, Ot)[4] = t != null ? (t instanceof Xs ? t : new Xs(t)).toArray() : []
                                                                                                              }
                                                                                                              toArray() {
                                                                                                                return i(this, Ot)
                                                                                                              }
                                                                                                              toObject() {
                                                                                                                return {
                                                                                                                  mid: this.mid,
                                                                                                                  unusedMids: this.unusedMids,
                                                                                                                  qbica: this.qbica.toObject()
                                                                                                                }
                                                                                                              }
                                                                                                              serialize(t) {
                                                                                                                i(this, Ot).length !== 0 && (i(this, Ot)[0] != null && t.writeString(1, this.mid),
                                                                                                                  i(this, Ot)[3] != null && t.writeString(4, this.unusedMids),
                                                                                                                  i(this, Ot)[4] != null && t.writeMessage(5, this.qbica, e => e.serialize(t)))
                                                                                                              }
                                                                                                            }
                                                                                                              ,
                                                                                                              Ot = new WeakMap,
                                                                                                              tc), D, ec, vo = (ec = class {
                                                                                                                constructor(t) {
                                                                                                                  p(this, D, []);
                                                                                                                  Array.isArray(t) ? g(this, D, t) : t && Object.assign(this, t)
                                                                                                                }
                                                                                                                get filterOptions() {
                                                                                                                  var t;
                                                                                                                  return new Qs((t = i(this, D))[0] ?? (t[0] = []))
                                                                                                                }
                                                                                                                set filterOptions(t) {
                                                                                                                  i(this, D)[0] = t != null ? (t instanceof Qs ? t : new Qs(t)).toArray() : []
                                                                                                                }
                                                                                                                get localizationContext() {
                                                                                                                  var t;
                                                                                                                  return new ns((t = i(this, D))[1] ?? (t[1] = []))
                                                                                                                }
                                                                                                                set localizationContext(t) {
                                                                                                                  i(this, D)[1] = t != null ? (t instanceof ns ? t : new ns(t)).toArray() : []
                                                                                                                }
                                                                                                                get rankingOptions() {
                                                                                                                  var t;
                                                                                                                  return new po((t = i(this, D))[8] ?? (t[8] = []))
                                                                                                                }
                                                                                                                set rankingOptions(t) {
                                                                                                                  i(this, D)[8] = t != null ? (t instanceof po ? t : new po(t)).toArray() : []
                                                                                                                }
                                                                                                                get clientCapabilities() {
                                                                                                                  var t;
                                                                                                                  return new Js((t = i(this, D))[10] ?? (t[10] = []))
                                                                                                                }
                                                                                                                set clientCapabilities(t) {
                                                                                                                  i(this, D)[10] = t != null ? (t instanceof Js ? t : new Js(t)).toArray() : []
                                                                                                                }
                                                                                                                get retrieveFocusAttribution() {
                                                                                                                  return i(this, D)[13] ?? !1
                                                                                                                }
                                                                                                                set retrieveFocusAttribution(t) {
                                                                                                                  i(this, D)[13] = t
                                                                                                                }
                                                                                                                get queryOptionTag() {
                                                                                                                  return i(this, D)[15] ?? ""
                                                                                                                }
                                                                                                                set queryOptionTag(t) {
                                                                                                                  i(this, D)[15] = t
                                                                                                                }
                                                                                                                get selectBy() {
                                                                                                                  var t;
                                                                                                                  return new bo((t = i(this, D))[19] ?? (t[19] = []))
                                                                                                                }
                                                                                                                set selectBy(t) {
                                                                                                                  i(this, D)[19] = t != null ? (t instanceof bo ? t : new bo(t)).toArray() : []
                                                                                                                }
                                                                                                                get contextualSemanticIntentOptions() {
                                                                                                                  var t;
                                                                                                                  return new wo((t = i(this, D))[20] ?? (t[20] = []))
                                                                                                                }
                                                                                                                set contextualSemanticIntentOptions(t) {
                                                                                                                  i(this, D)[20] = t != null ? (t instanceof wo ? t : new wo(t)).toArray() : []
                                                                                                                }
                                                                                                                toArray() {
                                                                                                                  return i(this, D)
                                                                                                                }
                                                                                                                toObject() {
                                                                                                                  return {
                                                                                                                    filterOptions: this.filterOptions.toObject(),
                                                                                                                    localizationContext: this.localizationContext.toObject(),
                                                                                                                    rankingOptions: this.rankingOptions.toObject(),
                                                                                                                    clientCapabilities: this.clientCapabilities.toObject(),
                                                                                                                    retrieveFocusAttribution: this.retrieveFocusAttribution,
                                                                                                                    queryOptionTag: this.queryOptionTag,
                                                                                                                    selectBy: this.selectBy.toObject(),
                                                                                                                    contextualSemanticIntentOptions: this.contextualSemanticIntentOptions.toObject()
                                                                                                                  }
                                                                                                                }
                                                                                                                serialize(t) {
                                                                                                                  i(this, D).length !== 0 && (i(this, D)[0] != null && t.writeMessage(1, this.filterOptions, e => e.serialize(t)),
                                                                                                                    i(this, D)[1] != null && t.writeMessage(2, this.localizationContext, e => e.serialize(t)),
                                                                                                                    i(this, D)[8] != null && t.writeMessage(9, this.rankingOptions, e => e.serialize(t)),
                                                                                                                    i(this, D)[10] != null && t.writeMessage(11, this.clientCapabilities, e => e.serialize(t)),
                                                                                                                    i(this, D)[13] != null && t.writeBool(14, this.retrieveFocusAttribution),
                                                                                                                    i(this, D)[15] != null && t.writeString(16, this.queryOptionTag),
                                                                                                                    i(this, D)[19] != null && t.writeMessage(20, this.selectBy, e => e.serialize(t)),
                                                                                                                    i(this, D)[20] != null && t.writeMessage(21, this.contextualSemanticIntentOptions, e => e.serialize(t)))
                                                                                                                }
                                                                                                              }
                                                                                                                ,
                                                                                                                D = new WeakMap,
                                                                                                                ec), Ye, sc, si = (sc = class {
                                                                                                                  constructor(t) {
                                                                                                                    p(this, Ye, []);
                                                                                                                    Array.isArray(t) ? g(this, Ye, t) : t && Object.assign(this, t)
                                                                                                                  }
                                                                                                                  get encoding() {
                                                                                                                    return i(this, Ye)[0] ?? 0
                                                                                                                  }
                                                                                                                  set encoding(t) {
                                                                                                                    i(this, Ye)[0] = t
                                                                                                                  }
                                                                                                                  toArray() {
                                                                                                                    return i(this, Ye)
                                                                                                                  }
                                                                                                                  toObject() {
                                                                                                                    return {
                                                                                                                      encoding: this.encoding
                                                                                                                    }
                                                                                                                  }
                                                                                                                  serialize(t) {
                                                                                                                    i(this, Ye).length !== 0 && i(this, Ye)[0] != null && t.writeEnum(1, this.encoding)
                                                                                                                  }
                                                                                                                }
                                                                                                                  ,
                                                                                                                  Ye = new WeakMap,
                                                                                                                  sc), Ze, ic, ii = (ic = class {
                                                                                                                    constructor(t) {
                                                                                                                      p(this, Ze, []);
                                                                                                                      Array.isArray(t) ? g(this, Ze, t) : t && Object.assign(this, t)
                                                                                                                    }
                                                                                                                    get encoding() {
                                                                                                                      return i(this, Ze)[0] ?? 0
                                                                                                                    }
                                                                                                                    set encoding(t) {
                                                                                                                      i(this, Ze)[0] = t
                                                                                                                    }
                                                                                                                    toArray() {
                                                                                                                      return i(this, Ze)
                                                                                                                    }
                                                                                                                    toObject() {
                                                                                                                      return {
                                                                                                                        encoding: this.encoding
                                                                                                                      }
                                                                                                                    }
                                                                                                                    serialize(t) {
                                                                                                                      i(this, Ze).length !== 0 && i(this, Ze)[0] != null && t.writeEnum(1, this.encoding)
                                                                                                                    }
                                                                                                                  }
                                                                                                                    ,
                                                                                                                    Ze = new WeakMap,
                                                                                                                    ic), Je, rc, Ao = (rc = class {
                                                                                                                      constructor(t) {
                                                                                                                        p(this, Je, []);
                                                                                                                        Array.isArray(t) ? g(this, Je, t) : t && Object.assign(this, t)
                                                                                                                      }
                                                                                                                      get channel() {
                                                                                                                        return i(this, Je)[0] ?? 0
                                                                                                                      }
                                                                                                                      set channel(t) {
                                                                                                                        i(this, Je)[0] = t
                                                                                                                      }
                                                                                                                      toArray() {
                                                                                                                        return i(this, Je)
                                                                                                                      }
                                                                                                                      toObject() {
                                                                                                                        return {
                                                                                                                          channel: this.channel
                                                                                                                        }
                                                                                                                      }
                                                                                                                      serialize(t) {
                                                                                                                        i(this, Je).length !== 0 && i(this, Je)[0] != null && t.writeEnum(1, this.channel)
                                                                                                                      }
                                                                                                                    }
                                                                                                                      ,
                                                                                                                      Je = new WeakMap,
                                                                                                                      rc), L, nc, ri = (nc = class {
                                                                                                                        constructor(t) {
                                                                                                                          p(this, L, []);
                                                                                                                          Array.isArray(t) ? g(this, L, t) : t && Object.assign(this, t)
                                                                                                                        }
                                                                                                                        get components() {
                                                                                                                          return i(this, L)[0] ?? 0
                                                                                                                        }
                                                                                                                        set components(t) {
                                                                                                                          i(this, L)[0] = (t ?? []).map(e => e)
                                                                                                                        }
                                                                                                                        get navigationChannels() {
                                                                                                                          var t;
                                                                                                                          return ((t = i(this, L))[1] ?? (t[1] = [])).map(e => new Ao(e))
                                                                                                                        }
                                                                                                                        set navigationChannels(t) {
                                                                                                                          i(this, L)[1] = (t ?? []).map(e => (e instanceof Ao ? e : new Ao(e)).toArray())
                                                                                                                        }
                                                                                                                        get httpResponseFormat() {
                                                                                                                          return i(this, L)[2] ?? 0
                                                                                                                        }
                                                                                                                        set httpResponseFormat(t) {
                                                                                                                          i(this, L)[2] = t
                                                                                                                        }
                                                                                                                        get attribution() {
                                                                                                                          var t;
                                                                                                                          return new Oo((t = i(this, L))[3] ?? (t[3] = []))
                                                                                                                        }
                                                                                                                        set attribution(t) {
                                                                                                                          i(this, L)[3] = t != null ? (t instanceof Oo ? t : new Oo(t)).toArray() : []
                                                                                                                        }
                                                                                                                        get cursorFormats() {
                                                                                                                          var t;
                                                                                                                          return ((t = i(this, L))[4] ?? (t[4] = [])).map(e => new si(e))
                                                                                                                        }
                                                                                                                        set cursorFormats(t) {
                                                                                                                          i(this, L)[4] = (t ?? []).map(e => (e instanceof si ? e : new si(e)).toArray())
                                                                                                                        }
                                                                                                                        get targetOverlayFormats() {
                                                                                                                          var t;
                                                                                                                          return ((t = i(this, L))[5] ?? (t[5] = [])).map(e => new ii(e))
                                                                                                                        }
                                                                                                                        set targetOverlayFormats(t) {
                                                                                                                          i(this, L)[5] = (t ?? []).map(e => (e instanceof ii ? e : new ii(e)).toArray())
                                                                                                                        }
                                                                                                                        get seven() {
                                                                                                                          return i(this, L)[6] ?? !1
                                                                                                                        }
                                                                                                                        set seven(t) {
                                                                                                                          i(this, L)[6] = t
                                                                                                                        }
                                                                                                                        get clientCapabilities() {
                                                                                                                          var t;
                                                                                                                          return new Js((t = i(this, L))[8] ?? (t[8] = []))
                                                                                                                        }
                                                                                                                        set clientCapabilities(t) {
                                                                                                                          i(this, L)[8] = t != null ? (t instanceof Js ? t : new Js(t)).toArray() : []
                                                                                                                        }
                                                                                                                        toArray() {
                                                                                                                          return i(this, L)
                                                                                                                        }
                                                                                                                        toObject() {
                                                                                                                          return {
                                                                                                                            components: this.components,
                                                                                                                            navigationChannels: (this.navigationChannels ?? []).map(t => t.toObject()),
                                                                                                                            httpResponseFormat: this.httpResponseFormat,
                                                                                                                            attribution: this.attribution.toObject(),
                                                                                                                            cursorFormats: (this.cursorFormats ?? []).map(t => t.toObject()),
                                                                                                                            targetOverlayFormats: (this.targetOverlayFormats ?? []).map(t => t.toObject()),
                                                                                                                            seven: this.seven,
                                                                                                                            clientCapabilities: this.clientCapabilities.toObject()
                                                                                                                          }
                                                                                                                        }
                                                                                                                        serialize(t) {
                                                                                                                          i(this, L).length !== 0 && (i(this, L)[0] != null && t.writeRepeatedEnum(1, this.components),
                                                                                                                            i(this, L)[1] != null && t.writeRepeatedMessage(2, this.navigationChannels, e => e.serialize(t)),
                                                                                                                            i(this, L)[2] != null && t.writeEnum(3, this.httpResponseFormat),
                                                                                                                            i(this, L)[3] != null && t.writeMessage(4, this.attribution, e => e.serialize(t)),
                                                                                                                            i(this, L)[4] != null && t.writeRepeatedMessage(5, this.cursorFormats, e => e.serialize(t)),
                                                                                                                            i(this, L)[5] != null && t.writeRepeatedMessage(6, this.targetOverlayFormats, e => e.serialize(t)),
                                                                                                                            i(this, L)[6] != null && t.writeBool(7, this.seven),
                                                                                                                            i(this, L)[8] != null && t.writeMessage(9, this.clientCapabilities, e => e.serialize(t)))
                                                                                                                        }
                                                                                                                      }
                                                                                                                        ,
                                                                                                                        L0 = new WeakMap,
                                                                                                                        nc), Qe, oc, Oo = (oc = class {
                                                                                                                          constructor(t) {
                                                                                                                            p(this, Qe, []);
                                                                                                                            Array.isArray(t) ? g(this, Qe, t) : t && Object.assign(this, t)
                                                                                                                          }
                                                                                                                          get thumbnailSize() {
                                                                                                                            return i(this, Qe)[0] ?? 0
                                                                                                                          }
                                                                                                                          set thumbnailSize(t) {
                                                                                                                            i(this, Qe)[0] = t
                                                                                                                          }
                                                                                                                          toArray() {
                                                                                                                            return i(this, Qe)
                                                                                                                          }
                                                                                                                          toObject() {
                                                                                                                            return {
                                                                                                                              thumbnailSize: this.thumbnailSize
                                                                                                                            }
                                                                                                                          }
                                                                                                                          serialize(t) {
                                                                                                                            i(this, Qe).length !== 0 && i(this, Qe)[0] != null && t.writeInt32(1, this.thumbnailSize)
                                                                                                                          }
                                                                                                                        }
                                                                                                                          ,
                                                                                                                          Qe = new WeakMap,
                                                                                                                          oc), he, ac, xo = (ac = class {
                                                                                                                            constructor(t) {
                                                                                                                              p(this, he, []);
                                                                                                                              Array.isArray(t) ? g(this, he, t) : t && Object.assign(this, t)
                                                                                                                            }
                                                                                                                            get imageKey() {
                                                                                                                              var t;
                                                                                                                              return new q((t = i(this, he))[0] ?? (t[0] = []))
                                                                                                                            }
                                                                                                                            set imageKey(t) {
                                                                                                                              i(this, he)[0] = t != null ? (t instanceof q ? t : new q(t)).toArray() : []
                                                                                                                            }
                                                                                                                            get contextFeature() {
                                                                                                                              var t;
                                                                                                                              return new Vs((t = i(this, he))[1] ?? (t[1] = []))
                                                                                                                            }
                                                                                                                            set contextFeature(t) {
                                                                                                                              i(this, he)[1] = t != null ? (t instanceof Vs ? t : new Vs(t)).toArray() : []
                                                                                                                            }
                                                                                                                            toArray() {
                                                                                                                              return i(this, he)
                                                                                                                            }
                                                                                                                            toObject() {
                                                                                                                              return {
                                                                                                                                imageKey: this.imageKey.toObject(),
                                                                                                                                contextFeature: this.contextFeature.toObject()
                                                                                                                              }
                                                                                                                            }
                                                                                                                            serialize(t) {
                                                                                                                              i(this, he).length !== 0 && (i(this, he)[0] != null && t.writeMessage(1, this.imageKey, e => e.serialize(t)),
                                                                                                                                i(this, he)[1] != null && t.writeMessage(2, this.contextFeature, e => e.serialize(t)))
                                                                                                                            }
                                                                                                                          }
                                                                                                                            ,
                                                                                                                            he = new WeakMap,
                                                                                                                            ac), Q, lc, fp = (lc = class {
                                                                                                                              constructor(t) {
                                                                                                                                p(this, Q, []);
                                                                                                                                Array.isArray(t) ? g(this, Q, t) : t && Object.assign(this, t)
                                                                                                                              }
                                                                                                                              get context() {
                                                                                                                                var t;
                                                                                                                                return new qs((t = i(this, Q))[0] ?? (t[0] = []))
                                                                                                                              }
                                                                                                                              set context(t) {
                                                                                                                                i(this, Q)[0] = t != null ? (t instanceof qs ? t : new qs(t)).toArray() : []
                                                                                                                              }
                                                                                                                              get localizationContext() {
                                                                                                                                var t;
                                                                                                                                return new ns((t = i(this, Q))[1] ?? (t[1] = []))
                                                                                                                              }
                                                                                                                              set localizationContext(t) {
                                                                                                                                i(this, Q)[1] = t != null ? (t instanceof ns ? t : new ns(t)).toArray() : []
                                                                                                                              }
                                                                                                                              get query() {
                                                                                                                                var t;
                                                                                                                                return ((t = i(this, Q))[2] ?? (t[2] = [])).map(e => new xo(e))
                                                                                                                              }
                                                                                                                              set query(t) {
                                                                                                                                i(this, Q)[2] = (t ?? []).map(e => (e instanceof xo ? e : new xo(e)).toArray())
                                                                                                                              }
                                                                                                                              get responseSpecification() {
                                                                                                                                var t;
                                                                                                                                return new ri((t = i(this, Q))[3] ?? (t[3] = []))
                                                                                                                              }
                                                                                                                              set responseSpecification(t) {
                                                                                                                                i(this, Q)[3] = t != null ? (t instanceof ri ? t : new ri(t)).toArray() : []
                                                                                                                              }
                                                                                                                              toArray() {
                                                                                                                                return i(this, Q)
                                                                                                                              }
                                                                                                                              toObject() {
                                                                                                                                return {
                                                                                                                                  context: this.context.toObject(),
                                                                                                                                  localizationContext: this.localizationContext.toObject(),
                                                                                                                                  query: (this.query ?? []).map(t => t.toObject()),
                                                                                                                                  responseSpecification: this.responseSpecification.toObject()
                                                                                                                                }
                                                                                                                              }
                                                                                                                              serialize(t) {
                                                                                                                                i(this, Q).length !== 0 && (i(this, Q)[0] != null && t.writeMessage(1, this.context, e => e.serialize(t)),
                                                                                                                                  i(this, Q)[1] != null && t.writeMessage(2, this.localizationContext, e => e.serialize(t)),
                                                                                                                                  i(this, Q)[2] != null && t.writeRepeatedMessage(3, this.query, e => e.serialize(t)),
                                                                                                                                  i(this, Q)[3] != null && t.writeMessage(4, this.responseSpecification, e => e.serialize(t)))
                                                                                                                              }
                                                                                                                            }
                                                                                                                              ,
                                                                                                                              Q = new WeakMap,
                                                                                                                              lc), ce, hc, gp = (hc = class {
                                                                                                                                constructor(t) {
                                                                                                                                  p(this, ce, []);
                                                                                                                                  Array.isArray(t) ? g(this, ce, t) : t && Object.assign(this, t)
                                                                                                                                }
                                                                                                                                get status() {
                                                                                                                                  var t;
                                                                                                                                  return new Hs((t = i(this, ce))[0] ?? (t[0] = []))
                                                                                                                                }
                                                                                                                                set status(t) {
                                                                                                                                  i(this, ce)[0] = t != null ? (t instanceof Hs ? t : new Hs(t)).toArray() : []
                                                                                                                                }
                                                                                                                                get result() {
                                                                                                                                  var t;
                                                                                                                                  return ((t = i(this, ce))[1] ?? (t[1] = [])).map(e => new Zs(e))
                                                                                                                                }
                                                                                                                                set result(t) {
                                                                                                                                  i(this, ce)[1] = (t ?? []).map(e => (e instanceof Zs ? e : new Zs(e)).toArray())
                                                                                                                                }
                                                                                                                                toArray() {
                                                                                                                                  return i(this, ce)
                                                                                                                                }
                                                                                                                                toObject() {
                                                                                                                                  return {
                                                                                                                                    status: this.status.toObject(),
                                                                                                                                    result: (this.result ?? []).map(t => t.toObject())
                                                                                                                                  }
                                                                                                                                }
                                                                                                                                serialize(t) {
                                                                                                                                  i(this, ce).length !== 0 && (i(this, ce)[0] != null && t.writeMessage(1, this.status, e => e.serialize(t)),
                                                                                                                                    i(this, ce)[1] != null && t.writeRepeatedMessage(2, this.result, e => e.serialize(t)))
                                                                                                                                }
                                                                                                                              }
                                                                                                                                ,
                                                                                                                                ce = new WeakMap,
                                                                                                                                hc), X, cc, ni = (cc = class {
                                                                                                                                  constructor(t) {
                                                                                                                                    p(this, X, []);
                                                                                                                                    Array.isArray(t) ? g(this, X, t) : t && Object.assign(this, t)
                                                                                                                                  }
                                                                                                                                  get streetviewLevelId() {
                                                                                                                                    return i(this, X)[0] ?? 0
                                                                                                                                  }
                                                                                                                                  set streetviewLevelId(t) {
                                                                                                                                    i(this, X)[0] = t
                                                                                                                                  }
                                                                                                                                  get ordinal() {
                                                                                                                                    return i(this, X)[1] ?? 0
                                                                                                                                  }
                                                                                                                                  set ordinal(t) {
                                                                                                                                    i(this, X)[1] = t
                                                                                                                                  }
                                                                                                                                  get levelName() {
                                                                                                                                    var t;
                                                                                                                                    return new ge((t = i(this, X))[2] ?? (t[2] = []))
                                                                                                                                  }
                                                                                                                                  set levelName(t) {
                                                                                                                                    i(this, X)[2] = t != null ? (t instanceof ge ? t : new ge(t)).toArray() : []
                                                                                                                                  }
                                                                                                                                  get levelNameAbbreviation() {
                                                                                                                                    var t;
                                                                                                                                    return new ge((t = i(this, X))[3] ?? (t[3] = []))
                                                                                                                                  }
                                                                                                                                  set levelNameAbbreviation(t) {
                                                                                                                                    i(this, X)[3] = t != null ? (t instanceof ge ? t : new ge(t)).toArray() : []
                                                                                                                                  }
                                                                                                                                  toArray() {
                                                                                                                                    return i(this, X)
                                                                                                                                  }
                                                                                                                                  toObject() {
                                                                                                                                    return {
                                                                                                                                      streetviewLevelId: this.streetviewLevelId,
                                                                                                                                      ordinal: this.ordinal,
                                                                                                                                      levelName: this.levelName.toObject(),
                                                                                                                                      levelNameAbbreviation: this.levelNameAbbreviation.toObject()
                                                                                                                                    }
                                                                                                                                  }
                                                                                                                                  serialize(t) {
                                                                                                                                    i(this, X).length !== 0 && (i(this, X)[0] != null && t.writeUint64(1, this.streetviewLevelId),
                                                                                                                                      i(this, X)[1] != null && t.writeFloat(2, this.ordinal),
                                                                                                                                      i(this, X)[2] != null && t.writeMessage(3, this.levelName, e => e.serialize(t)),
                                                                                                                                      i(this, X)[3] != null && t.writeMessage(4, this.levelNameAbbreviation, e => e.serialize(t)))
                                                                                                                                  }
                                                                                                                                }
                                                                                                                                  ,
                                                                                                                                  X = new WeakMap,
                                                                                                                                  cc), R, uc, So = (uc = class {
                                                                                                                                    constructor(t) {
                                                                                                                                      p(this, R, []);
                                                                                                                                      Array.isArray(t) ? g(this, R, t) : t && Object.assign(this, t)
                                                                                                                                    }
                                                                                                                                    get center() {
                                                                                                                                      var t;
                                                                                                                                      return new Ie((t = i(this, R))[0] ?? (t[0] = []))
                                                                                                                                    }
                                                                                                                                    set center(t) {
                                                                                                                                      i(this, R)[0] = t != null ? (t instanceof Ie ? t : new Ie(t)).toArray() : []
                                                                                                                                    }
                                                                                                                                    get radius() {
                                                                                                                                      return i(this, R)[1] ?? 0
                                                                                                                                    }
                                                                                                                                    set radius(t) {
                                                                                                                                      i(this, R)[1] = t
                                                                                                                                    }
                                                                                                                                    get level() {
                                                                                                                                      var t;
                                                                                                                                      return new ni((t = i(this, R))[2] ?? (t[2] = []))
                                                                                                                                    }
                                                                                                                                    set level(t) {
                                                                                                                                      i(this, R)[2] = t != null ? (t instanceof ni ? t : new ni(t)).toArray() : []
                                                                                                                                    }
                                                                                                                                    get preferredRoute() {
                                                                                                                                      var t;
                                                                                                                                      return new Ns((t = i(this, R))[3] ?? (t[3] = []))
                                                                                                                                    }
                                                                                                                                    set preferredRoute(t) {
                                                                                                                                      i(this, R)[3] = t != null ? (t instanceof Ns ? t : new Ns(t)).toArray() : []
                                                                                                                                    }
                                                                                                                                    get lookAtPoint() {
                                                                                                                                      var t;
                                                                                                                                      return new Ie((t = i(this, R))[4] ?? (t[4] = []))
                                                                                                                                    }
                                                                                                                                    set lookAtPoint(t) {
                                                                                                                                      i(this, R)[4] = t != null ? (t instanceof Ie ? t : new Ie(t)).toArray() : []
                                                                                                                                    }
                                                                                                                                    get tag() {
                                                                                                                                      return i(this, R)[5] ?? ""
                                                                                                                                    }
                                                                                                                                    set tag(t) {
                                                                                                                                      i(this, R)[5] = t
                                                                                                                                    }
                                                                                                                                    toArray() {
                                                                                                                                      return i(this, R)
                                                                                                                                    }
                                                                                                                                    toObject() {
                                                                                                                                      return {
                                                                                                                                        center: this.center.toObject(),
                                                                                                                                        radius: this.radius,
                                                                                                                                        level: this.level.toObject(),
                                                                                                                                        preferredRoute: this.preferredRoute.toObject(),
                                                                                                                                        lookAtPoint: this.lookAtPoint.toObject(),
                                                                                                                                        tag: this.tag
                                                                                                                                      }
                                                                                                                                    }
                                                                                                                                    serialize(t) {
                                                                                                                                      i(this, R).length !== 0 && (i(this, R)[0] != null && t.writeMessage(1, this.center, e => e.serialize(t)),
                                                                                                                                        i(this, R)[1] != null && t.writeDouble(2, this.radius),
                                                                                                                                        i(this, R)[2] != null && t.writeMessage(3, this.level, e => e.serialize(t)),
                                                                                                                                        i(this, R)[3] != null && t.writeMessage(4, this.preferredRoute, e => e.serialize(t)),
                                                                                                                                        i(this, R)[4] != null && t.writeMessage(5, this.lookAtPoint, e => e.serialize(t)),
                                                                                                                                        i(this, R)[5] != null && t.writeString(6, this.tag))
                                                                                                                                    }
                                                                                                                                  }
                                                                                                                                    ,
                                                                                                                                    R = new WeakMap,
                                                                                                                                    uc), ue, dc, _o = (dc = class {
                                                                                                                                      constructor(t) {
                                                                                                                                        p(this, ue, []);
                                                                                                                                        Array.isArray(t) ? g(this, ue, t) : t && Object.assign(this, t)
                                                                                                                                      }
                                                                                                                                      get height() {
                                                                                                                                        return i(this, ue)[0] ?? 0
                                                                                                                                      }
                                                                                                                                      set height(t) {
                                                                                                                                        i(this, ue)[0] = t
                                                                                                                                      }
                                                                                                                                      get width() {
                                                                                                                                        return i(this, ue)[1] ?? 0
                                                                                                                                      }
                                                                                                                                      set width(t) {
                                                                                                                                        i(this, ue)[1] = t
                                                                                                                                      }
                                                                                                                                      toArray() {
                                                                                                                                        return i(this, ue)
                                                                                                                                      }
                                                                                                                                      toObject() {
                                                                                                                                        return {
                                                                                                                                          height: this.height,
                                                                                                                                          width: this.width
                                                                                                                                        }
                                                                                                                                      }
                                                                                                                                      serialize(t) {
                                                                                                                                        i(this, ue).length !== 0 && (i(this, ue)[0] != null && t.writeInt32(1, this.height),
                                                                                                                                          i(this, ue)[1] != null && t.writeInt32(2, this.width))
                                                                                                                                      }
                                                                                                                                    }
                                                                                                                                      ,
                                                                                                                                      ue = new WeakMap,
                                                                                                                                      dc), xt, fc, Eo = (fc = class {
                                                                                                                                        constructor(t) {
                                                                                                                                          p(this, xt, []);
                                                                                                                                          Array.isArray(t) ? g(this, xt, t) : t && Object.assign(this, t)
                                                                                                                                        }
                                                                                                                                        get minDimensions() {
                                                                                                                                          var t;
                                                                                                                                          return ((t = i(this, xt))[0] ?? (t[0] = [])).map(e => new _o(e))
                                                                                                                                        }
                                                                                                                                        set minDimensions(t) {
                                                                                                                                          i(this, xt)[0] = (t ?? []).map(e => (e instanceof _o ? e : new _o(e)).toArray())
                                                                                                                                        }
                                                                                                                                        get suppressAnimation() {
                                                                                                                                          return i(this, xt)[1] ?? !1
                                                                                                                                        }
                                                                                                                                        set suppressAnimation(t) {
                                                                                                                                          i(this, xt)[1] = t
                                                                                                                                        }
                                                                                                                                        get forceCrop() {
                                                                                                                                          return i(this, xt)[3] ?? !1
                                                                                                                                        }
                                                                                                                                        set forceCrop(t) {
                                                                                                                                          i(this, xt)[3] = t
                                                                                                                                        }
                                                                                                                                        toArray() {
                                                                                                                                          return i(this, xt)
                                                                                                                                        }
                                                                                                                                        toObject() {
                                                                                                                                          return {
                                                                                                                                            minDimensions: (this.minDimensions ?? []).map(t => t.toObject()),
                                                                                                                                            suppressAnimation: this.suppressAnimation,
                                                                                                                                            forceCrop: this.forceCrop
                                                                                                                                          }
                                                                                                                                        }
                                                                                                                                        serialize(t) {
                                                                                                                                          i(this, xt).length !== 0 && (i(this, xt)[0] != null && t.writeRepeatedMessage(1, this.minDimensions, e => e.serialize(t)),
                                                                                                                                            i(this, xt)[1] != null && t.writeBool(2, this.suppressAnimation),
                                                                                                                                            i(this, xt)[3] != null && t.writeBool(4, this.forceCrop))
                                                                                                                                        }
                                                                                                                                      }
                                                                                                                                        ,
                                                                                                                                        xt = new WeakMap,
                                                                                                                                        fc), Xe, gc, ko = (gc = class {
                                                                                                                                          constructor(t) {
                                                                                                                                            p(this, Xe, []);
                                                                                                                                            Array.isArray(t) ? g(this, Xe, t) : t && Object.assign(this, t)
                                                                                                                                          }
                                                                                                                                          get thumbnailOptions() {
                                                                                                                                            var t;
                                                                                                                                            return new Eo((t = i(this, Xe))[1] ?? (t[1] = []))
                                                                                                                                          }
                                                                                                                                          set thumbnailOptions(t) {
                                                                                                                                            i(this, Xe)[1] = t != null ? (t instanceof Eo ? t : new Eo(t)).toArray() : []
                                                                                                                                          }
                                                                                                                                          toArray() {
                                                                                                                                            return i(this, Xe)
                                                                                                                                          }
                                                                                                                                          toObject() {
                                                                                                                                            return {
                                                                                                                                              thumbnailOptions: this.thumbnailOptions.toObject()
                                                                                                                                            }
                                                                                                                                          }
                                                                                                                                          serialize(t) {
                                                                                                                                            i(this, Xe).length !== 0 && i(this, Xe)[1] != null && t.writeMessage(2, this.thumbnailOptions, e => e.serialize(t))
                                                                                                                                          }
                                                                                                                                        }
                                                                                                                                          ,
                                                                                                                                          Xe = new WeakMap,
                                                                                                                                          gc), St, pc, oi = (pc = class {
                                                                                                                                            constructor(t) {
                                                                                                                                              p(this, St, []);
                                                                                                                                              Array.isArray(t) ? g(this, St, t) : t && Object.assign(this, t)
                                                                                                                                            }
                                                                                                                                            get filterOptions() {
                                                                                                                                              var t;
                                                                                                                                              return new Qs((t = i(this, St))[0] ?? (t[0] = []))
                                                                                                                                            }
                                                                                                                                            set filterOptions(t) {
                                                                                                                                              i(this, St)[0] = t != null ? (t instanceof Qs ? t : new Qs(t)).toArray() : []
                                                                                                                                            }
                                                                                                                                            get localizationContext() {
                                                                                                                                              var t;
                                                                                                                                              return new ns((t = i(this, St))[1] ?? (t[1] = []))
                                                                                                                                            }
                                                                                                                                            set localizationContext(t) {
                                                                                                                                              i(this, St)[1] = t != null ? (t instanceof ns ? t : new ns(t)).toArray() : []
                                                                                                                                            }
                                                                                                                                            get layoutOptions() {
                                                                                                                                              var t;
                                                                                                                                              return new ko((t = i(this, St))[2] ?? (t[2] = []))
                                                                                                                                            }
                                                                                                                                            set layoutOptions(t) {
                                                                                                                                              i(this, St)[2] = t != null ? (t instanceof ko ? t : new ko(t)).toArray() : []
                                                                                                                                            }
                                                                                                                                            toArray() {
                                                                                                                                              return i(this, St)
                                                                                                                                            }
                                                                                                                                            toObject() {
                                                                                                                                              return {
                                                                                                                                                filterOptions: this.filterOptions.toObject(),
                                                                                                                                                localizationContext: this.localizationContext.toObject(),
                                                                                                                                                layoutOptions: this.layoutOptions.toObject()
                                                                                                                                              }
                                                                                                                                            }
                                                                                                                                            serialize(t) {
                                                                                                                                              i(this, St).length !== 0 && (i(this, St)[0] != null && t.writeMessage(1, this.filterOptions, e => e.serialize(t)),
                                                                                                                                                i(this, St)[1] != null && t.writeMessage(2, this.localizationContext, e => e.serialize(t)),
                                                                                                                                                i(this, St)[2] != null && t.writeMessage(3, this.layoutOptions, e => e.serialize(t)))
                                                                                                                                            }
                                                                                                                                          }
                                                                                                                                            ,
                                                                                                                                            St = new WeakMap,
                                                                                                                                            pc), ts, yc, zo = (yc = class {
                                                                                                                                              constructor(t) {
                                                                                                                                                p(this, ts, []);
                                                                                                                                                Array.isArray(t) ? g(this, ts, t) : t && Object.assign(this, t)
                                                                                                                                              }
                                                                                                                                              get options() {
                                                                                                                                                var t;
                                                                                                                                                return ((t = i(this, ts))[0] ?? (t[0] = [])).map(e => new oi(e))
                                                                                                                                              }
                                                                                                                                              set options(t) {
                                                                                                                                                i(this, ts)[0] = (t ?? []).map(e => (e instanceof oi ? e : new oi(e)).toArray())
                                                                                                                                              }
                                                                                                                                              toArray() {
                                                                                                                                                return i(this, ts)
                                                                                                                                              }
                                                                                                                                              toObject() {
                                                                                                                                                return {
                                                                                                                                                  options: (this.options ?? []).map(t => t.toObject())
                                                                                                                                                }
                                                                                                                                              }
                                                                                                                                              serialize(t) {
                                                                                                                                                i(this, ts).length !== 0 && i(this, ts)[0] != null && t.writeRepeatedMessage(1, this.options, e => e.serialize(t))
                                                                                                                                              }
                                                                                                                                            }
                                                                                                                                              ,
                                                                                                                                              ts = new WeakMap,
                                                                                                                                              yc), tt, mc, $o = (mc = class {
                                                                                                                                                constructor(t) {
                                                                                                                                                  p(this, tt, []);
                                                                                                                                                  Array.isArray(t) ? g(this, tt, t) : t && Object.assign(this, t)
                                                                                                                                                }
                                                                                                                                                get featureSet() {
                                                                                                                                                  var t;
                                                                                                                                                  return ((t = i(this, tt))[0] ?? (t[0] = [])).map(e => new Vs(e))
                                                                                                                                                }
                                                                                                                                                set featureSet(t) {
                                                                                                                                                  i(this, tt)[0] = (t ?? []).map(e => (e instanceof Vs ? e : new Vs(e)).toArray())
                                                                                                                                                }
                                                                                                                                                get queryOptions() {
                                                                                                                                                  var t;
                                                                                                                                                  return new oi((t = i(this, tt))[1] ?? (t[1] = []))
                                                                                                                                                }
                                                                                                                                                set queryOptions(t) {
                                                                                                                                                  i(this, tt)[1] = t != null ? (t instanceof oi ? t : new oi(t)).toArray() : []
                                                                                                                                                }
                                                                                                                                                get tag() {
                                                                                                                                                  return i(this, tt)[2] ?? ""
                                                                                                                                                }
                                                                                                                                                set tag(t) {
                                                                                                                                                  i(this, tt)[2] = t
                                                                                                                                                }
                                                                                                                                                get queryOptionList() {
                                                                                                                                                  var t;
                                                                                                                                                  return new zo((t = i(this, tt))[4] ?? (t[4] = []))
                                                                                                                                                }
                                                                                                                                                set queryOptionList(t) {
                                                                                                                                                  i(this, tt)[4] = t != null ? (t instanceof zo ? t : new zo(t)).toArray() : []
                                                                                                                                                }
                                                                                                                                                toArray() {
                                                                                                                                                  return i(this, tt)
                                                                                                                                                }
                                                                                                                                                toObject() {
                                                                                                                                                  return {
                                                                                                                                                    featureSet: (this.featureSet ?? []).map(t => t.toObject()),
                                                                                                                                                    queryOptions: this.queryOptions.toObject(),
                                                                                                                                                    tag: this.tag,
                                                                                                                                                    queryOptionList: this.queryOptionList.toObject()
                                                                                                                                                  }
                                                                                                                                                }
                                                                                                                                                serialize(t) {
                                                                                                                                                  i(this, tt).length !== 0 && (i(this, tt)[0] != null && t.writeRepeatedMessage(1, this.featureSet, e => e.serialize(t)),
                                                                                                                                                    i(this, tt)[1] != null && t.writeMessage(2, this.queryOptions, e => e.serialize(t)),
                                                                                                                                                    i(this, tt)[2] != null && t.writeString(3, this.tag),
                                                                                                                                                    i(this, tt)[4] != null && t.writeMessage(5, this.queryOptionList, e => e.serialize(t)))
                                                                                                                                                }
                                                                                                                                              }
                                                                                                                                                ,
                                                                                                                                                tt = new WeakMap,
                                                                                                                                                mc), j, bc, pp = (bc = class {
                                                                                                                                                  constructor(t) {
                                                                                                                                                    p(this, j, []);
                                                                                                                                                    Array.isArray(t) ? g(this, j, t) : t && Object.assign(this, t)
                                                                                                                                                  }
                                                                                                                                                  get context() {
                                                                                                                                                    var t;
                                                                                                                                                    return new qs((t = i(this, j))[0] ?? (t[0] = []))
                                                                                                                                                  }
                                                                                                                                                  set context(t) {
                                                                                                                                                    i(this, j)[0] = t != null ? (t instanceof qs ? t : new qs(t)).toArray() : []
                                                                                                                                                  }
                                                                                                                                                  get queryOptions() {
                                                                                                                                                    var t;
                                                                                                                                                    return new vo((t = i(this, j))[2] ?? (t[2] = []))
                                                                                                                                                  }
                                                                                                                                                  set queryOptions(t) {
                                                                                                                                                    i(this, j)[2] = t != null ? (t instanceof vo ? t : new vo(t)).toArray() : []
                                                                                                                                                  }
                                                                                                                                                  get responseSpecification() {
                                                                                                                                                    var t;
                                                                                                                                                    return new ri((t = i(this, j))[3] ?? (t[3] = []))
                                                                                                                                                  }
                                                                                                                                                  set responseSpecification(t) {
                                                                                                                                                    i(this, j)[3] = t != null ? (t instanceof ri ? t : new ri(t)).toArray() : []
                                                                                                                                                  }
                                                                                                                                                  get imageKey() {
                                                                                                                                                    var t;
                                                                                                                                                    return new q((t = i(this, j))[4] ?? (t[4] = []))
                                                                                                                                                  }
                                                                                                                                                  set imageKey(t) {
                                                                                                                                                    i(this, j)[4] = t != null ? (t instanceof q ? t : new q(t)).toArray() : []
                                                                                                                                                  }
                                                                                                                                                  get location() {
                                                                                                                                                    var t;
                                                                                                                                                    return new So((t = i(this, j))[1] ?? (t[1] = []))
                                                                                                                                                  }
                                                                                                                                                  set location(t) {
                                                                                                                                                    i(this, j)[1] = t != null ? (t instanceof So ? t : new So(t)).toArray() : []
                                                                                                                                                  }
                                                                                                                                                  get feature() {
                                                                                                                                                    var t;
                                                                                                                                                    return new $o((t = i(this, j))[7] ?? (t[7] = []))
                                                                                                                                                  }
                                                                                                                                                  set feature(t) {
                                                                                                                                                    i(this, j)[7] = t != null ? (t instanceof $o ? t : new $o(t)).toArray() : []
                                                                                                                                                  }
                                                                                                                                                  get referrerUrl() {
                                                                                                                                                    return i(this, j)[8] ?? ""
                                                                                                                                                  }
                                                                                                                                                  set referrerUrl(t) {
                                                                                                                                                    i(this, j)[8] = t
                                                                                                                                                  }
                                                                                                                                                  toArray() {
                                                                                                                                                    return i(this, j)
                                                                                                                                                  }
                                                                                                                                                  toObject() {
                                                                                                                                                    return {
                                                                                                                                                      context: this.context.toObject(),
                                                                                                                                                      queryOptions: this.queryOptions.toObject(),
                                                                                                                                                      responseSpecification: this.responseSpecification.toObject(),
                                                                                                                                                      imageKey: this.imageKey.toObject(),
                                                                                                                                                      location: this.location.toObject(),
                                                                                                                                                      feature: this.feature.toObject(),
                                                                                                                                                      referrerUrl: this.referrerUrl
                                                                                                                                                    }
                                                                                                                                                  }
                                                                                                                                                  serialize(t) {
                                                                                                                                                    i(this, j).length !== 0 && (i(this, j)[0] != null && t.writeMessage(1, this.context, e => e.serialize(t)),
                                                                                                                                                      i(this, j)[2] != null && t.writeMessage(3, this.queryOptions, e => e.serialize(t)),
                                                                                                                                                      i(this, j)[3] != null && t.writeMessage(4, this.responseSpecification, e => e.serialize(t)),
                                                                                                                                                      i(this, j)[4] != null && t.writeMessage(5, this.imageKey, e => e.serialize(t)),
                                                                                                                                                      i(this, j)[1] != null && t.writeMessage(2, this.location, e => e.serialize(t)),
                                                                                                                                                      i(this, j)[7] != null && t.writeMessage(8, this.feature, e => e.serialize(t)),
                                                                                                                                                      i(this, j)[8] != null && t.writeString(9, this.referrerUrl))
                                                                                                                                                  }
                                                                                                                                                }
                                                                                                                                                  ,
                                                                                                                                                  j = new WeakMap,
                                                                                                                                                  bc), de, wc, yp = (wc = class {
                                                                                                                                                    constructor(t) {
                                                                                                                                                      p(this, de, []);
                                                                                                                                                      Array.isArray(t) ? g(this, de, t) : t && Object.assign(this, t)
                                                                                                                                                    }
                                                                                                                                                    get status() {
                                                                                                                                                      var t;
                                                                                                                                                      return new Hs((t = i(this, de))[0] ?? (t[0] = []))
                                                                                                                                                    }
                                                                                                                                                    set status(t) {
                                                                                                                                                      i(this, de)[0] = t != null ? (t instanceof Hs ? t : new Hs(t)).toArray() : []
                                                                                                                                                    }
                                                                                                                                                    get result() {
                                                                                                                                                      var t;
                                                                                                                                                      return new Zs((t = i(this, de))[1] ?? (t[1] = []))
                                                                                                                                                    }
                                                                                                                                                    set result(t) {
                                                                                                                                                      i(this, de)[1] = t != null ? (t instanceof Zs ? t : new Zs(t)).toArray() : []
                                                                                                                                                    }
                                                                                                                                                    toArray() {
                                                                                                                                                      return i(this, de)
                                                                                                                                                    }
                                                                                                                                                    toObject() {
                                                                                                                                                      return {
                                                                                                                                                        status: this.status.toObject(),
                                                                                                                                                        result: this.result.toObject()
                                                                                                                                                      }
                                                                                                                                                    }
                                                                                                                                                    serialize(t) {
                                                                                                                                                      i(this, de).length !== 0 && (i(this, de)[0] != null && t.writeMessage(1, this.status, e => e.serialize(t)),
                                                                                                                                                        i(this, de)[1] != null && t.writeMessage(2, this.result, e => e.serialize(t)))
                                                                                                                                                    }
                                                                                                                                                  }
                                                                                                                                                    ,
                                                                                                                                                    de = new WeakMap,
                                                                                                                                                    wc);
function mp(t) {
  if (t.startsWith("F:"))
    return new q({
      type: rs.USER_PHOTO,
      id: t.slice(2)
    });
  if (/^[-_A-Za-z0-9]{21}[AQgw]$/.test(t))
    return new q({
      type: rs.OFFICIAL,
      id: t
    });
  try {
    const e = hu(t)
      , s = new uu(e);
    return s.readFields((r, n) => {
      r === 1 ? n.type = s.readVarint() : r === 2 && (n.id = s.readString())
    }
      , new q)
  } catch {
    return new q({
      type: rs.OFFICIAL,
      id: t
    })
  }
}
function Sr(t) {
  if (!t.id)
    return "";
  if (t.type === rs.OFFICIAL)
    return t.id;
  if (t.type === rs.USER_PHOTO)
    return `F:${t.id}`;
  const e = new uu(new Uint8Array(64));
  return e.writeVarintField(1, t.type),
    e.writeStringField(2, t.id),
    cu(e.finish(), e.length)
}
var fu = (t => (t.DEFAULT = "default",
  t.GOOGLE = "google",
  t.OUTDOOR = "outdoor",
  t))(fu || {}), bp = class {
    constructor(t, e) {
      this.width = t,
        this.height = e
    }
    equals(t) {
      return t != null && this.width === t.width && this.height === t.height
    }
    toString() {
      return Object.prototype.toString.call(this)
    }
  }
  , es, ss, vc, wp = (vc = class {
    constructor(t, e) {
      p(this, es, 0);
      p(this, ss, 0);
      g(this, es, t),
        g(this, ss, e)
    }
    equals(t) {
      return t != null && i(this, es) === t.lat() && i(this, ss) === t.lng()
    }
    lat() {
      return i(this, es)
    }
    lng() {
      return i(this, ss)
    }
    toJSON() {
      return {
        lat: i(this, es),
        lng: i(this, ss)
      }
    }
    toString() {
      return `(${i(this, es)}, ${i(this, ss)})`
    }
    toUrlValue(t) {
      return `${i(this, es).toFixed(t)},${i(this, ss).toFixed(t)}`
    }
  }
    ,
    es = new WeakMap,
    ss = new WeakMap,
    vc), Ac, Dt = typeof window == "object" ? (Ac = window.google) == null ? void 0 : Ac.maps : null, yl = (Dt == null ? void 0 : Dt.Size) ?? bp, vp = (Dt == null ? void 0 : Dt.LatLng) ?? wp, Wo = (Dt == null ? void 0 : Dt.StreetViewSource) ?? fu, Ap = class {
      async getPanorama() {
        throw new Error("Unimplemented")
      }
    }
  , Op = (Dt == null ? void 0 : Dt.StreetViewService) ?? Ap;
function xp(t) {
  for (const e of t.time)
    e.date = Object.values(e).find(s => s instanceof Date)
}
async function gu(t, e, { signal: s } = {}) {
  const r = `https://maps.googleapis.com/$rpc/google.internal.maps.mapsjs.v1.MapsJsInternalService/${t}`;
  return await (await fetch(r, {
    method: "POST",
    headers: {
      "content-type": "application/json+protobuf",
      "x-user-agent": "grpc-web-javascript/0.1"
    },
    body: JSON.stringify(e.toArray()),
    mode: "cors",
    credentials: "omit",
    signal: s
  })).json()
}
function pu(t) {
  var r, n, o, a;
  if (t.status.code !== 1)
    return null;
  const e = t.location[0];
  if (e == null)
    return null;
  const s = e.panoramaRefs.panorama;
  return {
    copyright: (r = t.attribution.item[0]) == null ? void 0 : r.name.text,
    location: {
      profileUrl: ((n = t.attribution.author[0]) == null ? void 0 : n.profileUrl) ?? void 0,
      description: t.description.part.map(l => l.text).join(", "),
      latLng: new vp(e.location.position.lat, e.location.position.lng),
      pano: Sr(t.panoId),
      shortDescription: ((o = t.description.part[0]) == null ? void 0 : o.text) ?? ""
    },
    imageDate: `${String(t.includesDate.date.year ?? 0).padStart(4, "0")}-${String(t.includesDate.date.month ?? 0).padStart(2, "0")}`,
    links: e.link.map(l => {
      var h;
      return {
        pano: Sr(s[l.target].panoId),
        description: ((h = s[l.target].description.part[0]) == null ? void 0 : h.text) ?? "",
        heading: l.properties.heading
      }
    }
    ),
    time: e.time.map(l => ({
      pano: Sr(s[l.target].panoId),
      date: new Date(l.date.year ?? 0, l.date.month ?? 0, l.date.day ?? 0)
    })).concat({
      pano: Sr(t.panoId),
      date: new Date(t.includesDate.date.year ?? 0, t.includesDate.date.month ?? 0, t.includesDate.date.day ?? 0)
    }).sort((l, h) => l.date.getTime() - h.date.getTime()),
    tiles: {
      centerHeading: e.location.pov.heading ?? 0,
      originHeading: e.location.pov.heading ?? 0,
      originPitch: (e.location.pov.tilt ?? 90) - 90,
      tileSize: new yl(t.tiles.tileSize.tileSize.width ?? 0, t.tiles.tileSize.tileSize.height ?? 0),
      worldSize: new yl(t.tiles.worldSize.width ?? 0, t.tiles.worldSize.height ?? 0),
      getTileUrl(l, h, u, c) {
        const d = new URL("https://streetviewpixels-pa.googleapis.com/v1/tile");
        return d.searchParams.set("cb_client", "apiv3"),
          d.searchParams.set("panoid", l),
          d.searchParams.set("output", "tile"),
          d.searchParams.set("x", String(u)),
          d.searchParams.set("y", String(c)),
          d.searchParams.set("zoom", String(h)),
          d.searchParams.set("fover", "2"),
          d.href
      }
    },
    extra: {
      panoType: t.panoId.type,
      countryCode: e.location.countryCode || null,
      uploaderName: ((a = t.attribution.author[0]) == null ? void 0 : a.name.text) || null
    }
  }
}
async function Sp(t) {
  const e = new fp({
    context: {
      client: "apiv3",
      language: "en"
    },
    localizationContext: {
      language: "en",
      regionCode: "US"
    },
    query: t.map(n => ({
      imageKey: mp(n)
    })),
    responseSpecification: {
      components: [Ae.IncludeTileData, Ae.IncludeDescription, Ae.IncludeCopyright, 4, Ae.AddressControl, Ae.IncludeLinkedPanoramas]
    }
  })
    , s = await gu("GetMetadata", e)
    , r = new gp(s);
  return r.status == null || r.status.code === 3 || r.status.code === 5 ? t.map(() => null) : r.status.code !== 0 ? t.map(() => null) : r.result.map(pu)
}
async function _p(t) {
  const e = new Set(t.sources ?? (t.source ? [t.source] : void 0))
    , s = Dt != null && t.location instanceof google.maps.LatLng ? t.location.toJSON() : t.location
    , r = e.has(Wo.OUTDOOR)
    , n = t.preference === "best" ? Ko.BEST : Ko.CLOSEST
    , o = [{
      frontend: rs.OFFICIAL,
      tiled: !0,
      imageFormat: Dr.PHOTOSPHERE
    }];
  e.has(Wo.GOOGLE) || (o.push({
    frontend: rs.USER_PHOTO,
    tiled: !0,
    imageFormat: Dr.PHOTOSPHERE
  }),
    o.push({
      frontend: rs.USER_UPLOADED,
      tiled: !0,
      imageFormat: Dr.PHOTOSPHERE
    }));
  const a = new pp({
    context: {
      client: "apiv3",
      language: "US"
    },
    location: {
      center: s,
      radius: t.radius ?? 25
    },
    queryOptions: {
      localizationContext: {
        language: "en"
      },
      filterOptions: {
        restrictToDirectionsAppropriate: r
      },
      rankingOptions: {
        rankingStrategy: n
      },
      clientCapabilities: {
        supportedRenderStrategy: o
      }
    },
    responseSpecification: {
      components: [Ae.IncludeTileData, Ae.IncludeDescription, Ae.IncludeCopyright, 4, Ae.AddressControl, Ae.IncludeLinkedPanoramas]
    }
  })
    , l = await gu("SingleImageSearch", a)
    , h = new yp(l);
  return h.status == null || h.status.code !== 0 || h.result == null ? null : pu(h.result)
}
var hr, Oc, Ep = (Oc = class extends Op {
  constructor(e = {}) {
    super();
    p(this, hr);
    g(this, hr, new dp(Sp, {
      maxBatchSize: 50,
      cacheMap: e.cache
    }))
  }
  async getPanorama(e) {
    try {
      if ("pano" in e) {
        const s = await i(this, hr).load(e.pano);
        if (!s)
          throw new Error("No results");
        return {
          data: s
        }
      } else if ("location" in e) {
        const s = await _p(e);
        if (!s)
          throw new Error("No results");
        return {
          data: s
        }
      }
      throw new Error("unsupported options")
    } catch (s) {
      if (s instanceof Error && s.message === "No results")
        throw s;
      console.warn("@sv-tools/service: fallback to official getPanorama()", s);
      const { data: r } = await super.getPanorama(e);
      return xp(r),
      {
        data: r
      }
    }
  }
}
  ,
  hr = new WeakMap,
  Oc);
const ml = Symbol.for("constructDateFrom");
function ks(t, e) {
  return typeof t == "function" ? t(e) : t && typeof t == "object" && ml in t ? t[ml](e) : t instanceof Date ? new t.constructor(e) : new Date(e)
}
function gs(t, e) {
  return ks(e || t, t)
}
function yu(t, e, s) {
  const r = gs(t, s == null ? void 0 : s.in);
  return isNaN(e) ? ks(t, NaN) : (e && r.setDate(r.getDate() + e),
    r)
}
function mu(t, e, s) {
  const r = gs(t, s == null ? void 0 : s.in);
  if (isNaN(e))
    return ks(t, NaN);
  if (!e)
    return r;
  const n = r.getDate()
    , o = ks(t, r.getTime());
  o.setMonth(r.getMonth() + e + 1, 0);
  const a = o.getDate();
  return n >= a ? o : (r.setFullYear(o.getFullYear(), o.getMonth(), n),
    r)
}
function kp(t, ...e) {
  const s = ks.bind(null, e.find(r => typeof r == "object"));
  return e.map(s)
}
function Go(t, e) {
  const s = gs(t, e == null ? void 0 : e.in);
  return s.setHours(0, 0, 0, 0),
    s
}
function zp(t, e, s) {
  return yu(t, e * 7, s)
}
function $p(t, e, s) {
  return mu(t, e * 12, s)
}
function Cp(t, e) {
  let s, r = e == null ? void 0 : e.in;
  return t.forEach(n => {
    !r && typeof n == "object" && (r = ks.bind(null, n));
    const o = gs(n, r);
    (!s || s > o || isNaN(+o)) && (s = o)
  }
  ),
    ks(r, s || NaN)
}
function wa(t, e, s) {
  const [r, n] = kp(s == null ? void 0 : s.in, t, e);
  return +Go(r) == +Go(n)
}
function Dp(t) {
  return t instanceof Date || typeof t == "object" && Object.prototype.toString.call(t) === "[object Date]"
}
function Lp(t) {
  return !(!Dp(t) && typeof t != "number" || isNaN(+gs(t)))
}
function Co(t, e) {
  const s = t < 0 ? "-" : ""
    , r = Math.abs(t).toString().padStart(e, "0");
  return s + r
}
function Pp(t, e) {
  const s = gs(t, e == null ? void 0 : e.in);
  if (!Lp(s))
    throw new RangeError("Invalid time value");
  const r = (e == null ? void 0 : e.format) ?? "extended";
  let n = "";
  const o = r === "extended" ? "-" : "";
  {
    const a = Co(s.getDate(), 2)
      , l = Co(s.getMonth() + 1, 2);
    n = `${Co(s.getFullYear(), 4)}${o}${l}${o}${a}`
  }
  return n
}
function Tp(t, e) {
  return +gs(t) > +gs(e)
}
function jp(t, e, s) {
  return yu(t, -e, s)
}
function Mp(t, e, s) {
  return mu(t, -e, s)
}
function Ip(t, e, s) {
  return zp(t, -e, s)
}
function Fp(t, e, s) {
  return $p(t, -e, s)
}
const bl = t => t * t
  , Rp = t => 2 * Math.atan2(Math.sqrt(t), Math.sqrt(1 - t))
  , Up = (t, e, s, r, n = 6371) => n * Rp(bl(Math.sin((s - t) / 2)) + Math.cos(t) * Math.cos(s) * bl(Math.sin((r - e) / 2)));
new Date().toISOString();
function Ms(t) {
  return t.id === "now" ? !1 : t.id >= 1350 && t.tile_type === "vtdeprecated"
}
function Bp(t, e) {
  const s = [];
  if (Ms(t) && Ms(e) && s.push("Between 29 February and 19 April 2024, the blue lines layer included unofficial coverage."),
    (Ms(t) && !Ms(e) || Ms(e) && !Ms(t)) && s.push("Between 29 February and 19 April 2024, the blue lines layer included unofficial coverage. Comparing to these layers will show unofficial coverage as additions or deletions."),
    (e.id === "now" || e.tile_type === "svmap") && t.tile_type !== "svmap" && s.push("Before 20 April 2024, sv-map archived a different blue lines layer. Comparing to other dates causes artifacting at line edges and may show trekkers as additions or deletions."),
    s.length > 0)
    return s
}
function va(t) {
  return Object.fromEntries(Object.entries(t).map(([e, s]) => [s, e]))
}
var bu = {
  administrative: 1,
  "administrative.country": 17,
  "administrative.province": 18,
  "administrative.locality": 19,
  "administrative.neighborhood": 20,
  "administrative.land_parcel": 21,
  poi: 2,
  "poi.business": 33,
  "poi.government": 34,
  "poi.school": 35,
  "poi.medical": 36,
  "poi.attraction": 37,
  "poi.place_of_worship": 38,
  "poi.sports_complex": 39,
  "poi.park": 40,
  road: 3,
  "road.highway": 49,
  "road.highway.controlled_access": 785,
  "road.arterial": 50,
  "road.local": 51,
  "road.local.drivable": 817,
  "road.local.trail": 818,
  transit: 4,
  "transit.line": 65,
  "transit.line.rail": 1041,
  "transit.line.ferry": 1042,
  "transit.line.transit_layer": 1043,
  "transit.station": 66,
  "transit.station.rail": 1057,
  "transit.station.bus": 1058,
  "transit.station.airport": 1059,
  "transit.station.ferry": 1060,
  landscape: 5,
  "landscape.man_made": 81,
  "landscape.man_made.building": 1297,
  "landscape.man_made.business_corridor": 1299,
  "landscape.natural": 82,
  "landscape.natural.landcover": 1313,
  "landscape.natural.terrain": 1314,
  water: 6,
  "poi.business.shopping": 529,
  "poi.business.food_and_drink": 530,
  "poi.business.gas_station": 531,
  "poi.business.car_rental": 532,
  "poi.business.lodging": 533
}
  , Np = va(bu)
  , wu = {
    geometry: "g",
    "geometry.fill": "g.f",
    "geometry.stroke": "g.s",
    labels: "l",
    "labels.icon": "l.i",
    "labels.text": "l.t",
    "labels.text.fill": "l.t.f",
    "labels.text.stroke": "l.t.s"
  }
  , Vp = va(wu)
  , vu = {
    hue: "h",
    saturation: "s",
    lightness: "l",
    gamma: "g",
    invert_lightness: "il",
    visibility: "v",
    color: "c",
    weight: "w"
  }
  , qp = new Set(["saturation", "lightness", "gamma", "weight"])
  , Hp = va(vu);
function Au(t) {
  const e = t.map(({ featureType: s, elementType: r, stylers: n }) => {
    const o = []
      , a = s ? bu[s] : null;
    a != null && o.push(`s.t:${a}`);
    const l = r ? wu[r] : null;
    l != null && o.push(`s.e:${l}`);
    for (const h of n)
      for (const [u, c] of Object.entries(h)) {
        const d = vu[u];
        d != null && o.push(`p.${d}:${c}`)
      }
    return o.join("|")
  }
  ).filter(s => s.length > 0);
  return e.length > 0 ? e.join(",") : null
}
function Kp(t) {
  return t.split(",").map(s => {
    const r = {
      stylers: []
    };
    for (const n of s.split("|")) {
      const [o, a] = n.split(":");
      if (!(o == null || a == null) && (o === "s.t" && (r.featureType = Np[a]),
        o === "s.e" && (r.elementType = Vp[a]),
        o.startsWith("p."))) {
        const l = Hp[o.slice(2)];
        l && (qp.has(l) ? r.stylers.push({
          [l]: Number.parseFloat(a)
        }) : r.stylers.push({
          [l]: a
        }))
      }
    }
    return r
  }
  )
}
var ai = Math.pow
  , nt = (t, e, s) => new Promise((r, n) => {
    var o = h => {
      try {
        l(s.next(h))
      } catch (u) {
        n(u)
      }
    }
      , a = h => {
        try {
          l(s.throw(h))
        } catch (u) {
          n(u)
        }
      }
      , l = h => h.done ? r(h.value) : Promise.resolve(h.value).then(o, a);
    l((s = s.apply(t, e)).next())
  }
  )
  , $t = Uint8Array
  , Xi = Uint16Array
  , Wp = Int32Array
  , Ou = new $t([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0])
  , xu = new $t([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0])
  , Gp = new $t([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15])
  , Su = function (t, e) {
    for (var s = new Xi(31), r = 0; r < 31; ++r)
      s[r] = e += 1 << t[r - 1];
    for (var n = new Wp(s[30]), r = 1; r < 30; ++r)
      for (var o = s[r]; o < s[r + 1]; ++o)
        n[o] = o - s[r] << 5 | r;
    return {
      b: s,
      r: n
    }
  }
  , _u = Su(Ou, 2)
  , Eu = _u.b
  , Yp = _u.r;
Eu[28] = 258,
  Yp[258] = 28;
var Zp = Su(xu, 0)
  , Jp = Zp.b
  , ku = new Xi(32768);
for (z = 0; z < 32768; ++z)
  je = (z & 43690) >> 1 | (z & 21845) << 1,
    je = (je & 52428) >> 2 | (je & 13107) << 2,
    je = (je & 61680) >> 4 | (je & 3855) << 4,
    ku[z] = ((je & 65280) >> 8 | (je & 255) << 8) >> 1;
var je, z, tr = function (t, e, s) {
  for (var r = t.length, n = 0, o = new Xi(e); n < r; ++n)
    t[n] && ++o[t[n] - 1];
  var a = new Xi(e);
  for (n = 1; n < e; ++n)
    a[n] = a[n - 1] + o[n - 1] << 1;
  var l;
  {
    l = new Xi(1 << e);
    var h = 15 - e;
    for (n = 0; n < r; ++n)
      if (t[n])
        for (var u = n << 4 | t[n], c = e - t[n], d = a[t[n] - 1]++ << c, f = d | (1 << c) - 1; d <= f; ++d)
          l[ku[d] >> h] = u
  }
  return l
}, pr = new $t(288);
for (z = 0; z < 144; ++z)
  pr[z] = 8;
var z;
for (z = 144; z < 256; ++z)
  pr[z] = 9;
var z;
for (z = 256; z < 280; ++z)
  pr[z] = 7;
var z;
for (z = 280; z < 288; ++z)
  pr[z] = 8;
var z, zu = new $t(32);
for (z = 0; z < 32; ++z)
  zu[z] = 5;
var z, Qp = tr(pr, 9), Xp = tr(zu, 5), Do = function (t) {
  for (var e = t[0], s = 1; s < t.length; ++s)
    t[s] > e && (e = t[s]);
  return e
}, me = function (t, e, s) {
  var r = e / 8 | 0;
  return (t[r] | t[r + 1] << 8) >> (e & 7) & s
}, Lo = function (t, e) {
  var s = e / 8 | 0;
  return (t[s] | t[s + 1] << 8 | t[s + 2] << 16) >> (e & 7)
}, t0 = function (t) {
  return (t + 7) / 8 | 0
}, e0 = function (t, e, s) {
  (s == null || s > t.length) && (s = t.length);
  var r = new $t(s - e);
  return r.set(t.subarray(e, s)),
    r
}, s0 = ["unexpected EOF", "invalid block type", "invalid length/literal", "invalid distance", "stream finished", "no stream handler", , "no callback", "invalid UTF-8 data", "extra field too long", "date not in range 1980-2099", "filename too long", "stream finishing", "invalid zip data"], zt = function (t, e, s) {
  var r = new Error(e || s0[t]);
  if (r.code = t,
    Error.captureStackTrace && Error.captureStackTrace(r, zt),
    !s)
    throw r;
  return r
}, Aa = function (t, e, s, r) {
  var n = t.length
    , o = 0;
  if (!n || e.f && !e.l)
    return s || new $t(0);
  var a = !s || e.i != 2
    , l = e.i;
  s || (s = new $t(n * 3));
  var h = function (ka) {
    var za = s.length;
    if (ka > za) {
      var $a = new $t(Math.max(za * 2, ka));
      $a.set(s),
        s = $a
    }
  }
    , u = e.f || 0
    , c = e.p || 0
    , d = e.b || 0
    , f = e.l
    , y = e.d
    , b = e.m
    , w = e.n
    , v = n * 8;
  do {
    if (!f) {
      u = me(t, c, 1);
      var E = me(t, c + 1, 3);
      if (c += 3,
        E)
        if (E == 1)
          f = Qp,
            y = Xp,
            b = 9,
            w = 5;
        else if (E == 2) {
          var Ci = me(t, c, 31) + 257
            , yr = me(t, c + 10, 15) + 4
            , M = Ci + me(t, c + 5, 31) + 1;
          c += 14;
          for (var N = new $t(M), Di = new $t(19), ct = 0; ct < yr; ++ct)
            Di[Gp[ct]] = me(t, c + ct * 3, 7);
          c += yr * 3;
          for (var Li = Do(Di), Ds = (1 << Li) - 1, mr = tr(Di, Li), ct = 0; ct < M;) {
            var Pi = mr[me(t, c, Ds)];
            c += Pi & 15;
            var P = Pi >> 4;
            if (P < 16)
              N[ct++] = P;
            else {
              var kt = 0
                , ps = 0;
              for (P == 16 ? (ps = 3 + me(t, c, 3),
                c += 2,
                kt = N[ct - 1]) : P == 17 ? (ps = 3 + me(t, c, 7),
                  c += 3) : P == 18 && (ps = 11 + me(t, c, 127),
                    c += 7); ps--;)
                N[ct++] = kt
            }
          }
          var ke = N.subarray(0, Ci)
            , it = N.subarray(Ci);
          b = Do(ke),
            w = Do(it),
            f = tr(ke, b),
            y = tr(it, w)
        } else
          zt(1);
      else {
        var P = t0(c) + 4
          , $i = t[P - 4] | t[P - 3] << 8
          , Cs = P + $i;
        if (Cs > n) {
          l && zt(0);
          break
        }
        a && h(d + $i),
          s.set(t.subarray(P, Cs), d),
          e.b = d += $i,
          e.p = c = Cs * 8,
          e.f = u;
        continue
      }
      if (c > v) {
        l && zt(0);
        break
      }
    }
    a && h(d + 131072);
    for (var br = (1 << b) - 1, wr = (1 << w) - 1, Zr = c; ; Zr = c) {
      var kt = f[Lo(t, c) & br]
        , Ls = kt >> 4;
      if (c += kt & 15,
        c > v) {
        l && zt(0);
        break
      }
      if (kt || zt(2),
        Ls < 256)
        s[d++] = Ls;
      else if (Ls == 256) {
        Zr = c,
          f = null;
        break
      } else {
        var _a = Ls - 254;
        if (Ls > 264) {
          var ct = Ls - 257
            , Ti = Ou[ct];
          _a = me(t, c, (1 << Ti) - 1) + Eu[ct],
            c += Ti
        }
        var Jr = y[Lo(t, c) & wr]
          , Qr = Jr >> 4;
        Jr || zt(3),
          c += Jr & 15;
        var it = Jp[Qr];
        if (Qr > 3) {
          var Ti = xu[Qr];
          it += Lo(t, c) & (1 << Ti) - 1,
            c += Ti
        }
        if (c > v) {
          l && zt(0);
          break
        }
        a && h(d + 131072);
        var Xr = d + _a;
        if (d < it) {
          var Ea = o - it
            , Ku = Math.min(it, Xr);
          for (Ea + d < 0 && zt(3); d < Ku; ++d)
            s[d] = r[Ea + d]
        }
        for (; d < Xr; d += 4)
          s[d] = s[d - it],
            s[d + 1] = s[d + 1 - it],
            s[d + 2] = s[d + 2 - it],
            s[d + 3] = s[d + 3 - it];
        d = Xr
      }
    }
    e.l = f,
      e.p = Zr,
      e.b = d,
      e.f = u,
      f && (u = 1,
        e.m = b,
        e.d = y,
        e.n = w)
  } while (!u);
  return d == s.length ? s : e0(s, 0, d)
}, i0 = new $t(0), r0 = function (t) {
  (t[0] != 31 || t[1] != 139 || t[2] != 8) && zt(6, "invalid gzip data");
  var e = t[3]
    , s = 10;
  e & 4 && (s += (t[10] | t[11] << 8) + 2);
  for (var r = (e >> 3 & 1) + (e >> 4 & 1); r > 0; r -= !t[s++])
    ;
  return s + (e & 2)
}, n0 = function (t) {
  var e = t.length;
  return (t[e - 4] | t[e - 3] << 8 | t[e - 2] << 16 | t[e - 1] << 24) >>> 0
}, o0 = function (t, e) {
  return ((t[0] & 15) != 8 || t[0] >> 4 > 7 || (t[0] << 8 | t[1]) % 31) && zt(6, "invalid zlib data"),
    (t[1] >> 5 & 1) == +!e && zt(6, "invalid zlib data: " + (t[1] & 32 ? "need" : "unexpected") + " dictionary"),
    (t[1] >> 3 & 4) + 2
};
function a0(t, e) {
  return Aa(t, {
    i: 2
  }, e, e)
}
function l0(t, e) {
  var s = r0(t);
  return s + 8 > t.length && zt(6, "invalid gzip data"),
    Aa(t.subarray(s, -8), {
      i: 2
    }, new $t(n0(t)), e)
}
function h0(t, e) {
  return Aa(t.subarray(o0(t, e), -4), {
    i: 2
  }, e, e)
}
function Yo(t, e) {
  return t[0] == 31 && t[1] == 139 && t[2] == 8 ? l0(t, e) : (t[0] & 15) != 8 || t[0] >> 4 > 7 || (t[0] << 8 | t[1]) % 31 ? a0(t, e) : h0(t, e)
}
var c0 = typeof TextDecoder < "u" && new TextDecoder
  , u0 = 0;
try {
  c0.decode(i0, {
    stream: !0
  }),
    u0 = 1
} catch { }
var $u = (t, e) => t * ai(2, e)
  , Ni = (t, e) => Math.floor(t / ai(2, e))
  , jr = (t, e) => $u(t.getUint16(e + 1, !0), 8) + t.getUint8(e)
  , Cu = (t, e) => $u(t.getUint32(e + 2, !0), 16) + t.getUint16(e, !0)
  , d0 = (t, e, s, r, n) => {
    if (t !== r.getUint8(n))
      return t - r.getUint8(n);
    const o = jr(r, n + 1);
    if (e !== o)
      return e - o;
    const a = jr(r, n + 4);
    return s !== a ? s - a : 0
  }
  , f0 = (t, e, s, r) => {
    const n = Du(t, e | 128, s, r);
    return n ? {
      z: e,
      x: s,
      y: r,
      offset: n[0],
      length: n[1],
      isDir: !0
    } : null
  }
  , wl = (t, e, s, r) => {
    const n = Du(t, e, s, r);
    return n ? {
      z: e,
      x: s,
      y: r,
      offset: n[0],
      length: n[1],
      isDir: !1
    } : null
  }
  , Du = (t, e, s, r) => {
    let n = 0
      , o = t.byteLength / 17 - 1;
    for (; n <= o;) {
      const a = o + n >> 1
        , l = d0(e, s, r, t, a * 17);
      if (l > 0)
        n = a + 1;
      else if (l < 0)
        o = a - 1;
      else
        return [Cu(t, a * 17 + 7), t.getUint32(a * 17 + 13, !0)]
    }
    return null
  }
  , g0 = (t, e) => t.isDir && !e.isDir ? 1 : !t.isDir && e.isDir ? -1 : t.z !== e.z ? t.z - e.z : t.x !== e.x ? t.x - e.x : t.y - e.y
  , Lu = (t, e) => {
    const s = t.getUint8(e * 17);
    return {
      z: s & 127,
      x: jr(t, e * 17 + 1),
      y: jr(t, e * 17 + 4),
      offset: Cu(t, e * 17 + 7),
      length: t.getUint32(e * 17 + 13, !0),
      isDir: s >> 7 === 1
    }
  }
  , vl = t => {
    const e = []
      , s = new DataView(t);
    for (let r = 0; r < s.byteLength / 17; r++)
      e.push(Lu(s, r));
    return p0(e)
  }
  , p0 = t => {
    t.sort(g0);
    const e = new ArrayBuffer(17 * t.length)
      , s = new Uint8Array(e);
    for (let r = 0; r < t.length; r++) {
      const n = t[r];
      let o = n.z;
      n.isDir && (o = o | 128),
        s[r * 17] = o,
        s[r * 17 + 1] = n.x & 255,
        s[r * 17 + 2] = n.x >> 8 & 255,
        s[r * 17 + 3] = n.x >> 16 & 255,
        s[r * 17 + 4] = n.y & 255,
        s[r * 17 + 5] = n.y >> 8 & 255,
        s[r * 17 + 6] = n.y >> 16 & 255,
        s[r * 17 + 7] = n.offset & 255,
        s[r * 17 + 8] = Ni(n.offset, 8) & 255,
        s[r * 17 + 9] = Ni(n.offset, 16) & 255,
        s[r * 17 + 10] = Ni(n.offset, 24) & 255,
        s[r * 17 + 11] = Ni(n.offset, 32) & 255,
        s[r * 17 + 12] = Ni(n.offset, 48) & 255,
        s[r * 17 + 13] = n.length & 255,
        s[r * 17 + 14] = n.length >> 8 & 255,
        s[r * 17 + 15] = n.length >> 16 & 255,
        s[r * 17 + 16] = n.length >> 24 & 255
    }
    return e
  }
  , y0 = (t, e) => {
    if (t.byteLength < 17)
      return null;
    const s = t.byteLength / 17
      , r = Lu(t, s - 1);
    if (r.isDir) {
      const n = r.z
        , o = e.z - n
        , a = Math.trunc(e.x / (1 << o))
        , l = Math.trunc(e.y / (1 << o));
      return {
        z: n,
        x: a,
        y: l
      }
    }
    return null
  }
  ;
function m0(t) {
  return nt(this, null, function* () {
    const e = yield t.getBytes(0, 512e3)
      , s = new DataView(e.data)
      , r = s.getUint32(4, !0)
      , n = s.getUint16(8, !0)
      , o = new TextDecoder("utf-8")
      , a = JSON.parse(o.decode(new DataView(e.data, 10, r)));
    let l = 0;
    a.compression === "gzip" && (l = 2);
    let h = 0;
    "minzoom" in a && (h = +a.minzoom);
    let u = 0;
    "maxzoom" in a && (u = +a.maxzoom);
    let c = 0
      , d = 0
      , f = 0
      , y = -180
      , b = -85
      , w = 180
      , v = 85;
    if (a.bounds) {
      const P = a.bounds.split(",");
      y = +P[0],
        b = +P[1],
        w = +P[2],
        v = +P[3]
    }
    if (a.center) {
      const P = a.center.split(",");
      c = +P[0],
        d = +P[1],
        f = +P[2]
    }
    return {
      specVersion: s.getUint16(2, !0),
      rootDirectoryOffset: 10 + r,
      rootDirectoryLength: n * 17,
      jsonMetadataOffset: 10,
      jsonMetadataLength: r,
      leafDirectoryOffset: 0,
      leafDirectoryLength: void 0,
      tileDataOffset: 0,
      tileDataLength: void 0,
      numAddressedTiles: 0,
      numTileEntries: 0,
      numTileContents: 0,
      clustered: !1,
      internalCompression: 1,
      tileCompression: l,
      tileType: 1,
      minZoom: h,
      maxZoom: u,
      minLon: y,
      minLat: b,
      maxLon: w,
      maxLat: v,
      centerZoom: f,
      centerLon: c,
      centerLat: d,
      etag: e.etag
    }
  })
}
function b0(t, e, s, r, n, o, a) {
  return nt(this, null, function* () {
    let l = yield s.getArrayBuffer(e, t.rootDirectoryOffset, t.rootDirectoryLength, t);
    t.specVersion === 1 && (l = vl(l));
    const h = wl(new DataView(l), r, n, o);
    if (h) {
      let d = (yield e.getBytes(h.offset, h.length, a)).data;
      const f = new DataView(d);
      return f.getUint8(0) === 31 && f.getUint8(1) === 139 && (d = Yo(new Uint8Array(d))),
      {
        data: d
      }
    }
    const u = y0(new DataView(l), {
      z: r,
      x: n,
      y: o
    });
    if (u) {
      const c = f0(new DataView(l), u.z, u.x, u.y);
      if (c) {
        let d = yield s.getArrayBuffer(e, c.offset, c.length, t);
        t.specVersion === 1 && (d = vl(d));
        const f = wl(new DataView(d), r, n, o);
        if (f) {
          let b = (yield e.getBytes(f.offset, f.length, a)).data;
          const w = new DataView(b);
          return w.getUint8(0) === 31 && w.getUint8(1) === 139 && (b = Yo(new Uint8Array(b))),
          {
            data: b
          }
        }
      }
    }
  })
}
var Pu = {
  getHeader: m0,
  getZxy: b0
};
function Is(t, e) {
  return (e >>> 0) * 4294967296 + (t >>> 0)
}
function w0(t, e) {
  const s = e.buf;
  let r = s[e.pos++]
    , n = (r & 112) >> 4;
  if (r < 128 || (r = s[e.pos++],
    n |= (r & 127) << 3,
    r < 128) || (r = s[e.pos++],
      n |= (r & 127) << 10,
      r < 128) || (r = s[e.pos++],
        n |= (r & 127) << 17,
        r < 128) || (r = s[e.pos++],
          n |= (r & 127) << 24,
          r < 128) || (r = s[e.pos++],
            n |= (r & 1) << 31,
            r < 128))
    return Is(t, n);
  throw new Error("Expected varint not more than 10 bytes")
}
function Vi(t) {
  const e = t.buf;
  let s = e[t.pos++]
    , r = s & 127;
  return s < 128 || (s = e[t.pos++],
    r |= (s & 127) << 7,
    s < 128) || (s = e[t.pos++],
      r |= (s & 127) << 14,
      s < 128) || (s = e[t.pos++],
        r |= (s & 127) << 21,
        s < 128) ? r : (s = e[t.pos],
          r |= (s & 15) << 28,
          w0(r, t))
}
function v0(t, e, s, r) {
  if (r === 0) {
    s === 1 && (e[0] = t - 1 - e[0],
      e[1] = t - 1 - e[1]);
    const n = e[0];
    e[0] = e[1],
      e[1] = n
  }
}
var A0 = [0, 1, 5, 21, 85, 341, 1365, 5461, 21845, 87381, 349525, 1398101, 5592405, 22369621, 89478485, 357913941, 1431655765, 5726623061, 22906492245, 91625968981, 366503875925, 1466015503701, 5864062014805, 23456248059221, 93824992236885, 375299968947541, 0x5555555555555];
function O0(t, e, s) {
  if (t > 26)
    throw Error("Tile zoom level exceeds max safe number limit (26)");
  if (e > ai(2, t) - 1 || s > ai(2, t) - 1)
    throw Error("tile x/y outside zoom level bounds");
  const r = A0[t]
    , n = ai(2, t);
  let o = 0
    , a = 0
    , l = 0;
  const h = [e, s];
  let u = n / 2;
  for (; u > 0;)
    o = (h[0] & u) > 0 ? 1 : 0,
      a = (h[1] & u) > 0 ? 1 : 0,
      l += u * u * (3 * o ^ a),
      v0(u, h, o, a),
      u = u / 2;
  return r + l
}
function Tu(t, e) {
  return nt(this, null, function* () {
    if (e === 1 || e === 0)
      return t;
    if (e === 2) {
      if (typeof globalThis.DecompressionStream > "u")
        return Yo(new Uint8Array(t));
      const s = new Response(t).body;
      if (!s)
        throw Error("Failed to read response stream");
      const r = s.pipeThrough(new globalThis.DecompressionStream("gzip"));
      return new Response(r).arrayBuffer()
    }
    throw Error("Compression method not supported")
  })
}
function x0(t) {
  return t === 1 ? ".mvt" : t === 2 ? ".png" : t === 3 ? ".jpg" : t === 4 ? ".webp" : t === 5 ? ".avif" : ""
}
var S0 = 127;
function _0(t, e) {
  let s = 0
    , r = t.length - 1;
  for (; s <= r;) {
    const n = r + s >> 1
      , o = e - t[n].tileId;
    if (o > 0)
      s = n + 1;
    else if (o < 0)
      r = n - 1;
    else
      return t[n]
  }
  return r >= 0 && (t[r].runLength === 0 || e - t[r].tileId < t[r].runLength) ? t[r] : null
}
var E0 = class {
  constructor(t, e = new Headers) {
    this.url = t,
      this.customHeaders = e,
      this.mustReload = !1;
    let s = "";
    "navigator" in globalThis && (s = globalThis.navigator.userAgent || "");
    const r = s.indexOf("Windows") > -1
      , n = /Chrome|Chromium|Edg|OPR|Brave/.test(s);
    this.chromeWindowsNoCache = !1,
      r && n && (this.chromeWindowsNoCache = !0)
  }
  getKey() {
    return this.url
  }
  setHeaders(t) {
    this.customHeaders = t
  }
  getBytes(t, e, s, r) {
    return nt(this, null, function* () {
      let n, o;
      s ? o = s : (n = new AbortController,
        o = n.signal);
      const a = new Headers(this.customHeaders);
      a.set("range", `bytes=${t}-${t + e - 1}`);
      let l;
      this.mustReload ? l = "reload" : this.chromeWindowsNoCache && (l = "no-store");
      let h = yield fetch(this.url, {
        signal: o,
        cache: l,
        headers: a
      });
      if (t === 0 && h.status === 416) {
        const f = h.headers.get("Content-Range");
        if (!f || !f.startsWith("bytes */"))
          throw Error("Missing content-length on 416 response");
        const y = +f.substr(8);
        h = yield fetch(this.url, {
          signal: o,
          cache: "reload",
          headers: {
            range: `bytes=0-${y - 1}`
          }
        })
      }
      let u = h.headers.get("Etag");
      if (u != null && u.startsWith("W/") && (u = null),
        h.status === 416 || r && u && u !== r)
        throw this.mustReload = !0,
        new Zo(`Server returned non-matching ETag ${r} after one retry. Check browser extensions and servers for issues that may affect correct ETag headers.`);
      if (h.status >= 300)
        throw Error(`Bad response code: ${h.status}`);
      const c = h.headers.get("Content-Length");
      if (h.status === 200 && (!c || +c > e))
        throw n && n.abort(),
        Error("Server returned no content-length header or content-length exceeding request. Check that your storage backend supports HTTP Byte Serving.");
      return {
        data: yield h.arrayBuffer(),
        etag: u || void 0,
        cacheControl: h.headers.get("Cache-Control") || void 0,
        expires: h.headers.get("Expires") || void 0
      }
    })
  }
}
  ;
function be(t, e) {
  const s = t.getUint32(e + 4, !0)
    , r = t.getUint32(e + 0, !0);
  return s * ai(2, 32) + r
}
function k0(t, e) {
  const s = new DataView(t)
    , r = s.getUint8(7);
  if (r > 3)
    throw Error(`Archive is spec version ${r} but this library supports up to spec version 3`);
  return {
    specVersion: r,
    rootDirectoryOffset: be(s, 8),
    rootDirectoryLength: be(s, 16),
    jsonMetadataOffset: be(s, 24),
    jsonMetadataLength: be(s, 32),
    leafDirectoryOffset: be(s, 40),
    leafDirectoryLength: be(s, 48),
    tileDataOffset: be(s, 56),
    tileDataLength: be(s, 64),
    numAddressedTiles: be(s, 72),
    numTileEntries: be(s, 80),
    numTileContents: be(s, 88),
    clustered: s.getUint8(96) === 1,
    internalCompression: s.getUint8(97),
    tileCompression: s.getUint8(98),
    tileType: s.getUint8(99),
    minZoom: s.getUint8(100),
    maxZoom: s.getUint8(101),
    minLon: s.getInt32(102, !0) / 1e7,
    minLat: s.getInt32(106, !0) / 1e7,
    maxLon: s.getInt32(110, !0) / 1e7,
    maxLat: s.getInt32(114, !0) / 1e7,
    centerZoom: s.getUint8(118),
    centerLon: s.getInt32(119, !0) / 1e7,
    centerLat: s.getInt32(123, !0) / 1e7,
    etag: e
  }
}
function ju(t) {
  const e = {
    buf: new Uint8Array(t),
    pos: 0
  }
    , s = Vi(e)
    , r = [];
  let n = 0;
  for (let o = 0; o < s; o++) {
    const a = Vi(e);
    r.push({
      tileId: n + a,
      offset: 0,
      length: 0,
      runLength: 1
    }),
      n += a
  }
  for (let o = 0; o < s; o++)
    r[o].runLength = Vi(e);
  for (let o = 0; o < s; o++)
    r[o].length = Vi(e);
  for (let o = 0; o < s; o++) {
    const a = Vi(e);
    a === 0 && o > 0 ? r[o].offset = r[o - 1].offset + r[o - 1].length : r[o].offset = a - 1
  }
  return r
}
function z0(t) {
  const e = new DataView(t);
  return e.getUint16(2, !0) === 2 ? (console.warn("PMTiles spec version 2 has been deprecated; please see github.com/protomaps/PMTiles for tools to upgrade"),
    2) : e.getUint16(2, !0) === 1 ? (console.warn("PMTiles spec version 1 has been deprecated; please see github.com/protomaps/PMTiles for tools to upgrade"),
      1) : 3
}
var Zo = class extends Error {
}
  ;
function $0(t, e) {
  return nt(this, null, function* () {
    const s = yield t.getBytes(0, 16384);
    if (new DataView(s.data).getUint16(0, !0) !== 19792)
      throw new Error("Wrong magic number for PMTiles archive");
    if (z0(s.data) < 3)
      return [yield Pu.getHeader(t)];
    const n = s.data.slice(0, S0)
      , o = k0(n, s.etag)
      , a = s.data.slice(o.rootDirectoryOffset, o.rootDirectoryOffset + o.rootDirectoryLength)
      , l = `${t.getKey()}|${o.etag || ""}|${o.rootDirectoryOffset}|${o.rootDirectoryLength}`
      , h = ju(yield e(a, o.internalCompression));
    return [o, [l, h.length, h]]
  })
}
function C0(t, e, s, r, n) {
  return nt(this, null, function* () {
    const o = yield t.getBytes(s, r, void 0, n.etag)
      , a = yield e(o.data, n.internalCompression)
      , l = ju(a);
    if (l.length === 0)
      throw new Error("Empty directory is invalid");
    return l
  })
}
var D0 = class {
  constructor(t = 100, e = !0, s = Tu) {
    this.cache = new Map,
      this.invalidations = new Map,
      this.maxCacheEntries = t,
      this.counter = 1,
      this.decompress = s
  }
  getHeader(t) {
    return nt(this, null, function* () {
      const e = t.getKey()
        , s = this.cache.get(e);
      if (s)
        return s.lastUsed = this.counter++,
          yield s.data;
      const r = new Promise((n, o) => {
        $0(t, this.decompress).then(a => {
          a[1] && this.cache.set(a[1][0], {
            lastUsed: this.counter++,
            data: Promise.resolve(a[1][2])
          }),
            n(a[0]),
            this.prune()
        }
        ).catch(a => {
          o(a)
        }
        )
      }
      );
      return this.cache.set(e, {
        lastUsed: this.counter++,
        data: r
      }),
        r
    })
  }
  getDirectory(t, e, s, r) {
    return nt(this, null, function* () {
      const n = `${t.getKey()}|${r.etag || ""}|${e}|${s}`
        , o = this.cache.get(n);
      if (o)
        return o.lastUsed = this.counter++,
          yield o.data;
      const a = new Promise((l, h) => {
        C0(t, this.decompress, e, s, r).then(u => {
          l(u),
            this.prune()
        }
        ).catch(u => {
          h(u)
        }
        )
      }
      );
      return this.cache.set(n, {
        lastUsed: this.counter++,
        data: a
      }),
        a
    })
  }
  getArrayBuffer(t, e, s, r) {
    return nt(this, null, function* () {
      const n = `${t.getKey()}|${r.etag || ""}|${e}|${s}`
        , o = this.cache.get(n);
      if (o)
        return o.lastUsed = this.counter++,
          yield o.data;
      const a = new Promise((l, h) => {
        t.getBytes(e, s, void 0, r.etag).then(u => {
          l(u.data),
            this.cache.has(n),
            this.prune()
        }
        ).catch(u => {
          h(u)
        }
        )
      }
      );
      return this.cache.set(n, {
        lastUsed: this.counter++,
        data: a
      }),
        a
    })
  }
  prune() {
    if (this.cache.size >= this.maxCacheEntries) {
      let t = 1 / 0, e;
      this.cache.forEach((s, r) => {
        s.lastUsed < t && (t = s.lastUsed,
          e = r)
      }
      ),
        e && this.cache.delete(e)
    }
  }
  invalidate(t) {
    return nt(this, null, function* () {
      const e = t.getKey();
      if (this.invalidations.get(e))
        return yield this.invalidations.get(e);
      this.cache.delete(t.getKey());
      const s = new Promise((r, n) => {
        this.getHeader(t).then(o => {
          r(),
            this.invalidations.delete(e)
        }
        ).catch(o => {
          n(o)
        }
        )
      }
      );
      this.invalidations.set(e, s)
    })
  }
}
  , L0 = class {
    constructor(t, e, s) {
      typeof t == "string" ? this.source = new E0(t) : this.source = t,
        s ? this.decompress = s : this.decompress = Tu,
        e ? this.cache = e : this.cache = new D0
    }
    getHeader() {
      return nt(this, null, function* () {
        return yield this.cache.getHeader(this.source)
      })
    }
    getZxyAttempt(t, e, s, r) {
      return nt(this, null, function* () {
        const n = O0(t, e, s)
          , o = yield this.cache.getHeader(this.source);
        if (o.specVersion < 3)
          return Pu.getZxy(o, this.source, this.cache, t, e, s, r);
        if (t < o.minZoom || t > o.maxZoom)
          return;
        let a = o.rootDirectoryOffset
          , l = o.rootDirectoryLength;
        for (let h = 0; h <= 3; h++) {
          const u = yield this.cache.getDirectory(this.source, a, l, o)
            , c = _0(u, n);
          if (c) {
            if (c.runLength > 0) {
              const d = yield this.source.getBytes(o.tileDataOffset + c.offset, c.length, r, o.etag);
              return {
                data: yield this.decompress(d.data, o.tileCompression),
                cacheControl: d.cacheControl,
                expires: d.expires
              }
            }
            a = o.leafDirectoryOffset + c.offset,
              l = c.length
          } else
            return
        }
        throw Error("Maximum directory depth exceeded")
      })
    }
    getZxy(t, e, s, r) {
      return nt(this, null, function* () {
        try {
          return yield this.getZxyAttempt(t, e, s, r)
        } catch (n) {
          if (n instanceof Zo)
            return this.cache.invalidate(this.source),
              yield this.getZxyAttempt(t, e, s, r);
          throw n
        }
      })
    }
    getMetadataAttempt() {
      return nt(this, null, function* () {
        const t = yield this.cache.getHeader(this.source)
          , e = yield this.source.getBytes(t.jsonMetadataOffset, t.jsonMetadataLength, void 0, t.etag)
          , s = yield this.decompress(e.data, t.internalCompression)
          , r = new TextDecoder("utf-8");
        return JSON.parse(r.decode(s))
      })
    }
    getMetadata() {
      return nt(this, null, function* () {
        try {
          return yield this.getMetadataAttempt()
        } catch (t) {
          if (t instanceof Zo)
            return this.cache.invalidate(this.source),
              yield this.getMetadataAttempt();
          throw t
        }
      })
    }
    getTileJson(t) {
      return nt(this, null, function* () {
        const e = yield this.getHeader()
          , s = yield this.getMetadata()
          , r = x0(e.tileType);
        return {
          tilejson: "3.0.0",
          scheme: "xyz",
          tiles: [`${t}/{z}/{x}/{y}${r}`],
          vector_layers: s.vector_layers,
          attribution: s.attribution,
          description: s.description,
          name: s.name,
          version: s.version,
          bounds: [e.minLon, e.minLat, e.maxLon, e.maxLat],
          center: [e.centerLon, e.centerLat, e.centerZoom],
          minzoom: e.minZoom,
          maxzoom: e.maxZoom
        }
      })
    }
  }
  ;
const Jo = "https://mts.googleapis.com/vt";
function P0(t) {
  const e = Au(t);
  return e != null ? new Os({
    type: et.STYLERS,
    params: [{
      key: "styles",
      value: e
    }]
  }) : null
}
var cr;
class Mu extends L.TileLayer {
  constructor(s, r) {
    super(s, {
      updateInterval: 80,
      crossOrigin: !0,
      ...r
    });
    p(this, cr);
    g(this, cr, s)
  }
  getTileUrl(s) {
    return L.Util.template(i(this, cr), {
      x: s.x,
      y: s.y,
      z: s.z,
      ...this.options
    })
  }
}
cr = new WeakMap;
var ze;
const Sa = class Sa extends Mu {
  constructor(s) {
    super(Jo, {});
    p(this, ze);
    g(this, ze, new ul(s))
  }
  getTileRequest(s) {
    var n;
    const r = i(this, ze);
    return r.query.tile.x = s.x,
      r.query.tile.y = s.y,
      r.query.tile.zoom = s.z,
      (n = r.renderOptions).scale || (n.scale = devicePixelRatio),
      r
  }
  getTileUrl(s) {
    const r = this.getTileRequest(s)
      , n = new URL(Jo);
    return n.searchParams.set("pb", Lg(r)),
      n.toString()
  }
  get request() {
    return i(this, ze)
  }
  get styleString() {
    var s, r, n, o, a;
    return ((a = (o = (n = (r = (s = i(this, ze).options) == null ? void 0 : s.styles) == null ? void 0 : r.find(l => l.type === et.STYLERS)) == null ? void 0 : n.params) == null ? void 0 : o.find(l => l.key === "styles")) == null ? void 0 : a.value) ?? ""
  }
  modifyInPlace(s) {
    g(this, ze, s(i(this, ze))),
      this.redraw()
  }
  derive(s) {
    const r = new ul(structuredClone(i(this, ze).toArray()));
    return new Sa(s(r).toArray())
  }
  withStyle(s) {
    return this.derive(r => {
      const n = this.styleString
        , o = [];
      n.length > 0 && o.push(...Kp(n)),
        o.push(...s);
      const a = r.options.styles.filter(h => h.type !== et.STYLERS)
        , l = P0(o);
      return l != null && a.push(l),
        r.options.styles = a,
        r
    }
    )
  }
}
  ;
ze = new WeakMap;
let Si = Sa;
function Al(t) {
  return new Mu(`${Jo}?hl=en-US&lyrs={layers}&style={style}&x={x}&y={y}&z={z}`, {
    style: "",
    ...t
  })
}
class Iu extends Si {
  constructor(e) {
    const s = [];
    (e.showOfficial ?? !0) && s.push({
      frontend: $r.OFFICIAL,
      tiled: !0,
      imageFormat: Cr.PHOTOSPHERE
    }),
      (e.showUnofficial ?? !0) && (s.push({
        frontend: $r.USER_PHOTO,
        tiled: !0,
        imageFormat: Cr.PHOTOSPHERE
      }),
        s.push({
          frontend: $r.USER_UPLOADED,
          tiled: !0,
          imageFormat: Cr.PHOTOSPHERE
        }));
    const r = mg(new pg({
      strategies: s,
      unknownBool: !0,
      unknownBool2: !0
    }))
      , n = vg(new bg({
        showUserContent: !1,
        useDetailedLines: e.useDetailedLines ?? !0
      }));
    super({
      query: {
        tile: {}
      },
      layers: [{
        type: Bs.OVERLAY,
        layerName: "svv",
        layerOptions: [{
          key: "cc",
          value: r
        }, {
          key: "svl",
          value: n
        }]
      }],
      options: {
        language: "en",
        region: "US",
        styles: [{
          type: et.BASEMAP,
          params: [{
            key: "set",
            value: "Roadmap"
          }]
        }, {
          type: et.SMARTMAPS,
          params: [{
            key: "smartmaps"
          }]
        }]
      },
      renderOptions: {
        scale: devicePixelRatio
      }
    })
  }
}
function _r(t) {
  return new Iu(t)
}
var is;
class T0 extends L.GridLayer {
  constructor(s) {
    super(s);
    p(this, is, null)
  }
  setUrl(s) {
    i(this, is) != null && i(this, is).source.getKey() === s || (g(this, is, new L0(s)),
      i(this, is).getHeader(),
      this.redraw())
  }
  createTile(s, r) {
    if (i(this, is) == null) {
      const h = L.DomUtil.create("div", "leaflet-tile");
      return queueMicrotask(() => r(void 0, h)),
        h
    }
    const n = new AbortController
      , o = n.signal
      , a = document.createElement("img");
    Object.assign(a, {
      width: 256,
      height: 256,
      cancel: () => n.abort()
    });
    const l = i(this, is);
    return (async () => {
      try {
        const h = await l.getZxy(s.z, s.x, s.y, o);
        if (h) {
          const u = new Blob([h.data], {
            type: "image/png"
          })
            , c = window.URL.createObjectURL(u);
          a.src = c,
            await a.decode()
        }
        Object.assign(a, {
          cancel: void 0
        }),
          r(void 0, a)
      } catch (h) {
        h instanceof Error && h.name !== "AbortError" && r(h)
      }
    }
    )(),
      a
  }
}
is = new WeakMap;
const Ol = {
  same: [86, 159, 185, 132],
  add: [255, 0, 255, 132],
  remove: [255, 0, 0, 132]
}
  , j0 = {
    same: [18, 158, 175, 206],
    add: [255, 0, 255, 206],
    remove: [255, 0, 0, 206]
  };
function Po(t) {
  var s;
  const e = document.createElement("canvas");
  return e.width = t.width,
    e.height = t.height,
    (s = e.getContext("2d")) == null || s.drawImage(t, 0, 0),
    e
}
function xl(t, e, s) {
  const r = e.getContext("2d")
    , n = s.getContext("2d")
    , o = r.getImageData(0, 0, e.width, e.height)
    , a = n.getImageData(0, 0, s.width, s.height);
  for (let l = 0; l < o.data.length; l += 4)
    o.data[l + 3] - a.data[l + 3] > 127 ? a.data.set(t.remove, l) : a.data[l + 3] - o.data[l + 3] > 127 ? a.data.set(t.add, l) : o.data[l + 3] > 1 && a.data[l + 3] > 1 && a.data.set(t.same, l);
  return n.putImageData(a, 0, 0),
    createImageBitmap(s)
}
function M0(t, e, s) {
  const r = s.z - e.z
    , n = t.width / 2 ** r
    , o = {
      x: n * (s.x - e.x * 2 ** r),
      y: n * (s.y - e.y * 2 ** r)
    }
    , a = document.createElement("canvas");
  return a.width = t.width,
    a.height = t.height,
    a.getContext("2d").drawImage(t, o.x, o.y, n, n, 0, 0, t.width, t.height),
    a
}

class qi extends T0 {
  constructor(e) {
    super(e)
  }
  setFrom(e) {
    this.options.from !== e.id && (this.options.from = e.id,
      this.options.maxNativeZoom = e.max_zoom,
      this.options.opacity = e.tile_type === "svmap" ? .5 : 1,
      this.setUrl(e.pmtiles))
  }
}
class I0 extends Iu {
  constructor() {
    super({
      showOfficial: !0,
      showUnofficial: !1,
      useDetailedLines: !0
    })
  }
  getTileRequest(e) {
    const s = super.getTileRequest(e);
    s.renderOptions.scale = 1;
    const r = e.z >= 15 ? 4 + (e.z - 14) / 2 : e.z >= 10 ? 4 : 9;
    let n = s.options.styles.find(a => a.type === et.STYLERS);
    n == null && (n = new Os({
      type: et.STYLERS,
      params: [{
        key: "styles",
        value: ""
      }]
    }),
      s.options.styles = [...s.options.styles, n]);
    const o = n.params.find(a => a.key === "styles");
    return o != null && (o.value = Au([{
      elementType: "geometry.fill",
      stylers: [{
        color: "#569fb9",
        weight: r
      }]
    }, {
      elementType: "geometry.stroke",
      stylers: [{
        visibility: "off"
      }]
    }])),
      s
  }
}
const F0 = new I0;
var Ur, hs, $e;
class R0 extends L.GridLayer {
  constructor(s) {
    super(s);
    p(this, Ur);
    p(this, hs);
    p(this, $e);
    g(this, hs, new qi(s)),
      g(this, $e, new qi(s))
  }
  createTile(s, r) {
    if (this.options.from == null || this.options.to == null) {
      const h = L.DomUtil.create("div", "leaflet-tile");
      return queueMicrotask(() => r(void 0, h)),
        h
    }
    const n = L.DomUtil.create("canvas", "leaflet-tile");
    new Image,
      new Image;
    const o = this.getTileSize();
    n.width = o.x,
      n.height = o.y;
    const a = n.getContext("2d")
      , l = i(this, hs).options.maxNativeZoom ?? 0;
    if (s.z > l && this.options.to === "now") {
      const h = s.z - l
        , u = Object.assign(at.point(Math.floor(s.x / 2 ** h), Math.floor(s.y / 2 ** h)), {
          z: l
        });
      return Promise.all([new Promise((c, d) => {
        i(this, hs).createTile(u, (f, y) => {
          f ? d(f) : c(y)
        }
        )
      }
      ), new Promise((c, d) => {
        i(this, $e).createTile(s, (f, y) => {
          f ? d(f) : c(y)
        }
        )
      }
      )]).then(([c, d]) => {
        const f = s.z >= 15 ? j0 : Ol;
        return xl({
          ...f,
          remove: [0, 0, 0, 0]
        }, M0(c, u, s), Po(d))
      }
      ).then(c => {
        a.drawImage(c, 0, 0),
          r(void 0, n)
      }
      ).catch(c => {
        r(c)
      }
      ),
        n
    }
    return Promise.all([new Promise((h, u) => {
      i(this, hs).createTile(s, (c, d) => {
        c ? u(c) : h(d)
      }
      )
    }
    ), new Promise((h, u) => {
      i(this, $e).createTile(s, (c, d) => {
        c ? u(c) : h(d)
      }
      )
    }
    )]).then(([h, u]) => xl(Ol, Po(h), Po(u))).then(h => {
      a.drawImage(h, 0, 0),
        r(void 0, n)
    }
    ).catch(h => {
      console.error(h),
        r(h)
    }
    ),
      n
  }
  setRange(s, r) {
    this.options.from === s.id && this.options.to === r.id || (this.options.from = s.id,
      this.options.to = r.id,
      r.id === "now" ? this.options.maxNativeZoom = r.max_zoom : this.options.maxNativeZoom = Math.min(s.max_zoom, r.max_zoom),
      (s.tile_type === "vtdeprecated" || s.tile_type === "mts") && (r.id === "now" || r.tile_type === "svmap") && s.max_zoom > 9 && (s = {
        ...s,
        max_zoom: 9
      }),
      i(this, hs).setFrom(s),
      r.id === "now" ? g(this, $e, F0) : (i(this, $e) instanceof qi || g(this, $e, new qi(i(this, Ur), this.options)),
        i(this, $e).setFrom(r)),
      this.redraw())
  }
}
Ur = new WeakMap,
  hs = new WeakMap,
  $e = new WeakMap;
const U0 = 17;
async function Fu(t) {
  const e = new cg({
    context: {
      client: "maps_sv.tactile"
    },
    tile: {
      x: t.x,
      y: t.y,
      zoom: U0
    }
  })
    , s = new URL("https://www.google.com/maps/photometa/ac/v1");
  s.searchParams.set("pb", dg(e));
  const r = await fetch(s.toString(), {
    referrerPolicy: "no-referrer"
  })
    , n = JSON.parse((await r.text()).replace(/^\)\]\}'\n/, ""));
  return new fg(n).panoramas.panoramas
}
function B0({ x: t, y: e, z: s }) {
  const r = Math.pow(2, s);
  return [t / r * 360 - 180, Math.atan(Math.sinh(Math.PI - 2 * Math.PI * (e + 1) / r)) / Math.PI * 180, (t + 1) / r * 360 - 180, Math.atan(Math.sinh(Math.PI - 2 * Math.PI * e / r)) / Math.PI * 180]
}
class N0 extends L.GridLayer {
  constructor(e = {}) {
    super({
      ...e,
      minZoom: 16,
      minNativeZoom: 17,
      maxNativeZoom: 17
    })
  }
  createTile(e, s) {
    if (e.z !== 17) {
      const f = L.DomUtil.create("div", "leaflet-tile");
      return queueMicrotask(() => s(void 0, f)),
        f
    }
    const r = devicePixelRatio * 2
      , n = this.getTileSize()
      , o = L.DomUtil.create("canvas", "leaflet-tile");
    o.width = n.x * r,
      o.height = n.y * r;
    const a = o.getContext("2d");
    a.scale(r, r),
      a.fillStyle = "#f00",
      a.strokeStyle = "#f00",
      a.beginPath();
    const l = B0(e)
      , h = l[3] - l[1]
      , u = l[2] - l[0];
    function c({ lat: f, lng: y }) {
      const b = n.y - (f - l[1]) / h * n.y;
      return {
        x: (y - l[0]) / u * n.x,
        y: b
      }
    }
    const d = 2.5 / 17 * e.z;
    return Fu(e).then(f => {
      for (const { links: y, pano: b } of f) {
        const w = c(b.viewpoint.position);
        for (const v of y) {
          const E = c(f[v].pano.viewpoint.position);
          a.moveTo(w.x, w.y),
            a.lineTo(E.x, E.y)
        }
      }
      for (let y = 0; y < f.length; y += 1) {
        const { x: b, y: w } = c(f[y].pano.viewpoint.position);
        a.moveTo(b + d, w),
          a.arc(b, w, d, 0, 2 * Math.PI)
      }
      a.fill(),
        s(void 0, o)
    }
      , s),
      o
  }
}
const Sl = new Ep
  , _l = "https://d2atosiu2fuyaw.cloudfront.net/"
  , El = new Si({
    query: {
      tile: {
        size: 256
      }
    },
    layers: [{
      type: Bs.ROADMAP,
      layerName: "m"
    }],
    options: {
      language: "en",
      region: "US",
      styles: [{
        type: et.BASEMAP,
        params: [{
          key: "set",
          value: "Roadmap"
        }]
      }, {
        type: et.SMARTMAPS,
        params: [{
          key: "smartmaps"
        }]
      }]
    },
    outputFormat: 0
  })
  , V0 = new Si({
    query: {
      tile: {
        size: 256
      }
    },
    layers: [{
      type: Bs.ROADMAP,
      layerName: "m"
    }, {
      type: Bs.TERRAIN_RELIEF,
      layerName: "shading"
    }, {
      type: Bs.TERRAIN_CONTOURS,
      layerName: "contours"
    }],
    options: {
      language: "en",
      region: "US",
      styles: [{
        type: et.BASEMAP,
        params: [{
          key: "set",
          value: "Terrain"
        }]
      }, {
        type: et.SMARTMAPS,
        params: [{
          key: "smartmaps"
        }]
      }, {
        type: et.TERRAIN
      }, {
        type: et.TERRAIN_ROADS
      }]
    },
    outputFormat: 0
  })
  , er = class er extends L.TileLayer {
    constructor(e = {}) {
      super(er.LIGHT_URL, e)
    }
  }
  ;
tn(er, "LIGHT_URL", "https://cartodb-basemaps-a.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png"),
  tn(er, "DARK_URL", "https://cartodb-basemaps-a.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png");
let ar = er;
const Se = new URLSearchParams(location.hash.slice(1));
function Qo(t, e) {
  if (t == null)
    return e;
  const s = Number(t);
  return Number.isFinite(s) ? s : e
}
const roadmapBaseLayer = L.tileLayer("https://www.google.com/maps/vt?pb=!1m5!1m4!1i{z}!2i{x}!3i{y}!4i256!2m1!2sm!3m17!2sen!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2ss.e:l|p.v:off,s.t:1|s.e:g.s|p.v:on!5m1!5f1.5");
const roadmapLabelsLayer = L.tileLayer("https://www.google.com/maps/vt?pb=!1m5!1m4!1i{z}!2i{x}!3i{y}!4i256!2m1!2sm!3m17!2sen!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2ss.e:g|p.v:off,s.t:1|s.e:g.s|p.v:on,s.e:l|p.v:on!5m1!5f1.35",
  { pane: "labelPane" });
const roadmapLayer = L.layerGroup([roadmapBaseLayer, roadmapLabelsLayer]);
const satelliteBaseLayer = L.tileLayer("https://www.google.com/maps/vt?pb=!1m7!8m6!1m3!1i{z}!2i{x}!3i{y}!2i9!3x1!2m2!1e1!2sm!3m3!2sen!3sus!5e1105!4e0!5m4!1e0!8m2!1e1!1e1!6m6!1e12!2i2!11e0!39b0!44e0!50e0");
const satelliteLabelsLayer = L.tileLayer("https://www.google.com/maps/vt?pb=!1m7!8m6!1m3!1i{z}!2i{x}!3i{y}!2i9!3x1!2m2!1e0!2sm!3m5!2sen!3sus!5e1105!12m1!1e4!4e0!5m4!1e0!8m2!1e1!1e1!6m6!1e12!2i2!11e0!39b0!44e0!50e0",
  { pane: "labelPane" });
const satelliteLayer = L.layerGroup([satelliteBaseLayer, satelliteLabelsLayer]);
const terrainBaseLayer = L.tileLayer("https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i{z}!2i{x}!3i{y}!4i256!2m1!2sm!2m2!1e5!2sshading!2m2!1e6!2scontours!3m17!2sen!3sUS!5e18!12m4!1e68!2m2!1sset!2sTerrain!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2ss.e:l|p.v:off,s.t:1|s.e:g.s|p.v:on!5m1!5f1.5");
const terrainLabelsLayer = roadmapLabelsLayer;
const terrainLayer = L.layerGroup([terrainBaseLayer, terrainLabelsLayer]);
const osmLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' });
const cartoLightLayer = L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png", { subdomains: ["a", "b", "c"] });
const cartoDarkLayer = L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png", { subdomains: ["a", "b", "c"] });
const gsvLayer = L.tileLayer("https://www.google.com/maps/vt?pb=!1m7!8m6!1m3!1i{z}!2i{x}!3i{y}!2i9!3x1!2m8!1e2!2ssvv!4m2!1scc!2s*211m3*211e2*212b1*213e2*211m3*211e3*212b1*213e2*212b1*214b1!4m2!1ssvl!2s*211b0*212b1!3m8!2sen!3sus!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m4!1e0!8m2!1e1!1e1!6m6!1e12!2i2!11e0!39b0!44e0!50e0",
  { pane: "coveragePane" });
const gsvLayer2 = L.tileLayer("https://www.google.com/maps/vt?pb=!1m7!8m6!1m3!1i{z}!2i{x}!3i{y}!2i9!3x1!2m8!1e2!2ssvv!4m2!1scc!2s*211m3*211e2*212b1*213e2*212b1*214b1!4m2!1ssvl!2s*211b0*212b1!3m8!2sen!3sus!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m4!1e0!8m2!1e1!1e1!6m6!1e12!2i2!11e0!39b0!44e0!50e0",
  { pane: "coveragePane" });
const gsvLayer3 = L.tileLayer("https://www.google.com/maps/vt?pb=!1m7!8m6!1m3!1i{z}!2i{x}!3i{y}!2i9!3x1!2m8!1e2!2ssvv!4m2!1scc!2s*211m3*211e3*212b1*213e2*212b1*214b1!4m2!1ssvl!2s*211b0*212b1!3m8!2sen!3sus!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m4!1e0!8m2!1e1!1e1!6m6!1e12!2i2!11e0!39b0!44e0!50e0",
  { pane: "coveragePane" });
const baseMaps = {
  Roadmap: roadmapLayer,
  Satellite: satelliteLayer,
  Terrain: terrainLayer,
  OSM: osmLayer,
  "Carto Light": cartoLightLayer,
  "Carto Dark": cartoDarkLayer,
};
const panoramasLayer = new N0({ pane: 'panoramasPane' });

const overlayMaps = {
  "Google Street View": gsvLayer,
  "Google Street View Official Only": gsvLayer2,
  "Unofficial coverage only": gsvLayer3,
  "Panoramas(requires close zoom 16+)": panoramasLayer
};

const q0 = Qo(Se.get("zoom"), 2)
  , kl = (Se.get("center") ?? "0,0").split(",")
  , H0 = [Qo(kl[0], 0), Qo(kl[1], 0)]
  , ht = L.map("map", {
    minZoom: 1,
    zoom: q0,
    center: H0,
    preferCanvas: true,
    zoomControl: false,
    worldCopyJump: true,
    attributionControl: false,
  });

ht.createPane("labelPane");
ht.createPane("panoramasPane")
ht.createPane("coveragePane")
ht.getPane("labelPane").style.zIndex = 300;
ht.getPane("panoramasPane").style.zIndex = 400;
ht.getPane("coveragePane").style.zIndex = 200;

var drawnItems = new L.FeatureGroup().addTo(ht);
var drawControl = new L.Control.Draw({
  edit: {
      featureGroup: drawnItems,
      poly: {
          allowIntersection: false
      }
  },
  draw: {
      polygon: {
          allowIntersection: false,
          showArea: true
      },
      polyline: false,
      circle: false,
      marker: false,
      circlemarker: false
  },
  position: 'bottomleft',

});
ht.on(L.Draw.Event.CREATED, function (event) {
  var layer = event.layer;
  drawnItems.addLayer(layer);
});


roadmapLayer.addTo(ht);
gsvLayer2.addTo(ht);
panoramasLayer.addTo(ht).bringToFront()
L.control.layers(baseMaps, overlayMaps, { position: "bottomleft" }).addTo(ht);
drawControl.addTo(ht)

let isRangeMode = true
let isHeatmap = false
let isCluster=true
let update_data
let filter_check={report_date:[1167580800,1924963199],type:[],pano_date:[]}
let filterdata
let markers=[]
let heatmapLayer
const heatmap_on='./assets/heatmap.png'
const heatmap_off='./assets/heatmap_off.png'
const cluster_on='./assets/markers.svg'
const cluster_off='./assets/marker.svg'
const clustermarkers=L.markerClusterGroup()
const specialDates = {
  '2024-10-28T22:38:00Z': 'om',
  '2024-10-14T20:00:00Z': 'fo',
  '2024-10-01T02:59:00Z': 'li',
  '2024-09-08T03:50:00Z': 'ec',
  '2024-09-05T22:33:00Z': 'is',
  '2024-07-17T14:41:00Z': 'sm',
  '2024-05-08T20:49:00Z': 'mn',
  '2024-04-25T16:08:00Z': 'mt',
  '2024-04-19T01:04:00Z': 'lb',
  '2024-03-22T14:54:00Z': 'kz',
  '2023-09-29T00:04:00Z': 'kh',
  '2023-09-29T00:05:00Z': 'pa',
  '2023-09-29T03:53:00Z': 'mc',
  '2023-08-01T03:10:00Z': 'il',
  '2023-07-24T20:03:00Z': 'de',

};


function isDateInRange(date, startDate, endDate) {
  return date >= startDate && date <= endDate;
}

function getFlagUrl(countryCode) {
  return `https://flagicons.lipis.dev/flags/4x3/${countryCode}.svg`;
}

function drawMarkers(data) {
  clustermarkers.clearLayers();
  markers.forEach(marker => ht.removeLayer(marker)); 
  markers = []; 

  data.forEach(item => {
      const { lat, lng, address, author, update_type, report_time, date, sv_link,elevation } = item;
      const localTime = new Date(report_time * 1000).toLocaleString();
      const popupContent = `
          <strong>update type:</strong> ${update_type}<br>
          <strong>pano date:</strong> ${date}<br>
          <strong>elevation:</strong> ${elevation.toFixed(2)}m<br>
          <strong>report time:</strong> ${localTime}<br>
          <strong>reporter:</strong> ${author}
      `;
      const marker = L.marker([lat, lng]);
      marker.on('mouseover', function () {
          this.bindPopup(popupContent).openPopup();
      });
      marker.on('mouseout', function () {
          this.closePopup();
      });
      marker.on('click', function () {
          window.open(sv_link, '_blank');
      });

      if (isCluster) {
          clustermarkers.addLayer(marker);
      } else {
          ht.addLayer(marker);
      }
      markers.push(marker); 
  });

  if (isCluster) {
      clustermarkers.addTo(ht);
  }
}

function isInPolygon(polygon) {
  const bounds = polygon.getBounds();
  const x_min = bounds.getEast();
  const x_max = bounds.getWest();
  const y_min = bounds.getSouth();
  const y_max = bounds.getNorth();
  const lat = (Math.asin(Math.random() * (Math.sin(y_max * Math.PI / 180) - Math.sin(y_min * Math.PI / 180)) + Math.sin(y_min * Math.PI / 180))) * 180 / Math.PI;
  const lng = x_min + Math.random() * (x_max - x_min);
  return { lat: lat, lng: lng };
}

fetch('update_reports.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network error!');
    }
    return response.json();
  })
  .then(data => {
    update_data = data
    filterdata=data
    drawMarkers(data)
  })
  .catch(error => console.error('Error parsing json:', error));

const datepicker = new AirDatepicker('#calendar', {
  onSelect({ date }) {
    if (date.length > 1&&isRangeMode) {
      filter_check.report_date[0] = Math.floor(date[0].getTime() / 1000)
      filter_check.report_date[1] = Math.floor(date[1].getTime() / 1000)+ 86400
    }
    else {
      const localdate = new Date(date)
      filter_check.report_date[0] = Math.floor(localdate.getTime() / 1000)
      filter_check.report_date[1] = filter_check.report_date[0] + 86400
    }
    applyFilters()

  },
  onRenderCell({ date, cellType }) {
    if (cellType === 'day') {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        const matchingDates = [];

        for (const [timestamp, countryCode] of Object.entries(specialDates)) {
            const specialDate = new Date(timestamp);
            if (isDateInRange(specialDate, startOfDay, endOfDay)) {
                matchingDates.push({ timestamp, countryCode });
            }
        }

        if (matchingDates.length > 0) {
          const randomIndex = Math.floor(Math.random() * matchingDates.length);
          const initialFlagUrl = getFlagUrl(matchingDates[randomIndex].countryCode);
          return {
              html: `<div class="custom-cell">
                          <img class="emoji" src="${initialFlagUrl}">
                      </div>`,
              classes: 'custom-cell'
          };
      }
  }
},

  autoClose: false,
  singleDatePicker: true,
  range: isRangeMode,
  locale: {
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    today: "Today",
    clear: "Clear",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "HH:mm",
    firstDay: 0
  }

});

const monthPicker = new AirDatepicker('#monthpicker', {
  view: 'months', 
  minView: 'months',
  range:true,
  onSelect({ date }) {
    if (date.length > 1) {
        const startMonth = date[0].toLocaleString('default', { month: 'short' });
        const startYear = date[0].getFullYear();
        const endMonth = date[1].toLocaleString('default', { month: 'short' });
        const endYear = date[1].getFullYear();
        filter_check.pano_date = [`${startMonth} ${startYear}`, `${endMonth} ${endYear}`];
    } else {
        const singleMonth = date[0].toLocaleString('default', { month: 'short' });
        const singleYear = date[0].getFullYear()
        filter_check.pano_date = [`${singleMonth} ${singleYear}`, `${singleMonth} ${singleYear}`];
    }
    applyFilters();
},
  autoClose: true,
  locale: {
      months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  }
});

ht.on("draw:created", (e) => {
  const polygon = e.layer;
  ht.addLayer(polygon);

  filterdata = filterdata.filter(item => {

    const point = L.latLng(item.lat, item.lng);
        
    const pointInPolygon = polygon.contains(point);
    return pointInPolygon;
  });


  if (filterdata.length > 0) {
      drawMarkers(filterdata);
      if (isHeatmap) drawHeatmap(filterdata);
  }
  
})
ht.on("draw:edited", (e) => {
  e.layers.eachLayer((layer) => {
    const polygon = layer;
    ht.addLayer(polygon);

    filterdata = filterdata.filter(item => {

      const point = L.latLng(item.lat, item.lng);
          
      const pointInPolygon = polygon.contains(point);
      return pointInPolygon;
    });


    if (filterdata.length > 0) {
        drawMarkers(filterdata);
        if (isHeatmap) drawHeatmap(filterdata);
    }
  })
})

ht.on("draw:deleted", () => {
  applyFilters(update_data)
})


const toggle_calendar = document.getElementById('calendar-toggle');
toggle_calendar.addEventListener('click', function () {
  isRangeMode = !isRangeMode;
  datepicker.update({
    range: isRangeMode
  });
  toggle_calendar.textContent = isRangeMode ? 'Range' : 'Single';
});

function drawHeatmap(data) {
  if (heatmapLayer) {
    ht.removeLayer(heatmapLayer);
  }
  const heatData = data.map(item => [item.lat, item.lng, 100]); 
  heatmapLayer = L.heatLayer(heatData, {     
      radius: 10, 
      blur: 5,
      maxZoom: 20,
      maxIntensity: 1,
      gradient: {
        0.25: 'rgba(255, 0, 0, 0.25)', 
        0.5: 'rgba(255, 0, 0, 0.5)',
        0.75: 'rgba(255, 0, 0, 0.75)',
        1.0: 'rgba(255, 0, 0, 1.0)'
    }}).addTo(ht);
  }
const toggle_heatmap = document.querySelector('.control.heatmap')
toggle_heatmap.addEventListener('click', function () {
  if (isHeatmap) {
    isHeatmap = false;
    toggle_heatmap.style.backgroundImage = `url('${heatmap_off}')`;
    if (heatmapLayer) {
      ht.removeLayer(heatmapLayer);
    }
} else {
    isHeatmap = true;
    toggle_heatmap.style.backgroundImage = `url('${heatmap_on}')`;
    drawHeatmap(filterdata);
}
})
const toggle_cluster = document.querySelector('.control.cluster')
toggle_cluster.addEventListener('click', function () {
  if (isCluster) {
    isCluster = false;
    toggle_cluster.style.backgroundImage = `url('${cluster_off}')`;
    drawMarkers(filterdata)
} else {
  isCluster = true;
  toggle_cluster.style.backgroundImage = `url('${cluster_on}')`;
    drawMarkers(filterdata);
}
});
const copy_button = document.querySelector('.control.copy')
copy_button.addEventListener('click', function () {
  const formattedData = filterdata.map(item => ({
      lat: item.lat,
      lng: item.lng,
      heading: 0,
      pitch: 0,
      zoom: 0,
      panoId: item.panoId,
      extra:{
       tags: [item.date, ...item.update_type]}
  }));

  const formattedText = JSON.stringify(formattedData);
  navigator.clipboard.writeText(formattedText).then(() => {
      alert('JSON data has been copied to your clipboard');
  }).catch(err => {
      console.error('Failed to copy to clipboard', err);
  });
});

const filter_type=document.querySelector('.filter.type')
const checkboxContainer = document.getElementById('checkboxContainer-type');
filter_type.setAttribute('data-state', 'inactive')
filter_type.addEventListener('click', function () {
  if (this.getAttribute('data-state')=='inactive'){
    checkboxContainer.style.display='block'
    this.setAttribute('data-state', 'active');
    this.classList.add('active')
  }
  else{
    this.setAttribute('data-state', 'inactive')
    checkboxContainer.style.display='none'
    this.classList.remove('active');
  }
});
document.querySelectorAll('.checkbox-item input[type="checkbox"]').forEach(checkbox => {
  checkbox.addEventListener('change', function () {
      const type = this.dataset.type;
      if (this.checked) {
          filter_check.type.push(type);
      } else {
          filter_check.type = filter_check.type.filter(t => t !== type);
      }
      applyFilters();
  });
});

function intersect(array1, array2) {
  return array1.some(element => array2.includes(element));
}

function monthInRange(pano_date, monthRange) {
  const [startMonth, startYear] = monthRange[0].split(' ');
  const [endMonth, endYear] = monthRange[1].split(' ');

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const startIndex = months.indexOf(startMonth);
  const endIndex = months.indexOf(endMonth);
  const panoIndex = months.indexOf(pano_date.split(' ')[0]);
  const panoYear = pano_date.split(' ')[1];

  if (startYear === endYear) {
      return panoYear === startYear && panoIndex >= startIndex && panoIndex <= endIndex;
  } else {
      return (panoYear === startYear && panoIndex >= startIndex) ||
             (panoYear === endYear && panoIndex <= endIndex) ||
             (panoYear > startYear && panoYear < endYear);
  }
}

function applyFilters() {
  filterdata = update_data.filter(item => {
      const inDateRange = item.report_time >= filter_check.report_date[0] && item.report_time <= filter_check.report_date[1];
      
      const matchesType = filter_check.type.length === 0 || intersect(filter_check.type, item.update_type);
      
      const inMonthRange = filter_check.pano_date.length === 0 || monthInRange(item.date, filter_check.pano_date);
      
      return inDateRange && matchesType && inMonthRange;
  });

  if (filterdata) {
      drawMarkers(filterdata);
      if (isHeatmap) drawHeatmap(filterdata);
  }
}

const filter_date=document.querySelector('.filter.date')
let ismp=false
filter_date.addEventListener('click',function(){
  if(!ismp){
    ismp=true
    document.getElementById('monthpicker').style.display='block'}
  else {
    ismp=false
    document.getElementById('monthpicker').style.display='none'}
  
})

