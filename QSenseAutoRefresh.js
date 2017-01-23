define(["css!./QSenseAutoRefresh.css", "qlik"],
  function(template, qlik){
	
	var timer = {
	  ref: "timer",
		type: "integer",
		label: "Minutes",
		expression: "always",
		defaultValue: 30
  };
	
  var timerOnOff = {
	  type: "boolean",
		component: "switch",
		label: "Activer le refresh",
		ref: "onOff",
		options: [{
			value: true,
			label: "On"
		}, {
			value: false,
			label: "Off"
		}],
		defaultValue: false
	};
	
	return{
	  initialProperties: {
        qHyperCubeDef: {
          qDimensions: [],
          qMeasures: [],
          qInitialDataFetch: [{
            qWidth: 2,
            qHeight: 50
          }]
        }
      },
      definition: {
        type: "items",
        component: "accordion",
        items: {
				  Setting: {
            uses: "settings",
						items: {
							timer: {
						    ref: "timer",
						    type: "items",
						    label: "Options",
								items: {
						      timer: timer,
									onOff: timerOnOff
								}
							}
						}
					}
        }
      },
      support: {
        export: true
      },
      snapshot: {
        canTakeSnapshot: true
      },
		  paint: function($element, layout){
			  //Taille de l'objet
        var width = $element.width();
        var height = $element.height();

        var id = "container_" + layout.qInfo.qId;

        //construction de la div
        if (document.getElementById(id)) {
          $("#" + id).empty();
        } else {
          $element.append($('<div />').attr("id", id).attr("class", "viz").width(width).height(height));
        }
				
				 //recup de la zone d'affichage
        var div = document.getElementById(id);
				var app = qlik.currApp(this);
				
				console.log(qlik.navigation.getMode());

				if(layout.onOff && qlik.navigation.getMode()!='edit'){
				  setTimeout(function() {location.reload();}, layout.timer*60000);
				}
			}
	}
});