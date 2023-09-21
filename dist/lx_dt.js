import Ia from "jquery";
/*! DataTables 1.13.5
 * ©2008-2023 SpryMedia Ltd - datatables.net/license
 */
var u = Ia,
  _ = function (e, r) {
    if (_.factory(e, r)) return _;
    if (this instanceof _) return u(e).DataTable(r);
    (r = e),
      (this.$ = function (i, o) {
        return this.api(!0).$(i, o);
      }),
      (this._ = function (i, o) {
        return this.api(!0).rows(i, o).data();
      }),
      (this.api = function (i) {
        return i ? new w(Be(this[R.iApiIndex])) : new w(this);
      }),
      (this.fnAddData = function (i, o) {
        var f = this.api(!0),
          s =
            Array.isArray(i) && (Array.isArray(i[0]) || u.isPlainObject(i[0]))
              ? f.rows.add(i)
              : f.row.add(i);
        return (o === void 0 || o) && f.draw(), s.flatten().toArray();
      }),
      (this.fnAdjustColumnSizing = function (i) {
        var o = this.api(!0).columns.adjust(),
          f = o.settings()[0],
          s = f.oScroll;
        i === void 0 || i ? o.draw(!1) : (s.sX !== "" || s.sY !== "") && ze(f);
      }),
      (this.fnClearTable = function (i) {
        var o = this.api(!0).clear();
        (i === void 0 || i) && o.draw();
      }),
      (this.fnClose = function (i) {
        this.api(!0).row(i).child.hide();
      }),
      (this.fnDeleteRow = function (i, o, f) {
        var s = this.api(!0),
          c = s.rows(i),
          d = c.settings()[0],
          h = d.aoData[c[0][0]];
        return (
          c.remove(),
          o && o.call(this, d, h),
          (f === void 0 || f) && s.draw(),
          h
        );
      }),
      (this.fnDestroy = function (i) {
        this.api(!0).destroy(i);
      }),
      (this.fnDraw = function (i) {
        this.api(!0).draw(i);
      }),
      (this.fnFilter = function (i, o, f, s, c, d) {
        var h = this.api(!0);
        o == null ? h.search(i, f, s, d) : h.column(o).search(i, f, s, d),
          h.draw();
      }),
      (this.fnGetData = function (i, o) {
        var f = this.api(!0);
        if (i !== void 0) {
          var s = i.nodeName ? i.nodeName.toLowerCase() : "";
          return o !== void 0 || s == "td" || s == "th"
            ? f.cell(i, o).data()
            : f.row(i).data() || null;
        }
        return f.data().toArray();
      }),
      (this.fnGetNodes = function (i) {
        var o = this.api(!0);
        return i !== void 0
          ? o.row(i).node()
          : o.rows().nodes().flatten().toArray();
      }),
      (this.fnGetPosition = function (i) {
        var o = this.api(!0),
          f = i.nodeName.toUpperCase();
        if (f == "TR") return o.row(i).index();
        if (f == "TD" || f == "TH") {
          var s = o.cell(i).index();
          return [s.row, s.columnVisible, s.column];
        }
        return null;
      }),
      (this.fnIsOpen = function (i) {
        return this.api(!0).row(i).child.isShown();
      }),
      (this.fnOpen = function (i, o, f) {
        return this.api(!0).row(i).child(o, f).show().child()[0];
      }),
      (this.fnPageChange = function (i, o) {
        var f = this.api(!0).page(i);
        (o === void 0 || o) && f.draw(!1);
      }),
      (this.fnSetColumnVis = function (i, o, f) {
        var s = this.api(!0).column(i).visible(o);
        (f === void 0 || f) && s.columns.adjust().draw();
      }),
      (this.fnSettings = function () {
        return Be(this[R.iApiIndex]);
      }),
      (this.fnSort = function (i) {
        this.api(!0).order(i).draw();
      }),
      (this.fnSortListener = function (i, o, f) {
        this.api(!0).order.listener(i, o, f);
      }),
      (this.fnUpdate = function (i, o, f, s, c) {
        var d = this.api(!0);
        return (
          f == null ? d.row(o).data(i) : d.cell(o, f).data(i),
          (c === void 0 || c) && d.columns.adjust(),
          (s === void 0 || s) && d.draw(),
          0
        );
      }),
      (this.fnVersionCheck = R.fnVersionCheck);
    var a = this,
      n = r === void 0,
      l = this.length;
    n && (r = {}), (this.oApi = this.internal = R.internal);
    for (var t in _.ext.internal) t && (this[t] = Aa(t));
    return (
      this.each(function () {
        var i = {},
          o =
            l > 1
              ? // optimisation for single table case
                ur(i, r, !0)
              : r,
          f = 0,
          s,
          c = this.getAttribute("id"),
          d = !1,
          h = _.defaults,
          v = u(this);
        if (this.nodeName.toLowerCase() != "table") {
          Y(
            null,
            0,
            "Non-table node initialisation (" + this.nodeName + ")",
            2
          );
          return;
        }
        Hr(h),
          Xr(h.column),
          ne(h, h, !0),
          ne(h.column, h.column, !0),
          ne(h, u.extend(o, v.data()), !0);
        var b = _.settings;
        for (f = 0, s = b.length; f < s; f++) {
          var m = b[f];
          if (
            m.nTable == this ||
            (m.nTHead && m.nTHead.parentNode == this) ||
            (m.nTFoot && m.nTFoot.parentNode == this)
          ) {
            var D = o.bRetrieve !== void 0 ? o.bRetrieve : h.bRetrieve,
              y = o.bDestroy !== void 0 ? o.bDestroy : h.bDestroy;
            if (n || D) return m.oInstance;
            if (y) {
              m.oInstance.fnDestroy();
              break;
            } else {
              Y(m, 0, "Cannot reinitialise DataTable", 3);
              return;
            }
          }
          if (m.sTableId == this.id) {
            b.splice(f, 1);
            break;
          }
        }
        (c === null || c === "") &&
          ((c = "DataTables_Table_" + _.ext._unique++), (this.id = c));
        var p = u.extend(!0, {}, _.models.oSettings, {
          sDestroyWidth: v[0].style.width,
          sInstance: c,
          sTableId: c,
        });
        (p.nTable = this),
          (p.oApi = a.internal),
          (p.oInit = o),
          b.push(p),
          (p.oInstance = a.length === 1 ? a : v.dataTable()),
          Hr(o),
          tr(o.oLanguage),
          o.aLengthMenu &&
            !o.iDisplayLength &&
            (o.iDisplayLength = Array.isArray(o.aLengthMenu[0])
              ? o.aLengthMenu[0][0]
              : o.aLengthMenu[0]),
          (o = ur(u.extend(!0, {}, h), o)),
          Z(p.oFeatures, o, [
            "bPaginate",
            "bLengthChange",
            "bFilter",
            "bSort",
            "bSortMulti",
            "bInfo",
            "bProcessing",
            "bAutoWidth",
            "bSortClasses",
            "bServerSide",
            "bDeferRender",
          ]),
          Z(p, o, [
            "asStripeClasses",
            "ajax",
            "fnServerData",
            "fnFormatNumber",
            "sServerMethod",
            "aaSorting",
            "aaSortingFixed",
            "aLengthMenu",
            "sPaginationType",
            "sAjaxSource",
            "sAjaxDataProp",
            "iStateDuration",
            "sDom",
            "bSortCellsTop",
            "iTabIndex",
            "fnStateLoadCallback",
            "fnStateSaveCallback",
            "renderer",
            "searchDelay",
            "rowId",
            ["iCookieDuration", "iStateDuration"],
            // backwards compat
            ["oSearch", "oPreviousSearch"],
            ["aoSearchCols", "aoPreSearchCols"],
            ["iDisplayLength", "_iDisplayLength"],
          ]),
          Z(p.oScroll, o, [
            ["sScrollX", "sX"],
            ["sScrollXInner", "sXInner"],
            ["sScrollY", "sY"],
            ["bScrollCollapse", "bCollapse"],
          ]),
          Z(p.oLanguage, o, "fnInfoCallback"),
          E(p, "aoDrawCallback", o.fnDrawCallback, "user"),
          E(p, "aoServerParams", o.fnServerParams, "user"),
          E(p, "aoStateSaveParams", o.fnStateSaveParams, "user"),
          E(p, "aoStateLoadParams", o.fnStateLoadParams, "user"),
          E(p, "aoStateLoaded", o.fnStateLoaded, "user"),
          E(p, "aoRowCallback", o.fnRowCallback, "user"),
          E(p, "aoRowCreatedCallback", o.fnCreatedRow, "user"),
          E(p, "aoHeaderCallback", o.fnHeaderCallback, "user"),
          E(p, "aoFooterCallback", o.fnFooterCallback, "user"),
          E(p, "aoInitComplete", o.fnInitComplete, "user"),
          E(p, "aoPreDrawCallback", o.fnPreDrawCallback, "user"),
          (p.rowIdFn = he(o.rowId)),
          qr(p);
        var T = p.oClasses;
        if (
          (u.extend(T, _.ext.classes, o.oClasses),
          v.addClass(T.sTable),
          p.iInitDisplayStart === void 0 &&
            ((p.iInitDisplayStart = o.iDisplayStart),
            (p._iDisplayStart = o.iDisplayStart)),
          o.iDeferLoading !== null)
        ) {
          p.bDeferLoading = !0;
          var S = Array.isArray(o.iDeferLoading);
          (p._iRecordsDisplay = S ? o.iDeferLoading[0] : o.iDeferLoading),
            (p._iRecordsTotal = S ? o.iDeferLoading[1] : o.iDeferLoading);
        }
        var L = p.oLanguage;
        u.extend(!0, L, o.oLanguage),
          L.sUrl
            ? (u.ajax({
                dataType: "json",
                url: L.sUrl,
                success: function (I) {
                  ne(h.oLanguage, I),
                    tr(I),
                    u.extend(!0, L, I, p.oInit.oLanguage),
                    x(p, null, "i18n", [p]),
                    De(p);
                },
                error: function () {
                  De(p);
                },
              }),
              (d = !0))
            : x(p, null, "i18n", [p]),
          o.asStripeClasses === null &&
            (p.asStripeClasses = [T.sStripeOdd, T.sStripeEven]);
        var X = p.asStripeClasses,
          q = v.children("tbody").find("tr").eq(0);
        u.inArray(
          !0,
          u.map(X, function (I, N) {
            return q.hasClass(I);
          })
        ) !== -1 &&
          (u("tbody tr", this).removeClass(X.join(" ")),
          (p.asDestroyStripes = X.slice()));
        var k = [],
          J,
          z = this.getElementsByTagName("thead");
        if (
          (z.length !== 0 && (Ce(p.aoHeader, z[0]), (k = Ge(p))),
          o.aoColumns === null)
        )
          for (J = [], f = 0, s = k.length; f < s; f++) J.push(null);
        else J = o.aoColumns;
        for (f = 0, s = J.length; f < s; f++) cr(p, k ? k[f] : null);
        if (
          (Jr(p, o.aoColumnDefs, J, function (I, N) {
            Oe(p, I, N);
          }),
          q.length)
        ) {
          var M = function (I, N) {
            return I.getAttribute("data-" + N) !== null ? N : null;
          };
          u(q[0])
            .children("th, td")
            .each(function (I, N) {
              var G = p.aoColumns[I];
              if ((G || Y(p, 0, "Incorrect column count", 18), G.mData === I)) {
                var $ = M(N, "sort") || M(N, "order"),
                  B = M(N, "filter") || M(N, "search");
                ($ !== null || B !== null) &&
                  ((G.mData = {
                    _: I + ".display",
                    sort: $ !== null ? I + ".@data-" + $ : void 0,
                    type: $ !== null ? I + ".@data-" + $ : void 0,
                    filter: B !== null ? I + ".@data-" + B : void 0,
                  }),
                  (G._isArrayHost = !0),
                  Oe(p, I));
              }
            });
        }
        var ee = p.oFeatures,
          fe = function () {
            if (o.aaSorting === void 0) {
              var I = p.aaSorting;
              for (f = 0, s = I.length; f < s; f++)
                I[f][1] = p.aoColumns[f].asSorting[0];
            }
            ke(p),
              ee.bSort &&
                E(p, "aoDrawCallback", function () {
                  if (p.bSorted) {
                    var re = pe(p),
                      ae = {};
                    u.each(re, function (Qe, ue) {
                      ae[ue.src] = ue.dir;
                    }),
                      x(p, null, "order", [p, re, ae]),
                      pa(p);
                  }
                }),
              E(
                p,
                "aoDrawCallback",
                function () {
                  (p.bSorted || j(p) === "ssp" || ee.bDeferRender) && ke(p);
                },
                "sc"
              );
            var N = v.children("caption").each(function () {
                this._captionSide = u(this).css("caption-side");
              }),
              G = v.children("thead");
            G.length === 0 && (G = u("<thead/>").appendTo(v)),
              (p.nTHead = G[0]);
            var $ = v.children("tbody");
            $.length === 0 && ($ = u("<tbody/>").insertAfter(G)),
              (p.nTBody = $[0]);
            var B = v.children("tfoot");
            if (
              (B.length === 0 &&
                N.length > 0 &&
                (p.oScroll.sX !== "" || p.oScroll.sY !== "") &&
                (B = u("<tfoot/>").appendTo(v)),
              B.length === 0 || B.children().length === 0
                ? v.addClass(T.sNoFooter)
                : B.length > 0 && ((p.nTFoot = B[0]), Ce(p.aoFooter, p.nTFoot)),
              o.aaData)
            )
              for (f = 0; f < o.aaData.length; f++) le(p, o.aaData[f]);
            else
              (p.bDeferLoading || j(p) == "dom") &&
                qe(p, u(p.nTBody).children("tr"));
            (p.aiDisplay = p.aiDisplayMaster.slice()),
              (p.bInitialised = !0),
              d === !1 && De(p);
          };
        E(p, "aoDrawCallback", Le, "state_save"),
          o.bStateSave ? ((ee.bStateSave = !0), _a(p, o, fe)) : fe();
      }),
      (a = null),
      this
    );
  },
  R,
  w,
  C,
  A,
  er = {},
  Rr = /[\r\n\u2028]/g,
  Me = /<.*?>/g,
  Fa =
    /^\d{2,4}[\.\/\-]\d{1,2}[\.\/\-]\d{1,2}([T ]{1}\d{1,2}[:\.]\d{2}([\.:]\d{2})?)?$/,
  La = new RegExp(
    "(\\" +
      [
        "/",
        ".",
        "*",
        "+",
        "?",
        "|",
        "(",
        ")",
        "[",
        "]",
        "{",
        "}",
        "\\",
        "$",
        "^",
        "-",
      ].join("|\\") +
      ")",
    "g"
  ),
  ar = /['\u00A0,$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfkɃΞ]/gi,
  Q = function (e) {
    return !e || e === !0 || e === "-";
  },
  Wr = function (e) {
    var r = parseInt(e, 10);
    return !isNaN(r) && isFinite(e) ? r : null;
  },
  kr = function (e, r) {
    return (
      er[r] || (er[r] = new RegExp(_r(r), "g")),
      typeof e == "string" && r !== "."
        ? e.replace(/\./g, "").replace(er[r], ".")
        : e
    );
  },
  nr = function (e, r, a) {
    var n = typeof e,
      l = n === "string";
    return n === "number" || n === "bigint" || Q(e)
      ? !0
      : (r && l && (e = kr(e, r)),
        a && l && (e = e.replace(ar, "")),
        !isNaN(parseFloat(e)) && isFinite(e));
  },
  Ra = function (e) {
    return Q(e) || typeof e == "string";
  },
  Pr = function (e, r, a) {
    if (Q(e)) return !0;
    var n = Ra(e);
    return n && nr(Pa(e), r, a) ? !0 : null;
  },
  V = function (e, r, a) {
    var n = [],
      l = 0,
      t = e.length;
    if (a !== void 0) for (; l < t; l++) e[l] && e[l][r] && n.push(e[l][r][a]);
    else for (; l < t; l++) e[l] && n.push(e[l][r]);
    return n;
  },
  Se = function (e, r, a, n) {
    var l = [],
      t = 0,
      i = r.length;
    if (n !== void 0) for (; t < i; t++) e[r[t]][a] && l.push(e[r[t]][a][n]);
    else for (; t < i; t++) l.push(e[r[t]][a]);
    return l;
  },
  de = function (e, r) {
    var a = [],
      n;
    r === void 0 ? ((r = 0), (n = e)) : ((n = r), (r = e));
    for (var l = r; l < n; l++) a.push(l);
    return a;
  },
  Br = function (e) {
    for (var r = [], a = 0, n = e.length; a < n; a++) e[a] && r.push(e[a]);
    return r;
  },
  Pa = function (e) {
    return e.replace(Me, "").replace(/<script/i, "");
  },
  Ha = function (e) {
    if (e.length < 2) return !0;
    for (var r = e.slice().sort(), a = r[0], n = 1, l = r.length; n < l; n++) {
      if (r[n] === a) return !1;
      a = r[n];
    }
    return !0;
  },
  Ve = function (e) {
    if (Ha(e)) return e.slice();
    var r = [],
      a,
      n,
      l = e.length,
      t,
      i = 0;
    e: for (n = 0; n < l; n++) {
      for (a = e[n], t = 0; t < i; t++) if (r[t] === a) continue e;
      r.push(a), i++;
    }
    return r;
  },
  Ur = function (e, r) {
    if (Array.isArray(r)) for (var a = 0; a < r.length; a++) Ur(e, r[a]);
    else e.push(r);
    return e;
  },
  Vr = function (e, r) {
    return r === void 0 && (r = 0), this.indexOf(e, r) !== -1;
  };
Array.isArray ||
  (Array.isArray = function (e) {
    return Object.prototype.toString.call(e) === "[object Array]";
  });
Array.prototype.includes || (Array.prototype.includes = Vr);
String.prototype.trim ||
  (String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
  });
String.prototype.includes || (String.prototype.includes = Vr);
_.util = {
  /**
   * Throttle the calls to a function. Arguments and context are maintained
   * for the throttled function.
   *
   * @param {function} fn Function to be called
   * @param {integer} freq Call frequency in mS
   * @return {function} Wrapped function
   */
  throttle: function (e, r) {
    var a = r !== void 0 ? r : 200,
      n,
      l;
    return function () {
      var t = this,
        i = +(/* @__PURE__ */ new Date()),
        o = arguments;
      n && i < n + a
        ? (clearTimeout(l),
          (l = setTimeout(function () {
            (n = void 0), e.apply(t, o);
          }, a)))
        : ((n = i), e.apply(t, o));
    };
  },
  /**
   * Escape a string such that it can be used in a regular expression
   *
   *  @param {string} val string to escape
   *  @returns {string} escaped string
   */
  escapeRegex: function (e) {
    return e.replace(La, "\\$1");
  },
  /**
   * Create a function that will write to a nested object or array
   * @param {*} source JSON notation string
   * @returns Write function
   */
  set: function (e) {
    if (u.isPlainObject(e)) return _.util.set(e._);
    if (e === null) return function () {};
    if (typeof e == "function")
      return function (a, n, l) {
        e(a, "set", n, l);
      };
    if (
      typeof e == "string" &&
      (e.indexOf(".") !== -1 || e.indexOf("[") !== -1 || e.indexOf("(") !== -1)
    ) {
      var r = function (a, n, l) {
        for (
          var t = lr(l),
            i,
            o = t[t.length - 1],
            f,
            s,
            c,
            d,
            h = 0,
            v = t.length - 1;
          h < v;
          h++
        ) {
          if (t[h] === "__proto__" || t[h] === "constructor")
            throw new Error("Cannot set prototype values");
          if (((f = t[h].match(be)), (s = t[h].match(se)), f)) {
            if (
              ((t[h] = t[h].replace(be, "")),
              (a[t[h]] = []),
              (i = t.slice()),
              i.splice(0, h + 1),
              (d = i.join(".")),
              Array.isArray(n))
            )
              for (var b = 0, m = n.length; b < m; b++)
                (c = {}), r(c, n[b], d), a[t[h]].push(c);
            else a[t[h]] = n;
            return;
          } else s && ((t[h] = t[h].replace(se, "")), (a = a[t[h]](n)));
          (a[t[h]] === null || a[t[h]] === void 0) && (a[t[h]] = {}),
            (a = a[t[h]]);
        }
        o.match(se)
          ? (a = a[o.replace(se, "")](n))
          : (a[o.replace(be, "")] = n);
      };
      return function (a, n) {
        return r(a, n, e);
      };
    } else
      return function (a, n) {
        a[e] = n;
      };
  },
  /**
   * Create a function that will read nested objects from arrays, based on JSON notation
   * @param {*} source JSON notation string
   * @returns Value read
   */
  get: function (e) {
    if (u.isPlainObject(e)) {
      var r = {};
      return (
        u.each(e, function (n, l) {
          l && (r[n] = _.util.get(l));
        }),
        function (n, l, t, i) {
          var o = r[l] || r._;
          return o !== void 0 ? o(n, l, t, i) : n;
        }
      );
    } else {
      if (e === null)
        return function (n) {
          return n;
        };
      if (typeof e == "function")
        return function (n, l, t, i) {
          return e(n, l, t, i);
        };
      if (
        typeof e == "string" &&
        (e.indexOf(".") !== -1 ||
          e.indexOf("[") !== -1 ||
          e.indexOf("(") !== -1)
      ) {
        var a = function (n, l, t) {
          var i, o, f, s;
          if (t !== "")
            for (var c = lr(t), d = 0, h = c.length; d < h; d++) {
              if (((i = c[d].match(be)), (o = c[d].match(se)), i)) {
                if (
                  ((c[d] = c[d].replace(be, "")),
                  c[d] !== "" && (n = n[c[d]]),
                  (f = []),
                  c.splice(0, d + 1),
                  (s = c.join(".")),
                  Array.isArray(n))
                )
                  for (var v = 0, b = n.length; v < b; v++)
                    f.push(a(n[v], l, s));
                var m = i[0].substring(1, i[0].length - 1);
                n = m === "" ? f : f.join(m);
                break;
              } else if (o) {
                (c[d] = c[d].replace(se, "")), (n = n[c[d]]());
                continue;
              }
              if (n === null || n[c[d]] === null) return null;
              if (n === void 0 || n[c[d]] === void 0) return;
              n = n[c[d]];
            }
          return n;
        };
        return function (n, l) {
          return a(n, l, e);
        };
      } else
        return function (n, l) {
          return n[e];
        };
    }
  },
};
function we(e) {
  var r = "a aa ai ao as b fn i m o s ",
    a,
    n,
    l = {};
  u.each(e, function (t, i) {
    (a = t.match(/^([^A-Z]+?)([A-Z])/)),
      a &&
        r.indexOf(a[1] + " ") !== -1 &&
        ((n = t.replace(a[0], a[2].toLowerCase())),
        (l[n] = t),
        a[1] === "o" && we(e[t]));
  }),
    (e._hungarianMap = l);
}
function ne(e, r, a) {
  e._hungarianMap || we(e);
  var n;
  u.each(r, function (l, t) {
    (n = e._hungarianMap[l]),
      n !== void 0 &&
        (a || r[n] === void 0) &&
        (n.charAt(0) === "o"
          ? (r[n] || (r[n] = {}), u.extend(!0, r[n], r[l]), ne(e[n], r[n], a))
          : (r[n] = r[l]));
  });
}
function tr(e) {
  var r = _.defaults.oLanguage,
    a = r.sDecimal;
  if ((a && sr(a), e)) {
    var n = e.sZeroRecords;
    !e.sEmptyTable &&
      n &&
      r.sEmptyTable === "No data available in table" &&
      Z(e, e, "sZeroRecords", "sEmptyTable"),
      !e.sLoadingRecords &&
        n &&
        r.sLoadingRecords === "Loading..." &&
        Z(e, e, "sZeroRecords", "sLoadingRecords"),
      e.sInfoThousands && (e.sThousands = e.sInfoThousands);
    var l = e.sDecimal;
    l && a !== l && sr(l);
  }
}
var O = function (e, r, a) {
  e[r] !== void 0 && (e[a] = e[r]);
};
function Hr(e) {
  O(e, "ordering", "bSort"),
    O(e, "orderMulti", "bSortMulti"),
    O(e, "orderClasses", "bSortClasses"),
    O(e, "orderCellsTop", "bSortCellsTop"),
    O(e, "order", "aaSorting"),
    O(e, "orderFixed", "aaSortingFixed"),
    O(e, "paging", "bPaginate"),
    O(e, "pagingType", "sPaginationType"),
    O(e, "pageLength", "iDisplayLength"),
    O(e, "searching", "bFilter"),
    typeof e.sScrollX == "boolean" && (e.sScrollX = e.sScrollX ? "100%" : ""),
    typeof e.scrollX == "boolean" && (e.scrollX = e.scrollX ? "100%" : "");
  var r = e.aoSearchCols;
  if (r)
    for (var a = 0, n = r.length; a < n; a++)
      r[a] && ne(_.models.oSearch, r[a]);
}
function Xr(e) {
  O(e, "orderable", "bSortable"),
    O(e, "orderData", "aDataSort"),
    O(e, "orderSequence", "asSorting"),
    O(e, "orderDataType", "sortDataType");
  var r = e.aDataSort;
  typeof r == "number" && !Array.isArray(r) && (e.aDataSort = [r]);
}
function qr(e) {
  if (!_.__browser) {
    var r = {};
    _.__browser = r;
    var a = u("<div/>")
        .css({
          position: "fixed",
          top: 0,
          left: u(window).scrollLeft() * -1,
          // allow for scrolling
          height: 1,
          width: 1,
          overflow: "hidden",
        })
        .append(
          u("<div/>")
            .css({
              position: "absolute",
              top: 1,
              left: 1,
              width: 100,
              overflow: "scroll",
            })
            .append(
              u("<div/>").css({
                width: "100%",
                height: 10,
              })
            )
        )
        .appendTo("body"),
      n = a.children(),
      l = n.children();
    (r.barWidth = n[0].offsetWidth - n[0].clientWidth),
      (r.bScrollOversize =
        l[0].offsetWidth === 100 && n[0].clientWidth !== 100),
      (r.bScrollbarLeft = Math.round(l.offset().left) !== 1),
      (r.bBounding = !!a[0].getBoundingClientRect().width),
      a.remove();
  }
  u.extend(e.oBrowser, _.__browser),
    (e.oScroll.iBarWidth = _.__browser.barWidth);
}
function Nr(e, r, a, n, l, t) {
  var i = n,
    o,
    f = !1;
  for (a !== void 0 && ((o = a), (f = !0)); i !== l; )
    e.hasOwnProperty(i) &&
      ((o = f ? r(o, e[i], i, e) : e[i]), (f = !0), (i += t));
  return o;
}
function cr(e, r) {
  var a = _.defaults.column,
    n = e.aoColumns.length,
    l = u.extend({}, _.models.oColumn, a, {
      nTh: r || document.createElement("th"),
      sTitle: a.sTitle ? a.sTitle : r ? r.innerHTML : "",
      aDataSort: a.aDataSort ? a.aDataSort : [n],
      mData: a.mData ? a.mData : n,
      idx: n,
    });
  e.aoColumns.push(l);
  var t = e.aoPreSearchCols;
  (t[n] = u.extend({}, _.models.oSearch, t[n])), Oe(e, n, u(r).data());
}
function Oe(e, r, a) {
  var n = e.aoColumns[r],
    l = e.oClasses,
    t = u(n.nTh);
  if (!n.sWidthOrig) {
    n.sWidthOrig = t.attr("width") || null;
    var i = (t.attr("style") || "").match(/width:\s*(\d+[pxem%]+)/);
    i && (n.sWidthOrig = i[1]);
  }
  if (a != null) {
    Xr(a),
      ne(_.defaults.column, a, !0),
      a.mDataProp !== void 0 && !a.mData && (a.mData = a.mDataProp),
      a.sType && (n._sManualType = a.sType),
      a.className && !a.sClass && (a.sClass = a.className),
      a.sClass && t.addClass(a.sClass);
    var o = n.sClass;
    u.extend(n, a),
      Z(n, a, "sWidth", "sWidthOrig"),
      o !== n.sClass && (n.sClass = o + " " + n.sClass),
      a.iDataSort !== void 0 && (n.aDataSort = [a.iDataSort]),
      Z(n, a, "aDataSort");
  }
  var f = n.mData,
    s = he(f),
    c = n.mRender ? he(n.mRender) : null,
    d = function (b) {
      return typeof b == "string" && b.indexOf("@") !== -1;
    };
  (n._bAttrSrc = u.isPlainObject(f) && (d(f.sort) || d(f.type) || d(f.filter))),
    (n._setter = null),
    (n.fnGetData = function (b, m, D) {
      var y = s(b, m, void 0, D);
      return c && m ? c(y, m, b, D) : y;
    }),
    (n.fnSetData = function (b, m, D) {
      return te(f)(b, m, D);
    }),
    typeof f != "number" && !n._isArrayHost && (e._rowReadObject = !0),
    e.oFeatures.bSort || ((n.bSortable = !1), t.addClass(l.sSortableNone));
  var h = u.inArray("asc", n.asSorting) !== -1,
    v = u.inArray("desc", n.asSorting) !== -1;
  !n.bSortable || (!h && !v)
    ? ((n.sSortingClass = l.sSortableNone), (n.sSortingClassJUI = ""))
    : h && !v
    ? ((n.sSortingClass = l.sSortableAsc),
      (n.sSortingClassJUI = l.sSortJUIAscAllowed))
    : !h && v
    ? ((n.sSortingClass = l.sSortableDesc),
      (n.sSortingClassJUI = l.sSortJUIDescAllowed))
    : ((n.sSortingClass = l.sSortable), (n.sSortingClassJUI = l.sSortJUI));
}
function Te(e) {
  if (e.oFeatures.bAutoWidth !== !1) {
    var r = e.aoColumns;
    Dr(e);
    for (var a = 0, n = r.length; a < n; a++)
      r[a].nTh.style.width = r[a].sWidth;
  }
  var l = e.oScroll;
  (l.sY !== "" || l.sX !== "") && ze(e), x(e, null, "column-sizing", [e]);
}
function xe(e, r) {
  var a = Xe(e, "bVisible");
  return typeof a[r] == "number" ? a[r] : null;
}
function ge(e, r) {
  var a = Xe(e, "bVisible"),
    n = u.inArray(r, a);
  return n !== -1 ? n : null;
}
function ve(e) {
  var r = 0;
  return (
    u.each(e.aoColumns, function (a, n) {
      n.bVisible && u(n.nTh).css("display") !== "none" && r++;
    }),
    r
  );
}
function Xe(e, r) {
  var a = [];
  return (
    u.map(e.aoColumns, function (n, l) {
      n[r] && a.push(l);
    }),
    a
  );
}
function dr(e) {
  var r = e.aoColumns,
    a = e.aoData,
    n = _.ext.type.detect,
    l,
    t,
    i,
    o,
    f,
    s,
    c,
    d,
    h;
  for (l = 0, t = r.length; l < t; l++)
    if (((c = r[l]), (h = []), !c.sType && c._sManualType))
      c.sType = c._sManualType;
    else if (!c.sType) {
      for (i = 0, o = n.length; i < o; i++) {
        for (
          f = 0, s = a.length;
          f < s &&
          (h[f] === void 0 && (h[f] = W(e, f, l, "type")),
          (d = n[i](h[f], e)),
          !((!d && i !== n.length - 1) || (d === "html" && !Q(h[f]))));
          f++
        );
        if (d) {
          c.sType = d;
          break;
        }
      }
      c.sType || (c.sType = "string");
    }
}
function Jr(e, r, a, n) {
  var l,
    t,
    i,
    o,
    f,
    s,
    c,
    d = e.aoColumns;
  if (r)
    for (l = r.length - 1; l >= 0; l--) {
      c = r[l];
      var h =
        c.target !== void 0
          ? c.target
          : c.targets !== void 0
          ? c.targets
          : c.aTargets;
      for (Array.isArray(h) || (h = [h]), i = 0, o = h.length; i < o; i++)
        if (typeof h[i] == "number" && h[i] >= 0) {
          for (; d.length <= h[i]; ) cr(e);
          n(h[i], c);
        } else if (typeof h[i] == "number" && h[i] < 0) n(d.length + h[i], c);
        else if (typeof h[i] == "string")
          for (f = 0, s = d.length; f < s; f++)
            (h[i] == "_all" || u(d[f].nTh).hasClass(h[i])) && n(f, c);
    }
  if (a) for (l = 0, t = a.length; l < t; l++) n(l, a[l]);
}
function le(e, r, a, n) {
  var l = e.aoData.length,
    t = u.extend(!0, {}, _.models.oRow, {
      src: a ? "dom" : "data",
      idx: l,
    });
  (t._aData = r), e.aoData.push(t);
  for (var i = e.aoColumns, o = 0, f = i.length; o < f; o++) i[o].sType = null;
  e.aiDisplayMaster.push(l);
  var s = e.rowIdFn(r);
  return (
    s !== void 0 && (e.aIds[s] = t),
    (a || !e.oFeatures.bDeferRender) && vr(e, l, a, n),
    l
  );
}
function qe(e, r) {
  var a;
  return (
    r instanceof u || (r = u(r)),
    r.map(function (n, l) {
      return (a = hr(e, l)), le(e, a.data, l, a.cells);
    })
  );
}
function Na(e, r) {
  return r._DT_RowIndex !== void 0 ? r._DT_RowIndex : null;
}
function ja(e, r, a) {
  return u.inArray(a, e.aoData[r].anCells);
}
function W(e, r, a, n) {
  n === "search" ? (n = "filter") : n === "order" && (n = "sort");
  var l = e.iDraw,
    t = e.aoColumns[a],
    i = e.aoData[r]._aData,
    o = t.sDefaultContent,
    f = t.fnGetData(i, n, {
      settings: e,
      row: r,
      col: a,
    });
  if (f === void 0)
    return (
      e.iDrawError != l &&
        o === null &&
        (Y(
          e,
          0,
          "Requested unknown parameter " +
            (typeof t.mData == "function"
              ? "{function}"
              : "'" + t.mData + "'") +
            " for row " +
            r +
            ", column " +
            a,
          4
        ),
        (e.iDrawError = l)),
      o
    );
  if ((f === i || f === null) && o !== null && n !== void 0) f = o;
  else if (typeof f == "function") return f.call(i);
  if (f === null && n === "display") return "";
  if (n === "filter") {
    var s = _.ext.type.search;
    s[t.sType] && (f = s[t.sType](f));
  }
  return f;
}
function Gr(e, r, a, n) {
  var l = e.aoColumns[a],
    t = e.aoData[r]._aData;
  l.fnSetData(t, n, {
    settings: e,
    row: r,
    col: a,
  });
}
var be = /\[.*?\]$/,
  se = /\(\)$/;
