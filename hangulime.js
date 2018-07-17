// HANGUL IME BY PERRY H
// TODO make the input of initial, medial and finals complete (currently only works with initials)

/*======================================
=======FIXED STACK IMPLEMENTATION=======
======================================*/

/**
 * A stack data structure containing a fixed amount of elements.
 * If the stack is full, the oldest elements are overwritten by newly added elements
 */
function FixedStack(stackSize) {
	this.size = stackSize;
	this.top = -1;
	this.stack = new Array(stackSize);
}

// Push an item onto the top of the stack
FixedStack.prototype.push = function(item) {
	this.top = (this.top + 1) % this.size;
	this.stack[this.top] = item;
	return false;
}

// Get the 1st element (top) in the stack
FixedStack.prototype.getTop = function() {
	return this.stack[this.top];
}

// Get the nth added element in the stack
FixedStack.prototype.nthTop = function(n) {
	if (n >= 0 && n < this.size) {
		var nIndex = this.top - n;
		return this.stack[(nIndex % this.size + this.size) % this.size];
	}
	return undefined;
}

// Print the contents of the stack, starting with the oldest elements and ending with the last
FixedStack.prototype.toString = function() {
	var res = "";
	for (var i = 0; i > (-this.size); i--) {
		var iAdjusted = ((i + this.top) % this.size + this.size) % this.size;
		var disp = (this.stack[iAdjusted] != undefined) ? this.stack[iAdjusted] : "";
		res = disp + res;
	}
	//res += "]";
	return res;
}

// DEBUGGING ONLY: Print the contents of the stack starting with the most recently pushed one
FixedStack.prototype.showContents = function() {
	var res = "";
	for (var i = 0; i > (-this.size); i--) {
		var iAdjusted = ((i + this.top) % this.size + this.size) % this.size;
		var disp = (this.stack[iAdjusted] != undefined) ? this.stack[iAdjusted] : "null";
		res += (disp + ",");
	}
	res += "]";
	return res;
}

/*======================================
===========JAMO INFORMATION=============
======================================*/

/*
 * A prototype that contains important jamo information
 */
function Jamo(parent, letter1, letter2) {
	// Mechanism: if letter2 is not defined, the jamo being defined is a medial vowel.
	// If the last argument is defined, the jamo being defined is a consonant:
	// letter1 is the initial form and letter2 is the final form (if present).
	l2isDefined = (typeof letter2 !== "undefined");
	this.initial = (l2isDefined) ? letter1 : undefined; // Initial form
	this.medial = (!l2isDefined) ? letter1 : undefined; // Medial form
	this.final   = (l2isDefined) ? letter2 : undefined; // Final form
	this.parent = parent; // The parent of this jamo (if it's composed of multiple jamos)
	this.decomposed = ""; // The decomposed form of this jamo
}

Jamo.prototype.setDecomposed = function(decomposed) {
	this.decomposed = decomposed;
}

Jamo.prototype.hasMultipleJamo = function() {
	return (this.parent != undefined);
}

/*======================================
========TESTING THE PROTOTYPES==========
======================================*/

// Test the FixedStack
function fixedStackTest() {
	var stacko = new FixedStack(5);
	console.log("STACKO TOP = " + stacko.getTop() + " " + stacko.toString());
	stacko.push("p");
	console.log("STACKO TOP = " + stacko.getTop() + " " + stacko.toString());
	stacko.push("a");
	console.log("STACKO TOP = " + stacko.getTop() + " " + stacko.toString());
	stacko.push("e");
	console.log("STACKO TOP = " + stacko.getTop() + " " + stacko.toString());
	stacko.push("s");
	console.log("STACKO TOP = " + stacko.getTop() + " " + stacko.toString());
	stacko.push("t");
	console.log("STACKO TOP = " + stacko.getTop() + " " + stacko.toString());
	stacko.push("m");
	console.log("STACKO TOP = " + stacko.getTop() + " " + stacko.toString());
	stacko.push("a");
	console.log("STACKO TOP = " + stacko.getTop() + " " + stacko.toString());
}

