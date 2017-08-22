
function startMyGame(difficulty) { 


	var wiwi = window.innerWidth;
	var hehe = window.innerHeight;


	/* Duration between 2 pipes */
	if (difficulty == 'easy'){
		myDuration = 3000; 
		myVelocity = -160;
	} else if (difficulty == 'medium') {
		myDuration = 1700;
		myVelocity = -180;
	} else if (difficulty == 'hard') {
		myDuration = 1300;
		myVelocity = -190;
	}
	else {
		myDuration = 1500;
		myVelocity = -200;
	}


	function gup( name, url ) {
		if (!url) url = location.href;
		name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
		var regexS = "[\\?&]"+name+"=([^&#]*)";
		var regex = new RegExp( regexS );
		var results = regex.exec( url );
		return results == null ? null : results[1];
	}





	var imgPipe = new Image();
	imgPipe.src = 'assets/pipe.png';
	imgPipe.onload = function() {
		pipeHeight = imgPipe.height;
	};


	var game=new Phaser.Game( wiwi, hehe,Phaser.AUTO,"gameDiv");
	var mainState={
		preload:function(){
			if(!game.device.desktop){
				game.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL;
				game.scale.setMinMax(game.width,game.height,game.width,game.height);
			}
			game.scale.pageAlignHorizontally=true;
			game.scale.pageAlignVertically=true;
			game.stage.backgroundColor='#71c5cf';

			game.load.spritesheet('bird', 'assets/birdSprite.png', 50, 50, 2);
			game.load.image('pipe','assets/pipe.png');
			game.load.spritesheet('smoke', 'assets/smokeSprite.png', 20, 20, 3);
			game.load.image('cloud','assets/cloud.png');
			game.load.image('coin','assets/coin.png');
			game.load.audio('jump','assets/jump.wav');
			game.load.audio('cash','assets/cash.wav');
	},
	create:function(){
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		for (i = 0; i< 3; i++) {
			this.cloud=game.add.sprite(wiwi + (100 * Math.random()),Math.round(Math.random() * hehe),'cloud');
			game.physics.arcade.enable(this.cloud);
			this.cloud.body.gravity.x = -Math.round(Math.random() * 40);
		};
		
		
		this.clouds=game.add.group();
		
		
		this.pipes=game.add.group();
		this.coins=game.add.group();
		this.timer=game.time.events.loop(myDuration,this.addRowOfPipes,this);
		
		
		this.bird=game.add.sprite(-60,245,'bird');
		var walk = this.bird.animations.add('walk');

		this.bird.animations.play('walk', 1, true);
		
		game.physics.arcade.enable(this.bird);
		this.bird.body.gravity.y=1000;
		
		this.bird.anchor.setTo(0.6,0.5);
		this.smokes=game.add.group();

		
		var spaceKey=game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		spaceKey.onDown.add(this.jump,this);
		game.input.onDown.add(this.jump,this);
		this.score=0;
		this.labelScore=game.add.text(-20,20,"0",{font:"30px Arial",fill:"#ffffff"});
		this.jumpSound=game.add.audio('jump');
		this.jumpSound.volume=0.2;
		this.cashSound=game.add.audio('cash');
		this.cashSound.volume=0.2;
		
	},
	update:function(){
		if(this.bird.y<0||this.bird.y>game.world.height)this.restartGame();
		game.physics.arcade.overlap(this.bird,this.pipes,this.hitPipe,null,this);
		game.physics.arcade.overlap(this.bird,this.coins,this.hitCoin,null,this);
		if(this.bird.angle<90)this.bird.angle+=0.5;
		if(this.bird.x < 100)this.bird.x += 5;
		if(this.labelScore.x < 20)this.labelScore.x += 1;
		this.addOneSmoke(this.bird.x - 5,this.bird.y - 4);
		this.smokes.forEach(function(p){if (p.x < -20) { p.destroy(); }},this);
		
	},
	jump:function(){
		if(this.bird.alive==false)return;
		this.bird.body.velocity.y=-350;
		game.add.tween(this.bird).to({angle:-10},100).start();
		this.jumpSound.play();
	},
	hitPipe:function(){
		if(this.bird.alive==false)return;
		this.bird.alive=false;
		game.time.events.remove(this.timer);
		this.pipes.forEach(function(p){
			p.body.velocity.x=0;}
		,this);
		this.coins.forEach(function(p){
			p.body.velocity.x=0;}
		,this);
	},
	hitCoin:function(){
		this.score+=10;
		this.labelScore.text=this.score;
		this.cashSound.play();
		this.coins.forEach(function(p){
			if (p.x < 200) {p.destroy();};}
		,this);
	}
	,
	restartGame:function(){
		game.state.start('main');
	},
	addOnePipe:function(x,y){
		var pipe=game.add.sprite(x,y,'pipe');
		this.pipes.add(pipe);
		game.physics.arcade.enable(pipe);
		pipe.body.velocity.x=myVelocity;
		pipe.checkWorldBounds=true;
		pipe.outOfBoundsKill=true;
	},
	addOneCoin:function(x,y) {
		var coin=game.add.sprite(x,y,'coin');
		this.coins.add(coin);
		game.physics.arcade.enable(coin);
		coin.body.velocity.x=myVelocity;
		coin.checkWorldBounds=true;
		coin.outOfBoundsKill=true;
	},
	addOneCloud:function(x,y) {
		
		var cloud=game.add.sprite(x,y,'cloud');
		this.clouds.add(cloud);
		console.log(x);
		game.physics.arcade.enable(cloud);
		cloud.body.velocity.x=-140 + ((Math.random() - Math.random()) * 100);
		cloud.checkWorldBounds=true;
		cloud.outOfBoundsKill=true;
	},
	addOneSmoke:function(x,y) {
		var smoke=game.add.sprite(x,y,'smoke');
		var smokeOut = smoke.animations.add('smokeOut');

		smoke.animations.play('smokeOut', 5, false);
		this.smokes.add(smoke);
		game.physics.arcade.enable(smoke);
		smoke.body.velocity.x=-280 + ((Math.random() - Math.random()) * 100);
		smoke.checkWorldBounds=true;
		smoke.outOfBoundsKill=true;
	},
	addRowOfPipes:function(){
		var hole=Math.floor(Math.random()*5)+1;
		var maxPipes = Math.floor(hehe/pipeHeight);
		var offsetY = hehe - (maxPipes * pipeHeight);
		
		for(var i=0;i<maxPipes;i++)
			if(i<hole - 1) {
				this.addOnePipe(wiwi,i*pipeHeight);
			} else if (i > hole + 1) {
				this.addOnePipe(wiwi,i*pipeHeight + offsetY);
			}
			else if (i== hole && Math.random() > 0.9) {
				this.addOneCoin(wiwi,i*Math.floor(hehe/maxPipes)+10);
			};
		this.score+=1;
		this.labelScore.text=this.score;
		if (Math.random() > 0.5) {
			this.addOneCloud(wiwi, Math.round(Math.random() * hehe));
		};
	},
		
	};



	game.state.add('main',mainState); game.state.start('main');
};
