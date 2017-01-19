
var themes = {
  "default": {
    "body": {
      "background-color": "rgb(6, 14, 38)",
      "color": "rgb(242, 221, 159)",
      "font-family": "King"
    },
    ".notes": {
      // not today
      // "normal" :{
        "background-color": "rgb(6, 14, 38)",
        "color": "rgb(242, 221, 159)",
        "font-family": "King"
      // }
    },
    ".quote": {
      "font-family": "Colleged",
      "color": "rgb(187, 42, 77)",
      "text-shadow": "1px 1px 1px navajowhite"
    }
  }
};
var settingsObject = {
	"settings": {
    "body": {
      "data": ["lastOpen"]
    },
		".life-span": {
			"active": "false",
			"parentType": "span",
			"class": "life-span",
      "data": ["daysLeft"],
			"id": "life"
		},
		".link-number": {
			"active": "true",
			"elementType": "span",
      "data": ["addresses"],
			"class": "link-number",
			"id": ""
		},
		".links": {
			"active": "true",
      "data": ["links", "linkTitles"],
			"parentType": "ul",
      "elementType": "li",
			"class": "links",
			"id": "linkParent"
		},
		".notes": {
			"active": "true",
			"parentType": "span",
			"contenteditable": "true",
      "data": ["text"],
			"spellcheck": "false",
			"class": "notes",
			"id": "noteSpace"
		},
		".quote": {
			"active": "true",
			"parentType": "quote",
      "data": ["quote"],
			"class": "quote",
			"contenteditable": "true",
			"id": "quote"
		}
	}
};
