var amplitude = 1;
function printChart()
{  
  Plotly.plot('chartDiv', [{
    y: [],
    mode: 'lines+markers', 
    marker: {color: 'red', size: 10},
    line: {width: 4},
    type: 'scatter',
    name: 'sin(x)',
  }, {
    y: [],
    mode: 'lines+markers',
    marker: {color: 'blue', size:10},
    line: {width: 4},
    type: 'scatter',
    name: 'cos(x)',
  }],{
    yaxis: {fixedrange: true},
    xaxis : {fixedrange: true}
});
}

window.addEventListener('load', function () {
  printChart();
})

var source = new EventSource("http://vmzakova.fei.stuba.sk/sse/sse.php");
if(typeof(EventSource) !== "undefined") {
  source.onmessage = function(event) {
    let obj =  JSON.parse(event.data);
    Plotly.extendTraces('chartDiv', {
        y: [[amplitude*obj.y1],[amplitude*obj.y2]], 
      }, [0, 1]);
  };
} else {
  document.getElementById("result").innerHTML = "Sorry, your browser does not support server-sent events...";
}

function stopChart()
{
  source.close();
  Plotly.update('chartDiv', {}, {
    yaxis: {fixedrange: false},
    xaxis : {fixedrange: false},
  });
}

function sinCheck()
{
  if (document.getElementById("sin").checked)
  {
    Plotly.restyle('chartDiv', {
      opacity: 1,
    }, [0]);
  } else {
    Plotly.restyle('chartDiv', {
      opacity: 0,
    }, [0]);
  }
}

function cosCheck()
{
  if (document.getElementById("cos").checked)
  {
    Plotly.restyle('chartDiv', {
      opacity: 1,
    }, [1]);
  } else {
    Plotly.restyle('chartDiv', {
      opacity: 0,
    }, [1]);
  }
}

class ChartOptions extends HTMLElement  
{
   constructor() {
     super();
   }

connectedCallback() {
     this.style.color = 'blue';

     const template = document.querySelector('template');
     const clone = document.importNode(template.content, true);
     this.appendChild(clone);
   }
  
}
customElements.define('chart-options', ChartOptions);


function textAmplitude()
{
  if (document.getElementById("checkText").checked)
  {
    document.getElementById("text").style.display = "block";
  } else {
    document.getElementById("text").style.display = "none";
  }
  
}

function sliderAmplitude()
{
  if (document.getElementById("checkSlider").checked)
  {
    document.getElementById("slider").style.display = "block";
    document.getElementById("amount").style.display = "block";
  } else {
    document.getElementById("slider").style.display = "none";
    document.getElementById("amount").style.display = "none";
  }
}


function sliderAmplitudeApply()
{
  amplitude = document.getElementById("text").value;
  console.log("val: " + amplitude);
}

function AmplitudeApply(element)
{
  if (element.id == "text")
  {
    if (element.value <= 0 || element.value > 5)
    {
      alert("nah, that aint allowed -> (0;5>");
      return;
    }
    amplitude = document.getElementById("text").value;
    console.log("val: " + amplitude);
    document.getElementById("slider").value = amplitude;
  } else // slider changed
  {
    amplitude = document.getElementById("slider").value;
    console.log("val: " + amplitude);
    document.getElementById("text").value = amplitude;
  }

}
function updateTextInput(val) {
  document.getElementById('textInput').value=val; 
}