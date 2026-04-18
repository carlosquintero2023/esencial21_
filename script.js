let carrito=[];
const numero="573143461537";
let productoActual=null;

const productos={
  facial:[
    {n:"THE ORDINARY NIACINAMIDA",p:60000,d:"Este producto es para la recuperacion de tu piel, elimina manchas y cierra tus poros",i:"imagenes/TONY.jpeg"},
    {n:"KIT DE BIOAQUA: SET CENTELLA ASIATICA",p:85000,d:"Perfecto para peiles con acne y rojez CONTIENE 6 PRODUCTOS son el JABON FACIAL, TONICO, CREMA FACIAL, CONTORNO DE OJOS, ESPUMA FACIAL, SERUM TODOS con el ingrediente estrella CENTELLA ASIATICA ",i:"imagenes/KBC.jpeg"}
    
  ],
  capilar:[
    {n:"TONICO CAPILAR",p:65000,d:"Crecimiento del cabello, sedosidad y volumen en tu cuero cabelludo",i:"imagenes/TONICO DE L.jpeg"},
    {n:"KIT DE FRENCHS GOLD",p:90000,d:"Este KIT DE FRENCH GOLD es ideal poara cabellos que han sido maltratados; PORQUE TIENEN TODOS SUS PRODUCTOS VITAMINAS Y MINERALES contiene SHAMPOO, ACONDICIONADOR Y TERMOPROCTECTOR",i:"imagenes/french gold.jpeg"}
  ],
  ofertas:[
    {n:"COMBO DE THE ORDINARY",p:85000,d:"​Transforma tu rostro con este kit de alta eficacia. La combinación perfecta entre ciencia y bienestar para eliminar imperfecciones, suavizar texturas y recuperar el brillo natural de tu piel. El kit incluye ​peeling Solution.  ​Ácido Hialurónico, Parches para ojos, Mascarilla Salicílica: Poros limpios",i:"imagenes/combo de TO/kit.jpeg"}
  ]
};

/* RENDER */
function render(sec){
  let cont=document.getElementById(sec);
  productos[sec].forEach(p=>{
    cont.innerHTML+=`
    <div class="producto">
      <img src="${p.i}" onclick='verProducto(${JSON.stringify(p)})'>
      <h3>${p.n}</h3>
      <p>${p.d}</p>
      <p class="precio">$${p.p}</p>
      <button class="btn-carrito" onclick='add(${JSON.stringify(p)})'>Agregar</button>
      <button class="btn-whatsapp" onclick="wa('${p.n}',${p.p})">WhatsApp</button>
    </div>`;
  });
}
Object.keys(productos).forEach(render);

/* MODAL */
function verProducto(p){
  productoActual=p;
  document.getElementById("modal").style.display="block";
  document.getElementById("modal-img").src=p.i;
  document.getElementById("modal-nombre").textContent=p.n;
  document.getElementById("modal-desc").textContent=p.d;
  document.getElementById("modal-precio").textContent="$"+p.p;
}

function cerrarModal(){
  document.getElementById("modal").style.display="none";
}

function comprarModal(){
  wa(productoActual.n,productoActual.p);
}

/* CARRITO */
function add(p){carrito.push(p);update();}

function update(){
  let lista=document.getElementById("lista-carrito");
  let total=0;
  lista.innerHTML="";
  carrito.forEach(p=>{
    lista.innerHTML+=`<li>${p.n}</li>`;
    total+=p.p;
  });
  document.getElementById("total").textContent=total;
  document.getElementById("contador").textContent=carrito.length;
}

/* WHATSAPP */
function wa(n,p){
  let m=`Hola quiero comprar ${n} $${p}`;
  window.open(`https://wa.me/${numero}?text=${encodeURIComponent(m)}`);
}

function enviarCarritoWhatsApp(){
  let m="Pedido:\n";
  let total=0;
  carrito.forEach((p,i)=>{
    m+=`${i+1}. ${p.n} - $${p.p}\n`;
    total+=p.p;
  });
  m+=`Total: $${total}`;
  window.open(`https://wa.me/${numero}?text=${encodeURIComponent(m)}`);
}

function abrirWhatsApp(){
  window.open(`https://wa.me/${numero}`);
}

/* BUSCADOR */
function filtrar(){
  let txt=document.getElementById("buscador").value.toLowerCase();
  document.querySelectorAll(".producto").forEach(e=>{
    e.style.display=e.innerText.toLowerCase().includes(txt)?"block":"none";
  });
}