function jamoTest() {
	var jamo_o = new Jamo(undefined, 'ᅩ');
	var jamo_oi = new Jamo(jamo_o, 'ᅬ');
	var jamo_oa = new Jamo(jamo_o, 'ᅪ');
	var jamo_r = new Jamo(undefined, 'ᄅ', 'ᆯ');
	var jamo_rs = new Jamo(jamo_r, undefined, 'ᆳ');
	var jamo_rp = new Jamo(jamo_r, undefined, 'ᆲ');
	console.log("JAMOTEST1! " + jamo_oa.medial + jamo_oa.parent.medial);
	console.log("OA is composed of Multiple Jamos? " + jamo_oa.hasMultipleJamo());
	console.log("O is composed of Multiple Jamos? " + jamo_o.hasMultipleJamo());
	console.log("JAMOTEST2! " + jamo_r.initial + jamo_r.final);
	console.log("JAMOTEST2! " + jamo_rs.final + jamo_rs.parent.final);
	console.log("RS is composed of Multiple Jamos? " + jamo_rs.hasMultipleJamo());
	console.log("RP is composed of Multiple Jamos? " + jamo_rp.hasMultipleJamo());
	console.log("R is composed of Multiple Jamos? " + jamo_r.hasMultipleJamo());
}

fixedStackTest();
jamoTest();

/*======================================
========MAP OF ALL HANGUL JAMOS=========
======================================*/

var jamo_nil = undefined;
var jamo_g = new Jamo(jamo_nil, 'ᄀ', 'ᆨ');
var jamo_gs = new Jamo(jamo_g, undefined, 'ᆪ');
var jamo_kk = new Jamo(jamo_nil, 'ᄁ', 'ᆩ');
var jamo_n = new Jamo(jamo_nil, 'ᄂ', 'ᆫ');
var jamo_nj = new Jamo(jamo_n, undefined, 'ᆬ');
var jamo_nh = new Jamo(jamo_n, undefined, 'ᆭ');
var jamo_d = new Jamo(jamo_nil, 'ᄃ', 'ᆮ');
var jamo_tt = new Jamo(jamo_nil, 'ᄄ', undefined);
var jamo_r = new Jamo(jamo_nil, 'ᄅ', 'ᆯ');
var jamo_rg = new Jamo(jamo_r, undefined, 'ᆰ');
var jamo_rm = new Jamo(jamo_r, undefined, 'ᆱ');
var jamo_rb = new Jamo(jamo_r, undefined, 'ᆲ');
var jamo_rs = new Jamo(jamo_r, undefined, 'ᆳ');
var jamo_rt = new Jamo(jamo_r, undefined, 'ᆴ');
var jamo_rp = new Jamo(jamo_r, undefined, 'ᆵ');
var jamo_rh = new Jamo(jamo_r, undefined, 'ᆶ');
var jamo_m = new Jamo(jamo_nil, 'ᄆ', 'ᆷ');
var jamo_b = new Jamo(jamo_nil, 'ᄇ', 'ᆸ');
var jamo_bs = new Jamo(jamo_b, undefined, 'ᆹ');
var jamo_pp = new Jamo(jamo_nil, 'ᄈ', undefined);
var jamo_s = new Jamo(jamo_nil, 'ᄉ', 'ᆺ');
var jamo_ss = new Jamo(jamo_nil, 'ᄊ', 'ᆻ');
var jamo_ng = new Jamo(jamo_nil, 'ᄋ', 'ᆼ');
var jamo_j = new Jamo(jamo_nil, 'ᄌ', 'ᆽ');
var jamo_jj = new Jamo(jamo_nil, 'ᄍ', undefined);
var jamo_c = new Jamo(jamo_nil, 'ᄎ', 'ᆾ');
var jamo_k = new Jamo(jamo_nil, 'ᄏ', 'ᆿ');
var jamo_t = new Jamo(jamo_nil, 'ᄐ', 'ᇀ');
var jamo_p = new Jamo(jamo_nil, 'ᄑ', 'ᇁ');
var jamo_h = new Jamo(jamo_nil, 'ᄒ', 'ᇂ');

var jamo_a = new Jamo(jamo_nil, 'ᅡ');
var jamo_ae = new Jamo(jamo_nil, 'ᅢ');
var jamo_ya = new Jamo(jamo_nil, 'ᅣ');
var jamo_yae = new Jamo(jamo_nil, 'ᅤ');
var jamo_eo = new Jamo(jamo_nil, 'ᅥ');
var jamo_e = new Jamo(jamo_nil, 'ᅦ');
var jamo_yeo = new Jamo(jamo_nil, 'ᅧ');
var jamo_ye = new Jamo(jamo_nil, 'ᅨ');
var jamo_o = new Jamo(jamo_nil, 'ᅩ');
var jamo_oa = new Jamo(jamo_o, 'ᅪ');
var jamo_oae = new Jamo(jamo_o, 'ᅫ');
var jamo_oi = new Jamo(jamo_o, 'ᅬ');
var jamo_yo = new Jamo(jamo_nil, 'ᅭ');
var jamo_u = new Jamo(jamo_nil, 'ᅮ');
var jamo_ueo = new Jamo(jamo_u, 'ᅯ');
var jamo_ue = new Jamo(jamo_u, 'ᅰ');
var jamo_ui = new Jamo(jamo_u, 'ᅱ');
var jamo_yu = new Jamo(jamo_nil, 'ᅲ');
var jamo_eu = new Jamo(jamo_nil, 'ᅳ');
var jamo_eui = new Jamo(jamo_eu, 'ᅴ');
var jamo_i = new Jamo(jamo_nil, 'ᅵ');

