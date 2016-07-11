var Tree=function(){
	
	var getTree=function(){
		
		  $.ajax({
			   url:'xinhaidep/getdeps',
			   // data:querystr,
			    type:'post', //æ°æ®åéæ¹å¼
			    dataType:'json', //æ¥åæ°æ®æ ¼å¼ (è¿éæå¾å¤,å¸¸ç¨çæhtml,xml,js,json)
			    //contentType:"application/json",
			    //data:'text='+$("#name").val()+'&date='+new Date(), //è¦ä¼ éçæ°æ®
			   error: function(){ //å¤±è´¥

			   },
			   success: function(tree){ //æå
					
				   $("#treetext").treeview({
						data: tree
							
				
			})
			   }
			   });


		
		
		
	}
	
	return  {
		
		init:getTree
		
	}
	
}

()