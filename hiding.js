const temporizador = function(_num, _skillName)
{
	var totalTime = '';
	const parteInteira = Math.floor(_num);
	const parteFracionada = _num - parteInteira;

	if (parteFracionada > 0) Orion.Wait(parteFracionada*1000);  	

	for (var i = 0; i < parteInteira; i++) 
	{
		totalTime += "-";
	}

	for (var j = 0; j <= parteInteira; j++) 
	{
		Orion.CharPrint(self, '0x0111', totalTime + ' [' + _skillName + ']');
		totalTime = totalTime.replace('-', '#');
		Orion.Wait(1000);
	}
};

function esconder()
{
	var tempo = 3.5; //tempo, em segundos, para o hiding (alterar de acordo com o shard)
	Orion.WarMode(0);
	var startTime = Orion.Now();
	Orion.SetTimer('hiding_timer');
	Orion.UseSkill('Hiding');	
	Orion.Exec('temporizador', true, [tempo, 'hiding']);
	Orion.WaitJournal('hidden yourself well', startTime, startTime+6000);
	Orion.Print('tempo para hiding ' + Orion.Timer('hiding_timer'));
	Orion.RemoveTimer('hiding_timer');
}
