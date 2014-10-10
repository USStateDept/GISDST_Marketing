var controller;
$(document).ready(function($) {
	// init controller
	controller = new ScrollMagic({"offset":500});
});

$(document).ready(function($) {
		// build tween
		var tween1 = TweenMax.to(".suitimage",1, {opacity: "+=1"});
		//var tween = TweenMax.to("#animate1", 0.5, {backgroundColor: "green", scale: 2.5});

		// build scene
		var scene1 = new ScrollScene({triggerElement: "#trigger1"})
						//.setClassToggle(".suitimage", "fixed")
						.setTween(tween1)
						.addTo(controller);


		var tween2 = TweenMax.to(".datapiece",1, {opacity: "+=1"});
		//var tween = TweenMax.to("#animate1", 0.5, {backgroundColor: "green", scale: 2.5});

		// build scene
		var scene2 = new ScrollScene({triggerElement: "#trigger2"})
						//.setClassToggle(".suitimage", "fixed")
						.setTween(tween2)
						.addTo(controller);	

		var tween3 = TweenMax.to(".datapiece",.01, {"background-position-y": "+=75"});
		//var tween = TweenMax.to("#animate1", 0.5, {backgroundColor: "green", scale: 2.5});

		// build scene
		var scene3 = new ScrollScene({triggerElement: "#trigger3"})
						//.setClassToggle(".suitimage", "fixed")
						.setTween(tween3)
						.addTo(controller);	

		var tween4 = TweenMax.to(".suitimage",1, {opacity: "-=1"});
		//var tween = TweenMax.to("#animate1", 0.5, {backgroundColor: "green", scale: 2.5});

		// build scene
		var scene4 = new ScrollScene({triggerElement: "#trigger4"})
						//.setClassToggle(".suitimage", "fixed")
						.setTween(tween4)
						.addTo(controller);	


		$(".datapiece").each(function(index, value){
			var temptween = null;
			if ($(this).hasClass("datagroup1")){
				console.log("#" + $(this).attr("id"));
				temptween = TweenMax.to("#" + $(this).attr("id"),1, {left: "+=350", top: "+=130"});
			}
			else if ($(this).hasClass("datagroup2")){
				temptween = TweenMax.to("#" + $(this).attr("id"),1, {top: "+=130"});
			}
			else {
				temptween = TweenMax.to("#" + $(this).attr("id"),1, {left: "-=350", top: "+=130"});
			}
			var scene5 = new ScrollScene({triggerElement: "#trigger5"})
							//.setClassToggle(".suitimage", "fixed")
							.setTween(temptween)
							//.setTween(tween52)
							//.setTween(tween53)
							.addTo(controller);	
		});


		// build scene
		var tween6 = TweenMax.to(".datacubeimage",1, {top: "+=163"});
		var scene6 = new ScrollScene({triggerElement: "#trigger6"})
						//.setClassToggle(".suitimage", "fixed")
						.setTween(tween6)
						.addTo(controller);	

		var tween71 = TweenMax.to(".gearimage",2, {opacity: "+=1", left: "+=170"});
		var scene71 = new ScrollScene({triggerElement: "#trigger7"})
						//.setClassToggle(".suitimage", "fixed")
						.setTween(tween71)
						.addTo(controller);	

		var tween72 = TweenMax.to(".cloudimage",2, {opacity: "+=1", left: "-=170"});
		var scene72 = new ScrollScene({triggerElement: "#trigger7"})
						//.setClassToggle(".suitimage", "fixed")
						.setTween(tween72)
						.addTo(controller);	


/*
		var tween51 = TweenMax.to(".datagroup1",1, {left: "+=400", top: "+=130"});
		var tween52 = TweenMax.to(".datapiece2",1, {left: "+=400", top: "+=130"});
		var tween53 = TweenMax.to(".datapiece3",1, {left: "+=400", top: "+=130"});
		//var tween = TweenMax.to("#animate1", 0.5, {backgroundColor: "green", scale: 2.5});

		// build scene
		var scene5 = new ScrollScene({triggerElement: "#trigger5"})
						//.setClassToggle(".suitimage", "fixed")
						.setTween(tween51)
						//.setTween(tween52)
						//.setTween(tween53)
						.addTo(controller);	

		var scene5 = new ScrollScene({triggerElement: "#trigger5"})
						//.setClassToggle(".suitimage", "fixed")
						.setTween(tween52)
						//.setTween(tween52)
						//.setTween(tween53)
						.addTo(controller);	


		var scene5 = new ScrollScene({triggerElement: "#trigger5"})
						//.setClassToggle(".suitimage", "fixed")
						.setTween(tween53)
						//.setTween(tween52)
						//.setTween(tween53)
						.addTo(controller);	
						*/



/*
		var tween4 = TweenMax.to(".datapiece",1, {opacity: "+=1"});
		//var tween = TweenMax.to("#animate1", 0.5, {backgroundColor: "green", scale: 2.5});

		// build scene
		var scene4 = new ScrollScene({triggerElement: "#trigger4"})
						.setClassToggle(".suitimage", "fixed")
						.setClassToggle(".suitimage", "fixed")
						.setClassToggle(".suitimage", "fixed")
						.setTween(tween4)
						.addTo(controller);	
						*/



		// show indicators (requires debug extension)
		scene1.addIndicators();
		scene2.addIndicators();
		//scene5.addIndicators();
	});

/*
	$(document).ready(function($) {
		// build tween
		var tween = TweenMax.fromTo("#animate2", 0.5, 
				{"border-top": "0px solid white"},
				{"border-top": "30px solid white", backgroundColor: "blue", scale: 0.7}
			);

		// build scene
		var scene = new ScrollScene({triggerElement: "#trigger2", duration: 300})
						.setTween(tween)
						.addTo(controller);

		// show indicators (requires debug extension)
		scene.addIndicators();
	});
	*/