var keypressesToJamos = new Map([
    ["r", jamo_g ],
    ["R", jamo_kk],
    ["s", jamo_n ],
    ["e", jamo_d ],
    ["E", jamo_tt],
    ["f", jamo_r ],
    ["a", jamo_m ],
    ["q", jamo_b ],
    ["Q", jamo_pp],
    ["t", jamo_s ],
    ["T", jamo_ss],
    ["d", jamo_ng],
    ["w", jamo_j ],
    ["W", jamo_jj],
    ["c", jamo_c ],
    ["z", jamo_k ],
    ["x", jamo_t ],
    ["v", jamo_p ],
    ["g", jamo_h ],

    ["k",  jamo_a  ],
    ["o",  jamo_ae ],
    ["i",  jamo_ya ],
    ["O",  jamo_yae],
    ["j",  jamo_eo ],
    ["p",  jamo_e  ],
    ["u",  jamo_yeo],
    ["P",  jamo_ye ],
    ["h",  jamo_o  ],
    ["hk", jamo_oa ],
    ["ho", jamo_oae],
    ["hl", jamo_oi ],
    ["y",  jamo_yo ],
    ["n",  jamo_u  ],
    ["nj", jamo_ueo],
    ["np", jamo_ue ],
    ["nl", jamo_ui ],
    ["b",  jamo_yu ],
    ["m",  jamo_eu ],
    ["ml", jamo_eui],
    ["l",  jamo_i  ],

    ["rt", jamo_gs],
    ["sw", jamo_nj],
    ["sg", jamo_nh],
    ["fr", jamo_rg],
    ["fa", jamo_rm],
    ["fq", jamo_rb],
    ["ft", jamo_rs],
    ["fx", jamo_rt],
    ["fv", jamo_rp],
    ["fg", jamo_rh],
    ["qt", jamo_bs],
]);

var initials = new Map([
	["r", 'ᄀ'],
	["R", 'ᄁ'],
	["s", 'ᄂ'],
	["e", 'ᄃ'],
	["E", 'ᄄ'],
	["f", 'ᄅ'],
	["a", 'ᄆ'],
	["q", 'ᄇ'],
	["Q", 'ᄈ'],
	["t", 'ᄉ'],
	["T", 'ᄊ'],
	["d", 'ᄋ'],
	["w", 'ᄌ'],
	["W", 'ᄍ'],
	["c", 'ᄎ'],
	["z", 'ᄏ'],
	["x", 'ᄐ'],
	["v", 'ᄑ'],
	["g", 'ᄒ']
]);


var medials = new Map([
	["k",  'ᅡ'],
	["o",  'ᅢ'],
	["i",  'ᅣ'],
	["O",  'ᅤ'],
	["j",  'ᅥ'],
	["p",  'ᅦ'],
	["u",  'ᅧ'],
	["P",  'ᅨ'],
	["h",  'ᅩ'],
	["hk", 'ᅪ'],
	["ho", 'ᅫ'],
	["hl", 'ᅬ'],
	["y",  'ᅭ'],
	["n",  'ᅮ'],
	["nj", 'ᅯ'],
	["np", 'ᅰ'],
	["nl", 'ᅱ'],
	["b",  'ᅲ'],
	["m",  'ᅳ'],
	["ml", 'ᅴ'],
	["l",  'ᅵ']
]);

var finals = new Map([
	["", ' '],
	["r",  'ᆨ'],
	["R",  'ᆩ'],
	["rt", 'ᆪ'],
	["s",  'ᆫ'],
	["sw", 'ᆬ'],
	["sg", 'ᆭ'],
	["e",  'ᆮ'],
	["f",  'ᆯ'],
	["fr", 'ᆰ'],
	["fa", 'ᆱ'],
	["fq", 'ᆲ'],
	["ft", 'ᆳ'],
	["fx", 'ᆴ'],
	["fv", 'ᆵ'],
	["fg", 'ᆶ'],
	["a",  'ᆷ'],
	["q",  'ᆸ'],
	["qt", 'ᆹ'],
	["t",  'ᆺ'],
	["T",  'ᆻ'],
	["d",  'ᆼ'],
	["w",  'ᆽ'],
	["c",  'ᆾ'],
	["z",  'ᆿ'],
	["x",  'ᇀ'],
	["v",  'ᇁ'],
	["g",  'ᇂ']
]);

