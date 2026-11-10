var cats=[{k:'all',n:'Tout',i:'✨'},{k:'makeup',n:'Maquillage',i:'💄'},{k:'skin',n:'Soins visage',i:'🧴'},{k:'body',n:'Corps & cheveux',i:'🌸'},{k:'parfum',n:'Parfums',i:'🌹'}];
var P=[
{id:1,n:'Rouge à lèvres Velours',c:'makeup',p:129,r:4.8,e:'💄',bg:'#e6a3b5'},
{id:2,n:'Fond de teint Peau Nue',c:'makeup',p:199,r:4.7,e:'🧴',bg:'#f0cfb4'},
{id:3,n:'Palette Yeux Nude 12',c:'makeup',p:179,r:4.9,e:'🎨',bg:'#d9b08c'},
{id:4,n:'Mascara Volume Intense',c:'makeup',p:99,r:4.6,e:'👁️',bg:'#c9b6c4'},
{id:5,n:'Sérum Vitamine C 30 ml',c:'skin',p:249,r:4.9,e:'💧',bg:'#f6d9a8'},
{id:6,n:'Crème Hydratante Acide Hyaluronique',c:'skin',p:189,r:4.8,e:'🫧',bg:'#cfe3ea'},
{id:7,n:'Nettoyant Doux Visage',c:'skin',p:89,r:4.7,e:'🧼',bg:'#d8e8d2'},
{id:8,n:'Écran Solaire SPF 50',c:'skin',p:159,r:4.8,e:'☀️',bg:'#fbe3a1'},
{id:9,n:'Huile d’Argan Pure 50 ml',c:'body',p:139,r:4.9,e:'🌿',bg:'#e4cf9c'},
{id:10,n:'Lait Corps Nourrissant',c:'body',p:99,r:4.6,e:'🌸',bg:'#f1d2dc'},
{id:11,n:'Eau de Parfum Rose Ambrée',c:'parfum',p:349,r:4.8,e:'🌹',bg:'#e3b7c4'},
{id:12,n:'Brume Parfumée Fleur d’Oranger',c:'parfum',p:119,r:4.7,e:'🍊',bg:'#f6dcc0'}];
var cart={},cur='all';
function el(i){return document.getElementById(i)}
function drawCats(){el('catlist').innerHTML=cats.map(function(c){return '<button class="cat'+(c.k===cur?' on':'')+'" onclick="setCat(\''+c.k+'\')"><span>'+c.i+'</span>'+c.n+'</button>'}).join('')}
function setCat(k){cur=k;drawCats();drawGrid();el('shoptitle').textContent=k==='all'?'Tous nos produits':cats.filter(function(c){return c.k===k})[0].n;el('shop').scrollIntoView()}
function drawGrid(){el('grid').innerHTML=P.filter(function(p){return cur==='all'||p.c===cur}).map(function(p){return '<div class="card"><div class="pic" style="background:'+p.bg+'">'+p.e+'</div><div class="info"><span class="tag">'+cats.filter(function(c){return c.k===p.c})[0].n+'</span><span class="name">'+p.n+'</span><span class="rate">★ '+p.r+'</span><span class="price">'+p.p+' MAD</span><button onclick="add('+p.id+')">Ajouter au panier</button></div></div>'}).join('')}
function add(id){cart[id]=(cart[id]||0)+1;drawCart();el('drawer').classList.add('open')}
function chg(id,d){cart[id]=(cart[id]||0)+d;if(cart[id]<=0)delete cart[id];drawCart()}
function toggle(){el('drawer').classList.toggle('open')}
function drawCart(){var t=0,n=0,h='';P.forEach(function(p){var q=cart[p.id];if(q){t+=p.p*q;n+=q;h+='<div class="row"><span>'+p.n+'<br><small>'+p.p+' MAD</small></span><span class="qty"><button onclick="chg('+p.id+',-1)">−</button> '+q+' <button onclick="chg('+p.id+',1)">+</button></span></div>'}});
el('items').innerHTML=h||'<p class="sub">Votre panier est vide.</p>';el('count').textContent=n;el('total').textContent=t+' MAD';
el('ship').textContent=t===0?'':(t>=300?'Livraison gratuite débloquée ✔':'Plus que '+(300-t)+' MAD pour la livraison gratuite')}
drawCats();drawGrid();drawCart();
