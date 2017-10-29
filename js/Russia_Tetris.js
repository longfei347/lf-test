//������Ϸ�����Ե�Ԫ���ʾ�������������Լ���Ԫ����(�߶�)
var Cols = 12,
	Rows = 20,
	Sqlen = 16;
var delLine = new Array();
var CurSq, NextSq;
var type = -1,
	oldtype;
//��Ϸ���ȼ��з���ÿ�ƶ�һ�������ʱ��(ms) 
var delayTime = new Array(500, 400, 300, 200, 100, 90, 80, 70, 60);
//����Ŀ�귽���ƶ��ļ�ʱ��
var TimerID;
//����λ�á�������ʶ�����𡢷���������
var pos = 0,
	end, level = 0,
	score = 0,
	lines = 0;
//�Ƿ�����ı�ʶ��
var isOver = false;
//�Ƿ���ͣ�ı�ʶ��
var isPause = false;
//��Ϸ������һ������ʾ������ɫ�Լ����ַ������ɫ
var myColor = new Array("gray", "red", "green", "cyan", "yellow", "orange", "pink", "blue");
//������Ϸ������һ������ʾ�����
function CreateArea(rows, cols, name) {
	var s = "<table bgcolor=" + myColor[0] + ">";
	for (var i = 0; i < rows; i++) {
		s += "<tr>";
		for (var j = 0; j < cols; j++) {
			var id = name + i + "#" + j;
			s += "<td class=GirdStyle id=" + id;
			s += " style=\"background:" + myColor[0] + "\"></td>"
		}
		s += "</tr>";
	}
	s += "</table>";
	return s;
}
//��ʼ����Ϸ������һ������ʾ��
function InitGame() {
	document.getElementById("GameBody").innerHTML = CreateArea(Rows, Cols, 'Main');
	document.getElementById("GameForecast").innerHTML = CreateArea(4, 4, 'Forecast');
}
//�趨��ǰ����
function Square(cols, rows, color) {
	this.rows = rows;
	this.cols = cols;
	this.color = color;
}
//���������������ֵѡ�񷽿�
function chooseSquare(type, x, y) {
	var mySquare = new Array(4);
	switch (type) {
		case 0:
			mySquare[0] = new Square(x - 1, y, 1);
			mySquare[1] = new Square(x, y, 1);
			mySquare[2] = new Square(x + 1, y, 1);
			mySquare[3] = new Square(x + 2, y, 1);
			break;
		case 1:
			mySquare[0] = new Square(x, y, 5);
			mySquare[1] = new Square(x, y + 1, 5);
			mySquare[2] = new Square(x + 1, y + 1, 5);
			mySquare[3] = new Square(x, y + 2, 5);
			break;
		case 2:
			mySquare[0] = new Square(x, y, 2);
			mySquare[1] = new Square(x, y + 1, 2);
			mySquare[2] = new Square(x + 1, y + 1, 2);
			mySquare[3] = new Square(x + 1, y + 2, 2);
			break;
		case 3:
			mySquare[0] = new Square(x + 1, y, 7);
			mySquare[1] = new Square(x + 1, y + 1, 7);
			mySquare[2] = new Square(x, y + 1, 7);
			mySquare[3] = new Square(x, y + 2, 7);
			break;
		case 4:
			mySquare[0] = new Square(x, y, 3);
			mySquare[1] = new Square(x + 1, y, 3);
			mySquare[2] = new Square(x, y + 1, 3);
			mySquare[3] = new Square(x + 1, y + 1, 3);
			break;
		case 5:
			mySquare[0] = new Square(x, y, 6);
			mySquare[1] = new Square(x + 1, y, 6);
			mySquare[2] = new Square(x + 1, y + 1, 6);
			mySquare[3] = new Square(x + 1, y + 2, 6);
			break;
		case 6:
			mySquare[0] = new Square(x + 1, y, 4);
			mySquare[1] = new Square(x, y, 4);
			mySquare[2] = new Square(x, y + 1, 4);
			mySquare[3] = new Square(x, y + 2, 4);
			break;
	}
	return mySquare;
}
//�ػ�
function reDraw(name, mySquare) {
	var obj;
	for (var i = 0; i < mySquare.length; i++) {
		obj = document.getElementById(name + mySquare[i].rows + "#" + mySquare[i].cols);
		obj.style.backgroundColor = myColor[mySquare[i].color];
	}
}
//���������ɫ����Ϊ����ɫ������÷���
function clearDraw(name, mySquare) {
	var obj;
	for (var i = 0; i < mySquare.length; i++) {
		obj = document.getElementById(name + mySquare[i].rows + "#" + mySquare[i].cols);
		obj.style.backgroundColor = myColor[0];
	}
}
//�ж��Ƿ񵽱߽�
function isBounds(mySquare) {
	for (var i = 0; i < mySquare.length; i++) {
		if (mySquare[i].cols < 0 || mySquare[i].cols > 11 || mySquare[i].rows < 0 || mySquare[i].rows > 19) return false;
	}
	return true;
}
//��������
function SortSquare(mySquare, name, isMax) {
	if (isMax) {
		var Max = 0;
		if (name == "Rows") {
			for (var i = 0; i < mySquare.length; i++) {
				if (mySquare[i].rows > Max) Max = mySquare[i].rows;
			}
		} else {
			for (var i = 0; i < mySquare.length; i++) {
				if (mySquare[i].cols > Max) Max = mySquare[i].cols;
			}
		}
		return Max;
	} else {
		var Min = 20;
		if (name == "Rows") {
			for (var i = 0; i < mySquare.length; i++) {
				if (mySquare[i].rows < Min) Min = mySquare[i].rows;
			}
		} else {
			for (var i = 0; i < mySquare.length; i++) {
				if (mySquare[i].cols < Min) Min = mySquare[i].cols;
			}
		}
		return Min;
	}
}
//��Ϸ��ʼ�����ѡ�񷽿�
function StartGame() {
	document.getElementById("start").disabled = true;
	document.getElementById("pause").focus();
	type = parseInt(Math.random() * 7);
	oldtype = type;
	type = parseInt(Math.random() * 7);
	var m = 4 / 2 - 1;
	NewSq = chooseSquare(type, m, 0);
	reDraw('Forecast', NewSq);
	Start();
}
//��ʱ������
function Start() {
	if (isOver) {
		var s = "������Ϸ����!";
		OverGame(s);
	}
	document.getElementById('gScore').innerHTML = score;
	document.getElementById('gLevel').innerHTML = level;
	document.getElementById('gLine').innerHTML = lines;
	oldtype = type;
	clearDraw('Forecast', NewSq);
	type = parseInt(Math.random() * 7);
	var m = 4 / 2 - 1;
	NewSq = chooseSquare(type, m, 0);
	reDraw('Forecast', NewSq);
	var mm = Cols / 2 - 1;
	CurSq = chooseSquare(oldtype, mm, 0);
	reDraw('Main', CurSq);
	window.clearInterval(TimerID);
	TimerID = window.setInterval("StartMove()", delayTime[level]);
}
//��������������ȥ�󣬸�����Ϸ���������ʼ��һ������
function StartMove() {
	if (isPause) return;
	if (MoveCurSq(0, 1, false) == false) {
		//����ͣ��һ�������ƶ����������
		window.clearInterval(TimerID);
		if (RemoveLines() == true) {
			DelLines();
			lines = lines + delLine.length;
			//������ȥ�������ӷ�
			switch (delLine.length) {
				case 1:
					score = score + 100;
					break;
				case 2:
					score = score + 200;
					break;
				case 3:
					score = score + 400;
					break;
				case 4:
					score = score + 1000;
					break;
			}
			//������Ϸ����
			level = parseInt(score / 10000);
		}
		//��ʼ��һ������
		Start();
	}
}
//�Ƴ�����������һ��(�����)
function RemoveLines() {
	var obj, m = 0;
	var isRemove = true;
	var searchPos = true;
	var del = new Array();
	for (var i = 19; i >= 0; i--) {
		for (var j = 0; j < 12; j++) {
			obj = document.getElementById("Main" + i + "#" + j);
			if (obj.style.background == myColor[0]) {
				isRemove = false;
			} else {
				searchPos = false;
			}
		}
		if (searchPos) {
			end = i;
			if (del.length > 0) {
				delLine = del;
				return true;
			} else {
				return false;
			}
		}
		if (isRemove) {
			del[m] = i;
			m++;
		}
		searchPos = true;
		isRemove = true;
	}
}
//ɾ������������һ�л����
function DelLines() {
	var deleted = 0;
	var obj;
	//�������ϡ���������ɨ�������������
	for (var i = 0; i < delLine.length; i++) {
		for (var j = 0; j < 12; j++) {
			obj = document.getElementById("Main" + delLine[i] + "#" + j);
			obj.style.background = myColor[0];
		}
		deleted = deleted + 1;
		if (delLine.length > deleted) {
			if (delLine[i] - delLine[i + 1] > 1) ReDrawLine(delLine[i + 1], delLine[i], deleted);
		}
	}
	ReDrawLine(end, delLine[delLine.length - 1], deleted);
}
//�������ϡ����������ػ�ĳ������
function ReDrawLine(endline, startline, moveline) {
	var obj;
	for (var i = startline - 1; i > endline; i--) {
		for (var j = 0; j < 12; j++) {
			obj = document.getElementById("Main" + i + "#" + j);
			var oldcolor = obj.style.background;
			obj.style.background = myColor[0];
			var rowid = i + moveline;
			obj = document.getElementById("Main" + rowid + "#" + j);
			obj.style.background = oldcolor;
		}
	}
}
//�ƶ�����
function MoveSquare(from, to) {
	if (isBounds(to) == false) return false;
	var obj;
	//ѭ����
	loop: for (var i = 0; i < to.length; i++) {
		obj = document.getElementById("Main" + to[i].rows + "#" + to[i].cols);
		if (obj.style.background != myColor[0]) {
			for (var j = 0; j < from.length; j++)
				if (to[i].cols == from[j].cols && to[i].rows == from[j].rows && to[i].color == from[j].color) continue loop;
			return false;
		}
	}
	return true;
}
//�ƶ�����
function MoveCurSq(x, y, isRotate) {
	NextSq = new Array(CurSq.length);
	for (var i = 0; i < CurSq.length; i++) {
		if (isRotate) {
			var dx = CurSq[i].cols - CurSq[0].cols;
			var dy = CurSq[i].rows - CurSq[0].rows;
			NextSq[i] = new Square(CurSq[0].cols - dy, CurSq[0].rows + dx, CurSq[i].color);
		} else NextSq[i] = new Square(CurSq[i].cols + x, CurSq[i].rows + y, CurSq[i].color);
	}
	if (isRotate) reNextSq();
	if (MoveSquare(CurSq, NextSq) == false) {
		for (var i = 0; i < CurSq.length; i++) {
			if ((CurSq[i].rows == 0 && CurSq[i].cols == Cols / 2) || (CurSq[i].rows == 0 && CurSq[i].cols == Cols / 2 - 1)) isOver = true;
		}
		return false;
	}
	clearDraw('Main', CurSq);
	CurSq = NextSq;
	reDraw('Main', CurSq);
	return true;
}
//��תΪ��һ������
function reNextSq() {
	var minCols = SortSquare(NextSq, 'Cols', false);
	var minRows = SortSquare(NextSq, 'Rows', false);
	var maxCols = SortSquare(NextSq, 'Cols', true);
	var maxRows = SortSquare(NextSq, 'Rows', true);
	if (minCols < 0) changeNextSq('Cols', -minCols);
	if (minRows < 0) changeNextSq('Rows', -minRows);
	if (maxCols > 11) changeNextSq('Cols', 11 - maxCols);
	if (maxRows > 19) changeNextSq('Rows', 19 - maxRows);
}
//�������
function changeNextSq(name, pos) {
	for (var i = 0; i < NextSq.length; i++) {
		if (name = "Rows") NextSq[i].rows = NextSq[i].rows + pos;
		else NextSq[i].cols = NextSq[i].cols + pos;
	}
}
//��Ӧ���ơ����ơ����ƺ����ư����Ķ���
function keyDown() {
	switch (event.keyCode) {
		//��Ӧ�ڼ��̵ġ�DOWN����
		case 40:
			MoveCurSq(0, 1, false);
			break;
			//��Ӧ�ڼ��̵ġ�LEFT����
		case 37:
			MoveCurSq(-1, 0, false);
			break;
			//��Ӧ�ڼ��̵ġ�UP����
		case 38:
			MoveCurSq(0, 0, true);
			break;
			//��Ӧ�ڼ��̵ġ�Right����
		case 39:
			MoveCurSq(1, 0, false);
			break;
	}
}
//��ת����ͣ��Ϸ���롰������Ϸ����ť�ı������趨��Ϸ��ʼ����ͣ
function PauseGame() {
	obj = document.getElementById("pause");
	if (pause.innerText == "��ͣ��Ϸ") {
		isPause = true;
		obj.innerText = "������Ϸ";
		obj.focus();
	} else {
		isPause = false;
		obj.innerText = "��ͣ��Ϸ";
		obj.focus();
		StartMove();
	}
}
//��Ϸ����ʱ����ȷ�Ͽ�
function OverGame(str) {
	if (typeof(str) == "undefined") {
		str = "���÷� : " + score + ".�Ƿ�������Ϸ?";
	} else {
		str = str + "���÷� : " + score + ".�Ƿ�������Ϸ?";
	}
	//�û�ѡ��ȷ������ť��رյ�ǰҳ��
	if (!window.confirm(str)) {
		window.open("", "_self");
		window.close();
	} else {
		//����ˢ�µ�ǰҳ�棬���¿�ʼ��Ϸ
		document.location.reload();
	}
}
