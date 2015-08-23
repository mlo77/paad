// function Product(json) {
//     if (json == undefined)
//         json = VanillaProduct();
//     this.title = json.title;
//     this.desc = json.desc;
//     this.cat = json.cat;
//     this.gdr = json.gdr;
//     this.icons = makehash(json.icons);
//     this.price = json.price;
//     this.variants = clone(json.variants);
// }

function clone(a) {
    return JSON.parse(JSON.stringify(a));
}

// function makehash(list) {
//   var res = {};
//   for (var i=0; i<list.length; i++)
//     res[list[i]] = true;
//   return res;
// }

// function makelist(obj) {
//   var res = [];
//   for (var k in obj)
//     res.push(k);
//   return res;
// }

// function VanillaProduct() {
//     return {
//         title: '',
//         desc: '',
//         cat: '',
//         gdr: '',
//         icons: [],
//         price: 0,
//         variants: []
//     };
// }

// Product.prototype.addIcon = function(url) {
//     this.icons.push(url);
// }

// Product.prototype.toJSON = function() {
//     return {
//         title: this.title,
//         desc: this.desc,
//         cat: this.cat,
//         gdr: this.gdr,
//         icons: makelist(this.icons),
//         price: this.price,
//         variants: this.variants
//     };
// }

// Product.prototype.load = function() {
//     function fill(tag, d) {
//       document.getElementById(tag).value = d;
//     }

//     fill('desc',this.desc);
//     fill('title',this.title);
//     fill('price',this.price);
//     setGdr(this.gdr);
//     fill('cat',this.cat);
//     //currentProduct.icons = makehash(d.icons);
//     updateIconsSelection(this.icons, true);

//     for (var i=0; i<d.variants.length; i++) {
//     addVariant(i);
//     loadVariant(d.variants[i], i);
//     }
//     function loadVariant(dv, variant) {
//     if (dv.imgs) {
//       for (var i=0;i<dv.imgs.length;i++) {
//         showimg(dv.imgs[i], currentProduct.variants[variant]);
//       }
//     }
//     fill('qty'+variant,dv.qty);
//     fill('size'+variant,dv.size);
//     fill('color'+variant,dv.color);
//     }
// }


randomizer = {};
$.getJSON("/random.json", function(data){randomizer.data = data;});

randomizer.makeProd = function(cb) {
  function rnum (n, m) {
    if (m == undefined) m = 0;
    return Math.floor(Math.random() * n + m);
  }
  function rand(field) {
    return randomizer.data[field][rnum(randomizer.data[field].length)];
  }
  function getList(path, cb) {
    $.ajax({
      url: '/listres?path='+path,
      type: 'GET',
      success: function (data) {
        cb(data);
      }
    });
  }
  function randicons(p, cb) {
    getList('__d_icons', function(icons) {
      var j = (rnum(100) % 3);
      for (var i=0; i<=j; i++) {
        var r = rnum(icons.length)
        p.icons.push('__d_icons/'+icons[r]);
      }
      cb(p);
    });
  }
  function randvariant(p, cb) {
    getList('', function(imgs) {
      var nv = (rnum(100, 1) % 3) + 1;
      for (var u=0; u<=nv; u++) {
        p.variants.push({imgs:[]})
        var nimg = (rnum(100, 1) % 6);
        for (var i=0; i<=nimg; i++) {
          var r = rnum(imgs.length)
          p.variants[u].imgs.push(imgs[r]);
        }
        p.variants[u].color = rand('adjectives');

        p.variants[u].size = [];
        var nsiz = (rnum(100, 1) % 3) + 1;
        for (var k=0; k<nsiz; k++) {
          p.variants[u].size.push({
            qty : rnum(49, 1),
            label : rand('adjectives') // size label
          });
        }
      }
      cb(p);
    });
  }
  function done (p) {
    console.log(p);
    cb(p);
  }
  var prod = {icons:[], variants:[]};
  prod.title = rand('adjectives') + ' ' + rand('nouns');
  prod.desc = prod.title + ' ' + rand('verbs') + ' ' + rand('adjectives') + ' ' + rand('nouns');
  prod.price = rnum(49, 10);
  var j = rnum(100) % 3;
  prod.gdr = (j==0) ? 'boy' : (j==1)? 'girl' : 'any';
  j = rnum(100) % 3;
  prod.cat = (j==0) ? 'top' : (j==1)? 'outer' : 'bottom';
  randicons(prod, function(p){randvariant(p, done);});
};

randomizer.gogo = function(n) {
  for (var i=0; i<n; i++) {
    randomizer.makeProd(loadItem);
    addprod();
  }
}

// function setGdr(gdr) {
//   if (gdr == 'boy') {
//     document.getElementById('gdrb').checked = true;
//   }
//   else if (gdr == 'girl') {
//     document.getElementById('gdrg').checked = true;
//   }
//   else if (gdr == 'any') {
//     document.getElementById('gdra').checked = true;
//   }
// }

// addVariant = function(token) {
//   if (token == undefined) token = 0;

//   if (currentProduct.variants[token] == undefined) {
//     currentProduct.variants[token] = {imgs:{}, qty:0, size:'', color:'', cont:undefined};
//   }

//   var cont = $('<div></div>')
//     .appendTo('#variant')
//     .css('backgroundColor', colorscale(Math.random()));
//   $('<iframe></iframe>')
//     .attr('id', 'gallery'+token)
//     .attr('src', 'resbrowser.html?purpose=img&variant='+token)
//     .appendTo(cont);
//   function createInputField(label, token) {
//     $('<div></div>')
//       .text(label +': ')
//       .append($('<input>')
//         .attr('type', 'text')
//         .attr('id', label+token)
//         .append($('<br>'))
//       )
//       .appendTo(cont);
//   }
//   createInputField('qty', token);
//   createInputField('size', token);
//   createInputField('color', token);
//   currentProduct.variants[token].cont = cont;
//   return cont;
// }

// function updateIconsSelection(list) {
//   $('#gallerylaundry').contents()[0].contentWindow.updateSelection(list, true);
// }
