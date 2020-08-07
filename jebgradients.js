/* En este objeto se guardan los estilos de los mensajes y los links de los degradados */
const jebgradients_const = {
    link: 'https://raw.githubusercontent.com/ghosh/uiGradients/master/gradients.json',
    cssSuccess: 'color:lime;font-weight:bold;font-size:1rem;display:block',
    cssSuccessText: 'color:lightgreen;display:block',
    cssError: 'color:red;font-weight:bold;font-size:1rem;display:block',
    cssErrorText: 'color:pink;display:block'
}
/* Con esta clase se harán todas las 'operaciones' de degradados */
class Gradient{
    constructor(type = '', direction = '', colors = 'transparent,transparent', repeat = false){
        this.type = this.validateType(type);
        this.direction = this.validateDirection(direction);
        this.colors = this.validateColors(colors);
        this.repeat = this.validateRepeat(repeat);
        this.prefixes = ['','-moz-','-webkit-','-o-'];
    };

    /* Se asegura que el tipo solo sea o 'linear' o 'radial' */
    validateType = (type = '') => {
        type = type.trim();
        if(type == 'linear' || type == 'radial'){ return type; }
        else { return 'linear' }
    };

    /* Se asegura se que solo haya direcciones que empiecen con 'to ' o que terminen en 'deg' */
    validateDirection = (direction = '') => {
        direction = direction.trim();
        if(direction.startsWith('to ')){ return direction; }
        else if(direction.endsWith('deg')){ return direction; }
        else {return `to ${direction}`; }
    };

    /* Valida los colores */
    validateColors = (colors = '') => {
        colors = colors.trim();
        let arrayColors = colors.split(',');
        if(colors.startsWith(',')){
            arrayColors.shift();
        }
        if(colors.endsWith(',')){
            arrayColors.pop();
        }
        arrayColors = arrayColors.map(color => color.trim());
        return arrayColors.join();
    };

    /* Verifica si existe repeat o no */
    validateRepeat = (repeat = false) => {
        if(repeat){ return 'repeating-'}
        else {return ''};
    };

    /* En base al tipo regresa una cadena diferente */
    gradient = () => {
        let gradientString = '';

        if(this.type == 'linear'){
            /* Se hace un estilo para cada navegador de acuerdo a this.prefixes */
            this.prefixes.forEach(prefix => {
                gradientString += `background-image:${prefix}${this.repeat}linear-gradient(${this.direction},${this.colors}) !important;`;
            });
        }
        else if(this.type == 'radial'){
            this.prefixes.forEach(prefix => {
                gradientString += `background-image:${prefix}${this.repeat}radial-gradient(circle,${this.colors}) !important;`;
            });
        }            

        return gradientString;
    };

    /* Verifica el viejo estilo del elemento */
    static getStyle = (elemento = new Element()) => {
        let style = elemento.getAttribute('style');
        /* Si existe, verifica que termine con ';' para que no haya errores.
        Si no existe, devuelve un string vacio para no devolver null */
        if(style){
            let arrayStyle = style.split('');
            
            if(arrayStyle[arrayStyle.length - 1] != ';'){
                arrayStyle.push(';');
            }

            return arrayStyle.join('');
        }
        else{
            return '';
        }
    };
}
/* Funcion que aplica los degradados a cada elemento con la clase jebg */
/* Tambien usa el JSON de ui-gradients para aplicar un degradado de estos */
const jebgradients_apply = () => {
    const allElementsWithGradients = document.querySelectorAll('*[jebg-colors]');
    allElementsWithGradients.forEach(htmlEl => {
        /* Verifica si no contiene el otro atributo de color, si lo tiene marca error */
        if(!htmlEl.getAttribute('jebg-ui')){
            const j_type = htmlEl.getAttribute('jebg-type') || 'linear';
            const j_dir = htmlEl.getAttribute('jebg-dir') || 'right';
            const j_colors = htmlEl.getAttribute('jebg-colors') || 'transparent';
            const j_repeat = (htmlEl.getAttribute('jebg-repeat')) ? true : false;

            const deg = new Gradient(j_type,j_dir,j_colors,j_repeat);

            htmlEl.setAttribute('style',Gradient.getStyle(htmlEl)+deg.gradient());
        }
        else{
            console.log(`%cError❌ %cThis element contains both jebg-colors and jebg-ui, please write only one of these %c${htmlEl.outerHTML}`,jebgradients_const.cssError,jebgradients_const.cssErrorText,jebgradients_const.cssErrorText);
        }
    });

    const allElementsWithuiGradients = document.querySelectorAll('*[jebg-ui]');
    allElementsWithuiGradients.forEach(htmlEl => {
        /* Verifica si no contiene el otro atributo de color, si lo tiene marca error */
        if(!htmlEl.getAttribute('jebg-colors')){
            const j_type = htmlEl.getAttribute('jebg-type') || 'linear';
            const j_dir = htmlEl.getAttribute('jebg-dir') || 'right';
            const j_uiName = htmlEl.getAttribute('jebg-ui').trim() || 'transparent';
            const j_repeat = (htmlEl.getAttribute('jebg-repeat')) ? true : false;

            fetch(jebgradients_const.link).then(result => result.json()).then(uiGradients => {
                let uiGradient = uiGradients.find(gradient => gradient.name == j_uiName);
                if(uiGradient){
                   let uiColors = uiGradient.colors.join(); 
                   const deg = new Gradient(j_type,j_dir,uiColors,j_repeat);
                   htmlEl.setAttribute('style',Gradient.getStyle(htmlEl)+deg.gradient());
                }
                else{
                    console.log(`%cError❌ %cCannot find the uiGradient named: ${j_uiName}`,jebgradients_const.cssError,jebgradients_const.cssErrorText);
                }
            });
        }
        else{
            console.log(`%cError❌ %cThis element contains both jebg-colors and jebg-ui, please write only one of these %c${htmlEl.outerHTML}`,jebgradients_const.cssError,jebgradients_const.cssErrorText,jebgradients_const.cssErrorText);
        }
    });
    /* Mensaje para avisar que los degradados han sido aplicados */
    console.log('%cJebGradients Applied ✔️ %cUse jebgradients_apply(); to recharge them.',jebgradients_const.cssSuccess,jebgradients_const.cssSuccessText);
};
/* Realizar la función una vez que el DOM esté cargado */
document.addEventListener('DOMContentLoaded',jebgradients_apply);
