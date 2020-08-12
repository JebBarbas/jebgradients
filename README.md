# Jebgradients
Apply gradients in the background of your elements fast and easy, without touching any CSS or JS.  

## Diferences Between jebgradients.js and jebgradients.min.js
- jebgradients.js is formatted, commented and have significant names in variables. (Good for know how works and add custom gradients).
- jebgradients.min.js is in one line and weights less (Faster, good for only use it).

## How To Use - Download
Download the file (.js or .min.js) and put it in your proyect, then add a `<script>` pointing to it.
~~~html
<script src="route/to/jebgradients.js"></script>
    OR
<script src="route/to/jebgradients.min.js"></script>
~~~


Or you can use the CDN provided by jsDelivr (.js or .min.js, you pick).
~~~html
<script src="https://cdn.jsdelivr.net/gh/jebbarbas/jebgradients/jebgradients.js"></script>
    OR
<script src="https://cdn.jsdelivr.net/gh/jebbarbas/jebgradients/jebgradients.min.js"></script>
~~~

You can put the `<script>` in the `<head>` or `<body>`, it doesn't matter 'cause I put the gradients using the 'DOMContentLoaded' event.

## How To Use - Quick Start
- Download the file and in your code add a `<script src="">` pointing to it.
- Write the element you want to apply the grandient (a `<div>` for example).
- In the attribute class add the atribute "jebg-colors".
- In this attribute put in its value the colors you want in the gradient separated with a ','.
- Ready.
  
## How To Use - With uiGradients
- Erase the jebg-colors attribute in the element.
- Add the attribute jebg-ui.
- Put in its value the name of an uiGradient (JShine for instance).
- Or put $random$ for a random gradient.
- Ready.

## How To Use - With jebGradients
- Erase the jebg-colors attribute.
- Add the attribute jebg-grad.
- Put in its value the name of a jebGradient (El Dorado for instance).
- Or put $random$ for a random gradient.
- Ready.

## Examples
~~~
<div jebg-colors="red,magenta">Gradient from red to magenta</div>
<div jebg-colors="#ae42bd,#ffb4bf">Gradient from #ae42bd to #ffb4bf</div>
<div jebg-colors="#ae42bd,magenta,red,#ffb4bf">Gradient from #ae42bd then magenta then red to #ffb4bf</div>
<div jebg-ui="JShine">Gradient JShine from uiGradients.com</div>
<div jebg-ui="$random$">This will result in a random uiGradient</div>
<div jebg-grad="El Dorado">El Dorado from gradients.json</div>
<div jebg-grad="*random*">This will result in a random jebGradient</div>
~~~

## Full Documentation
For a detailed guide about how to use jebgradients.js see the file jebgradients.pdf.
