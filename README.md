# Jebgradients
Apply gradients in the background of your elements fast and easy, without touching any CSS or JS.  

## Diferences Between jebgradients.js and jebgradients.min.js
- jebgradients.js is formatted, commented and have significant names in variables. (Good for know how works and add custom gradients)
- jebgradients.min.js is in one line, weights less, variables are like a, g, aC, etc. (Faster, good for only use it)

## How To Use - Download
You can download the file you prefer (.js or .min.js) directly, copying the code and pasting it in your proyect or add the jsDelivr CDN (.js or .min.js, you pick)

~~~html
<script src="https://cdn.jsdelivr.net/gh/jebbarbas/jebgradients/jebgradients.js"></script>
<script src="https://cdn.jsdelivr.net/gh/jebbarbas/jebgradients/jebgradients.min.js"></script>
~~~
You can put the `<script>` in the `<head>` or `<body>`, it doesn't matter 'cause I put the gradients using the 'DOMContentLoaded' event.
'
## How To Use - Quick Start
- Download the file and in your code add a `<script src="">` pointing to it.
- Write the element you want to apply the grandient (a `<div>` for example).
- In the attribute class add the atribute "jebg-colors".
- In this attribute put in its value the colors you want in the gradient separated with a ','.
- Ready.
  
## How To Use - With uiGradients
- Erase the jebg-colors attribute in the element.
- Add the attribute jebg-ui.
- Put in its value the name of a uiGradient (JShine for instance).
- Ready

## Examples
~~~
<div jebg-colors="red,magenta">Gradient from red to magenta</div>
<div jebg-colors="#ae42bd,#ffb4bf">Gradient from #ae42bd to #ffb4bf</div>
<div jebg-colors="#ae42bd,magenta,red,#ffb4bf">Gradient from #ae42bd then magenta then red to #ffb4bf</div>
<div jebg-ui="JShine">Gradient JShine from uiGradients.com</div>
~~~

## Full Documentation
For a detailed guide about how to use jebgradients.js see the file jebgradients.pdf
