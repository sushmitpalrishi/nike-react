 function startExecution() {

     var videoCounter = 1;
     var bottomCopy = ["Press and hold to Explore","Swipe right to explore","Swipe left to explore","tap to explore"]
     var video1 = document.getElementById("gestureVideo");
     video1.oncanplay = function() {
         var preloaderScr = document.getElementById("preloader");
         preloaderScr.className += " " + "hide";
         console.log("can play!");

     }
     video1.onended = function() {
         setTimeout(function() {
             document.getElementById("cta").style.display = "block";
         }, 2000);
     };

     var gestureVar = document.getElementById('contentHolder');
     var hammerDetect = new Hammer(gestureVar);

     hammerDetect.on("panleft panright tap press", function(ev) {
         // gestureVar.textContent = ev.type + " gesture detected. Refresh page to try more gestures."
         //document.getElementById("landingImage").style.display = "none";

         console.log("gesture!");
         video1.play();

         var containerDiv = document.getElementById("contentHolder");
         if (!$("#contentHolder").hasClass("play show-frame-" + videoCounter)) {
             containerDiv.className += " " + "play show-frame-" + videoCounter;

             hammerDetect.off("panleft panright tap press", function(ev) {
                 console.log("gesture off!");
             });
         }

     });

     $("#restartBanner").click(function(e) {
         $("#contentHolder").removeClass("play show-frame-" + videoCounter);
         document.getElementById("cta").style.display = "none";
         videoCounter++;

         if(videoCounter == 5){
            videoCounter = 1;
         }
         $(".bottom-copy").html(bottomCopy[videoCounter-1]);
         video1.src = "";
         video1.src = "video/00" + videoCounter + ".mp4";
         $("#preloader").removeClass("hide");
         var video2 = document.getElementById("gestureVideo");
         hammerDetect.on("panleft panright tap press", function(ev) {
             video1.play();

             var containerDiv = document.getElementById("contentHolder");
             if (!$("#contentHolder").hasClass("play show-frame-" + videoCounter)) {
                 containerDiv.className += " " + "play show-frame-" + videoCounter;

                 hammerDetect.off("panleft panright tap press", function(ev) {
                     console.log("gesture off!");
                 });
             }

         });

         // video2.oncanplay = function() {

         //     console.log("can play next video!");
         // }
         // video2.onended = function() {
         //     setTimeout(function() {
         //         document.getElementById("cta").style.display = "block";
         //     }, 2000);
         // };
     });
 }