function arrumapots()
{
	Orion.Print('Selecione a BAG da arrumacao');
	Orion.AddObject('BAG')
	while (Orion.HaveTarget()) 
	{
		Orion.Wait(10);
	}
	var potionLIST = [
    ['0x0F82','0x0026'],	//life boost
    ['0x0F82','0x0532'],	//mana boost
   	['0x0F82','0x017F'],	//reffiling
   	['0x0F0E','0x0001'],	//invis
   	['0x0F0E','0x0022'],	//refresh
   	['0x0F0E','0x008F'],	//cure 
   	['0x0F0E','0x0099'],	//greater heal
   	['0x0F0E','0x0480'], 	//total mana    	
   	['0x1F5F','0x0000'], 	//FS
   	['0x0E21','0x0000'] 	//bands 
    ];
    	
 	var reaglist = [
	"0x0F84", //garlic
	"0x0F7B", //bloodmoss
	"0x0F7A", //black pearl
	"0x0F85", //ginsen
	"0x0F86", //mandrake roots
	"0x0F88", //night shade
	"0x0F8C", //sulfurus ash
	"0x0F8D"] //spider silk
 	
 	var x1 = 45;
	var y1 = 127;
	var x2 = 142;
	var y2 = 126;

 	for (i = 0; i < potionLIST.length; i++){
		list = Orion.FindType(potionLIST[i][0] , potionLIST[i][1], 'BAG');
		if (list.length > 0){
			Orion.DragItem(list[0]);
			Orion.DropDraggedItem('BAG', x1, y1, 0);
			Orion.Wait('moveitemdelay');
			x1 = x1 + 10;
		};			
	};
	
	for (i = 0; i < reaglist.length; i++){
		while (true){
			list = Orion.FindType(reaglist[i] , '-1', 'BAG');
			if (list[0] == null)
				break
			if (Orion.FindObject(list[0]).X() == x2)
				break
			Orion.DragItem(list[0]);
			Orion.DropDraggedItem('BAG', x2, y2, 0);
			Orion.Wait('moveitemdelay');	
		}
	}

	//stacka potions de explosion
	var x3 = 142;
	var y3 = 75;
	var qntexplo = Orion.Count('0x0F02' , '0x0000', 'BAG');
	//while(Orion.FindType('0x0F02' , '0x0000', 'BAG').length > 0)
	for (i = 0; i < qntexplo; i++) 
	{
		list = Orion.FindType('0x0F02' , '0x0000', 'BAG');
		Orion.DragItem(list[0]);
		Orion.DropDraggedItem('BAG', x3, y3);
		Orion.Wait('moveitemdelay');
	}
	Orion.Print( 'FINALIZADO');
	
	
};