// Check if this char is a Hangul Jamo initial
function isInitial(c) {
	return ('\u1100' <= c && c <= '\u1112');
}
// Check if this char is a Hangul Jamo medial
function isMedial(c) {
	return ('\u1161' <= c && c <= '\u1175');
}
// Check if this char is a Hangul Jamo final
function isFinal(c) {
	return ('\u11A8' <= c && c <= '\u11C2');
}

// Enum for storing current state
var state = {
	"NO_SYLLABLE": 1,
	"CV_SYLLABLE": 2,
	"CVC_SYLLABLE": 3,
	"NONE": 4,
};
Object.freeze(state);

var currentStatus = state.NO_SYLLABLE;
console.log("STATUS = " + currentStatus);

// IME input string
var input = "";

// The last 2 pressed keys (in ASCII format)
var last2PressedKeys = new FixedStack(2);

// The last char before the cursor
var lastChar = undefined;

// Change the state for every new character inputted
function changeStatus(cs, prevChar) {
	if (isFinal(prevChar) || prevChar === undefined) {
		cs = state.NO_SYLLABLE;
	} else if (isInitial(prevChar)) {
		cs = state.CV_SYLLABLE;
	} else if (isMedial(prevChar)) {
		cs = state.CVC_SYLLABLE;
	} else {
		cs = state.NONE;
	}

	return cs;
}

// Calculate the next Hangul jamo to insert/remove
function calculate(input, pressedKey, selStart, thisObject) {
	var lastNchars = (input.length < 2)
			? input.substring(0, selStart)
			: input.substring(selStart-2, selStart);
	lastChar = lastNchars.charAt(lastNchars.length-1);

	currentStatus = changeStatus(currentStatus, lastChar);

	last2PressedKeys.push(pressedKey);

	// Get current char
	// TODO Use the NAKD technique in HangulReplacer to decide whether consonant goes to previous or next syllable
	// TODO Use the new Jamo prototypes!
	var b = pressedKey;
	var character = undefined;
	if (currentStatus === state.NONE) {
		character = initials.get(b);
	}
	else if (currentStatus === state.NO_SYLLABLE) {
		character = initials.get(b);
	} else if (currentStatus === state.CV_SYLLABLE)  {
		character = medials.get(b);
	} else if (currentStatus === state.CVC_SYLLABLE) {
		character = finals.get(b);
	} else {
		character = b;
	}
	if (character === undefined) {
		character = b;
	}
	console.log("lastChar" + lastChar + " PressedKey=" + b
			+ " CHAR=" + character
			+ " last2PressedKeys=" + last2PressedKeys.toString()
			+ " isIni()=" + isInitial(character)
			+ " isMed()=" + isMedial(character)
			+ " isFin()=" + isFinal(character)
			+ " STATUS=" + currentStatus);

	// Insert character at cursor position
	var output = input.slice(0, selStart) + character + input.slice(selStart);
	console.log("LAST CHAR = " + input.charAt(selStart-1));
	console.log("INPUT =  '" + input + "'");
	console.log("OUTPUT = '" + output + "'");

	return output;
}

function doSomething(e, thisObject) {
	console.log("=================");

	// Get keycode of pressed key
	var keynum;
	if (window.event) { // IE
		keynum = e.keyCode;
	} else if (e.which) { // Netscape/Firefox/Opera
		keynum = e.which;
	}

	// Get the pressed key
	var pressedKey = String.fromCharCode(keynum);
	console.log("Pressed Key: -" + keynum + "- " + pressedKey);

	// Get the current cursor position
	var selStart = thisObject.selectionStart;
	var selEnd = thisObject.selectionEnd;
	console.log("START=" + selStart + " END=" + selEnd);

	// Disable inserting the char if it's an ASCII char or the Enter key
	if (keynum == 13 || (keynum >= 32 && keynum <= 126)) e.preventDefault();

	// Calculate the next Hangul jamo to be inserted, except if backspace is pressed
	if (keynum != 8 && keynum != undefined) {
		input = thisObject.value;
		thisObject.value = calculate(input, pressedKey, selStart, thisObject);
		thisObject.selectionEnd = selStart + 1; // resets cursor to previously known position
	}
}
