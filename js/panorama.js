Panorama = function(container, nav)
{
	this.container = container.children('ul');
	this.nav = nav || container.find('.nav-control');
	this.nav.show();

	this.panel = this.container.find('.panel');
	this.panelItemsLen = this.panel.length;
	this.panelItemsMargin = null;

	this.current = 0;
	this.scrollPos = 0;
	this.scrollWidth = 30;
	this.panelsRigthMargin = 40;

	this.updatePanelItems();
};

Panorama.prototype.transition = function(coords)
{
	var panel = this.panel,
		pixels = 0,
		current = this.current;
		timer = (~~coords) ? 10 : 400;

	//n: identifica al margen izq(inferior) del panel en el arreglo
	//n+1: identifica al margen der(superior) del panel en el arreglo
	pixels = this.panelItemsMargin[2*current]; 
	//Si no se encuentra en la posicion 0 se suman X px al margen
	pixels += (pixels !== 0)? (this.panelsRigthMargin * current) : 0;

	this.scrollPos = coords || pixels;
	this.container.animate({
		'margin-left': -this.scrollPos
	}, timer);
	
	if(this.panelItemsMargin.indexOf(this.scrollPos) != -1){
		var posIndex = this.panelItemsMargin.indexOf(this.scrollPos);
		//Par: Limite Inf --- Impar: Limite Sup
		this.current = (posIndex%2)? (posIndex - 1)/2 : posIndex/2;
	}
	
};

Panorama.prototype.setCurrent = function(direction)
{
	var position = this.current;
	//suma o resta 1 a position dependiendo del desplazamiento izq o der
	position += ( ~~(direction === 'next') || -1 );
	//Ajusta transicion del ultimo y primer elementos
	this.current = (position < 0) ? this.panelItemsLen - 1 : position % this.panelItemsLen;

	return position;
};

Panorama.prototype.addPanel = function(width)
{
	var w = width || 500,
		panel = ['<li>',
					'<div class="panel" style="width: ', w, 'px" data-pwidth="', w, '">',
						'<img src="img/close.png" class="panel-close" alt="X close">',
					'</div>',
				  '</li>'	
				].join('');
	this.container.append(panel);

	this.updatePanelItems();
};

Panorama.prototype.removePanel = function(panel){
	//Remueve el li que contiene a div.panel
	panel.remove();
	this.updatePanelItems();
	var penultimo = this.panelItemsMargin.slice(-3)[0]; //Cambiar nombre + verificar current

	if(this.scrollPos > penultimo){
		var move = penultimo + (this.panelsRigthMargin * this.current);
		this.transition(move);
		this.current--;
	}

}

Panorama.prototype.updatePanelItems = function(){
	//Actualiza la referencia de los paneles
	this.panel = this.container.find('.panel');
	this.panelItemsLen = this.container.find('.panel').length;

	var count = 0,
		scrollWidth = this.scrollWidth;
	this.panelItemsMargin = $.map(this.panel, function(o){ 
		count += $(o).data('pwidth');
		return [count - scrollWidth, count];
	});

	this.panelItemsMargin.unshift(0);
};


	

