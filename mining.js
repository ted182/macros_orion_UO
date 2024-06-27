//  MACRO SIMPLIFICADO PARA MINERAR  NA MINA DE MINOC DO TLC-SHARD 2024

const config = {
	axeType: '0x0E85',
	findRadiusTile: 4,
	timeoutLenhada: 15000,
	tentativas: 10,
	pesoMAX: 200,
	oreBag: 0x4000E7C4,
	pickaxeBag:0x4000F064,
	runaBank: {pos:1, x:1419,y:1685}, //pos= posicao da runa no runebook -> x=coordenada x da runa
	runaMine: {pos:11, x:2582,y:451},
};
const textosTentativa = 'You loosen some rocks|You put the';
const textosFinalizado = 'Try mining elsewhere|That is too far away|have no line of sight|nothing here to mine for|That is too far away|cannot mine so close';

var oreTypes = [0x19B9, 0x19BA, 0x19B7, 0x19B8];
var ores = [
	{name: 'Iron', color: 0x0000, amount: 0},
	{name: 'Copper', color: 0x0641, amount: 0},
	{name: 'Silver', color: 0x0482, amount: 0},
	{name: 'Bronze', color: 0x06D6, amount: 0},
	{name: 'Gold', color: 0x045E, amount: 0}
];

const calculateDistanceFromPlayer = function(tile) {
	var x1 = Player.X(), y1 = Player.Y(), z1 = Player.Z();
	var x2 = tile.X(), y2 = tile.Y(), z2 = tile.Z();
	var dx = x2 - x1;
	var dy = y2 - y1;
	var dz = z2 - z1;
	var distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
	return distance;
};

const arrayMin = function(arr) {
	return arr.reduce(function (p, v) {
    	return ( p < v ? p : v );
	});
};

const arrayMax = function(arr) {
	return arr.reduce(function (p, v) {
		return ( p > v ? p : v );
	});
};

const extractCoordArray = function(arr) {
	var outX = [];
	var outY = [];
	var minX;
	var maxX;
	var minY;
	var maxY;
	
	arr.forEach(function (a) {
			outX.push( a.X() );
			outY.push( a.Y() );
	});
	
	minX = arrayMin(outX);
	maxX = arrayMax(outX);
	minY = arrayMin(outY);
	maxY = arrayMax(outY);	
	
	return [minX, maxX, minY, maxY];
};

const getTilesWithinRadius = function(tileType, radius) {
	const filteredTiles = [];
	const tiles = Orion
		.GetTilesInRect(tileType, Player.X() - radius, Player.Y() - radius, Player.X() + radius, Player.Y() + radius)
		.sort(function (tileA, tileB) {
			return calculateDistanceFromPlayer(tileA) - calculateDistanceFromPlayer(tileB);
		});
	tiles.forEach(function(tile) {
		if ( tile.Z() == Player.Z()) filteredTiles.push(tile);
	});	
	return filteredTiles;
};

const findToolSerial = function() {
	var axeBag = Orion.FindType(config.axeType, 'any', backpack);
	//Orion.Print('axebag encontrado: ' + axeBag.length);
	var axeRhand = Orion.ObjAtLayer('RightHand');
	if ( axeRhand ) return axeRhand.Serial();
	if ( axeBag.length != 0 ) { Orion.UseObject(axeBag.shift()); return axeBag.shift(); };	
	Orion.CharPrint(self, 15, 'sem picareta...!');
	reload();
};

const minerar = function(tile) {	
	var startTime;
	var timeout;
	var tent = 0;
	while ( !Player.Dead() ) {
		startTime = Orion.Now();
		timeout = startTime + config.timeoutLenhada;
		Orion.UseObject(findToolSerial());
		Orion.Wait(500);
		Orion.TargetTile('mine', tile.X(), tile.Y(), tile.Z());
		while ( !Orion.InJournal(textosTentativa.concat('|', textosFinalizado), 'sys', 0, any, startTime, timeout) ) {
			Orion.Wait(500);
			if ( Orion.Now() > timeout ) break;
		};
		if ( Orion.InJournal(textosFinalizado, 'sys', 0, any, startTime) ) break;
		if ( tent >= config.tentativas ) break;
		tent += 1;
	};
};

const colorTiles = function(arr) {
	var _startX = arr[0];
	var _startY = arr[2];
	var _endX = arr[1];
	var _endY = arr[3];
	Orion.ClearFakeMapObjects();
	var tiles = Orion.GetTilesInRect('cave', _startX, _startY, _endX, _endY)
	tiles.forEach(function(tile) {
		var i = String(tile.X()) + String(tile.Y());
		Orion.AddFakeMapObject(i, '0x051A', 2, tile.X(), tile.Y(), tile.Z());
	});	
};

const checaPeso = function() {
	if ( Player.Weight() >= config.pesoMAX ) return true;
	return false;
};

const checaMana = function() {
	while ( Player.Mana() <= 50 ) {
		Orion.UseSkill('Meditation');
		Orion.Wait(1000);
	};
};

