/*******************************************/
/****Diyidc.Net.Cn(C)����ڶ��������****/
/*************Diyidc.Net.Cn************/
/*************@���ɴ�����������*************/
/*******************************************/
function check(chess, from, to){
	/**********[��]**********/
	if(chess == "011" || chess == "012" || chess == "013" || chess == "014" || chess == "015")
	{
		if(from >= 46 && (from - to == 1 || to - from == 1))
		return 1;//����
		if(to - from == 9)
		return 1;//��ǰ��һ��
	}//����
	if(chess == "111" || chess == "112" || chess == "113" || chess == "114" || chess == "115")
	{
		if(from <= 45 && (from - to == 1 || to - from == 1))
		return 1;//����
		if(from - to == 9)
		return 1;//��ǰ��һ��
	}//����
	/**********[��]**********/
	if(chess == "010" || chess == "009" || chess == "110" || chess == "109")
	{
		if(to - from > 0 && (to - from) % 9 == 0)
		{
			var count = 0;
			for(var i = from + 9;i < to;i += 9)
			{
				if(document.getElementById("chess_value_"+i).value != "blank")
				count ++;
			}
			if(count == 0 && document.getElementById("chess_value_"+to).value == "blank")
			return 1;
			if(count == 1 && document.getElementById("chess_value_"+to).value != "blank")
			return 1;
		}//������
		if(from - to > 0 && (from - to) % 9 == 0)
		{
			var count = 0;
			for(var i = to + 9;i < from;i += 9)
			{
				if(document.getElementById("chess_value_"+i).value != "blank")
				count ++;
			}
			if(count == 0 && document.getElementById("chess_value_"+to).value == "blank")
			return 1;
			if(count == 1 && document.getElementById("chess_value_"+to).value != "blank")
			return 1;
		}//������
		if(to - from > 0 && to - from < 9)
		{
			var count = 0;
			for(var i = from + 1;i < to;i ++)
			{
				if(document.getElementById("chess_value_"+i).value != "blank")
				count ++;
			}
			if(count == 0 && document.getElementById("chess_value_"+to).value == "blank")
			return 1;
			if(count == 1 && document.getElementById("chess_value_"+to).value != "blank")
			return 1;
		}//������
		if(from - to > 0 && from - to < 9)
		{
			var count = 0;
			for(var i = to + 1;i < from;i ++)
			{
				if(document.getElementById("chess_value_"+i).value != "blank")
				count ++;
			}
			if(count == 0 && document.getElementById("chess_value_"+to).value == "blank")
			return 1;
			if(count == 1 && document.getElementById("chess_value_"+to).value != "blank")
			return 1;
		}//������
	}
	/**********[��]**********/
	if(chess == "008" || chess == "007" || chess == "108" || chess == "107")
	{
		if(to - from > 0 && (to - from) % 9 == 0)
		{
			var count = 0;
			for(var i = from + 9;i < to;i += 9)
			{
				if(document.getElementById("chess_value_"+i).value != "blank")
				count ++;
			}
			if(count == 0)
			return 1;
		}//������
		if(from - to > 0 && (from - to) % 9 == 0)
		{
			var count = 0;
			for(var i = to + 9;i < from;i += 9)
			{
				if(document.getElementById("chess_value_"+i).value != "blank")
				count ++;
			}
			if(count == 0)
			return 1;
		}//������
		if(to - from > 0 && to - from < 9)
		{
			var count = 0;
			for(var i = from + 1;i < to;i ++)
			{
				if(document.getElementById("chess_value_"+i).value != "blank")
				count ++;
			}
			if(count == 0)
			return 1;
		}//������
		if(from - to > 0 && from - to < 9)
		{
			var count = 0;
			for(var i = to + 1;i < from;i ++)
			{
				if(document.getElementById("chess_value_"+i).value != "blank")
				count ++;
			}
			if(count == 0)
			return 1;
		}//������
	}
	/**********[��]**********/
	if(chess == "006" || chess == "005" || chess == "106" || chess == "105")
	{
		if(to - from == 2 * 9 + 1 || to - from == 2 * 9 - 1)
		{
			if(document.getElementById("chess_value_"+(from + 9)).value == "blank")
			return 1;
		}//�����߼ᡰ�ա���
		if(from - to == 2 * 9 + 1 || from - to == 2 * 9 - 1)
		{
			if(document.getElementById("chess_value_"+(from - 9)).value == "blank")
			return 1;
		}//�����߼ᡰ�ա���
		if(to - from == 9 - 2 || from - to == 9 + 2)
		{
			if(document.getElementById("chess_value_"+(from - 1)).value == "blank")
			return 1;
		}//�����ߺᡰ�ա���
		if(from - to == 9 - 2 || to - from == 9 + 2)
		{
			if(document.getElementById("chess_value_"+(from + 1)).value == "blank")
			return 1;
		}//�����ߺᡰ�ա���
	}
	/**********[��]**********/
	if(((chess == "004" || chess == "003") && to <= 45) || ((chess == "104" || chess == "103") && to >= 46))
	{
		if(to - from == 2 * 9 - 2)
		{
			if(document.getElementById("chess_value_"+(from + 9 - 1)).value == "blank")
			return 1;
		}//����
		if(from - to == 2 * 9 - 2)
		{
			if(document.getElementById("chess_value_"+(from - 9 + 1)).value == "blank")
			return 1;
		}//����
		if(to - from == 2 * 9 + 2)
		{
			if(document.getElementById("chess_value_"+(from + 9 + 1)).value == "blank")
			return 1;
		}//����
		if(from - to == 2 * 9 + 2)
		{
			if(document.getElementById("chess_value_"+(from - 9 - 1)).value == "blank")
			return 1;
		}//����
	}
	/**********[ʿ]**********/
	if(chess == "002" || chess == "001")
	{
		if((to == 6 || to == 4 || to == 14 || to == 22 || to == 24) && (to - from == 9 - 1 || from - to == 9 - 1 || to - from == 9 + 1 || from - to == 9 + 1))
		return 1;
	}//����
	if(chess == "102" || chess == "101")
	{
		if((to == 90 + 1 - 6 || to == 90 + 1 - 4 || to == 90 + 1 - 14 || to == 90 + 1 - 22 || to == 90 + 1 - 24) && (to - from == 9 - 1 || from - to == 9 - 1 || to - from == 9 + 1 || from - to == 9 + 1))
		return 1;
	}//����
	/**********[��]**********/
	if(chess == "000")
	{
		if(((to >= 4 && to <= 6) || (to >= 13 && to <= 15) || (to >= 22 && to <= 24)) && (to - from == 1 || from - to == 1 || to - from == 9 || from - to == 9))
		return 1;
		if(to > from && (to - from) % 9 == 0 && document.getElementById("chess_value_"+to).value == "100")
		{
			var count = 0;
			for(var i = from + 9;i < to;i += 9)
			{
				if(document.getElementById("chess_value_"+i).value != "blank")
				count ++;
			}
			if(count == 0)
			return 1;
		}
	}//����
	if(chess == "100")
	{
		if(((to <= 90 + 1 - 4 && to >= 90 + 1 - 6) || (to <= 90 + 1 - 13 && to >= 90 + 1 - 15) || (to <= 90 + 1 - 22 && to >= 90 + 1 - 24)) && (to - from == 1 || from - to == 1 || to - from == 9 || from - to == 9))
		return 1;
		if(from > to && (from - to) % 9 == 0 && document.getElementById("chess_value_"+to).value == "000")
		{
			var count = 0;
			for(var i = to + 9;i < from;i += 9)
			{
				if(document.getElementById("chess_value_"+i).value != "blank")
				count ++;
			}
			if(count == 0)
			return 1;
		}
	}
	return 0;
}// JavaScript Document