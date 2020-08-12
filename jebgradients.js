/* En este objeto se guardan los estilos de los mensajes y los links de los degradados */
const jebgradients_const = {
    link: 'https://raw.githubusercontent.com/ghosh/uiGradients/master/gradients.json',
    link_j: 'https://cdn.jsdelivr.net/gh/jebbarbas/jebgradients/gradients.json',
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
                case 'top-left': return 'at 0% 0%';
                case 'top-center': return 'at 50% 0%';
                case 'top-right': return 'at 100% 0%';

                case 'center-left': return 'at 0% 50%';
                case 'center-center': return 'at 50% 50%';
                case 'center-right': return 'at 100% 50%';

                case 'bottom-left': return 'at 0% 100%';
                case 'bottom-center': return 'at 50% 100%';
                case 'bottom-right': return 'at 100% 100%'; 

                default: return 'at 0% 0%';
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

    /* En base al tipo regresa un array de strings diferente */
    gradient = () => {
        let gradientArray = [];

        if(this.type === 'linear'){
            /* Se hace un estilo para cada navegador de acuerdo a this.prefixes */
            this.prefixes.forEach(prefix => {
                gradientArray.push(`${prefix}${this.repeat}linear-gradient(${this.direction},${this.colors})`);
            });
        }
        else if(this.type === 'radial' || this.type === 'preradial'){
            this.prefixes.forEach(prefix => {
                gradientArray.push(`${prefix}${this.repeat}radial-gradient(${this.direction},${this.colors})`);
            });
        }            
        return gradientArray;
    };

    /* Funcion para aplicar el degradado a un elemento */
    static apply = (element,objGradient = new Gradient()) => {
        /* Se crea un array con todos los posibles estilos en base a los prefijos */
        const backgroundArray = objGradient.gradient();
        /* Para cada prefijo se le asigna al background del elemento
        si la propiedad es invalida, no se aplica, BTW: solo se aplica 1 */
        backgroundArray.forEach(background => {
            element.style.background = background;
        });
    };

    /* Sirve para obtener el background de un elemento en los logs de random */
    static getBackground = element => {
        return `background:${element.style.background}`;
    };
}
/* Funcion que aplica los degradados a cada elemento con la clase jebg
Tambien usa el JSON de ui-gradients para aplicar un degradado de estos */
const jebgradients_apply = () => {
    /* Funcion que busca entre un element todos los atributos de color, excepto uno(only)
    devuelve true si no existen los demas y false si se encuentran */
    let totalErrors = 0;
    const isOnlyIn = (only = '',element) => {
        if(only == 'jebg-ui'){
            if(!element.getAttribute('jebg-colors') && !element.getAttribute('jebg-grad')){
                return true;
            }
            return false;
        }
        if(only == 'jebg-colors'){
            if(!element.getAttribute('jebg-ui') && !element.getAttribute('jebg-grad')){
                return true;
            }
            return false;
        }
        if(only == 'jebg-grad'){
            if(!element.getAttribute('jebg-colors') && !element.getAttribute('jebg-ui')){
                return true;
            }
            return false;
        }
        return true;
    };
    const allElementsWithGradients = document.querySelectorAll('*[jebg-colors],*[jebg-grad],*[jebg-ui]');
    allElementsWithGradients.forEach(htmlEl => {
        /* Verifica que atributo de color tiene */
        if(isOnlyIn('jebg-colors',htmlEl)){
            /* Se guardan los valores de los atributos del elemento */
            const j_type = htmlEl.getAttribute('jebg-type') || 'linear';
            const j_dir = htmlEl.getAttribute('jebg-dir') || 'right';
            const j_colors = htmlEl.getAttribute('jebg-colors') || 'transparent';
            const j_repeat = (htmlEl.getAttribute('jebg-repeat')) ? true : false;

            const gradient = new Gradient(j_type,j_dir,j_colors,j_repeat);

            Gradient.apply(htmlEl,gradient);
        }
        else if(isOnlyIn('jebg-grad',htmlEl)){
            const j_type = htmlEl.getAttribute('jebg-type') || 'linear';
            const j_dir = htmlEl.getAttribute('jebg-dir') || 'right';
            const j_jebName = htmlEl.getAttribute('jebg-grad').trim() || 'null';
            const j_repeat = (htmlEl.getAttribute('jebg-repeat')) ? true : false;

            /* Verifica si se ha especificado un nombre, sino, aplica un degradado random */
            if(j_jebName !== '$random$'){
                fetch(jebgradients_const.link_j).then(result => result.json()).then(jebGradients => {
                    let jebGradient = jebGradients.find(gradient => gradient.name == j_jebName);
                    if(jebGradient){
                        let jebColors = jebGradient.colors.join(); 
                        const gradient = new Gradient(j_type,j_dir,jebColors,j_repeat);

                        Gradient.apply(htmlEl,gradient);
                    }
                    else{
                        totalErrors++;
                        console.error(`%cError❌ %cCannot find the jebGradient named: "${j_jebName}" in %c${htmlEl.outerHTML}. %cAre you sure that jebGradient exists and its well written?`,jebgradients_const.cssError,jebgradients_const.cssErrorText,jebgradients_const.cssErrorText,jebgradients_const.cssErrorText);
                    }
                }).catch(err => {
                    totalErrors++;
                    console.error(`%cError❌ %c${err}, are you connected to internet and you can connect to ${jebgradients_const.link_j}? %c${htmlEl.outerHTML}`,jebgradients_const.cssError,jebgradients_const.cssErrorText,jebgradients_const.cssErrorText);
                });
            }
            else{
                fetch(jebgradients_const.link_j).then(result => result.json()).then(jebGradients => {
                    let randomNumber = Math.floor(Math.random() * jebGradients.length );
                    let randomGradient = jebGradients[randomNumber];

                    let jebColors = randomGradient.colors.join(); 
                    const gradient = new Gradient(j_type,j_dir,jebColors,j_repeat);

                    Gradient.apply(htmlEl,gradient);
                    console.log(`%c${randomGradient.name}`,'padding:.5rem;'+Gradient.getBackground(htmlEl));
                }).catch(err => {
                    totalErrors++;
                    console.error(`%cError❌ %c${err}, are you connected to internet and you can connect to ${jebgradients_const.link_j}? %c${htmlEl.outerHTML}`,jebgradients_const.cssError,jebgradients_const.cssErrorText,jebgradients_const.cssErrorText);
                });
            }
        }
        else if(isOnlyIn('jebg-ui',htmlEl)){
            const j_type = htmlEl.getAttribute('jebg-type') || 'linear';
            const j_dir = htmlEl.getAttribute('jebg-dir') || 'right';
            const j_uiName = htmlEl.getAttribute('jebg-ui').trim() || 'null';
            const j_repeat = (htmlEl.getAttribute('jebg-repeat')) ? true : false;

            /* Verifica si se ha especificado un nombre, sino, aplica un degradado random */
            if(j_uiName !== '$random$'){
                fetch(jebgradients_const.link).then(result => result.json()).then(uiGradients => {
                    let uiGradient = uiGradients.find(gradient => gradient.name == j_uiName);
                    if(uiGradient){
                        let uiColors = uiGradient.colors.join(); 
                        const gradient = new Gradient(j_type,j_dir,uiColors,j_repeat);

                        Gradient.apply(htmlEl,gradient);
                    }
                    else{
                        totalErrors++;
                        console.error(`%cError❌ %cCannot find the uiGradient named: "${j_uiName}" in %c${htmlEl.outerHTML}. %cAre you sure that uiGradient exists and its well written?`,jebgradients_const.cssError,jebgradients_const.cssErrorText,jebgradients_const.cssErrorText,jebgradients_const.cssErrorText);
                    }
                }).catch(err => {
                    totalErrors++;
                    console.error(`%cError❌ %c${err}, are you connected to internet and you can connect to ${jebgradients_const.link}? %c${htmlEl.outerHTML}`,jebgradients_const.cssError,jebgradients_const.cssErrorText,jebgradients_const.cssErrorText);
                });
            }
            else{
                fetch(jebgradients_const.link).then(result => result.json()).then(uiGradients => {
                    let randomNumber = Math.floor(Math.random() * uiGradients.length );
                    let randomGradient = uiGradients[randomNumber];

                    let uiColors = randomGradient.colors.join(); 
                    const gradient = new Gradient(j_type,j_dir,uiColors,j_repeat);

                    Gradient.apply(htmlEl,gradient);

                    console.log(`%c${randomGradient.name}`,'padding:.5rem;'+Gradient.getBackground(htmlEl));
                }).catch(err => {
                    totalErrors++;
                    console.error(`%cError❌ %c${err}, are you connected to internet and you can connect to ${jebgradients_const.link}? %c${htmlEl.outerHTML}`,jebgradients_const.cssError,jebgradients_const.cssErrorText,jebgradients_const.cssErrorText);
                });
            }
        }
        else{
            totalErrors++;
            console.error(`%cError❌ %cThis element contains two or more of this color-attributes: jebg-colors, jebg-ui or jebg-grad. Please write only one of these in %c${htmlEl.outerHTML}`,jebgradients_const.cssError,jebgradients_const.cssErrorText,jebgradients_const.cssErrorText);
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