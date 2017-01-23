define(["css!./QSenseAutoRefresh.css"],
  function(template){
	
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
          measures: {
            uses: "measures",
            min: 1,
            max: 2
          },
          Setting: {
            uses: "settings"
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
			}
	}
});