/* 
    Este arreglo servirá si quieres tener tus propios degradados.
    Para usarlo tienes que escribir un nuevo objeto con dos campos,
    name (string) y colorArray (array de strings).
    Ejemplo
    { name: 'rainbow', colorArray: ['red','yellow','orange','lime','cyan','blue','magenta']},
*/
const JEBGC = [
    { name: "rainbow", colorArray: ["red","orange","yellow","lime","cyan","blue","magenta"]},
    { name: "reverse-rainbow", colorArray: ["magenta","blue","cyan","lime","yellow","orange","red"]},
];
/* Clase Gradient, inputName es el color con el que se va a buscar e inputColors es un array con todos los colores que tendrá el gradiente Ejemplos: new Gradient('dosColoresGradient',[red,magenta]); new Gradient('tresColoresGradient',[red,orange,yellow]); new Gradient('cuatroColoresHex',['#0000aa','#00aa00','#00aaaa','#aa0000']); */ 
class Gradient{
    constructor(name, colors){
        this.name = name || "newGradient";
        this.colors = colors || ["transparent"];
    }
    gFirCol = ()=>(this.colors[0]);

    gLasCol = ()=>(this.colors[this.colors.length - 1]);

    gLinCol = ()=>{
        let linearColors = '';
        this.colors.forEach(color =>{
            linearColors += `,${color}`;
        });
        return linearColors;
    }

    /*  
        Regresa un string con los siguientes degradados
        Estilo de un solo color para navegadores antiguos
        Degradado -webkit-
        Degradado -moz-
        Degradado normal
        Filtro para IE 
    */
    gGra = ()=>(`background: ${this.gFirCol()} !important; background: -webkit-linear-gradient(to right${this.gLinCol()}) !important; background: linear-gradient(to right${this.gLinCol()}) !important; background: -moz-linear-gradient(to right${this.gLinCol()}) !important; filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="${this.gFirCol()}",endColorstr="${this.gLasCol()}",GradientType=1) !important; `);
    
}
jebgradients_apply = ()=>{
    /* Se guardan todos los elementos que contengan la clase jebg (Jeb barbas gradients, de eso se encarga querySelector(). */ 
    const allElementsWithGradient = document.querySelectorAll('*[class~="jebg"]');
    /* Se ejecuta un ciclo foreach que hará algo con cada elemento del arreglo de allElementsWithGradient. */ 
    allElementsWithGradient.forEach(elemento => {
        /* En esta variable se guarda un arreglo con los colores que se especifican en el atributo jebg, se usa el metodo split con parametro "-", por si se ponen varios colores. Si el atributo no existe, el array quedará indefinido */ 
        let arrayColores =
            elemento.attributes["jebg"] != undefined
                ? elemento.attributes["jebg"].value.split("-")
                : undefined;
        /* En esta variable se guarda lo que debería ser el nombre de uno de tus degradados personalizados. Si el atributo no existe, la variable se queda indefinida. */ 
        let customPattern =
            elemento.attributes["jebgc"] != undefined
                ? elemento.attributes["jebgc"].value
                : undefined;
        /* Si la variable de arrayColores está definida, se hará el degradado con el arreglo, sino, se evaluará si existe customPattern, en ese caso, se buscará un objeto en el array de JEBGC cuyo .name sea igual al valor dado, y se usara el arreglo de colorArray. Si no está definido ninguno, le falta definirlo y no se hará nada. */ 
        if (arrayColores) {
            /* En base al arreglo generado, se crea un nuevo objeto de la clase Gradient al que no se le pone nombre (porque no es necesario) y se le pasa el arreglo de colores. */ 
            let gradiente = new Gradient("",arrayColores);
            /* Por ultimo se le añade los estilos de la clase Gradient al elemento. Cuidado, si en tus reglas de hojas CSS no pones ; al final, puede ser que esto no funcione. */ 
            elemento.style += gradiente.gGra();
        } 
        else if (customPattern) {
            JEBGC.forEach((objPattern) => {
                if (objPattern.name == customPattern) {
                    /* En base al arreglo del objeto, se crea un nuevo objeto de la clase Gradient al que no se le pone nombre (porque no es necesario) y se le pasa el arreglo de colores. */ 
                    let gradiente = new Gradient("",objPattern.colorArray);
                    /* Por ultimo se le añade los estilos de la clase Gradient al elemento. Cuidado, si en tus reglas de hojas CSS no pones ; al final, puede ser que esto no funcione. */ 
                    elemento.style += gradiente.gGra();
                }
            });
        }
    });
    console.info('%cJebGradients Applied ✔ %cUse jebgradients_apply(); to recharge them.','color:lime;font-weight:bold;font-size:1rem;display:block','display:block;');
}
document.addEventListener('DOMContentLoaded', jebgradients_apply);