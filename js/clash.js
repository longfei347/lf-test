/**
 * 矩形区域碰撞检测
 * Created by Administrator on 14-4-7.
 * author: marker
 */
function Rectangle(x, y, _width, _height) {
	this.x = x;
	this.y = y;
	this.width = _width;
	this.height = _height;

	//碰撞检测(参数为此类)
	this.intersects = function (obj) {
		var a_x_w = Math.abs((this.x + this.width / 2) - (obj.x + obj.width / 2));
		var b_w_w = Math.abs((this.width + obj.width) / 2);
		var a_y_h = Math.abs((this.y + this.height / 2) - (obj.y + obj.height / 2));
		var b_h_h = Math.abs((this.height + obj.height) / 2);
		if (a_x_w < b_w_w && a_y_h < b_h_h)
			return true;
		else
			return false;
	}

}
/**
 * 圆形区域碰撞检测
 * Created by Administrator on 14-4-7.
 * author: marker
 *
 */
function RadiusRectangle(x, y, radius) {
	this.x = x;
	this.y = y;
	this.radius = radius;

	//碰撞检测(参数为此类)
	this.intersects = function (rr) {
		var maxRadius = rr.radius + this.radius;
		//  已知两条直角边的长度 ，可按公式：c²=a²+b² 计算斜边。
		var a = Math.abs(rr.x - this.x);
		var b = Math.abs(rr.y - this.y);
		var distance = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)); // 计算圆心距离
		if (distance < maxRadius) {
			return true;
		}
		return false;
	}
}