function lr(e) {
  return u.map(e.match(/(\\.|[^\.])+/g) || [""], function (r) {
    return r.replace(/\\\./g, ".");
  });
}
var he = _.util.get,
  te = _.util.set;
function ir(e) {
  return V(e.aoData, "_aData");
}
function Je(e) {
  (e.aoData.length = 0),
    (e.aiDisplayMaster.length = 0),
    (e.aiDisplay.length = 0),
    (e.aIds = {});
}
function Ne(e, r, a) {
  for (var n = -1, l = 0, t = e.length; l < t; l++)
    e[l] == r ? (n = l) : e[l] > r && e[l]--;
  n != -1 && a === void 0 && e.splice(n, 1);
}
function Ae(e, r, a, n) {
  var l = e.aoData[r],
    t,
    i,
    o = function (c, d) {
      for (; c.childNodes.length; ) c.removeChild(c.firstChild);
      c.innerHTML = W(e, r, d, "display");
    };
  if (a === "dom" || ((!a || a === "auto") && l.src === "dom"))
    l._aData = hr(e, l, n, n === void 0 ? void 0 : l._aData).data;
  else {
    var f = l.anCells;
    if (f)
      if (n !== void 0) o(f[n], n);
      else for (t = 0, i = f.length; t < i; t++) o(f[t], t);
  }
  (l._aSortData = null), (l._aFilterData = null);
  var s = e.aoColumns;
  if (n !== void 0) s[n].sType = null;
  else {
    for (t = 0, i = s.length; t < i; t++) s[t].sType = null;
    pr(e, l);
  }
}
function hr(e, r, a, n) {
  var l = [],
    t = r.firstChild,
    i,
    o,
    f = 0,
    s,
    c = e.aoColumns,
    d = e._rowReadObject;
  n = n !== void 0 ? n : d ? {} : [];
  var h = function (p, T) {
      if (typeof p == "string") {
        var S = p.indexOf("@");
        if (S !== -1) {
          var L = p.substring(S + 1),
            X = te(p);
          X(n, T.getAttribute(L));
        }
      }
    },
    v = function (p) {
      if (a === void 0 || a === f)
        if (((o = c[f]), (s = p.innerHTML.trim()), o && o._bAttrSrc)) {
          var T = te(o.mData._);
          T(n, s), h(o.mData.sort, p), h(o.mData.type, p), h(o.mData.filter, p);
        } else
          d
            ? (o._setter || (o._setter = te(o.mData)), o._setter(n, s))
            : (n[f] = s);
      f++;
    };
  if (t)
    for (; t; )
      (i = t.nodeName.toUpperCase()),
        (i == "TD" || i == "TH") && (v(t), l.push(t)),
        (t = t.nextSibling);
  else {
    l = r.anCells;
    for (var b = 0, m = l.length; b < m; b++) v(l[b]);
  }
  var D = r.firstChild ? r : r.nTr;
  if (D) {
    var y = D.getAttribute("id");
    y && te(e.rowId)(n, y);
  }
  return {
    data: n,
    cells: l,
  };
}
function vr(e, r, a, n) {
  var l = e.aoData[r],
    t = l._aData,
    i = [],
    o,
    f,
    s,
    c,
    d,
    h;
  if (l.nTr === null) {
    for (
      o = a || document.createElement("tr"),
        l.nTr = o,
        l.anCells = i,
        o._DT_RowIndex = r,
        pr(e, l),
        c = 0,
        d = e.aoColumns.length;
      c < d;
      c++
    )
      (s = e.aoColumns[c]),
        (h = !a),
        (f = h ? document.createElement(s.sCellType) : n[c]),
        f || Y(e, 0, "Incorrect column count", 18),
        (f._DT_CellIndex = {
          row: r,
          column: c,
        }),
        i.push(f),
        (h ||
          ((s.mRender || s.mData !== c) &&
            (!u.isPlainObject(s.mData) || s.mData._ !== c + ".display"))) &&
          (f.innerHTML = W(e, r, c, "display")),
        s.sClass && (f.className += " " + s.sClass),
        s.bVisible && !a
          ? o.appendChild(f)
          : !s.bVisible && a && f.parentNode.removeChild(f),
        s.fnCreatedCell &&
          s.fnCreatedCell.call(e.oInstance, f, W(e, r, c), t, r, c);
    x(e, "aoRowCreatedCallback", null, [o, t, r, i]);
  }
}
function pr(e, r) {
  var a = r.nTr,
    n = r._aData;
  if (a) {
    var l = e.rowIdFn(n);
    if ((l && (a.id = l), n.DT_RowClass)) {
      var t = n.DT_RowClass.split(" ");
      (r.__rowc = r.__rowc ? Ve(r.__rowc.concat(t)) : t),
        u(a).removeClass(r.__rowc.join(" ")).addClass(n.DT_RowClass);
    }
    n.DT_RowAttr && u(a).attr(n.DT_RowAttr),
      n.DT_RowData && u(a).data(n.DT_RowData);
  }
}
function $r(e) {
  var r,
    a,
    n,
    l,
    t,
    i = e.nTHead,
    o = e.nTFoot,
    f = u("th, td", i).length === 0,
    s = e.oClasses,
    c = e.aoColumns;
  for (f && (l = u("<tr/>").appendTo(i)), r = 0, a = c.length; r < a; r++)
    (t = c[r]),
      (n = u(t.nTh).addClass(t.sClass)),
      f && n.appendTo(l),
      e.oFeatures.bSort &&
        (n.addClass(t.sSortingClass),
        t.bSortable !== !1 &&
          (n.attr("tabindex", e.iTabIndex).attr("aria-controls", e.sTableId),
          Cr(e, t.nTh, r))),
      t.sTitle != n[0].innerHTML && n.html(t.sTitle),
      Tr(e, "header")(e, n, t, s);
  if (
    (f && Ce(e.aoHeader, i),
    u(i).children("tr").children("th, td").addClass(s.sHeaderTH),
    u(o).children("tr").children("th, td").addClass(s.sFooterTH),
    o !== null)
  ) {
    var d = e.aoFooter[0];
    for (r = 0, a = d.length; r < a; r++)
      (t = c[r]),
        t
          ? ((t.nTf = d[r].cell), t.sClass && u(t.nTf).addClass(t.sClass))
          : Y(e, 0, "Incorrect column count", 18);
  }
}
function ye(e, r, a) {
  var n,
    l,
    t,
    i,
    o,
    f,
    s,
    c = [],
    d = [],
    h = e.aoColumns.length,
    v,
    b;
  if (r) {
    for (a === void 0 && (a = !1), n = 0, l = r.length; n < l; n++) {
      for (c[n] = r[n].slice(), c[n].nTr = r[n].nTr, t = h - 1; t >= 0; t--)
        !e.aoColumns[t].bVisible && !a && c[n].splice(t, 1);
      d.push([]);
    }
    for (n = 0, l = c.length; n < l; n++) {
      if (((s = c[n].nTr), s)) for (; (f = s.firstChild); ) s.removeChild(f);
      for (t = 0, i = c[n].length; t < i; t++)
        if (((v = 1), (b = 1), d[n][t] === void 0)) {
          for (
            s.appendChild(c[n][t].cell), d[n][t] = 1;
            c[n + v] !== void 0 && c[n][t].cell == c[n + v][t].cell;

          )
            (d[n + v][t] = 1), v++;
          for (; c[n][t + b] !== void 0 && c[n][t].cell == c[n][t + b].cell; ) {
            for (o = 0; o < v; o++) d[n + o][t + b] = 1;
            b++;
          }
          u(c[n][t].cell).attr("rowspan", v).attr("colspan", b);
        }
    }
  }
}
function ie(e, r) {
  Ea(e);
  var a = x(e, "aoPreDrawCallback", "preDraw", [e]);
  if (u.inArray(!1, a) !== -1) {
    U(e, !1);
    return;
  }
  var n = [],
    l = 0,
    t = e.asStripeClasses,
    i = t.length,
    o = e.oLanguage,
    f = j(e) == "ssp",
    s = e.aiDisplay,
    c = e._iDisplayStart,
    d = e.fnDisplayEnd();
  if (((e.bDrawing = !0), e.bDeferLoading))
    (e.bDeferLoading = !1), e.iDraw++, U(e, !1);
  else if (!f) e.iDraw++;
  else if (!e.bDestroying && !r) {
    zr(e);
    return;
  }
  if (s.length !== 0)
    for (var h = f ? 0 : c, v = f ? e.aoData.length : d, b = h; b < v; b++) {
      var m = s[b],
        D = e.aoData[m];
      D.nTr === null && vr(e, m);
      var y = D.nTr;
      if (i !== 0) {
        var p = t[l % i];
        D._sRowStripe != p &&
          (u(y).removeClass(D._sRowStripe).addClass(p), (D._sRowStripe = p));
      }
      x(e, "aoRowCallback", null, [y, D._aData, l, b, m]), n.push(y), l++;
    }
  else {
    var T = o.sZeroRecords;
    e.iDraw == 1 && j(e) == "ajax"
      ? (T = o.sLoadingRecords)
      : o.sEmptyTable && e.fnRecordsTotal() === 0 && (T = o.sEmptyTable),
      (n[0] = u("<tr/>", { class: i ? t[0] : "" }).append(
        u("<td />", {
          valign: "top",
          colSpan: ve(e),
          class: e.oClasses.sRowEmpty,
        }).html(T)
      )[0]);
  }
  x(e, "aoHeaderCallback", "header", [
    u(e.nTHead).children("tr")[0],
    ir(e),
    c,
    d,
    s,
  ]),
    x(e, "aoFooterCallback", "footer", [
      u(e.nTFoot).children("tr")[0],
      ir(e),
      c,
      d,
      s,
    ]);
  var S = u(e.nTBody);
  S.children().detach(),
    S.append(u(n)),
    x(e, "aoDrawCallback", "draw", [e]),
    (e.bSorted = !1),
    (e.bFiltered = !1),
    (e.bDrawing = !1);
}
function oe(e, r) {
  var a = e.oFeatures,
    n = a.bSort,
    l = a.bFilter;
  n && va(e),
    l ? Fe(e, e.oPreviousSearch) : (e.aiDisplay = e.aiDisplayMaster.slice()),
    r !== !0 && (e._iDisplayStart = 0),
    (e._drawHold = r),
    ie(e),
    (e._drawHold = !1);
}
function Yr(e) {
  var r = e.oClasses,
    a = u(e.nTable),
    n = u("<div/>").insertBefore(a),
    l = e.oFeatures,
    t = u("<div/>", {
      id: e.sTableId + "_wrapper",
      class: r.sWrapper + (e.nTFoot ? "" : " " + r.sNoFooter),
    });
  (e.nHolding = n[0]),
    (e.nTableWrapper = t[0]),
    (e.nTableReinsertBefore = e.nTable.nextSibling);
  for (var i = e.sDom.split(""), o, f, s, c, d, h, v = 0; v < i.length; v++) {
    if (((o = null), (f = i[v]), f == "<")) {
      if (((s = u("<div/>")[0]), (c = i[v + 1]), c == "'" || c == '"')) {
        for (d = "", h = 2; i[v + h] != c; ) (d += i[v + h]), h++;
        if (
          (d == "H" ? (d = r.sJUIHeader) : d == "F" && (d = r.sJUIFooter),
          d.indexOf(".") != -1)
        ) {
          var b = d.split(".");
          (s.id = b[0].substr(1, b[0].length - 1)), (s.className = b[1]);
        } else
          d.charAt(0) == "#"
            ? (s.id = d.substr(1, d.length - 1))
            : (s.className = d);
        v += h;
      }
      t.append(s), (t = u(s));
    } else if (f == ">") t = t.parent();
    else if (f == "l" && l.bPaginate && l.bLengthChange) o = oa(e);
    else if (f == "f" && l.bFilter) o = Qr(e);
    else if (f == "r" && l.bProcessing) o = ua(e);
    else if (f == "t") o = sa(e);
    else if (f == "i" && l.bInfo) o = ta(e);
    else if (f == "p" && l.bPaginate) o = fa(e);
    else if (_.ext.feature.length !== 0) {
      for (var m = _.ext.feature, D = 0, y = m.length; D < y; D++)
        if (f == m[D].cFeature) {
          o = m[D].fnInit(e);
          break;
        }
    }
    if (o) {
      var p = e.aanFeatures;
      p[f] || (p[f] = []), p[f].push(o), t.append(o);
    }
  }
  n.replaceWith(t), (e.nHolding = null);
}
function Ce(e, r) {
  var a = u(r).children("tr"),
    n,
    l,
    t,
    i,
    o,
    f,
    s,
    c,
    d,
    h,
    v,
    b = function (m, D, y) {
      for (var p = m[D]; p[y]; ) y++;
      return y;
    };
  for (e.splice(0, e.length), t = 0, f = a.length; t < f; t++) e.push([]);
  for (t = 0, f = a.length; t < f; t++)
    for (n = a[t], c = 0, l = n.firstChild; l; ) {
      if (l.nodeName.toUpperCase() == "TD" || l.nodeName.toUpperCase() == "TH")
        for (
          d = l.getAttribute("colspan") * 1,
            h = l.getAttribute("rowspan") * 1,
            d = !d || d === 0 || d === 1 ? 1 : d,
            h = !h || h === 0 || h === 1 ? 1 : h,
            s = b(e, t, c),
            v = d === 1,
            o = 0;
          o < d;
          o++
        )
          for (i = 0; i < h; i++)
            (e[t + i][s + o] = {
              cell: l,
              unique: v,
            }),
              (e[t + i].nTr = n);
      l = l.nextSibling;
    }
}
function Ge(e, r, a) {
  var n = [];
  a || ((a = e.aoHeader), r && ((a = []), Ce(a, r)));
  for (var l = 0, t = a.length; l < t; l++)
    for (var i = 0, o = a[l].length; i < o; i++)
      a[l][i].unique && (!n[i] || !e.bSortCellsTop) && (n[i] = a[l][i].cell);
  return n;
}
function Ea(e) {
  var r = j(e) == "ssp",
    a = e.iInitDisplayStart;
  a !== void 0 &&
    a !== -1 &&
    ((e._iDisplayStart = r ? a : a >= e.fnRecordsDisplay() ? 0 : a),
    (e.iInitDisplayStart = -1));
}
function $e(e, r, a) {
  if ((x(e, "aoServerParams", "serverParams", [r]), r && Array.isArray(r))) {
    var n = {},
      l = /(.*?)\[\]$/;
    u.each(r, function (d, h) {
      var v = h.name.match(l);
      if (v) {
        var b = v[0];
        n[b] || (n[b] = []), n[b].push(h.value);
      } else n[h.name] = h.value;
    }),
      (r = n);
  }
  var t,
    i = e.ajax,
    o = e.oInstance,
    f = function (d) {
      var h = e.jqXHR ? e.jqXHR.status : null;
      (d === null || (typeof h == "number" && h == 204)) &&
        ((d = {}), Ie(e, d, []));
      var v = d.error || d.sError;
      v && Y(e, 0, v), (e.json = d), x(e, null, "xhr", [e, d, e.jqXHR]), a(d);
    };
  if (u.isPlainObject(i) && i.data) {
    t = i.data;
    var s =
      typeof t == "function"
        ? t(r, e)
        : // fn can manipulate data or return
          t;
    (r = typeof t == "function" && s ? s : u.extend(!0, r, s)), delete i.data;
  }
  var c = {
    data: r,
    success: f,
    dataType: "json",
    cache: !1,
    type: e.sServerMethod,
    error: function (d, h, v) {
      var b = x(e, null, "xhr", [e, null, e.jqXHR]);
      u.inArray(!0, b) === -1 &&
        (h == "parsererror"
          ? Y(e, 0, "Invalid JSON response", 1)
          : d.readyState === 4 && Y(e, 0, "Ajax error", 7)),
        U(e, !1);
    },
  };
  (e.oAjaxData = r),
    x(e, null, "preXhr", [e, r]),
    e.fnServerData
      ? e.fnServerData.call(
          o,
          e.sAjaxSource,
          u.map(r, function (d, h) {
            return { name: h, value: d };
          }),
          f,
          e
        )
      : e.sAjaxSource || typeof i == "string"
      ? (e.jqXHR = u.ajax(
          u.extend(c, {
            url: i || e.sAjaxSource,
          })
        ))
      : typeof i == "function"
      ? (e.jqXHR = i.call(o, r, f, e))
      : ((e.jqXHR = u.ajax(u.extend(c, i))), (i.data = t));
}
function zr(e) {
  e.iDraw++, U(e, !0);
  var r = e._drawHold;
  $e(e, Zr(e), function (a) {
    (e._drawHold = r), Kr(e, a), (e._drawHold = !1);
  });
}
function Zr(e) {
  var r = e.aoColumns,
    a = r.length,
    n = e.oFeatures,
    l = e.oPreviousSearch,
    t = e.aoPreSearchCols,
    i,
    o = [],
    f,
    s,
    c,
    d = pe(e),
    h = e._iDisplayStart,
    v = n.bPaginate !== !1 ? e._iDisplayLength : -1,
    b = function (y, p) {
      o.push({ name: y, value: p });
    };
  b("sEcho", e.iDraw),
    b("iColumns", a),
    b("sColumns", V(r, "sName").join(",")),
    b("iDisplayStart", h),
    b("iDisplayLength", v);
  var m = {
    draw: e.iDraw,
    columns: [],
    order: [],
    start: h,
    length: v,
    search: {
      value: l.sSearch,
      regex: l.bRegex,
    },
  };
  for (i = 0; i < a; i++)
    (s = r[i]),
      (c = t[i]),
      (f = typeof s.mData == "function" ? "function" : s.mData),
      m.columns.push({
        data: f,
        name: s.sName,
        searchable: s.bSearchable,
        orderable: s.bSortable,
        search: {
          value: c.sSearch,
          regex: c.bRegex,
        },
      }),
      b("mDataProp_" + i, f),
      n.bFilter &&
        (b("sSearch_" + i, c.sSearch),
        b("bRegex_" + i, c.bRegex),
        b("bSearchable_" + i, s.bSearchable)),
      n.bSort && b("bSortable_" + i, s.bSortable);
  n.bFilter && (b("sSearch", l.sSearch), b("bRegex", l.bRegex)),
    n.bSort &&
      (u.each(d, function (y, p) {
        m.order.push({ column: p.col, dir: p.dir }),
          b("iSortCol_" + y, p.col),
          b("sSortDir_" + y, p.dir);
      }),
      b("iSortingCols", d.length));
  var D = _.ext.legacy.ajax;
  return D === null ? (e.sAjaxSource ? o : m) : D ? o : m;
}
function Kr(e, r) {
  var a = function (s, c) {
      return r[s] !== void 0 ? r[s] : r[c];
    },
    n = Ie(e, r),
    l = a("sEcho", "draw"),
    t = a("iTotalRecords", "recordsTotal"),
    i = a("iTotalDisplayRecords", "recordsFiltered");
  if (l !== void 0) {
    if (l * 1 < e.iDraw) return;
    e.iDraw = l * 1;
  }
  n || (n = []),
    Je(e),
    (e._iRecordsTotal = parseInt(t, 10)),
    (e._iRecordsDisplay = parseInt(i, 10));
  for (var o = 0, f = n.length; o < f; o++) le(e, n[o]);
  (e.aiDisplay = e.aiDisplayMaster.slice()),
    ie(e, !0),
    e._bInitComplete || We(e, r),
    U(e, !1);
}
function Ie(e, r, a) {
  var n =
    u.isPlainObject(e.ajax) && e.ajax.dataSrc !== void 0
      ? e.ajax.dataSrc
      : e.sAjaxDataProp;
  if (!a) return n === "data" ? r.aaData || r[n] : n !== "" ? he(n)(r) : r;
  te(n)(r, a);
}
function Qr(e) {
  var r = e.oClasses,
    a = e.sTableId,
    n = e.oLanguage,
    l = e.oPreviousSearch,
    t = e.aanFeatures,
    i = '<input type="search" class="' + r.sFilterInput + '"/>',
    o = n.sSearch;
  o = o.match(/_INPUT_/) ? o.replace("_INPUT_", i) : o + i;
  var f = u("<div/>", {
      id: t.f ? null : a + "_filter",
      class: r.sFilter,
    }).append(u("<label/>").append(o)),
    s = function (h) {
      t.f;
      var v = this.value ? this.value : "";
      (l.return && h.key !== "Enter") ||
        (v != l.sSearch &&
          (Fe(e, {
            sSearch: v,
            bRegex: l.bRegex,
            bSmart: l.bSmart,
            bCaseInsensitive: l.bCaseInsensitive,
            return: l.return,
          }),
          (e._iDisplayStart = 0),
          ie(e)));
    },
    c = e.searchDelay !== null ? e.searchDelay : j(e) === "ssp" ? 400 : 0,
    d = u("input", f)
      .val(l.sSearch)
      .attr("placeholder", n.sSearchPlaceholder)
      .on("keyup.DT search.DT input.DT paste.DT cut.DT", c ? yr(s, c) : s)
      .on("mouseup.DT", function (h) {
        setTimeout(function () {
          s.call(d[0], h);
        }, 10);
      })
      .on("keypress.DT", function (h) {
        if (h.keyCode == 13) return !1;
      })
      .attr("aria-controls", a);
  return (
    u(e.nTable).on("search.dt.DT", function (h, v) {
      if (e === v)
        try {
          d[0] !== document.activeElement && d.val(l.sSearch);
        } catch {}
    }),
    f[0]
  );
}
function Fe(e, r, a) {
  var n = e.oPreviousSearch,
    l = e.aoPreSearchCols,
    t = function (f) {
      (n.sSearch = f.sSearch),
        (n.bRegex = f.bRegex),
        (n.bSmart = f.bSmart),
        (n.bCaseInsensitive = f.bCaseInsensitive),
        (n.return = f.return);
    },
    i = function (f) {
      return f.bEscapeRegex !== void 0 ? !f.bEscapeRegex : f.bRegex;
    };
  if ((dr(e), j(e) != "ssp")) {
    aa(e, r.sSearch, a, i(r), r.bSmart, r.bCaseInsensitive), t(r);
    for (var o = 0; o < l.length; o++)
      ra(e, l[o].sSearch, o, i(l[o]), l[o].bSmart, l[o].bCaseInsensitive);
    ea(e);
  } else t(r);
  (e.bFiltered = !0), x(e, null, "search", [e]);
}
function ea(e) {
  for (
    var r = _.ext.search, a = e.aiDisplay, n, l, t = 0, i = r.length;
    t < i;
    t++
  ) {
    for (var o = [], f = 0, s = a.length; f < s; f++)
      (l = a[f]),
        (n = e.aoData[l]),
        r[t](e, n._aFilterData, l, n._aData, f) && o.push(l);
    (a.length = 0), u.merge(a, o);
  }
}
function ra(e, r, a, n, l, t) {
  if (r !== "") {
    for (
      var i, o = [], f = e.aiDisplay, s = br(r, n, l, t), c = 0;
      c < f.length;
      c++
    )
      (i = e.aoData[f[c]]._aFilterData[a]), s.test(i) && o.push(f[c]);
    e.aiDisplay = o;
  }
}
function aa(e, r, a, n, l, t) {
  var i = br(r, n, l, t),
    o = e.oPreviousSearch.sSearch,
    f = e.aiDisplayMaster,
    s,
    c,
    d,
    h = [];
  if ((_.ext.search.length !== 0 && (a = !0), (c = na(e)), r.length <= 0))
    e.aiDisplay = f.slice();
  else {
    for (
      (c || a || n || o.length > r.length || r.indexOf(o) !== 0 || e.bSorted) &&
        (e.aiDisplay = f.slice()),
        s = e.aiDisplay,
        d = 0;
      d < s.length;
      d++
    )
      i.test(e.aoData[s[d]]._sFilterRow) && h.push(s[d]);
    e.aiDisplay = h;
  }
}
function br(e, r, a, n) {
  if (((e = r ? e : _r(e)), a)) {
    var l = u.map(
      e.match(/["\u201C][^"\u201D]+["\u201D]|[^ ]+/g) || [""],
      function (t) {
        if (t.charAt(0) === '"') {
          var i = t.match(/^"(.*)"$/);
          t = i ? i[1] : t;
        } else if (t.charAt(0) === "“") {
          var i = t.match(/^\u201C(.*)\u201D$/);
          t = i ? i[1] : t;
        }
        return t.replace('"', "");
      }
    );
    e = "^(?=.*?" + l.join(")(?=.*?") + ").*$";
  }
  return new RegExp(e, n ? "i" : "");
}
var _r = _.util.escapeRegex,
  je = u("<div>")[0],
  Ma = je.textContent !== void 0;
function na(e) {
  var r = e.aoColumns,
    a,
    n,
    l,
    t,
    i,
    o,
    f,
    s,
    c = !1;
  for (n = 0, t = e.aoData.length; n < t; n++)
    if (((s = e.aoData[n]), !s._aFilterData)) {
      for (o = [], l = 0, i = r.length; l < i; l++)
        (a = r[l]),
          a.bSearchable
            ? ((f = W(e, n, l, "filter")),
              f === null && (f = ""),
              typeof f != "string" && f.toString && (f = f.toString()))
            : (f = ""),
          f.indexOf &&
            f.indexOf("&") !== -1 &&
            ((je.innerHTML = f), (f = Ma ? je.textContent : je.innerText)),
          f.replace && (f = f.replace(/[\r\n\u2028]/g, "")),
          o.push(f);
      (s._aFilterData = o), (s._sFilterRow = o.join("  ")), (c = !0);
    }
  return c;
}
function jr(e) {
  return {
    search: e.sSearch,
    smart: e.bSmart,
    regex: e.bRegex,
    caseInsensitive: e.bCaseInsensitive,
  };
}
function Er(e) {
  return {
    sSearch: e.search,
    bSmart: e.smart,
    bRegex: e.regex,
    bCaseInsensitive: e.caseInsensitive,
  };
}
function ta(e) {
  var r = e.sTableId,
    a = e.aanFeatures.i,
    n = u("<div/>", {
      class: e.oClasses.sInfo,
      id: a ? null : r + "_info",
    });
  return (
    a ||
      (e.aoDrawCallback.push({
        fn: la,
        sName: "information",
      }),
      n.attr("role", "status").attr("aria-live", "polite"),
      u(e.nTable).attr("aria-describedby", r + "_info")),
    n[0]
  );
}
function la(e) {
  var r = e.aanFeatures.i;
  if (r.length !== 0) {
    var a = e.oLanguage,
      n = e._iDisplayStart + 1,
      l = e.fnDisplayEnd(),
      t = e.fnRecordsTotal(),
      i = e.fnRecordsDisplay(),
      o = i ? a.sInfo : a.sInfoEmpty;
    i !== t && (o += " " + a.sInfoFiltered),
      (o += a.sInfoPostFix),
      (o = ia(e, o));
    var f = a.fnInfoCallback;
    f !== null && (o = f.call(e.oInstance, e, n, l, t, i, o)), u(r).html(o);
  }
}
function ia(e, r) {
  var a = e.fnFormatNumber,
    n = e._iDisplayStart + 1,
    l = e._iDisplayLength,
    t = e.fnRecordsDisplay(),
    i = l === -1;
  return r
    .replace(/_START_/g, a.call(e, n))
    .replace(/_END_/g, a.call(e, e.fnDisplayEnd()))
    .replace(/_MAX_/g, a.call(e, e.fnRecordsTotal()))
    .replace(/_TOTAL_/g, a.call(e, t))
    .replace(/_PAGE_/g, a.call(e, i ? 1 : Math.ceil(n / l)))
    .replace(/_PAGES_/g, a.call(e, i ? 1 : Math.ceil(t / l)));
}
function De(e) {
  var r,
    a,
    n = e.iInitDisplayStart,
    l = e.aoColumns,
    t,
    i = e.oFeatures,
    o = e.bDeferLoading;
  if (!e.bInitialised) {
    setTimeout(function () {
      De(e);
    }, 200);
    return;
  }
  for (
    Yr(e),
      $r(e),
      ye(e, e.aoHeader),
      ye(e, e.aoFooter),
      U(e, !0),
      i.bAutoWidth && Dr(e),
      r = 0,
      a = l.length;
    r < a;
    r++
  )
    (t = l[r]), t.sWidth && (t.nTh.style.width = F(t.sWidth));
  x(e, null, "preInit", [e]), oe(e);
  var f = j(e);
  (f != "ssp" || o) &&
    (f == "ajax"
      ? $e(e, [], function (s) {
          var c = Ie(e, s);
          for (r = 0; r < c.length; r++) le(e, c[r]);
          (e.iInitDisplayStart = n), oe(e), U(e, !1), We(e, s);
        })
      : (U(e, !1), We(e)));
}
function We(e, r) {
  (e._bInitComplete = !0),
    (r || e.oInit.aaData) && Te(e),
    x(e, null, "plugin-init", [e, r]),
    x(e, "aoInitComplete", "init", [e, r]);
}
function mr(e, r) {
  var a = parseInt(r, 10);
  (e._iDisplayLength = a), wr(e), x(e, null, "length", [e, a]);
}
function oa(e) {
  for (
    var r = e.oClasses,
      a = e.sTableId,
      n = e.aLengthMenu,
      l = Array.isArray(n[0]),
      t = l ? n[0] : n,
      i = l ? n[1] : n,
      o = u("<select/>", {
        name: a + "_length",
        "aria-controls": a,
        class: r.sLengthSelect,
      }),
      f = 0,
      s = t.length;
    f < s;
    f++
  )
    o[0][f] = new Option(
      typeof i[f] == "number" ? e.fnFormatNumber(i[f]) : i[f],
      t[f]
    );
  var c = u("<div><label/></div>").addClass(r.sLength);
  return (
    e.aanFeatures.l || (c[0].id = a + "_length"),
    c
      .children()
      .append(e.oLanguage.sLengthMenu.replace("_MENU_", o[0].outerHTML)),
    u("select", c)
      .val(e._iDisplayLength)
      .on("change.DT", function (d) {
        mr(e, u(this).val()), ie(e);
      }),
    u(e.nTable).on("length.dt.DT", function (d, h, v) {
      e === h && u("select", c).val(v);
    }),
    c[0]
  );
}
function fa(e) {
  var r = e.sPaginationType,
    a = _.ext.pager[r],
    n = typeof a == "function",
    l = function (o) {
      ie(o);
    },
    t = u("<div/>").addClass(e.oClasses.sPaging + r)[0],
    i = e.aanFeatures;
  return (
    n || a.fnInit(e, t, l),
    i.p ||
      ((t.id = e.sTableId + "_paginate"),
      e.aoDrawCallback.push({
        fn: function (o) {
          if (n) {
            var f = o._iDisplayStart,
              s = o._iDisplayLength,
              c = o.fnRecordsDisplay(),
              d = s === -1,
              h = d ? 0 : Math.ceil(f / s),
              v = d ? 1 : Math.ceil(c / s),
              b = a(h, v),
              m,
              D;
            for (m = 0, D = i.p.length; m < D; m++)
              Tr(o, "pageButton")(o, i.p[m], m, b, h, v);
          } else a.fnUpdate(o, l);
        },
        sName: "pagination",
      })),
    t
  );
}
function Ye(e, r, a) {
  var n = e._iDisplayStart,
    l = e._iDisplayLength,
    t = e.fnRecordsDisplay();
  t === 0 || l === -1
    ? (n = 0)
    : typeof r == "number"
    ? ((n = r * l), n > t && (n = 0))
    : r == "first"
    ? (n = 0)
    : r == "previous"
    ? ((n = l >= 0 ? n - l : 0), n < 0 && (n = 0))
    : r == "next"
    ? n + l < t && (n += l)
    : r == "last"
    ? (n = Math.floor((t - 1) / l) * l)
    : Y(e, 0, "Unknown paging action: " + r, 5);
  var i = e._iDisplayStart !== n;
  return (
    (e._iDisplayStart = n),
    i ? (x(e, null, "page", [e]), a && ie(e)) : x(e, null, "page-nc", [e]),
    i
  );
}
function ua(e) {
  return u("<div/>", {
    id: e.aanFeatures.r ? null : e.sTableId + "_processing",
    class: e.oClasses.sProcessing,
    role: "status",
  })
    .html(e.oLanguage.sProcessing)
    .append("<div><div></div><div></div><div></div><div></div></div>")
    .insertBefore(e.nTable)[0];
}
function U(e, r) {
  e.oFeatures.bProcessing &&
    u(e.aanFeatures.r).css("display", r ? "block" : "none"),
    x(e, null, "processing", [e, r]);
}
function sa(e) {
  var r = u(e.nTable),
    a = e.oScroll;
  if (a.sX === "" && a.sY === "") return e.nTable;
  var n = a.sX,
    l = a.sY,
    t = e.oClasses,
    i = r.children("caption"),
    o = i.length ? i[0]._captionSide : null,
    f = u(r[0].cloneNode(!1)),
    s = u(r[0].cloneNode(!1)),
    c = r.children("tfoot"),
    d = "<div/>",
    h = function (p) {
      return p ? F(p) : null;
    };
  c.length || (c = null);
  var v = u(d, { class: t.sScrollWrapper })
    .append(
      u(d, { class: t.sScrollHead })
        .css({
          overflow: "hidden",
          position: "relative",
          border: 0,
          width: n ? h(n) : "100%",
        })
        .append(
          u(d, { class: t.sScrollHeadInner })
            .css({
              "box-sizing": "content-box",
              width: a.sXInner || "100%",
            })
            .append(
              f
                .removeAttr("id")
                .css("margin-left", 0)
                .append(o === "top" ? i : null)
                .append(r.children("thead"))
            )
        )
    )
    .append(
      u(d, { class: t.sScrollBody })
        .css({
          position: "relative",
          overflow: "auto",
          width: h(n),
        })
        .append(r)
    );
  c &&
    v.append(
      u(d, { class: t.sScrollFoot })
        .css({
          overflow: "hidden",
          border: 0,
          width: n ? h(n) : "100%",
        })
        .append(
          u(d, { class: t.sScrollFootInner }).append(
            s
              .removeAttr("id")
              .css("margin-left", 0)
              .append(o === "bottom" ? i : null)
              .append(r.children("tfoot"))
          )
        )
    );
  var b = v.children(),
    m = b[0],
    D = b[1],
    y = c ? b[2] : null;
  return (
    n &&
      u(D).on("scroll.DT", function (p) {
        var T = this.scrollLeft;
        (m.scrollLeft = T), c && (y.scrollLeft = T);
      }),
    u(D).css("max-height", l),
    a.bCollapse || u(D).css("height", l),
    (e.nScrollHead = m),
    (e.nScrollBody = D),
    (e.nScrollFoot = y),
    e.aoDrawCallback.push({
      fn: ze,
      sName: "scrolling",
    }),
    v[0]
  );
}
function ze(e) {
  var r = e.oScroll,
    a = r.sX,
    n = r.sXInner,
    l = r.sY,
    t = r.iBarWidth,
    i = u(e.nScrollHead),
    o = i[0].style,
    f = i.children("div"),
    s = f[0].style,
    c = f.children("table"),
    d = e.nScrollBody,
    h = u(d),
    v = d.style,
    b = u(e.nScrollFoot),
    m = b.children("div"),
    D = m.children("table"),
    y = u(e.nTHead),
    p = u(e.nTable),
    T = p[0],
    S = T.style,
    L = e.nTFoot ? u(e.nTFoot) : null,
    X = e.oBrowser,
    q = X.bScrollOversize;
  V(e.aoColumns, "nTh");
  var k,
    J,
    z,
    M,
    ee,
    fe,
    I = [],
    N = [],
    G = [],
    $ = [],
    B,
    re,
    ae,
    Qe = function (g) {
      var P = g.style;
      (P.paddingTop = "0"),
        (P.paddingBottom = "0"),
        (P.borderTopWidth = "0"),
        (P.borderBottomWidth = "0"),
        (P.height = 0);
    },
    ue = d.scrollHeight > d.clientHeight;
  if (e.scrollBarVis !== ue && e.scrollBarVis !== void 0) {
    (e.scrollBarVis = ue), Te(e);
    return;
  } else e.scrollBarVis = ue;
  p.children("thead, tfoot").remove(),
    L &&
      ((fe = L.clone().prependTo(p)),
      (J = L.find("tr")),
      (M = fe.find("tr")),
      fe.find("[id]").removeAttr("id")),
    (ee = y.clone().prependTo(p)),
    (k = y.find("tr")),
    (z = ee.find("tr")),
    ee.find("th, td").removeAttr("tabindex"),
    ee.find("[id]").removeAttr("id"),
    a || ((v.width = "100%"), (i[0].style.width = "100%")),
    u.each(Ge(e, ee), function (g, P) {
      (B = xe(e, g)), (P.style.width = e.aoColumns[B].sWidth);
    }),
    L &&
      K(function (g) {
        g.style.width = "";
      }, M),
    (ae = p.outerWidth()),
    a === ""
      ? ((S.width = "100%"),
        q &&
          (p.find("tbody").height() > d.offsetHeight ||
            h.css("overflow-y") == "scroll") &&
          (S.width = F(p.outerWidth() - t)),
        (ae = p.outerWidth()))
      : n !== "" && ((S.width = F(n)), (ae = p.outerWidth())),
    K(Qe, z),
    K(function (g) {
      var P = window.getComputedStyle
        ? window.getComputedStyle(g).width
        : F(u(g).width());
      G.push(g.innerHTML), I.push(P);
    }, z),
    K(function (g, P) {
      g.style.width = I[P];
    }, k),
    u(z).css("height", 0),
    L &&
      (K(Qe, M),
      K(function (g) {
        $.push(g.innerHTML), N.push(F(u(g).css("width")));
      }, M),
      K(function (g, P) {
        g.style.width = N[P];
      }, J),
      u(M).height(0)),
    K(function (g, P) {
      (g.innerHTML = '<div class="dataTables_sizing">' + G[P] + "</div>"),
        (g.childNodes[0].style.height = "0"),
        (g.childNodes[0].style.overflow = "hidden"),
        (g.style.width = I[P]);
    }, z),
    L &&
      K(function (g, P) {
        (g.innerHTML = '<div class="dataTables_sizing">' + $[P] + "</div>"),
          (g.childNodes[0].style.height = "0"),
          (g.childNodes[0].style.overflow = "hidden"),
          (g.style.width = N[P]);
      }, M),
    Math.round(p.outerWidth()) < Math.round(ae)
      ? ((re =
          d.scrollHeight > d.offsetHeight || h.css("overflow-y") == "scroll"
            ? ae + t
            : ae),
        q &&
          (d.scrollHeight > d.offsetHeight ||
            h.css("overflow-y") == "scroll") &&
          (S.width = F(re - t)),
        (a === "" || n !== "") && Y(e, 1, "Possible column misalignment", 6))
      : (re = "100%"),
    (v.width = F(re)),
    (o.width = F(re)),
    L && (e.nScrollFoot.style.width = F(re)),
    l || (q && (v.height = F(T.offsetHeight + t)));
  var Pe = p.outerWidth();
  (c[0].style.width = F(Pe)), (s.width = F(Pe));
  var Fr = p.height() > d.clientHeight || h.css("overflow-y") == "scroll",
    Lr = "padding" + (X.bScrollbarLeft ? "Left" : "Right");
  (s[Lr] = Fr ? t + "px" : "0px"),
    L &&
      ((D[0].style.width = F(Pe)),
      (m[0].style.width = F(Pe)),
      (m[0].style[Lr] = Fr ? t + "px" : "0px")),
    p.children("colgroup").insertBefore(p.children("thead")),
    h.trigger("scroll"),
    (e.bSorted || e.bFiltered) && !e._drawHold && (d.scrollTop = 0);
}
function K(e, r, a) {
  for (var n = 0, l = 0, t = r.length, i, o; l < t; ) {
    for (i = r[l].firstChild, o = a ? a[l].firstChild : null; i; )
      i.nodeType === 1 && (a ? e(i, o, n) : e(i, n), n++),
        (i = i.nextSibling),
        (o = a ? o.nextSibling : null);
    l++;
  }
}
var Oa = /<.*?>/g;
function Dr(e) {
  var r = e.nTable,
    a = e.aoColumns,
    n = e.oScroll,
    l = n.sY,
    t = n.sX,
    i = n.sXInner,
    o = a.length,
    f = Xe(e, "bVisible"),
    s = u("th", e.nTHead),
    c = r.getAttribute("width"),
    d = r.parentNode,
    h = !1,
    v,
    b,
    m,
    D = e.oBrowser,
    y = D.bScrollOversize,
    p = r.style.width;
  for (p && p.indexOf("%") !== -1 && (c = p), v = 0; v < f.length; v++)
    (b = a[f[v]]),
      b.sWidth !== null && ((b.sWidth = ca(b.sWidthOrig, d)), (h = !0));
  if (y || (!h && !t && !l && o == ve(e) && o == s.length))
    for (v = 0; v < o; v++) {
      var T = xe(e, v);
      T !== null && (a[T].sWidth = F(s.eq(v).width()));
    }
  else {
    var S = u(r).clone().css("visibility", "hidden").removeAttr("id");
    S.find("tbody tr").remove();
    var L = u("<tr/>").appendTo(S.find("tbody"));
    for (
      S.find("thead, tfoot").remove(),
        S.append(u(e.nTHead).clone()).append(u(e.nTFoot).clone()),
        S.find("tfoot th, tfoot td").css("width", ""),
        s = Ge(e, S.find("thead")[0]),
        v = 0;
      v < f.length;
      v++
    )
      (b = a[f[v]]),
        (s[v].style.width =
          b.sWidthOrig !== null && b.sWidthOrig !== "" ? F(b.sWidthOrig) : ""),
        b.sWidthOrig &&
          t &&
          u(s[v]).append(
            u("<div/>").css({
              width: b.sWidthOrig,
              margin: 0,
              padding: 0,
              border: 0,
              height: 1,
            })
          );
    if (e.aoData.length)
      for (v = 0; v < f.length; v++)
        (m = f[v]),
          (b = a[m]),
          u(da(e, m)).clone(!1).append(b.sContentPadding).appendTo(L);
    u("[name]", S).removeAttr("name");
    var X = u("<div/>")
      .css(
        t || l
          ? {
              position: "absolute",
              top: 0,
              left: 0,
              height: 1,
              right: 0,
              overflow: "hidden",
            }
          : {}
      )
      .append(S)
      .appendTo(d);
    t && i
      ? S.width(i)
      : t
      ? (S.css("width", "auto"),
        S.removeAttr("width"),
        S.width() < d.clientWidth && c && S.width(d.clientWidth))
      : l
      ? S.width(d.clientWidth)
      : c && S.width(c);
    var q = 0;
    for (v = 0; v < f.length; v++) {
      var k = u(s[v]),
        J = k.outerWidth() - k.width(),
        z = D.bBounding
          ? Math.ceil(s[v].getBoundingClientRect().width)
          : k.outerWidth();
      (q += z), (a[f[v]].sWidth = F(z - J));
    }
    (r.style.width = F(q)), X.remove();
  }
  if ((c && (r.style.width = F(c)), (c || t) && !e._reszEvt)) {
    var M = function () {
      u(window).on(
        "resize.DT-" + e.sInstance,
        yr(function () {
          Te(e);
        })
      );
    };
    y ? setTimeout(M, 1e3) : M(), (e._reszEvt = !0);
  }
}
var yr = _.util.throttle;
function ca(e, r) {
  if (!e) return 0;
  var a = u("<div/>")
      .css("width", F(e))
      .appendTo(r || document.body),
    n = a[0].offsetWidth;
  return a.remove(), n;
}
function da(e, r) {
  var a = ha(e, r);
  if (a < 0) return null;
  var n = e.aoData[a];
  return n.nTr
    ? n.anCells[r]
    : // Might not have been created when deferred rendering
      u("<td/>").html(W(e, a, r, "display"))[0];
}
function ha(e, r) {
  for (var a, n = -1, l = -1, t = 0, i = e.aoData.length; t < i; t++)
    (a = W(e, t, r, "display") + ""),
      (a = a.replace(Oa, "")),
      (a = a.replace(/&nbsp;/g, " ")),
      a.length > n && ((n = a.length), (l = t));
  return l;
}
function F(e) {
  return e === null
    ? "0px"
    : typeof e == "number"
    ? e < 0
      ? "0px"
      : e + "px"
    : e.match(/\d$/)
    ? e + "px"
    : e;
}
function pe(e) {
  var r,
    a,
    n,
    l = [],
    t = e.aoColumns,
    i,
    o,
    f,
    s,
    c = e.aaSortingFixed,
    d = u.isPlainObject(c),
    h = [],
    v = function (b) {
      b.length && !Array.isArray(b[0]) ? h.push(b) : u.merge(h, b);
    };
  for (
    Array.isArray(c) && v(c),
      d && c.pre && v(c.pre),
      v(e.aaSorting),
      d && c.post && v(c.post),
      r = 0;
    r < h.length;
    r++
  )
    for (s = h[r][0], i = t[s].aDataSort, a = 0, n = i.length; a < n; a++)
      (o = i[a]),
        (f = t[o].sType || "string"),
        h[r]._idx === void 0 &&
          (h[r]._idx = u.inArray(h[r][1], t[o].asSorting)),
        l.push({
          src: s,
          col: o,
          dir: h[r][1],
          index: h[r]._idx,
          type: f,
          formatter: _.ext.type.order[f + "-pre"],
        });
  return l;
}
function va(e) {
  var r,
    a,
    n,
    l = [],
    t = _.ext.type.order,
    i = e.aoData;
  e.aoColumns;
  var o = 0,
    f,
    s = e.aiDisplayMaster,
    c;
  for (dr(e), c = pe(e), r = 0, a = c.length; r < a; r++)
    (f = c[r]), f.formatter && o++, ba(e, f.col);
  if (j(e) != "ssp" && c.length !== 0) {
    for (r = 0, n = s.length; r < n; r++) l[s[r]] = r;
    o === c.length
      ? s.sort(function (d, h) {
          var v,
            b,
            m,
            D,
            y,
            p = c.length,
            T = i[d]._aSortData,
            S = i[h]._aSortData;
          for (m = 0; m < p; m++)
            if (
              ((y = c[m]),
              (v = T[y.col]),
              (b = S[y.col]),
              (D = v < b ? -1 : v > b ? 1 : 0),
              D !== 0)
            )
              return y.dir === "asc" ? D : -D;
          return (v = l[d]), (b = l[h]), v < b ? -1 : v > b ? 1 : 0;
        })
      : s.sort(function (d, h) {
          var v,
            b,
            m,
            D,
            y,
            p,
            T = c.length,
            S = i[d]._aSortData,
            L = i[h]._aSortData;
          for (m = 0; m < T; m++)
            if (
              ((y = c[m]),
              (v = S[y.col]),
              (b = L[y.col]),
              (p = t[y.type + "-" + y.dir] || t["string-" + y.dir]),
              (D = p(v, b)),
              D !== 0)
            )
              return D;
          return (v = l[d]), (b = l[h]), v < b ? -1 : v > b ? 1 : 0;
        });
  }
  e.bSorted = !0;
}
function pa(e) {
  for (
    var r,
      a,
      n = e.aoColumns,
      l = pe(e),
      t = e.oLanguage.oAria,
      i = 0,
      o = n.length;
    i < o;
    i++
  ) {
    var f = n[i],
      s = f.asSorting,
      c = f.ariaTitle || f.sTitle.replace(/<.*?>/g, ""),
      d = f.nTh;
    d.removeAttribute("aria-sort"),
      f.bSortable
        ? (l.length > 0 && l[0].col == i
            ? (d.setAttribute(
                "aria-sort",
                l[0].dir == "asc" ? "ascending" : "descending"
              ),
              (a = s[l[0].index + 1] || s[0]))
            : (a = s[0]),
          (r = c + (a === "asc" ? t.sSortAscending : t.sSortDescending)))
        : (r = c),
      d.setAttribute("aria-label", r);
  }
}
function or(e, r, a, n) {
  var l = e.aoColumns[r],
    t = e.aaSorting,
    i = l.asSorting,
    o,
    f = function (c, d) {
      var h = c._idx;
      return (
        h === void 0 && (h = u.inArray(c[1], i)),
        h + 1 < i.length ? h + 1 : d ? null : 0
      );
    };
  if (
    (typeof t[0] == "number" && (t = e.aaSorting = [t]),
    a && e.oFeatures.bSortMulti)
  ) {
    var s = u.inArray(r, V(t, "0"));
    s !== -1
      ? ((o = f(t[s], !0)),
        o === null && t.length === 1 && (o = 0),
        o === null ? t.splice(s, 1) : ((t[s][1] = i[o]), (t[s]._idx = o)))
      : (t.push([r, i[0], 0]), (t[t.length - 1]._idx = 0));
  } else
    t.length && t[0][0] == r
      ? ((o = f(t[0])), (t.length = 1), (t[0][1] = i[o]), (t[0]._idx = o))
      : ((t.length = 0), t.push([r, i[0]]), (t[0]._idx = 0));
  oe(e), typeof n == "function" && n(e);
}
function Cr(e, r, a, n) {
  var l = e.aoColumns[a];
  Sr(r, {}, function (t) {
    l.bSortable !== !1 &&
      (e.oFeatures.bProcessing
        ? (U(e, !0),
          setTimeout(function () {
            or(e, a, t.shiftKey, n), j(e) !== "ssp" && U(e, !1);
          }, 0))
        : or(e, a, t.shiftKey, n));
  });
}
function ke(e) {
  var r = e.aLastSort,
    a = e.oClasses.sSortColumn,
    n = pe(e),
    l = e.oFeatures,
    t,
    i,
    o;
  if (l.bSort && l.bSortClasses) {
    for (t = 0, i = r.length; t < i; t++)
      (o = r[t].src),
        u(V(e.aoData, "anCells", o)).removeClass(a + (t < 2 ? t + 1 : 3));
    for (t = 0, i = n.length; t < i; t++)
      (o = n[t].src),
        u(V(e.aoData, "anCells", o)).addClass(a + (t < 2 ? t + 1 : 3));
  }
  e.aLastSort = n;
}
function ba(e, r) {
  var a = e.aoColumns[r],
    n = _.ext.order[a.sSortDataType],
    l;
  n && (l = n.call(e.oInstance, e, r, ge(e, r)));
  for (
    var t,
      i,
      o = _.ext.type.order[a.sType + "-pre"],
      f = 0,
      s = e.aoData.length;
    f < s;
    f++
  )
    (t = e.aoData[f]),
      t._aSortData || (t._aSortData = []),
      (!t._aSortData[r] || n) &&
        ((i = n
          ? l[f]
          : // If there was a custom sort function, use data from there
            W(e, f, r, "sort")),
        (t._aSortData[r] = o ? o(i) : i));
}
function Le(e) {
  if (!e._bLoadingState) {
    var r = {
      time: +(/* @__PURE__ */ new Date()),
      start: e._iDisplayStart,
      length: e._iDisplayLength,
      order: u.extend(!0, [], e.aaSorting),
      search: jr(e.oPreviousSearch),
      columns: u.map(e.aoColumns, function (a, n) {
        return {
          visible: a.bVisible,
          search: jr(e.aoPreSearchCols[n]),
        };
      }),
    };
    (e.oSavedState = r),
      x(e, "aoStateSaveParams", "stateSaveParams", [e, r]),
      e.oFeatures.bStateSave &&
        !e.bDestroying &&
        e.fnStateSaveCallback.call(e.oInstance, e, r);
  }
}
function _a(e, r, a) {
  if (!e.oFeatures.bStateSave) {
    a();
    return;
  }
  var n = function (t) {
      fr(e, t, a);
    },
    l = e.fnStateLoadCallback.call(e.oInstance, e, n);
  return l !== void 0 && fr(e, l, a), !0;
}
function fr(e, r, a) {
  var n,
    l,
    t = e.aoColumns;
  e._bLoadingState = !0;
  var i = e._bInitComplete ? new _.Api(e) : null;
  if (!r || !r.time) {
    (e._bLoadingState = !1), a();
    return;
  }
  var o = x(e, "aoStateLoadParams", "stateLoadParams", [e, r]);
  if (u.inArray(!1, o) !== -1) {
    (e._bLoadingState = !1), a();
    return;
  }
  var f = e.iStateDuration;
  if (f > 0 && r.time < +(/* @__PURE__ */ new Date()) - f * 1e3) {
    (e._bLoadingState = !1), a();
    return;
  }
  if (r.columns && t.length !== r.columns.length) {
    (e._bLoadingState = !1), a();
    return;
  }
  if (
    ((e.oLoadedState = u.extend(!0, {}, r)),
    r.length !== void 0 &&
      (i ? i.page.len(r.length) : (e._iDisplayLength = r.length)),
    r.start !== void 0 &&
      (i === null
        ? ((e._iDisplayStart = r.start), (e.iInitDisplayStart = r.start))
        : Ye(e, r.start / e._iDisplayLength)),
    r.order !== void 0 &&
      ((e.aaSorting = []),
      u.each(r.order, function (c, d) {
        e.aaSorting.push(d[0] >= t.length ? [0, d[1]] : d);
      })),
    r.search !== void 0 && u.extend(e.oPreviousSearch, Er(r.search)),
    r.columns)
  ) {
    for (n = 0, l = r.columns.length; n < l; n++) {
      var s = r.columns[n];
      s.visible !== void 0 &&
        (i ? i.column(n).visible(s.visible, !1) : (t[n].bVisible = s.visible)),
        s.search !== void 0 && u.extend(e.aoPreSearchCols[n], Er(s.search));
    }
    i && i.columns.adjust();
  }
  (e._bLoadingState = !1), x(e, "aoStateLoaded", "stateLoaded", [e, r]), a();
}
function Be(e) {
  var r = _.settings,
    a = u.inArray(e, V(r, "nTable"));
  return a !== -1 ? r[a] : null;
}
function Y(e, r, a, n) {
  if (
    ((a =
      "DataTables warning: " + (e ? "table id=" + e.sTableId + " - " : "") + a),
    n &&
      (a +=
        ". For more information about this error, please see http://datatables.net/tn/" +
        n),
    r)
  )
    window.console && console.log && console.log(a);
  else {
    var l = _.ext,
      t = l.sErrMode || l.errMode;
    if ((e && x(e, null, "error", [e, n, a]), t == "alert")) alert(a);
    else {
      if (t == "throw") throw new Error(a);
      typeof t == "function" && t(e, n, a);
    }
  }
}
function Z(e, r, a, n) {
  if (Array.isArray(a)) {
    u.each(a, function (l, t) {
      Array.isArray(t) ? Z(e, r, t[0], t[1]) : Z(e, r, t);
    });
    return;
  }
  n === void 0 && (n = a), r[a] !== void 0 && (e[n] = r[a]);
}
function ur(e, r, a) {
  var n;
  for (var l in r)
    r.hasOwnProperty(l) &&
      ((n = r[l]),
      u.isPlainObject(n)
        ? (u.isPlainObject(e[l]) || (e[l] = {}), u.extend(!0, e[l], n))
        : a && l !== "data" && l !== "aaData" && Array.isArray(n)
        ? (e[l] = n.slice())
        : (e[l] = n));
  return e;
}
function Sr(e, r, a) {
  u(e)
    .on("click.DT", r, function (n) {
      u(e).trigger("blur"), a(n);
    })
    .on("keypress.DT", r, function (n) {
      n.which === 13 && (n.preventDefault(), a(n));
    })
    .on("selectstart.DT", function () {
      return !1;
    });
}
function E(e, r, a, n) {
  a &&
    e[r].push({
      fn: a,
      sName: n,
    });
}
function x(e, r, a, n) {
  var l = [];
  if (
    (r &&
      (l = u.map(e[r].slice().reverse(), function (o, f) {
        return o.fn.apply(e.oInstance, n);
      })),
    a !== null)
  ) {
    var t = u.Event(a + ".dt"),
      i = u(e.nTable);
    i.trigger(t, n),
      i.parents("body").length === 0 && u("body").trigger(t, n),
      l.push(t.result);
  }
  return l;
}
function wr(e) {
  var r = e._iDisplayStart,
    a = e.fnDisplayEnd(),
    n = e._iDisplayLength;
  r >= a && (r = a - n),
    (r -= r % n),
    (n === -1 || r < 0) && (r = 0),
    (e._iDisplayStart = r);
}
function Tr(e, r) {
  var a = e.renderer,
    n = _.ext.renderer[r];
  return u.isPlainObject(a) && a[r]
    ? n[a[r]] || n._
    : (typeof a == "string" && n[a]) || n._;
}
function j(e) {
  return e.oFeatures.bServerSide
    ? "ssp"
    : e.ajax || e.sAjaxSource
    ? "ajax"
    : "dom";
}
var ma = [],
  H = Array.prototype,
  Wa = function (e) {
    var r,
      a,
      n = _.settings,
      l = u.map(n, function (t, i) {
        return t.nTable;
      });
    if (e) {
      if (e.nTable && e.oApi) return [e];
      if (e.nodeName && e.nodeName.toLowerCase() === "table")
        return (r = u.inArray(e, l)), r !== -1 ? [n[r]] : null;
      if (e && typeof e.settings == "function") return e.settings().toArray();
      typeof e == "string" ? (a = u(e)) : e instanceof u && (a = e);
    } else return [];
    if (a)
      return a
        .map(function (t) {
          return (r = u.inArray(this, l)), r !== -1 ? n[r] : null;
        })
        .toArray();
  };
w = function (e, r) {
  if (!(this instanceof w)) return new w(e, r);
  var a = [],
    n = function (i) {
      var o = Wa(i);
      o && a.push.apply(a, o);
    };
  if (Array.isArray(e)) for (var l = 0, t = e.length; l < t; l++) n(e[l]);
  else n(e);
  (this.context = Ve(a)),
    r && u.merge(this, r),
    (this.selector = {
      rows: null,
      cols: null,
      opts: null,
    }),
    w.extend(this, this, ma);
};
_.Api = w;
u.extend(w.prototype, {
  any: function () {
    return this.count() !== 0;
  },
  concat: H.concat,
  context: [],
  // array of table settings objects
  count: function () {
    return this.flatten().length;
  },
  each: function (e) {
    for (var r = 0, a = this.length; r < a; r++) e.call(this, this[r], r, this);
    return this;
  },
  eq: function (e) {
    var r = this.context;
    return r.length > e ? new w(r[e], this[e]) : null;
  },
  filter: function (e) {
    var r = [];
    if (H.filter) r = H.filter.call(this, e, this);
    else
      for (var a = 0, n = this.length; a < n; a++)
        e.call(this, this[a], a, this) && r.push(this[a]);
    return new w(this.context, r);
  },
  flatten: function () {
    var e = [];
    return new w(this.context, e.concat.apply(e, this.toArray()));
  },
  join: H.join,
  indexOf:
    H.indexOf ||
    function (e, r) {
      for (var a = r || 0, n = this.length; a < n; a++)
        if (this[a] === e) return a;
      return -1;
    },
  iterator: function (e, r, a, n) {
    var l = [],
      t,
      i,
      o,
      f,
      s,
      c = this.context,
      d,
      h,
      v,
      b = this.selector;
    for (
      typeof e == "string" && ((n = a), (a = r), (r = e), (e = !1)),
        i = 0,
        o = c.length;
      i < o;
      i++
    ) {
      var m = new w(c[i]);
      if (r === "table") (t = a.call(m, c[i], i)), t !== void 0 && l.push(t);
      else if (r === "columns" || r === "rows")
        (t = a.call(m, c[i], this[i], i)), t !== void 0 && l.push(t);
      else if (
        r === "column" ||
        r === "column-rows" ||
        r === "row" ||
        r === "cell"
      )
        for (
          h = this[i],
            r === "column-rows" && (d = Ze(c[i], b.opts)),
            f = 0,
            s = h.length;
          f < s;
          f++
        )
          (v = h[f]),
            r === "cell"
              ? (t = a.call(m, c[i], v.row, v.column, i, f))
              : (t = a.call(m, c[i], v, i, f, d)),
            t !== void 0 && l.push(t);
    }
    if (l.length || n) {
      var D = new w(c, e ? l.concat.apply([], l) : l),
        y = D.selector;
      return (y.rows = b.rows), (y.cols = b.cols), (y.opts = b.opts), D;
    }
    return this;
  },
  lastIndexOf:
    H.lastIndexOf ||
    function (e, r) {
      return this.indexOf.apply(this.toArray.reverse(), arguments);
    },
  length: 0,
  map: function (e) {
    var r = [];
    if (H.map) r = H.map.call(this, e, this);
    else
      for (var a = 0, n = this.length; a < n; a++)
        r.push(e.call(this, this[a], a));
    return new w(this.context, r);
  },
  pluck: function (e) {
    var r = _.util.get(e);
    return this.map(function (a) {
      return r(a);
    });
  },
  pop: H.pop,
  push: H.push,
  // Does not return an API instance
  reduce:
    H.reduce ||
    function (e, r) {
      return Nr(this, e, r, 0, this.length, 1);
    },
  reduceRight:
    H.reduceRight ||
    function (e, r) {
      return Nr(this, e, r, this.length - 1, -1, -1);
    },
  reverse: H.reverse,
  // Object with rows, columns and opts
  selector: null,
  shift: H.shift,
  slice: function () {
    return new w(this.context, this);
  },
  sort: H.sort,
  // ? name - order?
  splice: H.splice,
  toArray: function () {
    return H.slice.call(this);
  },
  to$: function () {
    return u(this);
  },
  toJQuery: function () {
    return u(this);
  },
  unique: function () {
    return new w(this.context, Ve(this));
  },
  unshift: H.unshift,
});
w.extend = function (e, r, a) {
  if (!(!a.length || !r || (!(r instanceof w) && !r.__dt_wrapper))) {
    var n,
      l,
      t,
      i = function (o, f, s) {
        return function () {
          var c = f.apply(o, arguments);
          return w.extend(c, c, s.methodExt), c;
        };
      };
    for (n = 0, l = a.length; n < l; n++)
      (t = a[n]),
        (r[t.name] =
          t.type === "function"
            ? i(e, t.val, t)
            : t.type === "object"
            ? {}
            : t.val),
        (r[t.name].__dt_wrapper = !0),
        w.extend(e, r[t.name], t.propExt);
  }
};
w.register = C = function (e, r) {
  if (Array.isArray(e)) {
    for (var a = 0, n = e.length; a < n; a++) w.register(e[a], r);
    return;
  }
  var l,
    t,
    i = e.split("."),
    o = ma,
    f,
    s,
    c = function (h, v) {
      for (var b = 0, m = h.length; b < m; b++)
        if (h[b].name === v) return h[b];
      return null;
    };
  for (l = 0, t = i.length; l < t; l++) {
    (s = i[l].indexOf("()") !== -1), (f = s ? i[l].replace("()", "") : i[l]);
    var d = c(o, f);
    d ||
      ((d = {
        name: f,
        val: {},
        methodExt: [],
        propExt: [],
        type: "object",
      }),
      o.push(d)),
      l === t - 1
        ? ((d.val = r),
          (d.type =
            typeof r == "function"
              ? "function"
              : u.isPlainObject(r)
              ? "object"
              : "other"))
        : (o = s ? d.methodExt : d.propExt);
  }
};
w.registerPlural = A = function (e, r, a) {
  w.register(e, a),
    w.register(r, function () {
      var n = a.apply(this, arguments);
      return n === this
        ? this
        : n instanceof w
        ? n.length
          ? Array.isArray(n[0])
            ? new w(n.context, n[0])
            : // Array results are 'enhanced'
              n[0]
          : void 0
        : n;
    });
};
var Da = function (e, r) {
  if (Array.isArray(e))
    return u.map(e, function (n) {
      return Da(n, r);
    });
  if (typeof e == "number") return [r[e]];
  var a = u.map(r, function (n, l) {
    return n.nTable;
  });
  return u(a)
    .filter(e)
    .map(function (n) {
      var l = u.inArray(this, a);
      return r[l];
    })
    .toArray();
};
C("tables()", function (e) {
  return e != null ? new w(Da(e, this.context)) : this;
});
C("table()", function (e) {
  var r = this.tables(e),
    a = r.context;
  return a.length ? new w(a[0]) : r;
});
A("tables().nodes()", "table().node()", function () {
  return this.iterator(
    "table",
    function (e) {
      return e.nTable;
    },
    1
  );
});
A("tables().body()", "table().body()", function () {
  return this.iterator(
    "table",
    function (e) {
      return e.nTBody;
    },
    1
  );
});
A("tables().header()", "table().header()", function () {
  return this.iterator(
    "table",
    function (e) {
      return e.nTHead;
    },
    1
  );
});
A("tables().footer()", "table().footer()", function () {
  return this.iterator(
    "table",
    function (e) {
      return e.nTFoot;
    },
    1
  );
});
A("tables().containers()", "table().container()", function () {
  return this.iterator(
    "table",
    function (e) {
      return e.nTableWrapper;
    },
    1
  );
});
C("draw()", function (e) {
  return this.iterator("table", function (r) {
    e === "page"
      ? ie(r)
      : (typeof e == "string" && (e = e !== "full-hold"), oe(r, e === !1));
  });
});
C("page()", function (e) {
  return e === void 0
    ? this.page.info().page
    : this.iterator("table", function (r) {
        Ye(r, e);
      });
});
C("page.info()", function (e) {
  if (this.context.length !== 0) {
    var r = this.context[0],
      a = r._iDisplayStart,
      n = r.oFeatures.bPaginate ? r._iDisplayLength : -1,
      l = r.fnRecordsDisplay(),
      t = n === -1;
    return {
      page: t ? 0 : Math.floor(a / n),
      pages: t ? 1 : Math.ceil(l / n),
      start: a,
      end: r.fnDisplayEnd(),
      length: n,
      recordsTotal: r.fnRecordsTotal(),
      recordsDisplay: l,
      serverSide: j(r) === "ssp",
    };
  }
});
C("page.len()", function (e) {
  return e === void 0
    ? this.context.length !== 0
      ? this.context[0]._iDisplayLength
      : void 0
    : this.iterator("table", function (r) {
        mr(r, e);
      });
});
var ya = function (e, r, a) {
  if (a) {
    var n = new w(e);
    n.one("draw", function () {
      a(n.ajax.json());
    });
  }
  if (j(e) == "ssp") oe(e, r);
  else {
    U(e, !0);
    var l = e.jqXHR;
    l && l.readyState !== 4 && l.abort(),
      $e(e, [], function (t) {
        Je(e);
        for (var i = Ie(e, t), o = 0, f = i.length; o < f; o++) le(e, i[o]);
        oe(e, r), U(e, !1);
      });
  }
};
C("ajax.json()", function () {
  var e = this.context;
  if (e.length > 0) return e[0].json;
});
C("ajax.params()", function () {
  var e = this.context;
  if (e.length > 0) return e[0].oAjaxData;
});
C("ajax.reload()", function (e, r) {
  return this.iterator("table", function (a) {
    ya(a, r === !1, e);
  });
});
C("ajax.url()", function (e) {
  var r = this.context;
  return e === void 0
    ? r.length === 0
      ? void 0
      : ((r = r[0]),
        r.ajax
          ? u.isPlainObject(r.ajax)
            ? r.ajax.url
            : r.ajax
          : r.sAjaxSource)
    : this.iterator("table", function (a) {
        u.isPlainObject(a.ajax) ? (a.ajax.url = e) : (a.ajax = e);
      });
});
C("ajax.url().load()", function (e, r) {
  return this.iterator("table", function (a) {
    ya(a, r === !1, e);
  });
});
var xr = function (e, r, a, n, l) {
    var t = [],
      i,
      o,
      f,
      s,
      c,
      d,
      h = typeof r;
    for (
      (!r || h === "string" || h === "function" || r.length === void 0) &&
        (r = [r]),
        f = 0,
        s = r.length;
      f < s;
      f++
    )
      for (
        o =
          r[f] && r[f].split && !r[f].match(/[\[\(:]/)
            ? r[f].split(",")
            : [r[f]],
          c = 0,
          d = o.length;
        c < d;
        c++
      )
        (i = a(typeof o[c] == "string" ? o[c].trim() : o[c])),
          i && i.length && (t = t.concat(i));
    var v = R.selector[e];
    if (v.length) for (f = 0, s = v.length; f < s; f++) t = v[f](n, l, t);
    return Ve(t);
  },
  gr = function (e) {
    return (
      e || (e = {}),
      e.filter && e.search === void 0 && (e.search = e.filter),
      u.extend(
        {
          search: "none",
          order: "current",
          page: "all",
        },
        e
      )
    );
  },
  Ar = function (e) {
    for (var r = 0, a = e.length; r < a; r++)
      if (e[r].length > 0)
        return (
          (e[0] = e[r]),
          (e[0].length = 1),
          (e.length = 1),
          (e.context = [e.context[r]]),
          e
        );
    return (e.length = 0), e;
  },
  Ze = function (e, r) {
    var a,
      n,
      l,
      t = [],
      i = e.aiDisplay,
      o = e.aiDisplayMaster,
      f = r.search,
      s = r.order,
      c = r.page;
    if (j(e) == "ssp") return f === "removed" ? [] : de(0, o.length);
    if (c == "current")
      for (a = e._iDisplayStart, n = e.fnDisplayEnd(); a < n; a++) t.push(i[a]);
    else if (s == "current" || s == "applied") {
      if (f == "none") t = o.slice();
      else if (f == "applied") t = i.slice();
      else if (f == "removed") {
        for (var d = {}, a = 0, n = i.length; a < n; a++) d[i[a]] = null;
        t = u.map(o, function (h) {
          return d.hasOwnProperty(h) ? null : h;
        });
      }
    } else if (s == "index" || s == "original")
      for (a = 0, n = e.aoData.length; a < n; a++)
        f == "none"
          ? t.push(a)
          : ((l = u.inArray(a, i)),
            ((l === -1 && f == "removed") || (l >= 0 && f == "applied")) &&
              t.push(a));
    return t;
  },
  ka = function (e, r, a) {
    var n,
      l = function (t) {
        var i = Wr(t),
          o = e.aoData;
        if (i !== null && !a) return [i];
        if ((n || (n = Ze(e, a)), i !== null && u.inArray(i, n) !== -1))
          return [i];
        if (t == null || t === "") return n;
        if (typeof t == "function")
          return u.map(n, function (v) {
            var b = o[v];
            return t(v, b._aData, b.nTr) ? v : null;
          });
        if (t.nodeName) {
          var f = t._DT_RowIndex,
            s = t._DT_CellIndex;
          if (f !== void 0) return o[f] && o[f].nTr === t ? [f] : [];
          if (s)
            return o[s.row] && o[s.row].nTr === t.parentNode ? [s.row] : [];
          var c = u(t).closest("*[data-dt-row]");
          return c.length ? [c.data("dt-row")] : [];
        }
        if (typeof t == "string" && t.charAt(0) === "#") {
          var d = e.aIds[t.replace(/^#/, "")];
          if (d !== void 0) return [d.idx];
        }
        var h = Br(Se(e.aoData, n, "nTr"));
        return u(h)
          .filter(t)
          .map(function () {
            return this._DT_RowIndex;
          })
          .toArray();
      };
    return xr("row", r, l, e, a);
  };
C("rows()", function (e, r) {
  e === void 0 ? (e = "") : u.isPlainObject(e) && ((r = e), (e = "")),
    (r = gr(r));
  var a = this.iterator(
    "table",
    function (n) {
      return ka(n, e, r);
    },
    1
  );
  return (a.selector.rows = e), (a.selector.opts = r), a;
});
C("rows().nodes()", function () {
  return this.iterator(
    "row",
    function (e, r) {
      return e.aoData[r].nTr || void 0;
    },
    1
  );
});
C("rows().data()", function () {
  return this.iterator(
    !0,
    "rows",
    function (e, r) {
      return Se(e.aoData, r, "_aData");
    },
    1
  );
});
A("rows().cache()", "row().cache()", function (e) {
  return this.iterator(
    "row",
    function (r, a) {
      var n = r.aoData[a];
      return e === "search" ? n._aFilterData : n._aSortData;
    },
    1
  );
});
A("rows().invalidate()", "row().invalidate()", function (e) {
  return this.iterator("row", function (r, a) {
    Ae(r, a, e);
  });
});
A("rows().indexes()", "row().index()", function () {
  return this.iterator(
    "row",
    function (e, r) {
      return r;
    },
    1
  );
});
A("rows().ids()", "row().id()", function (e) {
  for (var r = [], a = this.context, n = 0, l = a.length; n < l; n++)
    for (var t = 0, i = this[n].length; t < i; t++) {
      var o = a[n].rowIdFn(a[n].aoData[this[n][t]]._aData);
      r.push((e === !0 ? "#" : "") + o);
    }
  return new w(a, r);
});
A("rows().remove()", "row().remove()", function () {
  var e = this;
  return (
    this.iterator("row", function (r, a, n) {
      var l = r.aoData,
        t = l[a],
        i,
        o,
        f,
        s,
        c,
        d;
      for (l.splice(a, 1), i = 0, o = l.length; i < o; i++)
        if (
          ((c = l[i]),
          (d = c.anCells),
          c.nTr !== null && (c.nTr._DT_RowIndex = i),
          d !== null)
        )
          for (f = 0, s = d.length; f < s; f++) d[f]._DT_CellIndex.row = i;
      Ne(r.aiDisplayMaster, a),
        Ne(r.aiDisplay, a),
        Ne(e[n], a, !1),
        r._iRecordsDisplay > 0 && r._iRecordsDisplay--,
        wr(r);
      var h = r.rowIdFn(t._aData);
      h !== void 0 && delete r.aIds[h];
    }),
    this.iterator("table", function (r) {
      for (var a = 0, n = r.aoData.length; a < n; a++) r.aoData[a].idx = a;
    }),
    this
  );
});
C("rows.add()", function (e) {
  var r = this.iterator(
      "table",
      function (n) {
        var l,
          t,
          i,
          o = [];
        for (t = 0, i = e.length; t < i; t++)
          (l = e[t]),
            l.nodeName && l.nodeName.toUpperCase() === "TR"
              ? o.push(qe(n, l)[0])
              : o.push(le(n, l));
        return o;
      },
      1
    ),
    a = this.rows(-1);
  return a.pop(), u.merge(a, r), a;
});
C("row()", function (e, r) {
  return Ar(this.rows(e, r));
});
C("row().data()", function (e) {
  var r = this.context;
  if (e === void 0)
    return r.length && this.length ? r[0].aoData[this[0]]._aData : void 0;
  var a = r[0].aoData[this[0]];
  return (
    (a._aData = e),
    Array.isArray(e) && a.nTr && a.nTr.id && te(r[0].rowId)(e, a.nTr.id),
    Ae(r[0], this[0], "data"),
    this
  );
});
C("row().node()", function () {
  var e = this.context;
  return (e.length && this.length && e[0].aoData[this[0]].nTr) || null;
});
C("row.add()", function (e) {
  e instanceof u && e.length && (e = e[0]);
  var r = this.iterator("table", function (a) {
    return e.nodeName && e.nodeName.toUpperCase() === "TR"
      ? qe(a, e)[0]
      : le(a, e);
  });
  return this.row(r[0]);
});
u(document).on("plugin-init.dt", function (e, r) {
  var a = new w(r),
    n = "on-plugin-init",
    l = "stateSaveParams." + n,
    t = "destroy. " + n;
  a.on(l, function (o, f, s) {
    for (var c = f.rowIdFn, d = f.aoData, h = [], v = 0; v < d.length; v++)
      d[v]._detailsShow && h.push("#" + c(d[v]._aData));
    s.childRows = h;
  }),
    a.on(t, function () {
      a.off(l + " " + t);
    });
  var i = a.state.loaded();
  i &&
    i.childRows &&
    a
      .rows(
        u.map(i.childRows, function (o) {
          return o.replace(/:/g, "\\:");
        })
      )
      .every(function () {
        x(r, null, "requestChild", [this]);
      });
});
var Ba = function (e, r, a, n) {
    var l = [],
      t = function (i, o) {
        if (Array.isArray(i) || i instanceof u) {
          for (var f = 0, s = i.length; f < s; f++) t(i[f], o);
          return;
        }
        if (i.nodeName && i.nodeName.toLowerCase() === "tr") l.push(i);
        else {
          var c = u("<tr><td></td></tr>").addClass(o);
          (u("td", c).addClass(o).html(i)[0].colSpan = ve(e)), l.push(c[0]);
        }
      };
    t(a, n),
      r._details && r._details.detach(),
      (r._details = u(l)),
      r._detailsShow && r._details.insertAfter(r.nTr);
  },
  Ca = _.util.throttle(function (e) {
    Le(e[0]);
  }, 500),
  Ir = function (e, r) {
    var a = e.context;
    if (a.length) {
      var n = a[0].aoData[r !== void 0 ? r : e[0]];
      n &&
        n._details &&
        (n._details.remove(),
        (n._detailsShow = void 0),
        (n._details = void 0),
        u(n.nTr).removeClass("dt-hasChild"),
        Ca(a));
    }
  },
  Sa = function (e, r) {
    var a = e.context;
    if (a.length && e.length) {
      var n = a[0].aoData[e[0]];
      n._details &&
        ((n._detailsShow = r),
        r
          ? (n._details.insertAfter(n.nTr), u(n.nTr).addClass("dt-hasChild"))
          : (n._details.detach(), u(n.nTr).removeClass("dt-hasChild")),
        x(a[0], null, "childRow", [r, e.row(e[0])]),
        Ua(a[0]),
        Ca(a));
    }
  },
  Ua = function (e) {
    var r = new w(e),
      a = ".dt.DT_details",
      n = "draw" + a,
      l = "column-sizing" + a,
      t = "destroy" + a,
      i = e.aoData;
    r.off(n + " " + l + " " + t),
      V(i, "_details").length > 0 &&
        (r.on(n, function (o, f) {
          e === f &&
            r
              .rows({ page: "current" })
              .eq(0)
              .each(function (s) {
                var c = i[s];
                c._detailsShow && c._details.insertAfter(c.nTr);
              });
        }),
        r.on(l, function (o, f, s, c) {
          if (e === f)
            for (var d, h = ve(f), v = 0, b = i.length; v < b; v++)
              (d = i[v]),
                d._details &&
                  d._details.children("td[colspan]").attr("colspan", h);
        }),
        r.on(t, function (o, f) {
          if (e === f)
            for (var s = 0, c = i.length; s < c; s++) i[s]._details && Ir(r, s);
        }));
  },
  Va = "",
  Re = Va + "row().child",
  Ke = Re + "()";
C(Ke, function (e, r) {
  var a = this.context;
  return e === void 0
    ? a.length && this.length
      ? a[0].aoData[this[0]]._details
      : void 0
    : (e === !0
        ? this.child.show()
        : e === !1
        ? Ir(this)
        : a.length && this.length && Ba(a[0], a[0].aoData[this[0]], e, r),
      this);
});
C(
  [
    Re + ".show()",
    Ke + ".show()",
    // only when `child()` was called with parameters (without
  ],
  function (e) {
    return Sa(this, !0), this;
  }
);
C(
  [
    Re + ".hide()",
    Ke + ".hide()",
    // only when `child()` was called with parameters (without
  ],
  function () {
    return Sa(this, !1), this;
  }
);
C(
  [
    Re + ".remove()",
    Ke + ".remove()",
    // only when `child()` was called with parameters (without
  ],
  function () {
    return Ir(this), this;
  }
);
C(Re + ".isShown()", function () {
  var e = this.context;
  return (e.length && this.length && e[0].aoData[this[0]]._detailsShow) || !1;
});
var Xa = /^([^:]+):(name|visIdx|visible)$/,
  wa = function (e, r, a, n, l) {
    for (var t = [], i = 0, o = l.length; i < o; i++) t.push(W(e, l[i], r));
    return t;
  },
  qa = function (e, r, a) {
    var n = e.aoColumns,
      l = V(n, "sName"),
      t = V(n, "nTh"),
      i = function (o) {
        var f = Wr(o);
        if (o === "") return de(n.length);
        if (f !== null)
          return [
            f >= 0
              ? f
              : // Count from left
                n.length + f,
            // Count from right (+ because its a negative value)
          ];
        if (typeof o == "function") {
          var s = Ze(e, a);
          return u.map(n, function (m, D) {
            return o(D, wa(e, D, 0, 0, s), t[D]) ? D : null;
          });
        }
        var c = typeof o == "string" ? o.match(Xa) : "";
        if (c)
          switch (c[2]) {
            case "visIdx":
            case "visible":
              var d = parseInt(c[1], 10);
              if (d < 0) {
                var h = u.map(n, function (m, D) {
                  return m.bVisible ? D : null;
                });
                return [h[h.length + d]];
              }
              return [xe(e, d)];
            case "name":
              return u.map(l, function (m, D) {
                return m === c[1] ? D : null;
              });
            default:
              return [];
          }
        if (o.nodeName && o._DT_CellIndex) return [o._DT_CellIndex.column];
        var v = u(t)
          .filter(o)
          .map(function () {
            return u.inArray(this, t);
          })
          .toArray();
        if (v.length || !o.nodeName) return v;
        var b = u(o).closest("*[data-dt-column]");
        return b.length ? [b.data("dt-column")] : [];
      };
    return xr("column", r, i, e, a);
  },
  Ja = function (e, r, a) {
    var n = e.aoColumns,
      l = n[r],
      t = e.aoData,
      i,
      o,
      f,
      s;
    if (a === void 0) return l.bVisible;
    if (l.bVisible !== a) {
      if (a) {
        var c = u.inArray(!0, V(n, "bVisible"), r + 1);
        for (o = 0, f = t.length; o < f; o++)
          (s = t[o].nTr),
            (i = t[o].anCells),
            s && s.insertBefore(i[r], i[c] || null);
      } else u(V(e.aoData, "anCells", r)).detach();
      l.bVisible = a;
    }
  };
C("columns()", function (e, r) {
  e === void 0 ? (e = "") : u.isPlainObject(e) && ((r = e), (e = "")),
    (r = gr(r));
  var a = this.iterator(
    "table",
    function (n) {
      return qa(n, e, r);
    },
    1
  );
  return (a.selector.cols = e), (a.selector.opts = r), a;
});
A("columns().header()", "column().header()", function (e, r) {
  return this.iterator(
    "column",
    function (a, n) {
      return a.aoColumns[n].nTh;
    },
    1
  );
});
A("columns().footer()", "column().footer()", function (e, r) {
  return this.iterator(
    "column",
    function (a, n) {
      return a.aoColumns[n].nTf;
    },
    1
  );
});
A("columns().data()", "column().data()", function () {
  return this.iterator("column-rows", wa, 1);
});
A("columns().dataSrc()", "column().dataSrc()", function () {
  return this.iterator(
    "column",
    function (e, r) {
      return e.aoColumns[r].mData;
    },
    1
  );
});
A("columns().cache()", "column().cache()", function (e) {
  return this.iterator(
    "column-rows",
    function (r, a, n, l, t) {
      return Se(r.aoData, t, e === "search" ? "_aFilterData" : "_aSortData", a);
    },
    1
  );
});
A("columns().nodes()", "column().nodes()", function () {
  return this.iterator(
    "column-rows",
    function (e, r, a, n, l) {
      return Se(e.aoData, l, "anCells", r);
    },
    1
  );
});
A("columns().visible()", "column().visible()", function (e, r) {
  var a = this,
    n = this.iterator("column", function (l, t) {
      if (e === void 0) return l.aoColumns[t].bVisible;
      Ja(l, t, e);
    });
  return (
    e !== void 0 &&
      this.iterator("table", function (l) {
        ye(l, l.aoHeader),
          ye(l, l.aoFooter),
          l.aiDisplay.length ||
            u(l.nTBody).find("td[colspan]").attr("colspan", ve(l)),
          Le(l),
          a.iterator("column", function (t, i) {
            x(t, null, "column-visibility", [t, i, e, r]);
          }),
          (r === void 0 || r) && a.columns.adjust();
      }),
    n
  );
});
A("columns().indexes()", "column().index()", function (e) {
  return this.iterator(
    "column",
    function (r, a) {
      return e === "visible" ? ge(r, a) : a;
    },
    1
  );
});
C("columns.adjust()", function () {
  return this.iterator(
    "table",
    function (e) {
      Te(e);
    },
    1
  );
});
C("column.index()", function (e, r) {
  if (this.context.length !== 0) {
    var a = this.context[0];
    if (e === "fromVisible" || e === "toData") return xe(a, r);
    if (e === "fromData" || e === "toVisible") return ge(a, r);
  }
});
C("column()", function (e, r) {
  return Ar(this.columns(e, r));
});
var Ga = function (e, r, a) {
  var n = e.aoData,
    l = Ze(e, a),
    t = Br(Se(n, l, "anCells")),
    i = u(Ur([], t)),
    o,
    f = e.aoColumns.length,
    s,
    c,
    d,
    h,
    v,
    b,
    m = function (D) {
      var y = typeof D == "function";
      if (D == null || y) {
        for (s = [], c = 0, d = l.length; c < d; c++)
          for (o = l[c], h = 0; h < f; h++)
            (v = {
              row: o,
              column: h,
            }),
              y
                ? ((b = n[o]),
                  D(v, W(e, o, h), b.anCells ? b.anCells[h] : null) &&
                    s.push(v))
                : s.push(v);
        return s;
      }
      if (u.isPlainObject(D))
        return D.column !== void 0 &&
          D.row !== void 0 &&
          u.inArray(D.row, l) !== -1
          ? [D]
          : [];
      var p = i
        .filter(D)
        .map(function (T, S) {
          return {
            // use a new object, in case someone changes the values
            row: S._DT_CellIndex.row,
            column: S._DT_CellIndex.column,
          };
        })
        .toArray();
      return p.length || !D.nodeName
        ? p
        : ((b = u(D).closest("*[data-dt-row]")),
          b.length
            ? [
                {
                  row: b.data("dt-row"),
                  column: b.data("dt-column"),
                },
              ]
            : []);
    };
  return xr("cell", r, m, e, a);
};
C("cells()", function (e, r, a) {
  if (
    (u.isPlainObject(e) &&
      (e.row === void 0 ? ((a = e), (e = null)) : ((a = r), (r = null))),
    u.isPlainObject(r) && ((a = r), (r = null)),
    r == null)
  )
    return this.iterator("table", function (h) {
      return Ga(h, e, gr(a));
    });
  var n = a
      ? {
          page: a.page,
          order: a.order,
          search: a.search,
        }
      : {},
    l = this.columns(r, n),
    t = this.rows(e, n),
    i,
    o,
    f,
    s,
    c = this.iterator(
      "table",
      function (h, v) {
        var b = [];
        for (i = 0, o = t[v].length; i < o; i++)
          for (f = 0, s = l[v].length; f < s; f++)
            b.push({
              row: t[v][i],
              column: l[v][f],
            });
        return b;
      },
      1
    ),
    d = a && a.selected ? this.cells(c, a) : c;
  return (
    u.extend(d.selector, {
      cols: r,
      rows: e,
      opts: a,
    }),
    d
  );
});
A("cells().nodes()", "cell().node()", function () {
  return this.iterator(
    "cell",
    function (e, r, a) {
      var n = e.aoData[r];
      return n && n.anCells ? n.anCells[a] : void 0;
    },
    1
  );
});
C("cells().data()", function () {
  return this.iterator(
    "cell",
    function (e, r, a) {
      return W(e, r, a);
    },
    1
  );
});
A("cells().cache()", "cell().cache()", function (e) {
  return (
    (e = e === "search" ? "_aFilterData" : "_aSortData"),
    this.iterator(
      "cell",
      function (r, a, n) {
        return r.aoData[a][e][n];
      },
      1
    )
  );
});
A("cells().render()", "cell().render()", function (e) {
  return this.iterator(
    "cell",
    function (r, a, n) {
      return W(r, a, n, e);
    },
    1
  );
});
A("cells().indexes()", "cell().index()", function () {
  return this.iterator(
    "cell",
    function (e, r, a) {
      return {
        row: r,
        column: a,
        columnVisible: ge(e, a),
      };
    },
    1
  );
});
A("cells().invalidate()", "cell().invalidate()", function (e) {
  return this.iterator("cell", function (r, a, n) {
    Ae(r, a, e, n);
  });
});
C("cell()", function (e, r, a) {
  return Ar(this.cells(e, r, a));
});
C("cell().data()", function (e) {
  var r = this.context,
    a = this[0];
  return e === void 0
    ? r.length && a.length
      ? W(r[0], a[0].row, a[0].column)
      : void 0
    : (Gr(r[0], a[0].row, a[0].column, e),
      Ae(r[0], a[0].row, "data", a[0].column),
      this);
});
C("order()", function (e, r) {
  var a = this.context;
  return e === void 0
    ? a.length !== 0
      ? a[0].aaSorting
      : void 0
    : (typeof e == "number"
        ? (e = [[e, r]])
        : e.length &&
          !Array.isArray(e[0]) &&
          (e = Array.prototype.slice.call(arguments)),
      this.iterator("table", function (n) {
        n.aaSorting = e.slice();
      }));
});
C("order.listener()", function (e, r, a) {
  return this.iterator("table", function (n) {
    Cr(n, e, r, a);
  });
});
C("order.fixed()", function (e) {
  if (!e) {
    var r = this.context,
      a = r.length ? r[0].aaSortingFixed : void 0;
    return Array.isArray(a) ? { pre: a } : a;
  }
  return this.iterator("table", function (n) {
    n.aaSortingFixed = u.extend(!0, {}, e);
  });
});
C(["columns().order()", "column().order()"], function (e) {
  var r = this;
  return this.iterator("table", function (a, n) {
    var l = [];
    u.each(r[n], function (t, i) {
      l.push([i, e]);
    }),
      (a.aaSorting = l);
  });
});
C("search()", function (e, r, a, n) {
  var l = this.context;
  return e === void 0
    ? l.length !== 0
      ? l[0].oPreviousSearch.sSearch
      : void 0
    : this.iterator("table", function (t) {
        t.oFeatures.bFilter &&
          Fe(
            t,
            u.extend({}, t.oPreviousSearch, {
              sSearch: e + "",
              bRegex: r === null ? !1 : r,
              bSmart: a === null ? !0 : a,
              bCaseInsensitive: n === null ? !0 : n,
            }),
            1
          );
      });
});
A("columns().search()", "column().search()", function (e, r, a, n) {
  return this.iterator("column", function (l, t) {
    var i = l.aoPreSearchCols;
    if (e === void 0) return i[t].sSearch;
    l.oFeatures.bFilter &&
      (u.extend(i[t], {
        sSearch: e + "",
        bRegex: r === null ? !1 : r,
        bSmart: a === null ? !0 : a,
        bCaseInsensitive: n === null ? !0 : n,
      }),
      Fe(l, l.oPreviousSearch, 1));
  });
});
C("state()", function () {
  return this.context.length ? this.context[0].oSavedState : null;
});
C("state.clear()", function () {
  return this.iterator("table", function (e) {
    e.fnStateSaveCallback.call(e.oInstance, e, {});
  });
});
C("state.loaded()", function () {
  return this.context.length ? this.context[0].oLoadedState : null;
});
C("state.save()", function () {
  return this.iterator("table", function (e) {
    Le(e);
  });
});
_.use = function (e, r) {
  r === "lib" || e.fn
    ? (u = e)
    : r == "win" || e.document
    ? ((window = e), (document = e.document))
    : (r === "datetime" || e.type === "DateTime") && (_.DateTime = e);
};
_.factory = function (e, r) {
  var a = !1;
  return (
    e && e.document && ((window = e), (document = e.document)),
    r && r.fn && r.fn.jquery && ((u = r), (a = !0)),
    a
  );
};
_.versionCheck = _.fnVersionCheck = function (e) {
  for (
    var r = _.version.split("."), a = e.split("."), n, l, t = 0, i = a.length;
    t < i;
    t++
  )
    if (((n = parseInt(r[t], 10) || 0), (l = parseInt(a[t], 10) || 0), n !== l))
      return n > l;
  return !0;
};
_.isDataTable = _.fnIsDataTable = function (e) {
  var r = u(e).get(0),
    a = !1;
  return e instanceof _.Api
    ? !0
    : (u.each(_.settings, function (n, l) {
        var t = l.nScrollHead ? u("table", l.nScrollHead)[0] : null,
          i = l.nScrollFoot ? u("table", l.nScrollFoot)[0] : null;
        (l.nTable === r || t === r || i === r) && (a = !0);
      }),
      a);
};
_.tables = _.fnTables = function (e) {
  var r = !1;
  u.isPlainObject(e) && ((r = e.api), (e = e.visible));
  var a = u.map(_.settings, function (n) {
    if (!e || (e && u(n.nTable).is(":visible"))) return n.nTable;
  });
  return r ? new w(a) : a;
};
_.camelToHungarian = ne;
C("$()", function (e, r) {
  var a = this.rows(r).nodes(),
    n = u(a);
  return u([].concat(n.filter(e).toArray(), n.find(e).toArray()));
});
u.each(["on", "one", "off"], function (e, r) {
  C(r + "()", function () {
    var a = Array.prototype.slice.call(arguments);
    a[0] = u
      .map(a[0].split(/\s/), function (l) {
        return l.match(/\.dt\b/) ? l : l + ".dt";
      })
      .join(" ");
    var n = u(this.tables().nodes());
    return n[r].apply(n, a), this;
  });
});
C("clear()", function () {
  return this.iterator("table", function (e) {
    Je(e);
  });
});
C("settings()", function () {
  return new w(this.context, this.context);
});
C("init()", function () {
  var e = this.context;
  return e.length ? e[0].oInit : null;
});
C("data()", function () {
  return this.iterator("table", function (e) {
    return V(e.aoData, "_aData");
  }).flatten();
});
C("destroy()", function (e) {
  return (
    (e = e || !1),
    this.iterator("table", function (r) {
      var a = r.oClasses,
        n = r.nTable,
        l = r.nTBody,
        t = r.nTHead,
        i = r.nTFoot,
        o = u(n),
        f = u(l),
        s = u(r.nTableWrapper),
        c = u.map(r.aoData, function (m) {
          return m.nTr;
        }),
        d;
      (r.bDestroying = !0),
        x(r, "aoDestroyCallback", "destroy", [r]),
        e || new w(r).columns().visible(!0),
        s.off(".DT").find(":not(tbody *)").off(".DT"),
        u(window).off(".DT-" + r.sInstance),
        n != t.parentNode && (o.children("thead").detach(), o.append(t)),
        i && n != i.parentNode && (o.children("tfoot").detach(), o.append(i)),
        (r.aaSorting = []),
        (r.aaSortingFixed = []),
        ke(r),
        u(c).removeClass(r.asStripeClasses.join(" ")),
        u("th, td", t).removeClass(
          a.sSortable +
            " " +
            a.sSortableAsc +
            " " +
            a.sSortableDesc +
            " " +
            a.sSortableNone
        ),
        f.children().detach(),
        f.append(c);
      var h = r.nTableWrapper.parentNode,
        v = e ? "remove" : "detach";
      o[v](),
        s[v](),
        !e &&
          h &&
          (h.insertBefore(n, r.nTableReinsertBefore),
          o.css("width", r.sDestroyWidth).removeClass(a.sTable),
          (d = r.asDestroyStripes.length),
          d &&
            f.children().each(function (m) {
              u(this).addClass(r.asDestroyStripes[m % d]);
            }));
      var b = u.inArray(r, _.settings);
      b !== -1 && _.settings.splice(b, 1);
    })
  );
});
u.each(["column", "row", "cell"], function (e, r) {
  C(r + "s().every()", function (a) {
    var n = this.selector.opts,
      l = this;
    return this.iterator(r, function (t, i, o, f, s) {
      a.call(
        l[r](i, r === "cell" ? o : n, r === "cell" ? n : void 0),
        i,
        o,
        f,
        s
      );
    });
  });
});
C("i18n()", function (e, r, a) {
  var n = this.context[0],
    l = he(e)(n.oLanguage);
  return (
    l === void 0 && (l = r),
    a !== void 0 && u.isPlainObject(l) && (l = l[a] !== void 0 ? l[a] : l._),
    typeof l == "string" ? l.replace("%d", a) : l
  );
});
_.version = "1.13.5";
_.settings = [];
_.models = {};
_.models.oSearch = {
  /**
   * Flag to indicate if the filtering should be case insensitive or not
   *  @type boolean
   *  @default true
   */
  bCaseInsensitive: !0,
  /**
   * Applied search term
   *  @type string
   *  @default <i>Empty string</i>
   */
  sSearch: "",
  /**
   * Flag to indicate if the search term should be interpreted as a
   * regular expression (true) or not (false) and therefore and special
   * regex characters escaped.
   *  @type boolean
   *  @default false
   */
  bRegex: !1,
  /**
   * Flag to indicate if DataTables is to use its smart filtering or not.
   *  @type boolean
   *  @default true
   */
  bSmart: !0,
  /**
   * Flag to indicate if DataTables should only trigger a search when
   * the return key is pressed.
   *  @type boolean
   *  @default false
   */
  return: !1,
};
_.models.oRow = {
  /**
   * TR element for the row
   *  @type node
   *  @default null
   */
  nTr: null,
  /**
   * Array of TD elements for each row. This is null until the row has been
   * created.
   *  @type array nodes
   *  @default []
   */
  anCells: null,
  /**
   * Data object from the original data source for the row. This is either
   * an array if using the traditional form of DataTables, or an object if
   * using mData options. The exact type will depend on the passed in
   * data from the data source, or will be an array if using DOM a data
   * source.
   *  @type array|object
   *  @default []
   */
  _aData: [],
  /**
   * Sorting data cache - this array is ostensibly the same length as the
   * number of columns (although each index is generated only as it is
   * needed), and holds the data that is used for sorting each column in the
   * row. We do this cache generation at the start of the sort in order that
   * the formatting of the sort data need be done only once for each cell
   * per sort. This array should not be read from or written to by anything
   * other than the master sorting methods.
   *  @type array
   *  @default null
   *  @private
   */
  _aSortData: null,
  /**
   * Per cell filtering data cache. As per the sort data cache, used to
   * increase the performance of the filtering in DataTables
   *  @type array
   *  @default null
   *  @private
   */
  _aFilterData: null,
  /**
   * Filtering data cache. This is the same as the cell filtering cache, but
   * in this case a string rather than an array. This is easily computed with
   * a join on `_aFilterData`, but is provided as a cache so the join isn't
   * needed on every search (memory traded for performance)
   *  @type array
   *  @default null
   *  @private
   */
  _sFilterRow: null,
  /**
   * Cache of the class name that DataTables has applied to the row, so we
   * can quickly look at this variable rather than needing to do a DOM check
   * on className for the nTr property.
   *  @type string
   *  @default <i>Empty string</i>
   *  @private
   */
  _sRowStripe: "",
  /**
   * Denote if the original data source was from the DOM, or the data source
   * object. This is used for invalidating data, so DataTables can
   * automatically read data from the original source, unless uninstructed
   * otherwise.
   *  @type string
   *  @default null
   *  @private
   */
  src: null,
  /**
   * Index in the aoData array. This saves an indexOf lookup when we have the
   * object, but want to know the index
   *  @type integer
   *  @default -1
   *  @private
   */
  idx: -1,
};
_.models.oColumn = {
  /**
   * Column index. This could be worked out on-the-fly with $.inArray, but it
   * is faster to just hold it as a variable
   *  @type integer
   *  @default null
   */
  idx: null,
  /**
   * A list of the columns that sorting should occur on when this column
   * is sorted. That this property is an array allows multi-column sorting
   * to be defined for a column (for example first name / last name columns
   * would benefit from this). The values are integers pointing to the
   * columns to be sorted on (typically it will be a single integer pointing
   * at itself, but that doesn't need to be the case).
   *  @type array
   */
  aDataSort: null,
  /**
   * Define the sorting directions that are applied to the column, in sequence
   * as the column is repeatedly sorted upon - i.e. the first value is used
   * as the sorting direction when the column if first sorted (clicked on).
   * Sort it again (click again) and it will move on to the next index.
   * Repeat until loop.
   *  @type array
   */
  asSorting: null,
  /**
   * Flag to indicate if the column is searchable, and thus should be included
   * in the filtering or not.
   *  @type boolean
   */
  bSearchable: null,
  /**
   * Flag to indicate if the column is sortable or not.
   *  @type boolean
   */
  bSortable: null,
  /**
   * Flag to indicate if the column is currently visible in the table or not
   *  @type boolean
   */
  bVisible: null,
  /**
   * Store for manual type assignment using the `column.type` option. This
   * is held in store so we can manipulate the column's `sType` property.
   *  @type string
   *  @default null
   *  @private
   */
  _sManualType: null,
  /**
   * Flag to indicate if HTML5 data attributes should be used as the data
   * source for filtering or sorting. True is either are.
   *  @type boolean
   *  @default false
   *  @private
   */
  _bAttrSrc: !1,
  /**
   * Developer definable function that is called whenever a cell is created (Ajax source,
   * etc) or processed for input (DOM source). This can be used as a compliment to mRender
   * allowing you to modify the DOM element (add background colour for example) when the
   * element is available.
   *  @type function
   *  @param {element} nTd The TD node that has been created
   *  @param {*} sData The Data for the cell
   *  @param {array|object} oData The data for the whole row
   *  @param {int} iRow The row index for the aoData data store
   *  @default null
   */
  fnCreatedCell: null,
  /**
   * Function to get data from a cell in a column. You should <b>never</b>
   * access data directly through _aData internally in DataTables - always use
   * the method attached to this property. It allows mData to function as
   * required. This function is automatically assigned by the column
   * initialisation method
   *  @type function
   *  @param {array|object} oData The data array/object for the array
   *    (i.e. aoData[]._aData)
   *  @param {string} sSpecific The specific data type you want to get -
   *    'display', 'type' 'filter' 'sort'
   *  @returns {*} The data for the cell from the given row's data
   *  @default null
   */
  fnGetData: null,
  /**
   * Function to set data for a cell in the column. You should <b>never</b>
   * set the data directly to _aData internally in DataTables - always use
   * this method. It allows mData to function as required. This function
   * is automatically assigned by the column initialisation method
   *  @type function
   *  @param {array|object} oData The data array/object for the array
   *    (i.e. aoData[]._aData)
   *  @param {*} sValue Value to set
   *  @default null
   */
  fnSetData: null,
  /**
   * Property to read the value for the cells in the column from the data
   * source array / object. If null, then the default content is used, if a
   * function is given then the return from the function is used.
   *  @type function|int|string|null
   *  @default null
   */
  mData: null,
  /**
   * Partner property to mData which is used (only when defined) to get
   * the data - i.e. it is basically the same as mData, but without the
   * 'set' option, and also the data fed to it is the result from mData.
   * This is the rendering method to match the data method of mData.
   *  @type function|int|string|null
   *  @default null
   */
  mRender: null,
  /**
   * Unique header TH/TD element for this column - this is what the sorting
   * listener is attached to (if sorting is enabled.)
   *  @type node
   *  @default null
   */
  nTh: null,
  /**
   * Unique footer TH/TD element for this column (if there is one). Not used
   * in DataTables as such, but can be used for plug-ins to reference the
   * footer for each column.
   *  @type node
   *  @default null
   */
  nTf: null,
  /**
   * The class to apply to all TD elements in the table's TBODY for the column
   *  @type string
   *  @default null
   */
  sClass: null,
  /**
   * When DataTables calculates the column widths to assign to each column,
   * it finds the longest string in each column and then constructs a
   * temporary table and reads the widths from that. The problem with this
   * is that "mmm" is much wider then "iiii", but the latter is a longer
   * string - thus the calculation can go wrong (doing it properly and putting
   * it into an DOM object and measuring that is horribly(!) slow). Thus as
   * a "work around" we provide this option. It will append its value to the
   * text that is found to be the longest string for the column - i.e. padding.
   *  @type string
   */
  sContentPadding: null,
  /**
   * Allows a default value to be given for a column's data, and will be used
   * whenever a null data source is encountered (this can be because mData
   * is set to null, or because the data source itself is null).
   *  @type string
   *  @default null
   */
  sDefaultContent: null,
  /**
   * Name for the column, allowing reference to the column by name as well as
   * by index (needs a lookup to work by name).
   *  @type string
   */
  sName: null,
  /**
   * Custom sorting data type - defines which of the available plug-ins in
   * afnSortData the custom sorting will use - if any is defined.
   *  @type string
   *  @default std
   */
  sSortDataType: "std",
  /**
   * Class to be applied to the header element when sorting on this column
   *  @type string
   *  @default null
   */
  sSortingClass: null,
  /**
   * Class to be applied to the header element when sorting on this column -
   * when jQuery UI theming is used.
   *  @type string
   *  @default null
   */
  sSortingClassJUI: null,
  /**
   * Title of the column - what is seen in the TH element (nTh).
   *  @type string
   */
  sTitle: null,
  /**
   * Column sorting and filtering type
   *  @type string
   *  @default null
   */
  sType: null,
  /**
   * Width of the column
   *  @type string
   *  @default null
   */
  sWidth: null,
  /**
   * Width of the column when it was first "encountered"
   *  @type string
   *  @default null
   */
  sWidthOrig: null,
};
_.defaults = {
  /**
   * An array of data to use for the table, passed in at initialisation which
   * will be used in preference to any data which is already in the DOM. This is
   * particularly useful for constructing tables purely in Javascript, for
   * example with a custom Ajax call.
   *  @type array
   *  @default null
   *
   *  @dtopt Option
   *  @name DataTable.defaults.data
   *
   *  @example
   *    // Using a 2D array data source
   *    $(document).ready( function () {
   *      $('#example').dataTable( {
   *        "data": [
   *          ['Trident', 'Internet Explorer 4.0', 'Win 95+', 4, 'X'],
   *          ['Trident', 'Internet Explorer 5.0', 'Win 95+', 5, 'C'],
   *        ],
   *        "columns": [
   *          { "title": "Engine" },
   *          { "title": "Browser" },
   *          { "title": "Platform" },
   *          { "title": "Version" },
   *          { "title": "Grade" }
   *        ]
   *      } );
   *    } );
   *
   *  @example
   *    // Using an array of objects as a data source (`data`)
   *    $(document).ready( function () {
   *      $('#example').dataTable( {
   *        "data": [
   *          {
   *            "engine":   "Trident",
   *            "browser":  "Internet Explorer 4.0",
   *            "platform": "Win 95+",
   *            "version":  4,
   *            "grade":    "X"
   *          },
   *          {
   *            "engine":   "Trident",
   *            "browser":  "Internet Explorer 5.0",
   *            "platform": "Win 95+",
   *            "version":  5,
   *            "grade":    "C"
   *          }
   *        ],
   *        "columns": [
   *          { "title": "Engine",   "data": "engine" },
   *          { "title": "Browser",  "data": "browser" },
   *          { "title": "Platform", "data": "platform" },
   *          { "title": "Version",  "data": "version" },
   *          { "title": "Grade",    "data": "grade" }
   *        ]
   *      } );
   *    } );
   */
  aaData: null,
  /**
   * If ordering is enabled, then DataTables will perform a first pass sort on
   * initialisation. You can define which column(s) the sort is performed
   * upon, and the sorting direction, with this variable. The `sorting` array
   * should contain an array for each column to be sorted initially containing
   * the column's index and a direction string ('asc' or 'desc').
   *  @type array
   *  @default [[0,'asc']]
   *
   *  @dtopt Option
   *  @name DataTable.defaults.order
   *
   *  @example
   *    // Sort by 3rd column first, and then 4th column
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "order": [[2,'asc'], [3,'desc']]
   *      } );
   *    } );
   *
   *    // No initial sorting
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "order": []
   *      } );
   *    } );
   */
  aaSorting: [[0, "asc"]],
  /**
   * This parameter is basically identical to the `sorting` parameter, but
   * cannot be overridden by user interaction with the table. What this means
   * is that you could have a column (visible or hidden) which the sorting
   * will always be forced on first - any sorting after that (from the user)
   * will then be performed as required. This can be useful for grouping rows
   * together.
   *  @type array
   *  @default null
   *
   *  @dtopt Option
   *  @name DataTable.defaults.orderFixed
   *
   *  @example
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "orderFixed": [[0,'asc']]
   *      } );
   *    } )
   */
  aaSortingFixed: [],
  /**
   * DataTables can be instructed to load data to display in the table from a
   * Ajax source. This option defines how that Ajax call is made and where to.
   *
   * The `ajax` property has three different modes of operation, depending on
   * how it is defined. These are:
   *
   * * `string` - Set the URL from where the data should be loaded from.
   * * `object` - Define properties for `jQuery.ajax`.
   * * `function` - Custom data get function
   *
   * `string`
   * --------
   *
   * As a string, the `ajax` property simply defines the URL from which
   * DataTables will load data.
   *
   * `object`
   * --------
   *
   * As an object, the parameters in the object are passed to
   * [jQuery.ajax](http://api.jquery.com/jQuery.ajax/) allowing fine control
   * of the Ajax request. DataTables has a number of default parameters which
   * you can override using this option. Please refer to the jQuery
   * documentation for a full description of the options available, although
   * the following parameters provide additional options in DataTables or
   * require special consideration:
   *
   * * `data` - As with jQuery, `data` can be provided as an object, but it
   *   can also be used as a function to manipulate the data DataTables sends
   *   to the server. The function takes a single parameter, an object of
   *   parameters with the values that DataTables has readied for sending. An
   *   object may be returned which will be merged into the DataTables
   *   defaults, or you can add the items to the object that was passed in and
   *   not return anything from the function. This supersedes `fnServerParams`
   *   from DataTables 1.9-.
   *
   * * `dataSrc` - By default DataTables will look for the property `data` (or
   *   `aaData` for compatibility with DataTables 1.9-) when obtaining data
   *   from an Ajax source or for server-side processing - this parameter
   *   allows that property to be changed. You can use Javascript dotted
   *   object notation to get a data source for multiple levels of nesting, or
   *   it my be used as a function. As a function it takes a single parameter,
   *   the JSON returned from the server, which can be manipulated as
   *   required, with the returned value being that used by DataTables as the
   *   data source for the table. This supersedes `sAjaxDataProp` from
   *   DataTables 1.9-.
   *
   * * `success` - Should not be overridden it is used internally in
   *   DataTables. To manipulate / transform the data returned by the server
   *   use `ajax.dataSrc`, or use `ajax` as a function (see below).
   *
   * `function`
   * ----------
   *
   * As a function, making the Ajax call is left up to yourself allowing
   * complete control of the Ajax request. Indeed, if desired, a method other
   * than Ajax could be used to obtain the required data, such as Web storage
   * or an AIR database.
   *
   * The function is given four parameters and no return is required. The
   * parameters are:
   *
   * 1. _object_ - Data to send to the server
   * 2. _function_ - Callback function that must be executed when the required
   *    data has been obtained. That data should be passed into the callback
   *    as the only parameter
   * 3. _object_ - DataTables settings object for the table
   *
   * Note that this supersedes `fnServerData` from DataTables 1.9-.
   *
   *  @type string|object|function
   *  @default null
   *
   *  @dtopt Option
   *  @name DataTable.defaults.ajax
   *  @since 1.10.0
   *
   * @example
   *   // Get JSON data from a file via Ajax.
   *   // Note DataTables expects data in the form `{ data: [ ...data... ] }` by default).
   *   $('#example').dataTable( {
   *     "ajax": "data.json"
   *   } );
   *
   * @example
   *   // Get JSON data from a file via Ajax, using `dataSrc` to change
   *   // `data` to `tableData` (i.e. `{ tableData: [ ...data... ] }`)
   *   $('#example').dataTable( {
   *     "ajax": {
   *       "url": "data.json",
   *       "dataSrc": "tableData"
   *     }
   *   } );
   *
   * @example
   *   // Get JSON data from a file via Ajax, using `dataSrc` to read data
   *   // from a plain array rather than an array in an object
   *   $('#example').dataTable( {
   *     "ajax": {
   *       "url": "data.json",
   *       "dataSrc": ""
   *     }
   *   } );
   *
   * @example
   *   // Manipulate the data returned from the server - add a link to data
   *   // (note this can, should, be done using `render` for the column - this
   *   // is just a simple example of how the data can be manipulated).
   *   $('#example').dataTable( {
   *     "ajax": {
   *       "url": "data.json",
   *       "dataSrc": function ( json ) {
   *         for ( var i=0, ien=json.length ; i<ien ; i++ ) {
   *           json[i][0] = '<a href="/message/'+json[i][0]+'>View message</a>';
   *         }
   *         return json;
   *       }
   *     }
   *   } );
   *
   * @example
   *   // Add data to the request
   *   $('#example').dataTable( {
   *     "ajax": {
   *       "url": "data.json",
   *       "data": function ( d ) {
   *         return {
   *           "extra_search": $('#extra').val()
   *         };
   *       }
   *     }
   *   } );
   *
   * @example
   *   // Send request as POST
   *   $('#example').dataTable( {
   *     "ajax": {
   *       "url": "data.json",
   *       "type": "POST"
   *     }
   *   } );
   *
   * @example
   *   // Get the data from localStorage (could interface with a form for
   *   // adding, editing and removing rows).
   *   $('#example').dataTable( {
   *     "ajax": function (data, callback, settings) {
   *       callback(
   *         JSON.parse( localStorage.getItem('dataTablesData') )
   *       );
   *     }
   *   } );
   */
  ajax: null,
  /**
   * This parameter allows you to readily specify the entries in the length drop
   * down menu that DataTables shows when pagination is enabled. It can be
   * either a 1D array of options which will be used for both the displayed
   * option and the value, or a 2D array which will use the array in the first
   * position as the value, and the array in the second position as the
   * displayed options (useful for language strings such as 'All').
   *
   * Note that the `pageLength` property will be automatically set to the
   * first value given in this array, unless `pageLength` is also provided.
   *  @type array
   *  @default [ 10, 25, 50, 100 ]
   *
   *  @dtopt Option
   *  @name DataTable.defaults.lengthMenu
   *
   *  @example
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]]
   *      } );
   *    } );
   */
  aLengthMenu: [10, 25, 50, 100],
  /**
   * The `columns` option in the initialisation parameter allows you to define
   * details about the way individual columns behave. For a full list of
   * column options that can be set, please see
   * {@link DataTable.defaults.column}. Note that if you use `columns` to
   * define your columns, you must have an entry in the array for every single
   * column that you have in your table (these can be null if you don't which
   * to specify any options).
   *  @member
   *
   *  @name DataTable.defaults.column
   */
  aoColumns: null,
  /**
   * Very similar to `columns`, `columnDefs` allows you to target a specific
   * column, multiple columns, or all columns, using the `targets` property of
   * each object in the array. This allows great flexibility when creating
   * tables, as the `columnDefs` arrays can be of any length, targeting the
   * columns you specifically want. `columnDefs` may use any of the column
   * options available: {@link DataTable.defaults.column}, but it _must_
   * have `targets` defined in each object in the array. Values in the `targets`
   * array may be:
   *   <ul>
   *     <li>a string - class name will be matched on the TH for the column</li>
   *     <li>0 or a positive integer - column index counting from the left</li>
   *     <li>a negative integer - column index counting from the right</li>
   *     <li>the string "_all" - all columns (i.e. assign a default)</li>
   *   </ul>
   *  @member
   *
   *  @name DataTable.defaults.columnDefs
   */
  aoColumnDefs: null,
  /**
   * Basically the same as `search`, this parameter defines the individual column
   * filtering state at initialisation time. The array must be of the same size
   * as the number of columns, and each element be an object with the parameters
   * `search` and `escapeRegex` (the latter is optional). 'null' is also
   * accepted and the default will be used.
   *  @type array
   *  @default []
   *
   *  @dtopt Option
   *  @name DataTable.defaults.searchCols
   *
   *  @example
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "searchCols": [
   *          null,
   *          { "search": "My filter" },
   *          null,
   *          { "search": "^[0-9]", "escapeRegex": false }
   *        ]
   *      } );
   *    } )
   */
  aoSearchCols: [],
  /**
   * An array of CSS classes that should be applied to displayed rows. This
   * array may be of any length, and DataTables will apply each class
   * sequentially, looping when required.
   *  @type array
   *  @default null <i>Will take the values determined by the `oClasses.stripe*`
   *    options</i>
   *
   *  @dtopt Option
   *  @name DataTable.defaults.stripeClasses
   *
   *  @example
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "stripeClasses": [ 'strip1', 'strip2', 'strip3' ]
   *      } );
   *    } )
   */
  asStripeClasses: null,
  /**
   * Enable or disable automatic column width calculation. This can be disabled
   * as an optimisation (it takes some time to calculate the widths) if the
   * tables widths are passed in using `columns`.
   *  @type boolean
   *  @default true
   *
   *  @dtopt Features
   *  @name DataTable.defaults.autoWidth
   *
   *  @example
   *    $(document).ready( function () {
   *      $('#example').dataTable( {
   *        "autoWidth": false
   *      } );
   *    } );
   */
  bAutoWidth: !0,
  /**
   * Deferred rendering can provide DataTables with a huge speed boost when you
   * are using an Ajax or JS data source for the table. This option, when set to
   * true, will cause DataTables to defer the creation of the table elements for
   * each row until they are needed for a draw - saving a significant amount of
   * time.
   *  @type boolean
   *  @default false
   *
   *  @dtopt Features
   *  @name DataTable.defaults.deferRender
   *
   *  @example
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "ajax": "sources/arrays.txt",
   *        "deferRender": true
   *      } );
   *    } );
   */
  bDeferRender: !1,
  /**
   * Replace a DataTable which matches the given selector and replace it with
   * one which has the properties of the new initialisation object passed. If no
   * table matches the selector, then the new DataTable will be constructed as
   * per normal.
   *  @type boolean
   *  @default false
   *
   *  @dtopt Options
   *  @name DataTable.defaults.destroy
   *
   *  @example
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "srollY": "200px",
   *        "paginate": false
   *      } );
   *
   *      // Some time later....
   *      $('#example').dataTable( {
   *        "filter": false,
   *        "destroy": true
   *      } );
   *    } );
   */
  bDestroy: !1,
  /**
   * Enable or disable filtering of data. Filtering in DataTables is "smart" in
   * that it allows the end user to input multiple words (space separated) and
   * will match a row containing those words, even if not in the order that was
   * specified (this allow matching across multiple columns). Note that if you
   * wish to use filtering in DataTables this must remain 'true' - to remove the
   * default filtering input box and retain filtering abilities, please use
   * {@link DataTable.defaults.dom}.
   *  @type boolean
   *  @default true
   *
   *  @dtopt Features
   *  @name DataTable.defaults.searching
   *
   *  @example
   *    $(document).ready( function () {
   *      $('#example').dataTable( {
   *        "searching": false
   *      } );
   *    } );
   */
  bFilter: !0,
  /**
   * Enable or disable the table information display. This shows information
   * about the data that is currently visible on the page, including information
   * about filtered data if that action is being performed.
   *  @type boolean
   *  @default true
   *
   *  @dtopt Features
   *  @name DataTable.defaults.info
   *
   *  @example
   *    $(document).ready( function () {
   *      $('#example').dataTable( {
   *        "info": false
   *      } );
   *    } );
   */
  bInfo: !0,
  /**
   * Allows the end user to select the size of a formatted page from a select
   * menu (sizes are 10, 25, 50 and 100). Requires pagination (`paginate`).
   *  @type boolean
   *  @default true
   *
   *  @dtopt Features
   *  @name DataTable.defaults.lengthChange
   *
   *  @example
   *    $(document).ready( function () {
   *      $('#example').dataTable( {
   *        "lengthChange": false
   *      } );
   *    } );
   */
  bLengthChange: !0,
  /**
   * Enable or disable pagination.
   *  @type boolean
   *  @default true
   *
   *  @dtopt Features
   *  @name DataTable.defaults.paging
   *
   *  @example
   *    $(document).ready( function () {
   *      $('#example').dataTable( {
   *        "paging": false
   *      } );
   *    } );
   */
  bPaginate: !0,
  /**
   * Enable or disable the display of a 'processing' indicator when the table is
   * being processed (e.g. a sort). This is particularly useful for tables with
   * large amounts of data where it can take a noticeable amount of time to sort
   * the entries.
   *  @type boolean
   *  @default false
   *
   *  @dtopt Features
   *  @name DataTable.defaults.processing
   *
   *  @example
   *    $(document).ready( function () {
   *      $('#example').dataTable( {
   *        "processing": true
   *      } );
   *    } );
   */
  bProcessing: !1,
  /**
   * Retrieve the DataTables object for the given selector. Note that if the
   * table has already been initialised, this parameter will cause DataTables
   * to simply return the object that has already been set up - it will not take
   * account of any changes you might have made to the initialisation object
   * passed to DataTables (setting this parameter to true is an acknowledgement
   * that you understand this). `destroy` can be used to reinitialise a table if
   * you need.
   *  @type boolean
   *  @default false
   *
   *  @dtopt Options
   *  @name DataTable.defaults.retrieve
   *
   *  @example
   *    $(document).ready( function() {
   *      initTable();
   *      tableActions();
   *    } );
   *
   *    function initTable ()
   *    {
   *      return $('#example').dataTable( {
   *        "scrollY": "200px",
   *        "paginate": false,
   *        "retrieve": true
   *      } );
   *    }
   *
   *    function tableActions ()
   *    {
   *      var table = initTable();
   *      // perform API operations with oTable
   *    }
   */
  bRetrieve: !1,
  /**
   * When vertical (y) scrolling is enabled, DataTables will force the height of
   * the table's viewport to the given height at all times (useful for layout).
   * However, this can look odd when filtering data down to a small data set,
   * and the footer is left "floating" further down. This parameter (when
   * enabled) will cause DataTables to collapse the table's viewport down when
   * the result set will fit within the given Y height.
   *  @type boolean
   *  @default false
   *
   *  @dtopt Options
   *  @name DataTable.defaults.scrollCollapse
   *
   *  @example
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "scrollY": "200",
   *        "scrollCollapse": true
   *      } );
   *    } );
   */
  bScrollCollapse: !1,
  /**
   * Configure DataTables to use server-side processing. Note that the
   * `ajax` parameter must also be given in order to give DataTables a
   * source to obtain the required data for each draw.
   *  @type boolean
   *  @default false
   *
   *  @dtopt Features
   *  @dtopt Server-side
   *  @name DataTable.defaults.serverSide
   *
   *  @example
   *    $(document).ready( function () {
   *      $('#example').dataTable( {
   *        "serverSide": true,
   *        "ajax": "xhr.php"
   *      } );
   *    } );
   */
  bServerSide: !1,
  /**
   * Enable or disable sorting of columns. Sorting of individual columns can be
   * disabled by the `sortable` option for each column.
   *  @type boolean
   *  @default true
   *
   *  @dtopt Features
   *  @name DataTable.defaults.ordering
   *
   *  @example
   *    $(document).ready( function () {
   *      $('#example').dataTable( {
   *        "ordering": false
   *      } );
   *    } );
   */
  bSort: !0,
  /**
   * Enable or display DataTables' ability to sort multiple columns at the
   * same time (activated by shift-click by the user).
   *  @type boolean
   *  @default true
   *
   *  @dtopt Options
   *  @name DataTable.defaults.orderMulti
   *
   *  @example
   *    // Disable multiple column sorting ability
   *    $(document).ready( function () {
   *      $('#example').dataTable( {
   *        "orderMulti": false
   *      } );
   *    } );
   */
  bSortMulti: !0,
  /**
   * Allows control over whether DataTables should use the top (true) unique
   * cell that is found for a single column, or the bottom (false - default).
   * This is useful when using complex headers.
   *  @type boolean
   *  @default false
   *
   *  @dtopt Options
   *  @name DataTable.defaults.orderCellsTop
   *
   *  @example
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "orderCellsTop": true
   *      } );
   *    } );
   */
  bSortCellsTop: !1,
  /**
   * Enable or disable the addition of the classes `sorting\_1`, `sorting\_2` and
   * `sorting\_3` to the columns which are currently being sorted on. This is
   * presented as a feature switch as it can increase processing time (while
   * classes are removed and added) so for large data sets you might want to
   * turn this off.
   *  @type boolean
   *  @default true
   *
   *  @dtopt Features
   *  @name DataTable.defaults.orderClasses
   *
   *  @example
   *    $(document).ready( function () {
   *      $('#example').dataTable( {
   *        "orderClasses": false
   *      } );
   *    } );
   */
  bSortClasses: !0,
  /**
   * Enable or disable state saving. When enabled HTML5 `localStorage` will be
   * used to save table display information such as pagination information,
   * display length, filtering and sorting. As such when the end user reloads
   * the page the display display will match what thy had previously set up.
   *
   * Due to the use of `localStorage` the default state saving is not supported
   * in IE6 or 7. If state saving is required in those browsers, use
   * `stateSaveCallback` to provide a storage solution such as cookies.
   *  @type boolean
   *  @default false
   *
   *  @dtopt Features
   *  @name DataTable.defaults.stateSave
   *
   *  @example
   *    $(document).ready( function () {
   *      $('#example').dataTable( {
   *        "stateSave": true
   *      } );
   *    } );
   */
  bStateSave: !1,
  /**
   * This function is called when a TR element is created (and all TD child
   * elements have been inserted), or registered if using a DOM source, allowing
   * manipulation of the TR element (adding classes etc).
   *  @type function
   *  @param {node} row "TR" element for the current row
   *  @param {array} data Raw data array for this row
   *  @param {int} dataIndex The index of this row in the internal aoData array
   *
   *  @dtopt Callbacks
   *  @name DataTable.defaults.createdRow
   *
   *  @example
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "createdRow": function( row, data, dataIndex ) {
   *          // Bold the grade for all 'A' grade browsers
   *          if ( data[4] == "A" )
   *          {
   *            $('td:eq(4)', row).html( '<b>A</b>' );
   *          }
   *        }
   *      } );
   *    } );
   */
  fnCreatedRow: null,
  /**
   * This function is called on every 'draw' event, and allows you to
   * dynamically modify any aspect you want about the created DOM.
   *  @type function
   *  @param {object} settings DataTables settings object
   *
   *  @dtopt Callbacks
   *  @name DataTable.defaults.drawCallback
   *
   *  @example
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "drawCallback": function( settings ) {
   *          alert( 'DataTables has redrawn the table' );
   *        }
   *      } );
   *    } );
   */
  fnDrawCallback: null,
  /**
   * Identical to fnHeaderCallback() but for the table footer this function
   * allows you to modify the table footer on every 'draw' event.
   *  @type function
   *  @param {node} foot "TR" element for the footer
   *  @param {array} data Full table data (as derived from the original HTML)
   *  @param {int} start Index for the current display starting point in the
   *    display array
   *  @param {int} end Index for the current display ending point in the
   *    display array
   *  @param {array int} display Index array to translate the visual position
   *    to the full data array
   *
   *  @dtopt Callbacks
   *  @name DataTable.defaults.footerCallback
   *
   *  @example
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "footerCallback": function( tfoot, data, start, end, display ) {
   *          tfoot.getElementsByTagName('th')[0].innerHTML = "Starting index is "+start;
   *        }
   *      } );
   *    } )
   */
  fnFooterCallback: null,
  /**
   * When rendering large numbers in the information element for the table
   * (i.e. "Showing 1 to 10 of 57 entries") DataTables will render large numbers
   * to have a comma separator for the 'thousands' units (e.g. 1 million is
   * rendered as "1,000,000") to help readability for the end user. This
   * function will override the default method DataTables uses.
   *  @type function
   *  @member
   *  @param {int} toFormat number to be formatted
   *  @returns {string} formatted string for DataTables to show the number
   *
   *  @dtopt Callbacks
   *  @name DataTable.defaults.formatNumber
   *
   *  @example
   *    // Format a number using a single quote for the separator (note that
   *    // this can also be done with the language.thousands option)
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "formatNumber": function ( toFormat ) {
   *          return toFormat.toString().replace(
   *            /\B(?=(\d{3})+(?!\d))/g, "'"
   *          );
   *        };
   *      } );
   *    } );
   */
  fnFormatNumber: function (e) {
    return e
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, this.oLanguage.sThousands);
  },
  /**
   * This function is called on every 'draw' event, and allows you to
   * dynamically modify the header row. This can be used to calculate and
   * display useful information about the table.
   *  @type function
   *  @param {node} head "TR" element for the header
   *  @param {array} data Full table data (as derived from the original HTML)
   *  @param {int} start Index for the current display starting point in the
   *    display array
   *  @param {int} end Index for the current display ending point in the
   *    display array
   *  @param {array int} display Index array to translate the visual position
   *    to the full data array
   *
   *  @dtopt Callbacks
   *  @name DataTable.defaults.headerCallback
   *
   *  @example
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "fheaderCallback": function( head, data, start, end, display ) {
   *          head.getElementsByTagName('th')[0].innerHTML = "Displaying "+(end-start)+" records";
   *        }
   *      } );
   *    } )
   */
  fnHeaderCallback: null,
  /**
   * The information element can be used to convey information about the current
   * state of the table. Although the internationalisation options presented by
   * DataTables are quite capable of dealing with most customisations, there may
   * be times where you wish to customise the string further. This callback
   * allows you to do exactly that.
   *  @type function
   *  @param {object} oSettings DataTables settings object
   *  @param {int} start Starting position in data for the draw
   *  @param {int} end End position in data for the draw
   *  @param {int} max Total number of rows in the table (regardless of
   *    filtering)
   *  @param {int} total Total number of rows in the data set, after filtering
   *  @param {string} pre The string that DataTables has formatted using it's
   *    own rules
   *  @returns {string} The string to be displayed in the information element.
   *
   *  @dtopt Callbacks
   *  @name DataTable.defaults.infoCallback
   *
   *  @example
   *    $('#example').dataTable( {
   *      "infoCallback": function( settings, start, end, max, total, pre ) {
   *        return start +" to "+ end;
   *      }
   *    } );
   */
  fnInfoCallback: null,
  /**
   * Called when the table has been initialised. Normally DataTables will
   * initialise sequentially and there will be no need for this function,
   * however, this does not hold true when using external language information
   * since that is obtained using an async XHR call.
   *  @type function
   *  @param {object} settings DataTables settings object
   *  @param {object} json The JSON object request from the server - only
   *    present if client-side Ajax sourced data is used
   *
   *  @dtopt Callbacks
   *  @name DataTable.defaults.initComplete
   *
   *  @example
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "initComplete": function(settings, json) {
   *          alert( 'DataTables has finished its initialisation.' );
   *        }
   *      } );
   *    } )
   */
  fnInitComplete: null,
  /**
   * Called at the very start of each table draw and can be used to cancel the
   * draw by returning false, any other return (including undefined) results in
   * the full draw occurring).
   *  @type function
   *  @param {object} settings DataTables settings object
   *  @returns {boolean} False will cancel the draw, anything else (including no
   *    return) will allow it to complete.
   *
   *  @dtopt Callbacks
   *  @name DataTable.defaults.preDrawCallback
   *
   *  @example
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "preDrawCallback": function( settings ) {
   *          if ( $('#test').val() == 1 ) {
   *            return false;
   *          }
   *        }
   *      } );
   *    } );
   */
  fnPreDrawCallback: null,
  /**
   * This function allows you to 'post process' each row after it have been
   * generated for each table draw, but before it is rendered on screen. This
   * function might be used for setting the row class name etc.
   *  @type function
   *  @param {node} row "TR" element for the current row
   *  @param {array} data Raw data array for this row
   *  @param {int} displayIndex The display index for the current table draw
   *  @param {int} displayIndexFull The index of the data in the full list of
   *    rows (after filtering)
   *
   *  @dtopt Callbacks
   *  @name DataTable.defaults.rowCallback
   *
   *  @example
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "rowCallback": function( row, data, displayIndex, displayIndexFull ) {
   *          // Bold the grade for all 'A' grade browsers
   *          if ( data[4] == "A" ) {
   *            $('td:eq(4)', row).html( '<b>A</b>' );
   *          }
   *        }
   *      } );
   *    } );
   */
  fnRowCallback: null,
  /**
   * __Deprecated__ The functionality provided by this parameter has now been
   * superseded by that provided through `ajax`, which should be used instead.
   *
   * This parameter allows you to override the default function which obtains
   * the data from the server so something more suitable for your application.
   * For example you could use POST data, or pull information from a Gears or
   * AIR database.
   *  @type function
   *  @member
   *  @param {string} source HTTP source to obtain the data from (`ajax`)
   *  @param {array} data A key/value pair object containing the data to send
   *    to the server
   *  @param {function} callback to be called on completion of the data get
   *    process that will draw the data on the page.
   *  @param {object} settings DataTables settings object
   *
   *  @dtopt Callbacks
   *  @dtopt Server-side
   *  @name DataTable.defaults.serverData
   *
   *  @deprecated 1.10. Please use `ajax` for this functionality now.
   */
  fnServerData: null,
  /**
   * __Deprecated__ The functionality provided by this parameter has now been
   * superseded by that provided through `ajax`, which should be used instead.
   *
   *  It is often useful to send extra data to the server when making an Ajax
   * request - for example custom filtering information, and this callback
   * function makes it trivial to send extra information to the server. The
   * passed in parameter is the data set that has been constructed by
   * DataTables, and you can add to this or modify it as you require.
   *  @type function
   *  @param {array} data Data array (array of objects which are name/value
   *    pairs) that has been constructed by DataTables and will be sent to the
   *    server. In the case of Ajax sourced data with server-side processing
   *    this will be an empty array, for server-side processing there will be a
   *    significant number of parameters!
   *  @returns {undefined} Ensure that you modify the data array passed in,
   *    as this is passed by reference.
   *
   *  @dtopt Callbacks
   *  @dtopt Server-side
   *  @name DataTable.defaults.serverParams
   *
   *  @deprecated 1.10. Please use `ajax` for this functionality now.
   */
  fnServerParams: null,
  /**
   * Load the table state. With this function you can define from where, and how, the
   * state of a table is loaded. By default DataTables will load from `localStorage`
   * but you might wish to use a server-side database or cookies.
   *  @type function
   *  @member
   *  @param {object} settings DataTables settings object
   *  @param {object} callback Callback that can be executed when done. It
   *    should be passed the loaded state object.
   *  @return {object} The DataTables state object to be loaded
   *
   *  @dtopt Callbacks
   *  @name DataTable.defaults.stateLoadCallback
   *
   *  @example
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "stateSave": true,
   *        "stateLoadCallback": function (settings, callback) {
   *          $.ajax( {
   *            "url": "/state_load",
   *            "dataType": "json",
   *            "success": function (json) {
   *              callback( json );
   *            }
   *          } );
   *        }
   *      } );
   *    } );
   */
  fnStateLoadCallback: function (e) {
    try {
      return JSON.parse(
        (e.iStateDuration === -1 ? sessionStorage : localStorage).getItem(
          "DataTables_" + e.sInstance + "_" + location.pathname
        )
      );
    } catch {
      return {};
    }
  },
  /**
   * Callback which allows modification of the saved state prior to loading that state.
   * This callback is called when the table is loading state from the stored data, but
   * prior to the settings object being modified by the saved state. Note that for
   * plug-in authors, you should use the `stateLoadParams` event to load parameters for
   * a plug-in.
   *  @type function
   *  @param {object} settings DataTables settings object
   *  @param {object} data The state object that is to be loaded
   *
   *  @dtopt Callbacks
   *  @name DataTable.defaults.stateLoadParams
   *
   *  @example
   *    // Remove a saved filter, so filtering is never loaded
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "stateSave": true,
   *        "stateLoadParams": function (settings, data) {
   *          data.oSearch.sSearch = "";
   *        }
   *      } );
   *    } );
   *
   *  @example
   *    // Disallow state loading by returning false
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "stateSave": true,
   *        "stateLoadParams": function (settings, data) {
   *          return false;
   *        }
   *      } );
   *    } );
   */
  fnStateLoadParams: null,
  /**
   * Callback that is called when the state has been loaded from the state saving method
   * and the DataTables settings object has been modified as a result of the loaded state.
   *  @type function
   *  @param {object} settings DataTables settings object
   *  @param {object} data The state object that was loaded
   *
   *  @dtopt Callbacks
   *  @name DataTable.defaults.stateLoaded
   *
   *  @example
   *    // Show an alert with the filtering value that was saved
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "stateSave": true,
   *        "stateLoaded": function (settings, data) {
   *          alert( 'Saved filter was: '+data.oSearch.sSearch );
   *        }
   *      } );
   *    } );
   */
  fnStateLoaded: null,
  /**
   * Save the table state. This function allows you to define where and how the state
   * information for the table is stored By default DataTables will use `localStorage`
   * but you might wish to use a server-side database or cookies.
   *  @type function
   *  @member
   *  @param {object} settings DataTables settings object
   *  @param {object} data The state object to be saved
   *
   *  @dtopt Callbacks
   *  @name DataTable.defaults.stateSaveCallback
   *
   *  @example
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "stateSave": true,
   *        "stateSaveCallback": function (settings, data) {
   *          // Send an Ajax request to the server with the state object
   *          $.ajax( {
   *            "url": "/state_save",
   *            "data": data,
   *            "dataType": "json",
   *            "method": "POST"
   *            "success": function () {}
   *          } );
   *        }
   *      } );
   *    } );
   */
  fnStateSaveCallback: function (e, r) {
    try {
      (e.iStateDuration === -1 ? sessionStorage : localStorage).setItem(
        "DataTables_" + e.sInstance + "_" + location.pathname,
        JSON.stringify(r)
      );
    } catch {}
  },
  /**
   * Callback which allows modification of the state to be saved. Called when the table
   * has changed state a new state save is required. This method allows modification of
   * the state saving object prior to actually doing the save, including addition or
   * other state properties or modification. Note that for plug-in authors, you should
   * use the `stateSaveParams` event to save parameters for a plug-in.
   *  @type function
   *  @param {object} settings DataTables settings object
   *  @param {object} data The state object to be saved
   *
   *  @dtopt Callbacks
   *  @name DataTable.defaults.stateSaveParams
   *
   *  @example
   *    // Remove a saved filter, so filtering is never saved
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "stateSave": true,
   *        "stateSaveParams": function (settings, data) {
   *          data.oSearch.sSearch = "";
   *        }
   *      } );
   *    } );
   */
  fnStateSaveParams: null,
  /**
   * Duration for which the saved state information is considered valid. After this period
   * has elapsed the state will be returned to the default.
   * Value is given in seconds.
   *  @type int
   *  @default 7200 <i>(2 hours)</i>
   *
   *  @dtopt Options
   *  @name DataTable.defaults.stateDuration
   *
   *  @example
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "stateDuration": 60*60*24; // 1 day
   *      } );
   *    } )
   */
  iStateDuration: 7200,
  /**
   * When enabled DataTables will not make a request to the server for the first
   * page draw - rather it will use the data already on the page (no sorting etc
   * will be applied to it), thus saving on an XHR at load time. `deferLoading`
   * is used to indicate that deferred loading is required, but it is also used
   * to tell DataTables how many records there are in the full table (allowing
   * the information element and pagination to be displayed correctly). In the case
   * where a filtering is applied to the table on initial load, this can be
   * indicated by giving the parameter as an array, where the first element is
   * the number of records available after filtering and the second element is the
   * number of records without filtering (allowing the table information element
   * to be shown correctly).
   *  @type int | array
   *  @default null
   *
   *  @dtopt Options
   *  @name DataTable.defaults.deferLoading
   *
   *  @example
   *    // 57 records available in the table, no filtering applied
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "serverSide": true,
   *        "ajax": "scripts/server_processing.php",
   *        "deferLoading": 57
   *      } );
   *    } );
   *
   *  @example
   *    // 57 records after filtering, 100 without filtering (an initial filter applied)
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "serverSide": true,
   *        "ajax": "scripts/server_processing.php",
   *        "deferLoading": [ 57, 100 ],
   *        "search": {
   *          "search": "my_filter"
   *        }
   *      } );
   *    } );
   */
  iDeferLoading: null,
  /**
   * Number of rows to display on a single page when using pagination. If
   * feature enabled (`lengthChange`) then the end user will be able to override
   * this to a custom setting using a pop-up menu.
   *  @type int
   *  @default 10
   *
   *  @dtopt Options
   *  @name DataTable.defaults.pageLength
   *
   *  @example
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "pageLength": 50
   *      } );
   *    } )
   */
  iDisplayLength: 10,
  /**
   * Define the starting point for data display when using DataTables with
   * pagination. Note that this parameter is the number of records, rather than
   * the page number, so if you have 10 records per page and want to start on
   * the third page, it should be "20".
   *  @type int
   *  @default 0
   *
   *  @dtopt Options
   *  @name DataTable.defaults.displayStart
   *
   *  @example
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "displayStart": 20
   *      } );
   *    } )
   */
  iDisplayStart: 0,
  /**
   * By default DataTables allows keyboard navigation of the table (sorting, paging,
   * and filtering) by adding a `tabindex` attribute to the required elements. This
   * allows you to tab through the controls and press the enter key to activate them.
   * The tabindex is default 0, meaning that the tab follows the flow of the document.
   * You can overrule this using this parameter if you wish. Use a value of -1 to
   * disable built-in keyboard navigation.
   *  @type int
   *  @default 0
   *
   *  @dtopt Options
   *  @name DataTable.defaults.tabIndex
   *
   *  @example
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "tabIndex": 1
   *      } );
   *    } );
   */
  iTabIndex: 0,
  /**
   * Classes that DataTables assigns to the various components and features
   * that it adds to the HTML table. This allows classes to be configured
   * during initialisation in addition to through the static
   * {@link DataTable.ext.oStdClasses} object).
   *  @namespace
   *  @name DataTable.defaults.classes
   */
  oClasses: {},
  /**
   * All strings that DataTables uses in the user interface that it creates
   * are defined in this object, allowing you to modified them individually or
   * completely replace them all as required.
   *  @namespace
   *  @name DataTable.defaults.language
   */
  oLanguage: {
    /**
     * Strings that are used for WAI-ARIA labels and controls only (these are not
     * actually visible on the page, but will be read by screenreaders, and thus
     * must be internationalised as well).
     *  @namespace
     *  @name DataTable.defaults.language.aria
     */
    oAria: {
      /**
       * ARIA label that is added to the table headers when the column may be
       * sorted ascending by activing the column (click or return when focused).
       * Note that the column header is prefixed to this string.
       *  @type string
       *  @default : activate to sort column ascending
       *
       *  @dtopt Language
       *  @name DataTable.defaults.language.aria.sortAscending
       *
       *  @example
       *    $(document).ready( function() {
       *      $('#example').dataTable( {
       *        "language": {
       *          "aria": {
       *            "sortAscending": " - click/return to sort ascending"
       *          }
       *        }
       *      } );
       *    } );
       */
      sSortAscending: ": activate to sort column ascending",
      /**
       * ARIA label that is added to the table headers when the column may be
       * sorted descending by activing the column (click or return when focused).
       * Note that the column header is prefixed to this string.
       *  @type string
       *  @default : activate to sort column ascending
       *
       *  @dtopt Language
       *  @name DataTable.defaults.language.aria.sortDescending
       *
       *  @example
       *    $(document).ready( function() {
       *      $('#example').dataTable( {
       *        "language": {
       *          "aria": {
       *            "sortDescending": " - click/return to sort descending"
       *          }
       *        }
       *      } );
       *    } );
       */
      sSortDescending: ": activate to sort column descending",
    },
    /**
     * Pagination string used by DataTables for the built-in pagination
     * control types.
     *  @namespace
     *  @name DataTable.defaults.language.paginate
     */
    oPaginate: {
      /**
       * Text to use when using the 'full_numbers' type of pagination for the
       * button to take the user to the first page.
       *  @type string
       *  @default First
       *
       *  @dtopt Language
       *  @name DataTable.defaults.language.paginate.first
       *
       *  @example
       *    $(document).ready( function() {
       *      $('#example').dataTable( {
       *        "language": {
       *          "paginate": {
       *            "first": "First page"
       *          }
       *        }
       *      } );
       *    } );
       */
      sFirst: "First",
      /**
       * Text to use when using the 'full_numbers' type of pagination for the
       * button to take the user to the last page.
       *  @type string
       *  @default Last
       *
       *  @dtopt Language
       *  @name DataTable.defaults.language.paginate.last
       *
       *  @example
       *    $(document).ready( function() {
       *      $('#example').dataTable( {
       *        "language": {
       *          "paginate": {
       *            "last": "Last page"
       *          }
       *        }
       *      } );
       *    } );
       */
      sLast: "Last",
      /**
       * Text to use for the 'next' pagination button (to take the user to the
       * next page).
       *  @type string
       *  @default Next
       *
       *  @dtopt Language
       *  @name DataTable.defaults.language.paginate.next
       *
       *  @example
       *    $(document).ready( function() {
       *      $('#example').dataTable( {
       *        "language": {
       *          "paginate": {
       *            "next": "Next page"
       *          }
       *        }
       *      } );
       *    } );
       */
      sNext: "Next",
      /**
       * Text to use for the 'previous' pagination button (to take the user to
       * the previous page).
       *  @type string
       *  @default Previous
       *
       *  @dtopt Language
       *  @name DataTable.defaults.language.paginate.previous
       *
       *  @example
       *    $(document).ready( function() {
       *      $('#example').dataTable( {
       *        "language": {
       *          "paginate": {
       *            "previous": "Previous page"
       *          }
       *        }
       *      } );
       *    } );
       */
      sPrevious: "Previous",
    },
    /**
     * This string is shown in preference to `zeroRecords` when the table is
     * empty of data (regardless of filtering). Note that this is an optional
     * parameter - if it is not given, the value of `zeroRecords` will be used
     * instead (either the default or given value).
     *  @type string
     *  @default No data available in table
     *
     *  @dtopt Language
     *  @name DataTable.defaults.language.emptyTable
     *
     *  @example
     *    $(document).ready( function() {
     *      $('#example').dataTable( {
     *        "language": {
     *          "emptyTable": "No data available in table"
     *        }
     *      } );
     *    } );
     */
    sEmptyTable: "No data available in table",
    /**
     * This string gives information to the end user about the information
     * that is current on display on the page. The following tokens can be
     * used in the string and will be dynamically replaced as the table
     * display updates. This tokens can be placed anywhere in the string, or
     * removed as needed by the language requires:
     *
     * * `\_START\_` - Display index of the first record on the current page
     * * `\_END\_` - Display index of the last record on the current page
     * * `\_TOTAL\_` - Number of records in the table after filtering
     * * `\_MAX\_` - Number of records in the table without filtering
     * * `\_PAGE\_` - Current page number
     * * `\_PAGES\_` - Total number of pages of data in the table
     *
     *  @type string
     *  @default Showing _START_ to _END_ of _TOTAL_ entries
     *
     *  @dtopt Language
     *  @name DataTable.defaults.language.info
     *
     *  @example
     *    $(document).ready( function() {
     *      $('#example').dataTable( {
     *        "language": {
     *          "info": "Showing page _PAGE_ of _PAGES_"
     *        }
     *      } );
     *    } );
     */
    sInfo: "Showing _START_ to _END_ of _TOTAL_ entries",
    /**
     * Display information string for when the table is empty. Typically the
     * format of this string should match `info`.
     *  @type string
     *  @default Showing 0 to 0 of 0 entries
     *
     *  @dtopt Language
     *  @name DataTable.defaults.language.infoEmpty
     *
     *  @example
     *    $(document).ready( function() {
     *      $('#example').dataTable( {
     *        "language": {
     *          "infoEmpty": "No entries to show"
     *        }
     *      } );
     *    } );
     */
    sInfoEmpty: "Showing 0 to 0 of 0 entries",
    /**
     * When a user filters the information in a table, this string is appended
     * to the information (`info`) to give an idea of how strong the filtering
     * is. The variable _MAX_ is dynamically updated.
     *  @type string
     *  @default (filtered from _MAX_ total entries)
     *
     *  @dtopt Language
     *  @name DataTable.defaults.language.infoFiltered
     *
     *  @example
     *    $(document).ready( function() {
     *      $('#example').dataTable( {
     *        "language": {
     *          "infoFiltered": " - filtering from _MAX_ records"
     *        }
     *      } );
     *    } );
     */
    sInfoFiltered: "(filtered from _MAX_ total entries)",
    /**
     * If can be useful to append extra information to the info string at times,
     * and this variable does exactly that. This information will be appended to
     * the `info` (`infoEmpty` and `infoFiltered` in whatever combination they are
     * being used) at all times.
     *  @type string
     *  @default <i>Empty string</i>
     *
     *  @dtopt Language
     *  @name DataTable.defaults.language.infoPostFix
     *
     *  @example
     *    $(document).ready( function() {
     *      $('#example').dataTable( {
     *        "language": {
     *          "infoPostFix": "All records shown are derived from real information."
     *        }
     *      } );
     *    } );
     */
    sInfoPostFix: "",
    /**
     * This decimal place operator is a little different from the other
     * language options since DataTables doesn't output floating point
     * numbers, so it won't ever use this for display of a number. Rather,
     * what this parameter does is modify the sort methods of the table so
     * that numbers which are in a format which has a character other than
     * a period (`.`) as a decimal place will be sorted numerically.
     *
     * Note that numbers with different decimal places cannot be shown in
     * the same table and still be sortable, the table must be consistent.
     * However, multiple different tables on the page can use different
     * decimal place characters.
     *  @type string
     *  @default
     *
     *  @dtopt Language
     *  @name DataTable.defaults.language.decimal
     *
     *  @example
     *    $(document).ready( function() {
     *      $('#example').dataTable( {
     *        "language": {
     *          "decimal": ","
     *          "thousands": "."
     *        }
     *      } );
     *    } );
     */
    sDecimal: "",
    /**
     * DataTables has a build in number formatter (`formatNumber`) which is
     * used to format large numbers that are used in the table information.
     * By default a comma is used, but this can be trivially changed to any
     * character you wish with this parameter.
     *  @type string
     *  @default ,
     *
     *  @dtopt Language
     *  @name DataTable.defaults.language.thousands
     *
     *  @example
     *    $(document).ready( function() {
     *      $('#example').dataTable( {
     *        "language": {
     *          "thousands": "'"
     *        }
     *      } );
     *    } );
     */
    sThousands: ",",
    /**
     * Detail the action that will be taken when the drop down menu for the
     * pagination length option is changed. The '_MENU_' variable is replaced
     * with a default select list of 10, 25, 50 and 100, and can be replaced
     * with a custom select box if required.
     *  @type string
     *  @default Show _MENU_ entries
     *
     *  @dtopt Language
     *  @name DataTable.defaults.language.lengthMenu
     *
     *  @example
     *    // Language change only
     *    $(document).ready( function() {
     *      $('#example').dataTable( {
     *        "language": {
     *          "lengthMenu": "Display _MENU_ records"
     *        }
     *      } );
     *    } );
     *
     *  @example
     *    // Language and options change
     *    $(document).ready( function() {
     *      $('#example').dataTable( {
     *        "language": {
     *          "lengthMenu": 'Display <select>'+
     *            '<option value="10">10</option>'+
     *            '<option value="20">20</option>'+
     *            '<option value="30">30</option>'+
     *            '<option value="40">40</option>'+
     *            '<option value="50">50</option>'+
     *            '<option value="-1">All</option>'+
     *            '</select> records'
     *        }
     *      } );
     *    } );
     */
    sLengthMenu: "Show _MENU_ entries",
    /**
     * When using Ajax sourced data and during the first draw when DataTables is
     * gathering the data, this message is shown in an empty row in the table to
     * indicate to the end user the the data is being loaded. Note that this
     * parameter is not used when loading data by server-side processing, just
     * Ajax sourced data with client-side processing.
     *  @type string
     *  @default Loading...
     *
     *  @dtopt Language
     *  @name DataTable.defaults.language.loadingRecords
     *
     *  @example
     *    $(document).ready( function() {
     *      $('#example').dataTable( {
     *        "language": {
     *          "loadingRecords": "Please wait - loading..."
     *        }
     *      } );
     *    } );
     */
    sLoadingRecords: "Loading...",
    /**
     * Text which is displayed when the table is processing a user action
     * (usually a sort command or similar).
     *  @type string
     *
     *  @dtopt Language
     *  @name DataTable.defaults.language.processing
     *
     *  @example
     *    $(document).ready( function() {
     *      $('#example').dataTable( {
     *        "language": {
     *          "processing": "DataTables is currently busy"
     *        }
     *      } );
     *    } );
     */
    sProcessing: "",
    /**
     * Details the actions that will be taken when the user types into the
     * filtering input text box. The variable "_INPUT_", if used in the string,
     * is replaced with the HTML text box for the filtering input allowing
     * control over where it appears in the string. If "_INPUT_" is not given
     * then the input box is appended to the string automatically.
     *  @type string
     *  @default Search:
     *
     *  @dtopt Language
     *  @name DataTable.defaults.language.search
     *
     *  @example
     *    // Input text box will be appended at the end automatically
     *    $(document).ready( function() {
     *      $('#example').dataTable( {
     *        "language": {
     *          "search": "Filter records:"
     *        }
     *      } );
     *    } );
     *
     *  @example
     *    // Specify where the filter should appear
     *    $(document).ready( function() {
     *      $('#example').dataTable( {
     *        "language": {
     *          "search": "Apply filter _INPUT_ to table"
     *        }
     *      } );
     *    } );
     */
    sSearch: "Search:",
    /**
     * Assign a `placeholder` attribute to the search `input` element
     *  @type string
     *  @default
     *
     *  @dtopt Language
     *  @name DataTable.defaults.language.searchPlaceholder
     */
    sSearchPlaceholder: "",
    /**
     * All of the language information can be stored in a file on the
     * server-side, which DataTables will look up if this parameter is passed.
     * It must store the URL of the language file, which is in a JSON format,
     * and the object has the same properties as the oLanguage object in the
     * initialiser object (i.e. the above parameters). Please refer to one of
     * the example language files to see how this works in action.
     *  @type string
     *  @default <i>Empty string - i.e. disabled</i>
     *
     *  @dtopt Language
     *  @name DataTable.defaults.language.url
     *
     *  @example
     *    $(document).ready( function() {
     *      $('#example').dataTable( {
     *        "language": {
     *          "url": "http://www.sprymedia.co.uk/dataTables/lang.txt"
     *        }
     *      } );
     *    } );
     */
    sUrl: "",
    /**
     * Text shown inside the table records when the is no information to be
     * displayed after filtering. `emptyTable` is shown when there is simply no
     * information in the table at all (regardless of filtering).
     *  @type string
     *  @default No matching records found
     *
     *  @dtopt Language
     *  @name DataTable.defaults.language.zeroRecords
     *
     *  @example
     *    $(document).ready( function() {
     *      $('#example').dataTable( {
     *        "language": {
     *          "zeroRecords": "No records to display"
     *        }
     *      } );
     *    } );
     */
    sZeroRecords: "No matching records found",
  },
  /**
   * This parameter allows you to have define the global filtering state at
   * initialisation time. As an object the `search` parameter must be
   * defined, but all other parameters are optional. When `regex` is true,
   * the search string will be treated as a regular expression, when false
   * (default) it will be treated as a straight string. When `smart`
   * DataTables will use it's smart filtering methods (to word match at
   * any point in the data), when false this will not be done.
   *  @namespace
   *  @extends DataTable.models.oSearch
   *
   *  @dtopt Options
   *  @name DataTable.defaults.search
   *
   *  @example
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "search": {"search": "Initial search"}
   *      } );
   *    } )
   */
  oSearch: u.extend({}, _.models.oSearch),
  /**
   * __Deprecated__ The functionality provided by this parameter has now been
   * superseded by that provided through `ajax`, which should be used instead.
   *
   * By default DataTables will look for the property `data` (or `aaData` for
   * compatibility with DataTables 1.9-) when obtaining data from an Ajax
   * source or for server-side processing - this parameter allows that
   * property to be changed. You can use Javascript dotted object notation to
   * get a data source for multiple levels of nesting.
   *  @type string
   *  @default data
   *
   *  @dtopt Options
   *  @dtopt Server-side
   *  @name DataTable.defaults.ajaxDataProp
   *
   *  @deprecated 1.10. Please use `ajax` for this functionality now.
   */
  sAjaxDataProp: "data",
  /**
   * __Deprecated__ The functionality provided by this parameter has now been
   * superseded by that provided through `ajax`, which should be used instead.
   *
   * You can instruct DataTables to load data from an external
   * source using this parameter (use aData if you want to pass data in you
   * already have). Simply provide a url a JSON object can be obtained from.
   *  @type string
   *  @default null
   *
   *  @dtopt Options
   *  @dtopt Server-side
   *  @name DataTable.defaults.ajaxSource
   *
   *  @deprecated 1.10. Please use `ajax` for this functionality now.
   */
  sAjaxSource: null,
  /**
   * This initialisation variable allows you to specify exactly where in the
   * DOM you want DataTables to inject the various controls it adds to the page
   * (for example you might want the pagination controls at the top of the
   * table). DIV elements (with or without a custom class) can also be added to
   * aid styling. The follow syntax is used:
   *   <ul>
   *     <li>The following options are allowed:
   *       <ul>
   *         <li>'l' - Length changing</li>
   *         <li>'f' - Filtering input</li>
   *         <li>'t' - The table!</li>
   *         <li>'i' - Information</li>
   *         <li>'p' - Pagination</li>
   *         <li>'r' - pRocessing</li>
   *       </ul>
   *     </li>
   *     <li>The following constants are allowed:
   *       <ul>
   *         <li>'H' - jQueryUI theme "header" classes ('fg-toolbar ui-widget-header ui-corner-tl ui-corner-tr ui-helper-clearfix')</li>
   *         <li>'F' - jQueryUI theme "footer" classes ('fg-toolbar ui-widget-header ui-corner-bl ui-corner-br ui-helper-clearfix')</li>
   *       </ul>
   *     </li>
   *     <li>The following syntax is expected:
   *       <ul>
   *         <li>'&lt;' and '&gt;' - div elements</li>
   *         <li>'&lt;"class" and '&gt;' - div with a class</li>
   *         <li>'&lt;"#id" and '&gt;' - div with an ID</li>
   *       </ul>
   *     </li>
   *     <li>Examples:
   *       <ul>
   *         <li>'&lt;"wrapper"flipt&gt;'</li>
   *         <li>'&lt;lf&lt;t&gt;ip&gt;'</li>
   *       </ul>
   *     </li>
   *   </ul>
   *  @type string
   *  @default lfrtip <i>(when `jQueryUI` is false)</i> <b>or</b>
   *    <"H"lfr>t<"F"ip> <i>(when `jQueryUI` is true)</i>
   *
   *  @dtopt Options
   *  @name DataTable.defaults.dom
   *
   *  @example
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "dom": '&lt;"top"i&gt;rt&lt;"bottom"flp&gt;&lt;"clear"&gt;'
   *      } );
   *    } );
   */
  sDom: "lfrtip",
  /**
   * Search delay option. This will throttle full table searches that use the
   * DataTables provided search input element (it does not effect calls to
   * `dt-api search()`, providing a delay before the search is made.
   *  @type integer
   *  @default 0
   *
   *  @dtopt Options
   *  @name DataTable.defaults.searchDelay
   *
   *  @example
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "searchDelay": 200
   *      } );
   *    } )
   */
  searchDelay: null,
  /**
   * DataTables features six different built-in options for the buttons to
   * display for pagination control:
   *
   * * `numbers` - Page number buttons only
   * * `simple` - 'Previous' and 'Next' buttons only
   * * 'simple_numbers` - 'Previous' and 'Next' buttons, plus page numbers
   * * `full` - 'First', 'Previous', 'Next' and 'Last' buttons
   * * `full_numbers` - 'First', 'Previous', 'Next' and 'Last' buttons, plus page numbers
   * * `first_last_numbers` - 'First' and 'Last' buttons, plus page numbers
   *
   * Further methods can be added using {@link DataTable.ext.oPagination}.
   *  @type string
   *  @default simple_numbers
   *
   *  @dtopt Options
   *  @name DataTable.defaults.pagingType
   *
   *  @example
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "pagingType": "full_numbers"
   *      } );
   *    } )
   */
  sPaginationType: "simple_numbers",
  /**
   * Enable horizontal scrolling. When a table is too wide to fit into a
   * certain layout, or you have a large number of columns in the table, you
   * can enable x-scrolling to show the table in a viewport, which can be
   * scrolled. This property can be `true` which will allow the table to
   * scroll horizontally when needed, or any CSS unit, or a number (in which
   * case it will be treated as a pixel measurement). Setting as simply `true`
   * is recommended.
   *  @type boolean|string
   *  @default <i>blank string - i.e. disabled</i>
   *
   *  @dtopt Features
   *  @name DataTable.defaults.scrollX
   *
   *  @example
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "scrollX": true,
   *        "scrollCollapse": true
   *      } );
   *    } );
   */
  sScrollX: "",
  /**
   * This property can be used to force a DataTable to use more width than it
   * might otherwise do when x-scrolling is enabled. For example if you have a
   * table which requires to be well spaced, this parameter is useful for
   * "over-sizing" the table, and thus forcing scrolling. This property can by
   * any CSS unit, or a number (in which case it will be treated as a pixel
   * measurement).
   *  @type string
   *  @default <i>blank string - i.e. disabled</i>
   *
   *  @dtopt Options
   *  @name DataTable.defaults.scrollXInner
   *
   *  @example
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "scrollX": "100%",
   *        "scrollXInner": "110%"
   *      } );
   *    } );
   */
  sScrollXInner: "",
  /**
   * Enable vertical scrolling. Vertical scrolling will constrain the DataTable
   * to the given height, and enable scrolling for any data which overflows the
   * current viewport. This can be used as an alternative to paging to display
   * a lot of data in a small area (although paging and scrolling can both be
   * enabled at the same time). This property can be any CSS unit, or a number
   * (in which case it will be treated as a pixel measurement).
   *  @type string
   *  @default <i>blank string - i.e. disabled</i>
   *
   *  @dtopt Features
   *  @name DataTable.defaults.scrollY
   *
   *  @example
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "scrollY": "200px",
   *        "paginate": false
   *      } );
   *    } );
   */
  sScrollY: "",
  /**
   * __Deprecated__ The functionality provided by this parameter has now been
   * superseded by that provided through `ajax`, which should be used instead.
   *
   * Set the HTTP method that is used to make the Ajax call for server-side
   * processing or Ajax sourced data.
   *  @type string
   *  @default GET
   *
   *  @dtopt Options
   *  @dtopt Server-side
   *  @name DataTable.defaults.serverMethod
   *
   *  @deprecated 1.10. Please use `ajax` for this functionality now.
   */
  sServerMethod: "GET",
  /**
   * DataTables makes use of renderers when displaying HTML elements for
   * a table. These renderers can be added or modified by plug-ins to
   * generate suitable mark-up for a site. For example the Bootstrap
   * integration plug-in for DataTables uses a paging button renderer to
   * display pagination buttons in the mark-up required by Bootstrap.
   *
   * For further information about the renderers available see
   * DataTable.ext.renderer
   *  @type string|object
   *  @default null
   *
   *  @name DataTable.defaults.renderer
   *
   */
  renderer: null,
  /**
   * Set the data property name that DataTables should use to get a row's id
   * to set as the `id` property in the node.
   *  @type string
   *  @default DT_RowId
   *
   *  @name DataTable.defaults.rowId
   */
  rowId: "DT_RowId",
};
we(_.defaults);
_.defaults.column = {
  /**
   * Define which column(s) an order will occur on for this column. This
   * allows a column's ordering to take multiple columns into account when
   * doing a sort or use the data from a different column. For example first
   * name / last name columns make sense to do a multi-column sort over the
   * two columns.
   *  @type array|int
   *  @default null <i>Takes the value of the column index automatically</i>
   *
   *  @name DataTable.defaults.column.orderData
   *  @dtopt Columns
   *
   *  @example
   *    // Using `columnDefs`
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "columnDefs": [
   *          { "orderData": [ 0, 1 ], "targets": [ 0 ] },
   *          { "orderData": [ 1, 0 ], "targets": [ 1 ] },
   *          { "orderData": 2, "targets": [ 2 ] }
   *        ]
   *      } );
   *    } );
   *
   *  @example
   *    // Using `columns`
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "columns": [
   *          { "orderData": [ 0, 1 ] },
   *          { "orderData": [ 1, 0 ] },
   *          { "orderData": 2 },
   *          null,
   *          null
   *        ]
   *      } );
   *    } );
   */
  aDataSort: null,
  iDataSort: -1,
  /**
   * You can control the default ordering direction, and even alter the
   * behaviour of the sort handler (i.e. only allow ascending ordering etc)
   * using this parameter.
   *  @type array
   *  @default [ 'asc', 'desc' ]
   *
   *  @name DataTable.defaults.column.orderSequence
   *  @dtopt Columns
   *
   *  @example
   *    // Using `columnDefs`
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "columnDefs": [
   *          { "orderSequence": [ "asc" ], "targets": [ 1 ] },
   *          { "orderSequence": [ "desc", "asc", "asc" ], "targets": [ 2 ] },
   *          { "orderSequence": [ "desc" ], "targets": [ 3 ] }
   *        ]
   *      } );
   *    } );
   *
   *  @example
   *    // Using `columns`
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "columns": [
   *          null,
   *          { "orderSequence": [ "asc" ] },
   *          { "orderSequence": [ "desc", "asc", "asc" ] },
   *          { "orderSequence": [ "desc" ] },
   *          null
   *        ]
   *      } );
   *    } );
   */
  asSorting: ["asc", "desc"],
  /**
   * Enable or disable filtering on the data in this column.
   *  @type boolean
   *  @default true
   *
   *  @name DataTable.defaults.column.searchable
   *  @dtopt Columns
   *
   *  @example
   *    // Using `columnDefs`
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "columnDefs": [
   *          { "searchable": false, "targets": [ 0 ] }
   *        ] } );
   *    } );
   *
   *  @example
   *    // Using `columns`
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "columns": [
   *          { "searchable": false },
   *          null,
   *          null,
   *          null,
   *          null
   *        ] } );
   *    } );
   */
  bSearchable: !0,
  /**
   * Enable or disable ordering on this column.
   *  @type boolean
   *  @default true
   *
   *  @name DataTable.defaults.column.orderable
   *  @dtopt Columns
   *
   *  @example
   *    // Using `columnDefs`
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "columnDefs": [
   *          { "orderable": false, "targets": [ 0 ] }
   *        ] } );
   *    } );
   *
   *  @example
   *    // Using `columns`
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "columns": [
   *          { "orderable": false },
   *          null,
   *          null,
   *          null,
   *          null
   *        ] } );
   *    } );
   */
  bSortable: !0,
  /**
   * Enable or disable the display of this column.
   *  @type boolean
   *  @default true
   *
   *  @name DataTable.defaults.column.visible
   *  @dtopt Columns
   *
   *  @example
   *    // Using `columnDefs`
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "columnDefs": [
   *          { "visible": false, "targets": [ 0 ] }
   *        ] } );
   *    } );
   *
   *  @example
   *    // Using `columns`
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "columns": [
   *          { "visible": false },
   *          null,
   *          null,
   *          null,
   *          null
   *        ] } );
   *    } );
   */
  bVisible: !0,
  /**
   * Developer definable function that is called whenever a cell is created (Ajax source,
   * etc) or processed for input (DOM source). This can be used as a compliment to mRender
   * allowing you to modify the DOM element (add background colour for example) when the
   * element is available.
   *  @type function
   *  @param {element} td The TD node that has been created
   *  @param {*} cellData The Data for the cell
   *  @param {array|object} rowData The data for the whole row
   *  @param {int} row The row index for the aoData data store
   *  @param {int} col The column index for aoColumns
   *
   *  @name DataTable.defaults.column.createdCell
   *  @dtopt Columns
   *
   *  @example
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "columnDefs": [ {
   *          "targets": [3],
   *          "createdCell": function (td, cellData, rowData, row, col) {
   *            if ( cellData == "1.7" ) {
   *              $(td).css('color', 'blue')
   *            }
   *          }
   *        } ]
   *      });
   *    } );
   */
  fnCreatedCell: null,
  /**
   * This parameter has been replaced by `data` in DataTables to ensure naming
   * consistency. `dataProp` can still be used, as there is backwards
   * compatibility in DataTables for this option, but it is strongly
   * recommended that you use `data` in preference to `dataProp`.
   *  @name DataTable.defaults.column.dataProp
   */
  /**
   * This property can be used to read data from any data source property,
   * including deeply nested objects / properties. `data` can be given in a
   * number of different ways which effect its behaviour:
   *
   * * `integer` - treated as an array index for the data source. This is the
   *   default that DataTables uses (incrementally increased for each column).
   * * `string` - read an object property from the data source. There are
   *   three 'special' options that can be used in the string to alter how
   *   DataTables reads the data from the source object:
   *    * `.` - Dotted Javascript notation. Just as you use a `.` in
   *      Javascript to read from nested objects, so to can the options
   *      specified in `data`. For example: `browser.version` or
   *      `browser.name`. If your object parameter name contains a period, use
   *      `\\` to escape it - i.e. `first\\.name`.
   *    * `[]` - Array notation. DataTables can automatically combine data
   *      from and array source, joining the data with the characters provided
   *      between the two brackets. For example: `name[, ]` would provide a
   *      comma-space separated list from the source array. If no characters
   *      are provided between the brackets, the original array source is
   *      returned.
   *    * `()` - Function notation. Adding `()` to the end of a parameter will
   *      execute a function of the name given. For example: `browser()` for a
   *      simple function on the data source, `browser.version()` for a
   *      function in a nested property or even `browser().version` to get an
   *      object property if the function called returns an object. Note that
   *      function notation is recommended for use in `render` rather than
   *      `data` as it is much simpler to use as a renderer.
   * * `null` - use the original data source for the row rather than plucking
   *   data directly from it. This action has effects on two other
   *   initialisation options:
   *    * `defaultContent` - When null is given as the `data` option and
   *      `defaultContent` is specified for the column, the value defined by
   *      `defaultContent` will be used for the cell.
   *    * `render` - When null is used for the `data` option and the `render`
   *      option is specified for the column, the whole data source for the
   *      row is used for the renderer.
   * * `function` - the function given will be executed whenever DataTables
   *   needs to set or get the data for a cell in the column. The function
   *   takes three parameters:
   *    * Parameters:
   *      * `{array|object}` The data source for the row
   *      * `{string}` The type call data requested - this will be 'set' when
   *        setting data or 'filter', 'display', 'type', 'sort' or undefined
   *        when gathering data. Note that when `undefined` is given for the
   *        type DataTables expects to get the raw data for the object back<
   *      * `{*}` Data to set when the second parameter is 'set'.
   *    * Return:
   *      * The return value from the function is not required when 'set' is
   *        the type of call, but otherwise the return is what will be used
   *        for the data requested.
   *
   * Note that `data` is a getter and setter option. If you just require
   * formatting of data for output, you will likely want to use `render` which
   * is simply a getter and thus simpler to use.
   *
   * Note that prior to DataTables 1.9.2 `data` was called `mDataProp`. The
   * name change reflects the flexibility of this property and is consistent
   * with the naming of mRender. If 'mDataProp' is given, then it will still
   * be used by DataTables, as it automatically maps the old name to the new
   * if required.
   *
   *  @type string|int|function|null
   *  @default null <i>Use automatically calculated column index</i>
   *
   *  @name DataTable.defaults.column.data
   *  @dtopt Columns
   *
   *  @example
   *    // Read table data from objects
   *    // JSON structure for each row:
   *    //   {
   *    //      "engine": {value},
   *    //      "browser": {value},
   *    //      "platform": {value},
   *    //      "version": {value},
   *    //      "grade": {value}
   *    //   }
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "ajaxSource": "sources/objects.txt",
   *        "columns": [
   *          { "data": "engine" },
   *          { "data": "browser" },
   *          { "data": "platform" },
   *          { "data": "version" },
   *          { "data": "grade" }
   *        ]
   *      } );
   *    } );
   *
   *  @example
   *    // Read information from deeply nested objects
   *    // JSON structure for each row:
   *    //   {
   *    //      "engine": {value},
   *    //      "browser": {value},
   *    //      "platform": {
   *    //         "inner": {value}
   *    //      },
   *    //      "details": [
   *    //         {value}, {value}
   *    //      ]
   *    //   }
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "ajaxSource": "sources/deep.txt",
   *        "columns": [
   *          { "data": "engine" },
   *          { "data": "browser" },
   *          { "data": "platform.inner" },
   *          { "data": "details.0" },
   *          { "data": "details.1" }
   *        ]
   *      } );
   *    } );
   *
   *  @example
   *    // Using `data` as a function to provide different information for
   *    // sorting, filtering and display. In this case, currency (price)
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "columnDefs": [ {
   *          "targets": [ 0 ],
   *          "data": function ( source, type, val ) {
   *            if (type === 'set') {
   *              source.price = val;
   *              // Store the computed display and filter values for efficiency
   *              source.price_display = val=="" ? "" : "$"+numberFormat(val);
   *              source.price_filter  = val=="" ? "" : "$"+numberFormat(val)+" "+val;
   *              return;
   *            }
   *            else if (type === 'display') {
   *              return source.price_display;
   *            }
   *            else if (type === 'filter') {
   *              return source.price_filter;
   *            }
   *            // 'sort', 'type' and undefined all just use the integer
   *            return source.price;
   *          }
   *        } ]
   *      } );
   *    } );
   *
   *  @example
   *    // Using default content
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "columnDefs": [ {
   *          "targets": [ 0 ],
   *          "data": null,
   *          "defaultContent": "Click to edit"
   *        } ]
   *      } );
   *    } );
   *
   *  @example
   *    // Using array notation - outputting a list from an array
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "columnDefs": [ {
   *          "targets": [ 0 ],
   *          "data": "name[, ]"
   *        } ]
   *      } );
   *    } );
   *
   */
  mData: null,
  /**
   * This property is the rendering partner to `data` and it is suggested that
   * when you want to manipulate data for display (including filtering,
   * sorting etc) without altering the underlying data for the table, use this
   * property. `render` can be considered to be the the read only companion to
   * `data` which is read / write (then as such more complex). Like `data`
   * this option can be given in a number of different ways to effect its
   * behaviour:
   *
   * * `integer` - treated as an array index for the data source. This is the
   *   default that DataTables uses (incrementally increased for each column).
   * * `string` - read an object property from the data source. There are
   *   three 'special' options that can be used in the string to alter how
   *   DataTables reads the data from the source object:
   *    * `.` - Dotted Javascript notation. Just as you use a `.` in
   *      Javascript to read from nested objects, so to can the options
   *      specified in `data`. For example: `browser.version` or
   *      `browser.name`. If your object parameter name contains a period, use
   *      `\\` to escape it - i.e. `first\\.name`.
   *    * `[]` - Array notation. DataTables can automatically combine data
   *      from and array source, joining the data with the characters provided
   *      between the two brackets. For example: `name[, ]` would provide a
   *      comma-space separated list from the source array. If no characters
   *      are provided between the brackets, the original array source is
   *      returned.
   *    * `()` - Function notation. Adding `()` to the end of a parameter will
   *      execute a function of the name given. For example: `browser()` for a
   *      simple function on the data source, `browser.version()` for a
   *      function in a nested property or even `browser().version` to get an
   *      object property if the function called returns an object.
   * * `object` - use different data for the different data types requested by
   *   DataTables ('filter', 'display', 'type' or 'sort'). The property names
   *   of the object is the data type the property refers to and the value can
   *   defined using an integer, string or function using the same rules as
   *   `render` normally does. Note that an `_` option _must_ be specified.
   *   This is the default value to use if you haven't specified a value for
   *   the data type requested by DataTables.
   * * `function` - the function given will be executed whenever DataTables
   *   needs to set or get the data for a cell in the column. The function
   *   takes three parameters:
   *    * Parameters:
   *      * {array|object} The data source for the row (based on `data`)
   *      * {string} The type call data requested - this will be 'filter',
   *        'display', 'type' or 'sort'.
   *      * {array|object} The full data source for the row (not based on
   *        `data`)
   *    * Return:
   *      * The return value from the function is what will be used for the
   *        data requested.
   *
   *  @type string|int|function|object|null
   *  @default null Use the data source value.
   *
   *  @name DataTable.defaults.column.render
   *  @dtopt Columns
   *
   *  @example
   *    // Create a comma separated list from an array of objects
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "ajaxSource": "sources/deep.txt",
   *        "columns": [
   *          { "data": "engine" },
   *          { "data": "browser" },
   *          {
   *            "data": "platform",
   *            "render": "[, ].name"
   *          }
   *        ]
   *      } );
   *    } );
   *
   *  @example
   *    // Execute a function to obtain data
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "columnDefs": [ {
   *          "targets": [ 0 ],
   *          "data": null, // Use the full data source object for the renderer's source
   *          "render": "browserName()"
   *        } ]
   *      } );
   *    } );
   *
   *  @example
   *    // As an object, extracting different data for the different types
   *    // This would be used with a data source such as:
   *    //   { "phone": 5552368, "phone_filter": "5552368 555-2368", "phone_display": "555-2368" }
   *    // Here the `phone` integer is used for sorting and type detection, while `phone_filter`
   *    // (which has both forms) is used for filtering for if a user inputs either format, while
   *    // the formatted phone number is the one that is shown in the table.
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "columnDefs": [ {
   *          "targets": [ 0 ],
   *          "data": null, // Use the full data source object for the renderer's source
   *          "render": {
   *            "_": "phone",
   *            "filter": "phone_filter",
   *            "display": "phone_display"
   *          }
   *        } ]
   *      } );
   *    } );
   *
   *  @example
   *    // Use as a function to create a link from the data source
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "columnDefs": [ {
   *          "targets": [ 0 ],
   *          "data": "download_link",
   *          "render": function ( data, type, full ) {
   *            return '<a href="'+data+'">Download</a>';
   *          }
   *        } ]
   *      } );
   *    } );
   */
  mRender: null,
  /**
   * Change the cell type created for the column - either TD cells or TH cells. This
   * can be useful as TH cells have semantic meaning in the table body, allowing them
   * to act as a header for a row (you may wish to add scope='row' to the TH elements).
   *  @type string
   *  @default td
   *
   *  @name DataTable.defaults.column.cellType
   *  @dtopt Columns
   *
   *  @example
   *    // Make the first column use TH cells
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "columnDefs": [ {
   *          "targets": [ 0 ],
   *          "cellType": "th"
   *        } ]
   *      } );
   *    } );
   */
  sCellType: "td",
  /**
   * Class to give to each cell in this column.
   *  @type string
   *  @default <i>Empty string</i>
   *
   *  @name DataTable.defaults.column.class
   *  @dtopt Columns
   *
   *  @example
   *    // Using `columnDefs`
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "columnDefs": [
   *          { "class": "my_class", "targets": [ 0 ] }
   *        ]
   *      } );
   *    } );
   *
   *  @example
   *    // Using `columns`
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "columns": [
   *          { "class": "my_class" },
   *          null,
   *          null,
   *          null,
   *          null
   *        ]
   *      } );
   *    } );
   */
  sClass: "",
  /**
   * When DataTables calculates the column widths to assign to each column,
   * it finds the longest string in each column and then constructs a
   * temporary table and reads the widths from that. The problem with this
   * is that "mmm" is much wider then "iiii", but the latter is a longer
   * string - thus the calculation can go wrong (doing it properly and putting
   * it into an DOM object and measuring that is horribly(!) slow). Thus as
   * a "work around" we provide this option. It will append its value to the
   * text that is found to be the longest string for the column - i.e. padding.
   * Generally you shouldn't need this!
   *  @type string
   *  @default <i>Empty string<i>
   *
   *  @name DataTable.defaults.column.contentPadding
   *  @dtopt Columns
   *
   *  @example
   *    // Using `columns`
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "columns": [
   *          null,
   *          null,
   *          null,
   *          {
   *            "contentPadding": "mmm"
   *          }
   *        ]
   *      } );
   *    } );
   */
  sContentPadding: "",
  /**
   * Allows a default value to be given for a column's data, and will be used
   * whenever a null data source is encountered (this can be because `data`
   * is set to null, or because the data source itself is null).
   *  @type string
   *  @default null
   *
   *  @name DataTable.defaults.column.defaultContent
   *  @dtopt Columns
   *
   *  @example
   *    // Using `columnDefs`
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "columnDefs": [
   *          {
   *            "data": null,
   *            "defaultContent": "Edit",
   *            "targets": [ -1 ]
   *          }
   *        ]
   *      } );
   *    } );
   *
   *  @example
   *    // Using `columns`
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "columns": [
   *          null,
   *          null,
   *          null,
   *          {
   *            "data": null,
   *            "defaultContent": "Edit"
   *          }
   *        ]
   *      } );
   *    } );
   */
  sDefaultContent: null,
  /**
   * This parameter is only used in DataTables' server-side processing. It can
   * be exceptionally useful to know what columns are being displayed on the
   * client side, and to map these to database fields. When defined, the names
   * also allow DataTables to reorder information from the server if it comes
   * back in an unexpected order (i.e. if you switch your columns around on the
   * client-side, your server-side code does not also need updating).
   *  @type string
   *  @default <i>Empty string</i>
   *
   *  @name DataTable.defaults.column.name
   *  @dtopt Columns
   *
   *  @example
   *    // Using `columnDefs`
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "columnDefs": [
   *          { "name": "engine", "targets": [ 0 ] },
   *          { "name": "browser", "targets": [ 1 ] },
   *          { "name": "platform", "targets": [ 2 ] },
   *          { "name": "version", "targets": [ 3 ] },
   *          { "name": "grade", "targets": [ 4 ] }
   *        ]
   *      } );
   *    } );
   *
   *  @example
   *    // Using `columns`
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "columns": [
   *          { "name": "engine" },
   *          { "name": "browser" },
   *          { "name": "platform" },
   *          { "name": "version" },
   *          { "name": "grade" }
   *        ]
   *      } );
   *    } );
   */
  sName: "",
  /**
   * Defines a data source type for the ordering which can be used to read
   * real-time information from the table (updating the internally cached
   * version) prior to ordering. This allows ordering to occur on user
   * editable elements such as form inputs.
   *  @type string
   *  @default std
   *
   *  @name DataTable.defaults.column.orderDataType
   *  @dtopt Columns
   *
   *  @example
   *    // Using `columnDefs`
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "columnDefs": [
   *          { "orderDataType": "dom-text", "targets": [ 2, 3 ] },
   *          { "type": "numeric", "targets": [ 3 ] },
   *          { "orderDataType": "dom-select", "targets": [ 4 ] },
   *          { "orderDataType": "dom-checkbox", "targets": [ 5 ] }
   *        ]
   *      } );
   *    } );
   *
   *  @example
   *    // Using `columns`
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "columns": [
   *          null,
   *          null,
   *          { "orderDataType": "dom-text" },
   *          { "orderDataType": "dom-text", "type": "numeric" },
   *          { "orderDataType": "dom-select" },
   *          { "orderDataType": "dom-checkbox" }
   *        ]
   *      } );
   *    } );
   */
  sSortDataType: "std",
  /**
   * The title of this column.
   *  @type string
   *  @default null <i>Derived from the 'TH' value for this column in the
   *    original HTML table.</i>
   *
   *  @name DataTable.defaults.column.title
   *  @dtopt Columns
   *
   *  @example
   *    // Using `columnDefs`
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "columnDefs": [
   *          { "title": "My column title", "targets": [ 0 ] }
   *        ]
   *      } );
   *    } );
   *
   *  @example
   *    // Using `columns`
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "columns": [
   *          { "title": "My column title" },
   *          null,
   *          null,
   *          null,
   *          null
   *        ]
   *      } );
   *    } );
   */
  sTitle: null,
  /**
   * The type allows you to specify how the data for this column will be
   * ordered. Four types (string, numeric, date and html (which will strip
   * HTML tags before ordering)) are currently available. Note that only date
   * formats understood by Javascript's Date() object will be accepted as type
   * date. For example: "Mar 26, 2008 5:03 PM". May take the values: 'string',
   * 'numeric', 'date' or 'html' (by default). Further types can be adding
   * through plug-ins.
   *  @type string
   *  @default null <i>Auto-detected from raw data</i>
   *
   *  @name DataTable.defaults.column.type
   *  @dtopt Columns
   *
   *  @example
   *    // Using `columnDefs`
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "columnDefs": [
   *          { "type": "html", "targets": [ 0 ] }
   *        ]
   *      } );
   *    } );
   *
   *  @example
   *    // Using `columns`
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "columns": [
   *          { "type": "html" },
   *          null,
   *          null,
   *          null,
   *          null
   *        ]
   *      } );
   *    } );
   */
  sType: null,
  /**
   * Defining the width of the column, this parameter may take any CSS value
   * (3em, 20px etc). DataTables applies 'smart' widths to columns which have not
   * been given a specific width through this interface ensuring that the table
   * remains readable.
   *  @type string
   *  @default null <i>Automatic</i>
   *
   *  @name DataTable.defaults.column.width
   *  @dtopt Columns
   *
   *  @example
   *    // Using `columnDefs`
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "columnDefs": [
   *          { "width": "20%", "targets": [ 0 ] }
   *        ]
   *      } );
   *    } );
   *
   *  @example
   *    // Using `columns`
   *    $(document).ready( function() {
   *      $('#example').dataTable( {
   *        "columns": [
   *          { "width": "20%" },
   *          null,
   *          null,
   *          null,
   *          null
   *        ]
   *      } );
   *    } );
   */
  sWidth: null,
};
we(_.defaults.column);
_.models.oSettings = {
  /**
   * Primary features of DataTables and their enablement state.
   *  @namespace
   */
  oFeatures: {
    /**
     * Flag to say if DataTables should automatically try to calculate the
     * optimum table and columns widths (true) or not (false).
     * Note that this parameter will be set by the initialisation routine. To
     * set a default use {@link DataTable.defaults}.
     *  @type boolean
     */
    bAutoWidth: null,
    /**
     * Delay the creation of TR and TD elements until they are actually
     * needed by a driven page draw. This can give a significant speed
     * increase for Ajax source and Javascript source data, but makes no
     * difference at all for DOM and server-side processing tables.
     * Note that this parameter will be set by the initialisation routine. To
     * set a default use {@link DataTable.defaults}.
     *  @type boolean
     */
    bDeferRender: null,
    /**
     * Enable filtering on the table or not. Note that if this is disabled
     * then there is no filtering at all on the table, including fnFilter.
     * To just remove the filtering input use sDom and remove the 'f' option.
     * Note that this parameter will be set by the initialisation routine. To
     * set a default use {@link DataTable.defaults}.
     *  @type boolean
     */
    bFilter: null,
    /**
     * Table information element (the 'Showing x of y records' div) enable
     * flag.
     * Note that this parameter will be set by the initialisation routine. To
     * set a default use {@link DataTable.defaults}.
     *  @type boolean
     */
    bInfo: null,
    /**
     * Present a user control allowing the end user to change the page size
     * when pagination is enabled.
     * Note that this parameter will be set by the initialisation routine. To
     * set a default use {@link DataTable.defaults}.
     *  @type boolean
     */
    bLengthChange: null,
    /**
     * Pagination enabled or not. Note that if this is disabled then length
     * changing must also be disabled.
     * Note that this parameter will be set by the initialisation routine. To
     * set a default use {@link DataTable.defaults}.
     *  @type boolean
     */
    bPaginate: null,
    /**
     * Processing indicator enable flag whenever DataTables is enacting a
     * user request - typically an Ajax request for server-side processing.
     * Note that this parameter will be set by the initialisation routine. To
     * set a default use {@link DataTable.defaults}.
     *  @type boolean
     */
    bProcessing: null,
    /**
     * Server-side processing enabled flag - when enabled DataTables will
     * get all data from the server for every draw - there is no filtering,
     * sorting or paging done on the client-side.
     * Note that this parameter will be set by the initialisation routine. To
     * set a default use {@link DataTable.defaults}.
     *  @type boolean
     */
    bServerSide: null,
    /**
     * Sorting enablement flag.
     * Note that this parameter will be set by the initialisation routine. To
     * set a default use {@link DataTable.defaults}.
     *  @type boolean
     */
    bSort: null,
    /**
     * Multi-column sorting
     * Note that this parameter will be set by the initialisation routine. To
     * set a default use {@link DataTable.defaults}.
     *  @type boolean
     */
    bSortMulti: null,
    /**
     * Apply a class to the columns which are being sorted to provide a
     * visual highlight or not. This can slow things down when enabled since
     * there is a lot of DOM interaction.
     * Note that this parameter will be set by the initialisation routine. To
     * set a default use {@link DataTable.defaults}.
     *  @type boolean
     */
    bSortClasses: null,
    /**
     * State saving enablement flag.
     * Note that this parameter will be set by the initialisation routine. To
     * set a default use {@link DataTable.defaults}.
     *  @type boolean
     */
    bStateSave: null,
  },
  /**
   * Scrolling settings for a table.
   *  @namespace
   */
  oScroll: {
    /**
     * When the table is shorter in height than sScrollY, collapse the
     * table container down to the height of the table (when true).
     * Note that this parameter will be set by the initialisation routine. To
     * set a default use {@link DataTable.defaults}.
     *  @type boolean
     */
    bCollapse: null,
    /**
     * Width of the scrollbar for the web-browser's platform. Calculated
     * during table initialisation.
     *  @type int
     *  @default 0
     */
    iBarWidth: 0,
    /**
     * Viewport width for horizontal scrolling. Horizontal scrolling is
     * disabled if an empty string.
     * Note that this parameter will be set by the initialisation routine. To
     * set a default use {@link DataTable.defaults}.
     *  @type string
     */
    sX: null,
    /**
     * Width to expand the table to when using x-scrolling. Typically you
     * should not need to use this.
     * Note that this parameter will be set by the initialisation routine. To
     * set a default use {@link DataTable.defaults}.
     *  @type string
     *  @deprecated
     */
    sXInner: null,
    /**
     * Viewport height for vertical scrolling. Vertical scrolling is disabled
     * if an empty string.
     * Note that this parameter will be set by the initialisation routine. To
     * set a default use {@link DataTable.defaults}.
     *  @type string
     */
    sY: null,
  },
  /**
   * Language information for the table.
   *  @namespace
   *  @extends DataTable.defaults.oLanguage
   */
  oLanguage: {
    /**
     * Information callback function. See
     * {@link DataTable.defaults.fnInfoCallback}
     *  @type function
     *  @default null
     */
    fnInfoCallback: null,
  },
  /**
   * Browser support parameters
   *  @namespace
   */
  oBrowser: {
    /**
     * Indicate if the browser incorrectly calculates width:100% inside a
     * scrolling element (IE6/7)
     *  @type boolean
     *  @default false
     */
    bScrollOversize: !1,
    /**
     * Determine if the vertical scrollbar is on the right or left of the
     * scrolling container - needed for rtl language layout, although not
     * all browsers move the scrollbar (Safari).
     *  @type boolean
     *  @default false
     */
    bScrollbarLeft: !1,
    /**
     * Flag for if `getBoundingClientRect` is fully supported or not
     *  @type boolean
     *  @default false
     */
    bBounding: !1,
    /**
     * Browser scrollbar width
     *  @type integer
     *  @default 0
     */
    barWidth: 0,
  },
  ajax: null,
  /**
   * Array referencing the nodes which are used for the features. The
   * parameters of this object match what is allowed by sDom - i.e.
   *   <ul>
   *     <li>'l' - Length changing</li>
   *     <li>'f' - Filtering input</li>
   *     <li>'t' - The table!</li>
   *     <li>'i' - Information</li>
   *     <li>'p' - Pagination</li>
   *     <li>'r' - pRocessing</li>
   *   </ul>
   *  @type array
   *  @default []
   */
  aanFeatures: [],
  /**
   * Store data information - see {@link DataTable.models.oRow} for detailed
   * information.
   *  @type array
   *  @default []
   */
  aoData: [],
  /**
   * Array of indexes which are in the current display (after filtering etc)
   *  @type array
   *  @default []
   */
  aiDisplay: [],
  /**
   * Array of indexes for display - no filtering
   *  @type array
   *  @default []
   */
  aiDisplayMaster: [],
  /**
   * Map of row ids to data indexes
   *  @type object
   *  @default {}
   */
  aIds: {},
  /**
   * Store information about each column that is in use
   *  @type array
   *  @default []
   */
  aoColumns: [],
  /**
   * Store information about the table's header
   *  @type array
   *  @default []
   */
  aoHeader: [],
  /**
   * Store information about the table's footer
   *  @type array
   *  @default []
   */
  aoFooter: [],
  /**
   * Store the applied global search information in case we want to force a
   * research or compare the old search to a new one.
   * Note that this parameter will be set by the initialisation routine. To
   * set a default use {@link DataTable.defaults}.
   *  @namespace
   *  @extends DataTable.models.oSearch
   */
  oPreviousSearch: {},
  /**
   * Store the applied search for each column - see
   * {@link DataTable.models.oSearch} for the format that is used for the
   * filtering information for each column.
   *  @type array
   *  @default []
   */
  aoPreSearchCols: [],
  /**
   * Sorting that is applied to the table. Note that the inner arrays are
   * used in the following manner:
   * <ul>
   *   <li>Index 0 - column number</li>
   *   <li>Index 1 - current sorting direction</li>
   * </ul>
   * Note that this parameter will be set by the initialisation routine. To
   * set a default use {@link DataTable.defaults}.
   *  @type array
   *  @todo These inner arrays should really be objects
   */
  aaSorting: null,
  /**
   * Sorting that is always applied to the table (i.e. prefixed in front of
   * aaSorting).
   * Note that this parameter will be set by the initialisation routine. To
   * set a default use {@link DataTable.defaults}.
   *  @type array
   *  @default []
   */
  aaSortingFixed: [],
  /**
   * Classes to use for the striping of a table.
   * Note that this parameter will be set by the initialisation routine. To
   * set a default use {@link DataTable.defaults}.
   *  @type array
   *  @default []
   */
  asStripeClasses: null,
  /**
   * If restoring a table - we should restore its striping classes as well
   *  @type array
   *  @default []
   */
  asDestroyStripes: [],
  /**
   * If restoring a table - we should restore its width
   *  @type int
   *  @default 0
   */
  sDestroyWidth: 0,
  /**
   * Callback functions array for every time a row is inserted (i.e. on a draw).
   *  @type array
   *  @default []
   */
  aoRowCallback: [],
  /**
   * Callback functions for the header on each draw.
   *  @type array
   *  @default []
   */
  aoHeaderCallback: [],
  /**
   * Callback function for the footer on each draw.
   *  @type array
   *  @default []
   */
  aoFooterCallback: [],
  /**
   * Array of callback functions for draw callback functions
   *  @type array
   *  @default []
   */
  aoDrawCallback: [],
  /**
   * Array of callback functions for row created function
   *  @type array
   *  @default []
   */
  aoRowCreatedCallback: [],
  /**
   * Callback functions for just before the table is redrawn. A return of
   * false will be used to cancel the draw.
   *  @type array
   *  @default []
   */
  aoPreDrawCallback: [],
  /**
   * Callback functions for when the table has been initialised.
   *  @type array
   *  @default []
   */
  aoInitComplete: [],
  /**
   * Callbacks for modifying the settings to be stored for state saving, prior to
   * saving state.
   *  @type array
   *  @default []
   */
  aoStateSaveParams: [],
  /**
   * Callbacks for modifying the settings that have been stored for state saving
   * prior to using the stored values to restore the state.
   *  @type array
   *  @default []
   */
  aoStateLoadParams: [],
  /**
   * Callbacks for operating on the settings object once the saved state has been
   * loaded
   *  @type array
   *  @default []
   */
  aoStateLoaded: [],
  /**
   * Cache the table ID for quick access
   *  @type string
   *  @default <i>Empty string</i>
   */
  sTableId: "",
  /**
   * The TABLE node for the main table
   *  @type node
   *  @default null
   */
  nTable: null,
  /**
   * Permanent ref to the thead element
   *  @type node
   *  @default null
   */
  nTHead: null,
  /**
   * Permanent ref to the tfoot element - if it exists
   *  @type node
   *  @default null
   */
  nTFoot: null,
  /**
   * Permanent ref to the tbody element
   *  @type node
   *  @default null
   */
  nTBody: null,
  /**
   * Cache the wrapper node (contains all DataTables controlled elements)
   *  @type node
   *  @default null
   */
  nTableWrapper: null,
  /**
   * Indicate if when using server-side processing the loading of data
   * should be deferred until the second draw.
   * Note that this parameter will be set by the initialisation routine. To
   * set a default use {@link DataTable.defaults}.
   *  @type boolean
   *  @default false
   */
  bDeferLoading: !1,
  /**
   * Indicate if all required information has been read in
   *  @type boolean
   *  @default false
   */
  bInitialised: !1,
  /**
   * Information about open rows. Each object in the array has the parameters
   * 'nTr' and 'nParent'
   *  @type array
   *  @default []
   */
  aoOpenRows: [],
  /**
   * Dictate the positioning of DataTables' control elements - see
   * {@link DataTable.model.oInit.sDom}.
   * Note that this parameter will be set by the initialisation routine. To
   * set a default use {@link DataTable.defaults}.
   *  @type string
   *  @default null
   */
  sDom: null,
  /**
   * Search delay (in mS)
   *  @type integer
   *  @default null
   */
  searchDelay: null,
  /**
   * Which type of pagination should be used.
   * Note that this parameter will be set by the initialisation routine. To
   * set a default use {@link DataTable.defaults}.
   *  @type string
   *  @default two_button
   */
  sPaginationType: "two_button",
  /**
   * The state duration (for `stateSave`) in seconds.
   * Note that this parameter will be set by the initialisation routine. To
   * set a default use {@link DataTable.defaults}.
   *  @type int
   *  @default 0
   */
  iStateDuration: 0,
  /**
   * Array of callback functions for state saving. Each array element is an
   * object with the following parameters:
   *   <ul>
   *     <li>function:fn - function to call. Takes two parameters, oSettings
   *       and the JSON string to save that has been thus far created. Returns
   *       a JSON string to be inserted into a json object
   *       (i.e. '"param": [ 0, 1, 2]')</li>
   *     <li>string:sName - name of callback</li>
   *   </ul>
   *  @type array
   *  @default []
   */
  aoStateSave: [],
  /**
   * Array of callback functions for state loading. Each array element is an
   * object with the following parameters:
   *   <ul>
   *     <li>function:fn - function to call. Takes two parameters, oSettings
   *       and the object stored. May return false to cancel state loading</li>
   *     <li>string:sName - name of callback</li>
   *   </ul>
   *  @type array
   *  @default []
   */
  aoStateLoad: [],
  /**
   * State that was saved. Useful for back reference
   *  @type object
   *  @default null
   */
  oSavedState: null,
  /**
   * State that was loaded. Useful for back reference
   *  @type object
   *  @default null
   */
  oLoadedState: null,
  /**
   * Source url for AJAX data for the table.
   * Note that this parameter will be set by the initialisation routine. To
   * set a default use {@link DataTable.defaults}.
   *  @type string
   *  @default null
   */
  sAjaxSource: null,
  /**
   * Property from a given object from which to read the table data from. This
   * can be an empty string (when not server-side processing), in which case
   * it is  assumed an an array is given directly.
   * Note that this parameter will be set by the initialisation routine. To
   * set a default use {@link DataTable.defaults}.
   *  @type string
   */
  sAjaxDataProp: null,
  /**
   * The last jQuery XHR object that was used for server-side data gathering.
   * This can be used for working with the XHR information in one of the
   * callbacks
   *  @type object
   *  @default null
   */
  jqXHR: null,
  /**
   * JSON returned from the server in the last Ajax request
   *  @type object
   *  @default undefined
   */
  json: void 0,
  /**
   * Data submitted as part of the last Ajax request
   *  @type object
   *  @default undefined
   */
  oAjaxData: void 0,
  /**
   * Function to get the server-side data.
   * Note that this parameter will be set by the initialisation routine. To
   * set a default use {@link DataTable.defaults}.
   *  @type function
   */
  fnServerData: null,
  /**
   * Functions which are called prior to sending an Ajax request so extra
   * parameters can easily be sent to the server
   *  @type array
   *  @default []
   */
  aoServerParams: [],
  /**
   * Send the XHR HTTP method - GET or POST (could be PUT or DELETE if
   * required).
   * Note that this parameter will be set by the initialisation routine. To
   * set a default use {@link DataTable.defaults}.
   *  @type string
   */
  sServerMethod: null,
  /**
   * Format numbers for display.
   * Note that this parameter will be set by the initialisation routine. To
   * set a default use {@link DataTable.defaults}.
   *  @type function
   */
  fnFormatNumber: null,
  /**
   * List of options that can be used for the user selectable length menu.
   * Note that this parameter will be set by the initialisation routine. To
   * set a default use {@link DataTable.defaults}.
   *  @type array
   *  @default []
   */
  aLengthMenu: null,
  /**
   * Counter for the draws that the table does. Also used as a tracker for
   * server-side processing
   *  @type int
   *  @default 0
   */
  iDraw: 0,
  /**
   * Indicate if a redraw is being done - useful for Ajax
   *  @type boolean
   *  @default false
   */
  bDrawing: !1,
  /**
   * Draw index (iDraw) of the last error when parsing the returned data
   *  @type int
   *  @default -1
   */
  iDrawError: -1,
  /**
   * Paging display length
   *  @type int
   *  @default 10
   */
  _iDisplayLength: 10,
  /**
   * Paging start point - aiDisplay index
   *  @type int
   *  @default 0
   */
  _iDisplayStart: 0,
  /**
   * Server-side processing - number of records in the result set
   * (i.e. before filtering), Use fnRecordsTotal rather than
   * this property to get the value of the number of records, regardless of
   * the server-side processing setting.
   *  @type int
   *  @default 0
   *  @private
   */
  _iRecordsTotal: 0,
  /**
   * Server-side processing - number of records in the current display set
   * (i.e. after filtering). Use fnRecordsDisplay rather than
   * this property to get the value of the number of records, regardless of
   * the server-side processing setting.
   *  @type boolean
   *  @default 0
   *  @private
   */
  _iRecordsDisplay: 0,
  /**
   * The classes to use for the table
   *  @type object
   *  @default {}
   */
  oClasses: {},
  /**
   * Flag attached to the settings object so you can check in the draw
   * callback if filtering has been done in the draw. Deprecated in favour of
   * events.
   *  @type boolean
   *  @default false
   *  @deprecated
   */
  bFiltered: !1,
  /**
   * Flag attached to the settings object so you can check in the draw
   * callback if sorting has been done in the draw. Deprecated in favour of
   * events.
   *  @type boolean
   *  @default false
   *  @deprecated
   */
  bSorted: !1,
  /**
   * Indicate that if multiple rows are in the header and there is more than
   * one unique cell per column, if the top one (true) or bottom one (false)
   * should be used for sorting / title by DataTables.
   * Note that this parameter will be set by the initialisation routine. To
   * set a default use {@link DataTable.defaults}.
   *  @type boolean
   */
  bSortCellsTop: null,
  /**
   * Initialisation object that is used for the table
   *  @type object
   *  @default null
   */
  oInit: null,
  /**
   * Destroy callback functions - for plug-ins to attach themselves to the
   * destroy so they can clean up markup and events.
   *  @type array
   *  @default []
   */
  aoDestroyCallback: [],
  /**
   * Get the number of records in the current record set, before filtering
   *  @type function
   */
  fnRecordsTotal: function () {
    return j(this) == "ssp"
      ? this._iRecordsTotal * 1
      : this.aiDisplayMaster.length;
  },
  /**
   * Get the number of records in the current record set, after filtering
   *  @type function
   */
  fnRecordsDisplay: function () {
    return j(this) == "ssp" ? this._iRecordsDisplay * 1 : this.aiDisplay.length;
  },
  /**
   * Get the display end point - aiDisplay index
   *  @type function
   */
  fnDisplayEnd: function () {
    var e = this._iDisplayLength,
      r = this._iDisplayStart,
      a = r + e,
      n = this.aiDisplay.length,
      l = this.oFeatures,
      t = l.bPaginate;
    return l.bServerSide
      ? t === !1 || e === -1
        ? r + n
        : Math.min(r + e, this._iRecordsDisplay)
      : !t || a > n || e === -1
      ? n
      : a;
  },
  /**
   * The DataTables object for this table
   *  @type object
   *  @default null
   */
  oInstance: null,
  /**
   * Unique identifier for each instance of the DataTables object. If there
   * is an ID on the table node, then it takes that value, otherwise an
   * incrementing internal counter is used.
   *  @type string
   *  @default null
   */
  sInstance: null,
  /**
   * tabindex attribute value that is added to DataTables control elements, allowing
   * keyboard navigation of the table and its controls.
   */
  iTabIndex: 0,
  /**
   * DIV container for the footer scrolling table if scrolling
   */
  nScrollHead: null,
  /**
   * DIV container for the footer scrolling table if scrolling
   */
  nScrollFoot: null,
  /**
   * Last applied sort
   *  @type array
   *  @default []
   */
  aLastSort: [],
  /**
   * Stored plug-in instances
   *  @type object
   *  @default {}
   */
  oPlugins: {},
  /**
   * Function used to get a row's id from the row's data
   *  @type function
   *  @default null
   */
  rowIdFn: null,
  /**
   * Data location where to store a row's id
   *  @type string
   *  @default null
   */
  rowId: null,
};
_.ext = R = {
  /**
   * Buttons. For use with the Buttons extension for DataTables. This is
   * defined here so other extensions can define buttons regardless of load
   * order. It is _not_ used by DataTables core.
   *
   *  @type object
   *  @default {}
   */
  buttons: {},
  /**
   * Element class names
   *
   *  @type object
   *  @default {}
   */
  classes: {},
  /**
   * DataTables build type (expanded by the download builder)
   *
   *  @type string
   */
  builder: "-source-",
  /**
   * Error reporting.
   *
   * How should DataTables report an error. Can take the value 'alert',
   * 'throw', 'none' or a function.
   *
   *  @type string|function
   *  @default alert
   */
  errMode: "alert",
  /**
   * Feature plug-ins.
   *
   * This is an array of objects which describe the feature plug-ins that are
   * available to DataTables. These feature plug-ins are then available for
   * use through the `dom` initialisation option.
   *
   * Each feature plug-in is described by an object which must have the
   * following properties:
   *
   * * `fnInit` - function that is used to initialise the plug-in,
   * * `cFeature` - a character so the feature can be enabled by the `dom`
   *   instillation option. This is case sensitive.
   *
   * The `fnInit` function has the following input parameters:
   *
   * 1. `{object}` DataTables settings object: see
   *    {@link DataTable.models.oSettings}
   *
   * And the following return is expected:
   *
   * * {node|null} The element which contains your feature. Note that the
   *   return may also be void if your plug-in does not require to inject any
   *   DOM elements into DataTables control (`dom`) - for example this might
   *   be useful when developing a plug-in which allows table control via
   *   keyboard entry
   *
   *  @type array
   *
   *  @example
   *    $.fn.dataTable.ext.features.push( {
   *      "fnInit": function( oSettings ) {
   *        return new TableTools( { "oDTSettings": oSettings } );
   *      },
   *      "cFeature": "T"
   *    } );
   */
  feature: [],
  /**
   * Row searching.
   *
   * This method of searching is complimentary to the default type based
   * searching, and a lot more comprehensive as it allows you complete control
   * over the searching logic. Each element in this array is a function
   * (parameters described below) that is called for every row in the table,
   * and your logic decides if it should be included in the searching data set
   * or not.
   *
   * Searching functions have the following input parameters:
   *
   * 1. `{object}` DataTables settings object: see
   *    {@link DataTable.models.oSettings}
   * 2. `{array|object}` Data for the row to be processed (same as the
   *    original format that was passed in as the data source, or an array
   *    from a DOM data source
   * 3. `{int}` Row index ({@link DataTable.models.oSettings.aoData}), which
   *    can be useful to retrieve the `TR` element if you need DOM interaction.
   *
   * And the following return is expected:
   *
   * * {boolean} Include the row in the searched result set (true) or not
   *   (false)
   *
   * Note that as with the main search ability in DataTables, technically this
   * is "filtering", since it is subtractive. However, for consistency in
   * naming we call it searching here.
   *
   *  @type array
   *  @default []
   *
   *  @example
   *    // The following example shows custom search being applied to the
   *    // fourth column (i.e. the data[3] index) based on two input values
   *    // from the end-user, matching the data in a certain range.
   *    $.fn.dataTable.ext.search.push(
   *      function( settings, data, dataIndex ) {
   *        var min = document.getElementById('min').value * 1;
   *        var max = document.getElementById('max').value * 1;
   *        var version = data[3] == "-" ? 0 : data[3]*1;
   *
   *        if ( min == "" && max == "" ) {
   *          return true;
   *        }
   *        else if ( min == "" && version < max ) {
   *          return true;
   *        }
   *        else if ( min < version && "" == max ) {
   *          return true;
   *        }
   *        else if ( min < version && version < max ) {
   *          return true;
   *        }
   *        return false;
   *      }
   *    );
   */
  search: [],
  /**
   * Selector extensions
   *
   * The `selector` option can be used to extend the options available for the
   * selector modifier options (`selector-modifier` object data type) that
   * each of the three built in selector types offer (row, column and cell +
   * their plural counterparts). For example the Select extension uses this
   * mechanism to provide an option to select only rows, columns and cells
   * that have been marked as selected by the end user (`{selected: true}`),
   * which can be used in conjunction with the existing built in selector
   * options.
   *
   * Each property is an array to which functions can be pushed. The functions
   * take three attributes:
   *
   * * Settings object for the host table
   * * Options object (`selector-modifier` object type)
   * * Array of selected item indexes
   *
   * The return is an array of the resulting item indexes after the custom
   * selector has been applied.
   *
   *  @type object
   */
  selector: {
    cell: [],
    column: [],
    row: [],
  },
  /**
   * Internal functions, exposed for used in plug-ins.
   *
   * Please note that you should not need to use the internal methods for
   * anything other than a plug-in (and even then, try to avoid if possible).
   * The internal function may change between releases.
   *
   *  @type object
   *  @default {}
   */
  internal: {},
  /**
   * Legacy configuration options. Enable and disable legacy options that
   * are available in DataTables.
   *
   *  @type object
   */
  legacy: {
    /**
     * Enable / disable DataTables 1.9 compatible server-side processing
     * requests
     *
     *  @type boolean
     *  @default null
     */
    ajax: null,
  },
  /**
   * Pagination plug-in methods.
   *
   * Each entry in this object is a function and defines which buttons should
   * be shown by the pagination rendering method that is used for the table:
   * {@link DataTable.ext.renderer.pageButton}. The renderer addresses how the
   * buttons are displayed in the document, while the functions here tell it
   * what buttons to display. This is done by returning an array of button
   * descriptions (what each button will do).
   *
   * Pagination types (the four built in options and any additional plug-in
   * options defined here) can be used through the `paginationType`
   * initialisation parameter.
   *
   * The functions defined take two parameters:
   *
   * 1. `{int} page` The current page index
   * 2. `{int} pages` The number of pages in the table
   *
   * Each function is expected to return an array where each element of the
   * array can be one of:
   *
   * * `first` - Jump to first page when activated
   * * `last` - Jump to last page when activated
   * * `previous` - Show previous page when activated
   * * `next` - Show next page when activated
   * * `{int}` - Show page of the index given
   * * `{array}` - A nested array containing the above elements to add a
   *   containing 'DIV' element (might be useful for styling).
   *
   * Note that DataTables v1.9- used this object slightly differently whereby
   * an object with two functions would be defined for each plug-in. That
   * ability is still supported by DataTables 1.10+ to provide backwards
   * compatibility, but this option of use is now decremented and no longer
   * documented in DataTables 1.10+.
   *
   *  @type object
   *  @default {}
   *
   *  @example
   *    // Show previous, next and current page buttons only
   *    $.fn.dataTableExt.oPagination.current = function ( page, pages ) {
   *      return [ 'previous', page, 'next' ];
   *    };
   */
  pager: {},
  renderer: {
    pageButton: {},
    header: {},
  },
  /**
   * Ordering plug-ins - custom data source
   *
   * The extension options for ordering of data available here is complimentary
   * to the default type based ordering that DataTables typically uses. It
   * allows much greater control over the the data that is being used to
   * order a column, but is necessarily therefore more complex.
   *
   * This type of ordering is useful if you want to do ordering based on data
   * live from the DOM (for example the contents of an 'input' element) rather
   * than just the static string that DataTables knows of.
   *
   * The way these plug-ins work is that you create an array of the values you
   * wish to be ordering for the column in question and then return that
   * array. The data in the array much be in the index order of the rows in
   * the table (not the currently ordering order!). Which order data gathering
   * function is run here depends on the `dt-init columns.orderDataType`
   * parameter that is used for the column (if any).
   *
   * The functions defined take two parameters:
   *
   * 1. `{object}` DataTables settings object: see
   *    {@link DataTable.models.oSettings}
   * 2. `{int}` Target column index
   *
   * Each function is expected to return an array:
   *
   * * `{array}` Data for the column to be ordering upon
   *
   *  @type array
   *
   *  @example
   *    // Ordering using `input` node values
   *    $.fn.dataTable.ext.order['dom-text'] = function  ( settings, col )
   *    {
   *      return this.api().column( col, {order:'index'} ).nodes().map( function ( td, i ) {
   *        return $('input', td).val();
   *      } );
   *    }
   */
  order: {},
  /**
   * Type based plug-ins.
   *
   * Each column in DataTables has a type assigned to it, either by automatic
   * detection or by direct assignment using the `type` option for the column.
   * The type of a column will effect how it is ordering and search (plug-ins
   * can also make use of the column type if required).
   *
   * @namespace
   */
  type: {
    /**
     * Type detection functions.
     *
     * The functions defined in this object are used to automatically detect
     * a column's type, making initialisation of DataTables super easy, even
     * when complex data is in the table.
     *
     * The functions defined take two parameters:
     *
     *  1. `{*}` Data from the column cell to be analysed
     *  2. `{settings}` DataTables settings object. This can be used to
     *     perform context specific type detection - for example detection
     *     based on language settings such as using a comma for a decimal
     *     place. Generally speaking the options from the settings will not
     *     be required
     *
     * Each function is expected to return:
     *
     * * `{string|null}` Data type detected, or null if unknown (and thus
     *   pass it on to the other type detection functions.
     *
     *  @type array
     *
     *  @example
     *    // Currency type detection plug-in:
     *    $.fn.dataTable.ext.type.detect.push(
     *      function ( data, settings ) {
     *        // Check the numeric part
     *        if ( ! data.substring(1).match(/[0-9]/) ) {
     *          return null;
     *        }
     *
     *        // Check prefixed by currency
     *        if ( data.charAt(0) == '$' || data.charAt(0) == '&pound;' ) {
     *          return 'currency';
     *        }
     *        return null;
     *      }
     *    );
     */
    detect: [],
    /**
     * Type based search formatting.
     *
     * The type based searching functions can be used to pre-format the
     * data to be search on. For example, it can be used to strip HTML
     * tags or to de-format telephone numbers for numeric only searching.
     *
     * Note that is a search is not defined for a column of a given type,
     * no search formatting will be performed.
     *
     * Pre-processing of searching data plug-ins - When you assign the sType
     * for a column (or have it automatically detected for you by DataTables
     * or a type detection plug-in), you will typically be using this for
     * custom sorting, but it can also be used to provide custom searching
     * by allowing you to pre-processing the data and returning the data in
     * the format that should be searched upon. This is done by adding
     * functions this object with a parameter name which matches the sType
     * for that target column. This is the corollary of <i>afnSortData</i>
     * for searching data.
     *
     * The functions defined take a single parameter:
     *
     *  1. `{*}` Data from the column cell to be prepared for searching
     *
     * Each function is expected to return:
     *
     * * `{string|null}` Formatted string that will be used for the searching.
     *
     *  @type object
     *  @default {}
     *
     *  @example
     *    $.fn.dataTable.ext.type.search['title-numeric'] = function ( d ) {
     *      return d.replace(/\n/g," ").replace( /<.*?>/g, "" );
     *    }
     */
    search: {},
    /**
     * Type based ordering.
     *
     * The column type tells DataTables what ordering to apply to the table
     * when a column is sorted upon. The order for each type that is defined,
     * is defined by the functions available in this object.
     *
     * Each ordering option can be described by three properties added to
     * this object:
     *
     * * `{type}-pre` - Pre-formatting function
     * * `{type}-asc` - Ascending order function
     * * `{type}-desc` - Descending order function
     *
     * All three can be used together, only `{type}-pre` or only
     * `{type}-asc` and `{type}-desc` together. It is generally recommended
     * that only `{type}-pre` is used, as this provides the optimal
     * implementation in terms of speed, although the others are provided
     * for compatibility with existing Javascript sort functions.
     *
     * `{type}-pre`: Functions defined take a single parameter:
     *
     *  1. `{*}` Data from the column cell to be prepared for ordering
     *
     * And return:
     *
     * * `{*}` Data to be sorted upon
     *
     * `{type}-asc` and `{type}-desc`: Functions are typical Javascript sort
     * functions, taking two parameters:
     *
     *  1. `{*}` Data to compare to the second parameter
     *  2. `{*}` Data to compare to the first parameter
     *
     * And returning:
     *
     * * `{*}` Ordering match: <0 if first parameter should be sorted lower
     *   than the second parameter, ===0 if the two parameters are equal and
     *   >0 if the first parameter should be sorted height than the second
     *   parameter.
     *
     *  @type object
     *  @default {}
     *
     *  @example
     *    // Numeric ordering of formatted numbers with a pre-formatter
     *    $.extend( $.fn.dataTable.ext.type.order, {
     *      "string-pre": function(x) {
     *        a = (a === "-" || a === "") ? 0 : a.replace( /[^\d\-\.]/g, "" );
     *        return parseFloat( a );
     *      }
     *    } );
     *
     *  @example
     *    // Case-sensitive string ordering, with no pre-formatting method
     *    $.extend( $.fn.dataTable.ext.order, {
     *      "string-case-asc": function(x,y) {
     *        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
     *      },
     *      "string-case-desc": function(x,y) {
     *        return ((x < y) ? 1 : ((x > y) ? -1 : 0));
     *      }
     *    } );
     */
    order: {},
  },
  /**
   * Unique DataTables instance counter
   *
   * @type int
   * @private
   */
  _unique: 0,
  //
  // Depreciated
  // The following properties are retained for backwards compatibility only.
  // The should not be used in new projects and will be removed in a future
  // version
  //
  /**
   * Version check function.
   *  @type function
   *  @depreciated Since 1.10
   */
  fnVersionCheck: _.fnVersionCheck,
  /**
   * Index for what 'this' index API functions should use
   *  @type int
   *  @deprecated Since v1.10
   */
  iApiIndex: 0,
  /**
   * jQuery UI class container
   *  @type object
   *  @deprecated Since v1.10
   */
  oJUIClasses: {},
  /**
   * Software version
   *  @type string
   *  @deprecated Since v1.10
   */
  sVersion: _.version,
};
u.extend(R, {
  afnFiltering: R.search,
  aTypes: R.type.detect,
  ofnSearch: R.type.search,
  oSort: R.type.order,
  afnSortData: R.order,
  aoFeatures: R.feature,
  oApi: R.internal,
  oStdClasses: R.classes,
  oPagination: R.pager,
});
u.extend(_.ext.classes, {
  sTable: "dataTable",
  sNoFooter: "no-footer",
  /* Paging buttons */
  sPageButton: "paginate_button",
  sPageButtonActive: "current",
  sPageButtonDisabled: "disabled",
  /* Striping classes */
  sStripeOdd: "odd",
  sStripeEven: "even",
  /* Empty row */
  sRowEmpty: "dataTables_empty",
  /* Features */
  sWrapper: "dataTables_wrapper",
  sFilter: "dataTables_filter",
  sInfo: "dataTables_info",
  sPaging: "dataTables_paginate paging_",
  /* Note that the type is postfixed */
  sLength: "dataTables_length",
  sProcessing: "dataTables_processing",
  /* Sorting */
  sSortAsc: "sorting_asc",
  sSortDesc: "sorting_desc",
  sSortable: "sorting",
  /* Sortable in both directions */
  sSortableAsc: "sorting_desc_disabled",
  sSortableDesc: "sorting_asc_disabled",
  sSortableNone: "sorting_disabled",
  sSortColumn: "sorting_",
  /* Note that an int is postfixed for the sorting order */
  /* Filtering */
  sFilterInput: "",
  /* Page length */
  sLengthSelect: "",
  /* Scrolling */
  sScrollWrapper: "dataTables_scroll",
  sScrollHead: "dataTables_scrollHead",
  sScrollHeadInner: "dataTables_scrollHeadInner",
  sScrollBody: "dataTables_scrollBody",
  sScrollFoot: "dataTables_scrollFoot",
  sScrollFootInner: "dataTables_scrollFootInner",
  /* Misc */
  sHeaderTH: "",
  sFooterTH: "",
  // Deprecated
  sSortJUIAsc: "",
  sSortJUIDesc: "",
  sSortJUI: "",
  sSortJUIAscAllowed: "",
  sSortJUIDescAllowed: "",
  sSortJUIWrapper: "",
  sSortIcon: "",
  sJUIHeader: "",
  sJUIFooter: "",
});
var Ta = _.ext.pager;
function _e(e, r) {
  var a = [],
    n = Ta.numbers_length,
    l = Math.floor(n / 2);
  return (
    r <= n
      ? (a = de(0, r))
      : e <= l
      ? ((a = de(0, n - 2)), a.push("ellipsis"), a.push(r - 1))
      : e >= r - 1 - l
      ? ((a = de(r - (n - 2), r)),
        a.splice(0, 0, "ellipsis"),
        a.splice(0, 0, 0))
      : ((a = de(e - l + 2, e + l - 1)),
        a.push("ellipsis"),
        a.push(r - 1),
        a.splice(0, 0, "ellipsis"),
        a.splice(0, 0, 0)),
    (a.DT_el = "span"),
    a
  );
}
u.extend(Ta, {
  simple: function (e, r) {
    return ["previous", "next"];
  },
  full: function (e, r) {
    return ["first", "previous", "next", "last"];
  },
  numbers: function (e, r) {
    return [_e(e, r)];
  },
  simple_numbers: function (e, r) {
    return ["previous", _e(e, r), "next"];
  },
  full_numbers: function (e, r) {
    return ["first", "previous", _e(e, r), "next", "last"];
  },
  first_last_numbers: function (e, r) {
    return ["first", _e(e, r), "last"];
  },
  // For testing and plug-ins to use
  _numbers: _e,
  // Number of number buttons (including ellipsis) to show. _Must be odd!_
  numbers_length: 7,
});
u.extend(!0, _.ext.renderer, {
  pageButton: {
    _: function (e, r, a, n, l, t) {
      var i = e.oClasses,
        o = e.oLanguage.oPaginate,
        f = e.oLanguage.oAria.paginate || {},
        s,
        c,
        d = function (v, b) {
          var m,
            D,
            y,
            p,
            T,
            S = i.sPageButtonDisabled,
            L = function (J) {
              Ye(e, J.data.action, !0);
            };
          for (m = 0, D = b.length; m < D; m++)
            if (((p = b[m]), Array.isArray(p))) {
              var X = u("<" + (p.DT_el || "div") + "/>").appendTo(v);
              d(X, p);
            } else {
              switch (((s = null), (c = p), (T = e.iTabIndex), p)) {
                case "ellipsis":
                  v.append('<span class="ellipsis">&#x2026;</span>');
                  break;
                case "first":
                  (s = o.sFirst), l === 0 && ((T = -1), (c += " " + S));
                  break;
                case "previous":
                  (s = o.sPrevious), l === 0 && ((T = -1), (c += " " + S));
                  break;
                case "next":
                  (s = o.sNext),
                    (t === 0 || l === t - 1) && ((T = -1), (c += " " + S));
                  break;
                case "last":
                  (s = o.sLast),
                    (t === 0 || l === t - 1) && ((T = -1), (c += " " + S));
                  break;
                default:
                  (s = e.fnFormatNumber(p + 1)),
                    (c = l === p ? i.sPageButtonActive : "");
                  break;
              }
              if (s !== null) {
                var q = e.oInit.pagingTag || "a",
                  k = c.indexOf(S) !== -1;
                (y = u("<" + q + ">", {
                  class: i.sPageButton + " " + c,
                  "aria-controls": e.sTableId,
                  "aria-disabled": k ? "true" : null,
                  "aria-label": f[p],
                  role: "link",
                  "aria-current": c === i.sPageButtonActive ? "page" : null,
                  "data-dt-idx": p,
                  tabindex: T,
                  id:
                    a === 0 && typeof p == "string"
                      ? e.sTableId + "_" + p
                      : null,
                })
                  .html(s)
                  .appendTo(v)),
                  Sr(y, { action: p }, L);
              }
            }
        },
        h;
      try {
        h = u(r).find(document.activeElement).data("dt-idx");
      } catch {}
      d(u(r).empty(), n),
        h !== void 0 &&
          u(r)
            .find("[data-dt-idx=" + h + "]")
            .trigger("focus");
    },
  },
});
u.extend(_.ext.type.detect, [
  // Plain numbers - first since V8 detects some plain numbers as dates
  // e.g. Date.parse('55') (but not all, e.g. Date.parse('22')...).
  function (e, r) {
    var a = r.oLanguage.sDecimal;
    return nr(e, a) ? "num" + a : null;
  },
  // Dates (only those recognised by the browser's Date.parse)
  function (e, r) {
    if (e && !(e instanceof Date) && !Fa.test(e)) return null;
    var a = Date.parse(e);
    return (a !== null && !isNaN(a)) || Q(e) ? "date" : null;
  },
  // Formatted numbers
  function (e, r) {
    var a = r.oLanguage.sDecimal;
    return nr(e, a, !0) ? "num-fmt" + a : null;
  },
  // HTML numeric
  function (e, r) {
    var a = r.oLanguage.sDecimal;
    return Pr(e, a) ? "html-num" + a : null;
  },
  // HTML numeric, formatted
  function (e, r) {
    var a = r.oLanguage.sDecimal;
    return Pr(e, a, !0) ? "html-num-fmt" + a : null;
  },
  // HTML (this is strict checking - there must be html)
  function (e, r) {
    return Q(e) || (typeof e == "string" && e.indexOf("<") !== -1)
      ? "html"
      : null;
  },
]);
u.extend(_.ext.type.search, {
  html: function (e) {
    return Q(e)
      ? e
      : typeof e == "string"
      ? e.replace(Rr, " ").replace(Me, "")
      : "";
  },
  string: function (e) {
    return Q(e) ? e : typeof e == "string" ? e.replace(Rr, " ") : e;
  },
});
var He = function (e, r, a, n) {
  if (e !== 0 && (!e || e === "-")) return -1 / 0;
  var l = typeof e;
  return l === "number" || l === "bigint"
    ? e
    : (r && (e = kr(e, r)),
      e.replace && (a && (e = e.replace(a, "")), n && (e = e.replace(n, ""))),
      e * 1);
};
function sr(e) {
  u.each(
    {
      // Plain numbers
      num: function (r) {
        return He(r, e);
      },
      // Formatted numbers
      "num-fmt": function (r) {
        return He(r, e, ar);
      },
      // HTML numeric
      "html-num": function (r) {
        return He(r, e, Me);
      },
      // HTML numeric, formatted
      "html-num-fmt": function (r) {
        return He(r, e, Me, ar);
      },
    },
    function (r, a) {
      (R.type.order[r + e + "-pre"] = a),
        r.match(/^html\-/) && (R.type.search[r + e] = R.type.search.html);
    }
  );
}
u.extend(R.type.order, {
  // Dates
  "date-pre": function (e) {
    var r = Date.parse(e);
    return isNaN(r) ? -1 / 0 : r;
  },
  // html
  "html-pre": function (e) {
    return Q(e)
      ? ""
      : e.replace
      ? e.replace(/<.*?>/g, "").toLowerCase()
      : e + "";
  },
  // string
  "string-pre": function (e) {
    return Q(e)
      ? ""
      : typeof e == "string"
      ? e.toLowerCase()
      : e.toString
      ? e.toString()
      : "";
  },
  // string-asc and -desc are retained only for compatibility with the old
  // sort methods
  "string-asc": function (e, r) {
    return e < r ? -1 : e > r ? 1 : 0;
  },
  "string-desc": function (e, r) {
    return e < r ? 1 : e > r ? -1 : 0;
  },
});
sr("");
u.extend(!0, _.ext.renderer, {
  header: {
    _: function (e, r, a, n) {
      u(e.nTable).on("order.dt.DT", function (l, t, i, o) {
        if (e === t) {
          var f = a.idx;
          r.removeClass(n.sSortAsc + " " + n.sSortDesc).addClass(
            o[f] == "asc"
              ? n.sSortAsc
              : o[f] == "desc"
              ? n.sSortDesc
              : a.sSortingClass
          );
        }
      });
    },
    jqueryui: function (e, r, a, n) {
      u("<div/>")
        .addClass(n.sSortJUIWrapper)
        .append(r.contents())
        .append(u("<span/>").addClass(n.sSortIcon + " " + a.sSortingClassJUI))
        .appendTo(r),
        u(e.nTable).on("order.dt.DT", function (l, t, i, o) {
          if (e === t) {
            var f = a.idx;
            r
              .removeClass(n.sSortAsc + " " + n.sSortDesc)
              .addClass(
                o[f] == "asc"
                  ? n.sSortAsc
                  : o[f] == "desc"
                  ? n.sSortDesc
                  : a.sSortingClass
              ),
              r
                .find("span." + n.sSortIcon)
                .removeClass(
                  n.sSortJUIAsc +
                    " " +
                    n.sSortJUIDesc +
                    " " +
                    n.sSortJUI +
                    " " +
                    n.sSortJUIAscAllowed +
                    " " +
                    n.sSortJUIDescAllowed
                )
                .addClass(
                  o[f] == "asc"
                    ? n.sSortJUIAsc
                    : o[f] == "desc"
                    ? n.sSortJUIDesc
                    : a.sSortingClassJUI
                );
          }
        });
    },
  },
});
var Ee = function (e) {
  return (
    Array.isArray(e) && (e = e.join(",")),
    typeof e == "string"
      ? e
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
      : e
  );
};
function Mr(e, r, a, n, l) {
  return window.moment ? e[r](l) : window.luxon ? e[a](l) : n ? e[n](l) : e;
}
var Or = !1;
function Ue(e, r, a) {
  var n;
  if (window.moment) {
    if (((n = window.moment.utc(e, r, a, !0)), !n.isValid())) return null;
  } else if (window.luxon) {
    if (
      ((n =
        r && typeof e == "string"
          ? window.luxon.DateTime.fromFormat(e, r)
          : window.luxon.DateTime.fromISO(e)),
      !n.isValid)
    )
      return null;
    n.setLocale(a);
  } else
    r
      ? (Or ||
          alert(
            "DataTables warning: Formatted date without Moment.js or Luxon - https://datatables.net/tn/17"
          ),
        (Or = !0))
      : (n = new Date(e));
  return n;
}
function rr(e) {
  return function (r, a, n, l) {
    arguments.length === 0
      ? ((n = "en"), (a = null), (r = null))
      : arguments.length === 1
      ? ((n = "en"), (a = r), (r = null))
      : arguments.length === 2 && ((n = a), (a = r), (r = null));
    var t = "datetime-" + a;
    return (
      _.ext.type.order[t] ||
        (_.ext.type.detect.unshift(function (i) {
          return i === t ? t : !1;
        }),
        (_.ext.type.order[t + "-asc"] = function (i, o) {
          var f = i.valueOf(),
            s = o.valueOf();
          return f === s ? 0 : f < s ? -1 : 1;
        }),
        (_.ext.type.order[t + "-desc"] = function (i, o) {
          var f = i.valueOf(),
            s = o.valueOf();
          return f === s ? 0 : f > s ? -1 : 1;
        })),
      function (i, o) {
        if (i == null)
          if (l === "--now") {
            var f = /* @__PURE__ */ new Date();
            i = new Date(
              Date.UTC(
                f.getFullYear(),
                f.getMonth(),
                f.getDate(),
                f.getHours(),
                f.getMinutes(),
                f.getSeconds()
              )
            );
          } else i = "";
        if (o === "type") return t;
        if (i === "")
          return o !== "sort" ? "" : Ue("0000-01-01 00:00:00", null, n);
        if (
          a !== null &&
          r === a &&
          o !== "sort" &&
          o !== "type" &&
          !(i instanceof Date)
        )
          return i;
        var s = Ue(i, r, n);
        if (s === null) return i;
        if (o === "sort") return s;
        var c =
          a === null
            ? Mr(s, "toDate", "toJSDate", "")[e]()
            : Mr(s, "format", "toFormat", "toISOString", a);
        return o === "display" ? Ee(c) : c;
      }
    );
  };
}
var xa = ",",
  ga = ".";
if (window.Intl !== void 0)
  try {
    for (
      var me = new Intl.NumberFormat().formatToParts(100000.1), ce = 0;
      ce < me.length;
      ce++
    )
      me[ce].type === "group"
        ? (xa = me[ce].value)
        : me[ce].type === "decimal" && (ga = me[ce].value);
  } catch {}
_.datetime = function (e, r) {
  var a = "datetime-detect-" + e;
  r || (r = "en"),
    _.ext.type.order[a] ||
      (_.ext.type.detect.unshift(function (n) {
        var l = Ue(n, e, r);
        return n === "" || l ? a : !1;
      }),
      (_.ext.type.order[a + "-pre"] = function (n) {
        return Ue(n, e, r) || 0;
      }));
};
_.render = {
  date: rr("toLocaleDateString"),
  datetime: rr("toLocaleString"),
  time: rr("toLocaleTimeString"),
  number: function (e, r, a, n, l) {
    return (
      e == null && (e = xa),
      r == null && (r = ga),
      {
        display: function (t) {
          if (
            (typeof t != "number" && typeof t != "string") ||
            t === "" ||
            t === null
          )
            return t;
          var i = t < 0 ? "-" : "",
            o = parseFloat(t);
          if (isNaN(o)) return Ee(t);
          (o = o.toFixed(a)), (t = Math.abs(o));
          var f = parseInt(t, 10),
            s = a ? r + (t - f).toFixed(a).substring(2) : "";
          return (
            f === 0 && parseFloat(s) === 0 && (i = ""),
            i +
              (n || "") +
              f.toString().replace(/\B(?=(\d{3})+(?!\d))/g, e) +
              s +
              (l || "")
          );
        },
      }
    );
  },
  text: function () {
    return {
      display: Ee,
      filter: Ee,
    };
  },
};
function Aa(e) {
  return function () {
    var r = [Be(this[_.ext.iApiIndex])].concat(
      Array.prototype.slice.call(arguments)
    );
    return _.ext.internal[e].apply(this, r);
  };
}
u.extend(_.ext.internal, {
  _fnExternApiFunc: Aa,
  _fnBuildAjax: $e,
  _fnAjaxUpdate: zr,
  _fnAjaxParameters: Zr,
  _fnAjaxUpdateDraw: Kr,
  _fnAjaxDataSrc: Ie,
  _fnAddColumn: cr,
  _fnColumnOptions: Oe,
  _fnAdjustColumnSizing: Te,
  _fnVisibleToColumnIndex: xe,
  _fnColumnIndexToVisible: ge,
  _fnVisbleColumns: ve,
  _fnGetColumns: Xe,
  _fnColumnTypes: dr,
  _fnApplyColumnDefs: Jr,
  _fnHungarianMap: we,
  _fnCamelToHungarian: ne,
  _fnLanguageCompat: tr,
  _fnBrowserDetect: qr,
  _fnAddData: le,
  _fnAddTr: qe,
  _fnNodeToDataIndex: Na,
  _fnNodeToColumnIndex: ja,
  _fnGetCellData: W,
  _fnSetCellData: Gr,
  _fnSplitObjNotation: lr,
  _fnGetObjectDataFn: he,
  _fnSetObjectDataFn: te,
  _fnGetDataMaster: ir,
  _fnClearTable: Je,
  _fnDeleteIndex: Ne,
  _fnInvalidate: Ae,
  _fnGetRowElements: hr,
  _fnCreateTr: vr,
  _fnBuildHead: $r,
  _fnDrawHead: ye,
  _fnDraw: ie,
  _fnReDraw: oe,
  _fnAddOptionsHtml: Yr,
  _fnDetectHeader: Ce,
  _fnGetUniqueThs: Ge,
  _fnFeatureHtmlFilter: Qr,
  _fnFilterComplete: Fe,
  _fnFilterCustom: ea,
  _fnFilterColumn: ra,
  _fnFilter: aa,
  _fnFilterCreateSearch: br,
  _fnEscapeRegex: _r,
  _fnFilterData: na,
  _fnFeatureHtmlInfo: ta,
  _fnUpdateInfo: la,
  _fnInfoMacros: ia,
  _fnInitialise: De,
  _fnInitComplete: We,
  _fnLengthChange: mr,
  _fnFeatureHtmlLength: oa,
  _fnFeatureHtmlPaginate: fa,
  _fnPageChange: Ye,
  _fnFeatureHtmlProcessing: ua,
  _fnProcessingDisplay: U,
  _fnFeatureHtmlTable: sa,
  _fnScrollDraw: ze,
  _fnApplyToChildren: K,
  _fnCalculateColumnWidths: Dr,
  _fnThrottle: yr,
  _fnConvertToWidth: ca,
  _fnGetWidestNode: da,
  _fnGetMaxLenString: ha,
  _fnStringToCss: F,
  _fnSortFlatten: pe,
  _fnSort: va,
  _fnSortAria: pa,
  _fnSortListener: or,
  _fnSortAttachListener: Cr,
  _fnSortingClasses: ke,
  _fnSortData: ba,
  _fnSaveState: Le,
  _fnLoadState: _a,
  _fnImplementState: fr,
  _fnSettingsFromNode: Be,
  _fnLog: Y,
  _fnMap: Z,
  _fnBindAction: Sr,
  _fnCallbackReg: E,
  _fnCallbackFire: x,
  _fnLengthOverflow: wr,
  _fnRenderer: Tr,
  _fnDataSource: j,
  _fnRowAttributes: pr,
  _fnExtend: ur,
  _fnCalculateEnd: function () {},
  // Used by a lot of plug-ins, but redundant
  // in 1.10, so this dead-end function is
  // added to prevent errors
});
u.fn.dataTable = _;
_.$ = u;
u.fn.dataTableSettings = _.settings;
u.fn.dataTableExt = _.ext;
u.fn.DataTable = function (e) {
  return u(this).dataTable(e).api();
};
u.each(_, function (e, r) {
  u.fn.DataTable[e] = r;
});
class $a {
  config;
  constructor() {
    this.config = null;
  }
  validateConfiguration(r) {
    if (!r.dataSource) throw new Error("Error: you must provide a dataSource");
    return this;
  }
}
class za extends $a {
  datatable;
  constructor(r) {
    super(),
      this.validateConfiguration(r),
      (this.config = r),
      (this.datatable = new _(`${this.config.HTMLDivId}`));
  }
}
export { za as default };
