function cortaCorpo()
{	
	const armasType = '0x143E|0x0F47|0x0F49|0x1400|0x0F45|0x13FE'; //a primeira que achar na bag será usada
	const corpoType = '0x2006';

	Orion.Say('.disarm');
	Orion.Wait(250);
	var corpos = Orion.FindType(corpoType, '-1', ground, '2' );
	
	if (corpos.length > 0)
	{
		corpos.forEach( function(el){  	
			Orion.UseType(armasType);
			Orion.WaitTargetObject(el);
			Orion.Wait(500);	
		});
	
	}else
	{
		Orion.CharPrint(self, 0x25, '***Sem Corpo***');
	}	
	Orion.Say('.disarm');
};
