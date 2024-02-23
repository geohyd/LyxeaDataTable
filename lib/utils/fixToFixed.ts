// TODO

(1.005).toFixed(2) == '1.01' ||
  (function (prototype) {
    const fixScientificNotationToString = function (x: number) {
      let xString: string = '';
      if (Math.abs(x) < 1.0) {
        var e = parseInt(x.toString().split('e-')[1]);
        if (e) {
          x *= Math.pow(10, e - 1);
          xString =
            String(x) +
            '0.' +
            new Array(e).join('0') +
            x.toString().substring(2);
        }
      } else {
        var e = parseInt(x.toString().split('+')[1]);
        if (e > 20) {
          e -= 20;
          x /= Math.pow(10, e);
          xString = String(x) + new Array(e + 1).join('0');
        }
      }
      return xString;
    };
    var toFixed = prototype.toFixed;
    prototype.toFixed = function (fractionDigits) {
      var split = fixScientificNotationToString(this as number)
        .toString()
        .split('.');
      var number = +(!split[1]
        ? split[0]
        : split.join('.') + ((split[1].length > fractionDigits! && '1') || ''));
      return toFixed.call(number, fractionDigits);
    };
  })(Number.prototype);
