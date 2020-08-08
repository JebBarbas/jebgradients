/* En este objeto se guardan los estilos de los mensajes y los links de los degradados */
const jebgradients_const = {
    link: 'https://raw.githubusercontent.com/ghosh/uiGradients/master/gradients.json',
    cssSuccess: 'color:lime;font-weight:bold;font-size:1rem;display:block',
    cssSuccessText: 'color:lightgreen;display:block',
    cssError: 'color:red;font-weight:bold;font-size:1rem;display:block',
    cssErrorText: 'color:pink;display:block',
    cssWarn: 'color:gold;font-weight:bold;font-size:1rem;display:block',
    cssWarnText: 'color:lightyellow;display:block',
};
/* Con esta clase se harán todas las 'operaciones' de degradados */
class Gradient{
    constructor(type = '', direction = '', colors = 'transparent,transparent', repeat = false){
        this.type = this.validateType(type);
        this.direction = this.validateDirection(direction,this.type);
        this.colors = this.validateColors(colors);
        this.repeat = this.validateRepeat(repeat);
        this.prefixes = ['','-moz-','-webkit-','-o-'];
    };

    /* Se asegura que el tipo solo sea o 'linear' o 'radial' */
    validateType = (type = '') => {
        type = type.trim();
        if(type === 'linear' || type === 'radial' || type === 'preradial'){ return type; }
        else { return 'linear' }
    };

    /* Se asegura se que solo haya direcciones que empiecen con 'to ' o que terminen en 'deg' */
    validateDirection = (direction = '', type = '') => {
        direction = direction.trim();
        if(type === 'linear'){
            if(direction.startsWith('to ')){ return direction; }
            else if(direction.endsWith('deg')){ return direction; }
            else {return `to ${direction}`; }
        }
        else if(type === 'radial'){
            /* Este if verifica si la dirección es la que se agrega por default en la funcion jebgradients_apply(); */
            if(direction === 'right'){
                return 'circle'
            }
            else{
                return direction;
            }
        }
        else if(type === 'preradial'){
            /* Aqui se hace un switch en base al estilo predefinido */
            switch(direction){
                case 'top-left': return 'ellipse farthest-corner at 0% 0%';
                case 'top-center': return 'ellipse farthest-corner at 50% 0%';
                case 'top-right': return 'ellipse farthest-corner at 100% 0%';

                case 'center-left': return 'ellipse farthest-corner at 0% 50%';
                case 'center-center': return 'ellipse farthest-corner at 50% 50%';
                case 'center-right': return 'ellipse farthest-corner at 100% 50%';

                case 'bottom-left': return 'ellipse farthest-corner at 0% 100%';
                case 'bottom-center': return 'ellipse farthest-corner at 50% 100%';
                case 'bottom-right': return 'ellipse farthest-corner at 100% 100%'; 

                default: return 'ellipse farthest-corner at 0% 0%';
            }
        }
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

        if(this.type === 'linear'){
            /* Se hace un estilo para cada navegador de acuerdo a this.prefixes */
            this.prefixes.forEach(prefix => {
                gradientString += `background:${prefix}${this.repeat}linear-gradient(${this.direction},${this.colors}) !important;`;
            });
        }
        else if(this.type === 'radial' || this.type === 'preradial'){
            this.prefixes.forEach(prefix => {
                gradientString += `background:${prefix}${this.repeat}radial-gradient(${this.direction},${this.colors}) !important;`;
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
/* Funcion que aplica los degradados a cada elemento con la clase jebg
Tambien usa el JSON de ui-gradients para aplicar un degradado de estos */
const jebgradients_apply = () => {
    let totalErrors = 0;
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
            totalErrors++;
            console.error(`%cError❌ %cThis element contains both jebg-colors and jebg-ui, please write only one of these in %c${htmlEl.outerHTML}`,jebgradients_const.cssError,jebgradients_const.cssErrorText,jebgradients_const.cssErrorText);
        }
    });

    const allElementsWithuiGradients = document.querySelectorAll('*[jebg-ui]');
    allElementsWithuiGradients.forEach(htmlEl => {
        /* Verifica si no contiene el otro atributo de color, si lo tiene marca error */
        if(!htmlEl.getAttribute('jebg-colors')){
            const j_type = htmlEl.getAttribute('jebg-type') || 'linear';
            const j_dir = htmlEl.getAttribute('jebg-dir') || 'right';
            const j_uiName = htmlEl.getAttribute('jebg-ui').trim() || '*random*';
            const j_repeat = (htmlEl.getAttribute('jebg-repeat')) ? true : false;

            /* Verifica si se ha especificado un nombre, sino, aplica un degradado random */
            if(j_uiName !== '*random*'){
                fetch(jebgradients_const.link).then(result => result.json()).then(uiGradients => {
                    let uiGradient = uiGradients.find(gradient => gradient.name == j_uiName);
                    if(uiGradient){
                        let uiColors = uiGradient.colors.join(); 
                        const deg = new Gradient(j_type,j_dir,uiColors,j_repeat);
                        htmlEl.setAttribute('style',Gradient.getStyle(htmlEl)+deg.gradient());
                    }
                    else{
                        totalErrors++;
                        console.error(`%cError❌ %cCannot find the uiGradient named: "${j_uiName}" in %c${htmlEl.outerHTML}. %cAre you sure that uiGradient exists and its well written?`,jebgradients_const.cssError,jebgradients_const.cssErrorText,jebgradients_const.cssErrorText,jebgradients_const.cssErrorText);
                    }
                });
            }
            else{
                fetch(jebgradients_const.link).then(result => result.json()).then(uiGradients => {
                    let randomNumber = Math.floor(Math.random() * uiGradients.length );
                    let randomGradient = uiGradients[randomNumber];

                    let uiColors = randomGradient.colors.join(); 
                    const deg = new Gradient(j_type,j_dir,uiColors,j_repeat);

                    console.log(`%c${randomGradient.name}`,'padding:.5rem;'+deg.gradient());
                    htmlEl.setAttribute('style',Gradient.getStyle(htmlEl)+deg.gradient());
                });
            }
        }
        else{
            totalErrors++;
            console.error(`%cError❌ %cThis element contains both jebg-colors and jebg-ui, please write only one of these in %c${htmlEl.outerHTML}`,jebgradients_const.cssError,jebgradients_const.cssErrorText,jebgradients_const.cssErrorText);
        }
    });
    /* Mensaje para avisar que los degradados han sido aplicados o ha habido errores */
    if(totalErrors == 0){
        console.log(`%cJebGradients Applied✔️ %cUse jebgradients_apply(); to recharge them. See the repo and documentation in: 'https://github.com/JebBarbas/jebgradients' `,jebgradients_const.cssSuccess,jebgradients_const.cssSuccessText);
    }
    else{
        console.warn(`%cJebGradients Failed⚠️ %cThere are ${totalErrors} error(s), please check and solve them. See the repo and documentation in: 'https://github.com/JebBarbas/jebgradients'`,jebgradients_const.cssWarn,jebgradients_const.cssWarnText);
    }
};
/* Realizar la función jebgradients_apply() una vez que el DOM esté cargado */
document.addEventListener('DOMContentLoaded',jebgradients_apply);
