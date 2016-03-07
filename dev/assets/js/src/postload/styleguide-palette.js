
/* JSHINT will throw a superfluous warning on line 120, 122. No effect on
   operation. The "Expected an assignment or function call and instead saw
   an expression."  warns that there is a line of code that doesn't do anything
   is included. Indeed, the functions do not return a value nor assign anything.
   They simply operate on the DOM. Soooo.... include the following directive
   to shut this warning down. */

/*jshint -W030 */

var c, colors, el, getTextColorForBackground, h, hd, hex, i, itemElsToAppend, j, len, name, palette, paletteElement, pc, w, weight;
palette = {
    Blue: {
    	50: "#E4F0F6",
    	100: "#BCD9EA",
    	200: "#8BBDD9",
    	300: "#5BA4CF",
    	400: "#298FCA",
    	500: "#0079BF",
    	600: "#026AA7",
    	700: "#055A8C",
    	800: "#094C72",
    	900: "#0C3953"
    },
    Green: {
    	50: "#EEF6EC",
    	100: "#D6ECD2",
    	200: "#B7DDB0",
    	300: "#99D18F",
    	400: "#7BC86C",
    	500: "#61BD4F",
    	600: "#5AAC44",
    	700: "#519839",
    	800: "#49852E",
    	900: "#3F6F21"
    },
    Orange: { 50: "#FDF5EC", 100: "#FCE8D2", 200: "#FAD8B0", 300: "#FDC788", 400: "#FFB968", 500: "#FFAB4A", 600: "#E99E40", 700: "#D29034", 800: "#BB8129", 900: "#A0711C" },
    Red: {
        50: "#FBEDEB",
        100: "#F5D3CE",
        200: "#EFB3AB",
        300: "#EC9488",
        400: "#EF7564",
        500: "#EB5A46",
        600: "#CF513D",
        700: "#B04632",
        800: "#933B27",
        900: "#6E2F1A"
    },
    Yellow: {
    	50: "#FDFAE5",
    	100: "#FAF3C0",
    	200: "#F5EA92",
    	300: "#F3E260",
    	400: "#F5DD29",
    	500: "#F2D600",
    	600: "#E6C60D",
    	700: "#D9B51C",
    	800: "#CCA42B",
    	900: "#BD903C"
    },
    Sky: {
    	50: "#E4F7FA",
    	100: "#BDECF3",
    	200: "#8FDFEB",
    	300: "#5DD3E5",
    	400: "#29CCE5",
    	500: "#00C2E0",
    	600: "#00AECC",
    	700: "#0098B7",
    	800: "#0082A0",
    	900: "#006988"
    },
    Lime: {
    	50: "#ECFBF3",
    	100: "#D3F6E4",
    	200: "#B3F1D0",
    	300: "#90ECC1",
    	400: "#6DECA9",
    	500: "#51E898",
    	600: "#4FD683",
    	700: "#4DC26B",
    	800: "#4CAF54",
    	900: "#4A9839"
   	},
    Gray: {
    	50: "#F8F9F9",
    	100: "#EDEFF0",
    	200: "#E2E4E6",
    	300: "#D6DADC",
    	400: "#CDD2D4",
    	500: "#C4C9CC",
    	600: "#B6BBBF",
    	700: "#A5ACB0",
    	800: "#959DA1",
    	900: "#838C91"
    },
    "Dark Blue": {
        50: "#EDEFF4",
        100: "#D2D7E5",
        200: "#B2B9D0",
        300: "#838FB5",
        400: "#6170A1",
        500: "#42548E",
        600: "#3E4D80",
        700: "#3A476F",
        800: "#36405F",
        900: "#30364C"
    }
};

getTextColorForBackground = function(a) {
    var b, d;
   /^#/.test(a) && (a = a.substring(1));
    d = parseInt(a.substr(0, 2), 16);
    b = parseInt(a.substr(2, 2), 16);
    a = parseInt(a.substr(4, 2), 16);
    return 128 > (299 * d + 587 * b + 114 * a) / 1E3 ? "#fff" : "inherit";
};

paletteElement = document.getElementsByClassName("js-fill-palette")[0];

for (name in palette) {
    colors = palette[name];
    i = document.createElement("div");
    i.className = "palette-item";
    itemElsToAppend = [];
    for (weight in colors) hex = colors[weight], c = document.createElement("div"), c.className = "palette-item-color", c.style.backgroundColor = hex, c.style.color = getTextColorForBackground(hex), w = document.createElement("p"), w.className = "palette-item-color-weight", w.innerHTML = weight, h = document.createElement("p"), h.className = "palette-item-color-hex", h.innerHTML = hex, c.appendChild(w), c.appendChild(h),
        itemElsToAppend.push(c), "500" === weight && (pc = document.createElement("div"), pc.className = "palette-item-color", pc.style.backgroundColor = hex, pc.style.color = getTextColorForBackground(hex), hd = document.createElement("p"), hd.className = "palette-item-color-header", hd.innerHTML = name, w = document.createElement("p"), w.className = "palette-item-color-weight", w.innerHTML = weight + " (Primary)", h = document.createElement("p"), h.className = "palette-item-color-hex", h.innerHTML = hex, pc.appendChild(hd), pc.appendChild(w), pc.appendChild(h),
            itemElsToAppend.unshift(pc));
    j = 0;
    for (len = itemElsToAppend.length; j < len; j++) el = itemElsToAppend[j], i.appendChild(el);
    paletteElement.appendChild(i);
}
