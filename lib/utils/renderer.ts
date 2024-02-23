//@ts-ignore
$.fn.dataTable.render.multi = function (renderArray: any) {
  return function (d: any, type: any, row: any, meta: any) {
    for (var r = 0; r < renderArray.length; r++) {
      d = renderArray[r](d, type, row, meta);
    }

    return d;
  };
};

//@ts-ignore
$.fn.dataTable.render.localeNumber = function (lang = __lang__ || 'fr') {
  const getLang = function () {
    if (lang && lang == 'fr') {
      return 'fr-FR';
    } else if (lang && lang == 'en') {
      return 'en-US';
    }
    return '';
  };
  const getLocaleNumber = function (number: any) {
    var floatData = parseFloat(number);
    if (floatData) {
      return floatData.toLocaleString(getLang());
    }
    return number;
  };
  //@ts-ignore
  return function (data: any, type: any, row: any) {
    //@ts-ignore
    // Render is apply for all type
    if (data && Number(data)) {
      return getLocaleNumber(Number(data));
    }
    return data;
  };
};

//@ts-ignore
$.fn.dataTable.render.dateFormat = function (format = 'DD/MM/YYYY HH:mm') {
  //@ts-ignore
  return function (data: any, type: any, row: any) {
    // Render is apply for all type
    // TODO UPDATE THIS TO DAYJS
    //@ts-ignore
    if (data && moment && moment(data)) {
      //@ts-ignore
      return moment(data).format(format);
    }
    return data;
  };
};

//@ts-ignore
$.fn.dataTable.render.boolToText = function (yes = 'Vrai', no = 'Faux') {
  // I would have preferred to call the arguments `true` and `false`, but this is a reserved word !
  //@ts-ignore
  return function (data, type, row) {
    // Render is apply for all type
    if (data) {
      return yes;
    }
    return no;
  };
};

//@ts-ignore
$.fn.dataTable.render.toFixed = function (maxdigit = 2) {
  //@ts-ignore
  return function (data: any, type: any, row: any) {
    // Render is apply for all type
    if (data && Number(data)) {
      return Number(data).toFixed(maxdigit);
    }
    return data;
  };
};

//@ts-ignore
$.fn.dataTable.render.parseFloat = function (maxdigit: any) {
  //@ts-ignore
  return function (data: any, type: any, row: any) {
    // Render is apply for all type
    if (data && Number(data)) {
      var val: any = Number(data);
      if (maxdigit) {
        // For fix this bug :
        // https://www.sitepoint.com/number-tofixed-rounding-errors-broken-but-fixable/
        // https://bugzilla.mozilla.org/show_bug.cgi?id=397880
        val = val.toFixed(maxdigit);
      }
      return parseFloat(val);
    }
    return data;
  };
};

//@ts-ignore
$.fn.dataTable.render.parseInt = function () {
  //@ts-ignore
  return function (data: any, type: any, row: any) {
    // Render is apply for all type
    if (data && Number(data)) {
      return Math.round(Number(data));
    }
    return data;
  };
};

//@ts-ignore
$.fn.dataTable.render.editableCol = function () {
  //@ts-ignore
  return function (data: any, type: any, row: any) {
    //if ( type === 'display' ) {
    return `<span class="editable-cell">
                      <span>${data ?? ''}</span> 
                      <i class="fa fa-pencil"></i>
                  </span>`;
    // }
  };
};

//@ts-ignore
$.fn.dataTable.render.ellipsis = function (
  cutoff: any,
  wordbreak: any,
  escapeHtml: any
) {
  var esc = function (t: any) {
    return t
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  };
  //@ts-ignore
  return function (d: any, type: any, row: any) {
    // Order, search and type get the original data
    if (type !== 'display') {
      return d;
    }

    if (typeof d !== 'number' && typeof d !== 'string') {
      return d;
    }

    d = d.toString(); // cast numbers

    if (d.length < cutoff) {
      return d;
    }

    var shortened = d.substr(0, cutoff - 1);

    // Find the last white space character in the string
    if (wordbreak) {
      shortened = shortened.replace(/\s([^\s]*)$/, '');
    }

    // Protect against uncontrolled HTML input
    if (escapeHtml) {
      shortened = esc(shortened);
    }

    return (
      '<span class="ellipsis" title="' +
      esc(d) +
      '">' +
      shortened +
      '&#8230;</span>'
    );
  };
};
