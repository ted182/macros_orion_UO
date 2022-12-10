function emptyContainer()
{	
	if ( !Orion.FindObject('loot-bag') )
	{
		Orion.CharPrint(self, 0x10, 'Escolha uma BAG para receber os itens...');
		Orion.AddObject('loot-bag');
		while ( Orion.HaveTarget() ) Orion.Wait(25);
	};	
	
	Orion.CharPrint(self, 0x35, 'Selecione o baú para ser limpo...');
	Orion.AddObject('to-empty-container');
	while ( Orion.HaveTarget() ) Orion.Wait(25);
	
	Orion.UseObject('to-empty-container');
	//openBags('to-empty-container');
	
	var list = Orion.FindType('-1', '-1', 'to-empty-container');
	
	while (list.length > 0) 
	{
		Orion.MoveItem(list[0], 0, 'loot-bag');
		Orion.Wait('moveitemdelay');
		list = Orion.FindType('-1', '-1', 'to-empty-container');
	};	
	
}