const recall = function() {
	
	const checkLocation = function(x,y) {
		if ( x == Player.X() && y == Player.Y() ) {
        	Orion.Print('[recall] -> o char ja está no local da runa...');
        	return true
        };
    	return false
	};	
	const goMina = function() {
		if ( checkLocation(config.runaMine.x, config.runaMine.y) ) return true;
		checaMana();
		while ( config.runaMine.x != Player.X() || config.runaMine.y != Player.Y() ) {
			Orion.Print('recalando mina...');
			Orion.Say('.recall ' + config.runaMine.pos);
			Orion.Wait(10000);
		};
	};	
	const goBank = function() {
		if ( checkLocation(config.runaBank.x, config.runaBank.y) ) return true;
		checaMana();
		while ( config.runaBank.x != Player.X() || config.runaBank.y != Player.Y() ) {
			Orion.Print('recalando banco...');
			Orion.Say('.recall ' + config.runaBank.pos);
			Orion.Wait(10000);
		};
	};	
	return {
		mina: goMina,
		banco: goBank
	};	
};

const sayBank = function() {
	var startTime = Orion.Now();
	while (!Orion.InJournal('stones in your Bank Box', 'sys', 0, any, startTime) ) {	
		Orion.Say('banker bank');
		Orion.Wait(1000);
	};
};

const openContainer = function (containerid) {
    Orion.UseObject(containerid);
    //while (lastcontainer != containerid) {
    //    Orion.UseObject(backpack);
    //    Orion.Wait(500);
    //    Orion.UseObject(containerid);
    //    Orion.Wait(500);
    //};
};

const unloadOres = function() {	
	sayBank();
	oreTypes.forEach(function(type) {
		ores.forEach(function(ore) {
			//while ( Orion.FindType(type, ore.color, backpack) ) {
			ore.amount += Orion.Count(type, ore.color, backpack);
			while ( Orion.MoveItemType(type, ore.color, backpack, 0, config.oreBag) ) {
				Orion.Wait(500);
				sayBank();
			};
		});	
	});		
};

const restockPickaxe = function() {
	while ( Orion.FindType(config.axeType, 'any', backpack).length == 0 ) {
		Orion.Print('restocando picareta...');
		sayBank();
		Orion.Wait(500);
		openContainer(config.pickaxeBag);
		Orion.Wait(500);
		Orion.MoveItemType(config.axeType, 'any', config.pickaxeBag, 1, backpack);
		Orion.Wait(500);
	};
};

const report = function() {	
	Orion.Print('ores coletados:');
	ores.forEach(function(ore) {
		Orion.Print(ore.name + ': ' + ore.amount);
	});
};

const reload = function() {
	Orion.Print('reload...');
	modoWorker(false);
	recalar.banco();
	unloadOres();
	restockPickaxe();
	report();
	gumpReport();
	recalar.mina();
	modoWorker(true);
};

const modoWorker = function(ativar) {
	var startTime = Orion.Now();
	if (ativar) {
		while (!Orion.InJournal('Modo worker habilitado', 'sys', 0, any, startTime) ) {	
			Orion.Say('.worker');
			Orion.Wait(250);
		};
	}else {
		while (!Orion.InJournal('Voce saiu do modo worker', 'sys', 0, any, startTime) ) {	
			Orion.Say('.worker');
			Orion.Wait(250);
		};
	};
};

const gumpReport = function() {
	
	var gump = Orion.CreateCustomGump(182);
	gump.Clear();	
	var step = 18;
	var x = 1800;
	var y = 500;
	var texto;
	
	gump.AddResizepic(x, y, '13BE', 100, 100);
	
	ores.forEach(function(ore) {
		texto  = ore.name + ': ' + ore.amount;
		gump.AddText(x, y, '0', texto);
		y += step;
	});
	
	gump.Update();
};

//INICIAR FUNÇÕES CONTRUTORAS
const recalar = recall();

function main() {
	var tiles;	
	reload();	
	while ( !Player.Dead() ) {	
		tiles = getTilesWithinRadius('cave', config.findRadiusTile);
		colorTiles( extractCoordArray(tiles) );		
		for (var i = 0; i < tiles.length; i++) {
			//Orion.CharPrint(self, 15, 'x: ' + tiles[i].X() + ' y: ' + tiles[i].Y() );
			Orion.Print('ponto ' + (i+1) + '/' + tiles.length + ' x: ' + tiles[i].X() + ' y: ' + tiles[i].Y() + ' z: ' + tiles[i].Z() );
			Orion.RemoveFakeMapObject(String(tiles[i].X()) + String(tiles[i].Y()));			
			Orion.WalkTo( tiles[i].X(), tiles[i].Y(), tiles[i].Z() );
			minerar(tiles[i]);
			Orion.Wait(250);
			if ( checaPeso() ) {
				Orion.Print('peso máximo atingido...');
				reload();
			};
		};		
		Orion.CharPrint(self, 15, 'reiniciando arvores...');		
	};
};
