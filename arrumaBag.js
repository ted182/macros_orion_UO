function arrumaPots()
{
	Orion.Print('Selecione a BAG da arrumacao');
	Orion.AddObject('BAG')
	while (Orion.HaveTarget()) 
	{
		Orion.Wait(10);
	}
	
	const potionList = 
	[
		{ type:'0x0F82', color:'0x0026' },	//life boost
		{ type:'0x0F82', color:'0x0532' },	//mana boost
		{ type:'0x0F82', color:'0x017F' },	//reffiling
		{ type:'0x0F0E', color:'0x0001' },	//invis
		{ type:'0x0F0E', color:'0x0022' },	//refresh
		{ type:'0x0F0E', color:'0x008F' },	//cure 
		{ type:'0x0F0E', color:'0x0099' },	//greater heal
		{ type:'0x0F0E', color:'0x0480' }	//total mana
		
    	];
    	
 	const reagList = 
	[
		"0x0F84", //garlic
		"0x0F7B", //bloodmoss
		"0x0F7A", //black pearl
		"0x0F85", //ginsen
		"0x0F86", //mandrake roots
		"0x0F88", //night shade
		"0x0F8C", //sulfurus ash
		"0x0F8D",  //spider silk
		"0x1F5F",	//FS
		"0x0E21"	//bands
	];
	
	//posições das potions (variáveis)
	var x1 = 45;
	var y1 = 127;
	var x2 = 142;
	var y2 = 126;
	
	const pegaElarga = function(x,y,obj)
	{
		if ( obj )
		{
			if ( obj.Count() > 0 && (obj.X() != x || obj.Y() != y) )
			{
				Orion.DragItem( obj.Serial() );
				Orion.DropDraggedItem('BAG', x, y, 0);
				Orion.Wait('moveitemdelay');
			}
		}
	};
	
	potionList.forEach(function(el,index){  
		
		obj = Orion.FindObject( Orion.FindType(el.type, el.color, 'BAG')[0] );
		pegaElarga( x1, y1, obj );
		x1 = x1 + 10;
	
	});
	
	reagList.forEach(function(el,index){  
	
		obj = Orion.FindObject( Orion.FindType(el, -1, 'BAG')[0] );
		pegaElarga( x2, y2, obj );
	
	});
	
	//stack explosion
	var x3 = 142;
	var y3 = 75;
	explosions = Orion.FindType('0x0F02' , '0x0000', 'BAG');
	
	if ( explosions )
	{
		explosions.forEach(function(el,index){  
			
			obj = Orion.FindObject( el );
			pegaElarga( x3, y3, obj );
		
		});
	}
	
	Orion.CharPrint(self, 0x0021, 'Arrumação finalizada!'); 

}
