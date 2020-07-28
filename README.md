# Jebgradients
Apply gradients in the background of your elements fast and easy, without touching any CSS or JS.  

## Diferences Between jebgradients.js and jebgradients.min.js
- jebgradients.js is formatted, commented and have significant names in variables. (Good for know how works and add custom gradients)
- jebgradients.min.js is in one line, weights less, variables are like a, g, aC, etc. (Faster, good for only use it)

## How To Use - Download
You can download the file you prefer (.js or .min.js) directly, copying the code and pasting it in your proyect or add the jsDelivr CDN (.js or .min.js, you pick)

```html
<script src="https://cdn.jsdelivr.net/gh/jebbarbas/jebgradients/jebgradients.js"></script>
<script src="https://cdn.jsdelivr.net/gh/jebbarbas/jebgradients/jebgradients.min.js"></script>
```

You can put the `<script>` in the `<head>` or `<body>`, it doesn't matter 'cause I put the gradients using the 'DOMContentLoaded' event.

## How To Use - Quick Start
- Download the file and in your code add a `<script src="">` pointing to it.
- Write the element you want to apply the grandient (a `<div>` for example).
- In the attribute class add the class "jebg".
- Add a new attribute named jebg and in its value the colors you want in the gradient separated with a -.
- Ready.
  
## Examples
```html
<div class="jebg" jebg="red-magenta">Gradient from red to magenta</div>
<div class="jebg" jebg="#ae42bd-#ffb4bf">Gradient from #ae42bd to #ffb4bf</div>
<div class="jebg" jebg="#ae42bd-magenta-red-#ffb4bf">Gradient from #ae42bd then magenta then red to #ffb4bf</div>
```

## Full Documentation
For the newest versions and a detailed guide about how to use jebgradients.js [Here](https://jebbarbas.herokuapp.com/publicaciones/tutoriales/jebgradients).
