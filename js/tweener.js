var controller;
$(document).ready(function($) {
	// init controller

	controller = new ScrollMagic({"offset":"500px"});
});

$(document).ready(function($) {
		// build tween
		var tween1_1 = TweenMax.to(".understand-back .sideinfo",1, {backgroundColor: "#752329"});
		var tween1_2 = TweenMax.to(".understand-back",1, {backgroundColor: "#5CC4CE"});
		//var tween = TweenMax.to("#animate1", 0.5, {backgroundColor: "green", scale: 2.5});

		// build scene
		var scene1_1 = new ScrollScene({triggerElement: "#trigger1"})
						.setClassToggle(".navbar", "shownavbar")
						.setTween(tween1_1)
						.addTo(controller);

		var scene1_2 = new ScrollScene({triggerElement: "#trigger1"})
						//.setClassToggle(".suitimage", "fixed")
						.setTween(tween1_2)
						.addTo(controller);


		var tween2_1 = TweenMax.to(".structure .sideinfo",1, {backgroundColor: "#17909B"});
		var tween2_2 = TweenMax.to(".structure",1, {backgroundColor: "#9B1762"});
		//var tween = TweenMax.to("#animate1", 0.5, {backgroundColor: "green", scale: 2.5});

		// build scene
		var scene2_1 = new ScrollScene({triggerElement: "#trigger2"})
						.setTween(tween2_1)
						.addTo(controller);

		var scene2_2 = new ScrollScene({triggerElement: "#trigger2"})
						//.setClassToggle(".suitimage", "fixed")
						.setTween(tween2_2)
						.addTo(controller);





		var tween3_1 = TweenMax.to(".build .sideinfo",1, {backgroundColor: "#752329"});
		var tween3_2 = TweenMax.to(".build",1, {backgroundColor: "#5CC4CE"});
		//var tween = TweenMax.to("#animate1", 0.5, {backgroundColor: "green", scale: 2.5});

		// build scene
		var scene3_1 = new ScrollScene({triggerElement: "#trigger3"})
						.setTween(tween3_1)
						.addTo(controller);

		var scene3_2 = new ScrollScene({triggerElement: "#trigger3"})
						//.setClassToggle(".suitimage", "fixed")
						.setTween(tween3_2)
						.addTo(controller);

		var tween4_1 = TweenMax.to(".scale .sideinfo",1, {backgroundColor: "#17909B"});
		var tween4_2 = TweenMax.to(".scale",1, {backgroundColor: "#9B1762"});
		//var tween = TweenMax.to("#animate1", 0.5, {backgroundColor: "green", scale: 2.5});

		// build scene
		var scene4_1 = new ScrollScene({triggerElement: "#trigger4"})
						.setTween(tween4_1)
						.addTo(controller);

		var scene4_2 = new ScrollScene({triggerElement: "#trigger4"})
						//.setClassToggle(".suitimage", "fixed")
						.setTween(tween4_2)
						.addTo(controller);

/*

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
*/




		// show indicators (requires debug extension)
		

		scene1_1.addIndicators();
		scene2_1.addIndicators();
		scene3_1.addIndicators();
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