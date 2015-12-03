  var currentMousePos = {
      x: -1,
       y: -1
   };
   var rotation = 0;
   var cont = 0;
   var menos = {
      x: 90,
     y: 100
   };
   var lightsaberzindex=100;
   var lightsaberAudioOn=1;

    var lightsaber =  document.createElement("IMG");
    lightsaber.style.zIndex=lightsaberzindex;
    lightsaber.setAttribute("src",  safari.extension.baseURI +"img/lightsaber.png");
    lightsaber.setAttribute("class","lightsaber");
    lightsaber.style.display="none";

    function handleMessage(msgEvent) {
        var messageName = msgEvent.name;
        var messageData = msgEvent.message;
        if (messageName === "toggle") {
            if (messageData === "stop") {
                stopIt();
            }
            if (messageData === "start") {
                startIt();
            }
        }
    }

    safari.self.addEventListener("message", handleMessage, false);

  function startIt(){

      var lightsaberAudioSrc=  safari.extension.baseURI +"audio/sthswng1.WAV";
      var audio = new Audio(lightsaberAudioSrc);

      var lightsaberAudioSrc1=  safari.extension.baseURI +"audio/saberon.wav";
      var audio1 = new Audio(lightsaberAudioSrc1);

	  audio1.play();

      document.body.insertBefore(lightsaber, document.body.firstChild);

      document.body.onmousemove = function(event){
          	    lightsaber.style.display="block";
            		var lastcurrentx = currentMousePos.x;
            		var lastcurrenty = currentMousePos.y;
            		currentMousePos.x = event.pageX;
            		currentMousePos.y = event.pageY;

            		var rotationSpeed = Math.floor(Math.abs(lastcurrentx - currentMousePos.x));

            		if (rotation < 130) {
            		    if (rotationSpeed > 15)
            		    {
            		    	if(lightsaberAudioOn==1)
            				audio.play();
            		    }
            		    if (lastcurrentx < currentMousePos.x)
            		    {
            				rotation += rotationSpeed;
            				if(rotation>130)rotation=130;
            				menos.x = 10;
            				menos.y = 80;
            			}
            		}
            		if (rotation > 0)
            		{
            			if (rotationSpeed > 15)
            		    {
            		    	if(lightsaberAudioOn==1)
            				audio.play();
            		    }
            		    if (lastcurrentx > currentMousePos.x)
            		    {
            				rotation -= rotationSpeed;
            				if(rotation<0)rotation=0;
            				menos.x = 90;
            				menos.y = 100;
            			}
            		}

            			lightsaber.style.position="absolute";
            			lightsaber.style.top=(currentMousePos.y - menos.y)+"px" ;
            			lightsaber.style.left=(currentMousePos.x - menos.x)+"px";

            			if ((cont % 7) == 0) {
            			    lightsaber.style.webkitTransform="rotate(" + rotation + "deg)";

            		}

      }

    }

    function stopIt(){
      var lightsaberAudioSrc1 =  safari.extension.baseURI +"audio/saberoff.wav";
      var audio1 = new Audio(lightsaberAudioSrc1);
      audio1.play();

      document.body.removeChild(lightsaber);
      audio = null;
      document.body.onmousemove = null;
    }
