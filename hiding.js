const ping = function()
{
	var startTime = Orion.Now();
	Orion.SetTimer('ping_timer');
	Orion.Click(backpack);
	Orion.WaitJournal('a backpack', startTime, startTime+1000);
	var result = Orion.Timer('ping_timer');
	Orion.RemoveTimer('ping_timer');
	return result	
}

const temporizador = function(_num)
{
	var totalTime = '';
  	var size = _num/5;
  	var normal_color = '0x0111';
  	var hurry_color = '0x0155';
  	
  	totalTime += '[';
  	
  	for (var i = 0; i < 5; i++) 
  	{
    		totalTime += '0';
  	}
  	
  	totalTime += ']';
  	
  	for (var j = 0; j <= 5; j++) 
  	{
    	    	
		for (var n = 0; n < 5; n++)  Orion.CharPrint(self, normal_color, '     ');

		if (j < 4) 
		{
			Orion.CharPrint(self, normal_color, totalTime);
		}else
		{
			Orion.CharPrint(self, hurry_color, totalTime);
		}  	

		totalTime = totalTime.replace('0', '>');
		Orion.Wait(size);
  	}
};

function esconder()
{
	var ping_medido = 0;
	var tempo = 3500; //tempo, em milisegundos, para o hiding (alterar de acordo com o shard)
	Orion.WarMode(0);
	var startTime = Orion.Now();
	Orion.SetTimer('hiding_timer');
	Orion.UseSkill('Hiding');
	
	ping_medido = ping();
	Orion.Wait(ping_medido);
	
	Orion.Exec('temporizador', true, 3500);
	
	Orion.WaitJournal('hidden yourself well|seem to hide here', startTime, startTime+5000);
	Orion.Print('tempo para hiding ' + Orion.Timer('hiding_timer') + 'ms (ping: ' + ping_medido + ' ms)' );
	Orion.RemoveTimer('hiding_timer');
}
