function setup() {
    canvas = createCanvas(300, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    classfier= ml5.imageClassifier('MobileNet',modelLoaded);
  }
  function modelLoaded(){
    console.log('model Loaded');
  }
  function draw(){
    image(video,0,0,300,300);
    classfier.classify(video,gotResults);
  }
  var previews_result='';
  function gotResults(error,results){
    if(error){
      console.error(error);
    }else{
      if({results[0].confidence>0.5}&&(previews_result!=results[0].label)){
        console.log(results);
        previews_result=results[0].label;
        var synthesis=windows.speechsSynthesis;
        speakDate='O objeto detectado é-'+results[0].label;
        var utterThiss=new speechSynthesisUtterance(speakDate);
        synthesis.speak(utterThiss);
        document.getElementById("resultsObjectName").innerHTML=results[0].label;
        document.getElementById("resultsObjectAccuracy").innerHTML=results[0].confidence.toFixed(3);
      }
    }
  }
  
  
  